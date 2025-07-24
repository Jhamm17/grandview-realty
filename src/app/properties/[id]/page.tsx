import { MRED_CONFIG } from '@/lib/mred/config';
import { Property } from '@/lib/mred/types';
import Image from 'next/image';
import Link from 'next/link';

export const runtime = 'edge';
export const revalidate = 300; // Revalidate every 5 minutes

async function getProperty(id: string): Promise<Property | null> {
  try {
    const queryParams = new URLSearchParams({
      '$filter': `ListingId eq '${id}'`,
      '$expand': 'Media'
    });

    const url = `${MRED_CONFIG.API_BASE_URL}/Property?${queryParams.toString()}`;
    
    if (!MRED_CONFIG.ACCESS_TOKEN) {
      throw new Error('Access token is not configured.');
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${MRED_CONFIG.ACCESS_TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip'
      },
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.value?.[0] || null;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id);

  if (!property) {
    return (
      <div className="container-padding py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-red-800 text-lg font-semibold mb-2">Property Not Found</h2>
          <p className="text-red-600 mb-4">
            We couldn&apos;t find the property you&apos;re looking for.
          </p>
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