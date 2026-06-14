"use client";

/**
 * PREMIUM STARFIELD — 3-Layer Depth System + Parallax Nebulas
 * ─────────────────────────────────────────────────────────────
 * Far layer   : 75 tiny stars, slowest parallax
 * Mid layer   : 50 medium stars, steady parallax
 * Near layer  : 25 larger stars, fastest parallax
 * 
 * Nebulas     : 2 soft blobs that subtly shift with mouse
 * Shooting    : Exactly 1 shooting star at a time, triggers every 8-12s
 */

import { useEffect, useRef, useState } from "react";

// Pre-generate static star data
function genStars(count, layer) {
  const sizeRange  = { far: [0.8, 1.4], mid: [1.3, 1.8], near: [1.8, 2.5] };
  const opacRange  = { far: [0.15, 0.35], mid: [0.35, 0.6], near: [0.55, 0.8] };
  const twinklePct = { far: 0.3, mid: 0.5, near: 0.8 };
  
  const [sMin, sMax] = sizeRange[layer];
  const [oMin, oMax] = opacRange[layer];

  let seed = layer === "far" ? 1 : layer === "mid" ? 2 : 3;
  const rand = () => { seed = (seed * 1664525 + 1013904223) & 0xffffffff; return (seed >>> 0) / 0xffffffff; };

  return Array.from({ length: count }, (_, i) => {
    const twinkle = rand() < twinklePct[layer];
    return {
      id: `${layer}-${i}`,
      top: rand() * 100,
      left: rand() * 100,
      size: sMin + rand() * (sMax - sMin),
      opacity: oMin + rand() * (oMax - oMin),
      twinkle,
      twinkleDur: twinkle ? 1.5 + rand() * 2.5 : 0,  // Faster twinkle: 1.5–4.0s
      twinkleDelay: twinkle ? rand() * 5 : 0,   // tighter offset
    };
  });
}

const FAR_STARS  = genStars(75, "far");
const MID_STARS  = genStars(50, "mid");
const NEAR_STARS = genStars(25, "near");

function StarLayer({ stars, layerRef }) {
  return (
    <div
      ref={layerRef}
      className="pointer-events-none absolute inset-x-[-5%] top-[-10%] bottom-[-50%]"
      aria-hidden="true"
      style={{ willChange: "transform" }}
    >
      {stars.map((s) => (
        <span
          key={s.id}
          style={{
            position: "absolute",
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "white",
            opacity: s.opacity,
            willChange: s.twinkle ? "opacity, transform" : "auto",
            animation: s.twinkle ? `starTwinkle ${s.twinkleDur}s ease-in-out ${s.twinkleDelay}s infinite alternate` : "none",
          }}
        />
      ))}
    </div>
  );
}

export default function StarField() {
  const farRef  = useRef(null);
  const midRef  = useRef(null);
  const nearRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  
  const rafRef  = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  // Single organic shooting star state
  const [shootingStar, setShootingStar] = useState(null);

  useEffect(() => {
    // Only run mouse parallax if the device has a fine pointer (desktop with mouse)
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    let onMouse = null;
    let onScroll = null;

    if (hasFinePointer) {
      onMouse = (e) => {
        mouseRef.current = {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        };
      };
      window.addEventListener("mousemove", onMouse, { passive: true });

      let tx = 0.5, ty = 0.5;
      let lastScrollY = -1;
      const tick = () => {
        const dx = mouseRef.current.x - tx;
        const dy = mouseRef.current.y - ty;
        const sy = window.scrollY;

        // Only write to DOM if coordinates are actively changing or user is scrolling
        if (Math.abs(dx) > 0.0001 || Math.abs(dy) > 0.0001 || sy !== lastScrollY) {
          tx += dx * 0.04;
          ty += dy * 0.04;
          lastScrollY = sy;

          const ox = (tx - 0.5) * 80;
          const oy = (ty - 0.5) * 80;

          // Stars parallax with hardware-accelerated translate3d (combines scroll + mouse)
          if (farRef.current)  farRef.current.style.transform  = `translate3d(${ox * 0.25}px, ${oy * 0.25 + sy * -0.06}px, 0)`;
          if (midRef.current)  midRef.current.style.transform  = `translate3d(${ox * 0.55}px, ${oy * 0.55 + sy * -0.14}px, 0)`;
          if (nearRef.current) nearRef.current.style.transform = `translate3d(${ox * 1.1}px, ${oy * 1.1 + sy * -0.25}px, 0)`;
          
          // Nebulas parallax (opposite direction for volume)
          if (blob1Ref.current) blob1Ref.current.style.transform = `translate3d(${-ox * 0.4}px, ${-oy * 0.4 + sy * -0.15}px, 0)`;
          if (blob2Ref.current) blob2Ref.current.style.transform = `translate3d(${-ox * 0.7}px, ${-oy * 0.7 + sy * -0.20}px, 0)`;
        }

        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } else {
      // On mobile/touch, run a high-performance passive scroll event listener
      onScroll = () => {
        const sy = window.scrollY;
        if (farRef.current)  farRef.current.style.transform  = `translate3d(0, ${sy * -0.06}px, 0)`;
        if (midRef.current)  midRef.current.style.transform  = `translate3d(0, ${sy * -0.14}px, 0)`;
        if (nearRef.current) nearRef.current.style.transform = `translate3d(0, ${sy * -0.25}px, 0)`;
        
        if (blob1Ref.current) blob1Ref.current.style.transform = `translate3d(0, ${sy * -0.15}px, 0)`;
        if (blob2Ref.current) blob2Ref.current.style.transform = `translate3d(0, ${sy * -0.20}px, 0)`;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll(); // Initialize positions
    }

    // ── Shooting Star Sequencer (Exactly 10s gap, 3 specific paths) ──
    const presetShootingStars = [
      { top: 5,  left: 10, angle: 30,  len: 160, travel: 1200, dur: 3.5 }, // TL -> BR
      { top: 15, left: 85, angle: 150, len: 160, travel: 1200, dur: 4 },   // TR -> BL
      { top: 80, left: 10, angle: -30, len: 140, travel: 1000, dur: 3.8 }, // BL -> TR
    ];
    let currentShootingIndex = 0;
    
    let timeoutId;
    const triggerShootingStar = () => {
      setShootingStar(null);
      setTimeout(() => {
        setShootingStar(presetShootingStars[currentShootingIndex]);
        currentShootingIndex = (currentShootingIndex + 1) % presetShootingStars.length;
        timeoutId = setTimeout(triggerShootingStar, 10000); // exactly 10s next
      }, 50);
    };
    
    // Initial start
    timeoutId = setTimeout(triggerShootingStar, 3000);

    return () => {
      if (hasFinePointer && onMouse) {
        window.removeEventListener("mousemove", onMouse);
      }
      if (!hasFinePointer && onScroll) {
        window.removeEventListener("scroll", onScroll);
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#02040c]"
      aria-hidden="true"
      role="presentation"
    >
      {/* ── Nebula Blobs (2 max) ── */}
      <div ref={blob1Ref} style={{
        position: "absolute", top: "10%", left: "15%",
        width: "40vw", height: "40vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(30,20,80,0.4) 0%, transparent 65%)",
        filter: "blur(60px)",
        animation: "auraDrift 16s ease-in-out infinite alternate",
        willChange: "transform",
      }} />
      <div ref={blob2Ref} style={{
        position: "absolute", bottom: "10%", right: "10%",
        width: "35vw", height: "35vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(20,50,90,0.3) 0%, transparent 60%)",
        filter: "blur(50px)",
        animation: "auraDrift 22s ease-in-out infinite alternate-reverse",
        willChange: "transform",
      }} />

      {/* ── 3 Star Layers ── */}
      <StarLayer stars={FAR_STARS}  layerRef={farRef}  />
      <StarLayer stars={MID_STARS}  layerRef={midRef}  />
      <StarLayer stars={NEAR_STARS} layerRef={nearRef} />

      {/* ── Single Shooting Star ── */}
      {shootingStar && (
        <div
          style={{
            position: "absolute",
            top: `${shootingStar.top}%`,
            left: `${shootingStar.left}%`,
            transform: `rotate(${shootingStar.angle}deg)`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <span
            className="shooting-star"
            style={{
              width: `${shootingStar.len}px`,
              animationDuration: `${shootingStar.dur}s`,
              animationIterationCount: 1,
              "--ss-travel": `${shootingStar.travel}px`,
            }}
          />
        </div>
      )}
    </div>
  );
}
