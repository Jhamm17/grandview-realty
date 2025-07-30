import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Miracle on State Street - Grandview Realty',
  description: 'Join us for our adoption event "Miracle on State Street" featuring Anderson Dogs looking for their "fur-ever" home!',
  openGraph: {
    title: 'Miracle on State Street - Grandview Realty',
    description: 'Adoption event featuring Anderson Dogs looking for their forever homes.',
  },
};

export default function CharityPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Sticky PawtyTime Logo */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
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
        
        {/* Sticky PawtyTime Logo */}
        <div className="absolute top-8 left-8 z-20">
          <Image
            src="/community/PawtyTime.png"
            alt="PawtyTime"
            width={200}
            height={100}
            className="w-auto h-20 md:h-24"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Miracle on State Street
            </h1>
            <p className="text-xl md:text-2xl font-medium">
              Anderson Dogs looking for their &ldquo;fur-ever&rdquo; home!
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-padding py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg mx-auto text-center">
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

          {/* Event Details Card */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg p-8 mt-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Event Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-4xl font-bold mb-2">📅</div>
                <h3 className="text-lg font-semibold mb-2">Date</h3>
                <p>November 16th, 2024</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">🕐</div>
                <h3 className="text-lg font-semibold mb-2">Time</h3>
                <p>11:00 AM - 3:00 PM</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">📍</div>
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <p>Grandview Realty Office<br />501 West State Street Suite 103<br />Geneva, IL 60134</p>
              </div>
            </div>
          </div>

          {/* Bones Bar Section with Quote */}
          <div className="mt-16 relative">
            <div className="relative h-32 md:h-40 overflow-hidden rounded-lg">
              <Image
                src="/community/bonesbar.png"
                alt="Bones Bar Background"
                fill
                className="object-cover"
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40"></div>
              {/* Quote Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-2xl md:text-3xl font-bold italic">
                    &ldquo;Rescue is our favorite breed&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Split Section: Anderson Humane & Mission */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side: Anderson Humane */}
            <div className="relative h-80 lg:h-96 overflow-hidden rounded-lg">
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
                  className="w-auto h-32 md:h-40"
                />
              </div>
            </div>

            {/* Right Side: Mission Statement */}
            <div className="flex flex-col justify-center p-8 bg-gray-50 rounded-lg">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                Pawty Time is committed to creating a brighter future for our furry friends. Teaming up with Anderson Humane and our generous sponsors, we strive to make a difference in the lives of dogs by organizing adoption events that connect them with loving families.
              </p>
              <a 
                href="https://ahconnects.org/aboutus/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/80 transition-colors font-semibold text-center w-fit"
              >
                Anderson Humane
              </a>
            </div>
          </div>

          {/* Sponsor Hall of Fame Bar */}
          <div className="mt-16 bg-[#081d36] text-white py-8 px-4 rounded-lg">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Sponsor Hall of Fame</h2>
            </div>
          </div>

          {/* Sponsor Grid */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Grandview Homes */}
            <a 
              href="https://www.grandviewhomes.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block aspect-square bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            >
              <Image
                src="/sponsors/grandviewhomes.png"
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
                src="/sponsors/crystalbride.png"
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
                src="/sponsors/alastingimpression.png"
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
                src="/sponsors/regalgames.png"
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
                src="/sponsors/csmelectric.png"
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
                src="/sponsors/harloconstruction.png"
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
                src="/sponsors/lifestyledesign.png"
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
                src="/sponsors/thedbgroup.png"
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
                src="/sponsors/olux.png"
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
                src="/sponsors/nobelhouse.png"
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
                src="/sponsors/manorimages.png"
                alt="Manor Images"
                width={300}
                height={300}
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
              />
            </a>
          </div>

          {/* What to Expect */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">What to Expect</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-4xl mb-4">🐕</div>
                <h3 className="text-xl font-semibold mb-3">Adoptable Dogs</h3>
                <p className="text-gray-700">
                  Meet wonderful dogs from Anderson Humane who are ready to find their forever families. All dogs will be available for adoption on-site.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-4xl mb-4">🎮</div>
                <h3 className="text-xl font-semibold mb-3">Games & Activities</h3>
                <p className="text-gray-700">
                  Enjoy fun games and activities for the whole family while getting to know our furry friends.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-4xl mb-4">🍕</div>
                <h3 className="text-xl font-semibold mb-3">Snacks & Refreshments</h3>
                <p className="text-gray-700">
                  Complimentary snacks and refreshments will be provided for all attendees.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-4xl mb-4">💝</div>
                <h3 className="text-xl font-semibold mb-3">Support a Great Cause</h3>
                <p className="text-gray-700">
                  Your participation helps support Anderson Humane&apos;s mission to save and care for animals in need.
                </p>
              </div>
            </div>
          </div>

          {/* About Anderson Humane */}
          <div className="mt-16 bg-blue-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-6">About Our Partner</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-4">
                  <a 
                    href="https://ahconnects.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 underline"
                  >
                    Anderson Humane
                  </a>
                </h3>
                <p className="text-gray-700 mb-4">
                  For more than fifty years, Anderson Humane has been the leading animal welfare organization in our community. They place more than 4,000 pets into loving homes each year and care for over 3,000 injured and orphaned wild animals annually.
                </p>
                <p className="text-gray-700 mb-4">
                  Their mission is to champion the welfare of animals and improve the lives of people through programs that create mutually beneficial human-animal connections, inspiring kindness and respect throughout our community.
                </p>
                <a 
                  href="https://ahconnects.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/80 transition-colors font-semibold"
                >
                  Visit Anderson Humane
                </a>
              </div>
              <div className="flex-1 text-center">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="text-6xl mb-4">🏠</div>
                  <h4 className="text-lg font-semibold mb-2">4,000+ Pets</h4>
                  <p className="text-gray-600">Placed in loving homes each year</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-gray-700 mb-8">
              Join us for this special event and help give these wonderful dogs the loving homes they deserve!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/80 transition-colors font-semibold text-lg"
              >
                Contact Us for More Info
              </a>
              <a 
                href="https://ahconnects.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-secondary text-white px-8 py-4 rounded-lg hover:bg-secondary/80 transition-colors font-semibold text-lg"
              >
                Learn More About Anderson Humane
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 