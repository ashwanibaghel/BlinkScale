"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function useSafeReducedMotion() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? prefersReducedMotion : false;
}
