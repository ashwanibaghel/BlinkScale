"use client";

/**
 * GRAVITY FIELD
 * ─────────────
 * On mousemove, elements with [data-gravity] are gently attracted toward the cursor.
 * Max movement: 5px
 * Falloff radius: 150px (quadratic — stronger near cursor, zero at 150px)
 * Applied ONLY to small UI elements (icons, numbers) — never moves cards or layout
 */

import { useEffect, useRef } from "react";

export default function GravityField({
  radius  = 120,   // px — STRICT radius limit
  maxPull = 4,     // px — STRICT translation limit
}) {
  const rafRef  = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 }); // off-screen default = no pull
  const loopActiveRef = useRef(false);

  useEffect(() => {
    // Only run if the device has a fine pointer (desktop with mouse)
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) {
      return undefined;
    }

    const onMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      // Resume loop if mouse is active and loop is not running
      if (!loopActiveRef.current) {
        loopActiveRef.current = true;
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
      // Resume loop one last time to let elements snap back
      if (!loopActiveRef.current) {
        loopActiveRef.current = true;
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    const tick = () => {
      const els = document.querySelectorAll("[data-gravity]");
      const { x: mx, y: my } = mouseRef.current;
      
      let elementsStillMoving = false;

      els.forEach((el) => {
        // If mouse is off-screen, reset element transform
        if (mx === -9999) {
          if (el.style.transform && el.style.transform !== "translate(0px, 0px)" && el.style.transform !== "translate(0, 0)") {
            el.style.transform = "translate(0, 0)";
            el.style.transition = "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";
          }
          return;
        }

        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;

        const dx   = mx - cx;
        const dy   = my - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius && dist > 0) {
          // Quadratic falloff — much weaker at edges, stronger near cursor
          const weight = Math.pow(1 - dist / radius, 2);
          const px = (dx / dist) * weight * maxPull;
          const py = (dy / dist) * weight * maxPull;

          el.style.transform  = `translate(${px.toFixed(2)}px, ${py.toFixed(2)}px)`;
          el.style.transition = "none"; // RAF-driven, no CSS transition on tick
          elementsStillMoving = true;
        } else {
          // If the element has transform applied, smoothly snap back
          if (el.style.transform && el.style.transform !== "translate(0px, 0px)" && el.style.transform !== "translate(0, 0)") {
            el.style.transform  = "translate(0, 0)";
            el.style.transition = "transform 0.55s cubic-bezier(0.22,1,0.36,1)";
            elementsStillMoving = true; // Still moving (snapping back)
          }
        }
      });

      // If mouse is off-screen or no elements are inside the radius / snapping back,
      // we can pause the animation loop to save CPU.
      if (mx === -9999 || (!elementsStillMoving && mx !== -9999)) {
        loopActiveRef.current = false;
        rafRef.current = null;
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    return () => {
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      // Reset all gravity elements on unmount
      document.querySelectorAll("[data-gravity]").forEach((el) => {
        el.style.transform  = "translate(0, 0)";
        el.style.transition = "transform 0.55s cubic-bezier(0.22,1,0.36,1)";
      });
    };
  }, [radius, maxPull]);

  return null; // Invisible — pure interaction layer
}
