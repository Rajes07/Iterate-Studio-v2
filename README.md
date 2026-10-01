# Iterate Studio Landing

Build a complete, premium single-page landing site for "Iterate Studio", a design & development studio based in Chennai, India. Frontend only, no backend/database. Build EVERYTHING in this one pass, fully responsive and mobile-first.

VISUAL STYLE (modern premium SaaS-agency look):
- Light theme: off-white background #F7F7F5, white cards, near-black text #0B0B0C, one accent color electric blue #3B5BFF, soft gray borders.
- Font: Inter (Google Fonts). Big bold headlines (tight letter-spacing), comfortable body text.
- Rounded cards (24px radius), generous whitespace, subtle shadows, pill-shaped buttons.
- Subtle fade-up animations on scroll, smooth anchor scrolling, hover lift on cards, respect prefers-reduced-motion.
- Logo: text wordmark "iterate." with the dot in accent color.
- No stock photos. Use tasteful abstract gradient blocks and UI-like mock shapes (fake dashboard/mobile screens drawn with divs) as visuals.

DATA: create src/content/site.ts holding ALL editable content (contact, links, prices, projects, services, FAQs, gallery images) and render every section from it.
- email: hello@iterate.studio | whatsapp: https://wa.me/917358470999 | phone: +91 73584 70999 | bookingUrl: "#contact"
- prices (placeholders to edit later): website "From ₹XX,XXX", mvp "From ₹X,XX,XXX", retainer "From ₹XX,XXX/mo"

SECTIONS IN ORDER:

1. NAVBAR (sticky, blurred background): logo left; links Work, Services, Process, Pricing, FAQ; right: WhatsApp icon button + "Book a free call" primary pill. Mobile: hamburger drawer with the same links and both CTAs.

2. HERO: three small trust chips above headline: "📍 Based in Chennai" · "Est. 2025" · "Working with clients worldwide".
H1: "Design & Development Studio for Startups and Growing Businesses"
Sub: "We turn ideas into websites, web apps and MVPs in weeks, then keep improving them every month with real user data."
Buttons: "Book a free 30-min call" (primary) and "Chat on WhatsApp" (secondary, green WhatsApp icon).
Right/below: a large rounded visual showing a mocked product dashboard + phone screen built from divs with gradient accents.

3. TECH STRIP: "Built with modern tools" + monochrome row of names: React, TypeScript, Next.js, Supabase, Vercel, Figma, Tailwind (infinite marquee).

4. VALUE BANNER (dark card #0B0B0C, white text): "Get a designer and engineer in one team, without hiring in-house." Text: "No handoffs between agencies. The person who designs your product builds it, so nothing gets lost and everything ships faster." Button: "See pricing & availability" → #pricing.

5. LATEST WORK (#work): heading "Explore our latest work" + sub "Websites, web apps and products built for real users." Horizontal drag/swipe carousel with arrow buttons. Cards: large visual, tag pill ("Live Now" green dot or "Concept"), name, one-line description, "View Product" button (hide if url empty). Items:
- Vanascape Garden Studio · Live Now · "A landscape and garden design studio website for homes across Tamil Nadu." · url https://vanascape-garden-studio--mrajes466.replit.app
- Crumb & Co. · Live Now · "A bakery brand website with menu, gallery and online enquiries." · url ""
- Gang Challenge · Concept · "A habit-tracking app where friends compete on daily goals together." · url ""
- SaaS Dashboard · Concept · "An analytics dashboard concept for small teams." · url ""
Each card image = unique gradient with a mocked UI.

6. PROCESS (#process): heading "A faster way to design and build your product" + sub. 4 step cards in a row (stack on mobile), each with "Step 0X" label, title, text, timing pill, and a small mocked visual:
- Discover · Week 1 · "We define goals, users and must-have features, then map flows and a clickable prototype."
- Build · Weeks 2–4 · "Design and development run side by side with weekly demos."
- Launch · Weeks 4–6 · "Testing, performance, SEO basics, then we go live."
- Iterate · Every month · "We review analytics and ship improvements continuously. We don't stop at V1."

7. BENTO GRID (3 cards, varied sizes):
- Founder card: avatar placeholder circle "R", "Rajesh, Founder", "Engineer-led studio. You talk directly to the person building your product."
- Accent card: "Simple pricing. No surprises." + "See pricing" button.
- Big stat-style card: "Weeks, not months." + "Most projects go live in 2–6 weeks."

8. SERVICES (#services): heading "Services for teams that need to ship". 5 alternating left/right rows, each: "/01" number, title, bold one-liner, description, "Get Started" button → #contact, and a gradient mock visual on the other side:
- Website Design & Development: "Websites built to turn visitors into customers."
- Custom Web Applications: "Platforms that make complex workflows simple."
- MVP Development: "Launch the right first version fast, then learn from real users."
- Product Redesign: "Make an existing product simpler, sharper and easier to use."
- Ongoing Improvement: "A product partner that keeps measuring, shipping and improving."

9. LATEST DESIGN WORK: heading "Explore some of our latest design work". Two rows of tiles auto-scrolling in opposite directions (marquee), 8 tiles per row, each tile a different gradient mock UI screen (dashboards, mobile screens, landing pages). Tiles come from an array in site.ts so I can swap in real images later.

10. PRICING (#pricing): heading "Simple pricing. No surprises." 3 cards:
- Launch Site · website price · "2–3 weeks" · Responsive website, SEO basics, Analytics setup, 1 month support
- MVP · mvp price · "4–6 weeks" · Product design, Full-stack build, Auth + database, Launch support
- Monthly Iteration · retainer price · badge "Most popular", highlighted with accent border · Fixed monthly rate, Improvements shipped weekly, Direct founder access, Pause or cancel anytime
Each card: "Book a call" button.

11. MONTHLY SUPPORT: heading "Monthly product support as you grow". 4 icon cards: Fixed Monthly Rate, Fast Delivery, Senior Quality, Flexible Support, each with one short line.

12. FAQ (#faq): two columns. Left: "Got questions? We've got answers." + small text + founder card with "Book an intro call" button. Right: accordion:
- Who do you work with? → Startups, founders and growing businesses that need a website, web app or MVP designed and built by one team.
- How long does a project take? → Websites in 2–3 weeks, MVPs in 4–6 weeks, based on the scope we agree upfront.
- How does pricing work? → Fixed-scope projects or a monthly retainer. You get a clear quote after a free 30-minute call.
- Do you handle both design and development? → Yes. Design and engineering happen in the same team, side by side, with no handoffs.
- What tech do you use? → React, TypeScript, Next.js, Supabase, Vercel and Figma.
- Can you improve an existing product? → Yes. We audit what you have, then redesign or rebuild it step by step.
- What happens after launch? → We keep improving it through the Monthly Iteration plan, or hand it over with full documentation.
- How do projects start? → Book a free call, share your idea, and receive a scope, timeline and quote within 2 business days.

13. CLOSING BANNER (dark, huge type): "Most studios hand over V1. We keep going." Row: "DROP US A LINE" hello@iterate.studio | "WHATSAPP" +91 73584 70999 | "Book a free call" button.

14. CONTACT (#contact): card titled "Book a free discovery call". Fields: Full Name*, Email*, What are you building*, Project budget* (select: Under ₹50K, ₹50K–₹1.5L, ₹1.5L–₹5L, ₹5L+, Not sure yet), How did you find us* (Instagram, Google, LinkedIn, ChatGPT, Referral, Other), What do you need help with? (multi-select chips: Website, Web App, MVP, Redesign, Ongoing Support). Client-side validation; on submit show a success state "Thanks! We'll reply within 2 business days." Below: "Prefer email instead? hello@iterate.studio".

15. FOOTER: logo + "We design and build digital products that keep getting better." | Services column | Quick links (Work, Process, Pricing, FAQ, Contact) | Contact column (email, WhatsApp, Chennai, Tamil Nadu, India) | bottom bar "© 2026 Iterate Studio. All rights reserved." + Privacy Policy, Terms (# links).

GLOBAL:
- Floating WhatsApp button bottom-right on all pages.
- SEO: title "Iterate Studio — Design & Development Studio in Chennai", meta description "We design and build websites, web apps and MVPs for startups and growing businesses, then keep improving them after launch.", og:title, og:description, twitter:card summary_large_image. Do not include any @Lovable twitter handle.
- Semantic HTML, accessible labels, keyboard-navigable accordion and carousel.
- No lorem ipsum, no fake testimonials, no fake client logos, no fake statistics.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://iterate-studio-showcase.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5b00fa71-f842-4f2a-8645-9ca9904ae234).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
