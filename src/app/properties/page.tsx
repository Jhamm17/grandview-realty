'use client';

import { useState, useEffect } from 'react';
import { mlsGridService } from '@/lib/mred/api';
import { Property } from '@/lib/mred/types';
import { PropertyGridSkeleton } from '@/components/PropertyLoading';

interface Filters {
    city: string;
    minPrice?: number;
    maxPrice?: number;
    beds?: number;
    baths?: number;
    propertyType?: string;
}

export default function PropertiesPage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<Filters>({
        city: 'Geneva'
    });

    useEffect(() => {
        const loadProperties = async () => {
            try {
                setLoading(true);
                setError(null);

                const results = await mlsGridService.searchProperties({
                    ...filters,
                    top: 12,
                    orderby: 'ListPrice desc',
                    // Only fetch active listings
                    status: 'Active'
                });

                setProperties(results);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load properties');
                console.error('Error loading properties:', err);
            } finally {
                setLoading(false);
            }
        };

        loadProperties();
    }, [filters]);

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                    <h3 className="font-bold">Error Loading Properties</h3>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Available Properties</h1>
            
            {/* Basic filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <input
                        type="text"
                        placeholder="City"
                        className="p-2 border rounded"
                        value={filters.city}
                        onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                    />
                    <input
                        type="number"
                        placeholder="Min Price"
                        className="p-2 border rounded"
                        value={filters.minPrice || ''}
                        onChange={(e) => setFilters(prev => ({ 
                            ...prev, 
                            minPrice: e.target.value ? parseInt(e.target.value) : undefined 
                        }))}
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        className="p-2 border rounded"
                        value={filters.maxPrice || ''}
                        onChange={(e) => setFilters(prev => ({ 
                            ...prev, 
                            maxPrice: e.target.value ? parseInt(e.target.value) : undefined 
                        }))}
                    />
                    <select
                        className="p-2 border rounded"
                        value={filters.beds || ''}
                        onChange={(e) => setFilters(prev => ({ 
                            ...prev, 
                            beds: e.target.value ? parseInt(e.target.value) : undefined 
                        }))}
                    >
                        <option value="">Beds</option>
                        {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num}+ beds</option>
                        ))}
                    </select>
                    <select
                        className="p-2 border rounded"
                        value={filters.baths || ''}
                        onChange={(e) => setFilters(prev => ({ 
                            ...prev, 
                            baths: e.target.value ? parseInt(e.target.value) : undefined 
                        }))}
                    >
                        <option value="">Baths</option>
                        {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num}+ baths</option>
                        ))}
                    </select>
                    <select
                        className="p-2 border rounded"
                        value={filters.propertyType || ''}
                        onChange={(e) => setFilters(prev => ({ 
                            ...prev, 
                            propertyType: e.target.value || undefined 
                        }))}
                    >
                        <option value="">Property Type</option>
                        <option value="Residential">Residential</option>
                        <option value="Condo">Condo</option>
                        <option value="MultiFamily">Multi-Family</option>
                        <option value="Land">Land</option>
                    </select>
                </div>
            </div>

            {/* Loading State */}
            {loading ? (
                <PropertyGridSkeleton />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map(property => (
                        <div key={property.ListingKey} className="bg-white rounded-lg shadow-md overflow-hidden">
                            {property.Photos?.[0] && (
                                <div className="relative h-48">
                                    <img
                                        src={property.Photos[0]}
                                        alt={`${property.City} property`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
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

                    {properties.length === 0 && (
                        <div className="col-span-full text-center py-8 text-gray-500">
                            No properties found matching your criteria.
                        </div>
                    )}
                </div>
            )}
        </main>
    );
} 