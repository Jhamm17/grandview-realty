'use client';

import { Property } from '@/lib/mred/types';
import PropertyFilter from '@/components/PropertyFilter';
import { useEffect, useState } from 'react';
import PropertiesLoading from '@/components/PropertiesLoading';

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        setError(null);
        
        // Use relative URL to avoid environment variable issues
        const response = await fetch('/api/properties', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        console.log(`[Properties Page] API response status: ${response.status}`);

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`[Properties Page] API response data:`, {
          hasProperties: !!data.properties,
          propertiesLength: data.properties?.length || 0,
          cached: data.cached,
          totalCount: data.totalCount
        });
        
        if (data.error) {
          throw new Error(`API returned error: ${data.error}`);
        }

        console.log(`[Properties Page] Received ${data.properties?.length || 0} properties from API`);
        setProperties(data.properties || []);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <main className="container-padding py-12 min-h-screen">
        <h1 className="text-4xl font-bold mb-2 text-center">Active Listings</h1>
        <p className="text-center text-lg text-gray-600 mb-8">
          Explore all active properties currently listed for sale. Use the filters to narrow your search.
        </p>
        <PropertiesLoading />
      </main>
    );
  }

  if (error) {
    return (
      <main className="container-padding py-12 min-h-screen">
        <h1 className="text-4xl font-bold mb-2 text-center">Active Listings</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-red-800 text-lg font-semibold mb-2">Error Loading Properties</h2>
          <p className="text-red-600 mb-4">{error}</p>
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
            <p>Debug info: API call completed but no properties returned.</p>
            <p>This might be due to:</p>
            <ul className="list-disc list-inside mt-2">
              <li>API route not available</li>
              <li>Environment variables not configured</li>
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
} 