"use client";



import { useState } from "react";

import { ChevronDown } from "lucide-react";



const PILLARS = [

  {

    label: "Italian <br /> Elegance",

    text: "A design culture shaped by proportion, beauty and an appreciation for the art of living well.",

  },

  {

    label: "Architectural <br /> Excellence",

    text: "Distinctive architecture where every detail has a purpose and every element contributes to the whole.",

  },

  {

    label: "Inspired by <br /> Nature",

    text: "Natural light, landscaping and outdoor spaces are integrated into our projects to support balance and wellbeing.",

  },

  {

    label: "Timeless <br /> Design",

    text: "Spaces conceived to endure — designed beyond trends, with materials and forms that age gracefully.",

  },

  {

    label: "Investment <br /> Confidence",

    text: "DLD escrow-backed developments delivered with transparency, discipline and long-term value in mind.",

  },

  {

    label: "Premium <br /> Experience",

    text: "Genuine hospitality and considered services that make everyday living feel effortless and refined.",

  },

];



function PillarBoxes() {

  const [openIndex, setOpenIndex] = useState(null);



  return (

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 animate-[riseIn_1.1s_cubic-bezier(0.2,0.8,0.2,1)_0.15s_both]">

      {PILLARS.map((pillar, index) => (

        <div key={index} className="flex flex-col">

          <button

            type="button"

            onClick={() => setOpenIndex(openIndex === index ? null : index)}

            className="flex flex-col items-center justify-start gap-2 px-3 py-5 bg-[var(--bg-secondary)]/10 border border-[rgba(237,230,216,0.16)] backdrop-blur-[14px] transition-colors duration-300 hover:bg-[rgba(237,230,216,0.12)] active:bg-[rgba(237,230,216,0.12)] cursor-pointer"

          >

            <span className="font-sans text-[11px] md:text-[12px] tracking-[0.16em] uppercase text-[var(--text-primary)] leading-snug" dangerouslySetInnerHTML={{ __html: pillar.label }} />

            <ChevronDown

              size={14}

              className={`text-[var(--bg-tertiary)] transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}

            />

          </button>

          <div

            className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-40 mt-2" : "max-h-0"}`}

          >

            <p className="m-0 p-3 bg-[rgba(237,230,216,0.08)] border border-[rgba(237,230,216,0.16)] backdrop-blur-[14px] text-[12px] leading-loose text-[var(--text-secondary)]">

              {pillar.text}

            </p>

          </div>

        </div>

      ))}

    </div>

  );

}



export default function IntroSection3() {

  return (

    <div className="relative h-full w-full flex flex-col">

      {/* Background Image with Gradients */}

      <div className="absolute inset-0 z-0">

        <div

          className="absolute inset-0"

          style={{

            backgroundImage: `

              linear-gradient(100deg, rgba(20,17,14,0.94) 8%, rgba(20,17,14,0.72) 34%, rgba(20,17,14,0.30) 62%, rgba(20,17,14,0.55) 100%),

              linear-gradient(to top, rgba(20,17,14,0.85) 0%, rgba(20,17,14,0.05) 38%),

              url('/images/home-slider/imgslide3.jpg')

            `,

            backgroundSize: 'cover',

            backgroundPosition: 'center 62%'

          }}

        />

        {/* Vignette */}

        <div className="absolute inset-0 shadow-[inset_0_0_160px_rgba(0,0,0,0.55)]" />

      </div>



      {/* Hero Content */}

      <div className="relative z-10 flex-1 flex items-start flex-col justify-center px-6 md:px-12 py-28">

        <div className="w-full py-4 animate-[riseIn_1s_cubic-bezier(0.2,0.8,0.2,1)_both]  mx-auto">

          {/* Headline */}

          <h2 className="font-serif font-normal text-[clamp(36px,5vw,52px)] leading-[1.12] tracking-[-0.01em] m-0 mb-6.5 text-[var(--text-primary)]">

            A beautiful place is only <span className="font-medium text-[var(--bg-tertiary)]">the beginning</span>

          </h2>



          {/* Description */}

          <p className="text-[16.5px] leading-[1.75] text-[var(--text-secondary)] font-light max-w-[680px] m-0 mb-9.5">

            At PLT Properties, luxury is not measured by excess. It is measured by experience and by the quality of life.

          </p>

        </div>

      <div className="relative z-10  mt-20 pb-10">

        <PillarBoxes />

      </div>

      </div>



      {/* Pillars */}



      <style jsx>{`

        @keyframes riseIn {

          from { opacity: 0; transform: translateY(18px); }

          to { opacity: 1; transform: translateY(0); }

        }

      `}</style>

    </div>

  );

}

