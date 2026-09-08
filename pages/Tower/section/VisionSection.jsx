"use client";

export default function VisionSection() {
  const scrollToNext = () => {
    const nextSection = document.getElementById('section-gallery');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative w-full h-screen flex items-center justify-center px-6 md:px-12 lg:px-20"
      style={{
        backgroundImage: 'url(https://www.plttower.com/img/h12.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        <div className="flex items-center justify-center mb-6">
          <span className="h-px bg-[var(--tan)] w-16 mr-6 hidden sm:block"></span>
          <p className="font-sans text-sm tracking-[0.25em] font-medium text-[var(--tan)] whitespace-nowrap uppercase">
            Our Vision
          </p>
          <span className="hidden sm:block h-px bg-[var(--tan)] w-16 ml-6"></span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-display tracking-wider mb-8">
          CRAFTING EXCELLENCE
        </h2>
        <div className="bg-[#1a1a1a]/20 backdrop-blur-md p-8 md:p-12 ">
          <p className="text-white text-base leading-relaxed mb-6 font-light paragraph">
            PLT Tower is a new expression of modern luxury. Designed for those who value beauty, balance, and meaning, it brings together Italian architectural excellence and elevated living.
          </p>
          <p className="text-white text-base leading-relaxed font-light paragraph">
            Every detail is intentional—crafted to create a place that feels both iconic and personal. Here, luxury is not excess, but purpose. A space to arrive, belong, and imagine what's next.
          </p>
        </div>
      </div>
    </section>
  );
}
