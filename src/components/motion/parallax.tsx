import { useEffect, useRef, type ReactNode } from "react";
import { gsap, NO_PREFERENCE, registerGsap, ScrollTrigger } from "@/lib/motion";

/** Translates its child on Y relative to scroll progress. Negative speed moves against the scroll (floats up). */
export function Parallax({ speed = -0.15, children, className }: { speed?: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    registerGsap();
    const mm = gsap.matchMedia();
    mm.add(NO_PREFERENCE, () => {
      const el = ref.current!;
      const set = gsap.quickSetter(el, "y", "px");
      const st = ScrollTrigger.create({
        trigger: el, start: "top bottom", end: "bottom top",
        onUpdate: (self) => set((window.innerHeight + el.offsetHeight) * (0.5 - self.progress) * speed),
      });
      return () => { st.kill(); gsap.set(el, { clearProps: "y" }); };
    });
    return () => mm.revert();
  }, [speed]);
  return <div ref={ref} className={className} style={{ willChange: "transform" }}>{children}</div>;
}
