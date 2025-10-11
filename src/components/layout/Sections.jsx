import React from "react";
import { motion } from "framer-motion";

/** Subtle rice-paper + warm gradient page background */



export const ThaiPaperBackground = ({ children }) => {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'>
      <g fill='none' stroke='%23e7e2d9' stroke-width='0.7' opacity='0.5'>
        <path d='M70 10c10 8 10 22 0 30c-10-8-10-22 0-30z'/>
        <path d='M20 70c8 10 22 10 30 0c-8-10-22-10-30 0z'/>
        <path d='M120 70c-8-10-22-10-30 0c8 10 22 10 30 0z'/>
        <circle cx='70' cy='70' r='0.8'/>
      </g>
    </svg>
  `.trim();

  return (
    <div
      className="min-h-screen text-black flex flex-col items-center relative"
      style={{
        backgroundImage: `
          radial-gradient(1200px 600px at 50% -200px, rgba(248, 113, 113, 0.06), transparent 60%),
          linear-gradient(180deg, #ffffff 0%, #fffdf8 100%),
          url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")
        `,
        backgroundRepeat: "repeat",
        backgroundSize: "auto, auto, 140px 140px",
      }}
    >
      {children}
    </div>
  );
};

/** Alternating section background with built-in fade-in */
/** Alternating section with built-in rice-paper background + fade-in */
export const Section = ({ children, tone = "light", id, className = "" }) => {
  // reuse the same rice-paper SVG pattern
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'>
      <g fill='none' stroke='%23e7e2d9' stroke-width='0.7' opacity='0.5'>
        <path d='M70 10c10 8 10 22 0 30c-10-8-10-22 0-30z'/>
        <path d='M20 70c8 10 22 10 30 0c-8-10-22-10-30 0z'/>
        <path d='M120 70c-8-10-22-10-30 0c8 10 22 10 30 0z'/>
        <circle cx='70' cy='70' r='0.8'/>
      </g>
    </svg>
  `.trim();

  // gentle per-section tone; warm is just a hair richer
  const tones = {
    light: { from: "#ffffff", to: "#fffdf8", tint: "rgba(248,113,113,0.04)" }, // tailwind red-500 @ 4%
    warm:  { from: "#fffaf2", to: "#fff6e8", tint: "rgba(248,113,113,0.05)" },
  };
  const t = tones[tone] ?? tones.light;

  return (
    <section
      id={id}
      className="w-full py-12 md:py-16"
      style={{
        // top glow + soft tone gradient + rice paper pattern
        backgroundImage: `
          radial-gradient(800px 400px at 50% 0px, ${t.tint}, transparent 60%),
          linear-gradient(180deg, ${t.from} 0%, ${t.to} 100%),
          url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")
        `,
        backgroundRepeat: "no-repeat, no-repeat, repeat",
        backgroundSize: "100% 100%, 100% 100%, 140px 140px",
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={className}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};


/** Thin ornamental divider (use between sections/blocks) */
export const OrnamentalDivider = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="flex items-center justify-center gap-3 my-8 opacity-70"
  >
    <span className="h-px w-12 bg-neutral-300" />
    <span className="text-sm tracking-[0.25em]">🌶️ 🍃 🌶️</span>
    <span className="h-px w-12 bg-neutral-300" />
  </motion.div>
);

/** Wave divider to transition out of hero */
export const WaveDivider = () => (
  <svg className="w-full h-16 text-red-600" viewBox="0 0 1440 100" preserveAspectRatio="none">
    <path fill="currentColor" d="M0,0 L60,5 C240,21 600,32 720,26 C960,11 1320,11 1440,21 L1440,100 L0,100 Z" />
  </svg>
);

// ============================================
// Soft white fade between video and page
// ============================================
export const VideoFadeDivider = () => (
  <div
    className="relative w-full h-24 md:h-32 pointer-events-none"
    style={{
      background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #ffffff 100%)",
      marginTop: "-2px", // small overlap to hide any thin line
    }}
  />
);


/** Trust strip: hours / address / delivery badges */
export const TrustStrip = () => {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon, ... 6=Sat

  const isFriOrSat = day === 5 || day === 6;
  const todayHours = isFriOrSat
    ? "11:30 AM – 9:30 PM"
    : day === 0
    ? "Closed Sunday"
    : "11:30 AM – 9:00 PM";

  return (
    <div className="w-full bg-white/80 backdrop-blur-sm border-y">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-6 text-sm md:text-base">
        <div className="flex items-center gap-2">
          <span>🕒</span>
          <span>
            <strong>Today:</strong> {todayHours}
            {day !== 0 && " • Closed 3–4 PM for lunch break"}
          </span>
        </div>

        <div className="hidden md:block w-px h-4 bg-neutral-300" />

        <div className="flex items-center gap-2">
          <span>📍</span>
          <span>60 Court St, Plymouth, MA</span>
        </div>

        <div className="hidden md:block w-px h-4 bg-neutral-300" />

        <div className="flex items-center gap-2">
          <span>📞</span>
          <a href="tel:+19787633044" className="font-medium hover:underline">
            (978) 763-3044
          </a>
        </div>

        
      </div>
    </div>
  );
};

/** Horizontal photo scroller for food shots */
export const PhotoStrip = ({ images = [] }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="overflow-x-auto py-4 w-full"
  >
    <div className="flex gap-4 min-w-max px-4 max-w-6xl mx-auto">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className="h-28 md:h-36 rounded-xl object-cover shadow-sm"
          loading="lazy"
        />
      ))}
    </div>
  </motion.div>
);

/** Fade-in card wrapper for text-heavy blocks */
export const SoftCard = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px 0px -60px 0px" }}
    transition={{ duration: 0.45 }}
    className={`rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm p-6 ${className}`}
  >
    {children}
  </motion.div>
);
