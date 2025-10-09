import React from "react";
import { motion } from "framer-motion";

const Hero = ({ onCta }) => (
  <div className="relative w-full h-[75vh] overflow-hidden">
    <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
      <source
        src="https://rmrstorage.blob.core.windows.net/videomeathai/1022637517-hd.mp4"
        type="video/mp4"
      />
    </video>
    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center space-y-6">
      <motion.img
        src="https://rmrstorage.blob.core.windows.net/measite/MeaLogoBlackTrans.png"
        alt="Restaurant Logo"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-68 md:w-92"
      />
      <motion.button
        onClick={onCta}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-red-600 text-white px-6 py-3 rounded-full text-lg shadow hover:bg-red-700 transition"
      >
        View Menu ↓
      </motion.button>
    </div>
  </div>
);

export default Hero;
