import { defaultHeroImage } from '../../layout';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

// This is a temporary solution until we integrate with the MLS API
const validAreas = [
  'geneva',
  'st-charles',
  'naperville',
  'oak-brook',
  'hinsdale',
  'arlington-heights'
];

export async function generateStaticParams() {
  return validAreas.map((area) => ({
    area: area,
  }));
}

export default async function AreaProperties({ params }: { params: { area: string } }) {
  // Validate the area parameter
  if (!validAreas.includes(params.area)) {
    notFound();
  }

  // Format the area name for display
  const areaName = params.area
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src={defaultHeroImage}
              alt={`Properties in ${areaName}`}
              fill
              style={{ objectFit: "cover" }}
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        </div>
        <div className="container-padding relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Properties in {areaName}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Discover exceptional homes and investment opportunities in {areaName}
          </p>
        </div>
      </section>

      {/* Property Listings */}
      <section className="py-16">
        <div className="container-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* This will be replaced with actual MLS data */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={defaultHeroImage}
                    alt="Property"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Beautiful Home in {areaName}</h3>
                  <p className="text-gray-600 mb-4">{areaName}</p>
                  <p className="text-primary font-bold text-xl mb-4">$599,000</p>
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>4 Beds</span>
                    <span>3 Baths</span>
                    <span>2,500 Sq Ft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 