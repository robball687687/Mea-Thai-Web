// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";

import {
  ThaiPaperBackground,
  Section,
  OrnamentalDivider,
  TrustStrip,
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
import NewsSection from "../components/NewsSection";

/* ==================== QuickFeedbackWidget ==================== */
function QuickFeedbackWidget() {
  const EMBED_SRC =
    "https://delightful-desert-0ea5f300f.1.azurestaticapps.net/embed/quickfeedback-noiframe.js";

  useEffect(() => {
    if (!document.querySelector(`script[src="${EMBED_SRC}"]`)) {
      const s = document.createElement("script");
      s.src = EMBED_SRC;
      s.defer = true;
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

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

// ====== SEO CONSTANTS ======
const SITE_URL = "https://the-mea-thai-cuisine.com";
const BUSINESS_NAME = "The Mea Thai Cuisine";
const CITY = "Plymouth";
const STATE = "MA";

const FALLBACK_IMAGE =
  "https://rmrstorage.blob.core.windows.net/measite/MeaLogoBlackTrans.png";

function getBestImage(item) {
  if (item?.imageUrl) return item.imageUrl;

  if (Array.isArray(item?.images) && item.images.length > 0) {
    const primaryActive = item.images.find((img) => img?.isPrimary && img?.active);
    if (primaryActive?.imageUrl) return primaryActive.imageUrl;

    const firstActive = item.images.find((img) => img?.active);
    if (firstActive?.imageUrl) return firstActive.imageUrl;

    const firstAny = item.images.find((img) => img?.imageUrl);
    if (firstAny?.imageUrl) return firstAny.imageUrl;
  }

  return FALLBACK_IMAGE;
}

function groupMenuItems(items) {
  const grouped = new Map();

  items.forEach((item) => {
    if (!item?.isActive) return;

    const categoryName = item.categoryName || "Other";
    const categorySortOrder = item.categorySortOrder ?? 9999;

    if (!grouped.has(categoryName)) {
      grouped.set(categoryName, {
        categoryName,
        categorySortOrder,
        items: [],
      });
    }

    grouped.get(categoryName).items.push({
      ...item,
      displayImage: getBestImage(item),
    });
  });

  return Array.from(grouped.values())
    .map((section) => ({
      ...section,
      items: [...section.items].sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      ),
    }))
    .sort((a, b) => a.categorySortOrder - b.categorySortOrder);
}

function HomePage() {
  const location = useLocation();

  const [menuSections, setMenuSections] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [orderLink, setOrderLink] = useState(
    "https://polite-mud-02f9f1a0f.6.azurestaticapps.net"
  );
  const [loading, setLoading] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isOrderingEnabled, setIsOrderingEnabled] = useState(true);
  const [hoveredDish, setHoveredDish] = useState("");

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const res = await axios.get(
          "https://rmrthemeaonlineorderingwebapi.azurewebsites.net/api/MeaMenu/online"
        );

        const items = Array.isArray(res.data) ? res.data : [];
        const grouped = groupMenuItems(items);

        setMenuSections(grouped);
        if (grouped.length > 0) {
          setActiveCategory(grouped[0].categoryName);
        }
      } catch (err) {
        console.error("Failed to load MeaMenu online items:", err);
      } finally {
        setLoading(false);
      }
    };

    const loadOrderingFlag = async () => {
      try {
        const res = await axios.get(
          "https://rmrthemeaonlineorderingwebapi.azurewebsites.net/api/TCVariable/value/Mea-Online-Ordering-Website-On-Off?name=Mea-Online-Ordering-Website-On-Off"
        );

        const rawValue = res.data?.toString().trim().toLowerCase();
        const isOff =
          rawValue === "off" || rawValue === "0" || rawValue === "false";

        setIsOrderingEnabled(!isOff);
      } catch {
        setIsOrderingEnabled(true);
      }
    };

    const loadOrderLink = async () => {
      try {
        const res = await axios.get(
          "https://rmrthemeaonlineorderingwebapi.azurewebsites.net/api/TCVariable/link"
        );
        setOrderLink(res.data);
      } catch (err) {
        console.error("Failed to fetch order link:", err);
      }
    };

    loadMenu();
    loadOrderingFlag();
    loadOrderLink();

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);

    checkMobile();
    handleScroll();

    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const targetId = location.state.scrollTo;

      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 150);
    }
  }, [location]);

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

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
    image: [`${SITE_URL}/images/hero-main.jpg`],
    sameAs: [
      "https://www.facebook.com/themeathaicuisine",
      "https://www.instagram.com/themeathaicuisine",
    ],
  };

  return (
    <ThaiPaperBackground>
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

        <meta property="og:type" content="restaurant" />
        <meta property="og:title" content={`${BUSINESS_NAME} | Thai in ${CITY}`} />
        <meta
          property="og:description"
          content="Craving Thai in Plymouth, MA? Enjoy curries, noodles, fried rice, and homemade ramen at The Mea Thai Cuisine. Order online or dine in."
        />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={`${SITE_URL}/images/og-mea-thai.jpg`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${BUSINESS_NAME} | Thai Restaurant in Plymouth`}
        />
        <meta
          name="twitter:description"
          content="Authentic Thai food in Plymouth, MA — noodles, curries, fried rice, and ramen."
        />
        <meta name="twitter:image" content={`${SITE_URL}/images/og-mea-thai.jpg`} />

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

      <NewsSection take={5} />

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
            Whether you&apos;re looking for dine-in Thai food in {CITY}, takeout
            after work, or easy online ordering, we&apos;re proud to be one of
            the top-rated Thai restaurants in Plymouth, MA.
          </p>
        </article>
      </Section>

      <Section tone="warm" id="menu">
        <MenuSection
          sections={menuSections}
          isMobile={isMobile}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          loading={loading}
          onHoverItem={setHoveredDish}
        />
      </Section>

      <Section tone="light">
        <div className="space-y-8">
          <div className="rounded-3xl bg-white/70 backdrop-blur-sm shadow-sm p-6 md:p-8">
            <FAQSection />
          </div>

          <div className="rounded-3xl bg-white/70 backdrop-blur-sm shadow-sm p-0 md:p-2 overflow-hidden">
            <TrailerSection />
          </div>
        </div>

        <OrnamentalDivider />
      </Section>

      <Section tone="warm">
        <QuickFeedbackWidget />
      </Section>

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

      <StickyAdaptiveCTA currentDish={hoveredDish} orderLink={orderLink} />

      <ScrollToTopButton show={showScrollTop} />
    </ThaiPaperBackground>
  );
}

export default HomePage;