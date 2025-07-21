'use client';

export const PropertyCardSkeleton = () => (
    <div className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-48 bg-gray-200" /> {/* Image placeholder */}
        <div className="p-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" /> {/* Price */}
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" /> {/* Address */}
            <div className="h-3 bg-gray-200 rounded w-2/3 mb-4" /> {/* City/State */}
            <div className="flex justify-between">
                <div className="h-3 bg-gray-200 rounded w-1/4" /> {/* Beds */}
                <div className="h-3 bg-gray-200 rounded w-1/4" /> {/* Baths */}
                <div className="h-3 bg-gray-200 rounded w-1/4" /> {/* Sqft */}
            </div>
        </div>
    </div>
);

export const PropertyGridSkeleton = ({ count = 6 }: { count?: number }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(count).fill(0).map((_, i) => (
            <PropertyCardSkeleton key={i} />
        ))}
    </div>
);

export const PropertyDetailsSkeleton = () => (
    <div className="animate-pulse max-w-4xl mx-auto">
        <div className="h-96 bg-gray-200 rounded-lg mb-8" /> {/* Main image */}
        <div className="grid grid-cols-4 gap-4 mb-8">
            {Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded" /> /* Thumbnail images */
            ))}
        </div>
        <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-2/3" /> {/* Price */}
            <div className="h-6 bg-gray-200 rounded w-1/2" /> {/* Address */}
            <div className="h-4 bg-gray-200 rounded w-3/4" /> {/* Details */}
            <div className="grid grid-cols-3 gap-4">
                <div className="h-16 bg-gray-200 rounded" /> {/* Beds */}
                <div className="h-16 bg-gray-200 rounded" /> {/* Baths */}
                <div className="h-16 bg-gray-200 rounded" /> {/* Sqft */}
            </div>
            <div className="h-40 bg-gray-200 rounded" /> {/* Description */}
        </div>
    </div>
); 