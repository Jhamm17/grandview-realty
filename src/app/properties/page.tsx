import { MRED_CONFIG } from '@/lib/mred/config';
import { Property } from '@/lib/mred/types';
import PropertyFilter from '@/components/PropertyFilter';

export const runtime = 'edge';
export const revalidate = 300; // Revalidate every 5 minutes

async function getProperties() {
  try {
    // Build OData query parameters - only using allowed filter fields
    const queryParams = new URLSearchParams({
      '$top': '500',  // Increased to get more properties
      '$filter': 'MlgCanView eq true', // Only use allowed filter fields
      '$orderby': 'ModificationTimestamp desc', // Order by last modified
      '$count': 'true',
      '$expand': 'Media' // Include media in the response
    });

    const url = `${MRED_CONFIG.API_BASE_URL}/Property?${queryParams.toString()}`;
    
    // Log the full request details for debugging
    console.log('MLS Grid API Request:', {
      url,
      token: MRED_CONFIG.ACCESS_TOKEN ? 'Present' : 'Missing',
      baseUrl: MRED_CONFIG.API_BASE_URL,
      params: Object.fromEntries(queryParams.entries())
    });
    
    if (!MRED_CONFIG.ACCESS_TOKEN) {
      throw new Error('Access token is not configured. Please add MLSGRID_ACCESS_TOKEN to environment variables.');
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${MRED_CONFIG.ACCESS_TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip'
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!response.ok) {
      // Log detailed error information
      const errorText = await response.text();
      console.error('MLS Grid API Error:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: errorText,
        url: url.replace(MRED_CONFIG.ACCESS_TOKEN || '', '[REDACTED]') // Redact token from logs
      });
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // Log successful response details with media info
    console.log('MLS Grid API Response:', {
      totalCount: data['@odata.count'],
      nextLink: data['@odata.nextLink'],
      resultCount: data.value?.length,
      firstProperty: data.value?.[0] ? {
        id: data.value[0].ListingId,
        address: data.value[0].UnparsedAddress,
        price: data.value[0].ListPrice,
        mediaCount: data.value[0].Media?.length || 0,
        firstMediaUrl: data.value[0].Media?.[0]?.MediaURL || null
      } : 'No properties'
    });

    // Filter the results on the client side for active listings
    const filteredProperties = data.value.filter((property: Property) => 
      property.StandardStatus === 'Active'
    );

    return filteredProperties;
  } catch (error) {
    // Log detailed error information
    console.error('Error fetching properties:', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : error,
      config: {
        baseUrl: MRED_CONFIG.API_BASE_URL,
        hasToken: Boolean(MRED_CONFIG.ACCESS_TOKEN),
        environment: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV
      }
    });
    throw error;
  }
}

export default async function PropertiesPage() {
  let properties: Property[] = [];
  let error = null;

  try {
    properties = await getProperties();
  } catch (e) {
    error = e;
  }

  if (error) {
    return (
      <div className="container-padding py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-red-800 text-lg font-semibold mb-2">Error Loading Properties</h2>
          <p className="text-red-600">
            We&apos;re having trouble connecting to our property database. Please try again later.
          </p>
          {/* Always show error details in production for now, to help debug */}
          <pre className="mt-4 p-4 bg-red-100 rounded text-sm overflow-auto">
            {error instanceof Error ? error.message : 'Unknown error'}
          </pre>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="container-padding py-16">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-yellow-800 text-lg font-semibold mb-2">No Properties Found</h2>
          <p className="text-yellow-600">
            We couldn&apos;t find any properties matching your criteria. Please try adjusting your search.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-padding py-16">
      <h1 className="text-4xl font-bold mb-8">Available Properties</h1>
      
      {/* Filter Component with Properties Display */}
      <PropertyFilter initialProperties={properties} />
    </div>
  );
} 