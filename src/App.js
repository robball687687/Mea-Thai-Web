import React, { useEffect, useState } from "react";
import axios from "axios";
import SiteHeader from "./components/SiteHeader";
import Hero from "./components/Hero";
import DeliverySection from "./components/DeliverySection";
import MenuSection from "./components/menu/MenuSection";
import FAQSection from "./components/FAQSection";
import TrailerSection from "./components/TrailerSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import ScrollToTopButton from "./components/ScrollToTopButton";

function App() {
  const [menuData, setMenuData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [orderLink, setOrderLink] = useState("https://polite-mud-02f9f1a0f.6.azurestaticapps.net");
  const [loading, setLoading] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isOrderingEnabled, setIsOrderingEnabled] = useState(true);

  useEffect(() => {
    axios
      .get("https://rmrthemeaonlineorderingwebapi.azurewebsites.net/api/TCPOSWebMenu")
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
        const isOff = rawValue === "off" || rawValue === "0" || rawValue === "false";
        setIsOrderingEnabled(!isOff);
      })
      .catch(() => setIsOrderingEnabled(true));

    axios
      .get("https://rmrthemeaonlineorderingwebapi.azurewebsites.net/api/TCVariable/link")
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

  const scrollToMenu = () => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center relative">
      <SiteHeader
        orderLink={orderLink}
        isOrderingEnabled={isOrderingEnabled}
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
      />

      <Hero onCta={scrollToMenu} />

      <DeliverySection />

      <MenuSection
        menuData={menuData}
        isMobile={isMobile}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        loading={loading}
      />

      <FAQSection />
      <TrailerSection />
      <AboutSection />
      <ContactSection />

      {/* Desktop Order Now Button (persistent) */}
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

      {/* Mobile Floating Order Button */}
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

      <ScrollToTopButton show={showScrollTop} />
    </div>
  );
}

export default App;
