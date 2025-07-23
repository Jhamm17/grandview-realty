'use client';

import { useEffect, useState } from 'react';
import { Property } from '@/lib/mred/types';
import { mlsGridService } from '@/lib/mred/api';
import { PropertyGridSkeleton } from './PropertyLoading';

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

                console.log('Raw property results:', results);
                
                // Log each property's media information
                results.forEach(property => {
                    console.log(`Property ${property.ListingId} media:`, {
                        hasMedia: Boolean(property.Media),
                        mediaCount: property.Media?.length || 0,
                        firstMediaUrl: property.Media?.[0]?.MediaURL
                    });
                });

                setProperties(results);
            } catch (err) {
                console.error('Error loading properties:', err);
                setError(err instanceof Error ? err.message : 'Failed to load properties');
            } finally {
                setLoading(false);
            }
        };

        loadProperties();
    }, [city, minPrice, maxPrice, beds, baths, propertyType]);

    if (loading) {
        return <PropertyGridSkeleton />;
    }

    if (error) {
        return (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                <h3 className="font-bold">Error Loading Properties</h3>
                <p>{error}</p>
            </div>
        );
    }

    if (properties.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No properties found matching your criteria.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(property => (
                <div key={property.ListingId} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48 bg-gray-100">
                        {property.Media?.[0]?.MediaURL ? (
                            <img
                                src={property.Media[0].MediaURL}
                                alt={`Property in ${property.City}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    console.error('Failed to load image:', target.src);
                                    target.onerror = null; // Prevent infinite loop
                                    target.src = '/property-1.jpg';
                                }}
                            />
                        ) : (
                            <img
                                src="/property-1.jpg"
                                alt="Property placeholder"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold">${property.ListPrice.toLocaleString()}</h3>
                            <span className="px-2 py-1 text-sm rounded bg-blue-100 text-blue-800">
                                {property.StandardStatus}
                            </span>
                        </div>
                        <p className="text-gray-600 mb-2">
                            {property.City}, {property.StateOrProvince}
                        </p>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>{property.BedroomsTotal} beds</span>
                            <span>{property.BathroomsTotalInteger} baths</span>
                            <span>{property.LivingArea?.toLocaleString()} sqft</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
} 