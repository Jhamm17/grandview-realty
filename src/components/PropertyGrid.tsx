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

                console.log('First property media URL:', results[0]?.Media?.[0]?.MediaURL);
                setProperties(results);
            } finally {
                setLoading(false);
            }
        };

        loadProperties();
    }, [city, minPrice, maxPrice, beds, baths, propertyType]);

    if (loading) return <div>Loading...</div>;

    const firstProperty = properties[0];
    const imageUrl = firstProperty?.Media?.[0]?.MediaURL;

    return (
        <div>
            <div style={{ 
                background: 'red', 
                color: 'white', 
                padding: '20px', 
                margin: '20px',
                fontSize: '24px',
                textAlign: 'center' 
            }}>
                TEST BOX - IF YOU SEE THIS, THE DEPLOYMENT IS WORKING
            </div>

            <div style={{ padding: '20px', margin: '20px', border: '2px solid black' }}>
                <h2 style={{ color: 'blue', marginBottom: '10px' }}>Image Debug Info:</h2>
                <div style={{ wordBreak: 'break-all' }}>URL: {imageUrl}</div>
                {imageError && (
                    <div style={{ 
                        background: '#ffebee', 
                        color: '#c62828', 
                        padding: '10px', 
                        margin: '10px 0',
                        border: '1px solid #ef9a9a' 
                    }}>
                        {imageError}
                    </div>
                )}
            </div>

            {imageUrl && (
                <div style={{ margin: '20px' }}>
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