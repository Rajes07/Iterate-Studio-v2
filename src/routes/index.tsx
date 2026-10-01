import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleCheck,
  Menu,
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
import { useSmoothScroll } from "@/lib/motion";
import { ServicesSection } from "@/components/sections/services";
import { ProcessSection } from "@/components/sections/process";
import { WorkSection } from "@/components/sections/work";

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
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
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

function MockScreen({ variant = "ocean", compact = false }: { variant?: string; compact?: boolean }) {
  return (
    <div className={cn("mock-screen", `mock-${variant}`, compact && "mock-compact")} aria-hidden="true">
      <div className="mock-topbar">
        <span className="mock-dot" /><span className="mock-dot" /><span className="mock-dot" />
        <span className="mock-url" />
      </div>
      <div className="mock-body">
        <div className="mock-sidebar">
          <span className="mock-logo" />
          <span /><span /><span /><span />
        </div>
        <div className="mock-content">
          <div className="mock-heading"><span /><i /></div>
          <div className="mock-metrics"><span /><span /><span /></div>
          <div className="mock-chart">
            <div className="chart-line"><i /><i /><i /><i /><i /><i /></div>
          </div>
          <div className="mock-rows"><span /><span /><span /></div>
        </div>
      </div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="Abstract product dashboard and mobile application preview">
      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />
      <div className="hero-dashboard"><MockScreen variant="ocean" /></div>
      <div className="hero-phone">
        <div className="phone-speaker" />
        <div className="phone-greeting"><span>Good morning</span><strong>Your progress</strong></div>
        <div className="phone-score"><span>84</span><small>Weekly score</small></div>
        <div className="phone-bars"><i /><i /><i /><i /><i /></div>
        <div className="phone-card"><span /><span /><span /></div>
      </div>
      <div className="hero-float-card">
        <CircleCheck />
        <div><strong>Launch ready</strong><span>All systems are go</span></div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="site-container grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 sm:flex sm:justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {site.nav.map((item) => <a key={item.href} href={item.href} className="nav-link">{item.label}</a>)}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="outline" size="icon" className="h-11 w-11 rounded-full" asChild>
            <a href={site.contact.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle /></a>
          </Button>
          <Button className="h-11 rounded-full px-5" asChild><a href={site.contact.bookingUrl}>Book a free call</a></Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-11 w-11 shrink-0 rounded-full lg:hidden" aria-label="Open navigation"><Menu /></Button>
          </SheetTrigger>
          <SheetContent className="w-[90%] max-w-sm rounded-l-[1.5rem] border-border bg-background p-7">
            <SheetHeader className="text-left">
              <SheetTitle><Logo /></SheetTitle>
              <SheetDescription>Design and development, working as one.</SheetDescription>
            </SheetHeader>
            <nav className="mt-10 flex flex-col" aria-label="Mobile navigation">
              {site.nav.map((item, index) => (
                <SheetClose key={item.href} asChild>
                  <a href={item.href} className="flex items-center justify-between border-b border-border py-5 text-xl font-semibold">
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
  return (
    <section id="top" className="hero-section overflow-hidden">
      <div className="site-container grid items-center gap-14 pb-16 pt-12 lg:grid-cols-[1.03fr_.97fr] lg:pb-24 lg:pt-20">
        <div className="reveal">
          <h1 className="hero-title">{site.hero.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{site.hero.description}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
            <Button className={anchorButton} asChild><a href={site.contact.bookingUrl}>Book a call <ArrowUpRight /></a></Button>
            <a href="#work" className="text-link">See our work <ArrowRight /></a>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
            {site.hero.stats.map((stat) => <div key={stat.label} className="flex flex-col-reverse"><dt className="mt-1 text-sm text-muted-foreground">{stat.label}</dt><dd className="text-3xl font-semibold">{stat.value}</dd></div>)}
          </dl>
        </div>
        <div className="reveal reveal-delay"><HeroVisual /></div>
      </div>
    </section>
  );
}

function ValueBanner() {
  return (
    <section className="site-container py-20 sm:py-28">
      <div className="dark-panel reveal grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_.75fr] lg:items-end lg:p-14">
        <div><p className="eyebrow text-dark-muted">One connected team</p><h2 className="max-w-3xl text-3xl font-bold text-dark-foreground sm:text-5xl">Get a designer and engineer in one team, without hiring in-house.</h2></div>
        <div className="lg:pl-8"><p className="leading-7 text-dark-muted">No handoffs between agencies. The person who designs your product builds it, so nothing gets lost and everything ships faster.</p><Button variant="secondary" className="mt-7 h-12 rounded-full px-6" asChild><a href="#contact">Book a call <ChevronRight /></a></Button></div>
      </div>
    </section>
  );
}

function BentoSection() {
  return (
    <section className="section-pad"><div className="site-container grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <article className="bento-card reveal">
        <div className="founder-avatar">R</div><div><p className="eyebrow">Your point of contact</p><h3 className="mt-2 text-2xl font-bold">Rajesh, Founder</h3><p className="mt-3 leading-7 text-muted-foreground">Engineer-led studio. You talk directly to the person building your product.</p></div>
      </article>
      <article className="bento-card bento-accent reveal"><div><p className="eyebrow text-primary-foreground/70">Clear from day one</p><h3 className="mt-3 text-3xl font-bold text-primary-foreground">Clear scope.<br />No surprises.</h3></div><Button variant="secondary" className="mt-10 w-fit rounded-full" asChild><a href="#work">See our work <ArrowRight /></a></Button></article>
      <article className="bento-card bento-stat reveal md:col-span-2 lg:col-span-1"><div className="stat-rings" aria-hidden="true"><span /><span /><span /></div><div><h3 className="text-4xl font-bold sm:text-5xl">Weeks,<br />not months.</h3><p className="mt-4 text-muted-foreground">Most projects go live in 2–6 weeks.</p></div></article>
    </div></section>
  );
}

const supportIcons = { wallet: WalletCards, zap: Zap, sparkles: Sparkles, sliders: SlidersHorizontal };
function SupportSection() {
  return <section className="section-pad"><div className="site-container"><SectionHeading eyebrow="Built for momentum" title="Monthly product support as you grow" body="The design and engineering capacity you need, without adding another full-time role." />
    <div className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{site.support.map((item) => { const Icon = supportIcons[item.icon as keyof typeof supportIcons]; return <article key={item.title} className="bg-background p-7 sm:p-8"><span className="icon-tile"><Icon /></span><h3 className="mt-8 text-lg font-bold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p></article>; })}</div>
  </div></section>;
}

function FAQSection() {
  return <section id="faq" className="section-pad scroll-mt-20 bg-card"><div className="site-container grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
    <div><p className="eyebrow">Good to know</p><h2 className="mt-4 text-4xl font-bold sm:text-5xl">Got questions?<br />We&apos;ve got answers.</h2><p className="mt-5 max-w-md leading-7 text-muted-foreground">Everything you need to know before we start making something useful together.</p>
      <div className="mt-10 flex items-center gap-4 rounded-[1.5rem] border border-border bg-background p-5"><div className="founder-avatar founder-small">R</div><div className="min-w-0 flex-1"><strong className="block">Still curious?</strong><span className="text-sm text-muted-foreground">Speak directly with Rajesh.</span></div><Button variant="outline" className="hidden rounded-full sm:inline-flex" asChild><a href="#contact">Book an intro call</a></Button></div>
    </div>
    <Accordion type="single" collapsible className="border-t border-border">{site.faqs.map((faq, index) => <AccordionItem value={`faq-${index}`} key={faq.question}><AccordionTrigger className="py-6 text-base font-semibold hover:no-underline sm:text-lg">{faq.question}</AccordionTrigger><AccordionContent className="max-w-2xl pb-6 pr-8 text-base leading-7 text-muted-foreground">{faq.answer}</AccordionContent></AccordionItem>)}</Accordion>
  </div></section>;
}

function ClosingBanner() {
  return <section className="site-container py-20 sm:py-28"><div className="dark-panel overflow-hidden p-7 sm:p-12 lg:p-16"><div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end"><h2 className="max-w-4xl text-4xl font-bold text-dark-foreground sm:text-6xl lg:text-7xl">Most studios hand over V1. <span className="text-primary">We keep going.</span></h2><div className="closing-mark" aria-hidden="true">∞</div></div>
    <div className="mt-14 grid gap-6 border-t border-dark-border pt-8 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] lg:items-center"><div><p className="dark-label">Drop us a line</p><a className="dark-link" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></div><div><p className="dark-label">WhatsApp</p><a className="dark-link" href={site.contact.whatsapp} target="_blank" rel="noreferrer">{site.contact.phone}</a></div><Button variant="secondary" className="h-12 rounded-full px-6" asChild><a href="#contact">Book a free call <ArrowUpRight /></a></Button></div>
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
    {submitted ? <div className="success-state" role="status"><span className="success-icon"><Check /></span><p className="eyebrow">Message received</p><h2>{site.form.success}</h2><p>We&apos;ve got everything we need for now. Keep an eye on your inbox.</p><Button variant="outline" className="mt-7 rounded-full" onClick={() => setSubmitted(false)}>Send another enquiry</Button></div> : <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
      <div><p className="eyebrow">Start a conversation</p><h2 className="mt-4 text-4xl font-bold sm:text-5xl">Book a free discovery call</h2><p className="mt-5 leading-7 text-muted-foreground">Tell us what you&apos;re making and where you need help. We&apos;ll reply with useful next steps within two business days.</p><div className="mt-10 rounded-2xl bg-muted p-5"><p className="text-sm text-muted-foreground">Prefer email instead?</p><a href={`mailto:${site.contact.email}`} className="mt-1 inline-block font-semibold hover:text-primary">{site.contact.email}</a></div></div>
      <form onSubmit={submit} noValidate className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2"><Field label="Full Name*" error={errors["name"]}><Input name="name" maxLength={100} placeholder="Your full name" aria-invalid={Boolean(errors["name"])} /></Field><Field label="Email*" error={errors["email"]}><Input name="email" type="email" maxLength={255} placeholder="you@company.com" aria-invalid={Boolean(errors["email"])} /></Field></div>
        <Field label="What are you building?*" error={errors["project"]}><textarea name="project" maxLength={500} rows={4} placeholder="A short description of your idea, product or business" aria-invalid={Boolean(errors["project"])} className="form-control min-h-28 resize-y" /></Field>
        <div className="grid gap-5 sm:grid-cols-2"><Field label="Ideal timeline*" error={errors["timeline"]}><Select value={timeline} onValueChange={setTimeline}><SelectTrigger className="form-control"><SelectValue placeholder="Select a range" /></SelectTrigger><SelectContent>{site.form.timelines.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></Field><Field label="How did you find us?*" error={errors["source"]}><Select value={source} onValueChange={setSource}><SelectTrigger className="form-control"><SelectValue placeholder="Select one" /></SelectTrigger><SelectContent>{site.form.sources.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></Field></div>
        <fieldset><legend className="mb-3 text-sm font-semibold">What do you need help with?</legend><div className="flex flex-wrap gap-2">{site.form.needs.map((need) => <Button key={need} type="button" variant={needs.includes(need) ? "default" : "outline"} className="h-10 rounded-full px-4" onClick={() => toggleNeed(need)} aria-pressed={needs.includes(need)}>{needs.includes(need) && <Check />}{need}</Button>)}</div></fieldset>
        <Button type="submit" className="mt-2 h-13 rounded-full px-7 sm:w-fit">Send enquiry <ArrowUpRight /></Button>
      </form>
    </div>}
  </div></div></section>;
}

function Field({ label, error, children }: { label: string; error: string | undefined; children: ReactNode }) {
  return <div className="grid gap-2"><Label className="font-semibold">{label}</Label>{children}{error && <p className="text-sm text-destructive" role="alert">{error}</p>}</div>;
}

function Footer() {
  return <footer className="footer"><div className="site-container"><div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-20"><div><Logo dark /><p className="mt-5 max-w-sm leading-7 text-dark-muted">{site.footer.statement}</p></div><FooterColumn title="Services" links={site.services.map((item) => ({ label: item.title, href: "#services" }))} /><FooterColumn title="Quick links" links={[...site.nav, { label: "Contact", href: "#contact" }]} /><div><p className="footer-title">Contact</p><div className="mt-5 grid gap-3 text-sm"><a href={`mailto:${site.contact.email}`} className="footer-link">{site.contact.email}</a><a href={site.contact.whatsapp} className="footer-link" target="_blank" rel="noreferrer">{site.contact.phone}</a><p className="leading-6 text-dark-muted">{site.contact.location.join(", ")}</p></div></div></div><div className="flex flex-col gap-4 border-t border-dark-border py-6 text-xs text-dark-muted sm:flex-row sm:items-center sm:justify-between"><p>{site.footer.copyright}</p><div className="flex gap-5"><a href="#">Privacy Policy</a><a href="#">Terms</a></div></div></div></footer>;
}

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return <div><p className="footer-title">{title}</p><nav className="mt-5 grid gap-3">{links.map((link) => <a key={link.label} href={link.href} className="footer-link">{link.label}</a>)}</nav></div>;
}

function Index() {
  useSmoothScroll();
  return <div className="min-h-screen bg-background text-foreground"><Header /><main><Hero /><ValueBanner /><WorkSection /><ProcessSection /><ServicesSection /><BentoSection /><SupportSection /><FAQSection /><ClosingBanner /><ContactSection /></main><Footer /><Button className="floating-whatsapp" size="icon" asChild><a href={site.contact.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat with Iterate Studio on WhatsApp"><MessageCircle /></a></Button></div>;
}
