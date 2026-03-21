"use client";

/**
 * KEPLERIAN SOLAR SYSTEM
 * ──────────────────────
 * Physics:
 *   • Kepler's 1st Law — each planet orbits in an ELLIPSE with the Sun at ONE FOCUS (not center)
 *   • Kepler's 2nd Law — speed varies: FASTER at perihelion (closest), SLOWER at aphelion (farthest)
 *     implemented via first-order true-anomaly correction: θ_true ≈ M + 2e·sin(M) + 1.25e²·sin(2M)
 *   • All orbital math runs inside requestAnimationFrame — zero React re-renders per frame
 */

import { useEffect, useRef, useState } from "react";

// sqrt-scale: radius = 75 * sqrt(real_AU) → inner planets cluster, outer spread like real solar system
// Outermost: Neptune a=411, e=0.09 → aphelion 448 + planet 14px = 462 → 960px container safe
export const SOLAR_SIZE = 960;

/**
 * PLANET RADII — based on real solar system AU values, sqrt-scaled to fit screen
 * Inner 4 (Frontend→Backend):  47, 64, 75, 92 px  — tightly clustered near Sun
 *   79px GAP (asteroid belt)
 * Outer 4 (Cloud→Data):       171, 232, 329, 411 px — widely spread
 *
 * This creates the characteristic real solar system look from the reference image.
 *
 * Eccentricities exaggerated 2-3× from real values so the oval is clearly visible.
 */
const PLANETS = [
  {
    name: "Frontend",
    a: 47,  ecc: 0.35, size: 7,   speed: 0.96, tilt: 10,
    // Mercury: tightest orbit, most eccentric, fastest
    gradient: "radial-gradient(circle at 34% 32%, #e2e8f0, #94a3b8 52%, #334155)",
    glow: "148,163,184",
  },
  {
    name: "UI / UX",
    a: 64,  ecc: 0.08, size: 10,  speed: 0.70, tilt: -4,
    // Venus: nearly circular, slightly larger
    gradient: "radial-gradient(circle at 34% 32%, #fed7aa, #fb923c 50%, #9a3412)",
    glow: "251,146,60",
  },
  {
    name: "App Dev",
    a: 75,  ecc: 0.12, size: 11,  speed: 0.56, tilt: 2,
    // Earth: blue-green
    gradient: "radial-gradient(circle at 34% 32%, #bfdbfe, #3b82f6 46%, #1e3a8a 80%, #14532d 100%)",
    glow: "96,165,250",
  },
  {
    name: "Backend",
    a: 92,  ecc: 0.22, size: 9,   speed: 0.44, tilt: -7,
    // Mars: last inner planet, slightly elliptical
    gradient: "radial-gradient(circle at 38% 30%, #fee2e2, #f87171 46%, #7f1d1d)",
    glow: "248,113,113",
  },
  // ── ASTEROID BELT GAP ── (92px → 171px, Δ79px — visible empty space)
  {
    name: "Cloud",
    a: 171, ecc: 0.22, size: 22,  speed: 0.32, tilt: 4,
    // Jupiter: BIG jump, largest planet
    gradient: "radial-gradient(circle at 34% 32%, #fef3c7, #fbbf24 26%, #b45309 55%, #78350f)",
    glow: "217,119,6",
  },
  {
    name: "DevOps",
    a: 232, ecc: 0.24, size: 18,  speed: 0.26, tilt: -3,
    // Saturn: ring + pale yellow
    gradient: "radial-gradient(circle at 34% 32%, #fefce8, #fde047 38%, #854d0e)",
    glow: "234,179,8",
    hasRing: true,
    ringColor: "rgba(253,224,71,0.6)",
  },
  {
    name: "R & D",
    a: 329, ecc: 0.16, size: 14,  speed: 0.22, tilt: 5,
    // Uranus: cyan, mid-size
    gradient: "radial-gradient(circle at 34% 32%, #cffafe, #22d3ee 46%, #164e63)",
    glow: "34,211,238",
  },
  {
    name: "Data",
    a: 411, ecc: 0.10, size: 14,  speed: 0.18, tilt: -2,
    // Neptune: outermost, slow, deep indigo
    gradient: "radial-gradient(circle at 34% 32%, #e0e7ff, #818cf8 46%, #1e1b4b)",
    glow: "129,140,248",
  },
];



// ─── Main Component ───────────────────────────────────────────────────────────
export default function SolarSystem() {
  const wrapperRefs = useRef([]); // each planet wrapper — moved by RAF
  const rafRef      = useRef(null);
  const startRef    = useRef(null);
  const hoveredRef  = useRef(-1);  // read in RAF — no React re-render lag

  // React state for label color + ring highlight (hover events are infrequent)
  const [hovered, setHovered] = useState(-1);

  useEffect(() => {
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const t = (ts - startRef.current) / 1000; // seconds

      PLANETS.forEach((p, i) => {
        const el = wrapperRefs.current[i];
        if (!el) return;

        const { a, ecc, speed, tilt, size } = p;
        const b = a * Math.sqrt(1 - ecc * ecc); // semi-minor axis

        // ── Kepler's 2nd Law: variable speed ──────────────────────────────
        // M = mean anomaly (uniform time angle)
        const M = t * speed;
        // First-order approximation: true anomaly from mean anomaly
        // θ_true ≈ M + 2e·sin(M) + (5/4)·e²·sin(2M)
        const theta = M
          + 2 * ecc * Math.sin(M)
          + 1.25 * ecc * ecc * Math.sin(2 * M);

        // ── Kepler's 1st Law: ellipse with Sun at focus ───────────────────
        // Planet position in orbital plane (Sun at origin = right focus)
        // At θ=0 → perihelion (closest), at θ=π → aphelion (farthest)
        const rawX = a * (Math.cos(theta) - ecc);   // = a·cos - c  (c = a·e = focus distance)
        const rawY = b * Math.sin(theta)
                   + Math.sin(t * speed * 1.5) * 1.5; // micro wobble

        // ── 2D orbital tilt rotation ──────────────────────────────────────
        const tRad = (tilt * Math.PI) / 180;
        const x = rawX * Math.cos(tRad) - rawY * Math.sin(tRad);
        const y = rawX * Math.sin(tRad) + rawY * Math.cos(tRad);

        el.style.transform = `translate(${x}px, ${y}px)`;

        // ── Light model: inner planets brighter ───────────────────────────
        const baseBrightness = 1 - (i / PLANETS.length) * 0.32;
        const h = hoveredRef.current;

        if (h === -1) {
          el.style.opacity = "1";
          el.style.filter  = `brightness(${baseBrightness})`;
          el.style.zIndex  = "10";
        } else if (h === i) {
          el.style.opacity = "1";
          el.style.filter  = `brightness(1.6) drop-shadow(0 0 ${size * 2}px rgba(${p.glow},0.95))`;
          el.style.zIndex  = "30";
        } else {
          el.style.opacity = "0.25";
          el.style.filter  = `brightness(${baseBrightness * 0.4})`;
          el.style.zIndex  = "5";
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div
      style={{
        position:   "relative",
        width:      SOLAR_SIZE,
        height:     SOLAR_SIZE,
        flexShrink: 0,
        overflow:   "visible",
      }}
    >
      {/* ── Elliptical orbit ring paths ─────────────────────────────────────── */}
      {/* Each ring is an ELLIPSE with the Sun at one focus.
          Sun is at (50%, 50%) of the container.
          Ellipse center is offset from Sun by c = a·e in the perihelion direction.
          We use a zero-size wrapper positioned at the Sun, apply tilt rotation,
          then offset the actual ring div to its correct position. */}
      {PLANETS.map((p, i) => {
        const { a, ecc, tilt } = p;
        const b = a * Math.sqrt(1 - ecc * ecc);
        const isHov = hovered === i;
        return (
          <div
            key={p.name + "-ring-wrap"}
            aria-hidden="true"
            style={{
              // Zero-size wrapper anchored at the Sun — rotates around Sun
              position:        "absolute",
              top:             "50%",
              left:            "50%",
              width:           0,
              height:          0,
              transform:       `rotate(${tilt}deg)`,
              transformOrigin: "0 0",  // ← rotate around the Sun
              pointerEvents:   "none",
            }}
          >
            {/* Ellipse ring: top-left at (-a*(1+e), -b) in the orbital frame */}
            <div
              style={{
                position:      "absolute",
                left:          -a * (1 + ecc),
                top:           -b,
                width:         2 * a,
                height:        2 * b,
                borderRadius:  "50%",
                border:        `1.5px solid rgba(160,185,255,${isHov ? 0.50 : 0.22})`,
                boxShadow:     isHov ? "0 0 14px rgba(140,170,255,0.18)" : "none",
                transition:    "border-color 0.3s ease, box-shadow 0.3s ease",
              }}
            />
          </div>
        );
      })}

      {/* ── Sun ─────────────────────────────────────────────────────────────── */}
      {/* Corona glow */}
      <div
        aria-hidden="true"
        style={{
          position:     "absolute",
          top:          "50%",
          left:         "50%",
          width:        120,
          height:       120,
          transform:    "translate(-50%, -50%)",
          borderRadius: "50%",
          background:   "radial-gradient(circle, rgba(253,224,71,0.3) 0%, rgba(251,191,36,0.12) 48%, transparent 72%)",
          filter:       "blur(12px)",
          zIndex:       4,
          pointerEvents: "none",
        }}
      />
      {/* Sun sphere */}
      <div
        aria-hidden="true"
        className="sun-orb"
        style={{
          position:     "absolute",
          top:          "50%",
          left:         "50%",
          width:        44,
          height:       44,
          transform:    "translate(-50%, -50%)",
          borderRadius: "50%",
          background:   "radial-gradient(circle at 34% 32%, #fffbeb, #fde68a 20%, #fbbf24 48%, #f59e0b 70%, #b45309)",
          zIndex:       6,
          pointerEvents: "none",
        }}
      />

      {/* ── Planet wrappers — moved every frame by RAF ───────────────────────── */}
      {PLANETS.map((p, i) => (
        <div
          key={p.name}
          ref={(el) => (wrapperRefs.current[i] = el)}
          onMouseEnter={() => { hoveredRef.current = i; setHovered(i); }}
          onMouseLeave={() => { hoveredRef.current = -1; setHovered(-1); }}
          style={{
            position:   "absolute",
            top:        "50%",
            left:       "50%",
            width:      p.size * 2,
            height:     p.size * 2,
            marginTop:  -p.size,
            marginLeft: -p.size,
            cursor:     "default",
            zIndex:     10,
          }}
        >
          {/* Planet sphere */}
          <div
            style={{
              width:        "100%",
              height:       "100%",
              borderRadius: "50%",
              background:   p.gradient,
              boxShadow:    `0 0 ${p.size * 2.5}px rgba(${p.glow},0.7), 0 0 ${p.size}px rgba(${p.glow},0.5)`,
              position:     "relative",
              overflow:     "visible",
            }}
          >
            {/* Saturn / DevOps ring */}
            {p.hasRing && (
              <div
                aria-hidden="true"
                style={{
                  position:      "absolute",
                  top:           "50%",
                  left:          "50%",
                  width:         p.size * 4.8,
                  height:        p.size * 1.5,
                  transform:     "translate(-50%, -50%) rotateX(72deg) rotate(12deg)",
                  borderRadius:  "50%",
                  border:        `2.5px solid ${p.ringColor}`,
                  boxShadow:     `0 0 8px ${p.ringColor}`,
                  pointerEvents: "none",
                }}
              />
            )}
          </div>

          {/* Name label */}
          <div
            style={{
              position:      "absolute",
              top:           p.size * 2 + 7,
              left:          "50%",
              transform:     "translateX(-50%)",
              whiteSpace:    "nowrap",
              fontSize:      9,
              fontWeight:    600,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color:         hovered === i ? `rgb(${p.glow})` : "rgba(170,190,255,0.62)",
              transition:    "color 0.22s ease",
              textShadow:    hovered === i ? `0 0 14px rgba(${p.glow},0.85)` : "none",
              pointerEvents: "none",
            }}
          >
            {p.name}
          </div>
        </div>
      ))}
    </div>
  );
}
