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
import VisionSection from './section/VisionSection';
import GallerySection from './section/GallerySection';
import LocationSection from './section/LocationSection';
import AccessibilitySection from './section/AccessibilitySection';
import LandmarksSection from './section/LandmarksSection';
import MapSection from './section/MapSection';

// ============================================================
// SECTIONS CONFIG
// theme: 'dark'  = section bg dark hai  -> navbar text WHITE
// theme: 'light' = section bg light hai -> navbar text BLACK
// animate: false = section apni khud ki animation handle karta hai
// ============================================================
const SECTIONS = [
  { id: 'hero', Component: HeroSlider, theme: 'dark', animate: false },
  { id: 'vision', Component: VisionSection, theme: 'dark', animate: true },
  { id: 'gallery', Component: GallerySection, theme: 'dark', animate: true },
  { id: 'location', Component: LocationSection, theme: 'dark', animate: true },
  { id: 'accessibility', Component: AccessibilitySection, theme: 'dark', animate: true },
  { id: 'landmarks', Component: LandmarksSection, theme: 'dark', animate: true },
  { id: 'map', Component: MapSection, theme: 'dark', animate: true },
];

// Navbar color schemes
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

const BLACK_SCHEME = {
  bg: 'transparent',
  border: 'rgba(0,0,0,0.1)',
  text: '#000000',
  subText: 'rgba(0,0,0,0.6)',
  link: 'rgba(0,0,0,0.8)',
  linkHover: '#000000',
  buttonBorder: 'var(--bg-primary)',
  buttonText: '#000000',
  buttonHoverBg: '#000000',
  buttonHoverText: '#ffffff',
};

const BLACK_BG_SCHEME = {
  bg: '#000000',
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

const TRANSPARENT_WHITE_SCHEME = {
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

/**
 * Tower Page — GSAP ScrollTrigger horizontal scroll.
 * Desktop: sections horizontally scroll with pinning (vertical scroll drives horizontal movement).
 * Mobile (<768px): normal vertical stacking.
 * Navbar theme automatically switches based on active section.
 */
export default function TowerPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isNearLastSection, setIsNearLastSection] = useState(false);
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);


  useEffect(() => {
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
          snap: {
            snapTo: 1 / (SECTIONS.length - 1),
            duration: { min: 0.2, max: 0.6 },
            ease: 'power1.inOut',
            delay: 2,
            directional: false,
          },
          onUpdate: (self) => {
            setProgress(self.progress);
            const idx = Math.min(
              SECTIONS.length - 1,
              Math.round(self.progress * (SECTIONS.length - 1))
            );
            setActiveIndex(idx);
            setIsNearLastSection(self.progress > 0.85);
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
            if (self.isActive) setActiveIndex(i);
          },
        })
      );

      const pageTrigger = ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          setProgress(self.progress);
          setIsNearLastSection(self.progress > 0.85);
        },
      });

      return () => {
        triggers.forEach((t) => t.kill());
        pageTrigger.kill();
      };
    });

    return () => mm.revert();
  }, []);

  const isDarkSection = SECTIONS[activeIndex]?.theme === 'dark';
  const isContactSection = SECTIONS[activeIndex]?.id === 'contact';

  const navbarColors = isContactSection
    ? { top: TRANSPARENT_WHITE_SCHEME, scrolled: TRANSPARENT_WHITE_SCHEME }
    : isNearLastSection
    ? { top: BLACK_BG_SCHEME, scrolled: BLACK_BG_SCHEME }
    : isDarkSection
    ? { top: WHITE_SCHEME, scrolled: WHITE_SCHEME }
    : { top: BLACK_SCHEME, scrolled: BLACK_SCHEME };

  return (
    <div className="relative w-full">
      {/* Fixed Navbar — theme active section ke hisaab se auto-switch hota hai */}
      <Navbar colors={navbarColors} />

      {/* Scroll Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-[3px] z-[1100] bg-transparent">
        <div
          className="h-full bg-[var(--gold)] transition-[width] duration-100 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Horizontal Scroll Wrapper (GSAP pins this) */}
      <div ref={wrapperRef} className="relative overflow-hidden">
        <main
          ref={trackRef}
          role="main"
          aria-label="Tower sections"
          className="flex flex-col md:flex-row md:h-screen md:w-max will-change-transform"
        >
          {SECTIONS.map(({ id, Component, theme }) => (
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
