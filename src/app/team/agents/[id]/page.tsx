import Link from 'next/link';

export default function AgentPage({ params }: { params: { id: string } }) {
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
      description: "Chris Clark launched his real estate career in 2003, and is passionate about helping people achieve their real estate goals by leveraging data, technology and wow service to create raving fans and customers for life. In April, 2021, Chris partnered with Grandview Realty as their Sales Manager to drive growth in the brokerage by increasing transactions, adding agents and growing his personal real estate business under the Clark Home Team banner.",
      bio: "Chris Clark launched his real estate career in 2003, and is passionate about helping people achieve their real estate goals by leveraging data, technology and wow service to create raving fans and customers for life. In April, 2021, Chris partnered with Grandview Realty as their Sales Manager to drive growth in the brokerage by increasing transactions, adding agents and growing his personal real estate business under the Clark Home Team banner.",
      achievements: [
        "Sales Manager at Grandview Realty",
        "Clark Home Team Founder",
        "20+ Years of Real Estate Experience",
        "Data-Driven Approach to Real Estate"
      ],
      areas: ["Chicagoland", "West Suburbs"],
      languages: ["English"]
    },
    {
      id: "michael-chen",
      name: "Michael Chen",
      title: "Commercial Real Estate Specialist",
      image: "/agents/michael-chen.jpg",
      phone: "(555) 234-5678",
      email: "michael.chen@grandviewrealty.com",
      specialties: ["Commercial Properties", "Investment Sales", "Property Management"],
      experience: "12+ years",
      description: "Michael focuses on commercial real estate and investment properties. His deep understanding of market trends and investment strategies has made him a go-to expert for business owners and investors.",
      bio: "Michael brings a unique perspective to commercial real estate with his background in finance and investment analysis. He specializes in helping business owners and investors make informed decisions about their real estate portfolios. His analytical approach combined with extensive market knowledge allows him to identify opportunities that others might miss. Michael is known for his thorough due diligence and ability to structure complex transactions that benefit all parties involved.",
      achievements: [
        "Commercial Real Estate Specialist Designation",
        "Investment Property Expert",
        "Top Commercial Agent 2022",
        "Over 200 commercial transactions"
      ],
      areas: ["Chicago Metro Area", "Suburban Office Parks", "Retail Centers", "Industrial Properties"],
      languages: ["English", "Mandarin"]
    },
    {
      id: "emily-rodriguez",
      name: "Emily Rodriguez",
      title: "Residential Sales Agent",
      image: "/agents/emily-rodriguez.jpg",
      phone: "(555) 345-6789",
      email: "emily.rodriguez@grandviewrealty.com",
      specialties: ["Residential Sales", "New Construction", "Relocation Services"],
      experience: "8+ years",
      description: "Emily excels in residential sales and new construction projects. Her attention to detail and commitment to client satisfaction has earned her numerous repeat clients and referrals.",
      bio: "Emily's passion for real estate began when she helped her own family navigate the home buying process. This personal experience drives her commitment to making the process as smooth and enjoyable as possible for her clients. She specializes in new construction and relocation services, helping families transition smoothly into their new homes. Emily's attention to detail and proactive communication style ensures her clients are always informed and confident throughout their real estate journey.",
      achievements: [
        "New Construction Specialist",
        "Relocation Expert Certification",
        "Client Satisfaction Award 2023",
        "Over 300 residential transactions"
      ],
      areas: ["Arlington Heights", "Schaumburg", "Palatine", "Mount Prospect"],
      languages: ["English", "Spanish"]
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
      description: "David specializes in luxury properties and estate sales. His extensive network and international market knowledge make him the preferred choice for high-end real estate transactions.",
      bio: "With two decades of experience in luxury real estate, David has established himself as the premier choice for high-end property transactions. His extensive network includes international buyers, estate attorneys, and luxury home builders. David understands that luxury real estate requires a different level of service and discretion. He provides white-glove service to his clients, ensuring every detail is handled with the utmost care and professionalism.",
      achievements: [
        "Luxury Home Specialist Designation",
        "International Real Estate Expert",
        "Estate Sales Specialist",
        "Over 150 luxury transactions"
      ],
      areas: ["Lake Forest", "Winnetka", "Kenilworth", "Glencoe", "Highland Park"],
      languages: ["English", "French"]
    }
  ];

  const agent = agents.find(a => a.id === params.id);

  if (!agent) {
    return (
      <div className="container-padding py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-red-800 text-lg font-semibold mb-2">Agent Not Found</h2>
          <p className="text-red-600 mb-4">
            We couldn&apos;t find the agent you&apos;re looking for.
          </p>
          <Link href="/team/agents" className="text-[#60a5fa] hover:text-[#3b82f6] underline">
            ← Back to Agents
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-padding py-16">
      {/* Back Button */}
      <div className="mb-8">
        <Link href="/team/agents" className="text-[#60a5fa] hover:text-[#3b82f6] underline flex items-center">
          ← Back to Agents
        </Link>
      </div>

      {/* Agent Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        {/* Agent Image */}
        <div className="lg:col-span-1">
          <div className="relative h-96 bg-gray-200 rounded-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-500">
                    {agent.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <p className="text-lg">Photo Coming Soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Info */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-2">{agent.name}</h1>
          <p className="text-2xl text-[#60a5fa] font-semibold mb-6">{agent.title}</p>
          
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-lg">{agent.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-lg">{agent.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-lg">{agent.experience} experience</span>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {agent.languages.map((language, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Service Areas</h4>
                                 <div className="flex flex-wrap gap-2">
                   {agent.areas.map((area, idx) => (
                     <span key={idx} className="bg-[#60a5fa]/10 text-[#081d36] px-3 py-1 rounded-full text-sm">
                       {area}
                     </span>
                   ))}
                 </div>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Specialties</h3>
                         <div className="flex flex-wrap gap-3">
               {agent.specialties.map((specialty, idx) => (
                 <span key={idx} className="bg-[#60a5fa]/10 text-[#081d36] px-4 py-2 rounded-full font-semibold">
                   {specialty}
                 </span>
               ))}
             </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6">About {agent.name.split(' ')[0]}</h2>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-gray-700 leading-relaxed text-lg mb-6">{agent.bio}</p>
          <p className="text-gray-700 leading-relaxed text-lg">{agent.description}</p>
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Achievements & Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agent.achievements.map((achievement, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#60a5fa]">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-[#60a5fa] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span className="text-lg font-semibold">{achievement}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <div className="bg-[#60a5fa]/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Work With {agent.name.split(' ')[0]}?</h2>
          <p className="text-gray-600 mb-6">
            {agent.name} is ready to help you achieve your real estate goals with expertise and dedication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`mailto:${agent.email}`} className="bg-[#081d36] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0f2a4a] transition-colors">
              Email {agent.name.split(' ')[0]}
            </a>
            <a href={`tel:${agent.phone}`} className="bg-white text-[#081d36] border border-[#081d36] px-8 py-3 rounded-lg font-semibold hover:bg-[#60a5fa]/5 transition-colors">
              Call {agent.name.split(' ')[0]}
            </a>
            <a href="/properties" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              View Properties
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 