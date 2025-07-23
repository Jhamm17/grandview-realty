'use client';

import { useEffect, useState } from 'react';
import { Property } from '@/lib/mred/types';
import { mlsGridService } from '@/lib/mred/api';
import { PropertyGridSkeleton } from './PropertyLoading';

export function PropertyGrid({ city, minPrice, maxPrice, beds, baths, propertyType }: any) {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProperties = async () => {
            try {
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

                // Log the first property's media URL for debugging
                if (results[0]?.Media?.[0]) {
                    console.log('First property media URL:', results[0].Media[0].MediaURL);
                }

                setProperties(results);
            } finally {
                setLoading(false);
            }
        };

        loadProperties();
    }, [city, minPrice, maxPrice, beds, baths, propertyType]);

    if (loading) return <div>Loading...</div>;

    // Just render the first property's image for testing
    const firstProperty = properties[0];
    const imageUrl = firstProperty?.Media?.[0]?.MediaURL;

    return (
        <div className="p-4">
            <div>Debug URL: {imageUrl}</div>
            {imageUrl && (
                <div className="mt-4">
                    <img 
                        src={imageUrl} 
                        style={{ maxWidth: '300px', height: 'auto' }}
                        alt="Test property"
                    />
                </div>
            )}
        </div>
    );
} 