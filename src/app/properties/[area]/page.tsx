import { Property } from '@/lib/mred/types';
import PropertyFilter from '@/components/PropertyFilter';
import { Suspense } from 'react';
import PropertiesLoading from '@/components/PropertiesLoading';

export const runtime = 'edge';
export const revalidate = 300; // Revalidate every 5 minutes

async function getPropertiesByArea(area: string): Promise<Property[]> {
  try {
    console.log(`[Area Page] Fetching properties for area: ${area}`);
    
    // Call our own API route instead of MLS Grid directly
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/properties`, {
      next: { revalidate: 300 }
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

    const allProperties = data.properties || [];
    
    // Filter properties by area (city)
    const areaProperties = allProperties.filter((property: Property) => 
      property.City?.toLowerCase().includes(area.toLowerCase()) ||
      property.UnparsedAddress?.toLowerCase().includes(area.toLowerCase())
    );

    console.log(`[Area Page] Found ${areaProperties.length} properties for area: ${area}`);
    return areaProperties;
  } catch (error) {
    console.error('Error fetching properties by area:', error);
    return [];
  }
}

async function AreaPropertiesContent({ area }: { area: string }) {
  const properties = await getPropertiesByArea(area);
  
  if (properties.length === 0) {
    return (
      <div className="container-padding py-16">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-yellow-800 text-lg font-semibold mb-2">No Properties Found</h2>
          <p className="text-yellow-600">
            We couldn&apos;t find any properties in {area}. Please try a different area or check back later.
          </p>
        </div>
      </div>
    );
  }

  return <PropertyFilter initialProperties={properties} />;
}

export default function AreaPropertiesPage({ params }: { params: { area: string } }) {
  const area = decodeURIComponent(params.area);
  
  return (
    <main className="container-padding py-12 min-h-screen">
      <h1 className="text-4xl font-bold mb-2 text-center">Properties in {area}</h1>
      <p className="text-center text-lg text-gray-600 mb-8">
        Explore active properties in {area}. Use the filters to narrow your search.
      </p>
      <Suspense fallback={<PropertiesLoading />}>
        <AreaPropertiesContent area={area} />
      </Suspense>
    </main>
  );
} 