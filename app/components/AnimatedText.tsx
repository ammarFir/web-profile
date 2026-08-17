"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function AnimatedText({
  children,
  delay = 0,
  className = "",
}: AnimatedTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}