# Dr. Y.S.R. Horticultural University — Homepage Redesign Concept

A modern, accessible, bilingual (English / తెలుగు) homepage demo for Dr. Y.S.R. Horticultural University, Venkataramannagudem, Andhra Pradesh. Redesign concept of drysrhu.ap.gov.in.

## Tech
- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion (scroll reveals, counters, slideshow, page fade) — respects "reduce motion"
- lucide-react icons, Poppins + Noto Sans + Noto Sans Telugu (Telugu font loads only when needed)
- Netlify (images served through Netlify Image CDN via `next/image`)

## Run locally
```bash
npm install
npm run dev          # http://localhost:3000
# or, with Netlify emulation:
netlify dev
```

## Deploy to Netlify
1. Push this repo to GitHub/GitLab.
2. In Netlify, add a new project from the repo. Settings are read from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node 22
3. Netlify detects Next.js and applies its runtime automatically.

## Editing content
**All text, links, phone numbers, notifications, stats and image paths are in `data/site.ts`.** Each string has `en` and `te` versions.
- Placeholder items are flagged `placeholder: true` and show a visible "Placeholder" tag. Set `showPlaceholderLabels = false` to hide all tags.
- Replace photos in `public/img/` (keep names, or change paths in `data/site.ts`). Aim for ≤1920px, ≤300 KB.
- Vice-Chancellor photo: set `viceChancellor.photo` to e.g. `/img/vice-chancellor.jpg`.
- Logo: replace `components/Logo.tsx` with the official emblem.

## Folder structure
```
app/            layout (fonts, metadata), page.tsx (homepage), template.tsx (page fade), globals.css (theme colours)
components/     one file per section: TopBar, BrandBar, Navbar, Hero, Notifications, QuickLinks,
                About, ViceChancellor, Stats, ResearchHighlights, Gallery, ContactFooter + helpers
data/site.ts    single content file (bilingual)
public/img/     placeholder photographs
netlify.toml    Netlify build + caching headers
```

## Roadmap
Homepage only so far. Inner pages (About, Administration, Colleges, Academics, Admissions, Research, Extension, Gallery, Notifications archive) currently link to `#` and come next, after feedback.
