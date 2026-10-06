import { useLayoutEffect, useRef } from "react";
import { REDUCED_MOTION } from "@/lib/motion";
import { useInView } from "./use-in-view";

type Props = { value: number; decimals?: number; prefix?: string; suffix?: string; separator?: boolean; className?: string; afterIntro?: boolean | undefined; duration?: number };

/** Counts from 0 to `value` (1.4s, ease-out) when it scrolls into view. SSR renders the final number. */
export function CountUp({ value, decimals = 0, prefix = "", suffix = "", separator = false, className, afterIntro, duration = 1.4 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => prefix + (separator ? Math.round(n).toLocaleString("en-US") : n.toFixed(decimals)) + suffix;
  const reduced = () => typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION).matches;

  useLayoutEffect(() => { if (ref.current && !reduced()) ref.current.textContent = fmt(0); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInView(ref, {
    afterIntro,
    amount: 0.6,
    onIn: (el) => {
      if (reduced()) { el.textContent = fmt(value); return; }
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / (duration * 1000), 1);
        el.textContent = fmt(value * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },
  });
  return <span ref={ref} className={className}>{fmt(value)}</span>;
}
