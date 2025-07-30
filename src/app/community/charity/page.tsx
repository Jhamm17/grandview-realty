import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Charity & Community Involvement - Grandview Realty',
  description: 'Join us for our adoption event "Miracle on State Street" featuring Anderson Dogs looking for their "fur-ever" home!',
  openGraph: {
    title: 'Charity & Community Involvement - Grandview Realty',
    description: 'Adoption event featuring Anderson Dogs looking for their forever homes.',
  },
};

export default function CharityPage() {
  return (
    <>
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/community/communitybackground.jpg"
          alt="Community Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Main Content - Floating over background */}
      <div className="relative z-10 pt-20">
        <div className="px-4 md:px-8 lg:px-12">
          {/* Hero Section - Takes up about 50% of viewport */}
          <section className="h-[30vh] flex items-center justify-center text-center text-white mb-8">
            <div className="max-w-4xl">
              <Image
                src="/community/PawtyTime.png"
                alt="PawtyTime"
                width={600}
                height={300}
                className="w-auto h-24 md:h-32 mx-auto mb-4"
              />
            </div>
          </section>

          {/* Main Content Section */}
          <section className="p-8 md:p-12 lg:p-16 -mx-4 md:-mx-8 lg:-mx-12">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-7xl font-bold text-primary mb-4">
                Miracle on State Street
              </h1>
              <p className="text-xl md:text-2xl font-medium text-gray-700">
                Anderson Dogs looking for their &ldquo;fur-ever&rdquo; home!
              </p>
            </div>
            <div className="prose prose-lg mx-auto text-center max-w-4xl">
              <p className="text-xl leading-relaxed text-gray-700 mb-8">
                We are already preparing for our next adoption event! We&apos;d love to personally invite you, your family, and friends to join us on <strong>November 16th, from 11 AM to 3 PM</strong>, for a day packed with games, snacks, and, of course, lots of adorable furry friends looking for their forever homes!
              </p>
              
              <p className="text-xl leading-relaxed text-gray-700 mb-8">
                All dogs at the event will be available for adoption, so come out, show your support, and help make a difference. A big thank you to <a 
                  href="https://ahconnects.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline font-semibold"
                >
                  Anderson Humane
                </a> for helping us put on this event. We can&apos;t wait to see you there!
              </p>
            </div>

            {/* Bones Bar Section with Quote */}
            <div className="-mx-8 md:-mx-12 lg:-mx-16">
              <div className="relative h-32 md:h-40 overflow-hidden shadow-none">
                <Image
                  src="/community/bonesbar.jpg"
                  alt="Bones Bar Background"
                  fill
                  className="object-cover"
                />
                {/* Quote Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl lg:text-5xl font-black italic" style={{ fontFamily: 'cursive', color: '#081d36' }}>
                      &ldquo;Rescue is our favorite breed&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Split Section: Anderson Humane & Mission */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side: Anderson Humane */}
              <div className="relative h-[30rem] lg:h-[42rem] overflow-hidden -mx-8 md:-mx-12 lg:-mx-16 lg:mr-0 shadow-2xl">
                <Image
                  src="/community/ahbackground.jpg"
                  alt="Anderson Humane Background"
                  fill
                  className="object-cover"
                />
                {/* Overlay for better logo visibility */}
                <div className="absolute inset-0 bg-black/30"></div>
                {/* Anderson Humane Logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/community/ansersonhumane.png"
                    alt="Anderson Humane"
                    width={300}
                    height={150}
                    className="w-auto h-48 md:h-60"
                  />
                </div>
              </div>

              {/* Right Side: Mission Statement */}
              <div className="flex flex-col justify-center p-8 bg-gray-50 rounded-lg">
                <div className="max-w-md">
                  <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-primary text-left font-poppins">Our Mission</h2>
                  <p className="text-xl leading-relaxed text-gray-700 mb-10 text-left font-poppins">
                    Pawty Time is committed to creating a brighter future for our furry friends. Teaming up with Anderson Humane and our generous sponsors, we strive to make a difference in the lives of dogs by organizing adoption events that connect them with loving families.
                  </p>
                  <a 
                    href="https://ahconnects.org/aboutus/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-primary text-white px-10 py-4 hover:bg-primary/80 transition-colors font-semibold text-lg w-fit font-poppins"
                  >
                    Anderson Humane
                  </a>
                </div>
              </div>
            </div>

            {/* Sponsor Hall of Fame Bar */}
            <div className="-mx-8 md:-mx-12 lg:-mx-16">
              <div className="bg-[#081d36] text-white py-16 px-8">
                <div className="text-center">
                  <h2 className="text-6xl md:text-8xl font-bold">Sponsor Hall of Fame</h2>
                </div>
              </div>
            </div>

            {/* Sponsor Grid */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {/* Grandview Homes */}
              <a 
                href="https://www.grandviewhomes.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block aspect-square bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <Image
                  src="/community/sponsors/grandviewhomes.jpg"
                  alt="Grandview Homes"
                  width={300}
                  height={300}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                />
              </a>

              {/* Crystal Bride */}
              <a 
                href="https://www.crystalbride.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block aspect-square bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <Image
                  src="/community/sponsors/crystalbride.jpg"
                  alt="Crystal Bride"
                  width={300}
                  height={300}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                />
              </a>

              {/* A Lasting Impression */}
              <a 
                href="https://www.waxxedup.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block aspect-square bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <Image
                  src="/community/sponsors/alastingimpression.jpg"
                  alt="A Lasting Impression"
                  width={300}
                  height={300}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                />
              </a>

              {/* Regal Games */}
              <a 
                href="https://regal-games.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block aspect-square bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <Image
                  src="/community/sponsors/regalgames.jpg"
                  alt="Regal Games"
                  width={300}
                  height={300}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                />
              </a>

              {/* CSM Electric */}
              <a 
                href="https://www.instagram.com/csm_electric/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block aspect-square bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <Image
                  src="/community/sponsors/csmelectric.jpg"
                  alt="CSM Electric"
                  width={300}
                  height={300}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                />
              </a>

              {/* Harlo Construction */}
              <a 
                href="https://www.instagram.com/harlo_construction/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block aspect-square bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <Image
                  src="/community/sponsors/harloconstruction.jpg"
                  alt="Harlo Construction"
                  width={300}
                  height={300}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                />
              </a>

              {/* Lifestyle Design */}
              <a 
                href="https://www.lifestyledesigngeneva.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block aspect-square bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <Image
                  src="/community/sponsors/lifestyledesign.jpg"
                  alt="Lifestyle Design"
                  width={300}
                  height={300}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                />
              </a>

              {/* The DB Group */}
              <a 
                href="https://crosscountrymortgage.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block aspect-square bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <Image
                  src="/community/sponsors/thedbgroup.jpg"
                  alt="The DB Group"
                  width={300}
                  height={300}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                />
              </a>

              {/* Olux */}
              <a 
                href="https://oluxtechnologies.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block aspect-square bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <Image
                  src="/community/sponsors/olux.jpg"
                  alt="Olux"
                  width={300}
                  height={300}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                />
              </a>

              {/* Nobel House */}
              <a 
                href="https://www.nobelhouserestaurants.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block aspect-square bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <Image
                  src="/community/sponsors/nobelhouse.jpg"
                  alt="Nobel House"
                  width={300}
                  height={300}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                />
              </a>

              {/* Manor Images */}
              <a 
                href="https://manorimages.hd.pics/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block aspect-square bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <Image
                  src="/community/sponsors/manorimages.jpg"
                  alt="Manor Images"
                  width={300}
                  height={300}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                />
              </a>
            </div>

            {/* Become a Sponsor Contact Form */}
            <div className="mt-16 bg-[#081d36] p-8 md:p-12 lg:p-16 -mx-8 md:-mx-12 lg:-mx-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Become a Sponsor!</h2>
                <p className="text-lg text-white/80">
                  Interested in supporting our community events? Join our sponsor family!
                </p>
              </div>
              
              <form className="max-w-2xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-white mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="bg-primary text-white px-12 py-4 text-lg font-semibold hover:bg-primary/80 transition-colors"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  );
} 