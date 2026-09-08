"use client";

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import FloatingActionBar from '@/components/FloatingActionBar';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

// Sections
import HeroSlider from './section/HeroSlider';
import IntroSection1 from './section/IntroSection1';
import HeroSection from './section/HeroSection';
import IntroSection3 from './section/IntroSection3';
import Developments from './section/DevelopmentsSection';
import BlogSection from './section/BlogSection';
import ContactSection from './section/ContactSection';

// ============================================================
// SECTIONS CONFIG
// theme: 'dark'  = section bg dark hai  -> navbar text WHITE
// theme: 'light' = section bg light hai -> navbar text BLACK
// animate: false = section apni khud ki animation handle karta hai
// ============================================================
const BASE_SECTIONS = [
  { id: 'hero', Component: HeroSlider, theme: 'dark', animate: false },
  { id: 'intro-1', Component: IntroSection1, theme: 'dark', animate: true },
  { id: 'hero-section', Component: HeroSection, theme: 'dark', animate: true },
  { id: 'intro-3', Component: IntroSection3, theme: 'dark', animate: true },
  { id: 'developments', Component: Developments, theme: 'dark', animate: true },
  { id: 'blog', Component: BlogSection, theme: 'dark', animate: true },
  { id: 'contact', Component: ContactSection, theme: 'light', animate: true },
];

// Navbar color schemes
const WHITE_SCHEME = {
  bg: 'var(--nav-bg-top)',
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

const BLACK_SCHEME = {
  bg: 'var(--nav-bg)',
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

const BLACK_BG_SCHEME = {
  bg: 'var(--bg-section)',
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

/**
 * Homepage — GSAP ScrollTrigger horizontal scroll.
 * Desktop: sections horizontally scroll with pinning (vertical scroll drives horizontal movement).
 * Mobile (<768px): normal vertical stacking.
 * Navbar theme automatically switches based on active section.
 */
export default function Homepage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isNearLastSection, setIsNearLastSection] = useState(false);
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    // Kill all existing ScrollTriggers to prevent cached scroll positions
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Reset scroll position and track position on page load
    setTimeout(() => {
      window.scrollTo(0, 0);
      if (trackRef.current) {
        gsap.set(trackRef.current, { x: 0 });
      }
      ScrollTrigger.refresh();
    }, 100);
    
    const mm = gsap.matchMedia();

    // ============ DESKTOP: HORIZONTAL SCROLL ============
    mm.add('(min-width: 768px)', () => {
      const track = trackRef.current;
      const wrapper = wrapperRef.current;
      if (!track || !wrapper) return;

      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          // Snap: jis section ki taraf aadhe se zyada scroll hoga, wahi properly snap ho jayega
          snap: {
            snapTo: 1 / (BASE_SECTIONS.length - 1),
            duration: { min: 0.3, max: 0.5 },
            ease: 'power2.inOut',
            delay: 0,
            // directional: false = scroll direction ignore karo,
            // jis section ka hissa screen par zyada hai wahi snap hoga
            directional: false,
          },
          onUpdate: (self) => {
            setProgress(self.progress);
            const idx = Math.min(
              BASE_SECTIONS.length - 1,
              Math.round(self.progress * (BASE_SECTIONS.length - 1))
            );
            setActiveIndex(idx);
            // Detect when the last section (contact) is active
            setIsNearLastSection(idx === BASE_SECTIONS.length - 1);
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    // ============ MOBILE: VERTICAL SCROLL ============
    mm.add('(max-width: 767px)', () => {
      const panels = gsap.utils.toArray('.h-panel');
      const triggers = panels.map((panel, i) =>
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIndex(i);
              setIsNearLastSection(i === BASE_SECTIONS.length - 1);
            }
          },
        })
      );

      const pageTrigger = ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });

      return () => {
        triggers.forEach((t) => t.kill());
        pageTrigger.kill();
      };
    });

    return () => mm.revert();
  }, []);

  const isDarkSection = BASE_SECTIONS[activeIndex]?.theme === 'dark';

  const navbarColors = isNearLastSection
    ? { top: BLACK_BG_SCHEME, scrolled: BLACK_BG_SCHEME }
    : isDarkSection
    ? { top: WHITE_SCHEME, scrolled: WHITE_SCHEME }
    : { top: BLACK_SCHEME, scrolled: BLACK_SCHEME };

  return (
    <div className="relative w-full">
      {/* Fixed Navbar — theme active section ke hisaab se auto-switch hota hai */}
      <Navbar colors={navbarColors} activeSection={BASE_SECTIONS[activeIndex]?.id} />

      {/* Scroll Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-[3px] z-[1100] bg-transparent">
        <div
          className="h-full bg-[var(--bg-secondary)] transition-[width] duration-100 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Horizontal Scroll Wrapper (GSAP pins this) */}
      <div ref={wrapperRef} className="relative overflow-hidden">
        <main
          ref={trackRef}
          role="main"
          aria-label="Homepage sections"
          className="flex flex-col md:flex-row md:h-screen md:w-max will-change-transform"
        >
          {BASE_SECTIONS.map(({ id, Component, theme }) => (
            <section
              key={id}
              id={`section-${id}`}
              data-theme={theme}
              className="h-panel relative w-full md:w-screen md:h-screen flex-shrink-0 md:overflow-y-auto md:overflow-x-hidden md:flex md:flex-col md:[&>*]:flex-1 md:[&>*]:min-h-0"
            >
              <Component />
            </section>
          ))}
        </main>
      </div>

      {/* Floating Action Bar */}
      <FloatingActionBar />


      {/* Footer */}
      <Footer />
    </div>
  );
}
