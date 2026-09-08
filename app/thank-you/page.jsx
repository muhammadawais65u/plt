"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect } from 'react';

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  return (
    <div className="min-h-screen bg-[var(--bg-section)] flex flex-col">
      <Navbar colors={{ top: WHITE_SCHEME, scrolled: SCROLLED_SCHEME }} />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-[880px] w-full text-center">
      <svg className="w-[118px] h-[150px] mx-auto mb-10" viewBox="0 0 118 150" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 148 L40 40 L59 18 L78 40 L78 148" fill="none" stroke="#b08d57" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="520" strokeDashoffset="520" style={{ animation: 'draw 1.7s cubic-bezier(0.65, 0, 0.35, 1) forwards 0.15s' }}></path>
          <path d="M46 148 L46 60 M52 148 L52 55 M66 148 L66 55 M72 148 L72 60" strokeWidth="0.8" opacity="0.7" fill="none" stroke="#b08d57" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="520" strokeDashoffset="520" style={{ animation: 'draw 1.7s cubic-bezier(0.65, 0, 0.35, 1) forwards 0.15s' }}></path>
          <path className="base" d="M24 148 L94 148" fill="none" stroke="#f5f1e8" opacity="0.35" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="200" strokeDashoffset="200" style={{ animation: 'draw 1s ease-out forwards 1.2s' }}></path>
        </svg>
    

        <h1 className="font-serif font-medium text-[clamp(30px,4vw,44px)] leading-[1.2] m-0 mb-[22px] text-[#f5f1e8]">
          Thank you for <em className="text-[#b08d57] not-italic">reaching out.</em>
        </h1>

        <p className="text-[16px] leading-[1.85] text-[#948b7c] max-w-[480px] mx-auto mb-[42px]">
          Your message has been received. A member of the PLT Properties team
          will review your enquiry and get back to you shortly.
        </p>

        <div className="flex gap-[18px] justify-center flex-wrap">
          <Link className="hidden lg:inline-flex items-center px-6 py-2.5 font-sans font-[300] text-[14px] tracking-[2px] uppercase transition-all duration-300 border border-[var(--bg-secondary)] text-[color:var(--nav-btn-text)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] hover:border-[var(--bg-tertiary)] hover:text-[color:var(--nav-btn-hover-text)]" href="https://plttower.com" target="_blank" rel="noopener noreferrer">Explore PLT Tower</Link>
          <Link className="px-[34px] py-[15px] text-[12.5px] tracking-[0.14em] uppercase transition-all duration-250 inline-block border border-[rgba(245,241,232,0.12)] text-[#f5f1e8] hover:border-[#b08d57] hover:text-[#b08d57]" href="/">Back to Home</Link>
        </div>
        <div className="w-[156px] h-px bg-[rgba(245,241,232,0.12)] mx-auto my-8"></div>
        <div className="text-[13px] text-[#948b7c] tracking-[0.02em]">
          Prefer to talk now? Call <a className="text-[#f5f1e8] hover:text-[#b08d57]" href="tel:+9714XXXXXXX">+971 4 XXX XXXX</a>
          or WhatsApp <a className="text-[#f5f1e8] hover:text-[#b08d57]" href="https://wa.me/97150XXXXXXX">+971 50 XXX XXXX</a>
        </div>
      </div>
      </div>
      <Footer />

      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          svg path {
            animation: none !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
