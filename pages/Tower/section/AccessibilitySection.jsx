"use client";

export default function AccessibilitySection() {

  return (
    <section 
      className="relative w-full h-screen flex items-center justify-center px-6 md:px-12 lg:px-20"
      style={{
        backgroundImage: 'url(https://www.plttower.com/img/h11.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        <div className="flex items-center justify-center mb-6">
          <span className="h-px bg-[var(--tan)] w-16 mr-6 hidden sm:block"></span>
          <p className="font-sans text-sm tracking-[0.25em] font-medium text-[var(--tan)] whitespace-nowrap uppercase">
            Accessibility
          </p>
          <span className="hidden sm:block h-px bg-[var(--tan)] w-16 ml-6"></span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-display tracking-wider mb-8">
          EASY CONNECTIVITY
        </h2>
        <div className="bg-[#1a1a1a]/20 backdrop-blur-md p-6 md:p-8 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[var(--tan)] mt-2 flex-shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">Business Bay Metro Station</p>
                <p className="text-white/70 text-sm">approximately 5 minutes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[var(--tan)] mt-2 flex-shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">Sheikh Zayed Road (E11)</p>
                <p className="text-white/70 text-sm">quick access via local connectors</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[var(--tan)] mt-2 flex-shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">Al Khail Road (E44)</p>
                <p className="text-white/70 text-sm">direct connectivity to major hubs</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[var(--tan)] mt-2 flex-shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">Dubai Canal Walk</p>
                <p className="text-white/70 text-sm">immediate access to waterfront</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
