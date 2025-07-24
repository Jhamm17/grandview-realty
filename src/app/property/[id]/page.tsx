import { MRED_CONFIG } from '@/lib/mred/config';
import { Property } from '@/lib/mred/types';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import PropertyLoading from '@/components/PropertyLoading';
import { rateLimiter } from '@/lib/mred/rate-limiter';

export const runtime = 'edge';
export const revalidate = 900; // Revalidate every 15 minutes (increased from 5)

async function getProperty(id: string): Promise<Property | null> {
  try {
    console.log('Fetching property with ID:', id);
    
    // Try to filter by ListingId first (more efficient)
    let queryParams = new URLSearchParams({
      '$filter': `ListingId eq '${id}'`,
      '$expand': 'Media'
    });

    let url = `${MRED_CONFIG.API_BASE_URL}/Property?${queryParams.toString()}`;
    console.log('API URL (direct filter):', url);
    
    if (!MRED_CONFIG.ACCESS_TOKEN) {
      throw new Error('Access token is not configured.');
    }

    let response = await rateLimiter.executeWithRateLimit(async () => {
      return fetch(url, {
        headers: {
          'Authorization': `Bearer ${MRED_CONFIG.ACCESS_TOKEN}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip'
        },
        next: { revalidate: 900 }
      });
    });

    // If direct filter fails, fall back to broader search
    if (!response.ok) {
      console.log('Direct filter failed, trying broader search...');
      queryParams = new URLSearchParams({
        '$top': '50',
        '$filter': 'MlgCanView eq true',
        '$orderby': 'ModificationTimestamp desc',
        '$expand': 'Media'
      });

      url = `${MRED_CONFIG.API_BASE_URL}/Property?${queryParams.toString()}`;
      console.log('API URL (broader search):', url);
      
      response = await rateLimiter.executeWithRateLimit(async () => {
        return fetch(url, {
          headers: {
            'Authorization': `Bearer ${MRED_CONFIG.ACCESS_TOKEN}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip'
          },
          next: { revalidate: 900 }
        });
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response:', {
      totalCount: data['@odata.count'],
      resultCount: data.value?.length,
      availableIds: data.value?.slice(0, 5).map((p: Property) => p.ListingId) || []
    });
    
    // Find the specific property by ID
    const property = data.value?.find((p: Property) => p.ListingId === id);
    
    if (property) {
      console.log('Found property:', {
        id: property.ListingId,
        address: property.UnparsedAddress,
        status: property.StandardStatus
      });
    } else {
      console.log('Property not found. Available IDs (first 5):', data.value?.slice(0, 5).map((p: Property) => p.ListingId));
    }
    
    return property || null;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}

async function PropertyContent({ id }: { id: string }) {
  const property = await getProperty(id);

  if (!property) {
    return (
      <div className="container-padding py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-red-800 text-lg font-semibold mb-2">Property Not Found</h2>
          <p className="text-red-600 mb-4">
            We couldn&apos;t find the property you&apos;re looking for.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-4 bg-red-100 rounded text-sm">
              <p><strong>Debug Info:</strong></p>
              <p>Property ID: {id}</p>
              <p>API Base URL: {MRED_CONFIG.API_BASE_URL}</p>
              <p>Access Token: {MRED_CONFIG.ACCESS_TOKEN ? 'Present' : 'Missing'}</p>
            </div>
          )}
          <Link href="/properties" className="text-blue-600 hover:text-blue-800 underline">
            ← Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const sortedMedia = property.Media?.sort((a, b) => (a.Order || 0) - (b.Order || 0)) || [];
  const mainImage = sortedMedia[0];

  return (
    <div className="container-padding py-16">
      {/* Back Button */}
      <div className="mb-8">
        <Link href="/properties" className="text-blue-600 hover:text-blue-800 underline flex items-center">
          ← Back to Properties
        </Link>
      </div>

      {/* Property Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          {property.StreetNumber && property.StreetName 
            ? `${property.StreetNumber} ${property.StreetName} ${property.StreetSuffix || ''}`.trim()
            : property.UnparsedAddress || 'Address not available'
          }
        </h1>
        <p className="text-xl text-gray-600 mb-4">{property.City}, {property.StateOrProvince}</p>
        <p className="text-3xl font-bold text-black">
          ${property.ListPrice.toLocaleString()}
        </p>
      </div>

      {/* Main Image */}
      <div className="mb-8">
        {mainImage?.MediaURL ? (
          <div className="relative h-96 w-full">
            <Image
              src={mainImage.MediaURL}
              alt={`${property.UnparsedAddress || 'Property'} in ${property.City}`}
              fill
              style={{ objectFit: "cover" }}
              sizes="100vw"
              className="rounded-lg"
            />
            {/* Listed Badge */}
            <div className="absolute bottom-0 left-0 bg-blue-400 text-white px-3 py-2 text-lg font-black tracking-wider" style={{ borderRadius: '0' }}>
              LISTED
            </div>
          </div>
        ) : (
          <div className="h-96 w-full bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-xl">No image available</span>
          </div>
        )}
      </div>

      {/* Property Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Key Details */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Property Details</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{property.BedroomsTotal}</div>
                <div className="text-gray-600">Bedrooms</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{property.BathroomsTotalInteger}</div>
                <div className="text-gray-600">Bathrooms</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{property.LivingArea?.toLocaleString()}</div>
                <div className="text-gray-600">Square Feet</div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-4">
              {property.YearBuilt && (
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-semibold">Year Built</span>
                  <span>{property.YearBuilt}</span>
                </div>
              )}
              {property.PropertyType && (
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-semibold">Property Type</span>
                  <span>{property.PropertyType}</span>
                </div>
              )}
              {property.LotSize && (
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-semibold">Lot Size</span>
                  <span>{property.LotSize}</span>
                </div>
              )}
              {property.StandardStatus && (
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-semibold">Status</span>
                  <span className="text-green-600 font-semibold">{property.StandardStatus}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact/MLS Info */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Property Information</h2>
            <div className="space-y-3">
              <div>
                <span className="font-semibold">MLS#:</span>
                <span className="ml-2">{property.ListingId}</span>
              </div>
              <div>
                <span className="font-semibold">County:</span>
                <span className="ml-2">{property.CountyOrParish || 'N/A'}</span>
              </div>
              <div>
                <span className="font-semibold">Postal Code:</span>
                <span className="ml-2">{property.PostalCode}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {property.PublicRemarks && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p className="text-gray-700 leading-relaxed">{property.PublicRemarks}</p>
        </div>
      )}
    </div>
  );
}

export default function PropertyPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<PropertyLoading />}>
      <PropertyContent id={params.id} />
    </Suspense>
  );
} 