import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const featuredAreas = [
    { name: "Geneva", description: "Historic charm meets modern luxury" },
    { name: "St. Charles", description: "Riverside living and vibrant community" },
    { name: "Naperville", description: "Award-winning schools and family-friendly neighborhoods" },
    { name: "Oak Brook", description: "Upscale living and premier shopping" },
    { name: "Hinsdale", description: "Prestigious homes and excellent schools" },
    { name: "Arlington Heights", description: "Dynamic suburban lifestyle" }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/hero-image.jpg"
              alt="Beautiful homes in Chicagoland"
              fill
              style={{ objectFit: "cover" }}
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>
        
        <div className="container-padding relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Your Gateway to Chicagoland Living
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Discover exceptional properties across the Chicago metropolitan area with Grandview Realty&apos;s expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/properties" className="btn-primary text-center">
                View Properties
              </Link>
              <Link href="/contact" className="btn-secondary bg-white/10 text-white border-white text-center">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Areas */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-padding">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Areas</h2>
          <p className="text-gray-600 mb-12 max-w-2xl">
            From historic Geneva to vibrant Naperville, we serve communities throughout the Chicagoland area.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAreas.map((area, index) => (
              <div key={area.name} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-[1.02]">
                <div className="relative h-48">
                  <Image
                    src={`/area-${index + 1}.jpg`}
                    alt={area.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{area.name}</h3>
                  <p className="text-gray-600">{area.description}</p>
                  <Link 
                    href={`/properties/${area.name.toLowerCase().replace(' ', '-')}`}
                    className="mt-4 inline-block text-primary hover:text-primary/80 font-medium"
                  >
                    View Listings →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 md:py-24">
        <div className="container-padding">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Properties</h2>
          <p className="text-gray-600 mb-12 max-w-2xl">
            Explore our handpicked selection of premium properties across Chicago&apos;s most desirable neighborhoods.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Property Cards */}
            {[
              {
                title: "Luxury Family Home",
                location: "St. Charles",
                price: "$899,000",
                beds: 5,
                baths: 4.5,
                sqft: "4,200"
              },
              {
                title: "Modern Townhouse",
                location: "Naperville",
                price: "$525,000",
                beds: 3,
                baths: 2.5,
                sqft: "2,100"
              },
              {
                title: "Historic Estate",
                location: "Geneva",
                price: "$1,275,000",
                beds: 6,
                baths: 5.5,
                sqft: "5,800"
              }
            ].map((property, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-[1.02]">
                <div className="relative h-64">
                  <Image
                    src={`/property-${i + 1}.jpg`}
                    alt={property.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-4">{property.location}</p>
                  <p className="text-primary font-bold text-xl mb-4">{property.price}</p>
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>{property.beds} Beds</span>
                    <span>{property.baths} Baths</span>
                    <span>{property.sqft} Sq Ft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-padding">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose Grandview Realty</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Local Expertise",
                description: "Deep knowledge of Chicagoland's diverse real estate markets and neighborhoods.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                )
              },
              {
                title: "Dedicated Service",
                description: "Personalized attention and support throughout your real estate journey across the Chicago metropolitan area.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                )
              },
              {
                title: "Proven Results",
                description: "Successfully helping clients buy and sell properties throughout Chicagoland since 2005.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                )
              }
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
