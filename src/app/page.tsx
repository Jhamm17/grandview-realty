import Image from "next/image";
import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import ScrollArrow from "@/components/ScrollArrow";
import TestimonialsGallery from "@/components/TestimonialsGallery";

export default function Home() {
  return (
    <>
      {/* Hero Section with Full-Page Video Background */}
      <section className="relative h-[calc(100vh-6rem)] min-h-[600px] flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <HeroVideo 
              posterImage="/hero-image.jpg"
              posterAlt="Beautiful homes in Chicagoland"
            />
            
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        </div>
        
        {/* Content */}
        <div className="container-padding relative z-10 flex items-center justify-center min-h-full">
          <div className="max-w-2xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 text-white drop-shadow-lg">
              Your Gateway to Chicagoland Living
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 drop-shadow-md">
              Discover exceptional properties across the Chicago metropolitan area with Grandview Realty&apos;s expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/properties" className="btn-primary text-center text-lg px-8 py-3">
                View Properties
              </Link>
              <Link href="/contact" className="btn-secondary bg-white/10 text-white border-white text-center text-lg px-8 py-3 backdrop-blur-sm">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <ScrollArrow />
      </section>

      {/* Buy/Sell Section */}
      <section id="buy-sell-section" className="relative py-16 md:py-24 bg-white">
        <div className="container-padding mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
            WHAT ARE YOU LOOKING FOR?
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-80 md:h-[400px] lg:h-[480px] w-full">
          <div className="pl-[10%]">
            {/* Buy Section */}
            <div className="group relative overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02] h-full">
              <Link href="/properties" className="block h-full">
                <div className="absolute inset-0">
                  <Image
                    src="/buyimage.png"
                    alt="Buy a home"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-blue-900/50 group-hover:bg-blue-900/40 transition-colors duration-300" />
                </div>
                
                <div className="relative z-10 flex items-center justify-center h-full">
                  <div className="text-center">
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                      Buy
                    </h3>
                    <p className="text-base md:text-lg text-white/90 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Find your dream home
                    </p>
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </Link>
            </div>
          </div>

          <div className="pr-[10%]">
            {/* Sell Section */}
            <div className="group relative overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02] h-full">
              <Link href="/contact" className="block h-full">
                <div className="absolute inset-0">
                  <Image
                    src="/sellimage.png"
                    alt="Sell your home"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-blue-300/50 group-hover:bg-blue-300/40 transition-colors duration-300" />
                </div>
                
                <div className="relative z-10 flex items-center justify-center h-full">
                  <div className="text-center">
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                      Sell
                    </h3>
                    <p className="text-base md:text-lg text-white/90 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      List your property
                    </p>
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* Mission Statement */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-padding max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#081d36]/10 rounded-full mb-6">
              <svg className="w-8 h-8 text-[#081d36]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <div className="w-24 h-1 bg-[#081d36] mx-auto"></div>
          </div>
          
          {/* Main Mission Statement */}
          <div className="bg-white rounded-2xl shadow-2xl p-12 md:p-16 mb-16 border border-gray-100">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-2xl md:text-3xl lg:text-4xl text-[#081d36] font-light leading-tight mb-6">
                  &ldquo;At Grandview Realty, LLC, our mission is to help individuals and families confidently find their perfect place to call home.&rdquo;
                </p>
                <div className="w-16 h-0.5 bg-[#081d36]/30 mx-auto"></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 text-gray-700 leading-relaxed">
                <div className="space-y-6">
                  <p className="text-lg">
                    Rooted in the communities we serve across Illinois, we strive to build lasting relationships, support local causes, and make every client feel confident and cared for throughout their real estate journey.
                  </p>
                  <p className="text-lg">
                    We strive to maximize the value of every transaction while maintaining the highest standards of service. We are proud to be accessible, responsive, and fully invested in the success of our clients.
                  </p>
                </div>
                <div className="space-y-6">
                  <p className="text-lg">
                    As a locally focused company, we are passionate about giving back and strengthening the neighborhoods we serve across Illinois. Through community partnerships and charitable initiatives, we aim to make a positive impact that extends beyond the closing table.
                  </p>
                  <p className="text-lg">
                    Whether you&apos;re buying your first home, selling your last, or planning your next move, Grandview Realty is here to support your journey every step of the way.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-[#081d36]/10 to-[#081d36]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#081d36]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#081d36]">Integrity</h3>
              <p className="text-gray-600 leading-relaxed">We conduct business with honesty, transparency, and unwavering ethical standards in every transaction.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-[#081d36]/10 to-[#081d36]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#081d36]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#081d36]">Community</h3>
              <p className="text-gray-600 leading-relaxed">We&apos;re dedicated to strengthening and supporting the communities we serve across Illinois.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-[#081d36]/10 to-[#081d36]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#081d36]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#081d36]">Expertise</h3>
              <p className="text-gray-600 leading-relaxed">We bring deep local knowledge and professional excellence to every real estate transaction.</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Link 
              href="/contact"
              className="inline-flex items-center bg-[#081d36] text-white px-10 py-4 rounded-xl hover:bg-[#081d36]/90 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl"
            >
              Start Your Journey
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-16 md:py-24 bg-[#081d36]">
        <div className="container-padding">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">What Our Clients Say</h2>
          <p className="text-white/90 mb-12 max-w-2xl mx-auto text-center">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied clients have to say about their experience with Grandview Realty.
          </p>
          <TestimonialsGallery />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-padding">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose Grandview Realty</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Local Expertise",
                description: "Deep knowledge of Chicagoland's diverse real estate markets and neighborhoods.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                )
              },
              {
                title: "Dedicated Service",
                description: "Personalized attention and support throughout your real estate journey across the Chicago metropolitan area.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                )
              },
              {
                title: "Proven Results",
                description: "Successfully helping clients buy and sell properties throughout Chicagoland since 2005.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                )
              }
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
