"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import useSafeReducedMotion from "@/components/ui/useSafeReducedMotion";

export default function CursorGlow() {
  const reduceMotion = useSafeReducedMotion();
  const [mounted, setMounted] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 110, damping: 22, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 110, damping: 22, mass: 0.8 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || reduceMotion || !window.matchMedia("(pointer: fine)").matches) {
      return undefined;
    }

    const handlePointerMove = (event) => {
      x.set(event.clientX - 160);
      y.set(event.clientY - 160);
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [mounted, reduceMotion, x, y]);

  if (!mounted || reduceMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-20 hidden h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(70,120,255,0.22),rgba(107,87,255,0.12)_38%,transparent_66%)] blur-3xl md:block"
      style={{ x: springX, y: springY }}
    />
  );
}
