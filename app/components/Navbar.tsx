"use client";

import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, User, Search } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/rooms', label: 'Kamar' },
    { href: '/facilities', label: 'Fasilitas' },
    { href: '/dining', label: 'Restoran' },
    { href: '/events', label: 'Event' },
    { href: '/contact', label: 'Kontak' }
  ];

  return (
    <>
      <div className="bg-gray-900 text-white py-2 hidden md:block">
        <div className="container mx-auto px-6 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>+62 21 1234 5678</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>info@hotelmbd.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>Surabaya, Indonesia</span>
            </div>
          </div>
        </div>
      </div>

      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center w-10 h-10 mr-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  <span className="text-white font-bold text-xl">H</span>
                </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Hotel MBD
                </h1>
                <p className="text-xs text-gray-500">Luxury & Comfort</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <button className="text-gray-600 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-all">
                <Search size={20} />
              </button>
              <button className="text-gray-600 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-all">
                <User size={20} />
              </button>
                <Link
                  href="/booking"
                  className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Book Now
                </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white border-t border-gray-100 px-6 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 border-b border-gray-100 last:border-b-0 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center justify-between pt-4">
                <div className="flex space-x-4">
                  <button className="text-gray-600 hover:text-blue-600 p-2">
                    <Search size={20} />
                  </button>
                  <button className="text-gray-600 hover:text-blue-600 p-2">
                    <User size={20} />
                  </button>
                </div>
                    <Link
                      href="/booking"
                      className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold"
                    >
                      Book Now
                    </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}