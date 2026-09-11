# HearthAway Repository Instructions

These instructions apply to the entire repository. HearthAway is a student-accommodation and moving-abroad guidance site operated by Jiraiya Education LLP. Preserve the existing product voice: practical, reassuring, editorial, and trustworthy rather than sales-heavy.

## Product surface

- Runtime: Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4.
- `app/layout.tsx` owns the global metadata, font loading, analytics/speed-insights, shared navigation, shared footer, and global page shell.
- `components/navigation.tsx` and `components/footer.tsx` are the site-wide chrome. Keep route links, mobile behavior, active states, and legal/company links consistent when adding pages.
- The homepage (`app/page.tsx`) is composed from reusable sections in `components/home/`: hero, destinations, accommodation types, how it works, guidance, moving-abroad preview, trust content, partner content, and CTA sections. Prefer composing or extending these sections over duplicating homepage markup.
- Main content surfaces include country hubs and university guides, city discovery, moving-abroad articles, accommodation, how-it-works, get-matched, budget tools, partners, about, careers, and legal pages.
- The match funnel is `app/get-matched/page.tsx` -> `app/api/get-matched/route.ts`. The form is client-side for interaction; the webhook route is server-side and must never expose its destination URL.

## Routes and content relationships

- Country hubs live at country roots such as `/uk`, `/usa`, `/canada`, `/australia`, `/austria`, `/france`, `/germany`, `/ireland`, `/italy`, `/malta`, `/singapore`, `/spain`, `/uae`, and `/netherlands` where implemented.
- Country university indexes use `/<country>/universities` and individual universities use `/universities/[slug]`.
- City indexes and detail pages use `/cities` and `/cities/[slug]`.
- Moving-abroad indexes and articles use `/moving-abroad` and `/moving-abroad/[slug]`.
- Shared country layouts should use `app/country-hub-page.tsx` whenever the content model fits. Do not create a country page variant just to copy existing layout logic.
- Before adding a content page, check whether the route already exists and whether its record belongs in the typed data layer instead.
- Keep links, slugs, route names, and navigation labels synchronized. A content record is not complete until its page, internal links, metadata, and any index listing agree.

## Data architecture

- `lib/country-data.ts` is the source of truth for country records and country-level content.
- `lib/place-data.ts` is the source of truth for city and university/place records and their lookup helpers.
- `lib/moving-abroad-data.ts` is the source of truth for moving-abroad article records.
- Dynamic pages resolve awaited Next.js 16 `params`, look up typed records by slug, and should return `notFound()` for missing records. Preserve this pattern when adding dynamic routes.
- Add or update typed records and helper functions in `lib/*data.ts`; do not hardcode duplicated country, city, university, or article content inside route components.
- Keep data shapes explicit and stable. Do not use `any`, unchecked casts, or loosely typed record maps to bypass the model.

## HearthAway brand system

- Primary blue: `#00319D`. Use for brand anchors, primary actions, links, and strong navigation emphasis.
- Accent gold: `#FCC20A`. Use intentionally for highlights, secondary emphasis, badges, and selected action details; do not turn every element into a yellow CTA.
- White: `#FFFFFF`. Use for clean surfaces and contrast against the primary blue.
- Warm gray: `#F7F6F3`. Use for soft page backgrounds and editorial section separation.
- Mid gray: `#E8E6E1`. Use for borders, dividers, and quiet surfaces.
- Charcoal: `#1A1A1A`. Use for primary readable text on light surfaces.
- Muted text: `#6B6860`. Use for supporting copy only; maintain readable contrast.
- Typography uses Manrope through the existing global setup. Do not introduce another font family without a clear product-level reason.
- Visual voice: warm, confident, helpful, and modern. Favor generous whitespace, clear hierarchy, rounded but restrained surfaces, editorial imagery, and direct language. Avoid generic SaaS gradients, noisy decoration, excessive shadows, or novelty UI.
- CTA hierarchy: primary actions should be visually obvious and consistent with existing button styles; secondary actions should remain quieter. Preserve the core conversion path toward finding accommodation or getting matched.
- Design changes must work in both the current light brand surfaces and the preview's dark browser chrome. Verify logo/background contrast before changing any logo reference.

## Brand assets and media

- Brand assets live in `public/brand/`. Existing files include light/dark wordmarks, icons, and banners.
- Some existing filenames intentionally contain leading spaces, such as `public/brand/  hearthaway-banner-light.png`. Treat those names as real filesystem paths; do not silently rename or break references.
- Use route-safe public URLs and `next/image` for application imagery whenever possible. Provide meaningful alt text for informative images and an empty alt value for purely decorative images.
- Before changing an asset reference, inspect the exact filename and intended background variant. Never replace a logo with a guessed path or external URL.
- Do not add placeholder imagery where an existing brand or page asset is appropriate.

## UI and implementation rules

- Scan related components, parent layouts, data helpers, and routes before editing. Prefer the smallest complete change.
- Reuse `components/ui/` primitives, especially `components/ui/button.tsx`, and existing shared sections before creating new components.
- Follow the existing Tailwind v4 and CSS-variable conventions in `app/globals.css`. Do not introduce new colors, spacing scales, or one-off design tokens when an existing token or utility fits.
- Use semantic HTML, keyboard-accessible controls, visible focus states, correct labels, and appropriate ARIA attributes. Preserve responsive behavior across mobile, tablet, and desktop.
- Keep client boundaries narrow. Use Server Components by default; add `'use client'` only for state, event handlers, browser APIs, or interactive form behavior.
- Do not fetch data inside `useEffect`. Prefer server-side data loading or the established client data pattern.
- Keep strict TypeScript. Do not use `any`, unnecessary non-null assertions, or dependencies added without explicit approval.
- Preserve existing comments and markers that tooling or design-system workflows may depend on.

## Forms, API, and security

- `app/api/get-matched/route.ts` reads the server-only `GOOGLE_SHEET_WEBHOOK_URL` environment variable and forwards validated submissions to the Google Sheets webhook. Never expose the URL to client code, logs, rendered markup, or error responses.
- Validate form input on the server as well as in the UI. Reject malformed, unexpected, or oversized input and return safe user-facing errors without operational details.
- Keep request and response shapes typed. Handle webhook failures and non-success responses without leaking provider data.
- `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` is available for the project environment; only use it where the existing integration requires it, and never treat a public redirect URL as a secret.

## SEO, accessibility, and content quality

- Keep global metadata in `app/layout.tsx` aligned with HearthAway's actual positioning. Route-specific pages should define accurate titles and descriptions; dynamic pages should derive metadata from their records.
- Preserve sitemap and indexing behavior when adding routes. Check internal links and avoid orphaning new pages.
- Use descriptive headings, concise supporting copy, and meaningful link labels. Do not rely on color alone to communicate state.
- Escape apostrophes and JSX special characters according to the repository's JSX conventions.
- Keep legal pages (`/privacy`, `/terms`, `/cookies`) linked and accurate when changing data collection or form behavior.

## Change checklist

Before submitting a change:

1. Search for all route, component, data, asset, and navigation references affected by the change.
2. Update the typed source-of-truth data instead of duplicating content in pages.
3. Verify dynamic slugs, `notFound()` behavior, metadata, internal links, and index pages.
4. Check desktop and mobile layout, keyboard interaction, contrast, image alt text, and CTA hierarchy.
5. Confirm server-only environment variables remain server-only and forms validate safely.
6. Run `pnpm lint` and `pnpm build` from the repository root. If a command cannot run, report the exact blocker rather than masking it.

## Files to review first

- `app/layout.tsx`
- `app/globals.css`
- `app/page.tsx`
- `app/country-hub-page.tsx`
- `components/navigation.tsx`
- `components/footer.tsx`
- `components/ui/`
- `lib/country-data.ts`
- `lib/place-data.ts`
- `lib/moving-abroad-data.ts`
- `public/brand/readme.md`
- `app/api/get-matched/route.ts`

Preserve unrelated behavior and branding assets when making focused changes.
