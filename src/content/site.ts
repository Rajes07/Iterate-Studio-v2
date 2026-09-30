export const site = {
  brand: "iterate.",
  nav: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  contact: {
    email: "hello@iterate.studio",
    whatsapp: "https://wa.me/917358470999",
    phone: "+91 73584 70999",
    bookingUrl: "#contact",
    location: ["Chennai", "Tamil Nadu", "India"],
  },
  prices: {
    website: "From ₹XX,XXX",
    mvp: "From ₹X,XX,XXX",
    retainer: "From ₹XX,XXX/mo",
  },
  hero: {
    chips: ["📍 Based in Chennai", "Est. 2025", "Working with clients worldwide"],
    title: "Design & Development Studio for Startups and Growing Businesses",
    description:
      "We turn ideas into websites, web apps and MVPs in weeks, then keep improving them every month with real user data.",
  },
  tools: ["React", "TypeScript", "Next.js", "Supabase", "Vercel", "Figma", "Tailwind"],
  projects: [
    {
      name: "Vanascape Garden Studio",
      status: "Live Now",
      description: "A landscape and garden design studio website for homes across Tamil Nadu.",
      url: "https://vanascape-garden-studio--mrajes466.replit.app",
      visual: "garden",
    },
    {
      name: "Crumb & Co.",
      status: "Live Now",
      description: "A bakery brand website with menu, gallery and online enquiries.",
      url: "",
      visual: "bakery",
    },
    {
      name: "Gang Challenge",
      status: "Concept",
      description: "A habit-tracking app where friends compete on daily goals together.",
      url: "",
      visual: "social",
    },
    {
      name: "SaaS Dashboard",
      status: "Concept",
      description: "An analytics dashboard concept for small teams.",
      url: "",
      visual: "analytics",
    },
  ],
  process: [
    {
      title: "Discover",
      timing: "Week 1",
      text: "We define goals, users and must-have features, then map flows and a clickable prototype.",
    },
    {
      title: "Build",
      timing: "Weeks 2–4",
      text: "Design and development run side by side with weekly demos.",
    },
    {
      title: "Launch",
      timing: "Weeks 4–6",
      text: "Testing, performance, SEO basics, then we go live.",
    },
    {
      title: "Iterate",
      timing: "Every month",
      text: "We review analytics and ship improvements continuously. We don't stop at V1.",
    },
  ],
  services: [
    {
      title: "Website Design & Development",
      lead: "Websites built to turn visitors into customers.",
      description: "Strategy, design and development come together in one focused process—built fast, polished carefully and ready to grow.",
    },
    {
      title: "Custom Web Applications",
      lead: "Platforms that make complex workflows simple.",
      description: "We translate operational challenges into intuitive, dependable tools your team and customers will enjoy using.",
    },
    {
      title: "MVP Development",
      lead: "Launch the right first version fast, then learn from real users.",
      description: "We shape the scope, prototype the core journey and build a production-ready first release without unnecessary features.",
    },
    {
      title: "Product Redesign",
      lead: "Make an existing product simpler, sharper and easier to use.",
      description: "We audit the experience, find friction and modernise the interface while protecting what already works.",
    },
    {
      title: "Ongoing Improvement",
      lead: "A product partner that keeps measuring, shipping and improving.",
      description: "A steady monthly rhythm for new features, design refinements, performance work and informed experiments.",
    },
  ],
  gallery: Array.from({ length: 16 }, (_, index) => ({
    title: ["Fintech dashboard", "Wellness mobile app", "Commerce landing page", "Team workspace", "Analytics overview", "Travel planner", "Creator platform", "Property portal"][index % 8],
    visual: ["ocean", "coral", "lime", "violet", "ink", "sun", "mint", "rose"][index % 8],
    image: "",
  })),
  pricing: [
    {
      name: "Launch Site",
      priceKey: "website" as const,
      timing: "2–3 weeks",
      badge: "",
      features: ["Responsive website", "SEO basics", "Analytics setup", "1 month support"],
    },
    {
      name: "MVP",
      priceKey: "mvp" as const,
      timing: "4–6 weeks",
      badge: "",
      features: ["Product design", "Full-stack build", "Auth + database", "Launch support"],
    },
    {
      name: "Monthly Iteration",
      priceKey: "retainer" as const,
      timing: "Ongoing",
      badge: "Most popular",
      features: ["Fixed monthly rate", "Improvements shipped weekly", "Direct founder access", "Pause or cancel anytime"],
    },
  ],
  support: [
    { title: "Fixed Monthly Rate", text: "One predictable fee with no hidden extras.", icon: "wallet" },
    { title: "Fast Delivery", text: "Small, meaningful improvements shipped weekly.", icon: "zap" },
    { title: "Senior Quality", text: "Experienced design and engineering on every task.", icon: "sparkles" },
    { title: "Flexible Support", text: "Scale up, pause or change focus as you need.", icon: "sliders" },
  ],
  faqs: [
    { question: "Who do you work with?", answer: "Startups, founders and growing businesses that need a website, web app or MVP designed and built by one team." },
    { question: "How long does a project take?", answer: "Websites in 2–3 weeks, MVPs in 4–6 weeks, based on the scope we agree upfront." },
    { question: "How does pricing work?", answer: "Fixed-scope projects or a monthly retainer. You get a clear quote after a free 30-minute call." },
    { question: "Do you handle both design and development?", answer: "Yes. Design and engineering happen in the same team, side by side, with no handoffs." },
    { question: "What tech do you use?", answer: "React, TypeScript, Next.js, Supabase, Vercel and Figma." },
    { question: "Can you improve an existing product?", answer: "Yes. We audit what you have, then redesign or rebuild it step by step." },
    { question: "What happens after launch?", answer: "We keep improving it through the Monthly Iteration plan, or hand it over with full documentation." },
    { question: "How do projects start?", answer: "Book a free call, share your idea, and receive a scope, timeline and quote within 2 business days." },
  ],
  form: {
    budgets: ["Under ₹50K", "₹50K–₹1.5L", "₹1.5L–₹5L", "₹5L+", "Not sure yet"],
    sources: ["Instagram", "Google", "LinkedIn", "ChatGPT", "Referral", "Other"],
    needs: ["Website", "Web App", "MVP", "Redesign", "Ongoing Support"],
    success: "Thanks! We'll reply within 2 business days.",
  },
  footer: {
    statement: "We design and build digital products that keep getting better.",
    copyright: "© 2026 Iterate Studio. All rights reserved.",
  },
} as const;
