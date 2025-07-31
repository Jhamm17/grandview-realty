import Image from 'next/image';

export const runtime = 'edge';

export default async function Careers() {
  const openPositions = [
    {
      title: "Real Estate Agent",
      type: "Full-time",
      location: "Chicago Metropolitan Area",
      description: "Join our team of dedicated real estate professionals. We&apos;re looking for motivated agents who are passionate about helping clients find their perfect home."
    },
    {
      title: "Marketing Coordinator",
      type: "Full-time",
      location: "Geneva, IL",
      description: "Support our marketing initiatives across digital and traditional channels. Help showcase our properties and build our brand presence."
    },
    {
      title: "Transaction Coordinator",
      type: "Full-time",
      location: "Geneva, IL",
      description: "Manage real estate transactions from contract to closing. Ensure smooth processes and excellent client communication."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/careersbg.jpg"
              alt="Join Our Team"
              fill
              style={{ objectFit: "cover" }}
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-blue-500/30" />
          </div>
        </div>
        <div className="container-padding relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Build your career with Chicagoland&apos;s premier real estate agency
          </p>
        </div>
      </section>



      {/* Open Positions Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-padding">
          <h2 className="text-3xl font-bold mb-12 text-center">Open Positions</h2>
          
          <div className="grid gap-6">
            {openPositions.map((position, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {position.type}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {position.location}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 md:mb-0">{position.description}</p>
                  </div>
                  <button className="btn-primary whitespace-nowrap">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 