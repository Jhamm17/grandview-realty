import { NextRequest, NextResponse } from 'next/server';
import { MRED_CONFIG } from '@/lib/mred/config';
import { Property } from '@/lib/mred/types';

// In-memory cache for individual properties
let cachedProperties: Property[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

async function fetchAllProperties(): Promise<Property[]> {
  try {
    console.log('[API] Starting property fetch for individual property...');
    
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
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    let allProperties = [...data.value];
    let nextLink = data['@odata.nextLink'];
    let pageCount = 1;

    // Handle pagination to get all properties
    while (nextLink && pageCount < 10) {
      pageCount++;
      console.log(`[API] Fetching page ${pageCount} for individual property...`);
      
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

    console.log(`[API] Fetched ${allProperties.length} total properties for individual property lookup`);
    return allProperties;
  } catch (error) {
    console.error('[API] Error fetching properties for individual lookup:', error);
    throw error;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const now = Date.now();
    
    // Check if we have fresh cached data
    if (cachedProperties.length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
      const property = cachedProperties.find(p => p.ListingId === id);
      if (property) {
        console.log(`[API] Serving cached property: ${id}`);
        return NextResponse.json({
          property,
          cached: true,
          lastUpdated: new Date(lastFetchTime).toISOString()
        });
      }
    }

    // Fetch fresh data
    console.log(`[API] Cache expired or property not found, fetching fresh data for: ${id}`);
    const allProperties = await fetchAllProperties();
    
    // Update cache
    cachedProperties = allProperties;
    lastFetchTime = now;
    
    // Find the specific property
    const property = allProperties.find(p => p.ListingId === id);
    
    if (!property) {
      console.log(`[API] Property not found: ${id}`);
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }
    
    console.log(`[API] Found property: ${id}`);
    return NextResponse.json({
      property,
      cached: false,
      lastUpdated: new Date(lastFetchTime).toISOString()
    });
    
  } catch (error) {
    console.error('[API] Error in individual property API route:', error);
    
    // If we have cached data, try to find the property
    if (cachedProperties.length > 0) {
      const property = cachedProperties.find(p => p.ListingId === params.id);
      if (property) {
        console.log(`[API] Serving stale cached property: ${params.id}`);
        return NextResponse.json({
          property,
          cached: true,
          stale: true,
          lastUpdated: new Date(lastFetchTime).toISOString(),
          error: 'Using cached data due to API error'
        });
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch property' },
      { status: 500 }
    );
  }
} 