import { useEffect, useRef, type MouseEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { REDUCED_MOTION } from "@/lib/motion";

export function WorkSection() {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const move = useRef<(direction: number) => void>(() => {});
  const dragged = useRef(false);

  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;
    (async () => {
      const [{ default: gsap }, { Draggable }, { InertiaPlugin }] = await Promise.all([
        import("gsap"),
        import("gsap/Draggable"),
        import("gsap/InertiaPlugin"),
      ]);
      if (cancelled || !viewport.current || !track.current) return;
      gsap.registerPlugin(Draggable, InertiaPlugin);
      const reduce = window.matchMedia(REDUCED_MOTION).matches;
      const minX = () => Math.min(0, viewport.current!.clientWidth - track.current!.scrollWidth);

      const drag = Draggable.create(track.current, {
        type: "x",
        bounds: { minX: minX(), maxX: 0 },
        inertia: !reduce,
        edgeResistance: 0.8,
        allowContextMenu: true,
        onDragStart() { dragged.current = true; gsap.to(cursor.current, { scale: 0.8, duration: 0.2 }); },
        onDragEnd() { gsap.to(cursor.current, { scale: 1, duration: 0.2 }); setTimeout(() => { dragged.current = false; }, 0); },
      })[0]!;
      const onResize = () => { drag.applyBounds({ minX: minX(), maxX: 0 }); };
      window.addEventListener("resize", onResize);

      move.current = (direction) => {
        const step = viewport.current!.clientWidth * 0.8;
        const x = gsap.utils.clamp(minX(), 0, (gsap.getProperty(track.current!, "x") as number) - direction * step);
        gsap.to(track.current, { x, duration: reduce ? 0 : 0.7, ease: "power3.out", onUpdate: () => drag.update() });
      };

      // "DRAG" cursor pill, fine pointers only.
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const vp = viewport.current;
      const pill = cursor.current;
      if (fine && pill) {
        const qx = gsap.quickTo(pill, "x", { duration: 0.35, ease: "power3" });
        const qy = gsap.quickTo(pill, "y", { duration: 0.35, ease: "power3" });
        const onMove = (e: PointerEvent) => { qx(e.clientX); qy(e.clientY); };
        const onEnter = () => gsap.to(pill, { opacity: 1, scale: 1, duration: 0.25 });
        const onLeave = () => gsap.to(pill, { opacity: 0, scale: 0.6, duration: 0.25 });
        vp.addEventListener("pointermove", onMove);
        vp.addEventListener("pointerenter", onEnter);
        vp.addEventListener("pointerleave", onLeave);
        vp.classList.add("has-drag-cursor");
        cleanup = () => {
          window.removeEventListener("resize", onResize);
          vp.removeEventListener("pointermove", onMove);
          vp.removeEventListener("pointerenter", onEnter);
          vp.removeEventListener("pointerleave", onLeave);
          vp.classList.remove("has-drag-cursor");
          drag.kill();
        };
      } else {
        cleanup = () => { window.removeEventListener("resize", onResize); drag.kill(); };
      }
    })();
    return () => { cancelled = true; cleanup(); };
  }, []);

  return (
    <section id="work" className="section-pad overflow-hidden scroll-mt-20">
      <div className="site-container">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5">
          <div className="section-heading">
            <p className="eyebrow">Latest work</p>
            <h2>Concepts we&apos;d love to build with you.</h2>
            <p>Live sites and concept case studies, from first sketch to polished interface. Drag to explore.</p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <Button variant="outline" size="icon" className="carousel-arrow" onClick={() => move.current(-1)} aria-label="Previous project"><ArrowLeft /></Button>
            <Button variant="outline" size="icon" className="carousel-arrow" onClick={() => move.current(1)} aria-label="Next project"><ArrowRight /></Button>
          </div>
        </div>
      </div>
      <div ref={viewport} className="work-viewport" aria-label="Project carousel">
        <div ref={track} className="work-track">
          {projects.map((project) => {
            const external = project.type === "external";
            const onClick = (e: MouseEvent<HTMLAnchorElement>) => { if (dragged.current) e.preventDefault(); };
            return (
              <article key={project.slug} className="work-card group">
                <div className="work-image">
                  <img src={project.thumbnail} alt={`${project.name} preview`} width={800} height={500} loading="lazy" decoding="async" draggable={false} />
                  <span className="status-pill"><i className={external ? "status-live" : "status-concept"} />{external ? "Live ↗" : "Case study"}</span>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="eyebrow">{project.category}</p>
                  <h3 className="mt-3 text-xl font-semibold sm:text-2xl">{project.name}</h3>
                  <p className="mt-2 min-h-12 text-sm text-muted-foreground">{project.tagline}</p>
                  {external ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" draggable={false} onClick={onClick} className="text-link mt-4 w-fit">Visit site <ArrowUpRight /></a>
                  ) : (
                    <Link to="/work/$slug" params={{ slug: project.slug }} draggable={false} onClick={onClick} className="text-link mt-4 w-fit">View case study <ArrowUpRight /></Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <div ref={cursor} className="drag-cursor" aria-hidden="true"><span>DRAG</span></div>
    </section>
  );
}
