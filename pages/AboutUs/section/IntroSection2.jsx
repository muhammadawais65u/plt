"use client";

export default function IntroSection2() {
  return (
    <section id="intro-2" className="w-full min-h-screen relative overflow-hidden">
      {/* Background Image with Gradients */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/aboutimg1.jpeg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6 md:px-12 py-24">
        <div className="w-full animate-[riseIn_1s_cubic-bezier(0.2,0.8,0.2,1)_both]  mx-auto">
          {/* Headline */}
          <h2 className="font-serif font-normal text-[clamp(36px,5vw,52px)] leading-[1.12] tracking-[-0.01em] m-0 mb-6.5 text-[var(--text-primary)]">
            A new generation of <span className="font-medium text-[var(--bg-tertiary)]">real estate</span>
          </h2>

          {/* Description */}
          <p className="text-[16.5px] leading-[1.75] text-[var(--text-secondary)] font-light max-w-[680px]  mb-5">
            PLT Properties creates more than beautiful projects. We create places designed to make everyday life feel better.
          </p>
          <p className="text-[16.5px] leading-[1.75] text-[var(--text-secondary)] font-light max-w-[680px]  mb-5">
            Inspired by the Italian way of living, our developments bring together timeless architecture, natural beauty, considered craftsmanship and genuine hospitality.
          </p>
          <p className="text-[16.5px] leading-[1.75] text-[var(--text-secondary)] font-light max-w-[680px]  mb-9.5">
            Every project begins with a simple question: how can this place improve the way people live? The answer can be found in every detail — from the flow of a home and the quality of its light to the landscapes, experiences and connections that surround it.
          </p>
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
