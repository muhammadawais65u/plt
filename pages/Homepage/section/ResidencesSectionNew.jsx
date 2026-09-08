"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ImageWithFallback component for robust image handling
function ImageWithFallback(props) {
  const [didError, setDidError] = useState(false);
  const { src, alt, style, className, ...rest } = props;

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=="
          alt="Error loading image"
          {...rest}
          data-original-url={src}
        />
      </div>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      onError={() => setDidError(true)}
    />
  );
}

export function BrandPillarsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const pillars = [
    {
      number: '01',
      title: 'Italian Heritage',
      imageUrl: 'https://images.unsplash.com/photo-1608635661512-52c656e0d4e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJdGFsaWFuJTIwbHV4dXJ5JTIwbWFyYmxlJTIwaW50ZXJpb3IlMjBjcmFmdHNtYW5zaGlwfGVufDF8fHx8MTc4MzMzNDAxNnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      number: '02',
      title: 'Architectural Excellence',
      imageUrl: 'https://images.unsplash.com/photo-1574848296471-28f79a036f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBmYWNhZGUlMjBidWlsZGluZyUyMGV4Y2VsbGVuY2V8ZW58MXx8fHwxNzgzMzM0MDE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      number: '03',
      title: 'Wellness Living',
      imageUrl: 'https://images.unsplash.com/photo-1680609989998-6183fcea718b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWxsbmVzcyUyMHNwYSUyMGludGVyaW9yJTIwbmF0dXJhbCUyMGxpZ2h0fGVufDF8fHx8MTc4MzMzNDAxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      number: '04',
      title: 'Nature Integration',
      imageUrl: 'https://images.unsplash.com/photo-1565599573128-ae3ef5c9f478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGFyY2hpdGVjdHVyZSUyMG5hdHVyZSUyMGludGVncmF0aW9uJTIwZ2FyZGVufGVufDF8fHx8MTc4MzMzNDAxOHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      number: '05',
      title: 'Timeless Luxury',
      imageUrl: 'https://images.unsplash.com/photo-1729809106394-7ceb922b37f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYXJibGUlMjBicmFzcyUyMHRpbWVsZXNzJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzgzMzM0MDE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      number: '06',
      title: 'Investment Confidence',
      imageUrl: 'https://images.unsplash.com/flagged/photo-1559717865-a99cac1c95d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEdWJhaSUyMHNreWxpbmUlMjBpbnZlc3RtZW50JTIwcHJvcGVydHklMjBjaXR5c2NhcGV8ZW58MXx8fHwxNzgzMzM0MDE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      number: '07',
      title: 'Hospitality Mindset',
      imageUrl: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwaG9zcGl0YWxpdHklMjBpbnRlcmlvcnxlbnwxfHx8fDE3ODMzMzQwMTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const SLIDE_DURATION = 4500;

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pillars.length);
      setProgress(0);
    }, SLIDE_DURATION);

    return () => clearInterval(slideTimer);
  }, [pillars.length]);

  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();
    
    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        clearInterval(progressTimer);
      }
    }, 16);

    return () => clearInterval(progressTimer);
  }, [currentIndex]);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'clamp(500px, 85vh, 900px)' }}>
      <div className="absolute top-10 left-8 md:top-12 md:left-12 lg:top-[132px] lg:left-[33px] z-30">
        <h2 className=" text-center font-display text-3xl sm:text-4xl md:text-5xl leading-tight max-w-4xl mx-auto mb-8 text-white">Brand Pillars</h2>
      </div>

      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 lg:bottom-16 lg:right-16 z-30">
        <div className="counter-label">
          {pillars[currentIndex].number} — {pillars.length.toString().padStart(2, '0')}
        </div>
      </div>

      <div className="relative w-full h-full">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
              className="w-full h-full"
            >
              <ImageWithFallback
                src={pillars[currentIndex].imageUrl}
                alt={pillars[currentIndex].title}
                className="w-full h-full object-cover"
                style={{
                  filter: 'saturate(0.85) brightness(0.9)',
                }}
              />
            </motion.div>

            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)',
              }}
            />

            <div className="absolute bottom-24 md:bottom-32 lg:bottom-40 left-8 md:left-12 lg:left-16 right-8 md:right-12">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-white display-title max-w-[900px]"
              >
                {pillars[currentIndex].title}
              </motion.h1>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 md:hidden flex gap-1.5 z-30">
        {pillars.map((_, idx) => (
          <div
            key={idx}
            className="w-1 h-1 transition-all duration-300"
            style={{
              backgroundColor: currentIndex === idx ? 'var(--bg-secondary)' : 'rgba(255, 255, 255, 0.3)',
              width: currentIndex === idx ? '16px' : '4px',
            }}
          />
        ))}
      </div>
    </div>
  );
}

const dnaCards = [
  {
    title: "Business Bay",
    subtitle: "Dubai's most dynamic professional address",
    image: "/images/business-bay.jpg",
  },
  {
    title: "Downtown Dubai",
    subtitle: "Where the city's pulse is at its strongest",
    image: "/images/downtown-dubai.jpg",
  },
  {
    title: "Dubai Canal",
    subtitle: "A new waterfront chapter in the city's story",
    image: null, // no image supplied — renders as a dark placeholder card
  },
];

export default function BrandDNA() {
  return (
    <section className="w-full bg-[var(--bg-surface)] py-10 lg:py-24 px-6 md:px-10  mx-auto">
      {/* Heading */}
      <div className="mb-10">
        <h2 className="font-serif text-4xl md:text-5xl text-[var(--decorative-line)] tracking-tight">
          Brand DNA
        </h2>
        <div className="mt-3 flex gap-1.5">
          <span className="h-[3px] w-6 bg-[var(--decorative-line)]/30" />
          <span className="h-[3px] w-6 bg-[var(--decorative-line)]/30" />
          <span className="h-[3px] w-6 bg-[var(--decorative-line)]/20" />
          <span className="h-[3px] w-6 bg-[var(--decorative-line)]/10" />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
        {dnaCards.map((card) => (
          <div
            key={card.title}
            className="group relative h-[480px]  overflow-hidden bg-[var(--bg-dark-card)]"
          >
            {card.image ? (
              <>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 39vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={false}
                />
                {/* Gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              </>
            ) : (
              // Placeholder state (e.g. image pending / broken)
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-dark-overlay)]">
                <svg
                  className="h-6 w-6 text-[var(--decorative-blue)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
            )}

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-serif text-xl md:text-2xl text-white">
                {card.title}
              </h3>
              <p className="mt-1 text-sm text-white/70 max-w-xs">
                {card.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
