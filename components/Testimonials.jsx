import { testimonials } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import StarRating from "@/components/ui/StarRating";
import TiltCard from "@/components/ui/TiltCard";
import { QuoteIcon } from "@/components/ui/Icons";

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

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.08}>
              <TiltCard className="h-full">
                <article className="glass-panel h-full rounded-[28px] p-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-blue-100">
                    <QuoteIcon className="h-5 w-5" />
                  </div>
                  <StarRating className="mt-6" />
                  <p className="mt-6 text-sm leading-8 text-slate-200/95">
                    {testimonial.review}
                  </p>
                  <div className="mt-8 border-t border-white/10 pt-5">
                    <div className="text-base font-semibold text-white">
                      {testimonial.name}
                    </div>
                    <div className="mt-1 text-sm text-slate-400">
                      {testimonial.role}
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
