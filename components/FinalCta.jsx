"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";

// Event Horizon rings (Accretion disk)
const RINGS = [
  { delay: "0s",    size: 340, duration: "4.2s" },
  { delay: "1.4s",  size: 340, duration: "4.2s" },
  { delay: "2.8s",  size: 340, duration: "4.2s" },
];

// Orbiting spark particles around the Black Hole
const SPARKS = Array.from({ length: 4 }, (_, i) => ({
  angle: i * 90,
  radius: 170, // pushed out to orbit the black hole
  duration: `${14 + i * 2}s`,
  size: i % 2 === 0 ? 2 : 1,     // tiny dots
  opacity: 0.15 + (i % 2) * 0.1, // faint
}));

export default function FinalCta() {
  const ref = useInView(useRef(null));

  return (
    <section id="contact" className="section-anchor content-visibility-auto py-24 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <div className="glass-panel relative overflow-hidden rounded-[36px] px-6 py-14 text-center sm:px-10 sm:py-20">

            {/* Deep Space Background gradient */}
            <div
              className="absolute inset-0 opacity-40 mix-blend-screen"
              style={{
                background: "radial-gradient(ellipse at center, rgba(30,40,80,0.15) 0%, transparent 70%)"
              }}
              aria-hidden="true"
            />

            {/* The Cosmic Object: Premium Black Hole / Eclipse */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              {/* Accretion Disk Glow (Outer) */}
              <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(82,132,255,0.08)_0%,transparent_60%)] blur-[40px]" />
              
              {/* Event Horizon Pulsing Rings */}
              {RINGS.map((ring, i) => (
                <div
                  key={i}
                  style={{
                    position:     "absolute",
                    width:        ring.size,
                    height:       ring.size,
                    borderRadius: "50%",
                    border:       "1px solid rgba(120,160,255,0.15)",
                    transform:    "translate(-50%, -50%) scale(0.6)",
                    animation:    `energyRing ${ring.duration} ${ring.delay} ease-out infinite`,
                    willChange:   "transform, opacity",
                  }}
                />
              ))}

              {/* Black Hole Core */}
              <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 bg-[#02050e] shadow-[0_0_60px_rgba(82,132,255,0.1)_inset,0_0_80px_rgba(82,132,255,0.15)]" />

              {/* Orbiting Sparkles */}
              <div className="absolute left-1/2 top-1/2">
                {SPARKS.map((spark, i) => (
                  <div
                    key={i}
                    style={{
                      position:         "absolute",
                      width:            spark.size,
                      height:           spark.size,
                      borderRadius:     "50%",
                      background:       "rgba(160,200,255,0.9)",
                      boxShadow:        "0 0 6px rgba(120,180,255,0.8)",
                      animation:        `orbitSpark ${spark.duration} ${i * 1.3}s linear infinite`,
                      opacity:          spark.opacity,
                      transformOrigin:  `${-spark.radius}px 0`,
                      transform:        `rotate(${spark.angle}deg) translateX(-${spark.radius}px)`,
                      "--orbit-radius": `${spark.radius}px`,
                      marginLeft:       "-1px",
                      marginTop:        "-1px",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="relative z-10 mx-auto max-w-3xl">
              <span className="eyebrow">Ready When You Are</span>
              <h2 className="mx-auto mt-8 max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
                Let&apos;s build something unforgettable.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                From a standout company website to a full-scale digital platform,
                we can shape the next chapter with speed, clarity, and polish.
              </p>
              <div className="mt-10 flex justify-center">
                <MagneticButton href="mailto:hello@blinkscale.studio">
                  Start Your Project
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
