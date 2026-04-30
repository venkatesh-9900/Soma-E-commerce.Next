"use client";
import React from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
}

export default function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 40, rotateX: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98] // Premium custom cubic-bezier (easeOutQuint)
      }}
    >
      {children}
    </motion.div>
  );
}
