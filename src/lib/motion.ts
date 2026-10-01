import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export { gsap, ScrollTrigger };

export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
export const NO_PREFERENCE = "(prefers-reduced-motion: no-preference)";

let registered = false;
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/** Lenis smooth scroll, driven by the GSAP ticker so ScrollTrigger stays in sync. */
export function useSmoothScroll() {
  useEffect(() => {
    registerGsap();
    if (window.matchMedia(REDUCED_MOTION).matches) return;
    const lenis = new Lenis({ anchors: { offset: -72 } });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}
