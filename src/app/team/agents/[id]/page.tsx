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
      description: "Randall works primarily in the Chicagoland area, and he is extremely diligent to consistently provide his clients with the utmost transparency, professionalism, and respect.",
      bio: "Randall works primarily in the Chicagoland area, and he is extremely diligent to consistently provide his clients with the utmost transparency, professionalism, and respect.",
      achievements: ["Top Producer", "Client Service Award"],
      areas: ["Chicago", "South Suburbs"],
      languages: ["English"]
    },
    {
      id: "yolanda-weathers",
      name: "Yolanda Weathers",
      title: "Agent",
      image: "/agents/yolanda-weathers.png",
      logo: "/agents/yolanda-weathers-logo.png",
      phone: "773-817-6829",
      email: "yolanda@grandviewsells.com",
      specialties: ["Buyers", "Sellers", "Investors"],
      experience: "10+ years",
      serviceArea: "Chicago and West Suburbs",
      description: "Yolanda has been working in real estate for over 10 years. She is diligent and hardworking and willing to do what's necessary to get the job done. She can work with first-time buyers and sellers, investors, renters, landlords, etc. Whether it's residential, investment or commercial – she is the one for the job!",
      bio: "Yolanda has been working in real estate for over 10 years. She is diligent and hardworking and willing to do what's necessary to get the job done. She can work with first-time buyers and sellers, investors, renters, landlords, etc. Whether it's residential, investment or commercial – she is the one for the job!",
      achievements: ["10+ Years of Real Estate Experience", "First-Time Buyer Specialist", "Investment Property Expert", "Commercial Real Estate"],
      areas: ["Chicago", "West Suburbs"],
      languages: ["English"]
    },

    {
      id: "laura-cook",
      name: "Laura Cook-Horlbeck",
      title: "Agent",
      image: "/agents/laura-cook.png",
      logo: "/agents/laura-cook-logo.png",
      phone: "630-235-4791",
      email: "laura@grandviewsells.com",
      specialties: ["Buyers", "Sellers"],
      experience: undefined,
      serviceArea: "Chicago and West Suburbs",
      description: "My enthusiasm for real estate, my professional approach and my drive to always exceed expectations is something you will appreciate as we work together. I take pride in my attention to detail, communication, and negotiation skills, ensuring my clients a smooth process throughout the entire transaction, from listing to closing!",
      bio: "My enthusiasm for real estate, my professional approach and my drive to always exceed expectations is something you will appreciate as we work together. I take pride in my attention to detail, communication, and negotiation skills, ensuring my clients a smooth process throughout the entire transaction, from listing to closing!",
      achievements: ["Attention to Detail Specialist", "Expert Negotiator", "Smooth Transaction Process", "Chicago and West Suburbs Expert"],
      areas: ["Chicago", "West Suburbs"],
      languages: ["English"]
    },
    {
      id: "elias-mondragon",
      name: "Elias Mondragon",
      title: "Agent",
      image: "/agents/elias-mondragon.png",
      logo: "/agents/elias-mondragon-logo.png",
      phone: "630-538-2383",
      email: "elias@grandviewsells.com",
      specialties: ["Buyers", "Sellers", "Investors"],
      experience: undefined,
      serviceArea: "Chicago and surrounding suburbs",
      description: "In today's digitally driven world, personalized attention is often hard to come by. That's why I'm committed to bringing back the art of genuine service: driven by loyalty, honesty, and authenticity. I have a strong desire to go above and beyond what is expected. Whether you're navigating the complexities of buying or selling, I'm here to ensure a seamless, stress-free experience.",
      bio: "In today's digitally driven world, personalized attention is often hard to come by. That's why I'm committed to bringing back the art of genuine service: driven by loyalty, honesty, and authenticity. I have a strong desire to go above and beyond what is expected. Whether you're navigating the complexities of buying or selling, I'm here to ensure a seamless, stress-free experience.",
      achievements: ["Genuine Service Specialist", "Loyalty & Honesty Focused", "Stress-Free Transaction Expert", "Chicago Area Specialist"],
      areas: ["Chicago", "Surrounding Suburbs"],
      languages: ["English"]
    },
    {
      id: "david-rodriguez",
      name: "David Rodriguez",
      title: "Agent",
      image: "/agents/david-rodriguez.png",
      logo: "/agents/david-rodriguez-logo.png",
      phone: "630-461-7263",
      email: "david@grandviewsells.com",
      specialties: ["Buyers", "Sellers", "Investors"],
      experience: undefined,
      serviceArea: "Chicago and surrounding suburbs",
      description: "With boundless enthusiasm and a steadfast commitment to putting my client's best interests first, I am a bilingual real estate agent fluent in Spanish, ensuring a seamless experience for buyers, sellers, and investors alike. I approach each transaction with unwavering determination, leveraging my linguistic skills and market expertise to navigate the complexities of real estate transactions. Whether it's finding the perfect home, negotiating the best deal, or securing a satisfactory closing, I am here to guide you every step of the way. So, what's your next move? Let's make it happen together.",
      bio: "With boundless enthusiasm and a steadfast commitment to putting my client's best interests first, I am a bilingual real estate agent fluent in Spanish, ensuring a seamless experience for buyers, sellers, and investors alike. I approach each transaction with unwavering determination, leveraging my linguistic skills and market expertise to navigate the complexities of real estate transactions. Whether it's finding the perfect home, negotiating the best deal, or securing a satisfactory closing, I am here to guide you every step of the way. So, what's your next move? Let's make it happen together.",
      achievements: ["Bilingual Real Estate Specialist", "Client-First Approach", "Expert Negotiator", "Chicago Area Expert"],
      areas: ["Chicago", "Surrounding Suburbs"],
      languages: ["English", "Spanish"]
    },
    {
      id: "steve-zidek",
      name: "Steve Zidek",
      title: "Agent",
      image: "/agents/stephen-zidek.png",
      logo: "/agents/stephen-zidek-logo.png",
      phone: "630-212-0064",
      email: "zideksteve1@gmail.com",
      specialties: ["Buyers", "Sellers", "Investors"],
      experience: undefined,
      serviceArea: "Chicago and Surrounding suburbs",
      description: "Steve is an experienced Real Estate Broker and Certified Residential Appraiser. With an in depth value perspective, he works tirelessly to make sure your best interests are protected and your equity position is always preserved. Steve treats every transaction as if it were his own and considers communication to be one of the most important aspects of his role through all phases of your successful real estate transaction.",
      bio: "Steve is an experienced Real Estate Broker and Certified Residential Appraiser. With an in depth value perspective, he works tirelessly to make sure your best interests are protected and your equity position is always preserved. Steve treats every transaction as if it were his own and considers communication to be one of the most important aspects of his role through all phases of your successful real estate transaction.",
      achievements: ["Certified Residential Appraiser", "Real Estate Broker", "Value Perspective Expert", "Equity Protection Specialist"],
      areas: ["Chicago", "Surrounding Suburbs"],
      languages: ["English"]
    },
    {
      id: "alberto-monarrez",
      name: "Alberto Monarrez",
      title: "Agent",
      image: "/agents/alberto-monarrez.png",
      logo: "/agents/alberto-monarrez-logo.png",
      phone: "773-742-6728",
      email: "alberto9804@gmail.com",
      specialties: ["Buyers", "Sellers", "Investors"],
      experience: "20+ years",
      serviceArea: "Chicago and surrounding suburbs",
      description: "Alberto, family man with over 20 + years of experience in the real estate industry, now member of Grandview Realty Family. Ready to help represent buyers and sellers, as well as investors. Alberto holds a General Contractor License and specializes in Residential Development and Renovation. He has the ability to examine real estate transactions in detail from a financial and practical perspective and design creative solutions for clients. Alberto is committed and passionate about Real Estate, he is ready to assist in every step of buying, selling and be part of your next Real Estate adventure.",
      bio: "Alberto, family man with over 20 + years of experience in the real estate industry, now member of Grandview Realty Family. Ready to help represent buyers and sellers, as well as investors. Alberto holds a General Contractor License and specializes in Residential Development and Renovation. He has the ability to examine real estate transactions in detail from a financial and practical perspective and design creative solutions for clients. Alberto is committed and passionate about Real Estate, he is ready to assist in every step of buying, selling and be part of your next Real Estate adventure.",
      achievements: ["20+ Years Real Estate Experience", "General Contractor License", "Residential Development Specialist", "Renovation Expert"],
      areas: ["Chicago", "Surrounding Suburbs"],
      languages: ["English", "Spanish"]
    },
    {
      id: "jim-karner",
      name: "Jim Karner",
      title: "Agent",
      image: "/agents/jim-karner.png",
      logo: "/agents/jim-karner-logo.png",
      phone: "630-220-2107",
      email: "jimkarnerteam@gmail.com",
      specialties: ["Buyers", "Sellers", "Family"],
      experience: undefined,
      serviceArea: "Chicago and Surrounding Suburbs",
      description: "With a rich background in the financial services industry, Jim brings a wealth of expertise to the real estate market. Transitioning seamlessly into a realtor role, Jim combines financial acumen with a passion for helping all of his clients. Whether it's finding their dream homes or guiding his clients through the selling process, Jim's thoroughness and care are unmatched. As a dedicated family man with a wife and four children, Jim understands the importance of finding the perfect home for every family's unique needs. With Jim as your realtor, you can trust in his commitment to finding the ideal property for you and your loved ones.",
      bio: "With a rich background in the financial services industry, Jim brings a wealth of expertise to the real estate market. Transitioning seamlessly into a realtor role, Jim combines financial acumen with a passion for helping all of his clients. Whether it's finding their dream homes or guiding his clients through the selling process, Jim's thoroughness and care are unmatched. As a dedicated family man with a wife and four children, Jim understands the importance of finding the perfect home for every family's unique needs. With Jim as your realtor, you can trust in his commitment to finding the ideal property for you and your loved ones.",
      achievements: ["Financial Services Background", "Family-Focused Realtor", "Dream Home Specialist", "Thorough Transaction Care"],
      areas: ["Chicago", "Surrounding Suburbs"],
      languages: ["English"]
    },
    {
      id: "shaun-israel",
      name: "Shaun Israel",
      title: "Agent",
      image: "/agents/shaun-israel.png",
      logo: "/agents/shaun-israel-logo.png",
      phone: "312-882-0110",
      email: "shaunisrael@icloud.com",
      specialties: ["Buyers", "Renters"],
      experience: undefined,
      serviceArea: "Chicago and West Suburbs",
      description: "My enthusiasm for real estate, my professional approach and my drive to always exceed expectations is something you will appreciate as we work together. I take pride in my attention to detail, communication, and negotiation skills, ensuring my clients a smooth process throughout the entire transaction, from listing to closing!",
      bio: "My enthusiasm for real estate, my professional approach and my drive to always exceed expectations is something you will appreciate as we work together. I take pride in my attention to detail, communication, and negotiation skills, ensuring my clients a smooth process throughout the entire transaction, from listing to closing!",
      achievements: ["Professional Real Estate Approach", "Attention to Detail Expert", "Communication Specialist", "Negotiation Skills"],
      areas: ["Chicago", "West Suburbs"],
      languages: ["English"]
    },
    {
      id: "katherine-alderfer",
      name: "Katherine Alderfer",
      title: "Agent",
      image: "/agents/katherine-alderfer.png",
      logo: "/agents/katherine-alderfer-logo.png",
      phone: "630-216-9178",
      email: "katherine@homesbykalderfer.com",
      specialties: ["Buyers", "Sellers", "Family"],
      experience: undefined,
      serviceArea: "Chicagoland and Suburbs",
      description: "With a contagious smile that instantly puts clients at ease, Katherine brings a unique blend of warmth and professionalism to the world of real estate. Her genuine care for people and passion for helping others find their dream homes make her an invaluable asset to the Grandview Realty team.",
      bio: "With a contagious smile that instantly puts clients at ease, Katherine brings a unique blend of warmth and professionalism to the world of real estate. Her genuine care for people and passion for helping others find their dream homes make her an invaluable asset to the Grandview Realty team.",
      achievements: ["Warm & Professional Approach", "Client Comfort Specialist", "Dream Home Finder", "People-Focused Realtor"],
      areas: ["Chicagoland", "Suburbs"],
      languages: ["English"]
    },
    {
      id: "adam-turner",
      name: "Adam Turner",
      title: "Agent",
      image: "/agents/adam-turner.jpeg",
      logo: "/agents/adam-turner.jpeg",
      phone: "224-325-5871",
      email: "eaglefreedomrealestate@outlook.com",
      specialties: ["Buyers", "Sellers", "Investors"],
      experience: "Newly Licensed",
      serviceArea: "Chicagoland and Suburbs",
      description: "Newly licensed realtor and excited to begin a new career! Real estate has always been a passion of mine and I can't think of a better industry to work in. My entire work experience has been centered around customer service. I will continue to apply the skills I learned over the years to assist buyers/sellers in the real estate market, putting my client's needs first and doing my best to ensure a smooth and transparent process.",
      bio: "Newly licensed realtor and excited to begin a new career! Real estate has always been a passion of mine and I can't think of a better industry to work in. My entire work experience has been centered around customer service. I will continue to apply the skills I learned over the years to assist buyers/sellers in the real estate market, putting my client's needs first and doing my best to ensure a smooth and transparent process.",
      achievements: ["Newly Licensed Realtor", "Customer Service Expert", "Client-First Approach", "Transparent Process Specialist"],
      areas: ["Chicagoland", "Suburbs"],
      languages: ["English"]
    },
    {
      id: "sam-tousi",
      name: "Sam Tousi",
      title: "Agent",
      image: "/agents/sam-tousi.png",
      logo: "/agents/sam-tousi.png",
      phone: "847-962-8400",
      email: "samtousi@hotmail.com",
      specialties: ["Buyers", "Sellers", "Investors"],
      experience: "25+ years",
      serviceArea: "North and Northwest Suburbs",
      description: "With over 25 years of experience as a licensed real estate broker and more than 40 years of familiarity with the North and Northwest suburbs, Sam Tousi brings unmatched local expertise and industry knowledge. He specializes in residential, commercial, investment, and new construction properties, providing clients with reliable guidance and proven results.",
      bio: "With over 25 years of experience as a licensed real estate broker and more than 40 years of familiarity with the North and Northwest suburbs, Sam Tousi brings unmatched local expertise and industry knowledge. He specializes in residential, commercial, investment, and new construction properties, providing clients with reliable guidance and proven results.",
      achievements: ["25+ Years Licensed Broker", "40+ Years Local Knowledge", "Residential Specialist", "Commercial & Investment Expert", "New Construction Specialist"],
      areas: ["North Suburbs", "Northwest Suburbs"],
      languages: ["English"]
    },
    {
      id: "christopher-lobrillo",
      name: "Christopher Lobrillo",
      title: "Managing Broker",
      image: "/agents/christopher-lobrillo.png",
      logo: "/agents/christopher-lobrillo-logo.png",
      phone: "630-423-7989",
      email: "chris@grandviewsells.com",
      specialties: ["Buyers", "Sellers", "Investors"],
      experience: undefined,
      serviceArea: "Chicago and Surrounding Suburbs",
      description: "Christopher Lobrillo serves as the Managing Broker at Grandview Realty, overseeing operations and ensuring the highest standards of service for our clients. With extensive experience in real estate management and a commitment to excellence, Christopher leads our team with dedication and expertise.",
      bio: "Christopher Lobrillo serves as the Managing Broker at Grandview Realty, overseeing operations and ensuring the highest standards of service for our clients. With extensive experience in real estate management and a commitment to excellence, Christopher leads our team with dedication and expertise.",
      achievements: ["Managing Broker", "Operations Management", "Team Leadership", "Service Excellence"],
      areas: ["Chicago", "Surrounding Suburbs"],
      languages: ["English"]
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
            {agent.image ? (
              <img
                src={agent.image}
                alt={agent.name}
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
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
            )}
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
          <p className="text-gray-700 leading-relaxed text-lg">{agent.bio}</p>
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