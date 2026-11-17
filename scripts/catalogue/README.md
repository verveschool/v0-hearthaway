# Catalogue inventory (preparation only)

This read-only tool records the current adapter inputs and website output before a database migration. It does not write to Supabase, create catalogue identities, import data, or switch website reads. It is not a production migration or a substitute for a reviewed source-to-target mapping.

After installing the repository's locked dependencies, run from the repository root:

```sh
node scripts/catalogue/inventory.cjs > /tmp/catalogue-inventory.json
node scripts/catalogue/inventory.cjs --snapshot > /tmp/catalogue-snapshot.json
```

The snapshot includes raw feed JSON and adapter outputs; treat it as internal source material and review it before sharing. It includes the unsanitized adapter projection and the rendered projection as separate layers. The report records SHA-256 file hashes, source counts, output counts, missing adapter `sourceId` fields, publication exclusions, and slug collisions. The adapter is instrumented in memory only to access its pre-sanitized collection and duplicate selection, with explicit failure if the declarations change. No source file is modified by the tool.

`input.vitaSource` counts JSON development records and unit-type entries; `vitaParsed` counts the response adapter's parsed records. Other provider input counts reflect the explicitly declared source records, not every asset or offer. `rawAdapterOutput` is still an adapter output: it is not a substitute for preserving exact original monthly prices, provider files, price confidence, and provenance. `roomsWithoutSourceId` describes the shared adapter shape, not whether a provider-specific source identity can be recovered elsewhere. `roomsWithoutPrice` detects the absence of numeric values in that shape; it does not establish that the values are independently published or current.

The checked-in baseline was generated from commit `8cf6faa85700c427eaf4a2428370160adecd9827`. Five Vita development rows have no room records or images and are omitted by the current website's image filter. They must remain visible in reconciliation rather than silently disappearing during ingestion. Room source IDs are absent from the common adapter for several providers even where provider-specific source data contains stronger identities. Do not automatically match entities using names or slugs.

The inventory is incomplete: it does not fully enumerate source-file parsing rejects, media attribution/rights, all pricing terms, geography matching, or historical saved-room references in the separate account project. No schema, database import, public read cutover, production write, or permission test has been performed. The destination project does not support Supabase branching on its current plan, and the machine used for this snapshot had neither Docker nor a local PostgreSQL server. Use an isolated environment for migrations and permission tests before requesting production approval.

## Expanded source capture

The snapshot now embeds the complete text of 21 source and provenance files, a manifest of tracked `public/` assets and their Git blob IDs, all referenced catalogue media paths, original Study Inn seeds, source-specific provider objects, 374 room-to-source mapping candidates, and research on the five previously omitted Vita feed records. File contents are accompanied by SHA-256 checksums. The Git asset manifest identifies the binaries in the pinned source; the snapshot does not embed those binaries. Source files and `public/` assets must be retained with the snapshot for a full archive.

The research file links a candidate photograph to each excluded property and records source attribution. These are evidence candidates with unverified usage rights, not authorization to copy or publish the photos. The live provider page identifies Glasgow India Street as Vita Student Charing Cross and states room images are illustrative. The current Portswood House operator page is Now Students; preserve the Vita feed attribution as historical. One Port Street belongs to a separate residential brand and Downtown's current operator is unverified. Portland House's old Vita URL returned 404 when checked. Do not conflate an operator, owner, source feed or photo copyright holder.

The `sourceRoomMappings` list describes traceability, not automatically approved canonical matches: Iglu IDs are taken from its parent-scoped adapter; Neon Wood IDs are supplied by its adapter; Study Inn URLs are candidates that may be shared or constructed; remaining rooms retain the legacy slug only. No generated value in this file is a durable catalogue UUID. The research records are not published or included in the 73/374 output totals.
