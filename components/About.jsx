"use client";

import Image from "next/image";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/Icons";
import useSafeReducedMotion from "@/components/ui/useSafeReducedMotion";

const bullets = [
  "Client-focused approach",
  "Custom scalable solutions",
  "Fast and reliable delivery",
];

// Animated counter: counts from 0 to target value when scrolled into view.
// Intentionally simple — this is a "stillness zone" section so no heavy motion.
function AnimatedStat({ value, suffix = "", label }) {
  const reduceMotion = useSafeReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView || reduceMotion) {
      setDisplay(value.toString());
      return;
    }
    // Numerical target (strip suffix for animation)
    const numericTarget = parseFloat(value);
    if (isNaN(numericTarget)) {
      setDisplay(value.toString());
      return;
    }
    const ctrl = animate(count, numericTarget, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        // Format: integers stay as integers, decimals to 1 place
        const formatted =
          numericTarget % 1 === 0
            ? Math.round(latest).toString()
            : latest.toFixed(1);
        setDisplay(formatted + suffix);
      },
    });
    return () => ctrl.stop();
  }, [inView, reduceMotion, value, suffix, count]);

  return (
    <div ref={ref} className="glow-frame group relative overflow-hidden rounded-[24px] border border-white/10 bg-[#09111f]/60 p-5 transition-transform duration-500 hover:scale-[1.03]">
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-20 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10">
        <div className="font-mono text-4xl font-semibold text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">{display}</div>
        <p className="mt-3 text-sm leading-7 text-slate-300">{label}</p>
      </div>
    </div>
  );
}

/**
 * About section — "stillness zone" by design.
 * Minimal animation: simple fade-in reveals, animated counters.
 * No continuous motion. Contrast with Hero's kinetic energy.
 */
export default function About() {
  return (
    <section id="about" className="section-anchor content-visibility-auto py-24 sm:py-28">
      <div className="section-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Left: visual panel — fades in, no ongoing motion */}
          {/* Left: visual panel — Cosmic Data Core */}
          <Reveal from="left">
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[40px] border border-white/5 bg-[#030712] p-4 sm:p-8">
              
              {/* Deep Space Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15)_0%,transparent_60%)]" />
              
              {/* Concentric Orbit Rings */}
              <div className="absolute h-[130%] w-[130%] animate-[spin_60s_linear_infinite] rounded-full border border-white/[0.03] border-t-white/[0.1] border-b-cyan-500/[0.2]" />
              <div className="absolute h-[85%] w-[85%] animate-[spin_40s_linear_infinite_reverse] rounded-full border border-blue-500/[0.05] border-r-blue-400/[0.25]" />
              <div className="absolute h-[50%] w-[50%] animate-[spin_20s_linear_infinite] rounded-full border border-purple-500/[0.1] border-l-purple-400/[0.3] border-dashed" />
              
              {/* The Core Image */}
              <div className="glow-frame float-card-slow relative z-10 w-3/4 overflow-hidden rounded-[36px] bg-[#02040c]/50 p-4 shadow-[0_0_60px_rgba(56,189,248,0.15)] backdrop-blur-md">
                <Image
                  src="/about-orbit.svg"
                  alt="Abstract BlinkScale systems illustration"
                  width={1200}
                  height={900}
                  priority
                  className="h-auto w-full object-cover mix-blend-screen opacity-90 transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Floating HUD Elements */}
              <div data-gravity className="absolute left-[5%] top-[15%] z-20 rounded-2xl border border-cyan-400/20 bg-black/40 p-3 shadow-[0_0_20px_rgba(34,211,238,0.1)] backdrop-blur-md transition-colors hover:border-cyan-400/50">
                <div className="text-[10px] font-mono tracking-widest text-cyan-400">SYS.SYNC</div>
                <div className="mt-2 flex gap-1.5">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400/40" style={{ animationDelay: '0.2s' }} />
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400/20" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>

              <div data-gravity className="absolute bottom-[15%] right-[5%] z-20 rounded-2xl border border-purple-400/20 bg-black/40 p-4 shadow-[0_0_20px_rgba(168,85,247,0.1)] backdrop-blur-md transition-colors hover:border-purple-400/50">
                <div className="text-[10px] font-mono tracking-widest text-purple-400">UPTIME</div>
                <div className="mt-1 font-mono text-sm font-bold text-white tracking-wider">99.99%</div>
              </div>
            </div>
          </Reveal>

          {/* Right: text content — staggered reveals, intentionally still */}
          <div>
            <Reveal delay={0.08}>
              <SectionHeading
                eyebrow="About"
                title="A calm, strategic team built to turn complexity into momentum."
                description="We help ambitious businesses launch digital platforms that look refined, perform fast, and scale with confidence. Our role is to make technology feel elegant, not overwhelming."
              />
            </Reveal>

            <div className="mt-10 space-y-4">
              {bullets.map((item, i) => (
                <Reveal key={item} delay={0.1 + i * 0.07}>
                  <div className="glow-frame glass-panel group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 hover:bg-white/[0.04]">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-shadow duration-300 group-hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]">
                      <CheckIcon className="h-5 w-5" />
                    </span>
                    <span className="text-base font-medium text-white">{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Animated counters — one-shot animation on scroll-in, then still */}
            <Reveal delay={0.22}>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <AnimatedStat
                  value="10"
                  suffix="x"
                  label="Clearer digital journeys through thoughtful simplification."
                />
                <AnimatedStat
                  value="24/7"
                  label="Reliable support habits around uptime, fixes, and guidance."
                />
                <AnimatedStat
                  value="1"
                  suffix=" Team"
                  label="Strategy, design, build, and support staying tightly aligned."
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
