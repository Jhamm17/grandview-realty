'use client';

import { useState, useEffect } from 'react';
import { Property } from '@/lib/mred/types';
import Image from 'next/image';

interface FilterProps {
  initialProperties: Property[];
}

export interface FilterState {
  city: string;
  minPrice: string;
  maxPrice: string;
  beds: string;
  baths: string;
  propertyType: string;
}

function filterProperties(properties: Property[], filters: FilterState): Property[] {
  return properties.filter(property => {
    // City filter
    if (filters.city && !property.City?.toLowerCase().includes(filters.city.toLowerCase())) {
      return false;
    }

    // Price filters
    if (filters.minPrice && property.ListPrice < parseInt(filters.minPrice)) {
      return false;
    }
    if (filters.maxPrice && property.ListPrice > parseInt(filters.maxPrice)) {
      return false;
    }

    // Bedrooms filter
    if (filters.beds && property.BedroomsTotal < parseInt(filters.beds)) {
      return false;
    }

    // Bathrooms filter
    if (filters.baths && property.BathroomsTotalInteger < parseInt(filters.baths)) {
      return false;
    }

    // Property type filter (if we have this data)
    if (filters.propertyType && property.PropertyType !== filters.propertyType) {
      return false;
    }

    return true;
  });
}

export default function PropertyFilter({ initialProperties }: FilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    city: '',
    minPrice: '',
    maxPrice: '',
    beds: '',
    baths: '',
    propertyType: ''
  });
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(initialProperties);

  useEffect(() => {
    const filtered = filterProperties(initialProperties, filters);
    setFilteredProperties(filtered);
  }, [initialProperties, filters]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      city: '',
      minPrice: '',
      maxPrice: '',
      beds: '',
      baths: '',
      propertyType: ''
    };
    setFilters(clearedFilters);
  };

  return (
    <div>
      {/* Filter Controls */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Filter Properties</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              placeholder="Enter city name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Min Price */}
          <div>
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Min Price
            </label>
            <input
              type="number"
              id="minPrice"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              placeholder="Min price"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Max Price */}
          <div>
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Max Price
            </label>
            <input
              type="number"
              id="maxPrice"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              placeholder="Max price"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Beds */}
          <div>
            <label htmlFor="beds" className="block text-sm font-medium text-gray-700 mb-1">
              Bedrooms
            </label>
            <select
              id="beds"
              value={filters.beds}
              onChange={(e) => handleFilterChange('beds', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>

          {/* Baths */}
          <div>
            <label htmlFor="baths" className="block text-sm font-medium text-gray-700 mb-1">
              Bathrooms
            </label>
            <select
              id="baths"
              value={filters.baths}
              onChange={(e) => handleFilterChange('baths', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
              Property Type
            </label>
            <select
              id="propertyType"
              value={filters.propertyType}
              onChange={(e) => handleFilterChange('propertyType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any</option>
              <option value="Residential">Residential</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Multi-Family">Multi-Family</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredProperties.length} of {initialProperties.length} properties
        </p>
      </div>

      {/* Filtered Properties Grid */}
      {filteredProperties.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-yellow-800 text-lg font-semibold mb-2">No Properties Found</h2>
          <p className="text-yellow-600">
            We couldn&apos;t find any properties matching your criteria. Please try adjusting your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div key={property.ListingId} className="bg-white shadow-md overflow-hidden" style={{ borderRadius: '0' }}>
              {/* Property Image */}
              <div className="relative h-64">
                {(() => {
                  // Sort media by Order to ensure proper sequence, then get the first image
                  const sortedMedia = property.Media?.sort((a, b) => (a.Order || 0) - (b.Order || 0));
                  const firstImage = sortedMedia?.[0];
                  
                  if (firstImage?.MediaURL) {
                    return (
                      <>
                        <Image
                          src={firstImage.MediaURL}
                          alt={`${property.UnparsedAddress || 'Property'} in ${property.City}`}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Listed Badge */}
                        <div className="absolute bottom-0 left-0 bg-blue-400 text-white px-2 py-1 text-lg font-black tracking-wider" style={{ borderRadius: '0' }}>
                          LISTED
                        </div>
                      </>
                    );
                  } else {
                    return (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    );
                  }
                })()}
              </div>

              {/* Property Details */}
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold mb-3">
                  {property.StreetNumber && property.StreetName 
                    ? `${property.StreetNumber} ${property.StreetName} ${property.StreetSuffix || ''}`.trim()
                    : property.UnparsedAddress || 'Address not available'
                  }
                </h3>
                <p className="text-gray-600 mb-4 text-lg">{property.City}</p>
                <p className="text-black font-bold text-2xl mb-4">
                  ${property.ListPrice.toLocaleString()}
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-500 text-sm">
                    <div className="flex flex-col items-center">
                      <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5v4m8-4v4M8 11h8m-8 4h8" />
                      </svg>
                      <span>{property.BedroomsTotal} Beds</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                      </svg>
                      <span>{property.BathroomsTotalInteger} Baths</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>{property.LivingArea?.toLocaleString()} Sq Ft</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 