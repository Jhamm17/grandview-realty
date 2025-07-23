'use client';

import { useEffect, useState } from 'react';
import { Property } from '@/lib/mred/types';
import { mlsGridService } from '@/lib/mred/api';

interface PropertyGridProps {
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    beds?: number;
    baths?: number;
    propertyType?: string;
}

export function PropertyGrid({ city, minPrice, maxPrice, beds, baths, propertyType }: PropertyGridProps) {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProperties = async () => {
            try {
                setLoading(true);
                setError(null);

                console.log('Fetching properties with params:', {
                    city, minPrice, maxPrice, beds, baths, propertyType
                });

                const results = await mlsGridService.searchProperties({
                    city,
                    minPrice,
                    maxPrice,
                    beds,
                    baths,
                    propertyType,
                    top: 12,
                    orderby: 'ListPrice desc',
                    status: 'Active'
                });

                console.log('Fetched properties:', results);
                setProperties(results);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
                console.error('Error loading properties:', err);
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        loadProperties();
    }, [city, minPrice, maxPrice, beds, baths, propertyType]);

    if (loading) {
        return <div className="p-4 text-center">Loading properties...</div>;
    }

    if (error) {
        return (
            <div className="p-4 bg-red-100 text-red-700 rounded">
                <h3 className="font-bold mb-2">Error Loading Properties</h3>
                <p>{error}</p>
            </div>
        );
    }

    if (properties.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500">
                No properties found matching your criteria.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(property => (
                <div key={property.ListingId} className="bg-white rounded-lg shadow-md p-4">
                    <div className="mb-2">
                        <h3 className="text-xl font-semibold">${property.ListPrice.toLocaleString()}</h3>
                        <p className="text-gray-600">{property.City}, {property.StateOrProvince}</p>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>{property.BedroomsTotal} beds</span>
                        <span>{property.BathroomsTotalInteger} baths</span>
                        <span>{property.LivingArea?.toLocaleString()} sqft</span>
                    </div>
                </div>
            ))}
        </div>
    );
} 