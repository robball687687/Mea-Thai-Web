import React from "react";

const ThaiSection = ({ id, children, className = "" }) => (
  <section id={id} className={`relative w-full ${className}`}>
    {/* subtle silk pattern */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_1.5px)] [background-size:16px_16px]"
    />
    <div className="relative max-w-5xl mx-auto px-4 py-16">{children}</div>
  </section>
);

export default ThaiSection;
