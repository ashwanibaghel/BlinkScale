"use client";

import { useState } from "react";
import { services } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import {
  ChipIcon,
  CodeIcon,
  GlobeIcon,
  StrategyIcon,
  SupportIcon,
} from "@/components/ui/Icons";

const iconMap = {
  website: GlobeIcon,
  software: CodeIcon,
  support: SupportIcon,
  hardware: ChipIcon,
  consultation: StrategyIcon,
};

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="services"
      className="section-anchor section-flow-fade relative z-20 -mt-28 pb-24 pt-16 sm:pb-28"
    >
      <div className="section-shell">
        <Reveal>
          <div className="glass-panel glow-frame rounded-[36px] px-5 py-8 sm:px-8 sm:py-10">
            <SectionHeading
              eyebrow="Services"
              title="Services that emerge as a system, not a pile of disconnected deliverables."
              description="Hover through the stack and the experience expands. Each capability is designed to feel like part of one fluid operating model."
            />
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 lg:grid-cols-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            const isActive = activeIndex === index;

            return (
              <TiltCard
                key={service.title}
                className={`h-full ${isActive ? "lg:col-span-2" : "lg:col-span-1"}`}
              >
                <article
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActiveIndex(index);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className={`group glow-frame relative flex h-full min-h-[300px] cursor-pointer flex-col overflow-hidden rounded-[30px] border p-6 transition-[border-color,background-color,box-shadow,transform] duration-300 ease-out ${
                    isActive
                      ? "border-blue-300/20 bg-[#09111f]/[0.9] shadow-[0_22px_60px_rgba(45,86,210,0.18)]"
                      : "border-white/[0.08] bg-[#09111f]/[0.78] hover:border-white/15"
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.accent} transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-60"
                    }`}
                    aria-hidden="true"
                  />
                  <div
                    className={`absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_42%)] transition duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  />
                  <div
                    className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-blue-100 shadow-[0_0_30px_rgba(80,126,255,0.18)] transition duration-500 group-hover:border-blue-300/30 group-hover:bg-blue-400/10 group-hover:shadow-[0_0_50px_rgba(80,126,255,0.26)]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="text-right">
                        <div className="text-[11px] uppercase tracking-[0.26em] text-slate-500">
                          0{index + 1}
                        </div>
                        <div className="mt-2 text-xs uppercase tracking-[0.26em] text-blue-100/75">
                          {service.stat}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex-1">
                      <h3 className="text-2xl font-semibold text-white">
                        {service.title}
                      </h3>

                      <div
                        className={`transition-[opacity,transform] duration-300 ${
                          isActive ? "opacity-100 translate-y-0" : "opacity-80 translate-y-0"
                        }`}
                      >
                        <p className="mt-4 text-sm leading-7 text-slate-300">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-out ${
                        isActive ? "mt-5 max-h-48 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                        <p className="text-sm leading-7 text-slate-200/95">
                          {service.extra}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {service.bullets.map((bullet) => (
                            <span
                              key={bullet}
                              className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200"
                            >
                              {bullet}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
