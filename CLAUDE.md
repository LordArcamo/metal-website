# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A full redesign of **metalsupermarkets.com** — a dark industrial static website for a metal supplier franchise. Built with Astro 4 + React islands. 20 pages total, fully static, deployed on Vercel.

- **GitHub:** https://github.com/LordArcamo/metal-website
- **Live site:** Vercel (connects to GitHub, auto-deploys on every `git push`)
- **Source brand site:** https://www.metalsupermarkets.com

---

## Commands

```bash
npm run dev        # Start dev server at localhost:4321
npm run build      # Production build — always run after edits to confirm zero errors
npm run preview    # Serve the production build locally
```

No tests, no linter. `npm run build` is the only verification step.

---

## Architecture

**Astro 4 static site** with React islands (`client:load`). All pages are `.astro` files. Interactive components are `.tsx` React files mounted as islands.

### File layout

```
src/
  layouts/Layout.astro       — single shared layout (SEO, fonts, scroll-reveal)
  styles/global.css          — all CSS variables, resets, utility classes
  components/
    Header.astro             — fixed nav, metals dropdown, mobile menu
    Footer.astro             — footer links, social, legal
    StoreLocator.tsx         — React island, 140 real stores, search + filter
    HeroSection.tsx          — homepage hero (React)
    MetalsShowcase.tsx       — homepage metals grid (React)
    ServicesSection.tsx      — homepage services (React)
    HowItWorksSection.tsx    — homepage process steps (React)
    WhyChooseUs.tsx          — homepage differentiators (React)
    TestimonialsSection.tsx  — homepage testimonials (React)
    CTABanner.tsx            — homepage bottom CTA (React)
  pages/
    index.astro              — homepage (assembles all React sections)
    locations.astro          — store locator page
    metals/
      index.astro            — metals catalogue grid (12 metals)
      [metal].astro          — dynamic route → 12 individual metal pages
    services.astro
    about.astro
    franchise.astro
    quote.astro
    contact.astro
public/
  logo.png                   — Metal Supermarkets logo
  hero-bg.jpg                — homepage hero background
  metals-bg.jpg              — metals page background
  images/                    — section background images
```

---

## Pages & Routes

| URL | File | Notes |
|---|---|---|
| `/` | `src/pages/index.astro` | Homepage — imports all React section components |
| `/metals` | `src/pages/metals/index.astro` | 12-card metal catalogue grid |
| `/metals/carbon-steel` | `src/pages/metals/[metal].astro` | Dynamic — generated via `getStaticPaths()` |
| `/metals/stainless-steel` | same | |
| `/metals/aluminum` | same | |
| `/metals/copper` | same | |
| `/metals/brass` | same | |
| `/metals/bronze` | same | |
| `/metals/tool-steel` | same | |
| `/metals/titanium` | same | |
| `/metals/alloy-steel` | same | |
| `/metals/hot-rolled-steel` | same | |
| `/metals/cold-rolled-steel` | same | |
| `/metals/nickel-alloys` | same | |
| `/locations` | `src/pages/locations.astro` | Embeds `<StoreLocator client:load />` |
| `/services` | `src/pages/services.astro` | |
| `/about` | `src/pages/about.astro` | |
| `/franchise` | `src/pages/franchise.astro` | Franchise opportunity page |
| `/quote` | `src/pages/quote.astro` | |
| `/contact` | `src/pages/contact.astro` | |

To **add a new metal**, add its slug to the `getStaticPaths()` array in `[metal].astro` and add a full data entry to the `metalData` object in the same file. Then add it to `metalsDropdown` in `Header.astro`.

---

## Design System

All tokens live in `src/styles/global.css` as CSS custom properties. Never hardcode colors or fonts — always use variables.

### Colors
```css
--blue:           #1565C0   /* primary brand blue */
--blue-mid:       #1976D2
--blue-light:     #2196F3   /* hover states, links */
--blue-dark:      #0D47A1   /* button hover */
--blue-glow:      rgba(21,101,192,0.25)

--bg:             #0A0A0C   /* page background */
--surface-1:      #111116   /* cards */
--surface-2:      #18181F   /* card hover, inputs */
--surface-3:      #222230   /* elevated surfaces */
--border:         #252535
--border-light:   #333348

--text-primary:   #F0F0F4
--text-secondary: #9A9AB0
--text-muted:     #606075
--accent:         #E65100   /* warning/badge only */
```

### Fonts
```css
--font-display: 'Barlow Condensed'   /* headings, nav, uppercase labels */
--font-body:    'Barlow'             /* general body text */
--font-light:   'DM Sans'           /* body copy, descriptions */
```

### Typography classes
- `.display-xl` — hero headlines, clamp(64px → 140px), weight 900, uppercase
- `.display-lg` — section headlines, clamp(40px → 80px)
- `.display-md` — sub-section headlines, clamp(28px → 52px)
- `.section-label` — small all-caps eyebrow text, `--blue-light`, letter-spacing 0.25em

### Button classes
- `.btn .btn-primary` — solid blue, hover darkens + lifts
- `.btn .btn-outline` — transparent, border, hover turns blue
- `.btn .btn-ghost` — no background, blue text, hover widens gap

### Layout
- `.container` — max-width 1280px, auto margins, fluid padding
- `--section-pad` — clamp(60px → 120px), used for section vertical padding

### Scroll reveal
Add any of these classes to animate elements into view on scroll:
- `.reveal` — fade up
- `.reveal-left` — slide from left
- `.reveal-right` — slide from right
- `.reveal-scale` — scale up

The `IntersectionObserver` in `Layout.astro` handles this automatically, including for React islands.

---

## Store Locator

`src/components/StoreLocator.tsx` — React island with **140 real stores** scraped from the live metalsupermarkets.com website.

| Country | Count | Data source |
|---|---|---|
| 🇺🇸 US | 106 | Scraped from `metalsupermarkets.com/location/[slug]/` |
| 🇨🇦 Canada | 26 | Scraped from `metalsupermarkets.com/location/[slug]/` |
| 🇬🇧 UK | 8 | Scraped from `metalsupermarkets.co.uk` |

Each store entry follows this interface:
```ts
interface Store {
  id: string;          // slug, e.g. "dallas-tx"
  name: string;        // display name
  address: string;     // street address
  city: string;
  state: string;       // state/province abbreviation
  zip: string;         // zip or postal code
  country: "US" | "CA" | "UK";
  phone: string;
  hours: string;
  lat: number;         // approximate, for future map use
  lng: number;
}
```

To **add or update a store**, edit the `stores` array near the top of `StoreLocator.tsx`. Stores are grouped by country automatically — no other changes needed.

Real store pages can be found at: `https://www.metalsupermarkets.com/location/[slug]/`
Slug list: `https://www.metalsupermarkets.com/location-sitemap.xml`

---

## Header Navigation

`src/components/Header.astro` — two arrays in the frontmatter control the nav:

- `navItems` — top-level links (Metals, Services, Locations, About, Franchise)
- `metalsDropdown` — the 12-item hover dropdown under Metals, each with `label`, `sub` (grade preview), and `href`

To add a new top-level nav link: add an entry to `navItems`. Set `hasDropdown: false` unless you need a dropdown.

---

## Adding New Pages

1. Create `src/pages/[pagename].astro`
2. Use `<Layout title="..." description="...">` wrapper
3. Import `Header` and `Footer` components
4. All CSS variables and utility classes from `global.css` are available globally — no import needed

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---
<Layout title="Page Title" description="SEO description">
  <Header />
  <main>
    <!-- content -->
  </main>
  <Footer />
</Layout>
```

---

## Deploying

The site auto-deploys on Vercel on every `git push` to `main`.

```bash
git add -A
git commit -m "your message"
git push
```

Vercel runs `astro build` automatically. No environment variables are needed — the site is fully static.

---

## Key Decisions & Context

- **No map API** — the store locator is a pure CSS/React list with a Google Maps directions link per store. No Mapbox, no Google Maps embed.
- **Static only** — no server-side rendering, no API routes. Everything is pre-built at deploy time.
- **React islands for interactivity** — only components that need `useState`/`useMemo` are React. Everything else is Astro for performance.
- **All store data is hardcoded** — scraped once and stored in the `stores` array. To refresh data, re-scrape from the live sitemap and update the array.
- **`site` in `astro.config.mjs`** is set to `https://www.metalsupermarkets.com` for canonical URL generation — update this if deploying under a different domain.
