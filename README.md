# AC Action — vending solutions website

Brochure-style website for **AC Action Ltd**, a vending machine business serving workplaces within
around 15 miles of Nottingham. Built with React + Vite, plain CSS and GSAP.

- `design-brief.md`: client facts, references, design system, motion, and the list of items to confirm.
- `research/`: evidence from the six client-supplied reference sites (`reference-summary.md`, raw
  captures in `raw/`, script `scrape.mjs`).

## Run locally

Requires Node.js 18.18 or later.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
npm run preview   # serve dist/
```

## Deploy (Vercel)

- **Framework:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Environment variables:** none needed. `VITE_CLARITY_ID` is optional, see Analytics.
- Connected to GitHub: every push to `main` deploys to production.

## Page structure: the six leaflet panels

1. **Cover (hero).** The headline "Bringing convenience to your building." sits beside an A5 leaflet
   cover drawn from the business card.
   - On desktop, scrolling opens the leaflet in 3D to show three inside panels.
   - Elsewhere it stays a still cover.
2. **About.** A business introduction and three points.
3. **Our range.** Crisps & snacks, chocolate & confectionery, bottled & canned drinks, each with animated product models.
4. **Workplace benefits.** A checklist (brochure style) plus the four sectors from the card: warehouses,
   call centres, high-rise buildings, office spaces.
5. **Service & coverage.** Four numbered steps and an illustrative 15-mile map around Nottingham.
6. **Contact.** Phone, email and area, plus an enquiry form.

The FAQ sits between panels 5 and 6. The footer repeats the tagline.

## Editing

- **All words, contact details and image paths:** `src/content/site.js`. Items not yet confirmed are marked `TO CONFIRM`.
- **Phone and email:** set `contact.phone` and `contact.email`. Empty values show "to be confirmed",
  never a dead link.
- **Colours, type and spacing:** `src/styles/tokens.css`.
- **Logo:** `src/components/Logo.jsx`. This is a redrawn SVG of the AC mark; replace it with the master file when supplied.
  The name is **AC Action** (not "AC Action Show").
- **Product models:** `src/components/products/Product.jsx` (crisps, chocolate, can, bottle).
- **Hero leaflet motion:** `src/hooks/useLeaflet.js`.

## Enquiry form

The form validates and previews only. **Nothing is sent yet.** The message on screen tells visitors
to call or email instead.

To go live, replace the body of `submitEnquiry` in `src/lib/enquiry.js` with a real request (for
example a Vercel Function or a form service), then update the `enquiry` copy in `site.js`.

## Analytics (off by default)

Microsoft Clarity and UTM capture are in `src/lib/analytics.js`. Nothing loads and nothing is
stored unless `VITE_CLARITY_ID` is set (see `.env.example`).

Before enabling it:

- update the privacy policy to cover session recording
- add a cookie-consent banner (UK GDPR / PECR)

Events: `primary_cta_click`, `contact_phone_click`, `contact_email_click`, `enquiry_preview`.

## Launch checklist

- [ ] Phone and email confirmed and added
- [ ] Logo master file
- [ ] Service arrangements, payment options and costs wording confirmed
- [ ] Real photos of AC Action machines and sites (replace the Unsplash stand-ins)
- [ ] Form endpoint connected
- [ ] Privacy policy page, and cookie consent if analytics is enabled
- [ ] Remove `noindex` from `index.html` and the block in `public/robots.txt`
- [ ] Custom domain on Vercel

## Image credits (Unsplash Licence: free to use, no attribution required)

Illustrative stand-ins only. They are not AC Action sites or clients.

| File | Photo | Photographer |
|---|---|---|
| `public/media/warehouse.webp` | [Empty modern warehouse](https://unsplash.com/photos/empty-modern-warehouse-interior-with-polished-concrete-floor-3lkaszxWfGc) | Craftsman Concrete Floors |
| `public/media/callcentre.webp` | [Open-plan office](https://unsplash.com/photos/people-working-at-desks-in-open-office-kN_kViDchA0) | Arlington Research |
| `public/media/highrise.webp` | [Glass-walled building](https://unsplash.com/photos/white-and-blue-glass-walled-building-Wm8opOd-MDE) | Kenrick Baksh |
| `public/media/workplace.webp` | [Office kitchen](https://unsplash.com/photos/a-kitchen-with-black-cabinets-and-a-white-counter-top-OI6D_VKxSMw) | Craig Lovelidge |

Product models, the logo redraw, the map and the favicon are original SVG.
Font: Montserrat (SIL Open Font License) via Fontsource.
