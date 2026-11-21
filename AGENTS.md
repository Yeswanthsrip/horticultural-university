# AGENTS.md

Next.js App Router + Tailwind v4 + Framer Motion homepage concept for Dr. Y.S.R. Horticultural University, deployed on Netlify.

## Architecture
- `app/page.tsx` composes section components in the order of the brief. `app/template.tsx` gives an opacity-only page fade (no transforms, so fixed dialogs work).
- `components/SiteProviders.tsx` holds language (`en`/`te`) and text-size state (root font-size %), persisted in localStorage; `useSite().t(localized)` picks the language. Also wraps `MotionConfig reducedMotion="user"`.
- `data/site.ts` is the single source of all content. Every user-facing string is `{ en, te }`. Do not hardcode copy in components.
- Theme tokens (forest/leaf/gold/earth colours, fonts) live in `app/globals.css` `@theme`.

## Conventions
- Use `Reveal` / `RevealItem` (li) for scroll reveals; keep animations subtle.
- Accessibility: dialogs (search, mobile menu, lightbox) trap focus and restore it; tabs use WAI-ARIA arrow keys; counters expose final value to screen readers.
- Images via `next/image` from `public/img` (Next 16: use `preload`, not `priority`; allowed qualities are 60/75 in `next.config.ts`).
- Placeholder content is flagged `placeholder: true` and shows `PlaceholderTag`.

## Next
Inner pages are not built; nav links point to `#`. The user asked to wait for feedback before adding pages.
