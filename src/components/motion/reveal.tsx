import { useRef, type CSSProperties, type ElementType, type FormEventHandler, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "./use-in-view";

type RevealProps = { children: ReactNode; className?: string; delay?: number; as?: ElementType; afterIntro?: boolean | undefined; style?: CSSProperties; id?: string };

/** Fade-up reveal when scrolled into view. Hidden-before-reveal only applies when `html.js` is set. */
export function Reveal({ children, className, delay = 0, as: Tag = "div", afterIntro, style, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  useInView(ref, { afterIntro });
  return <Tag ref={ref} className={cn("rv", className)} style={{ "--rv-delay": `${delay}s`, ...style } as CSSProperties} {...rest}>{children}</Tag>;
}

/** Container whose <StaggerItem> children reveal one after another. */
export function Stagger({ children, className, as: Tag = "div", afterIntro, ...rest }: { children: ReactNode; className?: string; as?: ElementType; afterIntro?: boolean | undefined; onSubmit?: FormEventHandler<HTMLFormElement>; noValidate?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  useInView(ref, { afterIntro, amount: 0.15 });
  return <Tag ref={ref} className={cn("rv-group", className)} {...rest}>{children}</Tag>;
}

export function StaggerItem({ children, className, index = 0, as: Tag = "div" }: { children: ReactNode; className?: string; index?: number; as?: ElementType }) {
  return <Tag className={cn("rv-item", className)} style={{ "--i": index } as CSSProperties}>{children}</Tag>;
}

/** A 1px divider that draws in from the left. */
export function DrawLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useInView(ref, { amount: 0.5 });
  return <div ref={ref} className={cn("draw-line", className)} aria-hidden="true" />;
}
