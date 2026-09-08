"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { label: "HOME", href: "/", sectionId: "hero", activeSections: ['hero'] },
  { label: "ABOUT", href: "/", sectionId: "intro-1", activeSections: ['intro-1', 'hero-section', 'intro-3'] },
  { label: "PLT TOWER", href: "/", sectionId: "developments", activeSections: ['developments'] },
  { label: "BLOG", href: "/", sectionId: "blog", activeSections: ['blog'] },
  { label: "CONTACT", href: "/", sectionId: "contact", activeSections: ['contact'] },
];


const DEFAULT_COLORS = {
  top: {
    bg: "transparent",
    border: "transparent",
    text: "#ffffff",
    subText: "rgba(255,255,255,0.8)",
    link: "rgba(255,255,255,0.9)",
    linkHover: "#ffffff",
    buttonBorder: "var(--bg-primary)",
    buttonText: "#ffffff",
    buttonHoverBg: "#ffffff",
    buttonHoverText: "#000000",
  },
  scrolled: {
    bg: "#1D2128",
    border: "rgba(0,0,0,0.1)",
    text: "#000000",
    subText: "rgba(0,0,0,0.6)",
    link: "rgba(0,0,0,0.8)",
    linkHover: "#000000",
    buttonBorder: "var(--bg-primary)",
    buttonText: "#000000",
    buttonHoverBg: "#000000",
    buttonHoverText: "#ffffff",
  },
  mobile: {
    bg: "#1D2128",
    border: "rgba(255,255,255,0.1)",
    text: "#ffffff",
    link: "rgba(255,255,255,0.9)",
    linkHover: "#ffffff",
    buttonBg: "#ffffff",
    buttonText: "#000000",
  },
};

export default function Navbar({ colors = {}, activeSection }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Merge user colors with defaults
  const theme = {
    top: { ...DEFAULT_COLORS.top, ...(colors.top || {}) },
    scrolled: { ...DEFAULT_COLORS.scrolled, ...(colors.scrolled || {}) },
    mobile: { ...DEFAULT_COLORS.mobile, ...(colors.mobile || {}) },
  };

  // Active state ke hisaab se colors select karo
  const c = isScrolled ? theme.scrolled : theme.top;
  const m = theme.mobile;

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Homepage sections par smooth-scroll navigation (internal redirect)
  const handleNavClick = (e, link) => {
    if (!link.sectionId) return;
    if (pathname !== "/") return; // dusre pages se normal navigation hoga
    const el = document.getElementById(`section-${link.sectionId}`);
    if (!el) return;
    e.preventDefault();
    setOpen(false);
    if (window.innerWidth >= 768) {
      // Horizontal scroll: track ke andar offsetLeft = required vertical scroll
      window.scrollTo({ top: el.offsetLeft, behavior: "smooth" });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // CSS variables — inhi se saare colors control hote hain
  const cssVars = {
    "--nav-bg": c.bg,
    "--nav-border": c.border,
    "--nav-text": c.text,
    "--nav-subtext": c.subText,
    "--nav-link": c.link,
    "--nav-link-hover": c.linkHover,
    "--nav-btn-border": c.buttonBorder,
    "--nav-btn-text": c.buttonText,
    "--nav-btn-hover-bg": c.buttonHoverBg,
    "--nav-btn-hover-text": c.buttonHoverText,
    "--nav-mobile-bg": m.bg,
    "--nav-mobile-border": m.border,
    "--nav-mobile-text": m.text,
    "--nav-mobile-link": m.link,
    "--nav-mobile-link-hover": m.linkHover,
    "--nav-mobile-btn-bg": m.buttonBg,
    "--nav-mobile-btn-text": m.buttonText,
    "--nav-mobile-subtext": m.subText || "rgba(255,255,255,0.8)",
  };

  return (
    <header
      style={cssVars}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[var(--nav-mobile-bg)] text-[color:var(--nav-mobile-text)] md:bg-[var(--nav-bg)] md:text-[color:var(--nav-text)] border-b border-[color:var(--nav-mobile-border)] md:border-[color:var(--nav-border)]"
    >
      {/* Main Navbar Bar */}
      <div className="relative flex items-center justify-between px-6 sm:px-10 py-5">

        {/* Brand Logo */}
        <Link
          href="/"
          onClick={(e) => {
            if (pathname !== "/") return;
            e.preventDefault();
            const panel = document.getElementById('section-hero');
            if (!panel) return;
            if (window.innerWidth >= 768) {
              window.scrollTo({ top: panel.offsetLeft, behavior: 'smooth' });
            } else {
              panel.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="leading-tight flex-shrink-0 z-10"
        >
          <Image
            src="/images/logo.png"
            alt="PLT Properties"
            width={160}
            height={72}
            priority
            className="h-10 sm:h-12 w-auto"
          />
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {LINKS.map((link) => {
            const isActive = link.activeSections?.includes(activeSection);
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`font-sans text-[14px] tracking-[2px] uppercase transition-colors duration-300 whitespace-nowrap text-[color:var(--nav-link)] hover:text-[color:var(--nav-link-hover)] ${isActive ? 'font-bold' : 'font-[300]'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Action Button + Mobile Burger Menu */}
        <div className="flex items-center gap-4 flex-shrink-0 z-10">
          <button
            onClick={() => {
              const panel = document.getElementById('section-contact');
              if (!panel) return;
              if (window.innerWidth >= 768) {
                window.scrollTo({ top: panel.offsetLeft, behavior: 'smooth' });
              } else {
                panel.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="hidden lg:inline-flex items-center px-6 py-2.5 font-sans font-[300] text-[14px] tracking-[2px] uppercase transition-all duration-300 border border-[var(--bg-secondary)] text-[color:var(--nav-btn-text)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] hover:border-[var(--bg-tertiary)] hover:text-[color:var(--nav-btn-hover-text)] cursor-pointer"
          >
            Register Interest
          </button>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 transition-colors duration-300 text-[color:var(--nav-mobile-text)] md:text-[color:var(--nav-text)] hover:opacity-80"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* --- MOBILE DROPDOWN NAVIGATION --- */}
      {open && (
        <div className="lg:hidden px-6 pb-8 pt-2 animate-fadeIn bg-[var(--nav-mobile-bg)] border-t border-[color:var(--nav-mobile-border)]">
          <nav className="flex flex-col gap-5">
            {LINKS.map((link) => {
              const isActive = link.activeSections?.includes(activeSection);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { handleNavClick(e, link); setOpen(false); }}
                  className={`font-sans text-[14px] tracking-[2px] transition-colors py-1 text-[color:var(--nav-mobile-link)] hover:text-[color:var(--nav-mobile-link-hover)] ${isActive ? 'font-bold' : 'font-normal'}`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="#section-contact"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                const panel = document.getElementById('section-contact');
                if (!panel) return;
                if (window.innerWidth >= 768) {
                  window.scrollTo({ top: panel.offsetLeft, behavior: 'smooth' });
                } else {
                  panel.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center px-6 py-3 border border-[var(--bg-secondary)] font-sans font-[300] text-[14px] tracking-[2px] uppercase mt-4 transition-all duration-300 bg-[var(--bg-secondary)] text-white hover:bg-[var(--bg-tertiary)] hover:border-[var(--bg-tertiary)]"
            >
              Register Interest
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}