"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import SolarSystem, { SOLAR_SIZE } from "@/components/ui/SolarSystem";
import useSafeReducedMotion from "@/components/ui/useSafeReducedMotion";

// CSS particles — zero JS, purely decorative
const PARTICLES = [
  { size: 3, top: "14%", left: "22%", dur: "11s", del: "0s",   px: "18px",  py: "-26px", ps: "1.2" },
  { size: 2, top: "68%", left: "78%", dur: "14s", del: "1.8s", px: "-14px", py: "-32px", ps: "1.4" },
  { size: 4, top: "32%", left: "84%", dur: "9s",  del: "0.6s", px: "22px",  py: "-18px", ps: "1.1" },
  { size: 2, top: "78%", left: "18%", dur: "16s", del: "2.4s", px: "-20px", py: "-28px", ps: "1.3" },
  { size: 3, top: "52%", left: "8%",  dur: "12s", del: "1.2s", px: "16px",  py: "-24px", ps: "1.5" },
  { size: 2, top: "22%", left: "62%", dur: "13s", del: "3s",   px: "-12px", py: "-30px", ps: "1.2" },
  { size: 4, top: "88%", left: "48%", dur: "10s", del: "0.3s", px: "24px",  py: "-20px", ps: "1.0" },
  { size: 2, top: "44%", left: "92%", dur: "15s", del: "2s",   px: "-18px", py: "-22px", ps: "1.4" },
];

const heroSignals = [
  { label: "Lightning-fast builds", title: "Speed",        detail: "Performance tuned from structure to polish."            },
  { label: "Always-on partnership", title: "24/7 Support", detail: "Reliable delivery rhythms that stay calm after launch." },
  { label: "Built for growth",      title: "Scalable",     detail: "Flexible systems ready for the next chapter."           },
  { label: "Premium-led delivery",  title: "Secure",       detail: "Calm architecture with strong operational footing."     },
];

const heroStats = ["Design-led systems", "Scalable engineering", "Reliable post-launch support"];

export default function Hero() {
  const reduceMotion = useSafeReducedMotion();
  const heroRef = useRef(null);

  // Mouse 3D tilt on the solar system container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), {
    stiffness: 60, damping: 20, mass: 0.9,
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), {
    stiffness: 60, damping: 20, mass: 0.9,
  });

  // Scroll dissolve — starts gentle at 15%, fully gone at 65%
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const solarOpacity = useTransform(scrollYProgress, [0.15, 0.65], [1, 0]);
  const solarScale   = useTransform(scrollYProgress, [0.15, 0.65], [1, 0.6]);
  const solarY       = useTransform(scrollYProgress, [0, 0.65],    [0, -60]);
  const textY        = useTransform(scrollYProgress, [0, 0.5],     [0, -28]);

  function handleMouseMove(e) {
    if (reduceMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left  - rect.width  / 2);
    mouseY.set(e.clientY - rect.top   - rect.height / 2);
  }
  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      className="section-anchor relative pb-20 pt-32 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-40"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="section-shell">
        <div
          className="glow-frame relative overflow-hidden rounded-[38px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-16 xl:py-24"
          style={{
            // Completely transparent — body dark bg + fixed starfield show through
            background:          "transparent",
            border:              "1px solid rgba(255,255,255,0.08)",
            backdropFilter:      "blur(2px)",
            WebkitBackdropFilter:"blur(2px)",
          }}
        >

          {/* Subtle atmospheric haze — does NOT block stars */}
          <div className="hero-grid absolute inset-0 opacity-18" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-x-[8%] top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(100,80,255,0.14),transparent_62%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-[20%] bottom-0 h-40 bg-[radial-gradient(ellipse_at_bottom,rgba(40,100,220,0.12),transparent_60%)]"
            aria-hidden="true"
          />
          {/* Right-side nebula fill — slow drift blob */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{
              top: "15%", right: "-8%",
              width: 420, height: 420,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(120,60,255,0.11) 0%, rgba(60,40,160,0.07) 45%, transparent 72%)",
              filter: "blur(48px)",
              animation: "auraDrift 18s ease-in-out infinite alternate",
            }}
          />
          {/* Left-side secondary nebula */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{
              bottom: "10%", left: "-6%",
              width: 320, height: 320,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(30,80,200,0.10) 0%, rgba(20,50,140,0.05) 50%, transparent 74%)",
              filter: "blur(40px)",
              animation: "auraDrift 22s ease-in-out infinite alternate-reverse",
            }}
          />

          {/* CSS particles */}
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="particle"
              style={{
                width: p.size, height: p.size,
                top: p.top, left: p.left,
                "--pdur": p.dur, "--pdel": p.del,
                "--px": p.px, "--py": p.py, "--ps": p.ps,
              }}
            />
          ))}

          <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">

            {/* ── Headline ── */}
            <motion.div style={{ y: textY }} className="w-full">
              <Reveal>
                <span className="eyebrow">Premium Digital Products</span>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="mx-auto mt-8 max-w-[14ch] text-5xl font-semibold leading-[0.96] text-white sm:text-6xl lg:text-7xl xl:text-[5rem]">
                  We Build Digital Experiences That Feel Alive.
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  Helping businesses grow through smart, scalable IT solutions.
                  Beautifully designed products, resilient systems, and support
                  that keeps momentum moving.
                </p>
              </Reveal>
            </motion.div>

            {/* ── SOLAR SYSTEM ── */}
            <motion.div
              aria-hidden="true"
              style={{ opacity: solarOpacity, scale: solarScale, y: solarY }}
              className="relative mx-auto mt-10 sm:mt-6 flex w-full justify-center h-[380px] sm:h-[600px] lg:h-[960px] overflow-visible"
            >
              {/* Responsive Scaler (Shrinks 960px fixed element to fit mobile screens) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.38] sm:scale-[0.65] lg:scale-100">
                {/* Subtle 3D tilt on mouse move */}
                <motion.div
                  style={{
                    width:  SOLAR_SIZE,
                    height: SOLAR_SIZE,
                    ...(!reduceMotion
                      ? { rotateX, rotateY, transformPerspective: 1200, transformStyle: "preserve-3d" }
                      : {}),
                  }}
                >
                  <SolarSystem />
                </motion.div>
              </div>
            </motion.div>

            {/* ── CTA Buttons ── */}
            <Reveal delay={0.14}>
              <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row">
                <MagneticButton href="#contact">Get Started</MagneticButton>
                <MagneticButton href="#services" variant="ghost">
                  View Services
                </MagneticButton>
              </div>
            </Reveal>

            {/* ── Signal cards ── */}
            <Reveal delay={0.18}>
              <div className="mt-14 grid w-full max-w-5xl gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {heroSignals.map((signal, index) => (
                  <div
                    key={signal.title}
                    className={`rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md ${
                      index % 2 === 1 ? "xl:translate-y-4" : ""
                    }`}
                  >
                    <div className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
                      {signal.label}
                    </div>
                    <div className="mt-4 text-2xl font-semibold text-white">
                      {signal.title}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{signal.detail}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* ── Stat pills ── */}
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                {heroStats.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* ── Scroll indicator ── */}
            <Reveal delay={0.22}>
              <a
                href="#services"
                className="focus-ring mt-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-slate-200 transition duration-300 hover:border-blue-300/25 hover:bg-blue-400/10 hover:text-white"
              >
                <span>Scroll to explore</span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-base">
                  ↓
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// Inline Reveal — mount animation, w-full for proper text centering
function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
