import { MRED_CONFIG } from '@/lib/mred/config';
import { Property } from '@/lib/mred/types';
import PropertyFilter from '@/components/PropertyFilter';
import { Suspense } from 'react';
import PropertiesLoading from '@/components/PropertiesLoading';
import { rateLimiter } from '@/lib/mred/rate-limiter';

export const runtime = 'edge';
export const revalidate = 900; // Revalidate every 15 minutes (increased from 5)

async function getProperties() {
  try {
    // Build OData query parameters - optimized for speed and reduced API calls
    const queryParams = new URLSearchParams({
      '$top': '25',  // 25 per page for safe rate limiting
      '$filter': 'MlgCanView eq true', // Only use allowed filter fields
      '$orderby': 'ModificationTimestamp desc', // Order by last modified
      '$count': 'true',
      '$expand': 'Media' // Include media in the response
    });

    const url = `${MRED_CONFIG.API_BASE_URL}/Property?${queryParams.toString()}`;
    if (!MRED_CONFIG.ACCESS_TOKEN) {
      throw new Error('Access token is not configured. Please add MLSGRID_ACCESS_TOKEN to environment variables.');
    }

    // Fetch the first page with rate limiting
    const response = await rateLimiter.executeWithRateLimit(async () => {
      return fetch(url, {
        headers: {
          'Authorization': `Bearer ${MRED_CONFIG.ACCESS_TOKEN}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip'
        },
        next: { revalidate: 900 } // Cache for 15 minutes
      });
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    let allProperties = [...data.value];
    let nextLink = data['@odata.nextLink'];
    let totalFetched = allProperties.length;
    const maxRecords = 1000;

    // Paginate until we reach 1000 records or run out of pages
    while (nextLink && totalFetched < maxRecords) {
      const nextResponse = await rateLimiter.executeWithRateLimit(async () => {
        return fetch(nextLink, {
          headers: {
            'Authorization': `Bearer ${MRED_CONFIG.ACCESS_TOKEN}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip'
          }
        });
      });
      if (!nextResponse.ok) {
        break;
      }
      const nextData = await nextResponse.json();
      allProperties = [...allProperties, ...nextData.value];
      totalFetched = allProperties.length;
      nextLink = nextData['@odata.nextLink'];
      if (totalFetched >= maxRecords) {
        allProperties = allProperties.slice(0, maxRecords);
        break;
      }
    }

    // Filter the results on the client side for active listings
    const filteredProperties = allProperties.filter((property: Property) => 
      property.StandardStatus === 'Active' && 
      !property.StandardStatus.includes('Contract') &&
      !property.StandardStatus.includes('Pending') &&
      !property.StandardStatus.includes('Sold')
    );

    return filteredProperties;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

async function PropertiesContent() {
  const properties = await getProperties();
  return <PropertyFilter initialProperties={properties} />;
}

export default function PropertiesPage() {
  return (
    <main className="container-padding py-12 min-h-screen">
      <h1 className="text-4xl font-bold mb-2 text-center">Active Listings</h1>
      <p className="text-center text-lg text-gray-600 mb-8">
        Explore all active properties currently listed for sale. Use the filters to narrow your search.
      </p>
      <Suspense fallback={<PropertiesLoading />}>
        <PropertiesContent />
      </Suspense>
    </main>
  );
} 