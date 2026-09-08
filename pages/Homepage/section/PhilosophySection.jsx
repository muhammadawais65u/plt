"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Philosophy() {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <section
      id="philosophy"
      className="relative bg-[var(--bg-section)] py-[120px] px-12 md:px-12 lg:px-12 flex-col flex overflow-hidden border-r border-[rgba(255,255,255,0.1)] flex items-center justify-center"
    >
      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(237,230,216,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(237,230,216,0.18) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
          opacity: '0.05'
        }}
      />

      {/* Header */}
     <div className="phil-head relative max-w-[760px] mx-auto mb-[62px] text-center reveal" ref={addToRefs}>
    
        <h2 className="font-serif font-normal italic text-[clamp(32px,5vw,46px)] leading-[1.15] text-[#FFFFFF] m-0 mb-[26px]">
          More than places to live
        </h2>
        <p className="text-[clamp(14.5px,1.6vw,18px)] leading-[1.75] text-[var(--text-secondary)] font-light m-0">
          Creating timeless residences where Italian heritage, exceptional architecture, wellness, and hospitality come together to shape extraordinary lifestyles.
        </p>
      </div>

      {/* Body */}
      <div className="phil-body relative w-full mx-auto grid grid-cols-1 md:grid-cols-[0.85fr_1fr] gap-12 md:gap-16 items-center">
        {/* Media */}
        <div className="phil-media relative  md:pl-0 reveal" ref={addToRefs}>

          <div className="phil-frame relative border border-[rgba(237,230,216,0.16)] leading-none">
            <img
              src="/images/img.jpg"
              alt="Landmark tower at golden hour, referencing PLT's architectural inspiration"
              className="w-full h-[300px] md:h-[340px] object-cover block"
              style={{ filter: 'saturate(1.02) contrast(1.02)' }}
            />

          </div>
        </div>

        {/* Copy */}
        <div className="phil-copy reveal" ref={addToRefs}>
          <h3 className="font-serif font-normal text-[clamp(28px,4vw,42px)] leading-[1.22] text-[var(--text-primary)] m-0 mb-7">
            Design, place and a better living
          </h3>
          <p className="text-[20px] leading-[2.2] text-[var(--text-secondary)] font-light m-0 mb-8 ">
            Explore stories about architecture, Italian design, wellness, nature   <br/> and the destinations shaping the future of real estate.
          </p> 
          <Link
            href="/blog"
            className="inline-block text-[12px] tracking-[0.2em] uppercase text-[var(--text-primary)] border border-[rgba(237,230,216,0.3)] px-8 py-3 hover:bg-[rgba(237,230,216,0.1)] transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>

      <style jsx>{`
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.9s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 880px) {
          section {
            padding: 80px 24px 90px 24px;
          }
        }
      `}</style>
    </section>
  );
}