# Source capture and migration mapping

Baseline source commit: `8cf6faa85700c427eaf4a2428370160adecd9827`. This describes available evidence and intended mapping, not a finalized database contract or completed import.

| Source | Captured evidence | Identity and pricing considerations |
| --- | --- | --- |
| Vita feed | `response.json`, parser, raw and published projections | Preserve original feed and building IDs and every unit-type value. Current parser strips fields and filters five image-less properties. Feed currency and period are not always explicit; source values must not be replaced with inferred display units. |
| STACEY | Original JSON and both projections | Original room price strings and nightly values survive in JSON; website calculates weekly equivalents from monthly values. Room names and slug alone are not provider IDs. |
| Iglu | Typed property and room records, images, details, offers and provenance | Room IDs and parent IDs exist in the provider adapter but are not passed through to the shared room shape. Prices include both published and indicative values. Preserve source offers and image roles. |
| Neon Wood / Tannhaus | Typed properties and rooms, image index and provider evidence | Preserve source brand separately from listing provider. Monthly values in source must be stored as such alongside the weekly equivalent. Some room URLs are fragments rather than independent provider URLs. |
| Study Inn | Original source seeds, published options, provenance and completion documents | Preserve 2026 and 2027 amounts, contract lengths, dates, statuses and notes. Source URL candidates can be shared or generated and are not guaranteed unique IDs. Some rates use independent research or estimates. |
| Geography | Country, city, university and supporting editorial data | Store source names/slugs and source relationships before matching. Similar names do not establish identity or distance. |
| Media | Source metadata, published references, local asset Git object manifest and provenance files | Preserve URL/path, role, order, labels and attribution. The manifest references repository blobs; it does not copy binaries. Rights evidence differs by provider. |

The snapshot intentionally retains unsanitized and published records separately. Do not use the published projection as the sole source for import: sanitization removes year and availability and may derive estimates. All 374 current room slugs and their property links are captured, with the provenance of each mapping; account-project historical slugs have not yet been inspected. The 2026-11-17 research file documents five omitted properties and image candidates, without changing public inventory.
