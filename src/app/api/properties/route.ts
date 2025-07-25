import { NextResponse } from 'next/server';
import { MRED_CONFIG } from '@/lib/mred/config';
import { Property } from '@/lib/mred/types';

// In-memory cache (in production, you'd use Redis or a database)
let cachedProperties: Property[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

async function fetchAllProperties(): Promise<Property[]> {
  try {
    console.log('[API] Starting property fetch...');
    
    const queryParams = new URLSearchParams({
      '$top': '1000', // Get maximum allowed
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
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    let allProperties = [...data.value];
    let nextLink = data['@odata.nextLink'];
    let pageCount = 1;

    // Handle pagination to get all properties
    while (nextLink && pageCount < 10) { // Limit to 10 pages for safety
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

    console.log(`[API] Fetched ${allProperties.length} total properties across ${pageCount} pages`);
    
    // Filter for active properties
    const activeProperties = allProperties.filter((property: Property) => 
      property.StandardStatus === 'Active' && 
      !property.StandardStatus.includes('Contract') &&
      !property.StandardStatus.includes('Pending') &&
      !property.StandardStatus.includes('Sold')
    );

    console.log(`[API] Filtered to ${activeProperties.length} active properties`);
    
    return activeProperties;
  } catch (error) {
    console.error('[API] Error fetching properties:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const now = Date.now();
    
    // Check if we have fresh cached data
    if (cachedProperties.length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
      console.log(`[API] Serving ${cachedProperties.length} cached properties`);
      return NextResponse.json({
        properties: cachedProperties,
        cached: true,
        lastUpdated: new Date(lastFetchTime).toISOString(),
        totalCount: cachedProperties.length
      });
    }

    // Fetch fresh data
    console.log('[API] Cache expired or empty, fetching fresh data...');
    const properties = await fetchAllProperties();
    
    // Update cache
    cachedProperties = properties;
    lastFetchTime = now;
    
    console.log(`[API] Updated cache with ${properties.length} properties`);
    
    return NextResponse.json({
      properties,
      cached: false,
      lastUpdated: new Date(lastFetchTime).toISOString(),
      totalCount: properties.length
    });
    
  } catch (error) {
    console.error('[API] Error in properties API route:', error);
    
    // If we have cached data, serve it even if it's stale
    if (cachedProperties.length > 0) {
      console.log('[API] Serving stale cached data due to error');
      return NextResponse.json({
        properties: cachedProperties,
        cached: true,
        stale: true,
        lastUpdated: new Date(lastFetchTime).toISOString(),
        totalCount: cachedProperties.length,
        error: 'Using cached data due to API error'
      });
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
} 