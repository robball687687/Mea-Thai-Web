import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const spiceColors = ["#9ca3af", "#22c55e", "#f59e0b", "#ef4444"]; // mild -> extra hot

export default function MenuItemCard({ item, onObserve }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!onObserve) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && onObserve(item.name)),
      { threshold: 0.6 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [item?.name, onObserve]);

  const price =
    typeof item.price === "number"
      ? item.price
      : parseFloat(String(item.price || "0").replace(/[^0-9.]/g, "")) || 0;

  const spice = item.spice ?? 2;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative rounded-2xl bg-white shadow-sm overflow-hidden border hover:shadow-md transition"
    >
      <div className="aspect-[4/3] overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-neutral-100" />
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          {item.isNew && (
            <span className="text-[10px] uppercase tracking-wide bg-red-100 text-red-700 px-2 py-0.5 rounded-full">New</span>
          )}
        </div>
        {item.description && (
          <p className="text-sm text-neutral-600 line-clamp-2 mt-1">{item.description}</p>
        )}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1">
            {[...Array(spice)].map((_, i) => (
              <span
                key={i}
                className="inline-block w-2.5 h-2.5 rounded-sm"
                style={{ background: spiceColors[Math.min(i + 1, spiceColors.length - 1)] }}
              />
            ))}
            <span className="ml-2 text-xs text-neutral-500">Spice</span>
          </div>
          <div className="font-semibold">${price.toFixed(2)}</div>
        </div>
      </div>

      {/* Hover reveal actions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition" />
      <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
        <button className="pointer-events-auto flex-1 bg-white text-red-600 font-semibold px-3 py-2 rounded-xl shadow hover:bg-red-50">
          Add to Order
        </button>
        <button className="pointer-events-auto px-3 py-2 rounded-xl bg-white/90 backdrop-blur hover:bg-white">
          Details
        </button>
      </div>
    </motion.div>
  );
}
