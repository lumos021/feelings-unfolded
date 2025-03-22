"use client";

import { useRef, useEffect, useState, useContext, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import ThreadAnimation, { Section } from '../components/ThreadAnimation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AccessibilityControls from '../components/AccessibilityControls';
import { AnimationContext } from '../context/AnimationContext';
// import ScrollTrigger from 'gsap/ScrollTrigger';
import Script from 'next/script';
import { setupScrollAnimations } from '../utils/intersection';
import Contact from '../components/Contact';

export default function Home() {
  const { animationsEnabled, config, isReducedMotion } = useContext(AnimationContext);
  
  // Create refs for sections that will be revealed as thread unwinds
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const testimonialRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  
  // Create state to hold sections with element references
  const [sections, setSections] = useState<Section[]>([]);
  
  // Background state for gradual color change
  const [scrollProgress, setScrollProgress] = useState(0);

  // Update sections when refs are available
  useEffect(() => {
    const updateSections = () => {
      if (heroRef.current && aboutRef.current && servicesRef.current && 
          testimonialRef.current && contactRef.current) {
        // Initialize sections with visibility set to true
        const newSections = [
          { element: heroRef.current, id: 'hero' },
          { element: aboutRef.current, id: 'about' },
          { element: servicesRef.current, id: 'services' },
          { element: testimonialRef.current, id: 'testimonials' },
          { element: contactRef.current, id: 'contact' },
        ];

        // Set initial visibility and position
        newSections.forEach(section => {
          if (section.element) {
            gsap.set(section.element, {
              opacity: 1,
              y: 0,
              visibility: 'visible'
            });
          }
        });

        setSections(newSections);
      }
    };

    // Use MutationObserver to detect when refs are available
    const observer = new MutationObserver(updateSections);
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial check
    updateSections();

    return () => observer.disconnect();
  }, []);

  // Track scroll for background effect
  useEffect(() => {
    if (!animationsEnabled) return;
    
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animationsEnabled]);
  
  // Initialize sections with opacity 1 by default
  useLayoutEffect(() => {
    const elements = [
      heroRef.current, 
      aboutRef.current, 
      servicesRef.current, 
      testimonialRef.current, 
      contactRef.current
    ].filter(Boolean);
    
    if (elements.length > 0) {
      gsap.set(elements, { 
        opacity: 1, 
        y: 0,
        visibility: 'visible'
      });
    }
  }, []);
  
  // Use animation config color intensity for background
  const colorIntensity = config?.colorIntensity || 0.8;
  const saturation = 40 + Math.round(colorIntensity * 20); // 40-60% saturation based on config
  
  // Calculate background gradient based on scroll
  const gradientStyle = {
    background: `linear-gradient(135deg, 
      hsl(${210 + scrollProgress * 15}, ${saturation}%, 97%) 0%, 
      hsl(${230 + scrollProgress * 15}, ${Math.round(saturation * 0.7)}%, 95%) 100%)`,
    minHeight: '100vh',
    overflow: 'visible'
  };
  
  // Add animation classes based on reduced motion preference
  const animationClass = isReducedMotion ? 'animate-fade' : 'animate-on-scroll';

  // Initialize animations on elements with animate-on-scroll class
  useEffect(() => {
    if (isReducedMotion) return;
    
    // Setup animations when component mounts
    const cleanup = setupScrollAnimations();
    
    // Clean up observer when component unmounts
    return cleanup;
  }, [isReducedMotion]);

  return (
    <>
      {/* Structured data for SEO */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Feelings Unfolded with Sakina',
            description: 'Professional counseling and emotional wellness services provided by Sakina.',
            url: 'https://feelingsunfolded.com',
            telephone: '+918275052015',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'IN'
            },
            sameAs: [
              'https://instagram.com/feelings_unfolded',
              'https://linkedin.com/in/sakina-counselor'
            ],
            priceRange: '$$',
            openingHours: 'Mo-Fr 09:00-17:00',
            serviceType: [
              'Counseling',
              'Emotional Wellness',
              'Mental Health',
              'Therapy'
            ]
          })
        }}
      />
    
      <div className="min-h-screen overflow-visible" style={gradientStyle}>
        <Navbar />
        
        {/* Accessibility Controls */}
        <div className="fixed bottom-6 right-6 z-50">
          <AccessibilityControls />
        </div>
        
        <main className="relative overflow-visible">
          {/* Thread animation positioned absolutely */}
          <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-visible">
            <ThreadAnimation sections={sections} />
          </div>
          
          {/* Content sections with higher z-index */}
          <section 
            id="hero" 
            ref={heroRef} 
            className="min-h-screen flex items-center justify-center relative z-10 px-6 md:px-12 opacity-100"
          >
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#2a9d8f] to-[#264653] bg-clip-text text-transparent">
                  Feelings Unfolded
                </span>
                <span className="block text-2xl md:text-3xl font-medium mt-2 text-[#264653]/80">
                  with Sakina
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600">A journey through emotional wellness</p>
              
              <div className="mt-8">
                <a 
                  href="#contact"
                  className="px-6 py-3 bg-[#2a9d8f] hover:bg-[#264653] text-white rounded-lg shadow-md transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] focus:ring-offset-2"
                  aria-label="Get started with counseling services"
                >
                  Get Started
                </a>
              </div>
            </div>
          </section>

          <section 
            id="about" 
            ref={aboutRef} 
            className="min-h-screen flex items-center relative z-10 px-6 md:px-12 bg-white/30 backdrop-blur-sm"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-[#264653]">About Me</h2>
              <p className={`text-lg md:text-xl text-gray-700 mb-6 ${animationClass}`}>
                With years of experience in emotional wellness and counseling, I help individuals navigate their emotional journey with compassion and understanding.
              </p>
              <p className={`text-lg md:text-xl text-gray-700 ${animationClass}`}>
                My approach combines traditional therapeutic methods with modern mindfulness practices, creating a unique path to emotional well-being.
              </p>
            </div>
          </section>

          <section 
            id="services" 
            ref={servicesRef} 
            className="min-h-screen flex items-center relative z-10 px-6 md:px-12"
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-[#264653]">Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className={`p-6 rounded-lg shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white/90 transition ${animationClass}`}>
                  <h3 className="text-xl font-bold mb-4 text-[#2a9d8f]">Individual Counseling</h3>
                  <p className="text-gray-600">One-on-one sessions focused on your personal growth and emotional well-being.</p>
                </div>
                <div className={`p-6 rounded-lg shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white/90 transition ${animationClass}`}>
                  <h3 className="text-xl font-bold mb-4 text-[#2a9d8f]">Group Therapy</h3>
                  <p className="text-gray-600">Collaborative sessions where shared experiences lead to collective healing.</p>
                </div>
                <div className={`p-6 rounded-lg shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white/90 transition ${animationClass}`}>
                  <h3 className="text-xl font-bold mb-4 text-[#2a9d8f]">Mindfulness Workshops</h3>
                  <p className="text-gray-600">Learn practical techniques for emotional awareness and stress management.</p>
                </div>
              </div>
            </div>
          </section>

          <section 
            id="testimonials" 
            ref={testimonialRef} 
            className="min-h-screen flex items-center relative z-10 px-6 md:px-12"
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-[#264653]">Testimonials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`p-6 rounded-lg shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white/90 transition ${animationClass}`}>
                  <div className="flex items-center mb-4">
                    <img 
                      src="https://randomuser.me/api/portraits/women/32.jpg" 
                      alt="Sarah M." 
                      className="w-12 h-12 rounded-full mr-4"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="font-semibold text-[#264653]">Sarah M.</h3>
                      <p className="text-gray-600">Client for 6 months</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">&ldquo;Working with Sakina has been transformative. Her approach to emotional wellness opened new perspectives for me.&rdquo;</p>
                </div>
                <div className={`p-6 rounded-lg shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white/90 transition ${animationClass}`}>
                  <div className="flex items-center mb-4">
                    <img 
                      src="https://randomuser.me/api/portraits/men/54.jpg" 
                      alt="James R." 
                      className="w-12 h-12 rounded-full mr-4"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="font-semibold text-[#264653]">James R.</h3>
                      <p className="text-gray-600">Workshop participant</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">&ldquo;The mindfulness techniques I learned have become an essential part of my daily routine. Thank you, Sakina!&rdquo;</p>
                </div>
              </div>
            </div>
          </section>

          <section 
            id="contact" 
            ref={contactRef} 
            className="min-h-screen flex items-center relative z-10 px-6 md:px-12"
          >
            <Contact />
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}