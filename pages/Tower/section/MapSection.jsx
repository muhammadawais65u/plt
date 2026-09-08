"use client";

export default function MapSection() {
  return (
    <section className="relative w-full h-screen flex flex-col">
      <div className="absolute top-[20%] left-[80px] z-10 text-black text-left  p-4 bg-[#1a1a1a]/20 backdrop-blur-md ">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-wider">
          PROJECT LOCATION
        </h2>
      </div>
      <div className="w-full h-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.5855856789!2d55.2718!3d25.185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDExJzA2LjAiTiA1NcKwMTYnMTguNSJF!5e0!3m2!1sen!2sae!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
