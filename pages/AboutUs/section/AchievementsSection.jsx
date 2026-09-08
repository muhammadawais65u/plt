"use client";

import { useState, useEffect, useRef } from "react";

export default function AchievementsSection() {
  const [counts, setCounts] = useState({ years: 0, projects: 0, residents: 0, awards: 0 });
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animateCounts();
          }
        });
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounts = () => {
    const duration = 1300;
    const targets = { years: 15, projects: 50, residents: 2000, awards: 25 };
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts({
        years: Math.floor(eased * targets.years),
        projects: Math.floor(eased * targets.projects),
        residents: Math.floor(eased * targets.residents),
        awards: Math.floor(eased * targets.awards),
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCounts(targets);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[var(--bg-section)] min-h-[640px] relative overflow-hidden py-[120px] border-r border-[rgba(255,255,255,0.1)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[640px] relative z-10 w-full ">
        {/* Center vertical line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-px bg-[var(--decorative-divider)] z-0 hidden md:block" />
        {/* Left Content */}
        <div className="flex flex-col justify-center px-[90px] py-[70px] md:py-0 relative z-10">
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--accent-gold-light)] mb-[22px]">
            Our Achievements
          </span>
          <h1 className="font-serif font-normal text-[clamp(40px,4.6vw,60px)] leading-[1.08] text-[var(--accent-cream-light)] max-w-[560px] tracking-[-0.01em] mb-[26px]">
            Numbers That Speak
          </h1>
          <p className="text-[15.5px] leading-[1.7] text-[var(--text-cream-muted)] max-w-[420px] mb-[36px]">
            Our track record of success is a testament to our commitment to excellence and customer satisfaction — built one landmark at a time.
          </p>
          <a href="#" className="inline-flex items-center gap-[10px] text-[var(--accent-gold-light)] text-[12.5px] font-semibold tracking-[0.14em] uppercase border-b border-transparent hover:border-[var(--accent-gold-light)] hover:gap-[14px] transition-all w-fit">
            Explore PLT Tower
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>

        {/* Right Stats Grid */}
        <div className="flex items-center justify-center px-[60px] py-[70px] md:py-0  relative z-10">
          <div className="w-full max-w-[640px] grid grid-cols-2 border border-[var(--decorative-divider)] bg-[rgba(255,255,255,0.02)] backdrop-blur-[2px]">
            {/* Stat 1 */}
            <div className="p-[44px_40px] border-r border-b border-[var(--decorative-divider)] hover:bg-[rgba(199,164,107,0.06)] transition-all">
              <div className="w-[44px] h-[44px] border border-[var(--accent-gold-medium)] rounded-full flex items-center justify-center text-[var(--accent-gold-light)] mb-[26px]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-[19px] h-[19px]">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M12 7v5l3 2"/>
                </svg>
              </div>
              <div className="font-serif font-normal text-[38px] text-[var(--accent-cream-light)] flex items-baseline gap-[2px]">
                {counts.years}<span className="text-[26px] text-[var(--accent-gold-light)]">+</span>
              </div>
              <div className="mt-[10px] text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--text-cream-muted)]">
                Years of Experience
              </div>
            </div>

            {/* Stat 2 */}
            <div className="p-[44px_40px] border-b border-[var(--decorative-divider)] hover:bg-[rgba(199,164,107,0.06)] transition-all">
              <div className="w-[44px] h-[44px] border border-[var(--accent-gold-medium)] rounded-full flex items-center justify-center text-[var(--accent-gold-light)] mb-[26px]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-[19px] h-[19px]">
                  <path d="M4 21V8l8-5 8 5v13"/>
                  <path d="M9 21v-6h6v6"/>
                  <path d="M9 12h.01M15 12h.01M9 8h.01M15 8h.01"/>
                </svg>
              </div>
              <div className="font-serif font-normal text-[38px] text-[var(--accent-cream-light)] flex items-baseline gap-[2px]">
                {counts.projects}<span className="text-[26px] text-[var(--accent-gold-light)]">+</span>
              </div>
              <div className="mt-[10px] text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--text-cream-muted)]">
                Projects Completed
              </div>
            </div>

            {/* Stat 3 */}
            <div className="p-[44px_40px] border-r border-[var(--decorative-divider)] hover:bg-[rgba(199,164,107,0.06)] transition-all">
              <div className="w-[44px] h-[44px] border border-[var(--accent-gold-medium)] rounded-full flex items-center justify-center text-[var(--accent-gold-light)] mb-[26px]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-[19px] h-[19px]">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/>
                  <circle cx="10" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M17 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="font-serif font-normal text-[38px] text-[var(--accent-cream-light)] flex items-baseline gap-[2px]">
                {counts.residents.toLocaleString()}<span className="text-[26px] text-[var(--accent-gold-light)]">+</span>
              </div>
              <div className="mt-[10px] text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--text-cream-muted)]">
                Happy Residents
              </div>
            </div>

            {/* Stat 4 */}
            <div className="p-[44px_40px] hover:bg-[rgba(199,164,107,0.06)] transition-all">
              <div className="w-[44px] h-[44px] border border-[var(--accent-gold-medium)] rounded-full flex items-center justify-center text-[var(--accent-gold-light)] mb-[26px]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-[19px] h-[19px]">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <div className="font-serif font-normal text-[38px] text-[var(--accent-cream-light)] flex items-baseline gap-[2px]">
                {counts.awards}<span className="text-[26px] text-[var(--accent-gold-light)]">+</span>
              </div>
              <div className="mt-[10px] text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--text-cream-muted)]">
                Industry Awards
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
