import { Children, isValidElement, useRef, type CSSProperties, type ElementType, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "./use-in-view";

type EmProps = { children?: ReactNode; className?: string };

/** Splits a heading into words that rise out of a mask. Keeps <em> words styled and the real text readable via aria-label. */
export function SplitHeading({ children, as: Tag = "h2", className, afterIntro }: { children: ReactNode; as?: ElementType; className?: string; afterIntro?: boolean | undefined }) {
  const ref = useRef<HTMLElement>(null);
  useInView(ref, { afterIntro, amount: 0.3 });
  let idx = 0;
  let plain = "";
  const out: ReactNode[] = [];

  const pushWords = (text: string, emClass?: string, isEm = false) => {
    text.split(/(\s+)/).forEach((tok) => {
      if (!tok) return;
      if (/^\s+$/.test(tok)) { out.push(" "); plain += " "; return; }
      plain += tok;
      const i = idx++;
      out.push(
        <span key={`w${i}`} className="w" aria-hidden="true">
          <span style={{ "--wi": i } as CSSProperties}>{isEm ? <em className={emClass}>{tok}</em> : tok}</span>
        </span>,
      );
    });
  };

  const walk = (nodes: ReactNode, emClass?: string, isEm = false) => {
    Children.forEach(nodes, (node) => {
      if (typeof node === "string" || typeof node === "number") pushWords(String(node), emClass, isEm);
      else if (isValidElement(node)) {
        const el = node as ReactElement<EmProps>;
        if (el.type === "br") { out.push(<br key={`br${out.length}`} />); plain += " "; }
        else if (el.type === "em") walk(el.props.children, el.props.className, true);
        else walk(el.props.children, emClass, isEm);
      }
    });
  };
  walk(children);

  return <Tag ref={ref} className={cn("split", className)} aria-label={plain.replace(/\s+/g, " ").trim()}>{out}</Tag>;
}
