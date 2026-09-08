"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const MILESTONES = [
  { title: "2001", label: "The Beginning", desc: "The entrepreneurial journey begins." },
  { title: "2006", label: "Renewable Energy", desc: "The Group enters the renewable energy sector with its first wind farm." },
  { title: "2008–2013", label: "First Industrial Plan", desc: "The first industrial plan accelerates the expansion of the renewable energy business." },
  { title: "2014", label: "Public Listing", desc: "The Group is listed on the Italian Stock Exchange, supporting its next phase of growth." },
  { title: "2014–2019", label: "Second Industrial Plan", desc: "A second industrial plan further strengthens the Group's leadership in renewable energy." },
  { title: "2022", label: "A New Chapter", desc: "The transaction with Eni Plenitude marks the successful completion of a major growth cycle." },
  { title: "2023", label: "Diversification", desc: "PLT Holding is established as a diversified Family Office, investing across finance, renewable energy, real estate, and hospitality." },
  { title: "2024–2030", label: "A New Industrial Plan", desc: "The Group embarks on its first industrial plan as a diversified investment platform." },
  { title: "2024", label: "PLT Properties", desc: "PLT Holding launches its real estate operations in Dubai through PLT Properties." },
  { title: "2027", label: "PLT TOWER", desc: "The flagship project is officially pre-launched in Dubai.", highlight: true },
];

export default function IntroSection1() {
  const timelineRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(null);

  // Scroll-spy: milestone closest to viewport center lights up
  useEffect(() => {
    const updateActive = () => {
      const el = timelineRef.current;
      if (!el) return;
      const rows = el.querySelectorAll("[data-milestone-row]");
      const center = window.innerHeight / 2;
      let closest = null;
      let closestDist = Infinity;
      rows.forEach((row, i) => {
        const rect = row.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - center);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActiveIdx(closest);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActive();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActive);
    updateActive();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return (
    <section id="intro-1" className="w-full min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Image with Gradients */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(100deg, rgba(20,17,14,0.94) 8%, rgba(20,17,14,0.72) 34%, rgba(20,17,14,0.30) 62%, rgba(20,17,14,0.55) 100%),
              linear-gradient(to top, rgba(20,17,14,0.85) 0%, rgba(20,17,14,0.05) 38%),
              url('/images/homepage/intro-image.jpg')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center 62%'
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_160px_rgba(0,0,0,0.55)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center justify-start px-6 md:px-12 py-22 w-full">
        <div className="w-full py-4 animate-[riseIn_1s_cubic-bezier(0.2,0.8,0.2,1)_both] mx-auto">
          {/* Headline */}
          <h2 className="font-serif font-normal text-[clamp(36px,5vw,52px)] leading-[1.12] tracking-[-0.01em] m-0 mb-6.5 text-[var(--text-primary)]">
            New vision. <span className="font-medium text-[var(--bg-tertiary)]">Established strength.</span>
          </h2>

          {/* Description */}
          <p className="text-[16.5px] leading-[1.75] text-[var(--text-secondary)] font-light max-w-[740px] m-0 mb-5">
            PLT Properties is backed by PLT Holding, a diversified international group founded through the entrepreneurial vision of the Tortora Family.
          </p>
          <p className="text-[16.5px] leading-[1.75] text-[var(--text-secondary)] font-light max-w-[740px] m-0 mb-5">
            Across renewable energy, finance, real estate, hospitality and strategic investments, PLT Holding has built its reputation on long-term thinking, disciplined execution and responsible growth.
          </p>
          <p className="text-[16.5px] leading-[1.75] text-[var(--text-secondary)] font-light max-w-[740px] m-0 mb-9.5">
            PLT Properties brings this same foundation to real estate — combining the energy of a new lifestyle developer with the strength and capabilities of an established group.
          </p>

          {/* CTA */}
          <Link
            href="https://www.pltholding.it/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-start mt-4 px-6 py-2.5 font-sans font-[300] text-[14px] tracking-[2px] uppercase transition-all duration-300 border border-[#fff] text-[#fff] hover:bg-[var(--accent-gold)] hover:text-[#14110e]"
          >
            Discover PLT Holding
          </Link>

          {/* Milestones Timeline */}
          <div className="relative z-10 mt-6 animate-[riseIn_1.1s_cubic-bezier(0.2,0.8,0.2,1)_0.15s_both]">
            {/* Desktop: horizontal timeline */}
            <div className="hidden md:block relative px-8 pt-20 pb-20">
              {/* Line */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-[rgba(237,230,216,0.08)] via-[rgba(198,167,107,0.55)] to-[var(--bg-tertiary)] min-w-full" />

              <div className="relative flex gap-[30px] md:gap-[40px] lg:gap-[50px] min-[1320px]:gap-0 justify-between px-2">
                {MILESTONES.map((m, i) => (
                  <div key={m.title} className="relative flex flex-col items-center group">
                    {/* Label above (even) */}
                    <div className={`absolute bottom-full mb-5 text-center transition-transform duration-300 group-hover:-translate-y-1 ${i % 2 !== 0 ? 'invisible' : ''}`}>
                      <div className={`font-sans text-[12px] md:text-[13px] font-medium mb-1 whitespace-nowrap ${m.highlight ? 'text-[var(--bg-tertiary)]' : 'text-[var(--text-primary)]'}`}>{m.title}</div>
                      <div className="font-mono text-[8px] tracking-[0.1em] uppercase text-[var(--text-secondary)] whitespace-nowrap">{m.label}</div>
                    </div>

                    {/* Diamond marker */}
                    <span
                      className={`block w-2.5 h-2.5 rotate-45 transition-all duration-300 group-hover:scale-125 ${
                        m.highlight
                          ? 'bg-[var(--bg-tertiary)] shadow-[0_0_18px_rgba(198,167,107,0.65)]'
                          : 'border border-[var(--bg-tertiary)] bg-transparent group-hover:bg-[var(--bg-tertiary)]'
                      }`}
                    />

                    {/* Description tooltip */}
                    <div
                      className={`absolute bottom-full mb-14 w-max max-w-[220px] px-3 py-2 rounded bg-[rgba(20,17,14,0.92)] border border-[rgba(198,167,107,0.25)] text-[var(--text-secondary)] text-[11px] leading-[1.5] text-center opacity-0 translate-y-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 z-20 ${
                        i === 0 ? 'left-0' : i === MILESTONES.length - 1 ? 'right-0' : 'left-1/2 -translate-x-1/2'
                      }`}
                    >
                      {m.desc}
                    </div>

                    {/* Label below (odd) */}
                    <div className={`absolute top-full mt-5 text-center transition-transform duration-300 group-hover:translate-y-1 ${i % 2 === 0 ? 'invisible' : ''}`}>
                      <div className={`font-sans text-[12px] md:text-[13px] font-medium mb-1 whitespace-nowrap ${m.highlight ? 'text-[var(--bg-tertiary)]' : 'text-[var(--text-primary)]'}`}>{m.title}</div>
                      <div className="font-mono text-[8px] tracking-[0.1em] uppercase text-[var(--text-secondary)] whitespace-nowrap">{m.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: vertical centered timeline */}
            <div ref={timelineRef} className="md:hidden relative">
              {/* Vertical spine */}
              <div className="absolute left-1/2 top-1.5 bottom-1.5 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[rgba(198,167,107,0.35)] to-transparent" />

              {MILESTONES.map((m, i) => {
                const active = i === activeIdx || m.highlight;
                const isLeft = i % 2 === 0;
                return (
                  <div key={m.title} data-milestone-row className="relative grid grid-cols-[1fr_40px_1fr] min-h-[90px] items-stretch">
                    {/* Diamond node */}
                    <div className="relative z-10 flex justify-center items-center col-start-2 row-start-1">
                      <span
                        className={`block w-[13px] h-[13px] rotate-45 border-[1.5px] transition-all duration-[350ms] ${
                          active
                            ? 'bg-[var(--bg-tertiary)] border-[var(--bg-tertiary)] shadow-[0_0_0_6px_rgba(198,167,107,0.16),0_0_20px_rgba(198,167,107,0.5)] scale-125'
                            : 'border-[#8a7238] bg-[#14110e]'
                        }`}
                      />
                    </div>

                    {/* Connecting stub */}
                    <span className={`absolute top-1/2 w-[16px] h-px bg-[rgba(198,167,107,0.3)] ${isLeft ? 'right-[calc(50%+6px)]' : 'left-[calc(50%+6px)]'}`} />

                    {/* Card */}
                    <div
                      className={`pb-7 row-start-1 transition-all duration-[400ms] ${
                        isLeft
                          ? 'col-start-1 text-right pr-5'
                          : 'col-start-3 pl-5'
                      } ${active ? 'opacity-100 translate-y-0' : 'opacity-55 translate-y-1'}`}
                    >
                      <div className="font-mono text-[11px] tracking-[0.06em] mb-[7px] text-[var(--bg-tertiary)]">{m.title}</div>
                      <div className={`font-serif font-medium text-[15px] leading-[1.28] tracking-[-0.005em] ${active ? 'text-white' : 'text-[var(--text-primary)]'}`}>{m.label}</div>
                      {active && (
                        <p className="mt-2 text-[12px] leading-[1.8] text-[var(--text-secondary)] font-medium">
                          {m.desc}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Footer */}
              <div className="mt-10 pt-6 border-t border-[rgba(237,232,222,0.12)] flex justify-between items-center font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <span className="block w-2 h-2 rotate-45 bg-[var(--bg-tertiary)]" />
                  Milestones Overview
                </div>
                <div>2001 — 2030</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
