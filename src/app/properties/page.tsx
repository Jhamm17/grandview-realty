import { PropertyCacheService } from '@/lib/property-cache';
import PropertyFilter from '@/components/PropertyFilter';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Active Listings - Grandview Realty',
  description: 'Explore all active properties currently listed for sale. Use the filters to narrow your search.',
  openGraph: {
    title: 'Active Listings - Grandview Realty',
    description: 'Explore all active properties currently listed for sale.',
  },
};

// Force dynamic rendering to avoid API calls during build
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PropertiesPage() {
  try {
    const properties = await PropertyCacheService.getAllProperties();

    if (properties.length === 0) {
      return (
        <main className="container-padding py-12 min-h-screen">
          <h1 className="text-4xl font-bold mb-2 text-center">Active Listings</h1>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-yellow-800 text-lg font-semibold mb-2">No Properties Available</h2>
            <p className="text-yellow-600">
              We&apos;re currently updating our property database. Please check back in a few minutes.
            </p>
            <div className="mt-4 text-sm text-yellow-700">
              <p>Debug info: No properties found in cache.</p>
              <p>This might be due to:</p>
              <ul className="list-disc list-inside mt-2">
                <li>Cache not populated yet</li>
                <li>Supabase connection issues</li>
                <li>MLS Grid API temporarily unavailable</li>
              </ul>
            </div>
          </div>
        </main>
      );
    }

    return (
      <main className="container-padding py-12 min-h-screen">
        <h1 className="text-4xl font-bold mb-2 text-center">Active Listings</h1>
        <p className="text-center text-lg text-gray-600 mb-8">
          Explore all active properties currently listed for sale. Use the filters to narrow your search.
        </p>
        <PropertyFilter initialProperties={properties} />
      </main>
    );
  } catch (error) {
    console.error('Error loading properties:', error);
    
    return (
      <main className="container-padding py-12 min-h-screen">
        <h1 className="text-4xl font-bold mb-2 text-center">Active Listings</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-red-800 text-lg font-semibold mb-2">Error Loading Properties</h2>
          <p className="text-red-600 mb-4">
            We encountered an error while loading properties. Please try again later.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }
} 