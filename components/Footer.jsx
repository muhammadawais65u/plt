"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

function Instagram(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
function Linkedin(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="7.5" y1="10" x2="7.5" y2="17" />
      <line x1="7.5" y1="6.8" x2="7.5" y2="6.9" />
      <path d="M12 17v-4.5a2 2 0 0 1 4 0V17" />
      <line x1="12" y1="10" x2="12" y2="17" />
    </svg>
  );
}
function Youtube(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="M10.5 9.5l5 2.5-5 2.5v-5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const DEVELOPMENTS = [
  { label: "PLT Tower", href: "https://www.plttower.com/", external: true },

];

const COMPANY = [
  { label: "Home", href: "/" },
  { label: "PLT Tower", href: "https://www.plttower.com/", external: true },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about-us" },
  { label: "Contact", href: "/contact-us" },
  { label: "Register Interest", href: "/register-interest" },
];

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.dispatchEvent(new CustomEvent("changeNavbarTheme", { detail: "white" }));
        } else {
          window.dispatchEvent(new CustomEvent("changeNavbarTheme", { detail: "default" }));
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[var(--bg-section)] text-white px-6 md:px-16 py-16 border-t border-[rgba(255,255,255,0.1)]">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo & About */}
        <div>
          <Link href="/" className="inline-block">
            <Image
              src="/images/logo.png"
              alt="PLT Properties"
              width={160}
              height={72}
              className="h-12 w-auto"
            />
          </Link>
          <p className="text-sm text-white/80 mt-5 font-normal leading-relaxed max-w-xs">
            Italian craftsmanship. Considered addresses. Built for longevity in Dubai's most connected districts.
          </p>
          <div className="flex gap-3 mt-6">
            <a href="#" className="w-9 h-9 flex items-center justify-center border border-white p-2  hover:border-[var(--bg-secondary)]  hover:bg-[var(--bg-secondary)] transition">
              <Instagram size={16} className="text-[#fff]" />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center border border-white p-2  hover:border-[var(--bg-secondary)] hover:bg-[var(--bg-secondary)] transition">
              <Linkedin size={16} className="text-[#fff]" />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center border border-white p-2  hover:border-[var(--bg-secondary)] hover:bg-[var(--bg-secondary)] transition">
              <Youtube size={16} className="text-[#fff]" />
            </a>
          </div>
        </div>

        {/* Developments */}
        <div>
          <p className="text-xs tracking-[0.2em] text-[#c9a876] font-normal font-sans mb-5 ">DEVELOPMENTS</p>
          <ul className="space-y-4 text-sm text-white/80">
            {DEVELOPMENTS.map((item) => (
              <li key={item.label}>
                <a 
                  href={item.href} 
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="hover:text-[#c9a876] transition"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="text-xs tracking-[0.2em] text-[#c9a876] font-normal font-sans mb-5 ">COMPANY</p>
          <ul className="space-y-4 text-sm text-white/80">
            {COMPANY.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-[#c9a876] transition">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs tracking-[0.2em] text-[#c9a876] font-normal font-sans mb-5 ">CONTACT</p>

          <p className="text-[10px] tracking-[0.15em] text-white/80 mb-1">SALES GALLERY</p>
          <p className="text-sm text-gray-200 mb-5">Business Bay, Dubai</p>

          <p className="text-[10px] tracking-[0.15em] text-white/80 mb-1">PHONE</p>
          <p className="text-sm text-gray-200 mb-5">+971 4 XXX XXXX</p>

          <p className="text-[10px] tracking-[0.15em] text-white/80 mb-1">WHATSAPP</p>
          <p className="text-sm text-gray-200 mb-7">+971 50 XXX XXXX</p>

          <p className="text-xs tracking-[0.2em] text-[#c9a876] font-semibold mb-3">NEWSLETTER</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="bg-[#fff] text-sm text-gray-200 placeholder-gray-500 px-4 py-2.5 w-full border border-gray-700 focus:outline-none focus:border-[#c9a876]"
            />
            <button
              type="submit"
              className="bg-[var(--bg-secondary)] text-[#ffffff] text-xs font-semibold tracking-wide px-5 whitespace-nowrap hover:bg-[#d9b98a] transition"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}