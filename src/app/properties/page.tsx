import PropertySearch from '@/components/PropertySearch';

export default function PropertiesPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-[#081d36] text-white py-12">
                <div className="container-padding">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Find Your Perfect Home
                    </h1>
                    <p className="text-lg text-white/90 max-w-2xl">
                        Explore our curated selection of properties across the Chicagoland area. 
                        Use the filters below to find the perfect match for your needs.
                    </p>
                </div>
            </div>
            
            <PropertySearch />
        </div>
    );
} 