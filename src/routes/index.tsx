import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  MessageCircle,
  Send,
  SlidersHorizontal,
  Sparkles,
  WalletCards,
  Zap,
} from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ServicesSection } from "@/components/sections/services";
import { ProcessSection } from "@/components/sections/process";
import { HeroDevices } from "@/components/visuals/hero-devices";
import { WorkSection } from "@/components/sections/work";
import { CountUp, DrawLine, Magnetic, Parallax, Reveal, SplitHeading, Stagger, StaggerItem } from "@/components/motion";
import { gsap, NO_PREFERENCE, registerGsap } from "@/lib/motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Iterate Studio — Design & Development Studio in Chennai" },
      {
        name: "description",
        content:
          "We design and build websites, web apps and MVPs for startups and growing businesses, then keep improving them after launch.",
      },
      { property: "og:title", content: "Iterate Studio — Design & Development Studio in Chennai" },
      {
        property: "og:description",
        content:
          "We design and build websites, web apps and MVPs for startups and growing businesses, then keep improving them after launch.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://iteratestudio.vercel.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://iteratestudio.vercel.app/" }],
  }),
  component: Index,
});

const anchorButton =
  "h-12 rounded-full px-6 text-[0.875rem] font-semibold transition-all duration-300 sm:h-13 sm:px-7";

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className={cn("text-xl font-extrabold tracking-tight", dark && "text-dark-foreground")} aria-label="Iterate Studio home">
      iterate<span className="text-primary">.</span>
    </a>
  );
}

/** The logo mark (dot, bar, blue dot) that doubles as the menu button, with an X for the open state. */
function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="337 280 406 520" aria-hidden="true">
      <g className="lm-logo">
        <rect x="337" y="280" width="133" height="120" rx="60" fill="currentColor" />
        <rect x="337" y="440" width="133" height="360" rx="14" fill="currentColor" />
        <circle className="lm-dot" cx="666" cy="543" r="77" fill="#4a5df0" />
      </g>
      <g className="lm-x"><path d="M360 380 L720 700 M720 380 L360 700" stroke="currentColor" strokeWidth="64" strokeLinecap="round" fill="none" /></g>
    </svg>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [fly, setFly] = useState(0);
  const lastY = useRef(0);
  const bar = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  // Scrolling reveals the "iterate" name and sends the logo mark to the right corner as the menu button.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY.current && y > 200); // hide on the way down, show on the way up
      lastY.current = y;
    };
    const measure = () => { if (bar.current && btn.current) setFly(btn.current.offsetLeft - bar.current.offsetLeft); };
    onScroll(); measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", measure); };
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled} data-hidden={hidden && !menuOpen}>
      <div ref={bar} className="site-container grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 sm:flex sm:justify-between">
        <div className="hidden lg:block"><Logo /></div>
        <a href="#top" className="wordmark lg:hidden" data-scrolled={scrolled} aria-label="Iterate Studio home">iterate<span>.</span></a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {site.nav.map((item) => <a key={item.href} href={item.href} className="nav-link">{item.label}</a>)}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="outline" size="icon" className="h-11 w-11 rounded-full" asChild>
            <a href={site.contact.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle /></a>
          </Button>
          <Button className="h-11 rounded-full px-5" asChild><a href={site.contact.bookingUrl}>Book a free call</a></Button>
        </div>
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <button ref={btn} type="button" className="logo-btn lg:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} data-open={menuOpen} data-scrolled={scrolled} style={{ "--fly": `${-fly}px` } as CSSProperties}><LogoMark /></button>
          </SheetTrigger>
          <SheetContent className="w-[90%] max-w-sm rounded-l-[1.5rem] border-border bg-background p-7">
            <SheetHeader className="text-left">
              <SheetTitle><Logo /></SheetTitle>
              <SheetDescription>Design and development, working as one.</SheetDescription>
            </SheetHeader>
            <nav className="mt-10 flex flex-col" aria-label="Mobile navigation">
              {site.nav.map((item, index) => (
                <SheetClose key={item.href} asChild>
                  <a href={item.href} style={{ animationDelay: `${120 + index * 70}ms` }} className="menu-link flex items-center justify-between border-b border-border py-5 text-xl font-semibold">
                    <span>{item.label}</span><span className="text-xs text-muted-foreground">0{index + 1}</span>
                  </a>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-8 grid gap-3">
              <Button className={anchorButton} asChild><a href={site.contact.bookingUrl}>Book a free call</a></Button>
              <Button variant="outline" className={anchorButton} asChild><a href={site.contact.whatsapp} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a></Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function SectionHeading({ eyebrow, title, body, align = "left" }: { eyebrow?: string; title: string; body?: string; align?: "left" | "center" }) {
  return (
    <div className={cn("section-heading", align === "center" && "mx-auto text-center")}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}

function Hero() {
  const section = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  // As the hero scrolls away it eases back (scale 1 → .96, opacity → .6).
  useEffect(() => {
    registerGsap();
    const mm = gsap.matchMedia();
    mm.add(NO_PREFERENCE, () => {
      gsap.to(inner.current, { scale: 0.96, opacity: 0.6, ease: "none", transformOrigin: "50% 100%", scrollTrigger: { trigger: section.current, start: "top top", end: "bottom top", scrub: true } });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="top" ref={section} className="hero-section relative overflow-hidden">
      <div className="hero-bg" aria-hidden="true"><div className="hero-grid" /><div className="hero-glow" /></div>
      <div ref={inner} className="site-container relative grid items-center gap-14 pb-16 pt-12 lg:grid-cols-[1.03fr_.97fr] lg:pb-24 lg:pt-20">
        <div>
          <Reveal afterIntro className="eyebrow section-eyebrow mb-5">{site.hero.eyebrow}</Reveal>
          <SplitHeading as="h1" afterIntro className="hero-title">{site.hero.title}</SplitHeading>
          <Reveal as="p" afterIntro delay={0.35} className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{site.hero.description}</Reveal>
          <Reveal afterIntro delay={0.45} className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
            <Magnetic><Button className={anchorButton} asChild><a href={site.contact.bookingUrl}>Book a call <ArrowUpRight /></a></Button></Magnetic>
            <Magnetic><a href="#work" className="text-link">See our work <ArrowRight /></a></Magnetic>
          </Reveal>
          <Reveal as="dl" afterIntro delay={0.6} className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
            {site.hero.stats.map((stat) => <div key={stat.label} className="flex flex-col-reverse"><dt className="mt-1 text-sm text-muted-foreground">{stat.label}</dt><dd className="text-3xl font-semibold"><CountUp afterIntro value={stat.value} decimals={stat.decimals} suffix={stat.suffix} /></dd></div>)}
          </Reveal>
        </div>
        <Reveal afterIntro delay={0.3}><HeroDevices /></Reveal>
      </div>
    </section>
  );
}

function ValueBanner() {
  return (
    <section className="site-container py-20 sm:py-28">
      <Reveal className="dark-panel grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_.75fr] lg:items-end lg:p-14">
        <div>
          <DrawLine className="mb-8 !bg-white/25" />
          <p className="eyebrow section-eyebrow text-dark-muted">One connected team</p>
          <SplitHeading className="mt-4 max-w-3xl text-3xl font-bold text-dark-foreground sm:text-5xl">Get a designer and engineer in one team, without hiring in-house.</SplitHeading>
        </div>
        <div className="lg:pl-8"><p className="leading-7 text-dark-muted">No handoffs between agencies. The person who designs your product builds it, so nothing gets lost and everything ships faster.</p><Magnetic className="mt-7"><Button variant="secondary" className="h-12 rounded-full px-6" asChild><a href="#contact">Book a call <ChevronRight /></a></Button></Magnetic></div>
      </Reveal>
    </section>
  );
}

function BentoSection() {
  return (
    <section className="section-pad"><Stagger className="site-container grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StaggerItem index={0} className="bento-card">
        <div className="founder-avatar">R</div><div><p className="eyebrow">Your point of contact</p><h3 className="mt-2 text-2xl font-bold">Rajesh, Founder</h3><p className="mt-3 leading-7 text-muted-foreground">Engineer-led studio. You talk directly to the person building your product.</p></div>
      </StaggerItem>
      <StaggerItem index={1} className="bento-card bento-accent"><div><p className="eyebrow text-primary-foreground/70">Clear from day one</p><h3 className="mt-3 text-3xl font-bold text-primary-foreground">Clear scope.<br />No surprises.</h3></div><Button variant="secondary" className="mt-10 w-fit rounded-full" asChild><a href="#work">See our work <ArrowRight /></a></Button></StaggerItem>
      <StaggerItem index={2} className="bento-card bento-stat md:col-span-2 lg:col-span-1"><div className="stat-rings" aria-hidden="true"><span /><span /><span /></div><div><h3 className="text-4xl font-bold sm:text-5xl">Weeks,<br />not months.</h3><p className="mt-4 text-muted-foreground">Most projects go live in 2–6 weeks.</p></div></StaggerItem>
    </Stagger></section>
  );
}

const supportIcons = { wallet: WalletCards, zap: Zap, sparkles: Sparkles, sliders: SlidersHorizontal };

/** Draws a stroke icon on reveal: measures each shape and animates its dash offset. */
function DrawIcon({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    ref.current?.querySelectorAll<SVGGeometryElement>("path,line,circle,rect,polyline,ellipse").forEach((el) => {
      const len = Math.ceil(el.getTotalLength?.() ?? 0);
      if (len) { el.style.setProperty("--len", String(len)); el.classList.add("draw-shape"); }
    });
  }, []);
  return <span ref={ref} className="icon-tile draw-icon">{children}</span>;
}

function SupportSection() {
  return <section className="section-pad"><div className="site-container">
    <div className="section-heading"><DrawLine className="mb-8" /><p className="eyebrow section-eyebrow">Built for momentum</p><SplitHeading>Monthly product support as you grow</SplitHeading><Reveal as="p" delay={0.2}>The design and engineering capacity you need, without adding another full-time role.</Reveal></div>
    <Stagger className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{site.support.map((item, i) => { const Icon = supportIcons[item.icon as keyof typeof supportIcons]; return <StaggerItem as="article" index={i} key={item.title} className="bg-background p-7 sm:p-8"><DrawIcon><Icon strokeWidth={1.5} /></DrawIcon><h3 className="mt-8 text-lg font-bold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p></StaggerItem>; })}</Stagger>
  </div></section>;
}

function FAQSection() {
  return <section id="faq" className="section-pad faq-section scroll-mt-20 bg-card"><div className="site-container grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
    <div><DrawLine className="mb-8" /><p className="eyebrow section-eyebrow">Good to know</p><SplitHeading className="mt-4 text-4xl font-bold sm:text-5xl">Got questions?<br />We&apos;ve got answers.</SplitHeading><Reveal as="p" delay={0.2} className="mt-5 max-w-md leading-7 text-muted-foreground">Everything you need to know before we start making something useful together.</Reveal>
      <Reveal delay={0.3} className="mt-10 flex items-center gap-4 rounded-[1.5rem] border border-border bg-background p-5"><div className="founder-avatar founder-small">R</div><div className="min-w-0 flex-1"><strong className="block">Still curious?</strong><span className="text-sm text-muted-foreground">Speak directly with Rajesh.</span></div><Button variant="outline" className="hidden rounded-full sm:inline-flex" asChild><a href="#contact">Book an intro call</a></Button></Reveal>
    </div>
    <Reveal delay={0.15}><Accordion type="single" collapsible className="border-t border-border">{site.faqs.map((faq, index) => <AccordionItem value={`faq-${index}`} key={faq.question}><AccordionTrigger className="py-6 text-base font-semibold hover:no-underline sm:text-lg">{faq.question}</AccordionTrigger><AccordionContent className="max-w-2xl pb-6 pr-8 text-base leading-7 text-muted-foreground">{faq.answer}</AccordionContent></AccordionItem>)}</Accordion></Reveal>
  </div></section>;
}

function InfinityStroke() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <svg ref={ref} className="infinity" viewBox="0 0 200 100" fill="none" aria-hidden="true">
      <path pathLength={1} d="M100 50 C 80 20, 30 20, 30 50 C 30 80, 80 80, 100 50 C 120 20, 170 20, 170 50 C 170 80, 120 80, 100 50 Z" />
    </svg>
  );
}

function ClosingBanner() {
  return <section className="site-container py-20 sm:py-28"><div className="dark-panel overflow-hidden p-7 sm:p-12 lg:p-16"><div className="text-center"><SplitHeading className="closing-title mx-auto font-bold text-dark-foreground">Most studios hand over V1. <em className="accent-italic">We keep going.</em></SplitHeading><InfinityStroke /></div>
    <Reveal className="mt-14 grid gap-6 border-t border-dark-border pt-8 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] lg:items-center"><div><p className="dark-label">Drop us a line</p><a className="dark-link" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></div><div><p className="dark-label">WhatsApp</p><a className="dark-link" href={site.contact.whatsapp} target="_blank" rel="noreferrer">{site.contact.phone}</a></div><Magnetic><Button variant="secondary" className="h-12 rounded-full px-6" asChild><a href="#contact">Book a free call <ArrowUpRight /></a></Button></Magnetic></Reveal>
  </div></section>;
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [timeline, setTimeline] = useState(""); const [source, setSource] = useState(""); const [needs, setNeeds] = useState<string[]>([]); const [errors, setErrors] = useState<Record<string, string>>({});
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget); const nextErrors: Record<string, string> = {};
    const name = String(form.get("name") ?? "").trim(); const email = String(form.get("email") ?? "").trim(); const project = String(form.get("project") ?? "").trim();
    if (!name) nextErrors["name"] = "Please enter your full name."; else if (name.length > 100) nextErrors["name"] = "Please keep your name under 100 characters.";
    if (!email) nextErrors["email"] = "Please enter your email."; else if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 255) nextErrors["email"] = "Please enter a valid email.";
    if (!project) nextErrors["project"] = "Tell us briefly what you are building."; else if (project.length > 500) nextErrors["project"] = "Please keep this under 500 characters.";
    if (!timeline) nextErrors["timeline"] = "Please choose a timeline."; if (!source) nextErrors["source"] = "Please tell us how you found us.";
    setErrors(nextErrors); if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  }
  const toggleNeed = (need: string) => setNeeds((current) => current.includes(need) ? current.filter((item) => item !== need) : [...current, need]);
  return <section id="contact" className="section-pad scroll-mt-20 bg-card"><div className="site-container"><div className="contact-shell">
    {submitted ? <div className="success-state" role="status"><span className="success-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path className="check-draw" pathLength={1} d="M5 12.5l4.5 4.5L19 7.5" /></svg></span><p className="eyebrow">Message received</p><h2>{site.form.success}</h2><p>We&apos;ve got everything we need for now. Keep an eye on your inbox.</p><Button variant="outline" className="mt-7 rounded-full" onClick={() => setSubmitted(false)}>Send another enquiry</Button></div> : <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
      <div><DrawLine className="mb-8" /><p className="eyebrow section-eyebrow">Start a conversation</p><SplitHeading className="mt-4 text-4xl font-bold sm:text-5xl">Book a free discovery call</SplitHeading><p className="mt-5 leading-7 text-muted-foreground">Tell us what you&apos;re making and where you need help. We&apos;ll reply with useful next steps within two business days.</p><div className="mt-10 rounded-2xl bg-muted p-5"><p className="text-sm text-muted-foreground">Prefer email instead?</p><a href={`mailto:${site.contact.email}`} className="mt-1 inline-block font-semibold hover:text-primary">{site.contact.email}</a></div></div>
      <Stagger as="form" onSubmit={submit} noValidate className="grid gap-5">
        <StaggerItem index={0} className="grid gap-5 sm:grid-cols-2"><FloatField name="name" label="Full Name*" maxLength={100} error={errors["name"]} /><FloatField name="email" type="email" label="Email*" maxLength={255} error={errors["email"]} /></StaggerItem>
        <StaggerItem index={1}><FloatField multiline name="project" label="What are you building?*" maxLength={500} error={errors["project"]} /></StaggerItem>
        <StaggerItem index={2} className="grid gap-5 sm:grid-cols-2"><Field label="Ideal timeline*" error={errors["timeline"]}><Select value={timeline} onValueChange={setTimeline}><SelectTrigger aria-label="Ideal timeline" className="form-control"><SelectValue placeholder="Select a range" /></SelectTrigger><SelectContent>{site.form.timelines.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></Field><Field label="How did you find us?*" error={errors["source"]}><Select value={source} onValueChange={setSource}><SelectTrigger aria-label="How did you find us" className="form-control"><SelectValue placeholder="Select one" /></SelectTrigger><SelectContent>{site.form.sources.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></Field></StaggerItem>
        <StaggerItem index={3} as="fieldset"><legend className="mb-3 text-sm font-semibold">What do you need help with?</legend><div className="flex flex-wrap gap-2">{site.form.needs.map((need) => <Button key={need} type="button" variant={needs.includes(need) ? "default" : "outline"} className="h-10 rounded-full px-4" onClick={() => toggleNeed(need)} aria-pressed={needs.includes(need)}>{needs.includes(need) && <Check />}{need}</Button>)}</div></StaggerItem>
        <StaggerItem index={4}><Magnetic><Button type="submit" className="mt-2 h-13 rounded-full px-7 sm:w-fit">Send enquiry <ArrowUpRight /></Button></Magnetic></StaggerItem>
      </Stagger>
    </div>}
  </div></div></section>;
}

function Field({ label, error, children }: { label: string; error: string | undefined; children: ReactNode }) {
  return <div className="grid gap-2"><Label className="font-semibold">{label}</Label>{children}{error && <p className="text-sm text-destructive" role="alert">{error}</p>}</div>;
}

function FloatField({ label, error, name, type = "text", multiline, maxLength }: { label: string; error: string | undefined; name: string; type?: string; multiline?: boolean; maxLength: number }) {
  const common = { id: `f-${name}`, name, maxLength, placeholder: " ", "aria-invalid": Boolean(error), className: cn("form-control float-input", multiline && "min-h-28 resize-y") };
  return (
    <div className="grid gap-2">
      <div className="float-field">
        {multiline ? <textarea rows={4} {...common} /> : <input type={type} {...common} />}
        <label htmlFor={`f-${name}`}>{label}</label>
      </div>
      {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
    </div>
  );
}

function Footer() {
  return <footer className="footer"><div className="site-container"><div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-20"><div><Logo dark /><p className="mt-5 max-w-sm leading-7 text-dark-muted">{site.footer.statement}</p></div><FooterColumn title="Services" links={site.services.map((item) => ({ label: item.title, href: "#services" }))} /><FooterColumn title="Quick links" links={[...site.nav, { label: "Contact", href: "#contact" }]} /><div><p className="footer-title">Contact</p><div className="mt-5 grid gap-3 text-sm"><a href={`mailto:${site.contact.email}`} className="footer-link">{site.contact.email}</a><a href={site.contact.whatsapp} className="footer-link" target="_blank" rel="noreferrer">{site.contact.phone}</a><p className="leading-6 text-dark-muted">{site.contact.location.join(", ")}</p></div></div></div><div className="flex flex-col gap-4 border-t border-dark-border py-6 text-xs text-dark-muted sm:flex-row sm:items-center sm:justify-between"><p>{site.footer.copyright}</p><div className="flex gap-5"><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms</Link></div></div><Parallax speed={-0.1}><div className="footer-giant" aria-hidden="true" /></Parallax></div></footer>;
}

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return <div><p className="footer-title">{title}</p><nav className="mt-5 grid gap-3">{links.map((link) => <a key={link.label} href={link.href} className="footer-link">{link.label}</a>)}</nav></div>;
}

function Index() {
  return <div className="min-h-screen bg-background text-foreground"><Header /><main><Hero /><ValueBanner /><WorkSection /><ProcessSection /><ServicesSection /><BentoSection /><SupportSection /><FAQSection /><ClosingBanner /><ContactSection /></main><Footer /><Button className="floating-whatsapp" size="icon" asChild><a href={site.contact.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat with Iterate Studio on WhatsApp"><MessageCircle /></a></Button></div>;
}
