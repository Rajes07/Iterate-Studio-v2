import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { gsap, getLenis, registerGsap, ScrollTrigger } from "@/lib/motion";
import { videoFor } from "@/data/videos";
import { AutoVideo } from "@/components/AutoVideo";
import { DrawLine, Reveal, SplitHeading } from "@/components/motion";

const N = projects.length;
const clampP = gsap.utils.clamp(0, N - 1);
const ARC_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
const WHEEL_QUERY = "(max-width: 767px) and (prefers-reduced-motion: no-preference)";
const ARC_STEP = 345; // px between card centres on the desktop arc
const WHEEL_ANGLE = 50; // degrees between cards on the mobile wheel

/** Coloured portrait card: badge, title, tagline and a device mockup inside the box. */
function WorkCard({ project, onClick }: { project: Project; onClick?: (e: MouseEvent<HTMLAnchorElement>) => void }) {
  const external = project.type === "external";
  const { colors, ink, device } = project.card;
  const video = videoFor(project.slug);
  const style = { "--c1": colors[0], "--c2": colors[1] } as CSSProperties;
  const body = (
    <>
      <span className="work-badge"><i className={external ? "status-live" : "status-concept"} />{external ? "Live ↗" : "Case study"}</span>
      <h3 className="work-title">{project.name}</h3>
      <p className="work-tagline">{project.tagline}</p>
      <div className={`work-device ${device}`}>
        {video
          ? <AutoVideo sources={video} poster={project.thumbnail} alt={`${project.name} preview`} width={900} height={device === "phone" ? 1760 : 560} />
          : <img src={project.thumbnail} alt={`${project.name} preview`} width={900} height={device === "phone" ? 1760 : 560} loading="lazy" decoding="async" draggable={false} />}
      </div>
      <span className="work-view">View {external ? "site" : "case study"} <ArrowRight /></span>
    </>
  );
  const cls = `work-card group ink-${ink}`;
  return external ? (
    <a href={project.url} target="_blank" rel="noopener noreferrer" draggable={false} onClick={onClick} className={cls} style={style} data-cursor="Live ↗">{body}</a>
  ) : (
    <Link to="/work/$slug" params={{ slug: project.slug }} draggable={false} onClick={onClick} className={cls} style={style} data-cursor="View">{body}</Link>
  );
}

/** Horizontal drag that scrubs a progress value (in card units) and flings with inertia. */
function attachDrag(el: HTMLElement, o: { unit: number; get: () => number; set: (p: number) => void; end: (target: number) => void; moved: { current: boolean }; onActive?: (on: boolean) => void }) {
  let startX = 0, startY = 0, startP = 0, lastX = 0, lastT = 0, vel = 0, down = false, lock: "x" | "y" | null = null;
  const onDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    down = true; lock = null; o.moved.current = false;
    startX = lastX = e.clientX; startY = e.clientY; startP = o.get(); lastT = performance.now(); vel = 0;
  };
  const onMove = (e: PointerEvent) => {
    if (!down) return;
    const dx = e.clientX - startX, dy = e.clientY - startY;
    if (!lock && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) lock = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    if (lock !== "x") return;
    if (!o.moved.current) { o.moved.current = true; el.setPointerCapture(e.pointerId); o.onActive?.(true); }
    const now = performance.now();
    vel = ((lastX - e.clientX) / o.unit) / Math.max(1, now - lastT) * 1000;
    lastX = e.clientX; lastT = now;
    o.set(startP - dx / o.unit);
  };
  const onUp = () => {
    if (!down) return;
    down = false;
    if (o.moved.current) { o.onActive?.(false); o.end(Math.round(o.get() + gsap.utils.clamp(-2, 2, vel * 0.25))); setTimeout(() => { o.moved.current = false; }, 0); }
  };
  el.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", onUp);
  return () => {
    el.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onUp);
  };
}

export function WorkSection() {
  const section = useRef<HTMLElement>(null);
  const arc = useRef<HTMLDivElement>(null);
  const wheel = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const goTo = useRef<(index: number) => void>(() => {});
  const moved = useRef(false);
  const current = useRef(0);
  const [active, setActive] = useState(0);

  const sync = (p: number) => { const i = Math.round(clampP(p)); current.current = i; setActive(i); };

  // Desktop (≥768px): pinned 3D arc scrubbed by scroll, also draggable.
  useEffect(() => {
    registerGsap();
    const mm = gsap.matchMedia();
    mm.add(ARC_QUERY, () => {
      const el = arc.current!;
      const cards = gsap.utils.toArray<HTMLElement>(".work-arc-card", el);
      const render = (p: number) => {
        cards.forEach((card, i) => {
          const d = i - p, a = Math.abs(d), side = Math.min(a, 1);
          gsap.set(card, {
            x: d * ARC_STEP,
            y: Math.min(a * a, 6) * 12,
            z: -Math.min(a, 2) * 110,
            rotateY: -Math.sign(d) * 12 * side,
            scale: 1 - 0.15 * side,
            "--dim": 0.4 * side,
            opacity: a <= 1 ? 1 : Math.max(0, 1 - 0.9 * (a - 1)),
            zIndex: Math.round(100 - a * 10),
            pointerEvents: a > 2.6 ? "none" : "auto",
          });
        });
        sync(p);
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
        const y = st.start + (clampP(p) / (N - 1)) * (st.end - st.start);
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(y, { immediate: true, force: true }); else window.scrollTo(0, y);
      };
      const proxy = { p: 0 };
      goTo.current = (index) => {
        proxy.p = progress();
        gsap.to(proxy, { p: clampP(index), duration: 0.8, ease: "power3.out", overwrite: true, onUpdate: () => scrollToP(proxy.p) });
      };
      const offDrag = attachDrag(el, { unit: ARC_STEP, get: progress, set: scrollToP, end: (t) => goTo.current(t), moved, onActive: (on) => gsap.to(cursor.current, { scale: on ? 0.8 : 1, duration: 0.2 }) });

      // "DRAG" cursor pill (fine pointers only)
      const pill = cursor.current;
      let offPill = () => {};
      if (pill && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const qx = gsap.quickTo(pill, "x", { duration: 0.35, ease: "power3" });
        const qy = gsap.quickTo(pill, "y", { duration: 0.35, ease: "power3" });
        const label = pill.querySelector("span");
        const mv = (e: PointerEvent) => {
          qx(e.clientX); qy(e.clientY);
          const card = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
          const text = card?.dataset["cursor"] ?? "Drag";
          if (label && label.textContent !== text) label.textContent = text;
        };
        const en = () => gsap.to(pill, { opacity: 1, scale: 1, duration: 0.25 });
        const lv = () => gsap.to(pill, { opacity: 0, scale: 0.6, duration: 0.25 });
        el.addEventListener("pointermove", mv); el.addEventListener("pointerenter", en); el.addEventListener("pointerleave", lv);
        el.classList.add("has-drag-cursor");
        offPill = () => { el.removeEventListener("pointermove", mv); el.removeEventListener("pointerenter", en); el.removeEventListener("pointerleave", lv); el.classList.remove("has-drag-cursor"); };
      }
      return () => { offDrag(); offPill(); gsap.killTweensOf(proxy); st.kill(); gsap.set(cards, { clearProps: "all" }); };
    });

    // Mobile (<768px): 3D wheel you swipe sideways; vertical scrolling stays native.
    mm.add(WHEEL_QUERY, () => {
      const el = wheel.current!;
      const cards = gsap.utils.toArray<HTMLElement>(".work-wheel-card", el);
      const R = () => cards[0]!.offsetWidth / (2 * Math.tan((WHEEL_ANGLE / 2) * Math.PI / 180)) * 1.08;
      let wp = 0, radius = R();
      const render = (p: number) => {
        wp = clampP(p);
        el.style.transform = `translateZ(${-radius}px)`;
        cards.forEach((card, i) => {
          const d = i - wp, a = Math.abs(d);
          card.style.transform = `rotateY(${d * WHEEL_ANGLE}deg) translateZ(${radius}px)`;
          card.style.opacity = String(a > 1.6 ? 0 : 1 - Math.min(a, 1) * 0.35);
          card.style.zIndex = String(Math.round(100 - a * 10));
          card.style.pointerEvents = a < 0.5 ? "auto" : "none";
        });
        sync(wp);
      };
      render(0);
      const proxy = { p: 0 };
      goTo.current = (index) => { proxy.p = wp; gsap.to(proxy, { p: clampP(index), duration: 0.7, ease: "power3.out", overwrite: true, onUpdate: () => render(proxy.p) }); };
      const offDrag = attachDrag(el.parentElement!, { unit: cards[0]!.offsetWidth * 0.8, get: () => wp, set: render, end: (t) => goTo.current(t), moved, onActive: () => gsap.killTweensOf(proxy) });
      const onResize = () => { radius = R(); render(wp); };
      window.addEventListener("resize", onResize);
      return () => { offDrag(); window.removeEventListener("resize", onResize); gsap.killTweensOf(proxy); el.removeAttribute("style"); cards.forEach((c) => c.removeAttribute("style")); };
    });
    return () => mm.revert();
  }, []);

  const cardClick = (i: number) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (moved.current) { e.preventDefault(); return; }
    if (i !== current.current) { e.preventDefault(); goTo.current(i); }
  };

  return (
    <section id="work" ref={section} className="work-section scroll-mt-20">
      <div className="site-container">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5">
          <div className="section-heading">
            <DrawLine className="mb-8" />
            <p className="eyebrow section-eyebrow">Latest work</p>
            <SplitHeading>Built to be <em className="accent-italic">remembered.</em></SplitHeading>
            <Reveal as="p" delay={0.2}>Live sites and concept case studies, from first sketch to polished interface.</Reveal>
          </div>
          <div className="work-arrows hidden gap-2 md:flex">
            <Button variant="outline" size="icon" className="carousel-arrow" onClick={() => goTo.current(current.current - 1)} aria-label="Previous project"><ArrowLeft /></Button>
            <Button variant="outline" size="icon" className="carousel-arrow" onClick={() => goTo.current(current.current + 1)} aria-label="Next project"><ArrowRight /></Button>
          </div>
        </div>
      </div>

      {/* Desktop: 3D arc */}
      <div ref={arc} className="work-arc" aria-roledescription="carousel" aria-label="Projects">
        {projects.map((p, i) => <div key={p.slug} className="work-arc-card"><WorkCard project={p} onClick={cardClick(i)} /></div>)}
      </div>
      <p className="work-count" aria-hidden="true">{String(active + 1).padStart(2, "0")} <span>/ {String(N).padStart(2, "0")}</span></p>

      {/* Mobile: swipeable 3D wheel */}
      <div className="work-wheel-wrap" aria-roledescription="carousel" aria-label="Projects">
        <div ref={wheel} className="work-wheel">
          {projects.map((p, i) => <div key={p.slug} className="work-wheel-card"><WorkCard project={p} onClick={cardClick(i)} /></div>)}
        </div>
      </div>
      <div className="work-dots" role="tablist" aria-label="Choose project">
        {projects.map((p, i) => <button key={p.slug} role="tab" aria-selected={active === i} aria-label={p.name} className={active === i ? "on" : undefined} onClick={() => goTo.current(i)} />)}
      </div>

      {/* Reduced motion: static grid */}
      <div className="site-container work-grid">
        {projects.map((p) => <WorkCard key={p.slug} project={p} />)}
      </div>

      <div ref={cursor} className="drag-cursor" aria-hidden="true"><span>Drag</span></div>
    </section>
  );
}
