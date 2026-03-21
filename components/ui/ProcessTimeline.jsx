export default function ProcessTimeline({ steps }) {
  return (
    <div className="mt-16 grid gap-6 xl:grid-cols-[0.4fr_0.6fr]">
      <div className="glass-panel glow-frame relative overflow-hidden rounded-[34px] px-6 py-8 sm:px-8 sm:py-10 xl:sticky xl:top-24 xl:self-start">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(84,128,255,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(124,96,255,0.14),transparent_36%)]"
          aria-hidden="true"
        />
        <div className="relative z-10">
          <span className="eyebrow">Delivery Flow</span>
          <h3 className="mt-8 text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Clear steps, calm execution, and support that stays close after launch.
          </h3>
          <p className="mt-5 text-sm leading-8 text-slate-300 sm:text-base">
            Every stage stays visible, collaborative, and paced to keep momentum
            high without turning the process into noise. Clients always know what
            is happening, why it matters, and what comes next.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[22px] border border-white/[0.08] bg-white/[0.04] px-4 py-4"
              >
                <div className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                  Step 0{index + 1}
                </div>
                <div className="mt-3 text-base font-medium text-white">
                  {step.title}
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  {step.outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative pl-0 sm:pl-8">
        <div
          className="absolute bottom-6 left-4 top-6 hidden w-px bg-gradient-to-b from-blue-300/60 via-violet-300/30 to-transparent sm:block"
          aria-hidden="true"
        />
        <div className="space-y-5">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="glass-panel glow-frame relative overflow-hidden rounded-[30px] px-6 py-6 sm:px-8 sm:py-8"
            >
              <div
                className="absolute inset-0 opacity-90"
                style={{
                  background: `radial-gradient(circle at top right, ${step.accent}, transparent 34%)`,
                }}
                aria-hidden="true"
              />
              <div
                className="absolute left-[-0.45rem] top-10 hidden h-4 w-4 rounded-full border border-blue-200/50 bg-[#9ab3ff] shadow-[0_0_24px_rgba(122,146,255,0.6)] sm:block"
                aria-hidden="true"
              />

              <div className="relative z-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-base font-semibold text-white">
                    0{index + 1}
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-200">
                    {step.outcome}
                  </div>
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-white sm:text-[1.9rem]">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-8 text-slate-300 sm:text-base">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
