import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";

export default function FinalCta() {
  return (
    <section id="contact" className="section-anchor py-24 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <div className="glass-panel relative overflow-hidden rounded-[36px] px-6 py-14 text-center sm:px-10 sm:py-20">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(82,132,255,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(122,92,255,0.24),transparent_40%)]"
              aria-hidden="true"
            />
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
