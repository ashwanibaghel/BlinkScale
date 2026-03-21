"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";

// Energy pulse ring positions — staggered to create expanding wave effect
const RINGS = [
  { delay: "0s",    size: 180, duration: "3.2s" },
  { delay: "1.1s",  size: 180, duration: "3.2s" },
  { delay: "2.2s",  size: 180, duration: "3.2s" },
];

// Orbiting spark particles around the button
const SPARKS = Array.from({ length: 6 }, (_, i) => ({
  angle: i * 60,
  radius: 90,
  duration: `${8 + i * 0.8}s`,
  size: i % 2 === 0 ? 3 : 2,
  opacity: 0.4 + (i % 3) * 0.15,
}));

export default function FinalCta() {
  const ref = useInView(useRef(null));

  return (
    <section id="contact" className="section-anchor py-24 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <div className="glass-panel relative overflow-hidden rounded-[36px] px-6 py-14 text-center sm:px-10 sm:py-20">

            {/* Base gradient */}
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(82,132,255,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(122,92,255,0.24),transparent_40%)]"
              aria-hidden="true"
            />

            {/* Energy core: pulsing rings expanding from center */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2"
            >
              {RINGS.map((ring, i) => (
                <div
                  key={i}
                  style={{
                    position:     "absolute",
                    width:        ring.size,
                    height:       ring.size,
                    borderRadius: "50%",
                    border:       "1px solid rgba(100,160,255,0.35)",
                    transform:    "translate(-50%, -50%) scale(0.6)",
                    animation:    `energyRing ${ring.duration} ${ring.delay} ease-out infinite`,
                    willChange:   "transform, opacity",
                  }}
                />
              ))}

              {/* Central energy glow */}
              <div
                style={{
                  position:     "absolute",
                  width:        240,
                  height:       240,
                  borderRadius: "50%",
                  transform:    "translate(-50%, -50%)",
                  background:   "radial-gradient(circle, rgba(80,140,255,0.22) 0%, rgba(100,80,255,0.1) 45%, transparent 72%)",
                  filter:       "blur(20px)",
                }}
              />
            </div>

            {/* Orbiting spark particles around the button area */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2"
            >
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
