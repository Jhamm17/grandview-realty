import { createClient } from '@supabase/supabase-js';
import { Property } from './mred/types';
import { MRED_CONFIG } from './mred/config';

export class PropertyCacheService {
  private static CACHE_DURATION = 15 * 60 * 1000; // 15 minutes
  
  // Use service role for admin operations (cache management)
  private static supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  
  // Use regular client for public read operations
  private static supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Get a single property from cache or fetch from API
  static async getProperty(listingId: string): Promise<Property | null> {
    try {
      // First, try to get from cache
      const { data: cachedProperty, error } = await this.supabase
        .from('property_cache')
        .select('*')
        .eq('listing_id', listingId)
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        console.error('Error fetching from cache:', error);
      }

      if (cachedProperty) {
        const lastUpdated = new Date(cachedProperty.last_updated).getTime();
        const now = Date.now();
        
        // Check if cache is still fresh
        if (now - lastUpdated < this.CACHE_DURATION) {
          console.log(`[Cache] Serving cached property: ${listingId}`);
          return cachedProperty.property_data;
        }
      }

      // Cache miss or stale, fetch from API
      console.log(`[Cache] Fetching property from API: ${listingId}`);
      const property = await this.fetchPropertyFromAPI(listingId);
      
      if (property) {
        // Store in cache
        await this.cacheProperty(property);
      }

      return property;
    } catch (error) {
      console.error('Error in getProperty:', error);
      return null;
    }
  }

  // Get all active properties from cache or fetch from API
  static async getAllProperties(): Promise<Property[]> {
    try {
      // First, try to get from cache
      const { data: cachedProperties, error } = await this.supabase
        .from('property_cache')
        .select('*')
        .eq('is_active', true)
        .order('last_updated', { ascending: false });

      if (error) {
        console.error('Error fetching from cache:', error);
      }

      if (cachedProperties && cachedProperties.length > 0) {
        const oldestCache = Math.min(...cachedProperties.map(p => new Date(p.last_updated).getTime()));
        const now = Date.now();
        
        // Check if cache is still fresh
        if (now - oldestCache < this.CACHE_DURATION) {
          console.log(`[Cache] Serving ${cachedProperties.length} cached properties`);
          return cachedProperties.map(p => p.property_data);
        }
      }

      // Cache miss or stale, fetch from API
      console.log('[Cache] Fetching all properties from API');
      const properties = await this.fetchAllPropertiesFromAPI();
      
      if (properties.length > 0) {
        // Store all properties in cache
        await this.cacheAllProperties(properties);
      }

      return properties;
    } catch (error) {
      console.error('Error in getAllProperties:', error);
      return [];
    }
  }

  // Fetch a single property from the MLS API
  private static async fetchPropertyFromAPI(listingId: string): Promise<Property | null> {
    try {
      const queryParams = new URLSearchParams({
        '$filter': `ListingId eq '${listingId}'`,
        '$expand': 'Media'
      });

      const url = `${MRED_CONFIG.API_BASE_URL}/Property?${queryParams.toString()}`;
      
      if (!MRED_CONFIG.ACCESS_TOKEN) {
        throw new Error('Access token not configured');
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${MRED_CONFIG.ACCESS_TOKEN}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip'
        }
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.value?.[0] || null;
    } catch (error) {
      console.error('Error fetching property from API:', error);
      return null;
    }
  }

  // Fetch all properties from the MLS API
  private static async fetchAllPropertiesFromAPI(): Promise<Property[]> {
    try {
      const queryParams = new URLSearchParams({
        '$top': '1000',
        '$filter': 'MlgCanView eq true',
        '$orderby': 'ModificationTimestamp desc',
        '$count': 'true',
        '$expand': 'Media'
      });

      const url = `${MRED_CONFIG.API_BASE_URL}/Property?${queryParams.toString()}`;
      
      if (!MRED_CONFIG.ACCESS_TOKEN) {
        throw new Error('Access token not configured');
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${MRED_CONFIG.ACCESS_TOKEN}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip'
        }
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      let allProperties = [...data.value];
      let nextLink = data['@odata.nextLink'];
      let pageCount = 1;

      // Handle pagination
      while (nextLink && pageCount < 10) {
        pageCount++;
        console.log(`[API] Fetching page ${pageCount}...`);
        
        const nextResponse = await fetch(nextLink, {
          headers: {
            'Authorization': `Bearer ${MRED_CONFIG.ACCESS_TOKEN}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip'
          }
        });
        
        if (!nextResponse.ok) {
          console.error(`[API] Pagination request failed on page ${pageCount}:`, nextResponse.status);
          break;
        }
        
        const nextData = await nextResponse.json();
        allProperties = [...allProperties, ...nextData.value];
        nextLink = nextData['@odata.nextLink'];
      }

      // Filter for active properties
      const activeProperties = allProperties.filter((property: Property) => 
        property.StandardStatus === 'Active' && 
        !property.StandardStatus.includes('Contract') &&
        !property.StandardStatus.includes('Pending') &&
        !property.StandardStatus.includes('Sold')
      );

      console.log(`[API] Fetched ${activeProperties.length} active properties`);
      return activeProperties;
    } catch (error) {
      console.error('Error fetching all properties from API:', error);
      return [];
    }
  }

  // Cache a single property
  private static async cacheProperty(property: Property): Promise<void> {
    try {
      const { error } = await this.supabaseAdmin
        .from('property_cache')
        .upsert({
          listing_id: property.ListingId,
          property_data: property,
          last_updated: new Date().toISOString(),
          is_active: true
        }, {
          onConflict: 'listing_id'
        });

      if (error) {
        console.error('Error caching property:', error);
      } else {
        console.log(`[Cache] Cached property: ${property.ListingId}`);
      }
    } catch (error) {
      console.error('Error in cacheProperty:', error);
    }
  }

  // Cache all properties
  private static async cacheAllProperties(properties: Property[]): Promise<void> {
    try {
      // First, mark all existing properties as inactive
      const { error: deactivateError } = await this.supabaseAdmin
        .from('property_cache')
        .update({ is_active: false })
        .eq('is_active', true);

      if (deactivateError) {
        console.error('Error deactivating old properties:', deactivateError);
      }

      // Then insert all new properties
      const cacheData = properties.map(property => ({
        listing_id: property.ListingId,
        property_data: property,
        last_updated: new Date().toISOString(),
        is_active: true
      }));

      const { error } = await this.supabaseAdmin
        .from('property_cache')
        .upsert(cacheData, {
          onConflict: 'listing_id'
        });

      if (error) {
        console.error('Error caching all properties:', error);
      } else {
        console.log(`[Cache] Cached ${properties.length} properties`);
      }
    } catch (error) {
      console.error('Error in cacheAllProperties:', error);
    }
  }

  // Clear all cache
  static async clearCache(): Promise<void> {
    try {
      const { error } = await this.supabaseAdmin
        .from('property_cache')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

      if (error) {
        console.error('Error clearing cache:', error);
      } else {
        console.log('[Cache] Cache cleared');
      }
    } catch (error) {
      console.error('Error in clearCache:', error);
    }
  }
} 