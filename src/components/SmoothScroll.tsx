import { useSmoothScroll } from "@/lib/motion";

/** Mounts Lenis smooth scrolling for the whole app (disabled for reduced motion). */
export function SmoothScroll() {
  useSmoothScroll();
  return null;
}
