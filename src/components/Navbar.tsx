// components/Navbar.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/">
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#2a9d8f] to-[#264653] bg-clip-text text-transparent">
              Feelings Unfolded
            </span>
            <span className="text-lg font-medium md:ml-2 text-[#264653]/80">
              with Sakina
            </span>
          </div>
        </Link>

        <button
          className="md:hidden text-[#264653] focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <nav className="hidden md:flex space-x-8">
          <a href="#about" className="text-[#264653]/80 hover:text-[#2a9d8f] transition duration-300">About</a>
          <a href="#services" className="text-[#264653]/80 hover:text-[#2a9d8f] transition duration-300">Services</a>
          <a href="#testimonials" className="text-[#264653]/80 hover:text-[#2a9d8f] transition duration-300">Testimonials</a>
          <a href="#contact" className="text-[#264653]/80 hover:text-[#2a9d8f] transition duration-300">Contact</a>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <a href="#about" className="text-[#264653]/80 hover:text-[#2a9d8f] transition duration-300" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#services" className="text-[#264653]/80 hover:text-[#2a9d8f] transition duration-300" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#testimonials" className="text-[#264653]/80 hover:text-[#2a9d8f] transition duration-300" onClick={() => setIsMenuOpen(false)}>Testimonials</a>
            <a href="#contact" className="text-[#264653]/80 hover:text-[#2a9d8f] transition duration-300" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
