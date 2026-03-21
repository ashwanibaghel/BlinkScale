"use client";

import { motion } from "framer-motion";
import useSafeReducedMotion from "@/components/ui/useSafeReducedMotion";

/**
 * Scroll-triggered reveal with spring-physics fade+slide.
 * Replaces the former no-op stub.
 * @param {number} delay  - stagger delay in seconds
 * @param {string} from   - "bottom" (default) | "left" | "right"
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  from = "bottom",
}) {
  const reduceMotion = useSafeReducedMotion();

  const directions = {
    bottom: { y: 28, x: 0 },
    left:   { y: 0, x: -28 },
    right:  { y: 0, x: 28 },
  };

  const { x, y } = directions[from] ?? directions.bottom;

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
