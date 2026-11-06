/**
 * All site copy and data lives here, so Angelina's words and photographs can
 * replace these drafts without touching layout code.
 */

export const site = {
  name: "not all beige",
  legalName: "Not All Beige",
  email: "hello@notallbeige.com",
  url: "https://www.notallbeige.com",
  description:
    "Not All Beige is the London interior design practice of Angelina Severino. Homes with colour, pattern and a point of view.",
  founderUrl: "https://www.angelinaseverino.com/ventures",
  linkedin: "https://www.linkedin.com/in/angelina-severino/",
  posteress: "https://posteress.com",
};

export type PaintKey =
  | "romesco"
  | "lulworth"
  | "india"
  | "shallot"
  | "calamine"
  | "bancha"
  | "hague"
  | "aulait"
  | "macadamia"
  | "oldwhite";

export type Paint = {
  key: PaintKey;
  name: string;
  /** Farrow & Ball colour number. */
  code: string;
  /** Text colour that reads on this paint. */
  ink: PaintKey;
  note: string;
};

/** Farrow & Ball names. The hex values live in app/globals.css as on-screen matches. */
export const paints: Paint[] = [
  { key: "romesco", name: "romesco", code: "CB4", ink: "aulait", note: "Red walls make dinner last longer." },
  { key: "lulworth", name: "lulworth blue", code: "No. 89", ink: "hague", note: "The sky, brought indoors." },
  { key: "india", name: "india yellow", code: "No. 66", ink: "hague", note: "Sunshine on a wet Tuesday." },
  { key: "shallot", name: "shallot", code: "CB3", ink: "hague", note: "Pink with opinions." },
  { key: "calamine", name: "calamine", code: "No. 230", ink: "hague", note: "A blush, not a whisper." },
  { key: "bancha", name: "bancha", code: "No. 298", ink: "aulait", note: "Green tea for grown-ups." },
  { key: "hague", name: "hague blue", code: "No. 30", ink: "aulait", note: "Deep enough to lose a weekend in." },
  { key: "aulait", name: "au lait", code: "CB9", ink: "hague", note: "Allowed, if the sofa is loud." },
  { key: "macadamia", name: "roasted macadamia", code: "CB2", ink: "hague", note: "The only beige we trust." },
  { key: "oldwhite", name: "old white", code: "No. 4", ink: "hague", note: "Are you sure?" },
];

export const paint = (key: PaintKey) => `var(--color-${key})`;
export const findPaint = (key: PaintKey) => paints.find((item) => item.key === key) as Paint;

export type NavItem = { href: string; label: string; paint: PaintKey; ink: PaintKey };

export const nav: NavItem[] = [
  { href: "/services", label: "services", paint: "romesco", ink: "aulait" },
  { href: "/portfolio", label: "portfolio", paint: "lulworth", ink: "hague" },
  { href: "/about", label: "about", paint: "india", ink: "hague" },
  { href: "/shop", label: "shop", paint: "shallot", ink: "hague" },
  { href: "/podcasts", label: "podcasts", paint: "bancha", ink: "aulait" },
  { href: "/contact", label: "contact", paint: "hague", ink: "aulait" },
];

export const home = {
  hero: {
    coverline: ["signature interiors by", "angelina severino"],
    scrollCue: "scroll to come in",
    tinPrompt: { title: "press a tin", body: "Go on, repaint the room." },
  },
  intro: {
    title: "life’s too short for magnolia.",
    lead: "Not All Beige is the interior design practice of Angelina Severino, based in London. We make homes that look like the people who live in them.",
    body: "Too many rooms could belong to anyone. We start with you, then find the colour, the pattern and the unrepeatable pieces that make a house feel like yours. The aim is a home you will still love long after the trends have moved on.",
  },
  doors: {
    title: "pick a door.",
    lead: "Three ways to work together, whatever the size of the job.",
  },
  rooms: {
    title: "the rooms.",
    lead: "Room by room, drawn while the photographs are on their way.",
  },
  palette: {
    title: "ten colours. no apologies.",
    lead: "The studio palette, by Farrow & Ball. Tap one to see what it’s for.",
  },
  marquee: ["no magnolia", "no greige", "no matching sets", "no safe choices", "no apologies"],
  open: {
    title: "come on in.",
    lead: "For interior design, press, or a long talk about paint.",
  },
};

export type Service = {
  id: string;
  door: string;
  title: string;
  short: string;
  body: string;
  includes: string[];
  paint: PaintKey;
  ink: PaintKey;
  leaf: PaintKey;
};

export const services: Service[] = [
  {
    id: "whole-house",
    door: "1",
    title: "the whole house",
    short: "Full interior design, from the first brief to the last cushion.",
    body: "Full interior design for homes and the occasional brave commercial space. We plan the layouts, draw the joinery and choose every colour, fabric and lamp, then work with architects, makers and trades right through to installation day.",
    includes: ["Space planning and elevations", "Colour, pattern and materials", "Furniture, lighting and art", "Bespoke joinery and upholstery", "Installation and styling"],
    paint: "calamine",
    ink: "hague",
    leaf: "romesco",
  },
  {
    id: "one-room",
    door: "2",
    title: "a room at a time",
    short: "One-to-one consultancy for people doing it themselves.",
    body: "One-to-one sessions for anyone taking on their own project. Bring your floor plans, your screenshots and your questions. Leave with a layout, a scheme and a shopping list you can carry forward yourself.",
    includes: ["Furniture layouts", "Room-by-room schemes", "Sourcing lists", "A second opinion when you need one"],
    paint: "lulworth",
    ink: "hague",
    leaf: "hague",
  },
  {
    id: "just-colour",
    door: "3",
    title: "just the colour",
    short: "A paint and pattern plan for your whole home, room by room.",
    body: "For when you know beige isn’t the answer but can’t face the colour chart alone. We build a paint and pattern plan for every room: walls, woodwork, ceilings and the bits everyone forgets.",
    includes: ["Paint schedule for every room", "Woodwork, ceilings and floors", "Pattern and fabric pairings", "Sample boards to live with"],
    paint: "india",
    ink: "hague",
    leaf: "bancha",
  },
];

export const process = [
  { title: "hello", body: "We talk about how you live, what you love and what you never want to see again." },
  { title: "the scheme", body: "Plans, elevations, samples and a palette you can hold in your hands." },
  { title: "the making", body: "Painters, makers and upholsterers get to work. We manage the moving parts." },
  { title: "the reveal", body: "We style the last shelf, plump the last cushion and hand over the keys." },
];

export type Room = {
  slug: string;
  title: string;
  /** Lead colour, used for the page and the card. */
  paint: PaintKey;
  ink: PaintKey;
  story: string;
  /** `label` replaces the paint name, for wallpapers. */
  scheme: { part: string; paint: PaintKey; label?: string }[];
  /** Add photographs here as they arrive. Each entry replaces the illustration on the room's page. */
  photos: { src: string; alt: string }[];
};

export const rooms: Room[] = [
  {
    slug: "entrance",
    title: "the entrance",
    paint: "hague",
    ink: "aulait",
    story: "Hague Blue wraps the whole room in shadow, so the Romesco door does all the talking. You can see it from the end of the street.",
    scheme: [
      { part: "walls", paint: "hague" },
      { part: "front door", paint: "romesco" },
      { part: "plinths", paint: "romesco" },
    ],
    photos: [],
  },
  {
    slug: "hallway",
    title: "the hallway",
    paint: "romesco",
    ink: "aulait",
    story: "Romesco on every surface, woodwork and all, with Stripe wallpaper running across the ceiling. Walking to the kitchen should never be boring.",
    scheme: [
      { part: "walls and woodwork", paint: "romesco" },
      { part: "ceiling", paint: "shallot", label: "stripe wallpaper" },
    ],
    photos: [],
  },
  {
    slug: "kitchen",
    title: "the kitchen",
    paint: "calamine",
    ink: "hague",
    story: "Calamine walls, a soft, warm pink that makes toast feel like an occasion, over a Hague Blue backsplash and cupboards, with a Bancha range cooker and a blue and white geometric floor.",
    scheme: [
      { part: "walls", paint: "calamine" },
      { part: "cupboards and backsplash", paint: "hague" },
      { part: "range cooker", paint: "bancha" },
      { part: "plinths", paint: "romesco" },
      { part: "floor", paint: "hague", label: "blue and white tiles" },
    ],
    photos: [],
  },
  {
    slug: "living-room",
    title: "the living room",
    paint: "lulworth",
    ink: "hague",
    story: "Lulworth Blue walls under an Au Lait ceiling, with every plinth in Romesco. A clear sky of a room, with a red line drawn under it.",
    scheme: [
      { part: "walls", paint: "lulworth" },
      { part: "ceiling", paint: "aulait" },
      { part: "plinths", paint: "romesco" },
      { part: "armchairs", paint: "calamine" },
    ],
    photos: [],
  },
  {
    slug: "bedroom",
    title: "the bedroom",
    paint: "bancha",
    ink: "aulait",
    story: "Deep Bancha green against Dot wallpaper, its Shallot spots swelling and fading across a Romesco ground. A room for sleeping late on purpose.",
    scheme: [
      { part: "woodwork", paint: "bancha" },
      { part: "walls", paint: "romesco", label: "dot wallpaper" },
      { part: "plinths", paint: "romesco" },
    ],
    photos: [],
  },
  {
    slug: "childrens-bedroom",
    title: "the children’s bedroom",
    paint: "macadamia",
    ink: "hague",
    story: "Roasted Macadamia walls with Romesco and Au Lait, and Stripe wallpaper turned on its side, so one red line runs along under the ceiling.",
    scheme: [
      { part: "walls", paint: "macadamia" },
      { part: "woodwork", paint: "romesco" },
      { part: "ceiling", paint: "aulait" },
      { part: "ceiling band", paint: "shallot", label: "stripe wallpaper" },
    ],
    photos: [],
  },
  {
    slug: "bathroom",
    title: "the bathroom",
    paint: "oldwhite",
    ink: "hague",
    story: "Old White keeps things calm, then Romesco and India Yellow cheerfully ruin that. A bath should always be a little theatrical.",
    scheme: [
      { part: "walls", paint: "oldwhite" },
      { part: "bath", paint: "romesco" },
      { part: "tiles", paint: "india" },
      { part: "floor", paint: "bancha", label: "bancha and old white" },
      { part: "plinths", paint: "romesco" },
    ],
    photos: [],
  },
];

export const about = {
  title: "hello, i’m angelina.",
  body: [
    "I have spent two decades in design, working across art direction, brand and digital product. Through Posteress I make poster art, rooted in graphic design and typography.",
    "Not All Beige brings all of that home. A good room needs what any good piece of design needs: a clear idea, a bit of nerve and a great deal of care.",
    "Beauty, clarity and delight are where design creates its greatest value. They are also what make you happy to walk through your own front door.",
  ],
  beliefs: ["colour is not a risk. beige is.", "a room should have a sense of humour.", "buy less. love it more.", "the ceiling is the fifth wall.", "every home needs one thing that makes no sense."],
};

export const shop = {
  title: "wet paint.",
  lead: "The Not All Beige shop opens soon: the lamps, cushions and small loud things we can never find anywhere else.",
  posteress: "In the meantime, your walls can have a poster. Posteress is Angelina’s independent visual art practice, rooted in graphic design and typography.",
};

export const podcasts = {
  title: "listen in.",
  lead: "Angelina in conversation on design, poster art and creative leadership.",
  episodes: [
    {
      title: "Angelina Severino Loves Creating Poster Art",
      show: "Design Downtime Podcast",
      year: "2024",
      href: "https://open.spotify.com/episode/6hkuVK6oiniTxcaomlH535",
      paint: "romesco" as PaintKey,
      ink: "aulait" as PaintKey,
    },
    {
      title: "Maximising Design Impact through Holistic Leadership and Innovation",
      show: "Ladies that UX Global Podcast",
      year: "2024",
      href: "https://open.spotify.com/episode/3WHnJ2y6N9OFzcWLH4Cjgt?si=453c8c6299614afb",
      paint: "india" as PaintKey,
      ink: "hague" as PaintKey,
    },
  ],
};

export const contact = {
  title: "come on in.",
  lead: "Tell us about your home, your project or the colour you can’t stop thinking about.",
  place: "London, United Kingdom",
};

/** How the hero room dresses itself for each wall colour. */
export type HeroScheme = {
  ink: PaintKey;
  a: PaintKey;
  b: PaintKey;
  trim: PaintKey;
  floor: PaintKey;
  bloom: PaintKey;
  vase: PaintKey;
  shade: PaintKey;
  fringe: PaintKey;
  room: PaintKey;
};

export const heroSchemes: Record<PaintKey, HeroScheme> = {
  romesco: { ink: "aulait", a: "india", b: "lulworth", trim: "aulait", floor: "hague", bloom: "shallot", vase: "india", shade: "india", fringe: "hague", room: "lulworth" },
  lulworth: { ink: "hague", a: "romesco", b: "india", trim: "aulait", floor: "hague", bloom: "romesco", vase: "india", shade: "romesco", fringe: "india", room: "india" },
  india: { ink: "hague", a: "romesco", b: "lulworth", trim: "aulait", floor: "bancha", bloom: "hague", vase: "romesco", shade: "hague", fringe: "romesco", room: "romesco" },
  shallot: { ink: "hague", a: "romesco", b: "india", trim: "aulait", floor: "romesco", bloom: "bancha", vase: "india", shade: "romesco", fringe: "india", room: "bancha" },
  calamine: { ink: "romesco", a: "india", b: "lulworth", trim: "aulait", floor: "bancha", bloom: "romesco", vase: "india", shade: "bancha", fringe: "romesco", room: "bancha" },
  bancha: { ink: "calamine", a: "romesco", b: "india", trim: "calamine", floor: "hague", bloom: "shallot", vase: "india", shade: "india", fringe: "romesco", room: "shallot" },
  hague: { ink: "aulait", a: "romesco", b: "india", trim: "aulait", floor: "bancha", bloom: "shallot", vase: "india", shade: "india", fringe: "romesco", room: "romesco" },
  aulait: { ink: "romesco", a: "india", b: "lulworth", trim: "oldwhite", floor: "hague", bloom: "romesco", vase: "india", shade: "hague", fringe: "romesco", room: "romesco" },
  macadamia: { ink: "hague", a: "romesco", b: "india", trim: "aulait", floor: "hague", bloom: "romesco", vase: "india", shade: "romesco", fringe: "hague", room: "romesco" },
  oldwhite: { ink: "hague", a: "romesco", b: "india", trim: "aulait", floor: "hague", bloom: "aulait", vase: "aulait", shade: "aulait", fringe: "hague", room: "romesco" },
};
