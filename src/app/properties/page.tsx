'use client';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import PropertySearch from '@/components/PropertySearch';
import { useState } from 'react';

function ErrorFallback({ error }: { error: Error }) {
    return (
        <div className="p-4 bg-red-100 text-red-700 rounded">
            <h3 className="font-bold mb-2">Something went wrong:</h3>
            <pre className="text-sm whitespace-pre-wrap">{error.message}</pre>
            {error.stack && (
                <pre className="mt-2 text-xs text-red-600 whitespace-pre-wrap">{error.stack}</pre>
            )}
        </div>
    );
}

export default function PropertiesPage() {
    const [key, setKey] = useState(0);

    const handleError = (error: Error) => {
        console.error('Properties page error:', error);
        // Reset the component on error
        setKey(prev => prev + 1);
    };

    return (
        <div className="container-padding py-16">
            <h1 className="text-4xl font-bold mb-8">Available Properties</h1>
            <ErrorBoundary 
                key={key}
                fallback={ErrorFallback}
                onError={handleError}
            >
                <PropertySearch />
            </ErrorBoundary>
            <div className="mt-8 p-4 bg-blue-100 rounded">
                <p>If you see this, the page container is working</p>
            </div>
        </div>
    );
} 