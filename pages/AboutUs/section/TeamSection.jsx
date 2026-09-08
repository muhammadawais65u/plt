"use client";

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function TeamSection() {
  const team = [
    {
      name: "Ahmed Al-Rashid",
      role: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=320"
    },
    {
      name: "Sarah Mitchell",
      role: "Chief Operations Officer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=320"
    },
    {
      name: "Michael Chen",
      role: "Chief Financial Officer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=320"
    },
    {
      name: "Emily Rodriguez",
      role: "Chief Marketing Officer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=320"
    },
    {
      name: "David Thompson",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=320"
    },
    {
      name: "Lisa Anderson",
      role: "Director of Design",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=320"
    },
    {
      name: "James Wilson",
      role: "Head of Sales",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=320"
    },
    {
      name: "Anna Martinez",
      role: "Director of Operations",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=320"
    }
  ];

  return (
    <section className="w-full bg-[var(--bg-section)] min-h-screen relative overflow-hidden border-r border-[rgba(255,255,255,0.1)]">
      <div className="w-full mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-32 ">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-[var(--accent-cream)] mb-8">
            Meet Our Visionaries
          </h2>
          <div className="w-20 h-1 bg-[var(--accent-brown)] mx-auto" />
         
        </div>

        {/* Team Swiper */}
        <div className="w-full mx-auto">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="team-swiper"
          >
            {team.map((member, index) => (
              <SwiperSlide key={index}>
                <div className="group flex flex-col items-center gap-6 bg-[var(--bg-mission)] p-6 rounded-2xl hover:shadow-2xl transition-all duration-500 border border-[rgba(243,239,230,0.16)] hover:border-[var(--accent-brown-light)]/50 h-full">
                  {/* Image */}
                  <div className="relative w-64 h-56 overflow-hidden rounded-xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center w-full">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-[var(--accent-brown-light)]/15 text-[var(--accent-brown-light)] text-xs tracking-widest uppercase rounded-full mb-3">
                        {member.role}
                      </span>
                      <h3 className="font-display text-2xl md:text-3xl text-[var(--accent-cream)] mb-2">{member.name}</h3>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

