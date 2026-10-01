import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { ServiceVisual } from "@/components/visuals/service-visuals";
import { gsap, NO_PREFERENCE, registerGsap } from "@/lib/motion";

export function ServicesSection() {
  const root = useRef<HTMLDivElement>(null);

  // Each card scales back slightly as the next one slides over it.
  useEffect(() => {
    registerGsap();
    const mm = gsap.matchMedia();
    mm.add(NO_PREFERENCE, () => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card", root.current ?? undefined);
      cards.slice(0, -1).forEach((card, i) => {
        gsap.to(card.querySelector(".service-card-inner"), {
          scale: 0.94,
          ease: "none",
          scrollTrigger: { trigger: cards[i + 1]!, start: "top bottom", end: "top top+=96", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="services" className="section-pad scroll-mt-20">
      <div className="site-container">
        <div className="section-heading">
          <p className="eyebrow">What we do</p>
          <h2>Products that perform, shipped in weeks.</h2>
          <p>One senior team across strategy, design and engineering, focused on the outcomes you care about: more customers, faster launches, better products.</p>
        </div>
        <div ref={root} className="mt-14">
          {site.services.map((service, index) => (
            <article key={service.title} className="service-card" style={{ top: `${5.5 + index * 0.75}rem` }}>
              <div className="service-card-inner">
                <div className="flex flex-col justify-between gap-8">
                  <div>
                    <span className="service-number">/{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="mt-5 text-3xl font-semibold sm:text-4xl">{service.title}</h3>
                    <p className="mt-4 text-lg font-medium">{service.lead}</p>
                    <p className="mt-3 max-w-md text-muted-foreground">{service.description}</p>
                  </div>
                  <a href="#contact" className="text-link w-fit">Get started <ArrowUpRight /></a>
                </div>
                <ServiceVisual index={index} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
