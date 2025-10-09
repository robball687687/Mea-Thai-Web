import React from "react";

const ScrollToTopButton = ({ show }) =>
  show ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-20 right-4 z-50 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition"
      title="Back to Top"
    >
      ↑
    </button>
  ) : null;

export default ScrollToTopButton;
