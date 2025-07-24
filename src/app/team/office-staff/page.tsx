export default function OfficeStaffPage() {
  const staff = [
    {
      name: "Jennifer Martinez",
      title: "Office Manager",
      image: "/staff/jennifer-martinez.jpg",
      phone: "(555) 111-2222",
      email: "jennifer.martinez@grandviewrealty.com",
      responsibilities: ["Office Operations", "Staff Coordination", "Client Relations"],
      experience: "10+ years",
      description: "Jennifer oversees all office operations and ensures smooth day-to-day functioning. Her attention to detail and excellent organizational skills keep our team running efficiently."
    },
    {
      name: "Robert Wilson",
      title: "Marketing Coordinator",
      image: "/staff/robert-wilson.jpg",
      phone: "(555) 222-3333",
      email: "robert.wilson@grandviewrealty.com",
      responsibilities: ["Digital Marketing", "Social Media", "Property Promotion"],
      experience: "7+ years",
      description: "Robert manages our digital presence and marketing campaigns. His creative approach to property promotion helps our listings reach the right audience."
    },
    {
      name: "Lisa Anderson",
      title: "Transaction Coordinator",
      image: "/staff/lisa-anderson.jpg",
      phone: "(555) 333-4444",
      email: "lisa.anderson@grandviewrealty.com",
      responsibilities: ["Transaction Management", "Documentation", "Closing Support"],
      experience: "12+ years",
      description: "Lisa ensures all transactions proceed smoothly from contract to closing. Her expertise in real estate documentation and processes is invaluable to our team."
    },
    {
      name: "Thomas Garcia",
      title: "IT Support Specialist",
      image: "/staff/thomas-garcia.jpg",
      phone: "(555) 444-5555",
      email: "thomas.garcia@grandviewrealty.com",
      responsibilities: ["Technology Support", "System Maintenance", "Data Management"],
      experience: "8+ years",
      description: "Thomas keeps our technology systems running smoothly and provides technical support to our team. His expertise ensures we stay current with the latest real estate technology."
    }
  ];

  return (
    <div className="container-padding py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Office Staff</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our dedicated office staff works behind the scenes to ensure every aspect of your real estate experience is seamless and professional.
        </p>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
        {staff.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Staff Image */}
            <div className="relative h-80 bg-gray-200">
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
                    <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
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
            Our office staff is here to help with any questions or support you may need during your real estate journey.
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