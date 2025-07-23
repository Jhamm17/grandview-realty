'use client';

import PropertySearch from '@/components/PropertySearch';

export default function PropertiesPage() {
    return (
        <div className="container-padding py-16">
            <h1 className="text-4xl font-bold mb-8">Available Properties</h1>
            <PropertySearch />
        </div>
    );
} 