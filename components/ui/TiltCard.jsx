"use client";

import { motion } from "framer-motion";
import useSafeReducedMotion from "@/components/ui/useSafeReducedMotion";

export default function TiltCard({ children, className = "" }) {
  const reduceMotion = useSafeReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
