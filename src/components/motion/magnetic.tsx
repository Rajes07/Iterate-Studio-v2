import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/motion";

/** Desktop pointer only: the child drifts up to `strength`px toward the cursor and springs back on leave. */
export function Magnetic({ children, strength = 8, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const el = ref.current!;
      const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "elastic.out(1, 0.5)" });
      const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "elastic.out(1, 0.5)" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        x(gsap.utils.clamp(-1, 1, dx) * strength); y(gsap.utils.clamp(-1, 1, dy) * strength);
      };
      const leave = () => { x(0); y(0); };
      el.addEventListener("pointermove", move); el.addEventListener("pointerleave", leave);
      return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); gsap.set(el, { clearProps: "x,y" }); };
    });
    return () => mm.revert();
  }, [strength]);
  return <span ref={ref} className={className} style={{ display: "inline-block" }}>{children}</span>;
}
