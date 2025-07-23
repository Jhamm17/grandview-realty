'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Property } from '@/lib/mred/api';
import { mlsGridService } from '@/lib/mred/api';
import { PropertyGridSkeleton } from './PropertyLoading';
import { ErrorBoundary } from './ErrorBoundary';

interface PropertyCardProps {
    property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-48">
            {property.Photos?.[0] ? (
                <Image
                    src={property.Photos[0]}
                    alt={`${property.City} property`}
                    fill
                    className="object-cover"
                />
            ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                </div>
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
                {property.City}, {property.StateOrProvince} {property.PostalCode}
            </p>
            <div className="flex justify-between text-sm text-gray-500">
                <span>{property.BedroomsTotal} beds</span>
                <span>{property.BathroomsTotalInteger} baths</span>
                <span>{property.LivingArea.toLocaleString()} sqft</span>
            </div>
        </div>
    </div>
);

interface PropertyGridProps {
    initialFilters?: {
        city?: string;
        minPrice?: number;
        maxPrice?: number;
        beds?: number;
        baths?: number;
        propertyType?: string;
    };
}

export default function PropertyGrid({ initialFilters = {} }: PropertyGridProps) {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProperties = async () => {
            try {
                setLoading(true);
                const results = await mlsGridService.searchProperties({
                    ...initialFilters,
                    top: 12,
                    orderby: 'ListPrice desc'
                });
                setProperties(results);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load properties');
            } finally {
                setLoading(false);
            }
        };

        loadProperties();
    }, [initialFilters]);

    if (loading) {
        return <PropertyGridSkeleton />;
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 text-red-800 rounded-lg">
                <h3 className="font-semibold">Error loading properties</h3>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <ErrorBoundary>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <PropertyCard key={property.ListingKey} property={property} />
                ))}
            </div>
            {properties.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">No properties found matching your criteria.</p>
                </div>
            )}
        </ErrorBoundary>
    );
} 