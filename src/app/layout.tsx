import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "./components/Navigation";

export const metadata: Metadata = {
  title: "Grandview Realty - Chicagoland's Premier Real Estate Agency",
  description: "Your trusted real estate partner in the Chicago metropolitan area. Discover exceptional properties across Chicagoland with Grandview Realty.",
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: "Grandview Realty - Chicagoland's Premier Real Estate Agency",
    description: "Your trusted real estate partner in the Chicago metropolitan area. Discover exceptional properties across Chicagoland with Grandview Realty.",
    type: "website",
    locale: "en_US",
    url: "https://grandview-realty.vercel.app",
    siteName: "Grandview Realty",
    images: [
      {
        url: "/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "Grandview Realty - Chicagoland Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grandview Realty - Chicagoland's Premier Real Estate Agency",
    description: "Your trusted real estate partner in the Chicago metropolitan area.",
    images: ["/hero-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Default hero image for pages that don't have their own
export const defaultHeroImage = '/hero-default.jpg';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/hero-image.jpg" as="image" />
        <link rel="preload" href="/GrandviewHome.mp4" as="video" type="video/mp4" />
        
        {/* Structured data for real estate business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Grandview Realty",
              "description": "Chicagoland's premier real estate agency serving the Chicago metropolitan area",
              "url": "https://grandview-realty.vercel.app",
              "logo": "https://grandview-realty.vercel.app/logo.png",
              "image": "https://grandview-realty.vercel.app/hero-image.jpg",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "Illinois",
                "addressCountry": "US"
              },
              "areaServed": [
                "Geneva, IL",
                "St. Charles, IL", 
                "Naperville, IL",
                "Oak Brook, IL",
                "Hinsdale, IL",
                "Arlington Heights, IL"
              ],
              "serviceType": "Real Estate Services",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Property Listings",
                "itemListElement": []
              }
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
