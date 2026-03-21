import { processSteps } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ProcessTimeline from "@/components/ui/ProcessTimeline";

export default function Process() {
  return (
    <section id="process" className="section-anchor py-24 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Process"
            title="A smooth delivery rhythm from discovery to long-term support."
            description="The work stays transparent, collaborative, and measured so every step adds clarity rather than friction."
          />
        </Reveal>
        <ProcessTimeline steps={processSteps} />
      </div>
    </section>
  );
}
