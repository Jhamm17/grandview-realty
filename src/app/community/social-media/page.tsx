import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Social Media - Grandview Realty',
  description: 'Connect with Grandview Realty on social media for the latest property updates, community news, and real estate insights.',
  openGraph: {
    title: 'Social Media - Grandview Realty',
    description: 'Follow us on social media for updates and insights.',
  },
};

export default function SocialMediaPage() {
  return (
    <main className="container-padding py-12 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Social Media</h1>
        <p className="text-center text-lg text-gray-600 mb-12">
          Stay connected with Grandview Realty on social media for the latest property listings, market insights, 
          community updates, and behind-the-scenes content.
        </p>

        {/* Social Media Platforms */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Facebook */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Facebook</h3>
              <p className="text-sm text-gray-600 mb-4">
                Property updates, community events, and real estate tips
              </p>
              <a 
                href="#" 
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow Us
              </a>
            </div>

            {/* Instagram */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Instagram</h3>
              <p className="text-sm text-gray-600 mb-4">
                Beautiful property photos and behind-the-scenes content
              </p>
              <a 
                href="#" 
                className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow Us
              </a>
            </div>

            {/* LinkedIn */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="bg-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">LinkedIn</h3>
              <p className="text-sm text-gray-600 mb-4">
                Professional insights and industry updates
              </p>
              <a 
                href="#" 
                className="inline-block bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect
              </a>
            </div>

            {/* TikTok */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="bg-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">TikTok</h3>
              <p className="text-sm text-gray-600 mb-4">
                Fun property tours and real estate tips
              </p>
              <a 
                href="#" 
                className="inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow Us
              </a>
            </div>
          </div>
        </section>

        {/* Content Types */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">What You&apos;ll Find on Our Social Media</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Property Updates</h3>
                <p className="text-sm text-gray-600">
                  New listings, price changes, and property highlights from across the Chicagoland area.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Market Insights</h3>
                <p className="text-sm text-gray-600">
                  Real estate market trends, tips for buyers and sellers, and local market analysis.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Community News</h3>
                <p className="text-sm text-gray-600">
                  Local events, community involvement, and updates from the Chicagoland area.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Engagement Stats */}
        <section className="mb-16">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Our Social Media Reach</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">5K+</div>
                <p className="text-gray-600">Followers</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <p className="text-gray-600">Properties Shared</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <p className="text-gray-600">Engagement Rate</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <p className="text-gray-600">Response Time</p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section>
          <div className="bg-primary text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
            <p className="text-lg mb-6">
              Get the latest property updates and market insights delivered directly to your inbox.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="bg-white text-primary px-6 py-3 rounded font-semibold hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-white/80 mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 