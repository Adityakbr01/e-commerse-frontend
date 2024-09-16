import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TextAnimation = () => {
  const texts = [
    "refire🔥",
    "Welcome",
    "नमस्ते",
    "Hola",
    "Bonjour",
    "こんにちは",
    "안녕하세요",
    "你好",
    "Привет",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === texts.length - 1 ? 0 : prevIndex + 1
      );
    }, 600); // 0.3s show + 0.3s hide = 600ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen text-white bg-black">
      <div>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.3 }}
        >
          <h1 className="text-6xl font-bold">{texts[currentIndex]}</h1>
        </motion.div>
      </div>
    </div>
  );
};

export default TextAnimation;
