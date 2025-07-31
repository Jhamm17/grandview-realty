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
        className={`flex items-center text-white hover:text-white/80 transition-colors py-4 px-2 text-base font-medium ${
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
      { name: "Under Contract", href: "/properties/under-contract" },
    ],
    team: [
      { name: "Agents", href: "/team/agents" },
      { name: "Office Staff", href: "/team/office-staff" },
    ],
    about: [
      { name: "Mission Statement", href: "/about/mission" },
      { name: "Affiliations & Accreditation", href: "/about/affiliations" },
      { name: "Legal & Compliance", href: "/about/legal" },
    ],
    community: [
      { name: "Charity & Community Involvement", href: "/community/charity" },
      { name: "Social Media", href: "/community/social-media" },
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
      <nav className="w-full px-[10%]">
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
          <div className="hidden md:flex items-center space-x-2">
            <Link 
              href="/" 
              className={`text-white hover:text-white/80 transition-colors text-base font-medium py-4 px-2 ${
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
              className={`text-white hover:text-white/80 transition-colors text-base font-medium py-4 px-2 ${
                pathname === '/careers' ? 'text-[#60a5fa]' : ''
              }`}
            >
              Careers
            </Link>
            <Link 
              href="/contact" 
              className={`text-white hover:text-white/80 transition-colors text-base font-medium py-4 px-2 ${
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
                className="h-24 w-auto"
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
              <Link href="/properties/under-contract" className="text-white/80 hover:text-[#60a5fa] transition-colors">Under Contract</Link>
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
                  className="h-12 w-auto"
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
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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