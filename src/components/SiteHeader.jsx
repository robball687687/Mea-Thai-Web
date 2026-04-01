import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NAV_ITEMS = ["News", "Menu", "FAQ", "Trailer", "About", "Contact"];

const sectionToId = (section) => section.toLowerCase();

export default function SiteHeader({
  orderLink,
  isOrderingEnabled,
  mobileNavOpen,
  setMobileNavOpen,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const goToSection = (section) => {
    const id = sectionToId(section);

    // If already on homepage, scroll normally
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // If on another page, go home first and tell homepage what section to scroll to
    navigate("/", { state: { scrollTo: id } });
  };

  return (
    <header className="w-full bg-black bg-opacity-80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4 py-3">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-xl font-bold text-white text-left hover:text-red-400 transition"
        >
          The Mea Thai Cuisine
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-4 text-white text-sm md:text-base">
          {NAV_ITEMS.map((section) => (
            <button
              key={section}
              type="button"
              onClick={() => goToSection(section)}
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
          type="button"
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
              type="button"
              onClick={() => {
                setMobileNavOpen(false);
                goToSection(section);
              }}
              className="text-lg py-2 hover:text-red-400"
            >
              {section}
            </button>
          ))}

          <button
            type="button"
            onClick={() => {
              setMobileNavOpen(false);
              navigate("/");
            }}
            className="text-lg py-2 hover:text-red-400"
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileNavOpen(false);
              navigate("/food-trailer/schedule");
            }}
            className="text-lg py-2 hover:text-red-400"
          >
            Trailer Schedule
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileNavOpen(false);
              navigate("/food-trailer/request");
            }}
            className="text-lg py-2 hover:text-red-400"
          >
            Request Trailer
          </button>

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
}