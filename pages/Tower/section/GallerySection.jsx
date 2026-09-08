"use client";

import { useState } from 'react';

const galleryImages = [
  'https://www.plttower.com/img/sld1.jpg',
  'https://www.plttower.com/img/sld2.jpg',
  'https://www.plttower.com/img/sld3.jpg',
  'https://www.plttower.com/img/sld4.jpg',
  'https://www.plttower.com/img/sld5.jpg',
  'https://www.plttower.com/img/sld6.jpg',
  'https://www.plttower.com/img/sld7.jpg',
  'https://www.plttower.com/img/sld8.jpg',
  'https://www.plttower.com/img/sld9.jpg',
  'https://www.plttower.com/img/sld10.jpg',
  'https://www.plttower.com/img/sld11.jpg',
  'https://www.plttower.com/img/sld12.jpg'
];

export default function GallerySection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section 
      className="relative w-full h-screen flex items-center justify-center px-6 md:px-12 lg:px-20"
      style={{
        backgroundImage: 'url(https://www.plttower.com/img/h2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        <div className="flex items-center justify-center mb-6">
          <span className="h-px bg-[var(--tan)] w-16 mr-6 hidden sm:block"></span>
          <p className="font-sans text-sm tracking-[0.25em] font-medium text-[var(--tan)] whitespace-nowrap uppercase">
            Gallery
          </p>
          <span className="hidden sm:block h-px bg-[var(--tan)] w-16 ml-6"></span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-display tracking-wider mb-8">
          VISUAL JOURNEY
        </h2>
        <div className="bg-[#1a1a1a]/20 backdrop-blur-md p-6 md:p-8 ">
          <p className="text-white text-base leading-relaxed mb-6 font-light paragraph">
            A glimpse into what's coming. Welcome to PLT Tower where design, light, and intention come together.
          </p>
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 text-[var(--tan)] font-medium hover:text-white transition-colors group"
          >
            <span>Discover the gallery</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors"
          >
            ×
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-4 text-white text-4xl hover:text-gray-300 transition-colors"
          >
            ‹
          </button>
          
          <img
            src={galleryImages[currentImageIndex]}
            alt={`Gallery ${currentImageIndex + 1}`}
            className="max-w-full max-h-[80vh] object-contain"
          />
          
          <button
            onClick={nextImage}
            className="absolute right-4 text-white text-4xl hover:text-gray-300 transition-colors"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
