"use client";

import clsx from "clsx";

export default function HeroSection() {
  return (
    <section className={clsx('relative', 'min-h-screen', 'md:h-screen', 'w-full', 'overflow-hidden', 'bg-[var(--bg-hero)]')}>
      <div className={clsx('relative', 'min-h-screen', 'md:h-screen', 'w-full')}>
        <div
          className={clsx('absolute', 'inset-0', 'bg-cover', 'bg-center')}
          style={{ backgroundImage: `url(/images/aboutimg1.jpeg)` }}
        />
        <div className={clsx('absolute', 'inset-0', 'bg-gradient-to-r', 'from-black/90', 'via-black/60', 'to-black/40')} />
        <div className={clsx('absolute', 'inset-0', 'bg-gradient-to-t', 'from-black/80', 'via-transparent', 'to-black/30')} />

        <div className={clsx('relative', 'z-10', 'h-full', 'w-full', 'flex', 'items-center', 'px-6', 'md:px-12', 'py-20')}>
          <div className="w-full">
           
           <h2 className="font-serif font-normal text-[clamp(36px,5vw,52px)] leading-[1.12] tracking-[-0.01em] m-0 mb-6.5 text-[var(--text-primary)]">
           A New Generation Of Real Estate
            </h2>
           <div className={clsx('space-y-6', 'text-white/80', 'max-w-2xl', 'leading-relaxed')}>
              <p className={clsx('text-[16.5px]', 'leading-[1.75]', 'text-[var(--text-secondary)]', 'font-light', 'max-w-[680px]', 'm-0', 'mb-4')}>
                PLT Properties creates more than beautiful projects. We create places designed to make everyday life feel better.
              </p>
              <p className={clsx('text-[16.5px]', 'leading-[1.75]', 'text-[var(--text-secondary)]', 'font-light', 'max-w-[680px]', 'm-0', 'mb-4')}>
                Inspired by the Italian way of living, our developments bring together timeless architecture, natural beauty, considered craftsmanship and genuine hospitality.
              </p>
              <p className={clsx('text-[16.5px]', 'leading-[1.75]', 'text-[var(--text-secondary)]', 'font-light', 'max-w-[680px]', 'm-0', 'mb-4')}>
                Every project begins with a simple question: how can this place improve the way people live? The answer can be found in every detail — from the flow of a home and the quality of its light to the landscapes, experiences and connections that surround it.
              </p>
            </div>

            {/* Credentials */}
            <div className={clsx('relative', 'z-10', 'mt-16')}>
              <div className={clsx('grid', 'grid-cols-2', 'md:grid-cols-4', 'bg-[var(--bg-secondary)]/10', 'border', 'border-[rgba(237,230,216,0.16)]', 'backdrop-blur-[14px]', 'animate-[riseIn_1.1s_cubic-bezier(0.2,0.8,0.2,1)_0.15s_both]')}>
                <div className={clsx('p-4', 'md:p-6.5', 'border-r', 'border-b', 'md:border-b-0', 'border-[rgba(237,230,216,0.16)]', 'flex', 'gap-3', 'md:gap-4', 'items-start', 'transition-background', 'duration-300', 'hover:bg-[rgba(237,230,216,0.045)]')}>
                  <span className={clsx('font-serif', 'italic', 'text-[16px]', 'md:text-[20px]', 'text-[var(--bg-tertiary)]', 'leading-none', 'pt-0.5')}>I</span>
                  <div>
                    <div className={clsx('font-mono', 'text-[9px]', 'md:text-[10px]', 'tracking-[0.16em]', 'uppercase', 'text-[var(--text-secondary)]', 'mb-2')}>Years of Craft</div>
                    <div className={clsx('font-serif', 'text-[18px]', 'md:text-[23px]', 'font-medium', 'text-[var(--text-primary)]')}>20+</div>
                  </div>
                </div>
                <div className={clsx('p-4', 'md:p-6.5', 'border-r-0', 'border-b', 'md:border-b-0', 'border-[rgba(237,230,216,0.16)]', 'flex', 'gap-3', 'md:gap-4', 'items-start', 'transition-background', 'duration-300', 'hover:bg-[rgba(237,230,216,0.045)]')}>
                  <span className={clsx('font-serif', 'italic', 'text-[16px]', 'md:text-[20px]', 'text-[var(--bg-tertiary)]', 'leading-none', 'pt-0.5')}>II</span>
                  <div>
                    <div className={clsx('font-mono', 'text-[9px]', 'md:text-[10px]', 'tracking-[0.16em]', 'uppercase', 'text-[var(--text-secondary)]', 'mb-2')}>DLD Escrow-Backed</div>
                    <div className={clsx('font-serif', 'text-[18px]', 'md:text-[23px]', 'font-medium', 'text-[var(--text-primary)]')}>100%</div>
                  </div>
                </div>
                <div className={clsx('p-4', 'md:p-6.5', 'border-r', 'border-b-0', 'md:border-b', 'border-[rgba(237,230,216,0.16)]', 'flex', 'gap-3', 'md:gap-4', 'items-start', 'transition-background', 'duration-300', 'hover:bg-[rgba(237,230,216,0.045)]')}>
                  <span className={clsx('font-serif', 'italic', 'text-[16px]', 'md:text-[20px]', 'text-[var(--bg-tertiary)]', 'leading-none', 'pt-0.5')}>III</span>
                  <div>
                    <div className={clsx('font-mono', 'text-[9px]', 'md:text-[10px]', 'tracking-[0.16em]', 'uppercase', 'text-[var(--text-secondary)]', 'mb-2')}>Flagship Location</div>
                    <div className={clsx('font-serif', 'text-[18px]', 'md:text-[23px]', 'font-medium', 'text-[var(--text-primary)]')}>Business Bay</div>
                  </div>
                </div>
                <div className={clsx('p-4', 'md:p-6.5', 'border-r-0', 'border-b-0', 'md:border-b', 'border-[rgba(237,230,216,0.16)]', 'flex', 'gap-3', 'md:gap-4', 'items-start', 'transition-background', 'duration-300', 'hover:bg-[rgba(237,230,216,0.045)]')}>
                  <span className={clsx('font-serif', 'italic', 'text-[16px]', 'md:text-[20px]', 'text-[var(--bg-tertiary)]', 'leading-none', 'pt-0.5')}>IV</span>
                  <div>
                    <div className={clsx('font-mono', 'text-[9px]', 'md:text-[10px]', 'tracking-[0.16em]', 'uppercase', 'text-[var(--text-secondary)]', 'mb-2')}>Design Heritage</div>
                    <div className={clsx('font-serif', 'text-[18px]', 'md:text-[23px]', 'font-medium', 'text-[var(--text-primary)]')}>Italian</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={clsx('hidden', 'md:flex', 'absolute', 'bottom-12', 'right-12', 'z-20', 'items-center', 'gap-3')}>
        <div className={clsx('w-12', 'h-px', 'bg-white/30')} />
        <span className={clsx('font-sans', 'text-xs', 'tracking-[0.25em]', 'text-white/60', 'uppercase')}>
          Scroll to explore
        </span>
      </div>
    </section>
  );
}