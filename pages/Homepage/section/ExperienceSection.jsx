"use client";

import Image from "next/image";

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative bg-[var(--bg-section)] py-[clamp(60px,8vw,120px)] px-6 md:px-12 overflow-hidden border-r border-[rgba(255,255,255,0.1)] flex items-center flex-col justify-center">
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
      {/* Feature block: text left, image right */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full mx-auto mb-8 lg:mb-12 mt-4 md:mt-8">
        <div>
          <div className="flex items-center justify-start mb-2">
            <span className="hidden sm:block  h-px bg-[var(--bg-tertiary)] w-10 mr-6"></span>
            <p className="font-sans text-sm tracking-[0.25em] font-medium text-[var(--bg-tertiary)] whitespace-nowrap uppercase">
              On How It Feels
            </p>
            <span className="hidden sm:block h-px bg-[var(--bg-tertiary)] w-10 ml-6"></span>
          </div>
          <h2 className="font-serif text-[clamp(32px,5vw,44px)] leading-[1.2] tracking-[-0.01em] text-[var(--text-primary)] mb-4.5">
            Luxury Measured  by Experience
          </h2>
          <p className="text-[clamp(14.5px,1.6vw,16px)] leading-[1.75] text-[var(--text-secondary)] font-light ">
            True luxury is defined not by what surrounds you, but by how a
            place makes you feel.
          </p>
          <p className="text-[clamp(14.5px,1.6vw,16px)] leading-[1.75] text-[var(--text-secondary)] font-light ">
            It is found in quiet mornings filled with natural light,
            meaningful connections to nature, thoughtfully crafted spaces,
            and the comfort of genuine hospitality. At PLT Properties, every
            residence is designed to inspire wellbeing, encourage
            connection, and create experiences that endure far beyond the
            walls of a home.
          </p>
        </div>

        <div className="relative flex items-stretch justify-end order-first lg:order-last">
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-[rgba(237,230,216,0.16)]">
            <Image
              src="/images/img-home-intro.jpeg"
              alt="Quiet morning light interior"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          </div>

        </div>
      </div>

      {/* Quote */}
      <div className="relative w-full mx-auto text-center px-4">
        <div className="w-px h-10 bg-[var(--bg-tertiary)] mx-auto mb-4" />
        <p className="font-serif text-[32px] leading-[1.4]  text-[var(--text-primary)] mb-4.5">
          Not simply a place to live. A life to belong to.
        </p>
        
      </div>
    </section>
  );
}
