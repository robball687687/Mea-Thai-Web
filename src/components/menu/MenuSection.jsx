import React from "react";
import ThaiSection from "../layout/ThaiSection";
import ThaiHeading from "../layout/ThaiHeading";
import CategoryTabs from "./CategoryTabs";
import MenuCard from "./MenuCard";
import { motion, AnimatePresence } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.2,
    },
  },
};

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const MenuSection = ({
  sections,
  isMobile,
  activeCategory,
  setActiveCategory,
  loading,
  onHoverItem,
}) => {
  const categories = sections.map((s) => s.categoryName);

  const visibleSections = loading
    ? []
    : isMobile
      ? sections
      : sections.filter((s) => s.categoryName === activeCategory);

  return (
    <ThaiSection
      id="menu"
      className="bg-gradient-to-b from-white via-orange-50/30 to-red-50/20"
    >
      <div className="relative mb-6">
        <ThaiHeading kicker="Our food">Menu</ThaiHeading>

        <a
          href="https://rmrstorage.blob.core.windows.net/measite/MeaMenu2025.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full shadow hover:bg-red-700 transition text-sm md:mt-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2"
        >
          Download Menu PDF
        </a>
      </div>

      {!isMobile && categories.length > 0 && (
        <CategoryTabs
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      )}

      <div className="space-y-14 mt-10">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {visibleSections.map((section) => (
              <motion.div
                key={section.categoryName}
                variants={sectionVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <div className="relative mb-10">
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-red-200 to-transparent" />

                  <div className="relative flex items-center justify-center">
                    <span className="bg-white px-6 md:px-10 py-2 text-3xl md:text-5xl font-extrabold text-red-600 tracking-[0.18em] uppercase rounded-full shadow-sm border border-red-100">
                      {section.categoryName}
                    </span>
                  </div>
                </div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  variants={gridVariants}
                  initial="hidden"
                  animate="show"
                >
                  {section.items.map((item) => (
                    <motion.div key={item.menuItemId} variants={cardVariants}>
                      <MenuCard item={item} onHoverItem={onHoverItem} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </ThaiSection>
  );
};

export default MenuSection;