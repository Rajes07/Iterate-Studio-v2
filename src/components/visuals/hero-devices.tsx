import { useEffect, useRef } from "react";
import { gsap, NO_PREFERENCE, registerGsap, ScrollTrigger } from "@/lib/motion";
import "./visuals.css";

function DashboardScreen() {
  return (
    <div className="v-dash" aria-hidden="true">
      <aside><i className="v-logo" /><span /><span className="on" /><span /><span /></aside>
      <div className="v-dash-main">
        <div className="v-dash-head"><b>Overview <em>today</em></b><i /></div>
        <div className="v-dash-kpis">
          <div><small>Visitors</small><b>24.8k</b><u>+18%</u></div>
          <div><small>Bookings</small><b>1,204</b><u>+32%</u></div>
          <div><small>Conversion</small><b>6.4%</b><u>+1.2</u></div>
        </div>
        <svg viewBox="0 0 300 90" preserveAspectRatio="none" className="v-dash-chart">
          <defs><linearGradient id="hd-g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#6d8dff" stopOpacity=".55" /><stop offset="1" stopColor="#6d8dff" stopOpacity="0" /></linearGradient></defs>
          <path d="M0 78 C30 70 45 60 70 62 S115 40 140 44 S190 24 215 30 S270 10 300 6 V90 H0Z" fill="url(#hd-g)" />
          <path d="M0 78 C30 70 45 60 70 62 S115 40 140 44 S190 24 215 30 S270 10 300 6" fill="none" stroke="#8aa4ff" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <div className="v-dash-rows"><span /><span /><span /></div>
      </div>
    </div>
  );
}

/** Laptop + two phones with a slow float and a light scroll parallax. */
export function HeroDevices() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const mm = gsap.matchMedia();
    mm.add(NO_PREFERENCE, () => {
      gsap.utils.toArray<HTMLElement>("[data-depth]", root.current ?? undefined).forEach((el) => {
        gsap.to(el, {
          y: -Number(el.dataset["depth"]),
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="hero-devices" role="img" aria-label="A laptop dashboard and two phones showing Iterate Studio website projects">
      <div className="hd-glow" />
      <div className="hd-layer hd-laptop" data-depth="26">
        <div className="hd-float" style={{ animationDuration: "9s" }}>
          <div className="v-laptop"><div className="v-laptop-screen"><DashboardScreen /></div><div className="v-laptop-base" /></div>
        </div>
      </div>
      <div className="hd-layer hd-phone-a" data-depth="64">
        <div className="hd-float" style={{ animationDuration: "7s", animationDelay: "-2s" }}>
          <div className="v-phone"><img src="/work/nextshore.webp" alt="" width={900} height={1760} decoding="async" /></div>
        </div>
      </div>
      <div className="hd-layer hd-phone-b" data-depth="-14">
        <div className="hd-float" style={{ animationDuration: "8s", animationDelay: "-4s" }}>
          <div className="v-phone"><img src="/work/vanascape.webp" alt="" width={900} height={1485} decoding="async" /></div>
        </div>
      </div>
    </div>
  );
}
