

export default function AgentsPage() {
  const agents = [
    {
      name: "Sarah Johnson",
      title: "Senior Real Estate Agent",
      image: "/agents/sarah-johnson.jpg",
      phone: "(555) 123-4567",
      email: "sarah.johnson@grandviewrealty.com",
      specialties: ["Residential Sales", "Luxury Properties", "First-Time Buyers"],
      experience: "15+ years",
      description: "Sarah specializes in residential sales and has helped hundreds of families find their dream homes. Her expertise in luxury properties and first-time buyer guidance makes her a trusted advisor in the community."
    },
    {
      name: "Michael Chen",
      title: "Commercial Real Estate Specialist",
      image: "/agents/michael-chen.jpg",
      phone: "(555) 234-5678",
      email: "michael.chen@grandviewrealty.com",
      specialties: ["Commercial Properties", "Investment Sales", "Property Management"],
      experience: "12+ years",
      description: "Michael focuses on commercial real estate and investment properties. His deep understanding of market trends and investment strategies has made him a go-to expert for business owners and investors."
    },
    {
      name: "Emily Rodriguez",
      title: "Residential Sales Agent",
      image: "/agents/emily-rodriguez.jpg",
      phone: "(555) 345-6789",
      email: "emily.rodriguez@grandviewrealty.com",
      specialties: ["Residential Sales", "New Construction", "Relocation Services"],
      experience: "8+ years",
      description: "Emily excels in residential sales and new construction projects. Her attention to detail and commitment to client satisfaction has earned her numerous repeat clients and referrals."
    },
    {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
        {agents.map((agent, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Agent Image */}
            <div className="relative h-80 bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-500">
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <p className="text-sm">Photo Coming Soon</p>
                </div>
              </div>
            </div>

            {/* Agent Info */}
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2">{agent.name}</h3>
              <p className="text-blue-600 font-semibold mb-4">{agent.title}</p>
              
              {/* Contact Info */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{agent.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{agent.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{agent.experience} experience</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {agent.specialties.map((specialty, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">{agent.description}</p>
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