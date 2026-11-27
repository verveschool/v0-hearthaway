# HearthAway partner importer

Import a complete authorized portfolio and its property/room images with one batch command. Supabase remains the backend. This MVP implements **offline validation and private staging**; it does not publish records to the website.

## Current scope

The priority order is Scraye, Campus Living Villages, then HousingAnywhere. The owner has confirmed existing working agreements/inventory-sharing discussions with these partners and that they have asked HearthAway to list their inventory. Treat them as existing relationships, not prospects. `partners.json` records the 30 providers advertised on the HearthAway homepage, the five existing source adapters in this repository, and the extra Amber Student entry found only in the repository's partner directory. Backlog tiers are an operational queue, not a statement about contract status.

Configure the intended Supabase catalogue project explicitly. Imports must preserve existing canonical property and room IDs and public slugs.

### What works

- One versioned JSON manifest for an entire partner portfolio, including rooms, original rental periods and ordered image references.
- Offline checks for completeness, required fields, IDs, prices, dates, hosts and duplicate candidates against a catalogue baseline.
- Exact source matching that retains existing UUIDs/slugs; ambiguous address matches are held for review.
- Four server-only Supabase staging tables with RLS, explicit grants, retry identities and one active run per partner.
- Four concurrent image tasks, bounded retries, private-network protection, immutable SHA-256 object paths and verification of uploaded bytes.
- Private staging with property/room image associations and resumable failed runs. Identical completed manifests reuse their existing run.
- Permission checks from the backend partner registry before downloading or staging partner images.

### What still depends on the first source

- An authorized outbound export/feed and the actual field mapping for each provider. The named configurations are integration profiles, **not implemented website crawlers or verified partner APIs**. Existing partner agreements are confirmed by the owner; the remaining source dependency is the actual technical export/feed/portal route and its current field/host schema.
- Full image decoding, size/dimension quality checks, optimization and EXIF removal. The current worker validates signatures/MIME and preserves original bytes in private staging.
- A publication transaction mapped to `catalogue.*` plus the website's `ha_catalogue_*` projections, editorial rules and asset publication rights.
- Monthly/term rent display. The current website model contains weekly/nightly assumptions; importing a monthly value must never place it in a weekly field.
- Live network/Storage upload verification with the real authorized source, and scheduled refresh after the pilot.

## Run the offline pilot now

Requires Node 22 or later. No new dependencies are installed.

```sh
node scripts/partner-import/cli.mjs partners
node scripts/partner-import/cli.mjs dry-run \
  --input scripts/partner-import/fixtures/synthetic.json \
  --config scripts/partner-import/configs/campus-living-villages.json \
  --out scripts/partner-import/work/synthetic-report.json
node --test scripts/partner-import/*.test.mjs
```

The synthetic fixture never downloads images or touches Supabase; `stage` rejects it. A dry run without `--baseline` warns that existing-catalogue duplicate checks are incomplete. For a real pilot, provide a current baseline JSON with `properties` containing `id`, `slug`, `provider`, `source_key`, `source_url`, `name`, `address`, `postcode`, `city`, `country` (ISO2), and optional `payload_hash`. A name or address is not a durable source ID.

## Manifest contract

Use the fixture as the structural example, replacing it only with data from the authorized source. The envelope has `schema_version: 1`, `partner`, `complete: true`, `expected_count`, an ISO `observed_at`, and `properties`. Every property contains a stable `external_id`, `source_url`, address/city/country, image objects and rooms. Every room has a parent-scoped `external_id` and offer array. Every offer has its own ID, integer `price_minor` or explicit `null`, ISO currency, `period` (`week`, `month`, `night`, or `term`) and observation timestamp.

The adapter must exhaust source pagination and reconcile the expected count before marking a portfolio complete. An empty or partial feed cannot deactivate properties. Unsupported fields fail explicitly so source values such as eligibility, fees and tenancy rules must be deliberately mapped before publication. Save the original source export outside Git with the run evidence.

Amounts retain their original currency and billing period. Unknown prices remain unknown; zero remains zero and is flagged. Payload hashes exclude observation timestamps but retain gallery order. Source IDs and source URLs are matched within the provider; addresses are only duplicate candidates. Different apartment numbers remain distinct.

## Set up private Supabase staging

`setup.sql` defines the additive staging schema. `bootstrap.sql` defines three inactive starter partner profiles and a private staging bucket. These files describe the setup; they do not establish that a project has been configured. Check the selected project's migration history and existing objects before applying them. Do not blindly re-run these scripts against an existing installation.

Review the definitions in an isolated test project before applying them through the project's normal migration workflow in an explicit transaction. Use `verify.sql` inside a transaction that ends in `ROLLBACK` for schema/permission verification. Do not run `verify.sql` as an unwrapped production script because its fixtures are intentionally temporary.

The schema defines `ha_import_partners`, `ha_import_runs`, `ha_import_items` and `ha_import_media_sources` for private staging. It grants no table access to `anon` or `authenticated`; the server role receives only select/insert/update. New partner rows created by the bootstrap default inactive and all rights false. The accommodation project's three priority partner rows have since been activated by the owner-confirmed operating instruction; the exact backend permission references are recorded there. The setup does not alter existing catalogue tables or grants.

Server environment variables:

```sh
# Use the configured catalogue project, and match the explicit expected project ref.
export HEARTHAWAY_IMPORT_PROJECT_REF='<catalogue-project-ref>'
export HEARTHAWAY_IMPORT_SUPABASE_URL='https://<catalogue-project-ref>.supabase.co'
# Supply HEARTHAWAY_IMPORT_SERVER_KEY through the server secret environment.
# Never put it in source code, a NEXT_PUBLIC variable, a Page or a command argument.
```

The runner accepts a Supabase secret key or legacy service-role key. The following CLI setup commands are idempotent; partner registration creates inactive defaults and never overwrites existing permission decisions:

```sh
node scripts/partner-import/cli.mjs setup-storage
node scripts/partner-import/cli.mjs register --config scripts/partner-import/configs/scraye.json
node scripts/partner-import/cli.mjs register --config scripts/partner-import/configs/campus-living-villages.json
node scripts/partner-import/cli.mjs register --config scripts/partner-import/configs/housing-anywhere.json
```

`ha-import-staging` must be private. The default cap is 5 MiB per object and allowed types are JPEG/PNG/WebP. The worker rejects public staging buckets. Source and Storage redirects are rejected, DNS answers are checked and pinned to prevent private-network access, and only recorded exact image hosts are fetched. Oversized assets need a later transform/resumable-upload path; they are not silently truncated.

## Run a real portfolio batch

The three priority partner rows are already active in the accommodation project based on the owner's explicit confirmation of existing agreements and inventory-sharing requests. The local config cannot override backend permissions. Before a real run, populate the exact source listing/image host allowlists from the partner's supplied feed or portal, preserve the permission reference already recorded in Supabase, and confirm source-specific fields. Do not infer image hosts from the homepage domain.

```sh
node scripts/partner-import/cli.mjs dry-run \
  --input /secure/partner-manifest.json \
  --config scripts/partner-import/configs/scraye.json \
  --baseline /secure/catalogue-baseline.json \
  --out scripts/partner-import/work/scraye-review.json

node scripts/partner-import/cli.mjs stage \
  --input /secure/partner-manifest.json \
  --config scripts/partner-import/configs/scraye.json \
  --baseline /secure/catalogue-baseline.json \
  --out scripts/partner-import/work/scraye-stage.json
```

Resolve the batch's reported validation conflicts before staging. Once valid, every property and image is processed by that invocation. The operator does not open listings or select photos individually. Failed runs can be retried with the same manifest; a crashed run still marked `staging` requires `--resume` after its lease has expired. A database index prevents overlapping active runs for the same partner. Stop/review if the source's expected portfolio size changes unexpectedly.

Images are staged under `<partner>/<sha256>.<extension>`. Existing objects are reused only after their bytes verify. Shared bytes are uploaded once while source ordering and property/room associations remain traceable. Database and Storage are not one atomic transaction; a crash may leave unreferenced private objects. Retain them through the retry window, then remove only objects confirmed unreferenced by every run.

Operate the MVP as a supervised CLI. Its cooperative lease has serialized heartbeats and cancellation, but a lease check and the following item write are separate REST requests. Before unattended distributed workers, add database-enforced ownership tokens and atomic guarded writes, plus permission revalidation during a run. Public publication remains unavailable in this CLI.

## Source-specific next steps

| Partner | Acquisition route | Required mapping decisions |
|---|---|---|
| Scraye | Authorized agent export or agreed outbound feed | Stable listing and room IDs; rental versus sale; original monthly rent; source referral URL; image reuse scope. Agent brochure sharing and inbound bulk listing uploads are different capabilities. |
| Campus Living Villages | Partner spreadsheet/feed and image pack, or expressly permitted extraction | Village, room type, academic year, contract length, eligibility, weekly rent and availability. A public UK directory is not a confirmed HearthAway allotment. |
| HousingAnywhere | Contracted outbound marketplace inventory feed | Listing scope, monthly rent/fees, availability/deletion semantics, images and tracked booking links. Do not implement the inbound JSON feed at developers.housinganywhere.com as an inventory export. |

## Publication gate and scaling

Publication must atomically preserve canonical IDs, rooms and slugs while writing only validated items to the existing public projections. Add a unique source mapping for new rooms after checking existing duplicates; account for the projections' global sort-order constraints. Recheck an up-to-date catalogue at publication, respect editorial overrides and record before-images for rollback. Source staging approval alone must not expose photos or listings.

The existing `catalogue.price_observations` and `catalogue.media` use historical source-snapshot keys. Map new import provenance deliberately; do not forge a Git source commit or overwrite an old snapshot to fit the import. Keep the canonical catalogue and Supabase Storage as the source of published data.

After a real first-portfolio pass, implement the publication transaction and verify monthly display, image decoding, missing-source behavior, rollback and the website's database-only read deployment. Then add incremental partner adapters, scheduling, a review interface and larger-file resumable uploads when the measured workload needs them.

## Primary references

- [HearthAway provider logos](https://www.hearthaway.com/)
- [Scraye agent workflow](https://agents.scraye.com/how-it-works) and [terms](https://www.scraye.com/terms)
- [Campus Living Villages UK directory](https://campuslivingvillages.com/united-kingdom/) and [terms](https://campuslivingvillages.com/terms-of-use/)
- [HousingAnywhere outbound marketplace feed](https://info.housinganywhere.com/marketplaces) and [inbound developer integration](https://developers.housinganywhere.com/)
- [Supabase uploads](https://supabase.com/docs/guides/storage/uploads/standard-uploads), [bucket creation](https://supabase.com/docs/guides/storage/buckets/creating-buckets), and [Storage access control](https://supabase.com/docs/guides/storage/security/access-control)
