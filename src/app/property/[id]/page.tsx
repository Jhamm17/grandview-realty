import { Property } from '@/lib/mred/types';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import PropertyLoading from '@/components/PropertyLoading';

export const runtime = 'edge';
export const revalidate = 300; // Revalidate every 5 minutes

async function getProperty(id: string): Promise<Property | null> {
  try {
    console.log('Fetching property with ID:', id);
    
    // Call our own API route instead of MLS Grid directly
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/properties/${id}`, {
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      console.error('API request failed:', response.status);
      return null;
    }

    const data = await response.json();
    
    if (data.error) {
      console.error('API returned error:', data.error);
      return null;
    }

    console.log(`[Property Page] Received property: ${data.property?.ListingId}`);
    return data.property || null;
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
          <Link href="/properties" className="text-blue-600 hover:text-blue-800 underline">
            ← Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-padding py-16">
      {/* Back Button */}
      <div className="mb-8">
        <Link href="/properties" className="text-blue-600 hover:text-blue-800 underline flex items-center">
          ← Back to Properties
        </Link>
      </div>

      {/* Property Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Property Image */}
        <div className="lg:col-span-1">
          {property.Media && property.Media.length > 0 ? (
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={property.Media[0].MediaURL}
                alt={property.UnparsedAddress || 'Property'}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="relative h-96 bg-gray-200 rounded-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <p className="text-lg">No Image Available</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Property Info */}
        <div className="lg:col-span-1">
          <h1 className="text-4xl font-bold mb-2">{property.UnparsedAddress}</h1>
          <p className="text-2xl text-blue-600 font-semibold mb-6">
            ${property.ListPrice?.toLocaleString()}
          </p>
          
          {/* Property Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">{property.BedroomsTotal}</div>
              <div className="text-gray-600">Bedrooms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">{property.BathroomsTotalInteger}</div>
              <div className="text-gray-600">Bathrooms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">
                {property.LivingArea ? `${property.LivingArea.toLocaleString()} sq ft` : 'N/A'}
              </div>
              <div className="text-gray-600">Square Feet</div>
            </div>
          </div>

          {/* Status */}
          <div className="mb-8">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
              property.StandardStatus === 'Active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {property.StandardStatus}
            </span>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Interested in this property?</h3>
            <div className="space-y-3">
              <a 
                href="tel:+1234567890" 
                className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Call Us
              </a>
              <a 
                href="mailto:info@grandviewrealty.com" 
                className="block w-full bg-white text-blue-600 border border-blue-600 py-3 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Property Description */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Property Details</h2>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Property Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">MLS #:</span>
                  <span className="font-semibold">{property.ListingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-semibold">{property.StandardStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type:</span>
                  <span className="font-semibold">{property.PropertyType || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year Built:</span>
                  <span className="font-semibold">{property.YearBuilt || 'N/A'}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Location</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">City:</span>
                  <span className="font-semibold">{property.City}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">State:</span>
                  <span className="font-semibold">{property.StateOrProvince}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ZIP:</span>
                  <span className="font-semibold">{property.PostalCode}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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