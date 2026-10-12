import { Parallax } from "@/components/motion";
import "./visuals.css";

/** Laptop + two phones with a slow float and per-layer parallax depth. */
export function HeroDevices() {
  return (
    <div className="hero-devices" role="img" aria-label="A laptop dashboard and two phones showing the Velan Industries, Illam Interiors and Vanascape Gardens websites">
      <div className="hd-glow" />
      <div className="hd-layer hd-laptop">
        <Parallax speed={-0.1}><div className="hd-float" style={{ animationDuration: "9s" }}>
          <div className="v-laptop"><div className="v-laptop-screen"><img className="hd-screen" src="/work/velan-steels.webp" alt="" width={1469} height={918} decoding="async" fetchPriority="high" /></div><div className="v-laptop-base" /></div>
        </div></Parallax>
      </div>
      <div className="hd-layer hd-phone-a">
        <Parallax speed={-0.2}><div className="hd-float" style={{ animationDuration: "7s", animationDelay: "-2s" }}>
          <div className="v-phone"><img src="/work/hero/illam-phone.webp" alt="" width={408} height={838} decoding="async" /></div>
        </div></Parallax>
      </div>
      <div className="hd-layer hd-phone-b">
        <Parallax speed={0.12}><div className="hd-float" style={{ animationDuration: "8s", animationDelay: "-4s" }}>
          <div className="v-phone"><img src="/work/hero/vanascape-phone.webp" alt="" width={384} height={790} decoding="async" /></div>
        </div></Parallax>
      </div>
    </div>
  );
}
