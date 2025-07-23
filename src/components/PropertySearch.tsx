'use client';

import { useState } from 'react';
import { PropertyGrid } from './PropertyGrid';

export default function PropertySearch() {
    const [filters, setFilters] = useState({
        city: '',
        minPrice: undefined as number | undefined,
        maxPrice: undefined as number | undefined,
        beds: undefined as number | undefined,
        baths: undefined as number | undefined,
        propertyType: undefined as string | undefined
    });

    return (
        <div className="container-padding py-8">
            {/* Filters */}
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

            {/* Property Grid */}
            <PropertyGrid {...filters} />
        </div>
    );
} 