import React from "react";
import ThaiSection from "../layout/ThaiSection";
import ThaiHeading from "../layout/ThaiHeading";
import CategoryTabs from "./CategoryTabs";
import MenuCard from "./MenuCard";
import { motion } from "framer-motion";

const MenuSection = ({ menuData, isMobile, activeCategory, setActiveCategory, loading,onHoverItem  }) => {
  const categories = menuData.map((s) => s.category);
  const visibleSections = loading
    ? []
    : (isMobile ? menuData : menuData.filter((s) => s.category === activeCategory));

  return (
    <ThaiSection id="menu" className="bg-gradient-to-b from-white to-red-50/20">
      <div className="relative mb-6">
        <ThaiHeading kicker="Our food">Menu</ThaiHeading>

        {/* stays inline on mobile, moves to the right on md+ */}
        <a
            href="https://rmrstorage.blob.core.windows.net/measite/MeaMenu2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full shadow hover:bg-red-700 transition text-sm
                    md:mt-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2"
        >
            Download Menu PDF
        </a>
        </div>

      {!isMobile && categories.length > 0 && (
        <CategoryTabs categories={categories} active={activeCategory} onChange={setActiveCategory} />
      )}

      <div className="space-y-12 mt-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          visibleSections.map((section, i) => (
            <div key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative mb-10"
              >
                <div className="flex items-center justify-center">
                  <span className="text-3xl font-extrabold text-red-600 border-b-4 border-red-500 px-6 pb-1 uppercase tracking-widest bg-white z-10 relative">
                    {section.category}
                  </span>
                </div>
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-200 z-0" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.items.map((item, idx) => (
                  <MenuCard key={idx} item={item} onHoverItem={onHoverItem}  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </ThaiSection>
  );
};

export default MenuSection;
