
import Link from 'next/link';
import Image from 'next/image';

export default function AgentsPage() {
  const agents = [
    {
      id: "christopher-lobrillo",
      name: "Christopher Lobrillo",
      title: "Managing Broker & Managing Partner",
      image: "/agents/christopher-lobrillo.png",
      logo: "/agents/chris-lobrillo-logo.png",
      phone: "630-802-4411",
      email: "chris@grandviewsells.com",
      specialties: ["Buyers", "Sellers", "Investors", "REO", "Corporate"],
      experience: "20+ years",
      serviceArea: "Chicago and Surrounding Suburbs",
      description: "Christopher Lobrillo brings over 20 years of experience in the real estate industry and serves as Owner and Managing Broker of Grandview Realty. He is actively involved in guiding the firm's growth, operations, and agent mentorship programs. Before co-founding Grandview Realty, Christopher was a partner on the top-performing real estate team in Kane County, Illinois, under the RE/MAX brand. Over the course of his career, he has successfully closed more than 3,700 transactions, covering residential, REO, and corporate properties. Known for his strategic insight and hands-on leadership, Christopher is passionate about business development and supporting agents as they build thriving careers."
    },
    {
      id: "lynda-werner",
      name: "Lynda Werner",
      title: "Operations Manager | Licensed Real Estate Agent",
      image: "/agents/lynda-werner.png",
      logo: "/agents/lynda-werner-logo.png",
      phone: "630-402-6382",
      email: "lynda@grandviewsells.com",
      specialties: ["Buyers", "Sellers", "Operations", "REO"],
      experience: "20+ years",
      serviceArea: "Chicago and Surrounding Suburbs",
      description: "With over 20 years of experience in the real estate industry, Lynda Werner brings a wealth of knowledge and operational expertise to her role as Operations Manager at Grandview Realty. Her diverse background spans real estate collections, foreclosure, bankruptcy, REO management, and mortgage auditing—providing her with a comprehensive understanding of the industry from every angle. At Grandview Realty, Lynda oversees the administrative and support staff, ensuring smooth day-to-day operations and seamless service for agents and clients alike. She is deeply committed to fostering professional growth and encourages continuous development among team members."
    },
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
      description: "Yolanda has been working in real estate for over 10 years. She is diligent and hardworking and willing to do what's necessary to get the job done. She can work with first-time buyers and sellers, investors, renters, landlords, etc. Whether it's residential, investment or commercial – she is the one for the job!"
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
      description: "My enthusiasm for real estate, my professional approach and my drive to always exceed expectations is something you will appreciate as we work together. I take pride in my attention to detail, communication, and negotiation skills, ensuring my clients a smooth process throughout the entire transaction, from listing to closing!"
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
      description: "In today's digitally driven world, personalized attention is often hard to come by. That's why I'm committed to bringing back the art of genuine service: driven by loyalty, honesty, and authenticity. I have a strong desire to go above and beyond what is expected. Whether you're navigating the complexities of buying or selling, I'm here to ensure a seamless, stress-free experience."
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
      description: "With boundless enthusiasm and a steadfast commitment to putting my client's best interests first, I am a bilingual real estate agent fluent in Spanish, ensuring a seamless experience for buyers, sellers, and investors alike. I approach each transaction with unwavering determination, leveraging my linguistic skills and market expertise to navigate the complexities of real estate transactions. Whether it's finding the perfect home, negotiating the best deal, or securing a satisfactory closing, I am here to guide you every step of the way. So, what's your next move? Let's make it happen together."
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
      description: "Steve is an experienced Real Estate Broker and Certified Residential Appraiser. With an in depth value perspective, he works tirelessly to make sure your best interests are protected and your equity position is always preserved. Steve treats every transaction as if it were his own and considers communication to be one of the most important aspects of his role through all phases of your successful real estate transaction."
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
      description: "Alberto, family man with over 20 + years of experience in the real estate industry, now member of Grandview Realty Family. Ready to help represent buyers and sellers, as well as investors. Alberto holds a General Contractor License and specializes in Residential Development and Renovation. He has the ability to examine real estate transactions in detail from a financial and practical perspective and design creative solutions for clients. Alberto is committed and passionate about Real Estate, he is ready to assist in every step of buying, selling and be part of your next Real Estate adventure."
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
      description: "With a rich background in the financial services industry, Jim brings a wealth of expertise to the real estate market. Transitioning seamlessly into a realtor role, Jim combines financial acumen with a passion for helping all of his clients. Whether it's finding their dream homes or guiding his clients through the selling process, Jim's thoroughness and care are unmatched. As a dedicated family man with a wife and four children, Jim understands the importance of finding the perfect home for every family's unique needs. With Jim as your realtor, you can trust in his commitment to finding the ideal property for you and your loved ones."
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
      description: "Specializing in helping buyers and renters find their perfect home, Shaun brings a fresh perspective and dedicated approach to real estate. With a focus on exceptional customer service and attention to detail, he ensures every client receives personalized guidance throughout their home search journey. Shaun's commitment to understanding his clients' unique needs and preferences makes him an invaluable partner in finding the right property."
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
      description: "With a contagious smile that instantly puts clients at ease, Katherine brings a unique blend of warmth and professionalism to the world of real estate. Her genuine care for people and passion for helping others find their dream homes make her an invaluable asset to the Grandview Realty team."
    },
    {
      id: "adam-turner",
      name: "Adam Turner",
      title: "Agent",
      image: "/agents/adam-turner.jpeg",
      logo: "/agents/adam-turner-logo.png",
      phone: "224-325-5871",
      email: "eaglefreedomrealestate@outlook.com",
      specialties: ["Buyers", "Sellers", "Investors"],
      experience: "Newly Licensed",
      serviceArea: "Chicagoland and Suburbs",
      description: "Newly licensed realtor and excited to begin a new career! Real estate has always been a passion of mine and I can't think of a better industry to work in. My entire work experience has been centered around customer service. I will continue to apply the skills I learned over the years to assist buyers/sellers in the real estate market, putting my client's needs first and doing my best to ensure a smooth and transparent process."
    },
    {
      id: "sam-tousi",
      name: "Sam Tousi",
      title: "Agent",
      image: "/agents/sam-tousi.png",
      logo: "/agents/sam-tousi-logo.png",
      phone: "847-962-8400",
      email: "samtousi@hotmail.com",
      specialties: ["Buyers", "Sellers", "Investors"],
      experience: "25+ years",
      serviceArea: "North and Northwest Suburbs",
      description: "With over 25 years of experience as a licensed real estate broker and more than 40 years of familiarity with the North and Northwest suburbs, Sam Tousi brings unmatched local expertise and industry knowledge. He specializes in residential, commercial, investment, and new construction properties, providing clients with reliable guidance and proven results."
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
              alt="Grandview Realty Agents"
              fill
              style={{ objectFit: "cover" }}
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-slate-800/70" />
          </div>
        </div>
        <div className="container-padding relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Agents
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Meet our dedicated team of real estate professionals who are committed to providing exceptional service and helping you achieve your real estate goals.
          </p>
        </div>
      </section>

      <div className="container-padding py-16">
        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Agent Image with Name/Title Overlay */}
              <div className="relative w-full aspect-square bg-white">
                {agent.logo ? (
                  <div className="w-full h-full flex items-end justify-center p-4 pb-8">
                    <img
                      src={agent.logo}
                      alt={agent.name + " logo"}
                      className="object-contain w-full h-full max-w-[300px] max-h-[300px]"
                    />
                  </div>
                ) : agent.image ? (
                  <div className="w-full h-full flex items-end justify-center p-4 pb-8">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="object-contain w-full h-full max-w-[300px] max-h-[300px]"
                    />
                  </div>
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
                
                {/* Name and Title Overlay */}
                <div className="absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 text-center">
                  <h3 className="text-lg font-bold mb-1 text-gray-800">{agent.name}</h3>
                  <p className="text-[#60a5fa] font-semibold text-sm">{agent.title}</p>
                </div>
              </div>

              {/* Agent Info */}
              <div className="p-6 text-center">
                {/* Contact Info */}
                <div className="mb-6 space-y-2">
                  <div className="flex items-center justify-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{agent.phone}</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-600 text-sm">
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
    </div>
  );
} 