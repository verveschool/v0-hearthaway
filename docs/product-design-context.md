# HearthAway product and design context

Last reviewed: 15 November 2026 (Asia/Kolkata).
Repository baseline: [`3bd0c5884fe607062840d55ae7d472833442f26f`](https://github.com/verveschool/v0-hearthaway/commit/3bd0c5884fe607062840d55ae7d472833442f26f).
Primary references: [live website](https://www.hearthaway.com/) and this repository.
Scope: discovery and setup. This document records the current product, confirmed owner decisions, evidence gaps and possible future investigations.

## How future sessions should use this document

1. Read this document and [AGENTS.md](../AGENTS.md) before design work.
2. Read the current source files for the affected journey. The baseline above is a historical snapshot, not a guarantee that the implementation remains identical.
3. Treat owner-confirmed product decisions below as intentional. Preserve existing behaviour, navigation, data relationships, visual identity and working patterns unless a task explicitly authorizes changes.
4. Distinguish owner-confirmed intent, implementation verified in source, observed live UI, and proposals. Source inspection confirms code paths, not successful operation against a live database.
5. Update this document when an approved product decision or verified implementation changes. Record date, evidence and remaining uncertainty. Keep proposed work explicitly labelled.
6. Keep secrets, credentials, student records, private financial data and customer documents out of this public repository.

This file provides reusable context through its repository URL. It does not configure Product Design plugin memory or guarantee automatic loading in every future chat. The README and AGENTS links make it discoverable when repository context is loaded.

## Owner-confirmed product decisions

Confirmed by the product owner on 15 November 2026:

- HearthAway serves students and internal operational users.
- HearthAway is an accommodation discovery and advisory platform. Enquiries, requests and payment records support an advisor-led process; they do not establish a direct checkout model.
- Students can start with universities, cities, properties or individual room types.
- Each property should exist once in central inventory, with distinct room types beneath it. Property and room discovery use the same underlying inventory.
- Internal operations have four primary areas: Portfolio, Partners, Sales and Finance.
- Access depends on roles and permissions, including management, sales personnel and people onboarding accommodation partners.
- The existing website and repository are the primary brand references. Preserve their established conventions.
- Official brand colours are white `#FFFFFF`, blue `#01329C`, gold `#FEBB01` and black `#000000`. Manrope is the primary typeface.

On 23 November 2026, the product owner specified a shared compact blue banner for public interior pages. It contains a white Manrope page heading and an optional white action, with a 210 px mobile and 230 px desktop baseline that can grow for increased text size. The homepage, authentication, account and staff screens keep their dedicated layouts.

Public banner copy uses a warm, practical voice. Banner actions connect to an existing next step in Total Home, such as a city's housing, a property's rooms, or guides relevant to the student's stage. Preserve formal policy titles and the names of places, properties, rooms and guides. Confirm that the destination exists and avoid promising future services or guaranteed outcomes.

## Purpose, users and value

HearthAway helps students understand accommodation choices and obtain personal guidance before moving. Public messaging emphasizes housing near their university and within their budget, supported by an advisor.

| User group | Confirmed need | Implementation evidence |
| --- | --- | --- |
| Students | Discover properties and room types, compare details, ask for advice | Public discovery routes, matching form, property enquiries and account source |
| Sales personnel | Manage enquiries, customer interactions and payment records | Team inbox, assignment checks, notes and request statuses are in source; operational payment editing is unverified |
| Management | Role-dependent operational access | Owner-confirmed user group; management-specific permissions and screens are unverified |
| Partner onboarding team | Manage provider onboarding and partnership information | Owner-confirmed user group; onboarding screens and permissions are unverified |

## Existing public navigation and journeys

[Navigation](../components/navigation.tsx) groups the public site into Destinations, Accommodation and Resources, with My Account and Get Matched actions. [Footer](../components/footer.tsx) adds contact, partner, career and legal links.

| Starting point | Route and source | Existing behaviour |
| --- | --- | --- |
| University | `/universities`, `/universities/[slug]`; [detail page](../app/universities/[slug]/page.tsx), [place data](../lib/place-data.ts) | University context, related city and same-city partner properties |
| City | `/cities`, `/cities/[slug]`; [detail page](../app/cities/[slug]/page.tsx) | City context, universities and linked property cards |
| Country | Country roots; [shared hub](../app/country-hub-page.tsx), [country data](../lib/country-data.ts) | Destination context and links into universities, cities and resources |
| Property | `/accommodation`, `/accommodation/property/[slug]`; [index](../app/accommodation/page.tsx), [detail](../app/accommodation/property/[slug]/page.tsx) | Provider filtering, city/search controls, property details, galleries, room types and property enquiry |
| Individual room type | `/accommodation/rooms`, `/accommodation/rooms/[slug]`; [index](../app/accommodation/rooms/page.tsx), [detail](../app/accommodation/rooms/[slug]/page.tsx) | City/text search, room detail, parent-property link, save-room action and advisory CTA |
| Advice | `/get-matched`; [form](../app/get-matched/page.tsx), [API](../app/api/get-matched/route.ts) | Collect destination, timing, budget, preferences, intent, priorities and contact information |
| Resources | `/moving-abroad`, article routes and budget tools; [resource data](../lib/moving-abroad-data.ts) | Practical moving-abroad guidance |
| Account | `/account`; [page](../app/account/page.tsx), [actions](../app/account/actions.ts) | Profile, saved rooms, shortlists, recommendations, request/payment history, services, advisor and documents |

University-to-property matching currently uses case-insensitive city-name equality. It is not evidence of a campus-distance or geographic proximity engine.

The property index filters providers before passing a reduced public data shape to a client listing component. Property text/city filtering uses client state. The room index filters on the server from URL query parameters. Both map all matching records in the reviewed implementation; image lazy loading is separate from pagination.

Legacy `/accommodation/[slug]` routes resolve known property or room slugs and redirect to their canonical detail paths: [legacy resolver](../app/accommodation/[slug]/page.tsx).

### Advisory intake and follow-up

- The matching form and public housing chat post to `/api/get-matched`. The chat answers common questions using predefined guidance. Students who request an advisor can send their destination, move-in timing, budget, contact details and recent questions to the same enquiry inbox.
- Property detail uses a [property enquiry modal](../components/accommodation/property-enquiry-modal.tsx) for virtual-tour and matching enquiries.
- The API validates supported payloads and persists an `enquiries` record. Signed-in submissions attach the current user. Guest persistence uses a server-side privileged client when configured.
- An optional Google Sheets webhook runs after successful database persistence. Delivery failures are logged while the stored enquiry remains the primary successful result.
- Property enquiries carry the property name into the stored message; the reviewed API sets `room_slug` to null. Room detail's general advisory CTA links to `/get-matched` without passing a room slug.
- Account actions include a booking-request record followed by advisor contact. Request status names, account payment history and marketing language about booking before travel do not imply an on-site transaction.

Runtime webhook configuration and successful live submissions were not tested during setup.

## Inventory architecture

Verified source: [listing-data.ts](../app/accommodation/listing-data.ts).

| Layer | Current representation | Relationship |
| --- | --- | --- |
| Provider sources | Vita [response adapter](../app/accommodation/response-data.ts), STACEY JSON, [Iglu](../app/accommodation/iglu-data.ts), [Neon Wood/Tannhaus](../app/accommodation/neonwood-data.ts), [Study Inn](../app/accommodation/studyinn-data.ts) | Separate source adapters preserve provider-specific details |
| Shared properties | `AccommodationListingRecord`, aggregated as `accommodationListings` | A property contains `roomTypes: AccommodationRoomRecord[]` |
| Shared room discovery | `accommodationRoomListings` | Derived by flattening the properties' room types into `{ slug, property, room }` entries |
| Room lookup | `getAccommodationRoomBySlug` | Returns the room and its parent property from the shared derived collection |
| Saved and recommended rooms | Supabase rows holding `room_slug` | Resolve back into the same catalogue through room lookup |

The central public catalogue is currently a code-level collection assembled from typed files and JSON. The reviewed public routes do not load property inventory from Supabase. A live operational database-to-public-inventory integration remains unverified.

Room slugs combine property slug and normalized room name, with numeric suffixes for repeated names. Slugs are referenced by saved rooms, shortlist items, recommendations and booking requests. Treat slug stability as a compatibility requirement.

Vita source records are deduplicated by a composite identity that includes source building and room details. Iglu validates parent-property references. Neon Wood/Tannhaus validates source property IDs and room IDs within each property. These checks support the model, but do not prove global uniqueness of every physical property across all providers.

Neon Wood and Tannhaus share the Neon Wood catalogue provider group while retaining source-brand metadata. The public provider query is `neon-wood`; aliases redirect to it. The provider directory includes more brands than the implemented inventory adapters: a logo/directory entry alone does not prove that provider has browsable stock.

### Pricing and catalogue presentation

- Provider adapters retain source URLs and pricing/confidence metadata internally.
- Monthly room rents are converted to equivalent weekly rates using monthly × 12 ÷ 52 where implemented. Display formatting rounds amounts to the nearest 10.
- Some records use published rates; missing rates can receive indicative comparable-derived estimates. A displayed price is not necessarily a provider-confirmed quote.
- The sanitization layer removes academic-session wording from selected presentation text while source types retain academic-year and availability fields.
- Public property and room surfaces use the shared notice from [presentation.ts](../app/accommodation/presentation.ts): “Prices and availability are indicative, catalog details and may change.”
- Preserve useful prices and property/room details. Raw source fields and legacy formatting helpers do not, by themselves, establish what is rendered.

## Internal operations: intent versus verified implementation

| Area | Owner-confirmed scope | What this repository verifies |
| --- | --- | --- |
| Portfolio | Properties, room types, pricing and accommodation inventory | Catalogue data/adapters and public presentation; an internal inventory CRUD interface was not found in the reviewed main-branch tree |
| Partners | Providers, partnerships and associated information | Static provider directory and public `/partners` page; that page addresses education partners and is not an operational partner manager |
| Sales | Enquiries, leads, interactions and payment records | `/team` case inbox, assignment/claim actions, enquiry statuses, notes, recommendations and service/booking request statuses; student-facing payment-record display |
| Finance | Financial information and associated workflows | Account reads of `payment_records`; a separate finance workspace and financial mutation workflows were not found |

The four-area operational interface may exist in another source or deployment. Its absence from this reviewed snapshot is an evidence gap, not a conclusion that the owner's description is incorrect. Visible branch names were inspected for context; alternate branch implementations were not exhaustively reviewed.

### Team case workflow

Sources: [team page](../app/team/page.tsx), [case notes](../app/team/actions.ts), [workflow actions](../app/team/workflow-actions.ts).

1. A signed-in active `sales_team_members` entry grants access to the team inbox.
2. The inbox presents assigned cases and an unassigned intake queue.
3. A team member can claim an unowned enquiry or student case. Assignment can target either an enquiry or a student.
4. Assigned owners update enquiry/request statuses, add private notes and recommend catalogue rooms.
5. Student account views read related requests, recommendations, advisor details and payment records.

| Record | Allowed status values in source |
| --- | --- |
| Enquiry | `new`, `qualified`, `follow_up`, `closed` |
| Booking request | `requested`, `in_review`, `offer_made`, `confirmed`, `cancelled` |
| Service request | `requested`, `in_review`, `referred`, `completed`, `cancelled` |

These are allowed values, not evidence of a strictly enforced sequential state machine.

### Permissions and data boundaries

| Operation | Verified application-level check | Remaining boundary |
| --- | --- | --- |
| Student account | Authenticated user; student-scoped queries on many records | Some queries rely on database visibility; complete RLS behaviour is unverified |
| Team inbox | Authenticated user and active team membership | Role is displayed; a complete role-to-capability matrix is not defined in reviewed application code |
| Case notes | Active membership and an assignment owned by the acting user | Database policies and constraints are unverified |
| Enquiry status | Active membership plus direct enquiry or linked-student ownership | No verified management override matrix |
| Booking/service status and room recommendations | Active membership plus student ownership | Specialist, finance and partner-onboarding capabilities are unverified |
| Student documents | Authenticated uploads, metadata records, `student-documents` storage and short-lived download URLs | Storage policies and effective support-team access are unverified |

[Server client](../lib/supabase/server.ts) and [session proxy](../lib/supabase/proxy.ts) use Supabase SSR and session cookies. Protected account/team pages perform their own checks; the generic proxy's `/protected` condition is not the full authorization model.

No SQL schema, migration or RLS-policy files were found in the complete reviewed main-branch tree. Table names, field usage and RPC calls show application expectations, not verified database foreign keys or deployed permissions.

### Application-observed data relationships

- Auth user → `profiles.id`.
- Student ID → `saved_rooms`, `shortlists`, `enquiries`, `booking_requests`, `payment_records`, `service_requests`, `room_recommendations` and `student_documents`.
- `shortlist_items.shortlist_id` → a shortlist; `room_slug` → a catalogue room.
- `sales_team_members.user_id` → a team user with role and active flag.
- `sales_case_assignments.owner_id` → a case owner; assignment includes student or enquiry context.
- `sales_notes` → student/enquiry context and author.
- `payment_records` exposes booking-request reference, amount in minor units, currency, status and provider.
- Account code calls `link_my_unclaimed_enquiries` and `get_my_sales_owner`. Their database definitions are outside the reviewed source.
- [Journey actions](../app/account/journey-actions.ts) record renewal, referral and testimonial requests as enquiries.

## Design foundations and preservation rules

| Foundation | Reference and current convention |
| --- | --- |
| Official palette | White `#FFFFFF`, blue `#01329C`, gold `#FEBB01`, black `#000000`; owner-confirmed |
| Typography | Manrope, loaded through [layout](../app/layout.tsx), weights 300–800 |
| Supporting neutrals | Current [CSS](../app/globals.css) includes warm gray `#F7F6F3`, border gray `#E8E6E1`, charcoal `#1A1A1A` and muted text `#6B6860`; supporting UI values, not additional official brand colours |
| Primary CTA | `.brand-cta`: gold fill, black text/border, rounded corners, visible focus ring and restrained hover/press feedback |
| Secondary CTA | `.secondary-cta`: white surface with blue border/text |
| Layout | Generous spacing, clear headings, rounded cards, accommodation imagery and practical supporting copy |
| Components | Shared navigation/footer, home sections, form components and [button primitive](../components/ui/button.tsx); shadcn Base Nova configuration |
| Motion/accessibility | Existing navigation states, keyboard/focus handling, reduced-motion CSS and carousel behaviour should be preserved and verified in scoped work |
| Assets | Existing `public/brand/` assets; several real filenames contain leading spaces and must be used exactly |
| Product voice | Practical, reassuring, helpful and trustworthy |

The source contains older hard-coded blue `#00319D` and gold `#FCC20A` values in some routes. Official colours above take precedence for design intent. This setup records the discrepancy; it does not authorize a palette migration.

Some repository guidance describes older composition: global navigation/footer are rendered by pages rather than the reviewed root layout, and the current homepage mounts a subset of available home sections. Read actual imports before assuming every existing component is active.

## Existing references and their limits

- [Accommodation architecture diagram](accommodation-architecture.mmd): useful provider lineage, but contains older internal-only, availability and action descriptions and omits Study Inn. Reconcile with current source before reuse.
- [Iglu image provenance](iglu-image-provenance.md), [Neon Wood evidence](neonwood-provider-evidence.md), [Study Inn completion matrix](studyinn-completion-matrix.md) and [unresolved fields](studyinn-unresolved-fields.md): provider evidence references, not proof of current live stock.
- `public/brand/readme.md` is effectively empty at the baseline. No Figma or Storybook source was supplied or found in the reviewed tree.
- README describes v0 linkage and automatic deployments on merges to main. This documentation is prepared on a separate branch.

## Setup observations and possible future investigations

These are proposals to investigate, not approved product changes or a completed usability audit.

| Evidence | Possible investigation | Preserve |
| --- | --- | --- |
| Official CSS tokens coexist with older route colour literals | Map token coverage and prioritize consistency within future approved tasks | Current hierarchy, identity and working interactions |
| Property and room indexes render all matching results | Measure load, search and scrolling as inventory grows before choosing pagination or progressive loading | Both discovery paths and all inventory details |
| University links use city matching; campus search depends on available property text | Test campus relevance and search-result expectations | University-led discovery |
| Property modal carries property context, while room advisory CTA uses a generic form | Test whether advisors receive sufficient context from room-origin enquiries | Simple advisory handoff |
| Four internal areas are owner-confirmed but not verified here | Locate the operational source and map actual role/task navigation | Existing operational decisions and access boundaries |
| Permission policy definitions are outside this repository | Obtain a schema/policy reference and verify the role-capability map read-only | Current role and ownership model |

Live review during setup covered the homepage, property index and one Vita property detail at the browser's default desktop viewport. The property index showed 73 properties on 15 November 2026. Counts and prices are observations, not durable guarantees. No authenticated operational UI, mobile layout, form submission, checkout or database mutation was tested.

## Remaining references needed

- URL and source repository/branch for the Portfolio, Partners, Sales and Finance interface, if maintained separately.
- Role definitions, Supabase schema/migrations, RLS policies and RPC definitions needed to verify effective permissions and relationships.
- Any existing workflow documentation or research that explains operational handoffs and success criteria.

## Maintenance record

| Date | Change | Basis |
| --- | --- | --- |
| 15 November 2026 | Established product/design context and evidence boundaries | Owner instructions; pinned main-branch source/tree; read-only public website review |
