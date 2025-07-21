import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "./components/Navigation";

export const metadata: Metadata = {
  title: "Grandview Realty - Chicagoland's Premier Real Estate Agency",
  description: "Your trusted real estate partner in the Chicago metropolitan area. Discover exceptional properties across Chicagoland with Grandview Realty.",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
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
