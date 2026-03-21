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
    <div ref={ref} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
      <div className="text-3xl font-semibold text-white">{display}</div>
      <p className="mt-2 text-sm leading-7 text-slate-300">{label}</p>
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
    <section id="about" className="section-anchor py-24 sm:py-28">
      <div className="section-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Left: visual panel — fades in, no ongoing motion */}
          <Reveal from="left">
            <div className="glass-panel relative overflow-hidden rounded-[34px] p-4 sm:p-6">
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(76,138,255,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(125,92,255,0.2),transparent_36%)]"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-slate-950/30 p-3">
                <Image
                  src="/about-orbit.svg"
                  alt="Abstract BlinkScale systems illustration"
                  width={1200}
                  height={900}
                  className="h-auto w-full rounded-[22px]"
                />
              </div>

              <div className="relative mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                  <div className="text-sm uppercase tracking-[0.24em] text-blue-200/80">
                    Thinking
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Product clarity, UX direction, and systems planning aligned
                    before development starts.
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                  <div className="text-sm uppercase tracking-[0.24em] text-blue-200/80">
                    Execution
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Design and engineering working together so every detail feels
                    purposeful on launch day.
                  </p>
                </div>
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
                  <div className="glass-panel flex items-center gap-4 rounded-2xl px-5 py-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-400/10 text-emerald-200">
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
