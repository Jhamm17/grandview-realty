import Image from 'next/image';
import Link from 'next/link';

export default function MissionStatement() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/mission-hero.jpg"
              alt="Grandview Realty Office"
              fill
              style={{ objectFit: "cover" }}
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-[#081d36]/70" />
          </div>
        </div>
        
        <div className="container-padding relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Mission
          </h1>
          <div className="w-24 h-1 bg-white/80" />
        </div>
      </section>

      {/* Mission Content */}
      <section className="py-16 md:py-24">
        <div className="container-padding max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
              <p className="text-xl md:text-2xl text-[#081d36] font-medium mb-8 leading-relaxed">
                At Grandview Realty, LLC, our mission is to help individuals and families confidently find their perfect place to call home. We are committed to delivering exceptional real estate experiences through integrity, local expertise, and personalized service.
              </p>
              
              <div className="space-y-6 text-gray-700">
                <p>
                  Rooted in the communities we serve across Illinois, we strive to build lasting relationships, support local causes, and make every client feel confident and cared for throughout their real estate journey.
                </p>
                
                <p>
                  We strive to maximize the value of every transaction while maintaining the highest standards of service. We are proud to be accessible, responsive, and fully invested in the success of our clients.
                </p>
                
                <p>
                  As a locally focused company, we are passionate about giving back and strengthening the neighborhoods we serve across Illinois. Through community partnerships and charitable initiatives, we aim to make a positive impact that extends beyond the closing table.
                </p>
                
                <p>
                  Whether you&apos;re buying your first home, selling your last, or planning your next move, Grandview Realty is here to support your journey every step of the way.
                </p>
              </div>
            </div>

            {/* Values Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-[#081d36]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#081d36]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#081d36]">Integrity</h3>
                <p className="text-gray-600">We conduct business with honesty, transparency, and unwavering ethical standards.</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-[#081d36]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#081d36]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#081d36]">Community</h3>
                <p className="text-gray-600">We&apos;re dedicated to strengthening and supporting the communities we serve.</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-[#081d36]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#081d36]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#081d36]">Expertise</h3>
                <p className="text-gray-600">We bring deep local knowledge and professional excellence to every transaction.</p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <Link 
                href="/contact"
                className="inline-block bg-[#081d36] text-white px-8 py-3 rounded-lg hover:bg-[#081d36]/90 transition-colors text-lg font-medium"
              >
                Connect With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 