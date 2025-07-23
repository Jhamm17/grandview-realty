'use client';

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

function NavDropdown({ title, items }: { title: string; items: { name: string; href: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  // Check if any dropdown item is active
  const isActive = items.some(item => pathname === item.href);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className={`flex items-center text-white hover:text-white/80 transition-colors py-4 px-3 text-base font-medium ${
          isActive ? 'text-[#60a5fa]' : ''
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        {title}
        <svg 
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div 
          className="absolute left-0 mt-2 w-48 bg-[#081d36] rounded-md shadow-lg py-1 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors ${
                pathname === item.href ? 'text-[#60a5fa]' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  
  const navItems = {
    properties: [
      { name: "Active Listings", href: "/properties" },
      { name: "Price Changes", href: "/properties/price-changes" },
      { name: "Under Contract", href: "/properties/under-contract" },
    ],
    about: [
      { name: "Mission Statement", href: "/about/mission" },
      { name: "Meet Our Team", href: "/about/team" },
      { name: "Legal & Compliance", href: "/about/legal" },
    ],
    community: [
      { name: "Pawty Time", href: "/community/pawty-time" },
      { name: "Anderson Humane", href: "/community/anderson-humane" },
      { name: "Community Events", href: "/community/events" },
      { name: "System Status", href: "/community/monitoring" },
    ],
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-[#081d36] shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-24">
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <Image
              src="/logo.png"
              alt="Grandview Realty"
              width={1200}
              height={300}
              className="h-28 w-auto"
              priority
            />
            <span className="sr-only">Grandview Realty</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className={`text-white hover:text-white/80 transition-colors text-base font-medium py-4 px-3 ${
                pathname === '/' ? 'text-[#60a5fa]' : ''
              }`}
            >
              Home
            </Link>
            <NavDropdown title="Properties" items={navItems.properties} />
            <NavDropdown title="About Us" items={navItems.about} />
            <NavDropdown title="Community" items={navItems.community} />
            <Link 
              href="/careers" 
              className={`text-white hover:text-white/80 transition-colors text-base font-medium py-4 px-3 ${
                pathname === '/careers' ? 'text-[#60a5fa]' : ''
              }`}
            >
              Careers
            </Link>
            <Link 
              href="/contact" 
              className={`text-white hover:text-white/80 transition-colors text-base font-medium py-4 px-3 ${
                pathname === '/contact' ? 'text-[#60a5fa]' : ''
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 mobile-menu-button text-white"
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 mobile-menu bg-[#081d36]">
            <div className="flex flex-col space-y-2 text-base">
              <Link 
                href="/" 
                className={`text-white hover:text-white/80 transition-colors py-2 px-3 rounded ${
                  pathname === '/' ? 'text-[#60a5fa]' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              {Object.entries(navItems).map(([key, items]) => (
                <div key={key} className="space-y-1">
                  <button
                    className="font-medium text-white flex items-center justify-between w-full text-base py-2 px-3 rounded"
                    onClick={() => setActiveDropdown(activeDropdown === key ? null : key)}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === key ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === key && (
                    <div className="pl-4 space-y-1">
                      {items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block text-white/90 hover:text-white transition-colors text-sm py-2 px-3 rounded ${
                            pathname === item.href ? 'text-[#60a5fa]' : ''
                          }`}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setActiveDropdown(null);
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link 
                href="/careers" 
                className={`text-white hover:text-white/80 transition-colors text-base py-2 px-3 rounded ${
                  pathname === '/careers' ? 'text-[#60a5fa]' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Careers
              </Link>
              <Link 
                href="/contact" 
                className={`text-white hover:text-white/80 transition-colors text-base py-2 px-3 rounded ${
                  pathname === '/contact' ? 'text-[#60a5fa]' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Grandview Realty</h3>
            <p className="text-gray-600">
              Your trusted real estate partner across the Chicago metropolitan area.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Featured Areas</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/properties/geneva" className="text-gray-600 hover:text-primary transition-colors">Geneva</Link>
              <Link href="/properties/naperville" className="text-gray-600 hover:text-primary transition-colors">Naperville</Link>
              <Link href="/properties/st-charles" className="text-gray-600 hover:text-primary transition-colors">St. Charles</Link>
              <Link href="/properties/oak-brook" className="text-gray-600 hover:text-primary transition-colors">Oak Brook</Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-600">123 Main Street</p>
            <p className="text-gray-600">Geneva, IL 60134</p>
            <p className="text-gray-600">(630) 555-0123</p>
            <p className="text-gray-600 mt-2">Serving the entire Chicagoland area</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/about/legal/privacy" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/about/legal/fair-housing" className="text-gray-600 hover:text-primary transition-colors">Fair Housing</Link>
              <Link href="/about/legal/bbb" className="text-gray-600 hover:text-primary transition-colors">BBB Accreditation</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Grandview Realty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 