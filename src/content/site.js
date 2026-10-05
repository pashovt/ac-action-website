/**
 * AC Action Ltd — site content and configuration.
 *
 * Source of truth for every word on the page. Facts come from the client
 * brief (six-panel A5 leaflet) and business card:
 *   - Business name: "AC Action" / "AC Action Ltd" (NOT "AC Action Show").
 *   - Vending Solutions — Snacks · Drinks · More.
 *   - Offer: crisps & snacks, chocolate & confectionery, bottled & canned drinks.
 *   - Operating in: warehouses, call centres, high-rise buildings, office spaces.
 *   - Ideal for workplaces with 50+ employees.
 *   - Area: businesses within approximately 15 miles of Nottingham.
 *   - Tagline: "Bringing convenience to your building."
 *
 * Anything not yet confirmed by the client is marked TO CONFIRM and is worded
 * so it makes no promise (no "free", no response times, no prices).
 */

const media = (file) => `${import.meta.env.BASE_URL}media/${file}`;

export const brand = {
  name: 'AC Action',
  legalName: 'AC Action Ltd',
  descriptor: 'Vending Solutions',
  strapline: ['Snacks', 'Drinks', 'More'],
  tagline: 'Bringing convenience to your building.',
  intro: 'Quality snacks and drinks, conveniently placed in your workplace.',
};

/**
 * Contact details — TO CONFIRM. Leave a value empty ('') until it is
 * confirmed; empty values render as "to be confirmed" text, never a dead link.
 */
export const contact = {
  phone: '', // e.g. '0115 000 0000'
  email: '', // e.g. 'hello@acaction.co.uk'
  areaLine: 'Serving businesses within around 15 miles of Nottingham',
};

export const nav = {
  links: [
    { label: 'About', href: '#about' },
    { label: 'Our range', href: '#range' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Service area', href: '#service' },
  ],
  cta: { label: 'Discuss your site', href: '#contact' },
};

/**
 * Photography: Unsplash Licence (free to use, no attribution required).
 * Sources listed in README.md. Illustrative only — replace with photos of
 * AC Action machines and real client sites when available.
 */
export const photos = {
  warehouse: { src: media('warehouse.webp'), width: 1800, height: 1200, alt: 'A large, brightly lit warehouse floor with a polished concrete finish.' },
  callcentre: { src: media('callcentre.webp'), width: 1600, height: 1067, alt: 'An open-plan office with rows of desks, screens and desk phones.' },
  highrise: { src: media('highrise.webp'), width: 1600, height: 1067, alt: 'A curved, glass-fronted high-rise office building against a clear sky.' },
  office: { src: media('workplace.webp'), width: 1800, height: 1200, alt: 'A modern office kitchen with dark cabinets, a white worktop and a coffee machine.' },
};

/** Panel 1 — cover (hero). The leaflet opens on scroll on desktop. */
export const hero = {
  kicker: 'Vending for Nottingham businesses',
  heading: 'Bringing convenience to your building.',
  lead: 'Quality snacks and drinks, conveniently placed in your workplace — for warehouses, offices, call centres and high-rise buildings.',
  primaryCta: { label: 'Discuss your site', href: '#contact' },
  secondaryCta: { label: 'See our range', href: '#range' },
  chips: ['Crisps & snacks', 'Chocolate & confectionery', 'Bottled & canned drinks'],
  // Inside panels revealed when the leaflet opens (decorative previews).
  inside: [
    { title: 'Who we are', body: 'A local vending business placing quality snacks and drinks where your people work.' },
    { title: 'Our range', body: 'Crisps, chocolate and chilled drinks — a familiar choice for every break.' },
    { title: 'Where we work', body: 'Warehouses, call centres, high-rise buildings and office spaces around Nottingham.' },
  ],
};

/** Panel 2 — business introduction. */
export const about = {
  id: 'about',
  panel: '02',
  eyebrow: 'About AC Action',
  heading: 'Local vending, focused on your building.',
  body: [
    'AC Action Ltd provides vending machines stocked with snacks, chocolate and drinks for businesses within around 15 miles of Nottingham.',
    'We work with the people responsible for a building — owners, facilities managers and site leads — to put good refreshments within easy reach of the staff and visitors who use it every day.',
  ],
  points: [
    { title: 'Local to Nottingham', body: 'A service area of around 15 miles, so we know the roads, the sites and the shift patterns.' },
    { title: 'Built around your site', body: 'Machine placement and product choice planned around the people using the space.' },
    { title: 'Straightforward to talk to', body: 'A direct conversation about your building and what would work there.' },
  ],
};

/** Panel 3 — the vending offer. */
export const range = {
  id: 'range',
  panel: '03',
  eyebrow: 'Our range',
  heading: 'Snacks, chocolate and drinks people actually reach for.',
  intro: 'A familiar, well-stocked selection across three ranges. The exact mix is planned with you for your site.',
  categories: [
    {
      title: 'Crisps & snacks',
      body: 'Favourite crisps and savoury snacks for a quick break between tasks.',
      products: [{ type: 'crisps', variant: 'amber' }, { type: 'crisps', variant: 'red' }, { type: 'crisps', variant: 'blue' }],
    },
    {
      title: 'Chocolate & confectionery',
      body: 'Chocolate bars and sweet treats for that mid-shift lift.',
      products: [{ type: 'chocolate', variant: 'purple' }, { type: 'chocolate', variant: 'red' }, { type: 'chocolate', variant: 'gold' }],
    },
    {
      title: 'Bottled & canned drinks',
      body: 'Cold cans, soft drinks and bottled water to keep people refreshed.',
      products: [{ type: 'can', variant: 'coral' }, { type: 'bottle' }, { type: 'can', variant: 'teal' }],
    },
  ],
  note: 'Product selection is agreed for each site and may vary with availability.',
};

/** Panel 4 — workplace benefits + sectors. */
export const benefits = {
  id: 'benefits',
  panel: '04',
  eyebrow: 'Workplace benefits',
  heading: 'A better building to work in.',
  intro: 'Convenient access to snacks and drinks is a simple upgrade to the amenities your building offers.',
  items: [
    { title: 'Refreshments on site', body: 'Staff and building users can grab a drink or snack without leaving the premises.' },
    { title: 'Shorter, better breaks', body: 'No trip to the shop, so breaks are spent resting rather than queuing.' },
    { title: 'Suits every shift', body: 'A machine is there whenever your building is open — early starts, late finishes and night shifts.' },
    { title: 'A visible amenity', body: 'A well-stocked machine shows staff and visitors the building is looked after.' },
    { title: 'Ideal for 50+ employees', body: 'Best suited to workplaces and buildings with around fifty or more people on site.' },
  ],
  sectorsHeading: 'Operating in',
  sectors: [
    { title: 'Warehouses', photo: 'warehouse', body: 'Refreshments within reach across long shifts and busy pick times.' },
    { title: 'Call centres', photo: 'callcentre', body: 'Quick breaks between calls, without leaving the floor for long.' },
    { title: 'High-rise buildings', photo: 'highrise', body: 'One convenient point for every tenant and visitor in the building.' },
    { title: 'Office spaces', photo: 'office', body: 'A better break area for teams of every size.' },
  ],
};

/** Panel 5 — service and coverage. */
export const service = {
  id: 'service',
  panel: '05',
  eyebrow: 'Service & coverage',
  heading: 'How it works.',
  // TO CONFIRM: service arrangements (installation, restocking frequency,
  // maintenance, payment options and any costs). Wording stays conditional.
  steps: [
    { title: 'Get in touch', body: 'Tell us about your building, how many people use it and where a machine might go.' },
    { title: 'Site discussion', body: 'We talk through space, power, access and the products that would suit your people.' },
    { title: 'Installation', body: 'Your machine is placed and stocked as agreed.' },
    { title: 'Ongoing service', body: 'Restocking and upkeep follow the arrangement agreed for your site.' },
  ],
  serviceNote: 'Service arrangements are confirmed with each site before installation.',
  coverage: {
    heading: 'Around 15 miles of Nottingham',
    body: 'We work with businesses across Nottingham and the surrounding area. Not sure if you are in range? Ask us.',
    // Approximate positions on an illustrative map (not to scale):
    // angle in degrees clockwise from north, distance in miles from the city centre.
    places: [
      { name: 'Nottingham', angle: 0, miles: 0 },
      { name: 'West Bridgford', angle: 150, miles: 2 },
      { name: 'Beeston', angle: 235, miles: 3.5 },
      { name: 'Arnold', angle: 15, miles: 4 },
      { name: 'Carlton', angle: 80, miles: 3.5 },
      { name: 'Clifton', angle: 195, miles: 4 },
      { name: 'Hucknall', angle: 340, miles: 7 },
      { name: 'Ilkeston', angle: 280, miles: 8 },
      { name: 'Long Eaton', angle: 235, miles: 8.5 },
      { name: 'Bingham', angle: 95, miles: 9 },
      { name: 'Eastwood', angle: 305, miles: 8 },
      { name: 'Ruddington', angle: 175, miles: 5 },
    ],
  },
};

/** Panel 6 — contact and enquiry. */
export const enquiry = {
  id: 'contact',
  panel: '06',
  eyebrow: 'Contact',
  heading: 'Let’s talk about your building.',
  intro: 'Tell us a little about your site and we’ll come back to discuss what would work for you.',
  whatWeAsk: ['What kind of building it is', 'Roughly how many people use it each day', 'Where a machine might go'],
  siteTypes: [
    { value: '', label: 'Select a site type' },
    { value: 'warehouse', label: 'Warehouse or distribution' },
    { value: 'callcentre', label: 'Call centre' },
    { value: 'highrise', label: 'High-rise or multi-tenant building' },
    { value: 'office', label: 'Office space' },
    { value: 'other', label: 'Other workplace' },
  ],
  dailyUsers: [
    { value: '', label: 'Not sure / prefer not to say' },
    { value: 'under-50', label: 'Under 50' },
    { value: '50-150', label: '50 to 150' },
    { value: '150-400', label: '150 to 400' },
    { value: '400-plus', label: 'More than 400' },
  ],
  submitLabel: 'Preview enquiry',
  // TO CONFIRM: connect a real form endpoint (see src/lib/enquiry.js).
  demoNote: 'Preview form — enquiries are not sent yet. Please call or email us.',
  resultHeading: 'Enquiry prepared. It has not been sent.',
  resultBody: 'The online form is not connected yet. Please contact us by phone or email using the details on this page.',
};

export const faq = {
  id: 'faq',
  eyebrow: 'Questions',
  heading: 'Good to know.',
  items: [
    { q: 'Which areas do you cover?', a: 'We work with businesses within around 15 miles of Nottingham. If you are near the edge of that area, get in touch and we will let you know.' },
    { q: 'What kind of workplaces is vending suited to?', a: 'Warehouses, call centres, high-rise and multi-tenant buildings and office spaces — generally sites with around fifty or more people.' },
    { q: 'What products can the machine hold?', a: 'Crisps and snacks, chocolate and confectionery, and bottled and canned drinks. The exact mix is agreed for your site.' },
    { q: 'Who looks after the machine?', a: 'Restocking and upkeep follow the service arrangement agreed for your site before installation.' },
    { q: 'How do we get started?', a: 'Call, email or send an enquiry with a few details about your building, and we will arrange a conversation.' },
  ],
};

export const decor = {
  hero: [
    { type: 'can', variant: 'coral', top: '13%', right: '36%', size: '3.6rem', rotate: -14, depth: 0.7, mobile: false },
    { type: 'chocolate', variant: 'gold', bottom: '9%', left: '46%', size: '7rem', rotate: 10, depth: 0.4, mobile: false },
    { type: 'crisps', variant: 'amber', top: '22%', right: '5%', size: '5.5rem', rotate: 12, depth: 0.5, mobile: false },
    { type: 'bottle', bottom: '14%', right: '8%', size: '3.6rem', rotate: -8, depth: 0.8, mobile: false },
  ],
  contact: [
    { type: 'chocolate', variant: 'purple', top: '5%', left: '40%', size: '6rem', rotate: -8, depth: 0.5, mobile: false },
    { type: 'can', variant: 'teal', bottom: '6%', right: '3%', size: '3.4rem', rotate: 12, depth: 0.7, mobile: false },
  ],
};

export const footer = {
  links: [...nav.links, { label: 'Questions', href: '#faq' }, { label: 'Contact', href: '#contact' }],
};
