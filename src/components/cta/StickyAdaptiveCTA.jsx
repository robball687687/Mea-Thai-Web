import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function StickyAdaptiveCTA({ currentDish, orderLink }) {
  const [visible, setVisible] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 300 && y > lastScroll.current) setVisible(true);
      if (y < 120) setVisible(false);
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4"
        >
          <div className="max-w-6xl w-full">
            <div className="flex items-center gap-3 bg-red-600 text-white rounded-2xl shadow-lg px-4 py-3">
              <span className="text-sm md:text-base font-medium truncate">
                {currentDish ? `Craving ${currentDish}?` : "Ready when you are."}
              </span>
              <a
                href={orderLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto bg-white text-red-600 font-semibold px-4 py-2 rounded-xl hover:bg-red-50 transition"
              >
                Order Pickup Online
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
