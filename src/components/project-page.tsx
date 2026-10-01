import { useEffect, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project, ProjectContent } from "@/data/projects";

type Props = { project: Project & { content: ProjectContent } };

export function ProjectPage({ project }: Props) {
  const { content: c, name } = project;
  const t = c.theme;

  useEffect(() => { window.scrollTo(0, 0); }, [project.slug]);

  const vars = {
    "--p-primary": t.primary, "--p-on-primary": t.onPrimary, "--p-accent": t.accent,
    "--p-bg": t.background, "--p-surface": t.surface, "--p-fg": t.foreground, "--p-muted": t.muted,
    "--p-heading": t.font.heading, "--p-body": t.font.body,
    "--p-case": t.font.uppercase ? "uppercase" : "none",
  } as CSSProperties;

  return (
    <div className="project-page" style={vars}>
      <header className="pp-bar">
        <div className="pp-wrap pp-bar-inner">
          <Link to="/" hash="work" className="pp-back"><ArrowLeft /> Back to work</Link>
          <span className="pp-bar-name">{name}</span>
          <span className="pp-badge">Concept</span>
        </div>
      </header>

      <section className="pp-hero">
        <div className="pp-wrap">
          <p className="pp-eyebrow">{c.hero.eyebrow}</p>
          <h1>{c.hero.title}</h1>
          <p className="pp-lead">{c.hero.subtitle}</p>
          <a href="#cta" className="pp-btn">{c.hero.cta} <ArrowUpRight /></a>
        </div>
        <div className="pp-wrap pp-hero-media">
          <img src={c.hero.image} alt={`${name} home page`} width={1440} height={900} decoding="async" fetchPriority="high" />
        </div>
      </section>

      <section className="pp-stats" aria-label="Key figures">
        <div className="pp-wrap pp-stats-grid">
          {c.stats.map((s) => <div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}
        </div>
      </section>

      <section className="pp-section">
        <div className="pp-wrap">
          <h2>What makes it work</h2>
          <div className="pp-features">
            {c.features.map((f, i) => (
              <article key={f.title}>
                <span>0{i + 1}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pp-section pp-alt">
        <div className="pp-wrap">
          <h2>Inside the product</h2>
          <div className="pp-gallery">
            {c.gallery.map((g) => (
              <figure key={g.src} className={g.tall ? "is-tall" : undefined}>
                <img src={g.src} alt={g.alt} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="pp-section">
        <div className="pp-wrap">
          <blockquote className="pp-quote">
            <p>&ldquo;{c.testimonial.quote}&rdquo;</p>
            <footer><strong>{c.testimonial.name}</strong> · {c.testimonial.role}</footer>
          </blockquote>
        </div>
      </section>

      <section id="cta" className="pp-cta">
        <div className="pp-wrap">
          <h2>{c.cta.title}</h2>
          <p>{c.cta.text}</p>
          <a href="#cta" className="pp-btn pp-btn-invert">{c.cta.label} <ArrowUpRight /></a>
        </div>
      </section>

      <footer className="pp-footer">
        <div className="pp-wrap">
          <span>{name} · Concept project by <b>iterate studio</b></span>
          <Link to="/" hash="work">← Back to work</Link>
        </div>
      </footer>
    </div>
  );
}
