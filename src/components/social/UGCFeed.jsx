import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function UGCFeed({ images = [] }) {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div>
      <div className="columns-2 md:columns-3 gap-3 [column-fill:_balance]">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt="guest post"
            className="mb-3 w-full rounded-xl shadow-sm cursor-pointer hover:opacity-90"
            onClick={() => setLightbox(src)}
            loading="lazy"
          />
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox}
              alt="ugc"
              className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
