// components/Footer.tsx
"use client";

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white/90 backdrop-blur-sm py-12 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Branding and Description */}
          <div className="space-y-4">
            <Link href="/">
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-[#2a9d8f] to-[#264653] bg-clip-text text-transparent">
                  Feelings Unfolded
                </span>
                <span className="text-lg font-medium text-[#264653]/80">
                  with Sakina
                </span>
              </div>
            </Link>
            <p className="text-gray-600">
              Guiding you through your emotional wellness journey with compassion and understanding.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#264653] mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <a href="#about" className="block text-gray-600 hover:text-[#2a9d8f] transition duration-300">About</a>
              <a href="#services" className="block text-gray-600 hover:text-[#2a9d8f] transition duration-300">Services</a>
              <a href="#testimonials" className="block text-gray-600 hover:text-[#2a9d8f] transition duration-300">Testimonials</a>
              <a href="#contact" className="block text-gray-600 hover:text-[#2a9d8f] transition duration-300">Contact</a>
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-[#264653] mb-4">Contact Information</h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <a 
                  href="tel:+918275052015" 
                  className="hover:text-[#2a9d8f] transition duration-300"
                  aria-label="Call us at +91 82750 52015"
                >
                  +91 82750 52015
                </a>
              </p>
              <p className="text-gray-600">
                <a 
                  href="mailto:contact@feelingsunfolded.com" 
                  className="hover:text-[#2a9d8f] transition duration-300"
                >
                  contact@feelingsunfolded.com
                </a>
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#2a9d8f] transition duration-300">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#2a9d8f] transition duration-300">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Feelings Unfolded with Sakina. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
