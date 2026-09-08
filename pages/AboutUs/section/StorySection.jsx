"use client";

export default function StorySection() {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 min-h-screen">
      {/* LEFT: dark panel */}
      <div className="relative bg-[#181410] overflow-hidden px-8 py-16 md:px-16 md:py-24 flex flex-col justify-center">
        {/* decorative faint circles */}
        <div className="pointer-events-none absolute -top-24 right-0 w-96 h-96 rounded-full border border-white/5"></div>
        <div className="pointer-events-none absolute bottom-0 left-1/3 w-72 h-72 rounded-full border border-white/5"></div>

        <div className="relative w-full max-w-lg">
          <p className="text-[#c8935a] text-xs font-semibold tracking-[0.2em] mb-6">WHO WE ARE</p>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl leading-tight text-[#f2ede4] mb-8">
            European craftsmanship,
            <span className="italic text-[#c8935a] font-medium">carried</span>
            into the heart of Dubai
          </h2>

          <p className="text-[#9c9790] text-base leading-relaxed mb-10 max-w-md">
            Good design is not an event — it is patience. At PLT, every material is chosen for its longevity, not its spectacle. We draw on a European tradition of considered making: the belief that a home should age into something better than it was on the day it was handed over.
          </p>

          <a href="#" className="inline-flex items-center gap-2 text-[#c8935a] text-sm font-semibold tracking-wide hover:gap-3 transition-all">
            Our Story
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* RIGHT: stats grid */}
      <div className="bg-[#efeae1] px-8 py-16 md:px-16 md:py-24 flex items-center">
        <div className="w-full grid grid-cols-2 border border-[#dcd5c8]">
          {/* 15+ Years */}
          <div className="p-8 md:p-10 border-b border-r border-[#dcd5c8]">
            <div className="w-11 h-11 rounded-full border border-[#c8935a] flex items-center justify-center mb-6 text-[#c8935a]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="font-serif text-3xl text-[#1c1a17] mb-2">20+</p>
            <p className="text-[11px] tracking-[0.15em] font-semibold text-[#84796a]">YEARS OF CRAFT</p>
          </div>

          {/* 100% escrow */}
          <div className="p-8 md:p-10 border-b border-[#dcd5c8]">
            <div className="w-11 h-11 rounded-full border border-[#c8935a] flex items-center justify-center mb-6 text-[#c8935a]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="font-serif text-3xl text-[#1c1a17] mb-2">100%</p>
            <p className="text-[11px] tracking-[0.15em] font-semibold text-[#84796a]">DLD ESCROW-BACKED</p>
          </div>

          {/* Business Bay */}
          <div className="p-8 md:p-10 border-r border-[#dcd5c8]">
            <div className="w-11 h-11 rounded-full border border-[#c8935a] flex items-center justify-center mb-6 text-[#c8935a]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="font-serif text-2xl md:text-3xl text-[#1c1a17] mb-2">Business Bay</p>
            <p className="text-[11px] tracking-[0.15em] font-semibold text-[#84796a]">FLAGSHIP LOCATION</p>
          </div>

          {/* European heritage */}
          <div className="p-8 md:p-10">
            <div className="w-11 h-11 rounded-full border border-[#c8935a] flex items-center justify-center mb-6 text-[#c8935a]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M4 21V7l8-4 8 4v14M9 21v-6h6v6" />
              </svg>
            </div>
            <p className="font-serif text-2xl md:text-3xl text-[#1c1a17] mb-2">European</p>
            <p className="text-[11px] tracking-[0.15em] font-semibold text-[#84796a]">DESIGN HERITAGE</p>
          </div>
        </div>
      </div>
    </section>
  );
}
