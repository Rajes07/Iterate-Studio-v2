import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { gsap, getLenis, registerGsap, ScrollTrigger } from "@/lib/motion";

const N = projects.length;
const STEP = 470; // px between card centres on the arc
const ARC_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

function WorkCard({ project, onClick, tabIndex }: { project: Project; onClick?: (e: MouseEvent<HTMLAnchorElement>) => void; tabIndex?: number }) {
  const external = project.type === "external";
  const body = (
    <>
      <div className="work-image">
        <img src={project.thumbnail} alt={`${project.name} preview`} width={900} height={560} loading="lazy" decoding="async" draggable={false} />
        <span className="status-pill"><i className={external ? "status-live" : "status-concept"} />{external ? "Live ↗" : "Case study"}</span>
      </div>
      <div className="work-info">
        <div className="min-w-0">
          <h3 className="truncate text-xl font-semibold">{project.name}</h3>
          <p className="mt-1 truncate text-sm text-muted-foreground">{project.tagline}</p>
        </div>
        <span className="work-arrow" aria-hidden="true"><ArrowRight /></span>
      </div>
    </>
  );
  return external ? (
    <a href={project.url} target="_blank" rel="noopener noreferrer" draggable={false} tabIndex={tabIndex} onClick={onClick} className="work-card group">{body}</a>
  ) : (
    <Link to="/work/$slug" params={{ slug: project.slug }} draggable={false} tabIndex={tabIndex} onClick={onClick} className="work-card group">{body}</Link>
  );
}

export function WorkSection() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const swipe = useRef<HTMLDivElement>(null);
  const goTo = useRef<(index: number) => void>(() => {});
  const moved = useRef(false);
  const [active, setActive] = useState(0);

  // Desktop: pinned 3D arc driven by scroll (scrub), also draggable.
  useEffect(() => {
    registerGsap();
    const mm = gsap.matchMedia();
    mm.add(ARC_QUERY, () => {
      const cards = gsap.utils.toArray<HTMLElement>(".work-arc-card", stage.current ?? undefined);
      const render = (p: number) => {
        cards.forEach((card, i) => {
          const d = i - p, a = Math.abs(d), side = Math.min(a, 1);
          gsap.set(card, {
            x: d * STEP,
            y: Math.min(a * a, 6) * 12,
            z: -Math.min(a, 2) * 110,
            rotateY: -Math.sign(d) * 12 * side,
            scale: 1 - 0.15 * side,
            opacity: a <= 1 ? 1 - 0.4 * a : Math.max(0, 0.6 - 0.35 * (a - 1) * 1.4),
            zIndex: Math.round(100 - a * 10),
            pointerEvents: a > 2.6 ? "none" : "auto",
          });
        });
        setActive(Math.round(Math.min(N - 1, Math.max(0, p))));
      };
      render(0);

      const st = ScrollTrigger.create({
        trigger: section.current,
        start: "top top+=72",
        end: () => `+=${window.innerHeight * 0.5 * (N - 1)}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        refreshPriority: 2,
        snap: { snapTo: 1 / (N - 1), duration: { min: 0.2, max: 0.5 }, delay: 0.08, ease: "power2.out" },
        onUpdate: (self) => render(self.progress * (N - 1)),
      });

      const progress = () => st.progress * (N - 1);
      const scrollToP = (p: number) => {
        const y = st.start + (gsap.utils.clamp(0, N - 1, p) / (N - 1)) * (st.end - st.start);
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(y, { immediate: true, force: true }); else window.scrollTo(0, y);
      };
      const proxy = { p: 0 };
      goTo.current = (index) => {
        proxy.p = progress();
        gsap.to(proxy, { p: gsap.utils.clamp(0, N - 1, index), duration: 0.8, ease: "power3.out", overwrite: true, onUpdate: () => scrollToP(proxy.p) });
      };

      // Drag with inertia: pointer movement scrubs the same progress value.
      const el = stage.current!;
      let startX = 0, startP = 0, lastX = 0, lastT = 0, vel = 0, down = false;
      const onDown = (e: PointerEvent) => {
        if (e.button !== 0) return;
        down = true; moved.current = false; gsap.killTweensOf(proxy);
        startX = lastX = e.clientX; startP = progress(); lastT = performance.now(); vel = 0;
        gsap.to(cursor.current, { scale: 0.8, duration: 0.2 });
      };
      const onMove = (e: PointerEvent) => {
        if (!down) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 5) moved.current = true;
        const now = performance.now();
        vel = (lastX - e.clientX) / STEP / Math.max(1, now - lastT) * 1000;
        lastX = e.clientX; lastT = now;
        if (moved.current) { el.setPointerCapture(e.pointerId); scrollToP(startP - dx / STEP); }
      };
      const onUp = () => {
        if (!down) return;
        down = false;
        gsap.to(cursor.current, { scale: 1, duration: 0.2 });
        if (moved.current) { goTo.current(Math.round(progress() + gsap.utils.clamp(-2, 2, vel * 0.25))); setTimeout(() => { moved.current = false; }, 0); }
      };
      el.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);

      // "DRAG" cursor pill (fine pointers only)
      const pill = cursor.current;
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      let offPill = () => {};
      if (fine && pill) {
        const qx = gsap.quickTo(pill, "x", { duration: 0.35, ease: "power3" });
        const qy = gsap.quickTo(pill, "y", { duration: 0.35, ease: "power3" });
        const mv = (e: PointerEvent) => { qx(e.clientX); qy(e.clientY); };
        const en = () => gsap.to(pill, { opacity: 1, scale: 1, duration: 0.25 });
        const lv = () => gsap.to(pill, { opacity: 0, scale: 0.6, duration: 0.25 });
        el.addEventListener("pointermove", mv); el.addEventListener("pointerenter", en); el.addEventListener("pointerleave", lv);
        el.classList.add("has-drag-cursor");
        offPill = () => { el.removeEventListener("pointermove", mv); el.removeEventListener("pointerenter", en); el.removeEventListener("pointerleave", lv); el.classList.remove("has-drag-cursor"); };
      }

      return () => {
        el.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        offPill();
        gsap.killTweensOf(proxy);
        st.kill();
        gsap.set(cards, { clearProps: "all" });
      };
    });
    return () => mm.revert();
  }, []);

  // Mobile: native scroll-snap carousel; centre card scales to 1, neighbours 0.92.
  useEffect(() => {
    const track = swipe.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = track.scrollLeft + track.clientWidth / 2;
      let best = 0, bestD = Infinity;
      cards.forEach((c, i) => {
        const dist = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
        if (dist < bestD) { bestD = dist; best = i; }
        c.style.transform = `scale(${1 - 0.08 * Math.min(1, dist / (c.offsetWidth + 12))})`;
      });
      setActive(best);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    track.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => { track.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const swipeTo = (i: number) => {
    const c = swipe.current?.children[i] as HTMLElement | undefined;
    if (c && swipe.current) swipe.current.scrollTo({ left: c.offsetLeft - (swipe.current.clientWidth - c.offsetWidth) / 2, behavior: "smooth" });
  };

  const arcClick = (i: number) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (moved.current) { e.preventDefault(); return; }
    if (i !== active) { e.preventDefault(); goTo.current(i); }
  };

  return (
    <section id="work" ref={section} className="work-section scroll-mt-20">
      <div className="site-container">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5">
          <div className="section-heading">
            <p className="eyebrow">Latest work</p>
            <h2>Built to be <em className="accent-italic">remembered.</em></h2>
            <p>Live sites and concept case studies, from first sketch to polished interface.</p>
          </div>
          <div className="work-arrows hidden gap-2 md:flex">
            <Button variant="outline" size="icon" className="carousel-arrow" onClick={() => goTo.current(active - 1)} aria-label="Previous project"><ArrowLeft /></Button>
            <Button variant="outline" size="icon" className="carousel-arrow" onClick={() => goTo.current(active + 1)} aria-label="Next project"><ArrowRight /></Button>
          </div>
        </div>
      </div>

      {/* Desktop: 3D arc */}
      <div ref={stage} className="work-arc" aria-roledescription="carousel" aria-label="Projects">
        {projects.map((p, i) => (
          <div key={p.slug} className="work-arc-card"><WorkCard project={p} onClick={arcClick(i)} /></div>
        ))}
      </div>
      <p className="work-count" aria-hidden="true">{String(active + 1).padStart(2, "0")} <span>/ {String(N).padStart(2, "0")}</span></p>

      {/* Mobile: swipe carousel with dots */}
      <div className="work-swipe-wrap">
        <div ref={swipe} className="work-swipe" aria-label="Projects">
          {projects.map((p) => <div key={p.slug} className="work-swipe-card"><WorkCard project={p} /></div>)}
        </div>
        <div className="work-dots" role="tablist" aria-label="Choose project">
          {projects.map((p, i) => <button key={p.slug} role="tab" aria-selected={active === i} aria-label={p.name} className={active === i ? "on" : undefined} onClick={() => swipeTo(i)} />)}
        </div>
      </div>

      {/* Reduced motion: static grid */}
      <div className="site-container work-grid">
        {projects.map((p) => <WorkCard key={p.slug} project={p} />)}
      </div>

      <div ref={cursor} className="drag-cursor" aria-hidden="true"><span>DRAG</span></div>
    </section>
  );
}
