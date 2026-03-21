"use client";

import { motion } from "framer-motion";
import useSafeReducedMotion from "@/components/ui/useSafeReducedMotion";

const variants = {
  primary:
    "bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-400 text-slate-950 shadow-[0_18px_40px_rgba(74,124,255,0.35)] hover:shadow-[0_22px_55px_rgba(74,124,255,0.45)]",
  secondary:
    "border border-white/[0.12] bg-white/[0.06] text-white hover:border-blue-300/30 hover:bg-blue-400/10",
  ghost:
    "border border-white/[0.12] bg-transparent text-white hover:border-blue-300/30 hover:bg-white/[0.05]",
};

export default function MagneticButton({
  children,
  href,
  variant = "primary",
}) {
  const reduceMotion = useSafeReducedMotion();

  return (
    <motion.a
      href={href}
      whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`focus-ring group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition duration-300 ${variants[variant]}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-10 w-8 rotate-[18deg] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition duration-700 group-hover:translate-x-[240px] group-hover:opacity-80"
      />
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}
