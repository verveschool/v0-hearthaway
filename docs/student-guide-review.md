# HearthAway student guide library review

## Scope

The comparison base is the production deployment at main commit `96c4e36af260efb1c676371473fbb6bc3ecde5ab`, checked on 27 November 2026. The [production audit](student-guide-baseline-audit.md) establishes 24 canonical articles, two permanent aliases and a separate interactive budget tool. All 24 existing article URLs have complete rewritten content in this branch. Seven additional articles are integrated and rendered. The owner approved the release of these 31 guides. The original 70-addition proposal remains a possible later expansion, with 63 additions beyond this release if that target is revived.

The [article matrix](student-guide-status.csv) gives each canonical URL, whether it is a rewrite or an addition, topic, destination scope, rendered editorial word count, date of substantive review, linked sources and validation status. The guides use direct primary sources for consequential rules and illustrative amounts for worked examples. The review date reflects editorial source review. Some broader guides are below the brief’s 2,000–3,500 word target.

## What to review

- The homepage features three starting guides. Destination hubs link to their filtered guide index and surface the relevant local guide where available.
- Both `/moving-abroad` and `/all-resources` share the searchable, paginated resource library. Filter by topic and supported destination. The canonical library stays at `/moving-abroad`.
- Every article uses the long-form template. It includes a linked contents list, stable anchors, takeaways, checklist, FAQ, sources and editorially selected related links. Comparison tables have captioned, keyboard-focusable overflow regions.
- Guides and resource indexes work from editorial records. They use no property or room catalogue queries. Client country data does not import guide bodies.
- The resource sitemap uses the article review dates. Existing article paths and the two 308 redirects are retained. The university directory’s broken country guide URLs now lead to the actual country hubs.
- The additions cover a weighted housing decision, accessibility, action after a suspected payment scam, and destination guides for Australia, Ireland, the Netherlands and the UK. The latter covers differences across all four UK nations.

## Verification

Run on Node 22.15 or newer for validation. Use the repository’s pnpm version and normal environment for Next.js.

```sh
pnpm lint
pnpm exec tsc --noEmit --incremental false
pnpm build
node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON scripts/guides/validate.mjs
node scripts/guides/verify-render.mjs http://127.0.0.1:3000
```

The content validator verifies the production baseline, required fields, distinct slugs and bodies, links, active destination associations, stable section IDs, and presence of real body text. The render check uses the live routes of a running build or local server. It traverses both sets of pagination links and checks article metadata, internal links, anchors, visible review dates, CTA destinations, redirects and sitemap coverage. Pass `--complete` to the content validator when checking the 70-guide requirement. That release check intentionally fails at the present count.

Local browser tests exercised destination and topic filters, keyword search, clearing filters, pagination with focus returned to the results, keyboard activation of an article section, and the horizontal table region. Desktop and 320/390 CSS-pixel widths were checked. Anonymous browser checks used local placeholder auth configuration and were limited to public pages. The 31-guide release was explicitly authorised after the initial review.
