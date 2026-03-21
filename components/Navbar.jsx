import MagneticButton from "@/components/ui/MagneticButton";
import { BrandMark } from "@/components/ui/Icons";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#portfolio" },
  { label: "Reviews", href: "#testimonials" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="section-shell">
        <div className="glass-panel flex items-center justify-between rounded-full px-4 py-3 sm:px-5">
          <a
            href="#hero"
            className="focus-ring inline-flex items-center gap-3 rounded-full"
            aria-label="BlinkScale home"
          >
            <BrandMark className="h-10 w-10" />
            <div>
              <div className="font-display text-base font-semibold text-white">
                BlinkScale
              </div>
              <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
                IT Studio
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="focus-ring rounded-full text-sm text-slate-300 transition-colors duration-300 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="mailto:hello@blinkscale.studio"
              className="focus-ring hidden rounded-full px-3 py-2 text-sm text-slate-300 transition-colors duration-300 hover:text-white md:inline-flex"
            >
              hello@blinkscale.studio
            </a>
            <MagneticButton href="#contact" variant="secondary">
              Start a Project
            </MagneticButton>
          </div>
        </div>
      </div>
    </header>
  );
}
