"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface OdometerTextProps {
  words: string[];
  className?: string;
  interval?: number;
}

export default function OdometerText({
  words,
  className = "",
  interval = 3000,
}: OdometerTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className={`relative inline-block overflow-hidden align-baseline ${className}`}>
      <span className="invisible">{words[0]}</span>
      <motion.span
        key={currentIndex}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.23, 1, 0.32, 1],
        }}
        className="absolute inset-x-0 top-0"
      >
        {words[currentIndex]}
      </motion.span>
    </span>
  );
}