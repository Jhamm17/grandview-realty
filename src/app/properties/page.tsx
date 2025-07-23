import { MRED_CONFIG } from '@/lib/mred/config';
import { Property } from '@/lib/mred/types';
import Image from 'next/image';

export const runtime = 'edge';
export const revalidate = 300; // Revalidate every 5 minutes

async function getProperties() {
  try {
    // Build OData query parameters - only using allowed filter fields
    const queryParams = new URLSearchParams({
      '$top': '20',  // Limit to 20 properties for now
      '$filter': 'MlgCanView eq true',
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

    // Filter the results on the client side for now
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div key={property.ListingId} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Property Image */}
            <div className="relative h-64">
              {property.Media?.[0]?.MediaURL ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_CLOUDFLARE_URL}/proxy?url=${encodeURIComponent(property.Media[0].MediaURL)}`}
                  alt={`${property.UnparsedAddress || 'Property'} in ${property.City}`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{property.UnparsedAddress}</h3>
              <p className="text-gray-600 mb-4">{property.City}, {property.StateOrProvince}</p>
              <p className="text-primary font-bold text-xl mb-4">
                ${property.ListPrice.toLocaleString()}
              </p>
              <div className="flex justify-between text-gray-500 text-sm">
                <span>{property.BedroomsTotal} Beds</span>
                <span>{property.BathroomsTotalInteger} Baths</span>
                <span>{property.LivingArea.toLocaleString()} Sq Ft</span>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Status: <span className="font-semibold">{property.StandardStatus}</span>
                </p>
                <p className="text-sm text-gray-600">
                  MLS#: {property.ListingId}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 