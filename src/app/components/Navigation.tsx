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
    team: [
      { name: "Agents", href: "/team/agents" },
      { name: "Office Staff", href: "/team/office-staff" },
    ],
    about: [
      { name: "Mission Statement", href: "/about/mission" },
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
            <NavDropdown title="Team" items={navItems.team} />
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
    <footer className="bg-[#081d36] text-white">
      <div className="container-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Logo and Address */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image
                src="/logo.png"
                alt="Grandview Realty"
                width={300}
                height={75}
                className="h-16 w-auto"
              />
            </div>
            <p className="text-white/80 mb-4">
              Your trusted real estate partner across the Chicago metropolitan area.
            </p>
            <div className="text-white/80">
              <p>501 West State Street Suite 103</p>
              <p>Geneva, IL 60134</p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-white/80 hover:text-[#60a5fa] transition-colors">Home</Link>
              <Link href="/properties" className="text-white/80 hover:text-[#60a5fa] transition-colors">Active Listings</Link>
              <Link href="/team/agents" className="text-white/80 hover:text-[#60a5fa] transition-colors">Agents</Link>
              <Link href="/team/office-staff" className="text-white/80 hover:text-[#60a5fa] transition-colors">Office Staff</Link>
              <Link href="/contact" className="text-white/80 hover:text-[#60a5fa] transition-colors">Contact</Link>
            </div>
          </div>

          {/* Legal and Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Legal & Social</h3>
            <div className="flex flex-col space-y-2 mb-6">
              <Link href="/about/legal/privacy" className="text-white/80 hover:text-[#60a5fa] transition-colors">Privacy Policy</Link>
              <Link href="/about/legal/fair-housing" className="text-white/80 hover:text-[#60a5fa] transition-colors">Fair Housing</Link>
            </div>
            
            {/* BBB Accreditation */}
            <div className="mb-6">
              <a 
                href="https://www.bbb.org/us/il/geneva/profile/real-estate-broker/grandview-realty-0654-90017168" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/bbb-seal.png"
                  alt="BBB Accredited Business"
                  width={80}
                  height={80}
                  className="h-16 w-auto"
                />
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-[#60a5fa] transition-colors" aria-label="Facebook">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white/80 hover:text-[#60a5fa] transition-colors" aria-label="Instagram">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807v-.468zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white/80 hover:text-[#60a5fa] transition-colors" aria-label="LinkedIn">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white/80 hover:text-[#60a5fa] transition-colors" aria-label="TikTok">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/60">
          <p>&copy; 2025 Grandview Realty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 