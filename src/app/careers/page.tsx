import Image from 'next/image';

export const runtime = 'edge';

interface Career {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
  salary_range?: string;
  is_active: boolean;
  sort_order: number;
}

async function getCareers(): Promise<Career[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://grandview-realty.vercel.app'}/api/careers`, {
      next: { revalidate: 10 } // Revalidate every 10 seconds
    });
    
    if (!response.ok) {
      console.error('Failed to fetch careers');
      return [];
    }
    
    const data = await response.json();
    return data.careers || [];
  } catch (error) {
    console.error('Error fetching careers:', error);
    return [];
  }
}

export default async function Careers() {
  const openPositions = await getCareers();

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
            <div className="absolute inset-0 bg-[#2C5282]/60" />
          </div>
        </div>
        <div className="container-padding relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Build your career with Chicagoland&apos;s premier real estate agency
          </p>
        </div>
      </section>



      {/* Open Positions Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-padding">
          <h2 className="text-3xl font-bold mb-12 text-center">Open Positions</h2>
          
          <div className="grid gap-6">
            {openPositions.map((position) => (
              <div key={position.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {position.type}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {position.location}
                      </span>
                      {position.salary_range && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {position.salary_range}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{position.description}</p>
                    
                    {/* Requirements */}
                    {position.requirements && position.requirements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Requirements:</h4>
                        <div className="flex flex-wrap gap-2">
                          {position.requirements.map((req, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Benefits */}
                    {position.benefits && position.benefits.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Benefits:</h4>
                        <div className="flex flex-wrap gap-2">
                          {position.benefits.map((benefit, idx) => (
                            <span key={idx} className="px-2 py-1 bg-green-50 text-green-700 rounded text-sm">
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="md:ml-6 mt-4 md:mt-0">
                    <button className="btn-primary whitespace-nowrap">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {openPositions.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No open positions at the moment.</p>
                <p className="text-gray-400 mt-2">Please check back later or contact us for opportunities.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
} 