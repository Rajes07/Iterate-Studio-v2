import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { ServiceVisual } from "@/components/visuals/service-visuals";
import { DrawLine, Reveal, SplitHeading } from "@/components/motion";
import { gsap, NO_PREFERENCE, registerGsap } from "@/lib/motion";

/** Stacked sticky cards: each previous card scales back to .94 and dims as the next one slides over it. */
export function ServicesSection() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const cards = gsap.utils.toArray<HTMLElement>(".service-card", root.current ?? undefined);

    // Mini UIs inside each card play once when the card comes into view.
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { threshold: 0.45 });
    cards.forEach((c) => io.observe(c));

    const mm = gsap.matchMedia();
    mm.add(NO_PREFERENCE, () => {
      cards.slice(0, -1).forEach((card, i) => {
        const trigger = { trigger: cards[i + 1]!, start: "top bottom", end: "top top+=96", scrub: true };
        gsap.to(card.querySelector(".service-card-inner"), { scale: 0.94, ease: "none", scrollTrigger: trigger });
        gsap.to(card.querySelector(".service-dim"), { opacity: 0.15, ease: "none", scrollTrigger: trigger });
      });
    });
    return () => { io.disconnect(); mm.revert(); };
  }, []);

  return (
    <section id="services" className="section-pad scroll-mt-20">
      <div className="site-container">
        <div className="section-heading">
          <DrawLine className="mb-8" />
          <p className="eyebrow section-eyebrow">What we do</p>
          <SplitHeading>Products that <em className="accent-italic">perform</em>, shipped in weeks.</SplitHeading>
          <Reveal as="p" delay={0.2}>One senior team across strategy, design and engineering, focused on the outcomes you care about: more customers, faster launches, better products.</Reveal>
        </div>
        <div ref={root} className="mt-14">
          {site.services.map((service, index) => (
            <article key={service.title} className="service-card" style={{ top: `calc(96px + ${index} * 16px)` }}>
              <div className="service-card-inner">
                <div className="service-dim" aria-hidden="true" />
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
