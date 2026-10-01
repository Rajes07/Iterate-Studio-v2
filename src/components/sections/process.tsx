import { useEffect, useRef, useState } from "react";
import { BarChart3, Code2, MousePointer2, PenTool } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { gsap, NO_PREFERENCE, registerGsap, ScrollTrigger } from "@/lib/motion";

const icons = [MousePointer2, PenTool, Code2, BarChart3] as const;
const steps = site.process;

export function ProcessSection() {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);

  // Desktop: pin the section and scrub through the four steps.
  useEffect(() => {
    registerGsap();
    const mm = gsap.matchMedia();
    mm.add(`(min-width: 1024px) and ${NO_PREFERENCE}`, () => {
      trigger.current = ScrollTrigger.create({
        trigger: root.current,
        start: "top top+=72",
        end: () => `+=${window.innerHeight * (steps.length - 1)}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(".process-progress", { scaleY: self.progress });
          setActive(Math.min(steps.length - 1, Math.round(self.progress * (steps.length - 1))));
        },
      });
      return () => { trigger.current = null; };
    });
    return () => mm.revert();
  }, []);

  const select = (index: number) => {
    setActive(index);
    const st = trigger.current;
    if (st) window.scrollTo({ top: st.start + (index / (steps.length - 1)) * (st.end - st.start) });
  };

  return (
    <section id="process" ref={root} className="process-section scroll-mt-20 bg-card">
      <div className="site-container py-16 lg:py-14">
        <div className="section-heading">
          <p className="eyebrow">How we work</p>
          <h2>From first call to measurable growth.</h2>
        </div>

        {/* Desktop: step tabs + pinned panel */}
        <div className="mt-10 hidden gap-12 lg:grid lg:grid-cols-[.8fr_1.2fr]">
          <div className="relative grid content-start gap-1 pl-6" role="tablist" aria-label="Process steps">
            <span className="absolute bottom-0 left-0 top-0 w-px bg-border" />
            <span className="process-progress absolute left-0 top-0 h-full w-px origin-top bg-primary" />
            {steps.map((step, i) => (
              <button key={step.title} role="tab" aria-selected={active === i} onClick={() => select(i)} className={cn("process-tab", active === i && "is-active")}>
                <span className="text-sm">0{i + 1}</span>
                <span className="text-2xl font-semibold">{step.title}</span>
              </button>
            ))}
          </div>
          <div className="process-stage">
            {steps.map((step, i) => {
              const Icon = icons[i] ?? MousePointer2;
              return (
                <div key={step.title} role="tabpanel" aria-hidden={active !== i} className={cn("process-panel", active === i && "is-active")}>
                  <div className="flex items-center gap-3"><span className="icon-tile"><Icon /></span><span className="timing-pill">{step.timing}</span></div>
                  <h3 className="mt-5 text-3xl font-semibold">{step.title}</h3>
                  <p className="mt-3 max-w-lg text-muted-foreground">{step.text}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">{step.tools.map((tool) => <li key={tool} className="tool-chip">{tool}</li>)}</ul>
                  <img src={step.image} alt="" width={800} height={500} loading="lazy" decoding="async" className="process-image" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / tablet: vertical stacked list */}
        <ol className="mt-10 grid gap-5 lg:hidden">
          {steps.map((step, i) => {
            const Icon = icons[i] ?? MousePointer2;
            return (
              <li key={step.title} className="process-panel is-static">
                <div className="flex items-center justify-between"><span className="icon-tile"><Icon /></span><span className="eyebrow">Step 0{i + 1}</span></div>
                <h3 className="mt-5 text-2xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.text}</p>
                <ul className="mt-4 flex flex-wrap gap-2">{step.tools.map((tool) => <li key={tool} className="tool-chip">{tool}</li>)}</ul>
                <img src={step.image} alt="" width={800} height={500} loading="lazy" decoding="async" className="process-image" />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
