import React from "react";

const NAV_ITEMS = ["News", "Menu", "FAQ", "Trailer", "About", "Contact"];

const SiteHeader = ({
  orderLink,
  isOrderingEnabled,
  mobileNavOpen,
  setMobileNavOpen,
}) => (
  <header className="w-full bg-black bg-opacity-80 backdrop-blur sticky top-0 z-50">
    <div className="max-w-5xl mx-auto flex justify-between items-center px-4 py-3">
      <h1 className="text-xl font-bold text-white">The Mea Thai Cuisine</h1>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-4 text-white text-sm md:text-base">
        {NAV_ITEMS.map((section) => (
          <button
            key={section}
            onClick={() =>
              document
                .getElementById(section.toLowerCase())
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:text-red-400 transition"
          >
            {section}
          </button>
        ))}
      </nav>

      {isOrderingEnabled && (
        <a
          href={orderLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-block bg-red-600 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-red-700 transition"
        >
          Order Online
        </a>
      )}

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-white"
        onClick={() => setMobileNavOpen((p) => !p)}
        aria-label="Toggle navigation"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              mobileNavOpen
                ? "M6 18L18 6M6 6l12 12"
                : "M4 6h16M4 12h16M4 18h16"
            }
          />
        </svg>
      </button>
    </div>

    {/* Mobile Nav */}
    {mobileNavOpen && (
      <div className="md:hidden bg-black text-white flex flex-col items-center gap-2 py-4 transition-all duration-300 ease-in-out z-40">
        {NAV_ITEMS.map((section) => (
          <button
            key={section}
            onClick={() => {
              setMobileNavOpen(false);
              document
                .getElementById(section.toLowerCase())
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-lg py-2 hover:text-red-400"
          >
            {section}
          </button>
        ))}

        {isOrderingEnabled && (
          <a
            href={orderLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 bg-red-600 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-red-700 transition"
          >
            Order Online
          </a>
        )}
      </div>
    )}
  </header>
);

export default SiteHeader;
