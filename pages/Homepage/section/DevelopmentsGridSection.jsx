"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { projectApi, getImageUrl } from "@/lib/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function DevelopmentsGridSection() {
  const [developments, setDevelopments] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectApi.getAll({ publication_status: "published" });
        if (response?.data?.length > 0) {
          // High Demand badge wala featured section me dikhta hai, baki yahan
          const rest = response.data.filter((p) => p.badge !== "High Demand");
          if (rest.length > 0) {
            setDevelopments(rest);
          }
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  if (developments.length === 0) {
    return null;
  }

  return (
    <section id="developments-grid" className="w-full bg-[var(--bg-section)] min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 py-16 md:py-28">
      <div className="w-full mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-[clamp(32px,4vw,40px)] text-[var(--text-dark)] mb-4">Our Developments</h2>
          <p className="text-[14px] leading-[1.7] text-[var(--text-dark-muted)] max-w-2xl mx-auto">
            Discover our portfolio of thoughtfully designed residences across Dubai's most sought-after locations, each crafted with European precision and contemporary elegance.
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 24 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{
              el: '.swiper-pagination',
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="pb-12"
          >
          {developments.map((dev, index) => (
            <SwiperSlide key={dev.id || index}>
              <div className="bg-[var(--bg-light)] border border-[rgba(33,29,23,0.10)] h-full">
                {/* Card Visual */}
                <div className="relative h-[300px] overflow-hidden border-b border-[rgba(33,29,23,0.10)]">
                  {dev.image && (
                    <Image
                      src={getImageUrl(dev.image)}
                      alt={dev.imageAlt || dev.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  )}
                  {(dev.badge || dev.status) && (
                    <span className="absolute top-4 left-4 text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 bg-[var(--text-dark)] text-[var(--bg-light)] z-20">
                      {dev.badge || dev.status}
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="px-5 md:px-7 py-4 pb-4">
                  <h3 className="font-serif text-[clamp(18px,2.5vw,22px)] text-[var(--text-dark)] mb-1.5">{dev.title}</h3>
                  <p className="text-[11.5px] tracking-widest uppercase text-[var(--text-dark-light)] mb-4.5">{dev.location}</p>
                  <a
                    href={dev.primaryButtonLink || "#"}
                    className="text-[12.5px] font-semibold tracking-widest text-[var(--text-brown)] inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
                  >
                    View details
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 rounded-full hidden md:flex items-center justify-center cursor-pointer hover:bg-[var(--bg-light)] transition-colors shadow-lg" />
        <div className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 rounded-full hidden md:flex items-center justify-center cursor-pointer hover:bg-[#F7F4EC] transition-colors shadow-lg" />

        {/* Pagination positioned at bottom of slider (bottom of images) */}
        <div className="swiper-pagination absolute bottom-0 md:bottom-4 left-1/2 -translate-x-1/2 z-20" />
        </div>
      </div>
    </section>
  );
}
