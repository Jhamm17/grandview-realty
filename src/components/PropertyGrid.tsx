'use client';

import { useEffect, useState } from 'react';
import { Property } from '@/lib/mred/types';
import { mlsGridService } from '@/lib/mred/api';

export function PropertyGrid({ city, minPrice, maxPrice, beds, baths, propertyType }: any) {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState<string | null>(null);

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
            <div className="mb-4 p-4 bg-gray-100 rounded">
                <h3 className="font-bold mb-2">Debug Information:</h3>
                <div className="text-sm font-mono break-all">Image URL: {imageUrl}</div>
                {imageError && (
                    <div className="mt-2 p-2 bg-red-100 text-red-700 rounded">
                        Error loading image: {imageError}
                    </div>
                )}
            </div>

            {imageUrl && (
                <div className="mt-4">
                    <img 
                        src={imageUrl} 
                        style={{ maxWidth: '300px', height: 'auto' }}
                        alt="Test property"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            setImageError(`Failed to load image from URL: ${target.src}`);
                        }}
                    />
                </div>
            )}
        </div>
    );
} 