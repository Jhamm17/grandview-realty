'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { mockMredApi } from '@/lib/mred/mockData';
import type { Property } from '@/lib/mred/api';

export default function PropertySearch() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        city: '',
        minPrice: '',
        maxPrice: '',
        beds: '',
        baths: '',
        status: 'Active'
    });

    useEffect(() => {
        loadProperties();
    }, [filters]);

    const loadProperties = async () => {
        setLoading(true);
        try {
            const results = await mockMredApi.searchProperties({
                city: filters.city || undefined,
                minPrice: filters.minPrice ? parseInt(filters.minPrice) : undefined,
                maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : undefined,
                beds: filters.beds ? parseInt(filters.beds) : undefined,
                baths: filters.baths ? parseInt(filters.baths) : undefined,
                status: filters.status,
                limit: 10
            });
            setProperties(results);
        } catch (error) {
            console.error('Error loading properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="container-padding py-8">
            {/* Search Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                            type="text"
                            name="city"
                            value={filters.city}
                            onChange={handleFilterChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                            placeholder="Enter city"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                        <input
                            type="number"
                            name="minPrice"
                            value={filters.minPrice}
                            onChange={handleFilterChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                            placeholder="Min price"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                        <input
                            type="number"
                            name="maxPrice"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                            placeholder="Max price"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Beds</label>
                        <input
                            type="number"
                            name="beds"
                            value={filters.beds}
                            onChange={handleFilterChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                            placeholder="Bedrooms"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Baths</label>
                        <input
                            type="number"
                            name="baths"
                            value={filters.baths}
                            onChange={handleFilterChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                            placeholder="Bathrooms"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        >
                            <option value="Active">Active</option>
                            <option value="Under Contract">Under Contract</option>
                            <option value="Sold">Sold</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Results */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map(property => (
                        <div key={property.ListingKey} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative h-48">
                                <Image
                                    src={property.Photos?.[0] || '/placeholder-house.jpg'}
                                    alt={`Property at ${property.City}`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900">{formatPrice(property.ListPrice)}</h3>
                                    <span className="px-2 py-1 text-sm rounded bg-primary/10 text-primary">
                                        {property.StandardStatus}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-600 mb-4">
                                    <span>{property.BedroomsTotal} beds</span>
                                    <span>{property.BathroomsTotalInteger} baths</span>
                                    <span>{property.LivingArea.toLocaleString()} sqft</span>
                                </div>
                                <p className="text-gray-600 mb-4">
                                    {property.City}, {property.StateOrProvince} {property.PostalCode}
                                </p>
                                <p className="text-gray-700 line-clamp-3">{property.PublicRemarks}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && properties.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No properties found matching your criteria.</p>
                </div>
            )}
        </div>
    );
} 