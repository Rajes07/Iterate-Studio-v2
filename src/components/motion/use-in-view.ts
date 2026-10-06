import { useEffect, type RefObject } from "react";
import { onIntroDone } from "@/lib/motion";

/** Adds the `in` class to the element once `amount` of it is visible (once only). No React state, so no re-renders. */
export function useInView(ref: RefObject<HTMLElement | null>, { amount = 0.2, afterIntro = false, onIn }: { amount?: number; afterIntro?: boolean | undefined; onIn?: (el: HTMLElement) => void } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let io: IntersectionObserver | undefined;
    const start = () => {
      io = new IntersectionObserver((entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        el.classList.add("in");
        onIn?.(el);
        io?.disconnect();
      }, { threshold: amount, rootMargin: "0px 0px -4% 0px" });
      io.observe(el);
    };
    const off = afterIntro ? onIntroDone(start) : (start(), () => {});
    return () => { off(); io?.disconnect(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
