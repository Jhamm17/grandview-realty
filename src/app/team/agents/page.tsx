
import Link from 'next/link';

export default function AgentsPage() {
  const agents = [
    {
      id: "chris-clark",
      name: "Chris Clark",
      title: "Sales Manager",
      image: "/agents/chris-clark.png",
      logo: "/agents/chris-clark-logo.png",
      phone: "630-973-7825",
      email: "chris.clark@grandviewsells.com",
      specialties: ["Buyers", "Sellers", "Investors"],
      experience: "20+ years",
      serviceArea: "Chicagoland and West Suburbs",
      description: "Chris Clark launched his real estate career in 2003, and is passionate about helping people achieve their real estate goals by leveraging data, technology and wow service to create raving fans and customers for life. In April, 2021, Chris partnered with Grandview Realty as their Sales Manager to drive growth in the brokerage by increasing transactions, adding agents and growing his personal real estate business under the Clark Home Team banner."
    },
    {
      id: "randall-glenn",
      name: "Randall Glenn",
      title: "Agent",
      image: "/agents/randall-glenn.png",
      logo: "/agents/randall-glenn-logo.png",
      phone: "312-752-7415",
      email: "randall@grandviewsells.com",
      specialties: ["Sellers", "Investors"],
      experience: undefined,
      serviceArea: "Chicago and South Suburbs",
      description: "Randall works primarily in the Chicagoland area, and he is extremely diligent to consistently provide his clients with the utmost transparency, professionalism, and respect."
    },
    {
      id: "david-thompson",
      name: "David Thompson",
      title: "Luxury Property Specialist",
      image: "/agents/david-thompson.jpg",
      phone: "(555) 456-7890",
      email: "david.thompson@grandviewrealty.com",
      specialties: ["Luxury Homes", "Estate Sales", "International Buyers"],
      experience: "20+ years",
      description: "David specializes in luxury properties and estate sales. His extensive network and international market knowledge make him the preferred choice for high-end real estate transactions."
    }
  ];

  return (
    <div className="container-padding py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Our Agents</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Meet our dedicated team of real estate professionals who are committed to providing exceptional service and helping you achieve your real estate goals.
        </p>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {agents.map((agent, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Agent Image */}
            <div className="relative w-full aspect-square bg-gray-200">
              {agent.logo ? (
                <img
                  src={agent.logo}
                  alt={agent.name + " logo"}
                  className="object-contain w-full h-full"
                />
              ) : agent.image ? (
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="object-contain w-full h-full"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <div className="w-20 h-20 bg-gray-300 mx-auto mb-3 flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-500">
                        {agent.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <p className="text-sm">Photo Coming Soon</p>
                  </div>
                </div>
              )}
            </div>

            {/* Agent Info */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold mb-1">{agent.name}</h3>
              <p className="text-[#60a5fa] font-semibold mb-4">{agent.title}</p>
              
              {/* Contact Info */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center text-gray-600 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{agent.phone}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{agent.email}</span>
                </div>
              </div>

              {/* View More Button */}
              <Link 
                href={`/team/agents/${agent.id}`}
                className="block w-full bg-[#1a365d] text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-[#2d5a87] transition-colors"
              >
                Agent Info
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Work With Our Team?</h2>
          <p className="text-gray-600 mb-6">
            Our agents are here to help you navigate the real estate market with confidence and expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Contact Us
            </a>
            <a href="/properties" className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              View Properties
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 