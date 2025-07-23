'use client';

import PropertySearch from '@/components/PropertySearch';

export default function PropertiesPage() {
    return (
        <div className="container-padding py-16">
            <h1 className="text-4xl font-bold mb-8">Available Properties</h1>
            <PropertySearch />
            <div className="bg-blue-100 p-4 rounded mt-8">
                Test Component - Property Search should appear above this
            </div>
        </div>
    );
} 