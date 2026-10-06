import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export { gsap, ScrollTrigger };

/** Shared motion tokens. Edit here: they feed both the JS animations and (via CSS variables) every reveal. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const; // expo-out feel
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
export const DUR = { fast: 0.4, base: 0.8, slow: 1.2 };
export const STAGGER = 0.08;
export const REVEAL_Y = 40; // px
export const EASE_OUT_CSS = `cubic-bezier(${EASE_OUT.join(",")})`;
export const EASE_IN_OUT_CSS = `cubic-bezier(${EASE_IN_OUT.join(",")})`;

/** CSS custom properties generated from the tokens above; injected into <head> by the root route. */
export const motionCssVars = () =>
  `:root{--ease-out:${EASE_OUT_CSS};--ease-in-out:${EASE_IN_OUT_CSS};--dur-fast:${DUR.fast}s;--dur-base:${DUR.base}s;--dur-slow:${DUR.slow}s;--stagger:${STAGGER}s;--reveal-y:${REVEAL_Y}px}`;

/** Runs `cb` once the loading intro has finished (immediately if it already has, or was skipped). */
export function onIntroDone(cb: () => void) {
  const w = window as Window & { __introDone?: boolean };
  if (w.__introDone) { const id = requestAnimationFrame(cb); return () => cancelAnimationFrame(id); }
  window.addEventListener("intro:done", cb, { once: true });
  return () => window.removeEventListener("intro:done", cb);
}

export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
export const NO_PREFERENCE = "(prefers-reduced-motion: no-preference)";

let registered = false;
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

let lenisInstance: Lenis | null = null;
export const getLenis = () => lenisInstance;

/** Lenis smooth scroll, driven by the GSAP ticker so ScrollTrigger stays in sync. */
export function useSmoothScroll() {
  useEffect(() => {
    registerGsap();
    if (window.matchMedia(REDUCED_MOTION).matches) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -80 } });
    lenisInstance = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    // Hold scrolling while the intro overlay is up.
    const holding = document.documentElement.classList.contains("intro-pending") || !!document.getElementById("intro-loader");
    if (holding) { lenis.stop(); }
    const off = onIntroDone(() => lenis.start());
    return () => {
      off();
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
