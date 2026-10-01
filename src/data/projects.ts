export type ProjectTheme = {
  primary: string;
  onPrimary: string;
  accent: string;
  background: string;
  surface: string;
  foreground: string;
  muted: string;
  font: { heading: string; body: string; url: string; uppercase?: boolean };
};

export type ProjectContent = {
  hero: { eyebrow: string; title: string; subtitle: string; cta: string; image: string };
  features: { title: string; text: string }[];
  gallery: { src: string; alt: string; tall?: boolean }[];
  stats: { value: string; label: string }[];
  testimonial: { quote: string; name: string; role: string };
  cta: { title: string; text: string; label: string };
  theme: ProjectTheme;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  thumbnail: string;
  type: "external" | "internal";
  url?: string;
  content?: ProjectContent;
};

const gallery = (slug: string, name: string, count: number): ProjectContent["gallery"] =>
  Array.from({ length: count }, (_, i) => ({
    src: `/work/${slug}/gallery-${i + 1}.webp`,
    alt: `${name} screen ${i + 1}`,
    tall: i === 0,
  }));

export const projects: Project[] = [
  {
    slug: "nextshore",
    name: "NextShore",
    category: "Website",
    tagline: "A live website designed and built by Iterate Studio.",
    thumbnail: "/work/nextshore.webp",
    type: "external",
    url: "https://nextshore-six.vercel.app/",
  },
  {
    slug: "vanascape-garden-studio",
    name: "Vanascape Garden Studio",
    category: "Website",
    tagline: "A landscape and garden design studio website for homes across Tamil Nadu.",
    thumbnail: "/work/vanascape-garden-studio.webp",
    type: "external",
    url: "https://vanascape-garden-studio--mrajes466.replit.app/",
  },
  {
    slug: "volt-ride",
    name: "Volt Ride",
    category: "Mobility app · Concept",
    tagline: "Electric scooter rental by the minute across Chennai. Scan, ride, park.",
    thumbnail: "/work/volt-ride.webp",
    type: "internal",
    content: {
      hero: {
        eyebrow: "142 scooters live in Chennai",
        title: "Charge through Chennai.",
        subtitle: "Silent electric scooters you unlock with your phone. Ride from Adyar to OMR without the auto haggling.",
        cta: "Unlock your first ride",
        image: "/work/volt-ride/hero.webp",
      },
      features: [
        { title: "Scan", text: "Find a scooter on the map and scan the QR on the handlebar." },
        { title: "Ride", text: "Helmet's in the seat box. Ride anywhere inside the blue city zone." },
        { title: "Park", text: "End at any Volt station or marked bay. Snap a photo, done." },
        { title: "Know the fare first", text: "A live fare estimator shows the cost before you unlock." },
        { title: "Stations everywhere", text: "Live availability at Adyar, T. Nagar, OMR, Velachery and Anna Nagar." },
        { title: "Helmet & insurance", text: "Included with every ride, no add-ons to remember." },
      ],
      gallery: gallery("volt-ride", "Volt Ride", 4),
      stats: [
        { value: "80 km", label: "Range per charge" },
        { value: "45 km/h", label: "City-safe top speed" },
        { value: "142", label: "Scooters live" },
      ],
      testimonial: {
        quote: "I swapped my daily auto for a Volt and haven't looked back. Unlock, ride, park: it just works.",
        name: "Karthik S.",
        role: "Daily commuter, OMR",
      },
      cta: { title: "First 10 minutes are on us.", text: "Download the app and take your first ride today.", label: "Get the app" },
      theme: {
        primary: "#2E5BFF", onPrimary: "#FFFFFF", accent: "#D4FF3A",
        background: "#0A0A0A", surface: "#141416", foreground: "#F2F2F2", muted: "#8C8C92",
        font: { heading: '"Barlow Condensed", sans-serif', body: '"Inter", sans-serif', url: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&display=swap", uppercase: true },
      },
    },
  },
  {
    slug: "nomad-desk",
    name: "Nomad Desk",
    category: "Coworking · Concept",
    tagline: "A Chennai coworking space with bookable desks, passes and a live floor plan.",
    thumbnail: "/work/nomad-desk.webp",
    type: "internal",
    content: {
      hero: {
        eyebrow: "Coworking · Nungambakkam, Chennai",
        title: "A desk in Chennai, by the day.",
        subtitle: "Fast Wi-Fi, real chairs, filter coffee on tap and zero lock-in. Come for a day; stay for as long as it works.",
        cta: "Book today's desk",
        image: "/work/nomad-desk/hero.webp",
      },
      features: [
        { title: "Backup everything", text: "Two fibre lines and a 4-hour inverter. Power cuts don't exist here." },
        { title: "Chairs that care", text: "Ergonomic seating, monitor arms on request, standing desks by the window." },
        { title: "Six call booths", text: "Soundproofed, ventilated, bookable in 15-minute slots." },
        { title: "Filter coffee bar", text: "Fresh decoction twice a day. Cold brew in summer." },
        { title: "Quiet floor", text: "Floor 3 is phone-free. Headphones, focus, nothing else." },
        { title: "Community nights", text: "Monthly founder talks and Friday chai sessions." },
      ],
      gallery: gallery("nomad-desk", "Nomad Desk", 3),
      stats: [
        { value: "84", label: "Desks" },
        { value: "300 Mbps", label: "Fibre, backed up" },
        { value: "6", label: "Call booths" },
      ],
      testimonial: {
        quote: "The only coworking where the Wi-Fi never drops and the coffee is genuinely good. It's become our team's second office.",
        name: "Divya R.",
        role: "Founder, early-stage startup",
      },
      cta: { title: "Book a desk or a tour.", text: "14, Haddows Road, Nungambakkam. Open 8 AM–10 PM, Monday to Friday.", label: "Book a desk" },
      theme: {
        primary: "#FF5A1F", onPrimary: "#111111", accent: "#111111",
        background: "#E4E2DD", surface: "#D6D3CC", foreground: "#111111", muted: "#5A5852",
        font: { heading: '"Inter Tight", sans-serif', body: '"Inter", sans-serif', url: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@600;700&display=swap" },
      },
    },
  },
  {
    slug: "paw-and-co",
    name: "Paw & Co.",
    category: "Pet care · Concept",
    tagline: "Grooming and daycare for dogs, with one-tap booking and WhatsApp updates.",
    thumbnail: "/work/paw-and-co.webp",
    type: "internal",
    content: {
      hero: {
        eyebrow: "Grooming & daycare · Anna Nagar, Chennai",
        title: "Spa days for very good dogs.",
        subtitle: "Gentle baths, breed-right haircuts and a sunny daycare, by groomers who take it slow.",
        cta: "Book a grooming slot",
        image: "/work/paw-and-co/hero.webp",
      },
      features: [
        { title: "Bath & blow-dry", text: "Gentle shampoo, conditioner, ear clean and a fluffy finish." },
        { title: "Full groom", text: "Everything in the bath, plus a breed-right haircut and nail trim." },
        { title: "Paw spa", text: "Paw balm, nail grind and a pad trim for city-worn feet." },
        { title: "Fresh breath", text: "Enzyme teeth brushing that most dogs actually tolerate." },
        { title: "Free pick-up", text: "Crate-free pick-up within 5 km of Anna Nagar." },
        { title: "Photo updates", text: "The same groomer greets, grooms and sends you photos." },
      ],
      gallery: gallery("paw-and-co", "Paw & Co.", 3),
      stats: [
        { value: "1:1", label: "Groomer per dog" },
        { value: "No cages", label: "Open play areas" },
        { value: "5 km", label: "Free pick-up radius" },
      ],
      testimonial: {
        quote: "Bruno comes home calmer than he left, and I get photos halfway through. We wouldn't go anywhere else.",
        name: "Anjali M.",
        role: "Bruno's human",
      },
      cta: { title: "Book a slot for your dog.", text: "We'll confirm the time on WhatsApp within the hour.", label: "Request booking" },
      theme: {
        primary: "#FFB59E", onPrimary: "#3B2A25", accent: "#BFE6D6",
        background: "#FFF6EE", surface: "#FFD9CC", foreground: "#3B2A25", muted: "#7A645C",
        font: { heading: '"Poppins", sans-serif', body: '"Poppins", sans-serif', url: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" },
      },
    },
  },
  {
    slug: "smile-studio",
    name: "Smile Studio",
    category: "Healthcare · Concept",
    tagline: "A calm dental clinic site with clear treatments and online appointment booking.",
    thumbnail: "/work/smile-studio.webp",
    type: "internal",
    content: {
      hero: {
        eyebrow: "Accepting new patients · Alwarpet",
        title: "Dentistry that feels like a deep breath.",
        subtitle: "Unhurried appointments, honest treatment plans and a team that explains before it drills.",
        cta: "Book a check-up",
        image: "/work/smile-studio/hero.webp",
      },
      features: [
        { title: "Check-up & cleaning", text: "A full exam, digital X-ray if needed, and a gentle ultrasonic clean." },
        { title: "Clear aligners", text: "Invisible trays, a 3D preview of your result and monthly check-ins." },
        { title: "Dental implants", text: "Permanent, natural-looking replacements planned with a CBCT scan." },
        { title: "Whitening", text: "In-chair or take-home, with shade checks so it never looks fake." },
        { title: "Root canal", text: "Single-sitting where possible, under full numbing." },
        { title: "Kids' dentistry", text: "Short, playful visits that build trust before anything else." },
      ],
      gallery: gallery("smile-studio", "Smile Studio", 4),
      stats: [
        { value: "45 min", label: "First consultation" },
        { value: "Written", label: "Costs before treatment" },
        { value: "Sat", label: "& evening slots" },
      ],
      testimonial: {
        quote: "They showed me the photos, explained my options and let me decide. First time I've left a dentist feeling calm.",
        name: "Priya N.",
        role: "Patient, Alwarpet",
      },
      cta: { title: "Book a calm visit.", text: "2nd Floor, 48 TTK Road, Alwarpet. Mon–Sat, 9 AM–8 PM.", label: "Request appointment" },
      theme: {
        primary: "#0F4C47", onPrimary: "#FFFFFF", accent: "#CDEFE3",
        background: "#FBFDFC", surface: "#E8F7F1", foreground: "#1D3532", muted: "#5E7572",
        font: { heading: '"Lora", serif', body: '"Poppins", sans-serif', url: "https://fonts.googleapis.com/css2?family=Lora:wght@500;600&family=Poppins:wght@400;500;600&display=swap" },
      },
    },
  },
  {
    slug: "tiffin-tales",
    name: "Tiffin Tales",
    category: "Food delivery · Concept",
    tagline: "Home-cooked lunch subscriptions delivered at 1 PM, with a weekly menu and skip-anytime plans.",
    thumbnail: "/work/tiffin-tales.webp",
    type: "internal",
    content: {
      hero: {
        eyebrow: "Cooked this morning in Mylapore",
        title: "Home food, delivered at 1 PM. Every single day.",
        subtitle: "Rice, sambar, poriyal and a little something sweet, cooked by home chefs and packed in steel tiffins.",
        cta: "Start a 5-day trial",
        image: "/work/tiffin-tales/hero.webp",
      },
      features: [
        { title: "Fresh market, 6 AM", text: "Vegetables bought the same morning in Mylapore." },
        { title: "Home chefs, 9 AM", text: "Small batches, family recipes, no shortcuts." },
        { title: "Out for delivery, 12 PM", text: "Packed hot in steel and sealed in insulated bags." },
        { title: "Skip any day", text: "Pause or skip by 9 PM the night before." },
        { title: "Steel tiffins", text: "No plastic. We collect yesterday's tiffin when we drop today's." },
        { title: "Nine areas, growing", text: "Central and south Chennai, opening new areas when 30 neighbours ask." },
      ],
      gallery: gallery("tiffin-tales", "Tiffin Tales", 4),
      stats: [
        { value: "1 PM", label: "Hot at your desk" },
        { value: "9", label: "Chennai areas served" },
        { value: "0", label: "Palm oil, ever" },
      ],
      testimonial: {
        quote: "It tastes like my mother's cooking, and it's at my desk before I even get hungry. Lunch is finally sorted.",
        name: "Ramesh K.",
        role: "Subscriber, T. Nagar",
      },
      cta: { title: "Tomorrow's lunch, sorted.", text: "Order by 9 PM and we'll be at your door at 1 PM tomorrow.", label: "Place order" },
      theme: {
        primary: "#2F6B2F", onPrimary: "#FFFFFF", accent: "#F6B81A",
        background: "#FFF6E5", surface: "#FFFFFF", foreground: "#1F2A1A", muted: "#5C6A55",
        font: { heading: '"Poppins", sans-serif', body: '"Poppins", sans-serif', url: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" },
      },
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
