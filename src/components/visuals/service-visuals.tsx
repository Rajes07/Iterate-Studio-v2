import "./visuals.css";

const Serif = ({ children, accent }: { children: string; accent: string }) => (
  <h4 className="v-serif">{children} <em>{accent}</em></h4>
);

/** 1 · Websites: browser frame with a finished site. */
function WebsiteVisual() {
  return (
    <div className="v-browser">
      <div className="v-browser-bar"><i /><i /><i /><span>yourbrand.com</span></div>
      <div className="v-site">
        <div className="v-site-nav"><b>Atlas</b><span /><span /><span /><u>Book a call</u></div>
        <div className="v-site-hero">
          <small>Studio · Est. 2025</small>
          <Serif accent="grows.">Design that</Serif>
          <p /><p className="short" />
          <div className="v-site-cta"><u>Get started</u><span>See work →</span></div>
        </div>
        <div className="v-site-cards"><span /><span /><span /></div>
      </div>
    </div>
  );
}

/** 2 · Web apps: app shell with sidebar, board and table. */
function WebAppVisual() {
  return (
    <div className="v-browser">
      <div className="v-browser-bar"><i /><i /><i /><span>app.yourbrand.com</span></div>
      <div className="v-app">
        <aside><i className="v-logo" /><span className="on" /><span /><span /><span /></aside>
        <div className="v-app-main">
          <div className="v-app-head"><b>Orders</b><u>+ New</u></div>
          <div className="v-board">
            {["To do", "In progress", "Done"].map((c, ci) => (
              <div key={c}><small>{c}</small>{Array.from({ length: 3 - ci + 1 }).map((_, i) => <span key={i} className={i === 0 ? "hl" : undefined} />)}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** 3 · MVPs: phone with the core journey. */
function MvpVisual() {
  return (
    <div className="v-phone-stage">
      <div className="v-phone v-phone-ui">
        <div className="v-pui">
          <small>Good morning</small>
          <Serif accent="today">Your plan</Serif>
          <div className="v-pui-card"><b>3 of 5</b><span>steps complete</span><div className="bar"><i /></div></div>
          <div className="v-pui-list"><span /><span /><span /></div>
          <u>Continue</u>
        </div>
      </div>
      <div className="v-chip v-chip-a">✓ Launched in 4 weeks</div>
      <div className="v-chip v-chip-b">★ 4.9 first-user rating</div>
    </div>
  );
}

/** 4 · Redesigns: wireframe-to-polished split. */
function RedesignVisual() {
  return (
    <div className="v-split">
      <div className="v-split-half wire">
        <small>Before</small>
        <div className="w-nav" /><div className="w-h" /><div className="w-p" /><div className="w-p short" />
        <div className="w-row"><span /><span /><span /></div>
      </div>
      <div className="v-split-handle"><i>⇄</i></div>
      <div className="v-split-half polished">
        <small>After</small>
        <div className="p-nav"><b>Atlas</b><u>Book</u></div>
        <Serif accent="clearly.">Say it</Serif>
        <p /><p className="short" />
        <div className="p-row"><span /><span /><span /></div>
      </div>
    </div>
  );
}

/** 5 · Ongoing improvement: AI prompt panel with suggested experiments. */
function ImproveVisual() {
  return (
    <div className="v-chat">
      <div className="v-chat-head"><i /><b>Growth assistant</b><span>Live</span></div>
      <div className="v-msg user">What should we test this month?</div>
      <div className="v-msg bot">
        <p>Three experiments, ranked by expected lift:</p>
        <ol><li><b>Shorter hero CTA</b><u>+9%</u></li><li><b>Pricing-free FAQ order</b><u>+5%</u></li><li><b>Faster mobile images</b><u>+4%</u></li></ol>
      </div>
      <div className="v-chat-input"><span>Ask for the next improvement…</span><i>↑</i></div>
    </div>
  );
}

const visuals = [WebsiteVisual, WebAppVisual, MvpVisual, RedesignVisual, ImproveVisual];

export function ServiceVisual({ index }: { index: number }) {
  const Visual = visuals[index % visuals.length]!;
  return <div className={`v-stage v-stage-${index % visuals.length}`} aria-hidden="true"><Visual /></div>;
}
