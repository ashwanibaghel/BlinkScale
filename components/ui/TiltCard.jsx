"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import useSafeReducedMotion from "@/components/ui/useSafeReducedMotion";

/**
 * Real 3D mouse-tracking tilt card.
 * Mouse position within card drives rotateX/rotateY via spring physics.
 * On leave → springs back to neutral with inertia.
 */
export default function TiltCard({ children, className = "", intensity = 8 }) {
  const reduceMotion = useSafeReducedMotion();
  const ref = useRef(null);

  // Normalised mouse position [-0.5, +0.5] within card
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.8 };

  // rotateY: left → negative, right → positive
  const rotateY = useSpring(
    useTransform(rawX, [-0.5, 0.5], [-intensity, intensity]),
    springConfig,
  );
  // rotateX: top → positive, bottom → negative (tilt toward mouse)
  const rotateX = useSpring(
    useTransform(rawY, [-0.5, 0.5], [intensity, -intensity]),
    springConfig,
  );

  const rectRef = useRef(null);

  function handleMouseMove(e) {
    if (reduceMotion) return;
    if (!rectRef.current && ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
    const rect = rectRef.current;
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
    rectRef.current = null;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        reduceMotion
          ? {}
          : {
              rotateX,
              rotateY,
              transformPerspective: 900,
              transformStyle: "preserve-3d",
            }
      }
    >
      {children}
    </motion.div>
  );
}
