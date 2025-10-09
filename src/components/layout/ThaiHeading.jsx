import React from "react";

export const ThaiDivider = () => (
  <div className="mt-4 flex justify-center">
    <svg width="140" height="12" viewBox="0 0 140 12" fill="none" className="text-red-600">
      <path d="M2 6h136" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path d="M70 1l3 5-3 5-3-5 3-5z" fill="currentColor" />
    </svg>
  </div>
);

const ThaiHeading = ({ children, kicker }) => (
  <div className="mb-8 text-center">
    {kicker && (
      <div className="text-xs tracking-[0.2em] uppercase text-red-600/80 mb-2">{kicker}</div>
    )}
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">{children}</h2>
    <ThaiDivider />
  </div>
);

export default ThaiHeading;
