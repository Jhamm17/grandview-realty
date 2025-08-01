export default function OfficeStaffPage() {
  const staff = [
    {
      name: "Christopher Lobrillo",
      title: "Managing Broker & Managing Partner",
      image: null,
      phone: "630-802-4411",
      email: "chris@grandviewsells.com",
      responsibilities: ["Business Growth & Development", "Agent Mentorship & Development", "Brokerage Oversight & Compliance", "REO Specialist", "Corporate Closings"],
      experience: "20+ years",
      description: "Christopher Lobrillo is Co-Founder and Owner of Grandview Realty, bringing over 20 years of experience and more than 3,700 closed transactions across residential, REO, and corporate real estate. A former partner on Kane County's top RE/MAX team, he now leads Grandview's growth, operations, and agent development. Known for his strategic vision and hands-on leadership, Christopher is committed to building a high-performing, agent-focused brokerage."
    },
    {
      name: "Lynda Werner",
      title: "Operations Manager | Licensed Real Estate Agent",
      image: null,
      phone: "630-402-6382",
      email: "lynda@grandviewsells.com",
      responsibilities: ["Real Estate Operations", "Administrative Oversight", "Real Estate Compliance", "REO Management", "Agent Support and Development", "Office Management"],
      experience: "20+ years",
      description: "With over 20 years in real estate, Lynda Werner serves as Operations Manager at Grandview Realty, where she brings deep expertise in collections, foreclosure, REO, and mortgage auditing. She leads the administrative team, ensuring smooth operations and top-tier support for agents and clients. A licensed real estate agent herself, Lynda bridges operations with front-line insight, all while fostering growth and development across the team."
    },
    {
      name: "Christopher Clark",
      title: "Managing Broker",
      image: "/agents/chris-clark.png",
      phone: "630-973-7825",
      email: "chris@clarkhometeam.com",
      responsibilities: ["Agent Leadership & Support", "Compliance & Contract Oversight", "Training & Mentorship", "Business Development", "Recruiting & Retention"],
      experience: "20+ years",
      description: "Chris Clark, Managing Broker at Grandview Realty, has been a driving force in the firm's growth since joining in 2021. With a real estate career dating back to 2003, Chris leads expansion efforts through agent development, strategic planning, and production under his Clark Home Team brand. Known for blending market expertise with tech and high-touch service, his leadership and vision continue to elevate the entire organization."
    },
    {
      name: "Michael Jostes",
      title: "Transaction Coordinator",
      image: "/michaeljostes.png",
      phone: "630-402-6462",
      email: "michael@grandviewsells.com",
      responsibilities: ["Transaction Management", "Documentation", "Closing Support", "MLS & CRM Updates", "File Organization & Audit Prep"],
      experience: "1+ years",
      description: "Michael ensures all transactions progress seamlessly from contract to close. As our dedicated Transaction Coordinator, he manages timelines, coordinates with all parties involved, and ensures every document is accurate and submitted on time. His deep knowledge of real estate processes and attention to detail are invaluable to keeping our deals on track and our clients well-supported throughout every step."
    },
    {
      name: "Cailida Werner",
      title: "Senior Transaction Coordinator",
      image: "/cailidawerner.jpeg",
      phone: "630-480-4347",
      email: "cailida@grandviewsells.com",
      responsibilities: ["Transaction Management", "Documentation", "Closing Support", "MLS & CRM Updates", "File Organization & Audit Prep"],
      experience: "6+ years",
      description: "Cailida is our Senior Transaction Coordinator and has been an integral part of our team for over six years. With a sharp eye for detail and a deep understanding of the real estate process, she oversees each transaction from start to finish—ensuring nothing falls through the cracks. Her experience allows her to anticipate potential issues before they arise, keeping everything on track and our clients informed every step of the way. Her dedication and expertise make her a true backbone of our operations."
    },
    {
      name: "Anastasiya Voznyuk",
      title: "Listing Coordinator & Social Media Manager",
      image: null,
      phone: "630-402-6285",
      email: "anastasiya@grandviewsells.com",
      responsibilities: ["MLS Data Entry & Verification", "Detailed Audits & Compliance", "Reporting: Feedback, Scrubs, Pricing, MLS Data Reports", "Designing and Producing Marketing Material"],
      experience: "4+ years",
      description: "Anastasiya brings four years of experience in real estate, combining her background in transaction coordination with her expertise in managing the listing process. She ensures exceptional accuracy and compliance across all platforms, overseeing listing preparation and audits with great attention to detail. Additionally, Anastasiya leads creative digital marketing initiatives, producing engaging content that boosts brand visibility and drives meaningful lead engagement."
    }
  ];

  return (
    <div className="container-padding py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Office Personnel</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our dedicated office personnel works behind the scenes to ensure every aspect of your real estate experience is seamless and professional.
        </p>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {staff.map((member, index) => (
          <div key={index} className="bg-white shadow-lg overflow-hidden">
            {/* Staff Image */}
            <div className="relative h-[500px] bg-gray-200">
              {member.image ? (
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-500">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <p className="text-sm">Photo Coming Soon</p>
                  </div>
                </div>
              )}
            </div>

            {/* Staff Info */}
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
              <p className="text-blue-600 font-semibold mb-4">{member.title}</p>
              
              {/* Contact Info */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{member.experience} experience</span>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Key Responsibilities</h4>
                <div className="flex flex-wrap gap-2">
                  {member.responsibilities.map((responsibility, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {responsibility}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">{member.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="bg-green-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Need Support?</h2>
          <p className="text-gray-600 mb-6">
            Our office personnel is here to help with any questions or support you may need during your real estate journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Contact Office
            </a>
            <a href="/team/agents" className="bg-white text-green-600 border border-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
              Meet Our Agents
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 