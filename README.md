# Encanto Restaurant & Coffee

Modern restaurant website built with **Next.js 16 + Tailwind CSS v4 + shadcn/ui + next-intl**.

**Live site**: 14 Rue de la Poste, Batha, Fès, Morocco

## Tech Stack

- **Next.js 16** — App Router, Turbopack
- **Tailwind CSS v4** — CSS-first config, dark mode
- **shadcn/ui** — Radix UI primitives + Tailwind
- **next-intl** — i18n (English, French, Arabic with RTL)
- **Framer Motion** — Animations
- **next-themes** — Dark mode toggle
- **React Hook Form + Zod** — Form validation

## Pages

| Route | Content |
|-------|---------|
| `/` | Home — animated hero, featured dishes, location map |
| `/menu` | Full menu with category tabs, search, vegan/GF filters |
| `/gallery` | Photo grid with lightbox viewer |
| `/contact` | Contact form, reservation form, Google Maps embed |

## Features

- 🌍 3 languages (EN / FR / AR) with RTL support for Arabic
- 🌗 Dark mode toggle
- 🥬 Vegan & Gluten-free badges on menu items
- 📱 Fully responsive (mobile-first)
- 🎨 Moroccan-modern aesthetic — terracotta, teal, gold palette
- 🔍 Live search & category filtering on menu
- 📸 Gallery with lightbox
- 📝 Contact & reservation forms with validation
- ⚡ SEO metadata + JSON-LD structured data

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Locale-routed pages
│   │   ├── page.tsx       # Home
│   │   ├── menu/          # Menu page
│   │   ├── gallery/       # Gallery page
│   │   └── contact/       # Contact page
│   └── globals.css        # Tailwind v4 theme
├── components/
│   ├── layout/            # Navbar, Footer, ThemeToggle, LocaleSwitcher
│   ├── menu/              # MenuGrid, MenuItemCard, MenuFilterBar
│   ├── gallery/           # GalleryGrid
│   ├── home/              # Hero, FeaturedSection, LocationSection
│   ├── contact/           # ContactForm, ReservationForm
│   ├── ui/                # Button, Card, Badge, Tabs, Input, etc.
│   └── seo/               # JsonLd
├── lib/
│   ├── menu-data.ts       # All menu items with translations
│   ├── utils.ts           # cn() helper
│   ├── navigation.ts      # next-intl navigation
│   └── locale-context.tsx # Locale provider
├── messages/              # en.json, fr.json, ar.json
├── i18n/                  # next-intl config
├── middleware.ts           # i18n routing
└── proxy.ts               # i18n routing (Next.js 16)
```

## Deployment

Deploy to **Vercel** with zero config:

```bash
npx vercel
```
