"use client";

export default function ContactSection() {
  return (
    <section className="w-full bg-[var(--bg-section)] min-h-screen relative overflow-hidden flex items-center justify-center">
      <div className="w-full mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-32 ">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-[var(--accent-gold-light)] mb-6 uppercase">
            Get In Touch
          </p>
          <h2 className="font-serif font-normal text-[clamp(36px,5vw,52px)] leading-[1.12] tracking-[-0.01em] m-0 mb-6.5 text-[var(--text-primary)]">
            Let's Build Something Great Together
          </h2>
          <div className="w-20 h-1 bg-[var(--accent-brown)] mx-auto mb-8" />
         
        </div>

        {/* Contact Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 border border-[var(--decorative-divider)] bg-[rgba(255,255,255,0.02)] backdrop-blur-[2px] mx-auto">
          {/* Office */}
          <div className="p-[44px_40px] border-r border-b border-[var(--decorative-divider)] hover:bg-[rgba(199,164,107,0.06)] transition-all text-center">
            <div className="w-[44px] h-[44px] border border-[var(--accent-gold-medium)] rounded-full flex items-center justify-center text-[var(--accent-gold-light)] mb-[26px] mx-auto">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-[19px] h-[19px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-serif text-[22px] font-medium tracking-[-0.01em] text-[var(--accent-cream)] mb-3">Our Office</h3>
            <p className="text-[14.5px] leading-[1.75] text-[var(--accent-cream)]">
              Business Bay, Dubai<br />
              United Arab Emirates
            </p>
          </div>

          {/* Phone */}
          <div className="p-[44px_40px] border-r border-b border-[var(--decorative-divider)] hover:bg-[rgba(199,164,107,0.06)] transition-all text-center">
            <div className="w-[44px] h-[44px] border border-[var(--accent-gold-medium)] rounded-full flex items-center justify-center text-[var(--accent-gold-light)] mb-[26px] mx-auto">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-[19px] h-[19px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-serif text-[22px] font-medium tracking-[-0.01em] text-[var(--accent-cream)] mb-3">Call Us</h3>
            <p className="text-[14.5px] leading-[1.75] text-[var(--accent-cream)]">
              +971 4 XXX XXXX<br />
              Sat-Thu: 9AM - 6PM
            </p>
          </div>

          {/* Email */}
          <div className="p-[44px_40px] border-b border-[var(--decorative-divider)] hover:bg-[rgba(199,164,107,0.06)] transition-all text-center">
            <div className="w-[44px] h-[44px] border border-[var(--accent-gold-medium)] rounded-full flex items-center justify-center text-[var(--accent-gold-light)] mb-[26px] mx-auto">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-[19px] h-[19px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-serif text-[22px] font-medium tracking-[-0.01em] text-[var(--accent-cream)] mb-3">Email Us</h3>
            <p className="text-[14.5px] leading-[1.75] text-[var(--accent-cream)]">
              info@pltproperties.com<br />
              enquiries@pltproperties.com
            </p>
          </div>
        </div>

        {/* CTA Button */}
      
      </div>
    </section>
  );
}
