import { defaultHeroImage } from '../../layout';
import { MRED_CONFIG } from '@/lib/mred/config';
import { Property } from '@/lib/mred/types';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const runtime = 'edge';
export const revalidate = 300; // Revalidate every 5 minutes

// This is a temporary solution until we integrate with the MLS API
const areaMapping = {
  'geneva': 'Geneva',
  'st-charles': 'St. Charles',
  'naperville': 'Naperville',
  'oak-brook': 'Oak Brook',
  'hinsdale': 'Hinsdale',
  'arlington-heights': 'Arlington Heights'
} as const;

type AreaSlug = keyof typeof areaMapping;

export async function generateStaticParams() {
  return Object.keys(areaMapping).map((area) => ({
    area: area,
  }));
}

async function getPropertiesByArea(area: string) {
  try {
    const cityName = areaMapping[area as AreaSlug];
    if (!cityName) {
      throw new Error(`Invalid area: ${area}`);
    }

    // Build OData query parameters
    const queryParams = new URLSearchParams({
      '$top': '20',  // Limit to 20 properties for now
      '$filter': `MlgCanView eq true and StandardStatus eq 'Active' and City eq '${cityName}'`,
      '$orderby': 'ListPrice desc',
      '$count': 'true'
    });

    const url = `${MRED_CONFIG.API_BASE_URL}/Property?${queryParams.toString()}`;
    
    // Log the full request details for debugging
    console.log('MLS Grid API Request:', {
      url,
      token: MRED_CONFIG.ACCESS_TOKEN ? 'Present' : 'Missing',
      baseUrl: MRED_CONFIG.API_BASE_URL,
      city: cityName,
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
    
    // Log successful response details
    console.log('MLS Grid API Response:', {
      totalCount: data['@odata.count'],
      nextLink: data['@odata.nextLink'],
      resultCount: data.value?.length,
      firstProperty: data.value?.[0] ? {
        id: data.value[0].ListingId,
        address: data.value[0].UnparsedAddress,
        price: data.value[0].ListPrice
      } : 'No properties'
    });

    return data.value as Property[];
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
        vercelEnv: process.env.VERCEL_ENV,
        area: area
      }
    });
    throw error;
  }
}

export default async function AreaProperties({ params }: { params: { area: string } }) {
  // Validate the area parameter
  if (!Object.keys(areaMapping).includes(params.area)) {
    notFound();
  }

  let properties: Property[] = [];
  let error = null;

  try {
    properties = await getPropertiesByArea(params.area);
  } catch (e) {
    error = e;
  }

  // Format the area name for display
  const areaName = areaMapping[params.area as AreaSlug];

  if (error) {
    return (
      <div className="container-padding py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-red-800 text-lg font-semibold mb-2">Error Loading Properties</h2>
          <p className="text-red-600">
            We&apos;re having trouble loading properties for {areaName}. Please try again later.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <pre className="mt-4 p-4 bg-red-100 rounded text-sm overflow-auto">
              {error instanceof Error ? error.message : 'Unknown error'}
            </pre>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src={defaultHeroImage}
              alt={`Properties in ${areaName}`}
              fill
              style={{ objectFit: "cover" }}
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        </div>
        <div className="container-padding relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Properties in {areaName}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Discover exceptional homes and investment opportunities in {areaName}
          </p>
        </div>
      </section>

      {/* Property Listings */}
      <section className="py-16">
        <div className="container-padding">
          {properties.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h2 className="text-yellow-800 text-lg font-semibold mb-2">No Properties Found</h2>
              <p className="text-yellow-600">
                We couldn&apos;t find any active listings in {areaName} at this time. Please check back later or explore other areas.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <div key={property.ListingId} className="bg-white rounded-lg shadow-md overflow-hidden">
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
          )}
        </div>
      </section>
    </div>
  );
} 