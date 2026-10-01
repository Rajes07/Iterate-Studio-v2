export const site = {
  brand: "iterate.",
  nav: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
  ],
  contact: {
    email: "hello@iterate.studio",
    whatsapp: "https://wa.me/917358470999",
    phone: "+91 73584 70999",
    bookingUrl: "#contact",
    location: ["Chennai", "Tamil Nadu", "India"],
  },
  hero: {
    title: "Design & Development Studio for Startups and Growing Businesses",
    description:
      "We turn ideas into websites, web apps and MVPs in weeks, then keep improving them every month with real user data.",
    stats: [
      { value: "12+", label: "Projects shipped" },
      { value: "8+", label: "Happy clients" },
      { value: "5.0", label: "Average rating" },
    ],
  },
  process: [
    { title: "Discover & Strategy", timing: "Week 1", text: "We align on goals, users and the one journey that matters most, then map it into a clickable prototype.", tools: ["Figma", "Claude", "Miro"] },
    { title: "Design & Refine", timing: "Weeks 2–3", text: "Interfaces take shape in weekly reviews, so every screen is tested and polished before a line ships.", tools: ["Figma", "Claude", "Framer"] },
    { title: "Build & Integrate", timing: "Weeks 3–6", text: "Design and engineering move together on a production stack, connected to the tools you already use.", tools: ["React", "Supabase", "Vercel"] },
    { title: "Optimise & Grow", timing: "Every month", text: "We read the analytics, run experiments and ship improvements, so launch day is the start, not the end.", tools: ["Analytics", "Claude", "Supabase"] },
  ],
  services: [
    { title: "Websites that win customers", lead: "Turn first-time visitors into booked calls.", description: "Strategy, design and development in one focused sprint. Fast to launch, sharp on every screen, built to grow with you." },
    { title: "Web apps your team loves", lead: "Make complex workflows feel effortless.", description: "We turn operational headaches into intuitive, dependable tools that your team and customers reach for every day." },
    { title: "MVPs that get you to market", lead: "Launch the right first version in weeks.", description: "We shape the scope, prototype the core journey and ship a production-ready release, so real users shape what comes next." },
    { title: "Redesigns that lift results", lead: "Make what you have simpler, sharper and faster to use.", description: "We find the friction, modernise the interface and keep everything that already works, for more conversions with less risk." },
    { title: "A partner that keeps shipping", lead: "Your product, improving every single month.", description: "A steady rhythm of new features, design refinements and informed experiments, led by the people who built it." },
  ],
  support: [
    { title: "Predictable Rhythm", text: "A steady cadence of work with no surprises.", icon: "wallet" },
    { title: "Fast Delivery", text: "Small, meaningful improvements shipped weekly.", icon: "zap" },
    { title: "Senior Quality", text: "Experienced design and engineering on every task.", icon: "sparkles" },
    { title: "Flexible Support", text: "Scale up, pause or change focus as you need.", icon: "sliders" },
  ],
  faqs: [
    { question: "Who do you work with?", answer: "Startups, founders and growing businesses that need a website, web app or MVP designed and built by one team." },
    { question: "How long does a project take?", answer: "Websites in 2–3 weeks, MVPs in 4–6 weeks, based on the scope we agree upfront." },
    { question: "How do you work with clients?", answer: "Fixed-scope projects or an ongoing monthly partnership. We agree the plan together after a free 30-minute call." },
    { question: "Do you handle both design and development?", answer: "Yes. Design and engineering happen in the same team, side by side, with no handoffs." },
    { question: "What tech do you use?", answer: "React, TypeScript, Next.js, Supabase, Vercel and Figma." },
    { question: "Can you improve an existing product?", answer: "Yes. We audit what you have, then redesign or rebuild it step by step." },
    { question: "What happens after launch?", answer: "We keep improving it through a monthly improvement partnership, or hand it over with full documentation." },
    { question: "How do projects start?", answer: "Book a free call, share your idea, and receive a scope and timeline within 2 business days." },
  ],
  form: {
    timelines: ["As soon as possible", "Within a month", "1–3 months", "Just exploring"],
    sources: ["Instagram", "Google", "LinkedIn", "ChatGPT", "Referral", "Other"],
    needs: ["Website", "Web App", "MVP", "Redesign", "Ongoing Support"],
    success: "Thanks! We'll reply within 2 business days.",
  },
  footer: {
    statement: "We design and build digital products that keep getting better.",
    copyright: "© 2026 Iterate Studio. All rights reserved.",
  },
} as const;
