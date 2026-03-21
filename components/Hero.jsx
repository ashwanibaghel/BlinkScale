import MagneticButton from "@/components/ui/MagneticButton";

const heroSignals = [
  {
    label: "Lightning-fast builds",
    title: "Speed",
    detail: "Performance tuned from structure to polish.",
    position:
      "xl:left-8 xl:top-10 2xl:left-12 2xl:top-12",
  },
  {
    label: "Always-on partnership",
    title: "24/7 Support",
    detail: "Reliable delivery rhythms that stay calm after launch.",
    position:
      "xl:right-8 xl:top-16 2xl:right-12 2xl:top-16",
  },
  {
    label: "Built for growth",
    title: "Scalable",
    detail: "Flexible systems ready for the next chapter.",
    position:
      "xl:left-16 xl:bottom-16 2xl:left-24 2xl:bottom-20",
  },
  {
    label: "Premium-led delivery",
    title: "Secure",
    detail: "Calm architecture with strong operational footing.",
    position:
      "xl:right-12 xl:bottom-14 2xl:right-16 2xl:bottom-18",
  },
];

const heroStats = [
  "Design-led systems",
  "Scalable engineering",
  "Reliable post-launch support",
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="section-anchor relative overflow-hidden pb-20 pt-32 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-40"
    >
      <div className="section-shell">
        <div className="glass-panel glow-frame relative overflow-hidden rounded-[38px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-16 xl:py-24">
          <div className="hero-grid absolute inset-0 opacity-35" aria-hidden="true" />
          <div className="hero-blob hero-blob-one" aria-hidden="true" />
          <div className="hero-blob hero-blob-two" aria-hidden="true" />
          <div className="hero-blob hero-blob-three" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-x-[12%] top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(130,112,255,0.18),transparent_68%)]"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center xl:min-h-[34rem] xl:justify-center">
            <span className="eyebrow">Premium Digital Products</span>
            <h1 className="mt-8 max-w-[14ch] text-5xl font-semibold leading-[0.96] text-white sm:text-6xl lg:text-7xl xl:text-[5rem]">
              We Build Digital Experiences That Feel Alive.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Helping businesses grow through smart, scalable IT solutions.
              Beautifully designed products, resilient systems, and support that
              keeps momentum moving.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <MagneticButton href="#contact">Get Started</MagneticButton>
              <MagneticButton href="#services" variant="ghost">
                View Services
              </MagneticButton>
            </div>

            <div className="mt-14 grid w-full max-w-5xl gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {heroSignals.map((signal, index) => (
                <div
                  key={signal.title}
                  className={`rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md ${
                    index % 2 === 1 ? "xl:translate-y-4" : ""
                  }`}
                >
                  <div className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
                    {signal.label}
                  </div>
                  <div className="mt-4 text-2xl font-semibold text-white">
                    {signal.title}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {signal.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {heroStats.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>

            <a
              href="#services"
              className="focus-ring mt-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-slate-200 transition duration-300 hover:border-blue-300/25 hover:bg-blue-400/10 hover:text-white"
            >
              <span>Scroll to explore</span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-base">
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
