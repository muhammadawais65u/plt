"use client";

export default function BlogSection() {
  return (
    <section id="blog" className="w-full min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Image with Gradients */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(100deg, rgba(20,17,14,0.94) 8%, rgba(20,17,14,0.72) 34%, rgba(20,17,14,0.30) 62%, rgba(20,17,14,0.55) 100%),
              linear-gradient(to top, rgba(20,17,14,0.85) 0%, rgba(20,17,14,0.05) 38%),
              url('/images/home-slider/imgslide2.jpg')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center 62%'
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_160px_rgba(0,0,0,0.55)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-12 py-28">
        <div className="text-center animate-[riseIn_1s_cubic-bezier(0.2,0.8,0.2,1)_both]">
          <p className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[var(--bg-tertiary)] mb-4">
            Blog
          </p>
          <h2 className="font-serif font-normal text-[clamp(36px,5vw,52px)] leading-[1.12] tracking-[-0.01em] m-0 mb-6.5 text-[var(--text-primary)]">
            Coming <span className="font-medium text-[var(--bg-tertiary)]">Soon</span>
          </h2>
          <p className="text-[16.5px] leading-[1.75] text-[var(--text-secondary)] font-light max-w-[560px] mx-auto m-0">
            Stories, insights and updates from PLT Properties — arriving shortly.
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
