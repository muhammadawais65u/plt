"use client";

import { FileText, Phone, MessageCircle, CreditCard } from "lucide-react";

const ITEMS = [
  {
    label: "Enquire",
    icon: FileText,
    href: "#enquire",
    bg: "bg-[#171717]",
    text: "text-white",
  },
  {
    label: "Call",
    icon: Phone,
    href: "tel:+97140000000",
    bg: "bg-[var(--tan)]",
    text: "text-[#171717]",
  },
  {
    label: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/97140000000",
    bg: "bg-[#171717]",
    text: "text-white",
  },
  {
    label: "Pay Now",
    icon: CreditCard,
    href: "#pay",
    bg: "bg-[#e9e4da]",
    text: "text-[#171717]",
  },
];

export default function FloatingActionBar() {
  return (
    <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col shadow-2xl">
      {ITEMS.map(({ label, icon: Icon, href, bg, text }) => (
        <a
          key={label}
          href={href}
          className={`${bg} ${text} group relative flex items-center justify-center w-14 py-5 transition-all duration-300 hover:w-32`}
        >
          <Icon size={18} strokeWidth={1.75} />
          <span
            className="absolute right-full mr-2 font-sans text-[11px] tracking-[0.12em] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}
