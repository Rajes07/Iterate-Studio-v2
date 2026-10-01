import type { CSSProperties } from "react";
import "./visuals.css";

/** 01 · Discover: sticky-note board. */
function DiscoverVisual() {
  const notes = [
    ["Who is it for?", "y"], ["One key journey", "p"], ["Success metric", "g"],
    ["Competitors", "b"], ["Must-haves", "y"], ["Risks", "p"],
  ] as const;
  return (
    <div className="vp vp-board">
      {notes.map(([t, c], i) => <div key={t} className={`vp-note ${c}`} style={{ "--i": i } as CSSProperties}><b>{t}</b><span /><span className="s" /></div>)}
      <svg className="vp-link" viewBox="0 0 400 220" fill="none"><path d="M110 70 C170 40 200 100 250 70 M250 120 C220 170 160 150 120 160" /></svg>
    </div>
  );
}

/** 02 · Design: Figma-style canvas. */
function DesignVisual() {
  return (
    <div className="vp vp-canvas">
      <div className="vp-tools"><i /><i className="on" /><i /><i /></div>
      <div className="vp-frame a"><span className="t" /><span /><span className="s" /><u /></div>
      <div className="vp-frame b"><span className="t" /><span /><span className="s" /></div>
      <div className="vp-sel"><i /><i /><i /><i /><b>Hero · 1440 × 900</b></div>
      <div className="vp-cursor">Aarav</div>
      <div className="vp-swatches"><i /><i /><i /><i /></div>
    </div>
  );
}

/** 03 · Build: code editor + browser preview. */
function BuildVisual() {
  const lines = ["const Hero = () => (", "  <section className=\"hero\">", "    <h1>Make room for good living.</h1>", "    <Button>Book a call</Button>", "  </section>", ");"];
  return (
    <div className="vp vp-build">
      <div className="vp-editor">
        <div className="vp-tabs"><span className="on">Hero.tsx</span><span>api.ts</span></div>
        {lines.map((l, i) => <code key={i} style={{ "--i": i } as CSSProperties}><s>{i + 1}</s>{l}</code>)}
      </div>
      <div className="vp-preview">
        <div className="vp-preview-bar"><i /><i /><i /></div>
        <div className="vp-preview-body"><h4>Make room for <em>good</em> living.</h4><span /><u>Book a call</u></div>
      </div>
    </div>
  );
}

/** 04 · Optimise & Grow: analytics chart rising. */
function GrowVisual() {
  const bars = [22, 30, 28, 42, 50, 47, 64, 78, 92];
  return (
    <div className="vp vp-grow">
      <div className="vp-kpi"><small>Conversion rate</small><b>6.4%</b><u>▲ 38% vs last month</u></div>
      <div className="vp-bars">{bars.map((h, i) => <i key={i} style={{ height: `${h}%`, "--i": i } as CSSProperties} />)}</div>
      <svg className="vp-line" viewBox="0 0 300 100" preserveAspectRatio="none"><path d="M0 90 C40 84 50 70 80 72 S130 52 160 46 S220 30 250 18 S285 8 300 4" /></svg>
    </div>
  );
}

const visuals = [DiscoverVisual, DesignVisual, BuildVisual, GrowVisual];

export function ProcessVisual({ index }: { index: number }) {
  const Visual = visuals[index % visuals.length]!;
  return <div className="vp-wrap" aria-hidden="true"><Visual /></div>;
}
