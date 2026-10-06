import { useEffect, useRef, useState } from "react";
import { gsap, EASE_IN_OUT, EASE_OUT, REDUCED_MOTION, registerGsap, ScrollTrigger } from "@/lib/motion";

const KEY = "iterate-intro-seen";
const MIN = 1.2, MAX = 2.4;
type W = Window & { __introDone?: boolean };

function done() {
  (window as W).__introDone = true;
  window.dispatchEvent(new Event("intro:done"));
}

/** Branded wordmark intro. Client-only, once per session; the page renders normally underneath it. */
export function IntroLoader() {
  const [show, setShow] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    let seen = false;
    try { seen = sessionStorage.getItem(KEY) === "1"; } catch { /* storage unavailable */ }
    if (seen) { html.classList.remove("intro-pending"); done(); return; }
    try { sessionStorage.setItem(KEY, "1"); } catch { /* ignore */ }
    html.style.overflow = "hidden";
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    registerGsap();
    const html = document.documentElement;
    const el = root.current!;
    const finish = () => {
      html.style.overflow = "";
      html.classList.remove("intro-pending");
      setShow(false);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    html.classList.remove("intro-pending"); // the overlay now covers the page itself

    if (window.matchMedia(REDUCED_MOTION).matches) {
      gsap.set(el.querySelectorAll(".il-letter, .il-dot, .il-bar"), { clearProps: "all" });
      const t1 = setTimeout(() => {
        gsap.to(el, { opacity: 0, duration: 0.2, onComplete: () => { done(); finish(); } });
      }, 300);
      return () => clearTimeout(t1);
    }

    const start = performance.now();
    const tl = gsap.timeline();
    tl.fromTo(el.querySelectorAll(".il-letter"), { yPercent: 105, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: `cubic-bezier(${EASE_OUT.join(",")})` }, 0.1)
      .fromTo(el.querySelector(".il-dot"), { scale: 0 }, { keyframes: [{ scale: 1.25, duration: 0.25 }, { scale: 1, duration: 0.2 }], ease: "power2.out" }, 0.65)
      .fromTo(el.querySelector(".il-bar b"), { scaleX: 0 }, { scaleX: 0.85, duration: 1.4, ease: "power1.out" }, 0.7);

    let leaving = false;
    const leave = () => {
      if (leaving) return; leaving = true;
      gsap.to(el.querySelector(".il-bar b"), { scaleX: 1, duration: 0.2, ease: "power1.out" });
      const out = gsap.timeline({ delay: 0.15 });
      out.to(el.querySelector(".il-word"), { y: -24, opacity: 0, duration: 0.4, ease: `cubic-bezier(${EASE_OUT.join(",")})` })
        .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.8, ease: `cubic-bezier(${EASE_IN_OUT.join(",")})`, onComplete: finish }, ">-0.05")
        .call(done, undefined, ">-0.15"); // fires ~0.15s before the overlay is fully gone
    };
    const ready = () => {
      const elapsed = (performance.now() - start) / 1000;
      gsap.delayedCall(Math.max(0, MIN - elapsed), leave);
    };
    if (document.readyState === "complete") ready(); else window.addEventListener("load", ready, { once: true });
    const cap = gsap.delayedCall(MAX, leave);
    return () => { window.removeEventListener("load", ready); cap.kill(); tl.kill(); };
  }, [show]);

  if (!show) return null;
  return (
    <div id="intro-loader" ref={root} className="intro-loader" aria-hidden="true">
      <div className="il-word">
        <div className="il-letters">
          {"iterate".split("").map((c, i) => <span key={i} className="il-mask"><span className="il-letter">{c}</span></span>)}
          <span className="il-dot" />
        </div>
        <div className="il-bar"><b /></div>
      </div>
    </div>
  );
}
