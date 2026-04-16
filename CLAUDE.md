# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (localhost:4321)
npm run build      # Production build — always run after edits to verify zero errors
npm run preview    # Preview the production build locally
```

There are no tests and no linter configured.

## Architecture

**Astro 4 static site** with React islands. The site is a redesign of metalsupermarkets.com — a dark industrial theme for a metal supplier franchise.

### Key files

- `src/layouts/Layout.astro` — single layout wrapper used by every page. Handles SEO meta, Open Graph, Google Fonts, and a global scroll-reveal `IntersectionObserver`.
- `src/styles/global.css` — all design tokens as CSS custom properties, global resets, typography classes (`.display-xl/lg/md`, `.section-label`), button classes (`.btn`, `.btn-primary`, `.btn-outline`, `.btn-ghost`), scroll-reveal classes, and `.container`.
- `src/components/Header.astro` — fixed header with CSS-only hover dropdown for metals. Nav items and the metals dropdown items are defined in the frontmatter arrays at the top of the file.
- `src/components/StoreLocator.tsx` — the only large React component. `client:load` island. Contains a hardcoded `stores` array (~140 real stores scraped from the live site) with `US | CA | UK` filtering and expand-on-click cards. No external map API.

### Pages

| Route | File |
|---|---|
| `/` | `src/pages/index.astro` — homepage, imports React section components |
| `/metals` | `src/pages/metals/index.astro` — 12-metal grid |
| `/metals/[slug]` | `src/pages/metals/[metal].astro` — dynamic route, `getStaticPaths()` generates 12 pages |
| `/locations` | `src/pages/locations.astro` — embeds `<StoreLocator client:load />` |
| `/services` | `src/pages/services.astro` |
| `/about` | `src/pages/about.astro` |
| `/franchise` | `src/pages/franchise.astro` |
| `/quote` | `src/pages/quote.astro` |
| `/contact` | `src/pages/contact.astro` |

### Design system

All colors, fonts, and spacing are CSS custom properties defined in `global.css`:

- **Brand blue**: `--blue: #1565C0`, `--blue-light: #2196F3`, `--blue-dark: #0D47A1`
- **Dark surfaces**: `--bg: #0A0A0C`, `--surface-1: #111116`, `--surface-2: #18181F`
- **Fonts**: `--font-display: 'Barlow Condensed'` (headings, uppercase labels), `--font-body: 'Barlow'`, `--font-light: 'DM Sans'` (body copy)

### React components vs Astro components

Homepage sections (`HeroSection`, `MetalsShowcase`, `ServicesSection`, `HowItWorksSection`, `WhyChooseUs`, `TestimonialsSection`, `CTABanner`) are `.tsx` files used as `client:load` islands in `index.astro`. They include their own `<style>{``}</style>` blocks for scoped CSS.

`Header.astro` and `Footer.astro` are pure Astro with inline `<style>` and `<script>` blocks — no React.

### Scroll reveal

Add `class="reveal"`, `reveal-left`, `reveal-right`, or `reveal-scale` to any element to get fade-in-on-scroll. The observer in `Layout.astro` uses a `MutationObserver` to also catch elements added by React islands after hydration.

### Path alias

`@/*` maps to `src/*` (configured in `tsconfig.json`).
