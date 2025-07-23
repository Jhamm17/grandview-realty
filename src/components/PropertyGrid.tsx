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
    const [imageError, setImageError] = useState<string | null>(null);

    useEffect(() => {
        const loadProperties = async () => {
            try {
                setLoading(true);
                setError(null);
                setImageError(null);

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
        return <div>Loading properties...</div>;
    }

    if (error) {
        return (
            <div style={{ 
                padding: '20px', 
                margin: '20px', 
                backgroundColor: '#fee2e2', 
                border: '1px solid #ef4444',
                borderRadius: '8px'
            }}>
                <h3 style={{ color: '#b91c1c', marginBottom: '8px' }}>Error Loading Properties</h3>
                <p style={{ color: '#dc2626' }}>{error}</p>
            </div>
        );
    }

    // Just render the first property for testing
    const firstProperty = properties[0];
    const imageUrl = firstProperty?.Media?.[0]?.MediaURL;

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ 
                padding: '20px', 
                marginBottom: '20px', 
                backgroundColor: '#f3f4f6', 
                borderRadius: '8px' 
            }}>
                <h3 style={{ marginBottom: '10px', fontWeight: 'bold' }}>Debug Information:</h3>
                <div style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                    <p>Properties loaded: {properties.length}</p>
                    <p>First property ID: {firstProperty?.ListingId}</p>
                    <p>Image URL: {imageUrl || 'No image URL'}</p>
                </div>
                {imageError && (
                    <div style={{ 
                        marginTop: '10px',
                        padding: '10px',
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        borderRadius: '4px'
                    }}>
                        {imageError}
                    </div>
                )}
            </div>

            {imageUrl && (
                <div style={{ marginTop: '20px' }}>
                    <img 
                        src={imageUrl} 
                        style={{ maxWidth: '300px', height: 'auto' }}
                        alt="Test property"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            console.error('Image load error:', target.src);
                            setImageError(`Failed to load image: ${target.src}`);
                        }}
                    />
                </div>
            )}
        </div>
    );
} 