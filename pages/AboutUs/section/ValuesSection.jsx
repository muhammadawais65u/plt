"use client";

export default function ValuesSection() {
  const values = [
    {
      roman: "I",
      title: "Integrity",
      description: "We conduct our business with honesty, transparency, and ethical practices in every dealing — with clients, partners, and each other.",
      tag: "Trust is the first deliverable."
    },
    {
      roman: "II",
      title: "Excellence",
      description: "We strive for perfection in every aspect of our work, from the first design sketch through to final delivery on site.",
      tag: "Good enough never is."
    },
    {
      roman: "III",
      title: "Innovation",
      description: "We continuously push boundaries and embrace new ideas, materials, and methods to create genuinely exceptional spaces.",
      tag: "Built for what's next, not what's now."
    }
  ];

  return (
    <section className="w-full bg-[var(--bg-section)] min-h-screen flex items-center justify-center px-12 py-28 border-r border-[rgba(255,255,255,0.1)]">
      <div className="w-full  mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mt-14 max-w-[700px] mx-auto">
         
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.15] tracking-[-0.01em] text-[var(--accent-cream)] mb-6">
            What We <span className=" font-light text-[var(--accent-brown-light)]">Stand</span> For
          </h2>
          <p className="text-[15px] leading-[1.75] text-[var(--text-muted)]">
            The principles that shape every decision we make, from the first blueprint to the final handover.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className="group relative p-4 border border-[rgba(243,239,230,0.12)] hover:border-[var(--accent-brown-light)]/40 transition-all duration-500"
            >
              {/* Roman Numeral */}
              <span className="font-serif italic font-light text-[48px] text-[var(--bg-secondary)] group-hover:text-[var(--bg-secondary)] transition-colors mb-4 block">
                {value.roman}
              </span>
              
              {/* Title */}
              <h3 className="font-serif text-[24px] font-medium tracking-[-0.01em] text-[var(--accent-cream)] mb-4">
                {value.title}
              </h3>
              
              {/* Description */}
              <p className="text-[14px] leading-[1.75] text-[var(--text-muted)] mb-6">
                {value.description}
              </p>
              
              {/* Tag */}
              <div className="pt-4 border-t border-[rgba(243,239,230,0.12)]">
                <span className="inline-block font-serif italic font-light text-[12px] text-[var(--accent-brown-light)]">
                  {value.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
}
 