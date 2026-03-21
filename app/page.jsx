import About from "@/components/About";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BlinkScale",
  description:
    "BlinkScale creates websites, software, IT support systems, hardware sourcing journeys, and consultation-driven digital experiences.",
  url: "https://blinkscale.example",
  email: "hello@blinkscale.studio",
  areaServed: "Worldwide",
  knowsAbout: [
    "Website Development",
    "Software Development",
    "IT Support Services",
    "Hardware Supply",
    "Business Consultation",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <div className="relative isolate overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <About />
          <Process />
          <Portfolio />
          <Testimonials />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </>
  );
}
