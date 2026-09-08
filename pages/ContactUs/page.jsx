"use client";

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Contact Us sections
import ContactFormSection from './section/ContactFormSection';

const WHITE_SCHEME = {
  bg: 'transparent',
  border: 'rgba(255,255,255,0.1)',
  text: '#ffffff',
  subText: 'rgba(255,255,255,0.8)',
  link: 'rgba(255,255,255,0.9)',
  linkHover: '#ffffff',
  buttonBorder: 'var(--bg-primary)',
  buttonText: '#ffffff',
  buttonHoverBg: '#ffffff',
  buttonHoverText: '#000000',
};

const SCROLLED_SCHEME = {
  bg: '#1D2128',
  border: 'rgba(255,255,255,0.1)',
  text: '#ffffff',
  subText: 'rgba(255,255,255,0.8)',
  link: 'rgba(255,255,255,0.9)',
  linkHover: '#ffffff',
  buttonBorder: 'var(--bg-primary)',
  buttonText: '#ffffff',
  buttonHoverBg: '#ffffff',
  buttonHoverText: '#000000',
};

export default function ContactUs() {
  useEffect(() => {
    // Reset scroll position to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full">
      <Navbar colors={{ top: WHITE_SCHEME, scrolled: SCROLLED_SCHEME }} />

      <main className="w-full">
        <ContactFormSection />
      </main>

      <Footer />
    </div>
  );
}
