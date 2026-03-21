import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/Icons";

const bullets = [
  "Client-focused approach",
  "Custom scalable solutions",
  "Fast and reliable delivery",
];

export default function About() {
  return (
    <section id="about" className="section-anchor py-24 sm:py-28">
      <div className="section-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Reveal>
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

          <Reveal delay={0.08}>
            <div>
              <SectionHeading
                eyebrow="About"
                title="A calm, strategic team built to turn complexity into momentum."
                description="We help ambitious businesses launch digital platforms that look refined, perform fast, and scale with confidence. Our role is to make technology feel elegant, not overwhelming."
              />

              <div className="mt-10 space-y-4">
                {bullets.map((item) => (
                  <div
                    key={item}
                    className="glass-panel flex items-center gap-4 rounded-2xl px-5 py-4"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-400/10 text-emerald-200">
                      <CheckIcon className="h-5 w-5" />
                    </span>
                    <span className="text-base font-medium text-white">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-3xl font-semibold text-white">10x</div>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Clearer digital journeys through thoughtful simplification.
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-3xl font-semibold text-white">24/7</div>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Reliable support habits around uptime, fixes, and guidance.
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-3xl font-semibold text-white">1 Team</div>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Strategy, design, build, and support staying tightly aligned.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
