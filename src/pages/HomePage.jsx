// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import {
  ThaiPaperBackground,
  Section,
  OrnamentalDivider,
  WaveDivider,
  TrustStrip,
  PhotoStrip,
  SoftCard,
} from "../components/layout/Sections";
import SiteHeader from "../components/SiteHeader";
import Hero from "../components/Hero";
import DeliverySection from "../components/DeliverySection";
import MenuSection from "../components/menu/MenuSection";
import FAQSection from "../components/FAQSection";
import TrailerSection from "../components/TrailerSection";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import ScrollToTopButton from "../components/ScrollToTopButton";

import StickyAdaptiveCTA from "../components/cta/StickyAdaptiveCTA";
import FeaturedDishes from "../components/menu/FeaturedDishes";
import UGCFeed from "../components/social/UGCFeed";
import VirtualTour from "../components/sections/VirtualTour";

/* ==================== QuickFeedbackWidget ==================== */
function QuickFeedbackWidget() {
  const EMBED_SRC =
    "https://delightful-desert-0ea5f300f.1.azurestaticapps.net/embed/quickfeedback-noiframe.js";

  useEffect(() => {
    // Load once
    if (!document.querySelector(`script[src="${EMBED_SRC}"]`)) {
      const s = document.createElement("script");
      s.src = EMBED_SRC;
      s.defer = true;
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  // Just render the custom element; React will pass attributes through
  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-3">Quick Feedback</h2>
      <p className="text-sm text-gray-600 mb-4">
        Tell us how we’re doing—your feedback helps us improve every week.
      </p>

      <lll-feedback
        org-id="EF86021F-DDFD-470D-BE07-1357DBA8FBFC"
        prompt-id="37711d27-8279-43ff-ac25-5a45d9eb4bfe"
        api-base="https://rmrlllwebapi.azurewebsites.net"
        mode="inline"
        theme="auto"
        source="web"
      ></lll-feedback>
    </div>
  );
}
/* ================== END QuickFeedbackWidget ================== */

// ====== SEO CONSTANTS (edit domain + address if needed) ======
const SITE_URL = "https://the-mea-thai-cuisine.com"; // TODO: set your real domain
const BUSINESS_NAME = "The Mea Thai Cuisine";
const CITY = "Plymouth";
const STATE = "MA";

function HomePage() {
  const [menuData, setMenuData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [orderLink, setOrderLink] = useState(
    "https://polite-mud-02f9f1a0f.6.azurestaticapps.net"
  );
  const [loading, setLoading] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isOrderingEnabled, setIsOrderingEnabled] = useState(true);
  const [currentDish, setCurrentDish] = useState("");
  const [hoveredDish, setHoveredDish] = useState("");

  const UGC_IMAGES = [
    "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544025168-53eacb06120d?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541542684-4a7a737c43b6?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550507992-eb63ffee0847?q=80&w=1470&auto=format&fit=crop",
  ];

  useEffect(() => {
    axios
      .get(
        "https://rmrthemeaonlineorderingwebapi.azurewebsites.net/api/TCPOSWebMenu"
      )
      .then((res) => {
        const categories = res.data.menuItemCategories || [];
        const structuredMenu = categories
          .filter((cat) => cat.menuItems?.length > 0)
          .map((cat) => ({
            category: cat.categoryName,
            items: cat.menuItems
              .filter((m) => m.item?.active)
              .map((m) => ({
                name: m.item.itemName,
                price: `$${m.item.itemPrice.toFixed(2)}`,
                description: m.item.itemDesc,
                image: m.item.itemImage,
              })),
          }));
        setMenuData(structuredMenu);
        if (structuredMenu.length) setActiveCategory(structuredMenu[0].category);
        setLoading(false);
      })
      .catch((err) => console.error("Failed to load WebMenu:", err));

    axios
      .get(
        "https://rmrthemeaonlineorderingwebapi.azurewebsites.net/api/TCVariable/value/Mea-Online-Ordering-Website-On-Off?name=Mea-Online-Ordering-Website-On-Off"
      )
      .then((res) => {
        const rawValue = res.data?.toString().trim().toLowerCase();
        const isOff =
          rawValue === "off" || rawValue === "0" || rawValue === "false";
        setIsOrderingEnabled(!isOff);
      })
      .catch(() => setIsOrderingEnabled(true));

    axios
      .get(
        "https://rmrthemeaonlineorderingwebapi.azurewebsites.net/api/TCVariable/link"
      )
      .then((res) => setOrderLink(res.data))
      .catch((err) => console.error("Failed to fetch order link:", err));

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToMenu = () =>
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });

  const PatternDivider = () => (
    <div className="w-full h-6 shadow-[0_-15px_20px_-10px_rgba(0,0,0,0.2)] bg-white" />
  );

  // ===== Restaurant Schema (JSON-LD) =====
  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: BUSINESS_NAME,
    servesCuisine: "Thai",
    priceRange: "$$",
    url: SITE_URL,
    telephone: "774-454-7281",
    address: {
      "@type": "PostalAddress",
      streetAddress: "39 Court St",
      addressLocality: CITY,
      addressRegion: STATE,
      postalCode: "02360",
      addressCountry: "US",
    },
    image: [
      // replace with your real image URLs if you want
      `${SITE_URL}/images/hero-main.jpg`,
    ],
    sameAs: [
      "https://www.facebook.com/themeathaicuisine",
      "https://www.instagram.com/themeathaicuisine",
    ],
  };

  return (
    <ThaiPaperBackground>
      {/* ====== SEO META / HEAD ====== */}
      <Helmet>
        <title>
          {BUSINESS_NAME} | Authentic Thai Restaurant in {CITY}, {STATE}
        </title>

        <meta
          name="description"
          content="The Mea Thai Cuisine is an authentic Thai restaurant in Plymouth, MA serving fresh curries, noodles, fried rice, street-food appetizers, and homemade ramen. Dine-in, takeout, and online ordering available."
        />
        <meta
          name="keywords"
          content="Thai restaurant Plymouth MA, Thai food Plymouth, best Thai in Plymouth, ramen Plymouth MA, pad thai Plymouth, curry Plymouth"
        />
        <link rel="canonical" href={SITE_URL} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="restaurant" />
        <meta
          property="og:title"
          content={`${BUSINESS_NAME} | Thai in ${CITY}`}
        />
        <meta
          property="og:description"
          content="Craving Thai in Plymouth, MA? Enjoy curries, noodles, fried rice, and homemade ramen at The Mea Thai Cuisine. Order online or dine in."
        />
        <meta property="og:url" content={SITE_URL} />
        <meta
          property="og:image"
          content={`${SITE_URL}/images/og-mea-thai.jpg`}
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${BUSINESS_NAME} | Thai Restaurant in Plymouth`}
        />
        <meta
          name="twitter:description"
          content="Authentic Thai food in Plymouth, MA — noodles, curries, fried rice, and ramen."
        />
        <meta
          name="twitter:image"
          content={`${SITE_URL}/images/og-mea-thai.jpg`}
        />

        {/* Restaurant Schema */}
        <script type="application/ld+json">
          {JSON.stringify(restaurantSchema)}
        </script>
      </Helmet>

      <SiteHeader
        orderLink={orderLink}
        isOrderingEnabled={isOrderingEnabled}
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
      />

      <Hero onCta={scrollToMenu} />

      <TrustStrip />

      <Section tone="light">
        <DeliverySection />
      </Section>

      {/* ====== SEO TEXT BLOCK: LOCAL KEYWORDS ====== */}
      <Section tone="warm" id="plymouth-thai-restaurant">
        <article className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm p-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Authentic Thai Restaurant in {CITY}, {STATE}
          </h2>
          <p className="text-sm md:text-base text-gray-700 mb-2">
            {BUSINESS_NAME} is a family-owned Thai restaurant located in the
            heart of downtown {CITY}, Massachusetts. We serve classic Thai
            favorites like Pad Thai, Drunken Noodles, crispy spring rolls,
            Panang Curry, and homemade ramen, prepared fresh to order.
          </p>
          <p className="text-sm md:text-base text-gray-700">
            Whether you&apos;re looking for dine-in Thai food in {CITY},{" "}
            takeout after work, or easy online ordering, we&apos;re proud to be
            one of the top-rated Thai restaurants in Plymouth, MA.
          </p>
        </article>
      </Section>

      {/* Existing full Menu */}
      <Section tone="warm" id="menu">
        <MenuSection
          menuData={menuData}
          isMobile={isMobile}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          loading={loading}
          onHoverItem={setHoveredDish}
        />
      </Section>

      <Section tone="light">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm p-6">
            <FAQSection />
          </div>
          <div className="rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm p-6">
            <TrailerSection />
          </div>
        </div>
        <OrnamentalDivider />
      </Section>

      {/* Feedback Widget Section */}
      <Section tone="warm">
        <QuickFeedbackWidget />
      </Section>

      {/* NEW: Serving Nearby Towns with internal links */}
      <Section tone="warm">
        <div className="rounded-2xl bg-white/80 backdrop-blur-sm shadow p-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Serving Plymouth & Nearby Towns
          </h2>
          <p className="text-gray-700 mb-3">
            The Mea Thai Cuisine proudly serves guests from across the South
            Shore. Learn more about our Thai food options near you:
          </p>

          <ul className="grid gap-2 md:grid-cols-2 text-sm md:text-base">
            <li>
              <Link
                to="/thai-restaurant-kingston-ma"
                className="text-red-600 hover:text-red-700 underline"
              >
                Thai restaurant near Kingston, MA
              </Link>
            </li>
            <li>
              <Link
                to="/thai-food-duxbury-ma"
                className="text-red-600 hover:text-red-700 underline"
              >
                Thai food near Duxbury, MA
              </Link>
            </li>
            <li>
              <Link
                to="/thai-restaurant-carver-ma"
                className="text-red-600 hover:text-red-700 underline"
              >
                Thai restaurant near Carver, MA
              </Link>
            </li>
            <li>
              <Link
                to="/thai-takeout-pembroke-ma"
                className="text-red-600 hover:text-red-700 underline"
              >
                Thai takeout near Pembroke, MA
              </Link>
            </li>
            <li>
              <Link
                to="/thai-food-marshfield-ma"
                className="text-red-600 hover:text-red-700 underline"
              >
                Thai food near Marshfield, MA
              </Link>
            </li>
            <li>
              <Link
                to="/thai-restaurant-bourne-ma"
                className="text-red-600 hover:text-red-700 underline"
              >
                Thai restaurant near Bourne, MA
              </Link>
            </li>
            <li>
              <Link
                to="/thai-food-sandwich-ma"
                className="text-red-600 hover:text-red-700 underline"
              >
                Thai food near Sandwich, MA
              </Link>
            </li>
          </ul>
        </div>
      </Section>

      <Section tone="warm">
        <div className="rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm p-6">
          <AboutSection />
        </div>
      </Section>

      <Section tone="light">
        <div className="rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm p-6">
          <ContactSection />
        </div>
      </Section>

      {/* Desktop persistent CTA */}
      {isOrderingEnabled && (
        <a
          href={orderLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-block bg-red-600 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-red-700 transition mb-12"
        >
          Order Online
        </a>
      )}

      {/* Mobile floating CTA */}
      {isOrderingEnabled && (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center md:hidden z-50">
          <a
            href={orderLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:bg-red-700 transition"
          >
            Order Online
          </a>
        </div>
      )}

      {/* Sticky adaptive CTA that reacts to visible dish names */}
      <StickyAdaptiveCTA currentDish={hoveredDish} orderLink={orderLink} />

      <ScrollToTopButton show={showScrollTop} />
    </ThaiPaperBackground>
  );
}

export default HomePage;
