"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SectionNavigation({ currentIndex, totalSections, onPrevious, onNext }) {
  return (
    <div className="fixed bottom-6 right-6 z-[1100] flex items-center gap-3">
      <button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="w-12 h-12 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-black/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous section"
      >
        <ChevronLeft size={20} />
      </button>
      
      <button
        onClick={onNext}
        disabled={currentIndex === totalSections - 1}
        className="w-12 h-12 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-black/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next section"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
