const GRADIENTS = {
  sand: "from-[#d8c9ac] via-[#c4ad86] to-[#8a7a5c]",
  sunset: "from-[#e7b98a] via-[#c98d6b] to-[#5c4436]",
  night: "from-[#0f1a24] via-[#1c2b38] to-[#0a1116]",
  marble: "from-[#e9e6df] via-[#cfccc4] to-[#a9a6a0]",
  dusk: "from-[#3a2f2a] via-[#241c18] to-[#100c0a]",
  ocean: "from-[#4f6d73] via-[#33474d] to-[#151f22]",
  stone: "from-[#c9c2b4] via-[#a9a196] to-[#75706a]",
};

export default function ImagePlaceholder({
  className = "",
  variant = "stone",
  label,
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${GRADIENTS[variant] || GRADIENTS.stone} ${className}`}
    >
      <div className="absolute inset-0 flex items-end p-4">
        {label && (
          <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-white/70">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
