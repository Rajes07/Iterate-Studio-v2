import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { ProcessVisual } from "@/components/visuals/process-visuals";
import { DrawLine, Reveal, SplitHeading } from "@/components/motion";
import { gsap, NO_PREFERENCE, registerGsap, ScrollTrigger } from "@/lib/motion";

const steps = site.process;

/** Sticky step counter + progress line on the left; four step cards on the right that light up as they pass the middle of the screen. */
export function ProcessSection() {
  const grid = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    registerGsap();
    const triggers: ScrollTrigger[] = [];
    const cards = gsap.utils.toArray<HTMLElement>(".pstep", grid.current ?? undefined);
    cards.forEach((card, i) => {
      triggers.push(ScrollTrigger.create({ trigger: card, start: "top 55%", end: "bottom 55%", onToggle: (self) => { if (self.isActive) setActive(i); } }));
    });
    const mm = gsap.matchMedia();
    mm.add(NO_PREFERENCE, () => {
      gsap.fromTo(fill.current, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: grid.current, start: "top 55%", end: "bottom 55%", scrub: 1 } });
    });
    return () => { triggers.forEach((t) => t.kill()); mm.revert(); };
  }, []);

  return (
    <section id="process" className="process-section section-pad scroll-mt-20 bg-card">
      <div className="site-container">
        <div className="section-heading">
          <DrawLine className="mb-8" />
          <p className="eyebrow section-eyebrow">How we work</p>
          <SplitHeading>From first call to <em className="accent-italic">measurable</em> growth.</SplitHeading>
        </div>

        <div ref={grid} className="process-grid">
          <div className="process-sticky" aria-hidden="true">
            <div className="process-track"><b ref={fill} /></div>
            <div className="process-bignum">0{active + 1}</div>
          </div>
          <ol className="grid gap-6">
            {steps.map((step, i) => (
              <li key={step.title} className={cn("pstep", active === i && "is-active")} aria-current={active === i ? "step" : undefined}>
                <Reveal as="div">
                  <p className="pstep-label">Step 0{i + 1} · {step.timing}</p>
                  <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">{step.title}</h3>
                  <p className="mt-3 max-w-xl text-muted-foreground">{step.text}</p>
                  <ProcessVisual index={i} />
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
