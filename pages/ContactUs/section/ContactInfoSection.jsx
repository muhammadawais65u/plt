"use client";

export default function ContactInfoSection() {
  return (
    <section
      className="w-full bg-[var(--bg-card)] text-white min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 py-10 lg:py-24"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <span className="h-px bg-[var(--tan)] w-16 mr-6 hidden sm:block"></span>
            <p className="font-sans text-sm tracking-[0.25em] font-medium text-[var(--tan)] whitespace-nowrap uppercase">
              Contact Information
            </p>
            <span className="hidden sm:block h-px bg-[var(--tan)] w-16 ml-6"></span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight max-w-4xl mx-auto mb-8 text-[var(--ink)]">
            Get in Touch
          </h2>
          <p className="font-sans text-sm text-white/80 max-w-2xl mx-auto">
            Have questions about PLT Tower? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Office */}
          <div className="text-center">
            <div className="w-16 h-16 bg-[var(--tan)]/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[var(--tan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-display text-xl mb-2">Our Office</h3>
            <p className="font-sans text-sm text-white/70">
              Business Bay, Dubai<br />
              United Arab Emirates
            </p>
          </div>

          {/* Phone */}
          <div className="text-center">
            <div className="w-16 h-16 bg-[var(--tan)]/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[var(--tan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-display text-xl mb-2">Call Us</h3>
            <p className="font-sans text-sm text-white">
              +971 4 XXX XXXX<br />
              Sat-Thu: 9AM - 6PM
            </p>
          </div>

          {/* Email */}
          <div className="text-center">
            <div className="w-16 h-16 bg-[var(--tan)]/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[var(--tan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-display text-xl mb-2">Email Us</h3>
            <p className="font-sans text-sm text-white/70">
              info@pltproperties.com<br />
              enquiries@pltproperties.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
