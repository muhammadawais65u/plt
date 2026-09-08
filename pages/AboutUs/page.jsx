"use client";

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// About Us sections
import HeroSection from '../Homepage/section/HeroSection'
import IntroSection3 from '../Homepage/section/IntroSection3';
import MissionSection from './section/MissionSection';
import ValuesSection from './section/ValuesSection';
import ContactSection from './section/ContactSection';

gsap.registerPlugin(ScrollTrigger);  

// theme: 'dark' = navbar text WHITE, 'light' = navbar text BLACK, 'dark-bg' = navbar with dark background, 'mission-bg' = navbar with bronze background
const SECTIONS = [
   { id: 'hero', Component: HeroSection, theme: 'dark' },
  { id: 'intro-3', Component: IntroSection3, theme: 'dark' },
   { id: 'values', Component: ValuesSection, theme: 'mission-bg' },
  { id: 'mission', Component: MissionSection, theme: 'dark' },

  { id: 'contact', Component: ContactSection, theme: 'mission-bg' },
];

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

const MISSION_SCHEME = {
  bg: 'var(--bg-section)',
  border: 'rgba(255,255,255,0.15)',
  text: '#ffffff',
  subText: 'rgba(255,255,255,0.85)',
  link: 'rgba(255,255,255,0.95)',
  linkHover: '#ffffff',
  buttonBorder: 'var(--bg-primary)',
  buttonText: '#ffffff',
  buttonHoverBg: '#ffffff',
  buttonHoverText: '#7a6042',
};

const BLACK_BG_SCHEME = {
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

export default function AboutUs() {
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

    // Desktop horizontal scroll
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
            duration: { min: 0.3, max: 0.5 },
            ease: 'power2.inOut',
            delay: 0,
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

    // Mobile vertical fallback
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
  const isDarkBgSection = SECTIONS[activeIndex]?.theme === 'dark-bg';
  const isMissionBgSection = SECTIONS[activeIndex]?.theme === 'mission-bg';

  const navbarColors = isNearLastSection
    ? { top: MISSION_SCHEME, scrolled: MISSION_SCHEME }
    : isMissionBgSection
    ? { top: MISSION_SCHEME, scrolled: MISSION_SCHEME }
    : isDarkBgSection
    ? { top: BLACK_BG_SCHEME, scrolled: BLACK_BG_SCHEME }
    : isDarkSection
    ? { top: WHITE_SCHEME, scrolled: WHITE_SCHEME }
    : { top: BLACK_SCHEME, scrolled: BLACK_SCHEME };

  return (
    <div className="relative w-full">
      <Navbar colors={navbarColors} />

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-[3px] z-[1100] bg-transparent">
        <div
          className="h-full bg-[var(--gold)] transition-[width] duration-100 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Horizontal scroll wrapper */}
      <div ref={wrapperRef} className="relative overflow-hidden">
        {/* Center vertical line */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 h-full w-px bg-[var(--decorative-divider)] z-0 hidden md:block pointer-events-none" />

        <main
          ref={trackRef}
          role="main"
          aria-label="About Us sections"
          className="flex flex-col md:flex-row md:h-screen md:w-max will-change-transform md:justify-center"
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


      <Footer />
    </div>
  );
}
