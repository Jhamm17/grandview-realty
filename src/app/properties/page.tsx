import { Property } from '@/lib/mred/types';
import PropertyFilter from '@/components/PropertyFilter';
import { Suspense } from 'react';
import PropertiesLoading from '@/components/PropertiesLoading';

export const runtime = 'edge';
export const revalidate = 300; // Revalidate every 5 minutes

async function getProperties(): Promise<Property[]> {
  try {
    // Call our own API route instead of MLS Grid directly
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/properties`, {
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!response.ok) {
      console.error('API request failed:', response.status);
      return [];
    }

    const data = await response.json();
    
    if (data.error) {
      console.error('API returned error:', data.error);
      return [];
    }

    console.log(`[Properties Page] Received ${data.properties?.length || 0} properties from API`);
    return data.properties || [];
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

async function PropertiesContent() {
  const properties = await getProperties();
  
  if (properties.length === 0) {
    return (
      <div className="container-padding py-16">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-yellow-800 text-lg font-semibold mb-2">No Properties Available</h2>
          <p className="text-yellow-600">
                         We&apos;re currently updating our property database. Please check back in a few minutes.
          </p>
        </div>
      </div>
    );
  }

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