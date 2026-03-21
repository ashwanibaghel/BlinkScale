"use client";

import { testimonials } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import StarRating from "@/components/ui/StarRating";
import { QuoteIcon } from "@/components/ui/Icons";

// Duplicate the testimonials array so the marquee loops seamlessly
const doubled = [...testimonials, ...testimonials];

function TestimonialCard({ testimonial }) {
  return (
    <article className="glass-panel h-full min-w-[320px] max-w-[360px] rounded-[28px] p-6 sm:min-w-[360px]">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-blue-100">
        <QuoteIcon className="h-5 w-5" />
      </div>
      <StarRating className="mt-6" />
      <p className="mt-6 text-sm leading-8 text-slate-200/95">{testimonial.review}</p>
      <div className="mt-8 border-t border-white/10 pt-5">
        <div className="text-base font-semibold text-white">{testimonial.name}</div>
        <div className="mt-1 text-sm text-slate-400">{testimonial.role}</div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-anchor py-24 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="Kind words from teams who wanted something sharper than a standard agency site."
            description="Every engagement is meant to feel thoughtful, steady, and surprisingly effortless from the client side."
          />
        </Reveal>
      </div>

      {/* Desktop grid — staggered TiltCard reveals */}
      <div className="section-shell mt-14 hidden lg:block">
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.09}>
              <TiltCard className="h-full">
                <TestimonialCard testimonial={testimonial} />
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Mobile / tablet: infinite horizontal marquee */}
      <div className="mt-14 overflow-hidden lg:hidden">
        {/* Fade masks on edges */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#050814] to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#050814] to-transparent"
          />
          <div className="marquee-track gap-4 px-4">
            {doubled.map((testimonial, i) => (
              <div key={i} className="flex-shrink-0 px-2">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
