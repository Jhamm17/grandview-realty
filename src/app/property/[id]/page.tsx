import { PropertyCacheService } from '@/lib/property-cache';
import PropertyGallery from '@/components/PropertyGallery';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PropertyPageProps {
  params: { id: string };
}

// Generate static params for all properties
export async function generateStaticParams() {
  try {
    const properties = await PropertyCacheService.getAllProperties();
    if (properties && properties.length > 0) {
      return properties.map((property) => ({
        id: property.ListingId,
      }));
    }
    // If no properties found, return empty array to prevent build failure
    console.log('No properties found for static generation');
    return [];
  } catch (error) {
    console.error('Error generating static params:', error);
    // Return empty array to prevent build failure, pages will be generated dynamically
    return [];
  }
}

// Force dynamic rendering when static generation fails
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Generate metadata for SEO
export async function generateMetadata({ params }: PropertyPageProps) {
  try {
    const property = await PropertyCacheService.getProperty(params.id);
    
    if (!property) {
      return {
        title: 'Property Not Found',
        description: 'The requested property could not be found.',
      };
    }

    return {
      title: `${property.UnparsedAddress} - Grandview Realty`,
      description: `${property.BedroomsTotal} bed, ${property.BathroomsTotalInteger} bath home for sale in ${property.City}, ${property.StateOrProvince}. Listed at $${property.ListPrice?.toLocaleString()}.`,
      openGraph: {
        title: `${property.UnparsedAddress} - Grandview Realty`,
        description: `${property.BedroomsTotal} bed, ${property.BathroomsTotalInteger} bath home for sale in ${property.City}, ${property.StateOrProvince}.`,
        images: property.Media && property.Media.length > 0 ? [property.Media[0].MediaURL] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Property - Grandview Realty',
      description: 'Property details from Grandview Realty.',
    };
  }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  try {
    const property = await PropertyCacheService.getProperty(params.id);

    if (!property) {
      notFound();
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
          {/* Property Gallery */}
          <div className="lg:col-span-1">
            <PropertyGallery 
              images={property.Media || []}
              propertyAddress={property.UnparsedAddress || 'Property'}
            />
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
  } catch (error) {
    console.error('Error loading property page:', error);
    notFound();
  }
} 