# Neon Wood and Tannhaus onboarding evidence

Research snapshot: 2026-11-14. Prices are changing advertised starting rents and are not availability promises.

## Identity and agreement mapping

The Neon Wood–HearthAway email thread and supplied agreements show nine accommodation agreements: six Neon Wood locations and three Tannhaus locations. The user requested that Tannhaus be listed under Neon Homes. HearthAway therefore presents one Neon Homes provider filter and partner grouping, while retaining Neon Wood and Tannhaus in property names, source URLs, and room descriptions.

RIX Neukölln appears on Neon Wood's wider public marketing catalogue, but the agreement/thread names the RIX agreement under `TH`; the HearthAway record is therefore Tannhaus. This avoids a duplicate RIX property under Neon Wood.

## Evidence sources

All public web sources below were opened on 2026-11-14. They are the source of truth for names, addresses, categories, amenities and public starting rents. The provider inventory is mapped in `app/accommodation/neonwood-data.ts`.

| Scope | Source |
| --- | --- |
| Neon Wood room catalogue and category count | https://neonwood.com/apartments |
| Neon Wood Berlin Adlershof | https://neonwood.com/cities/berlin/berlin-adlershof |
| Neon Wood Berlin Frankfurter Tor | https://neonwood.com/cities/berlin/berlin-frankfurter-tor |
| Neon Wood Berlin Mitte-Wedding | https://neonwood.com/cities/berlin/berlin-mitte-wedding |
| Neon Wood K115 | https://neonwood.com/cities/cologne/cologne-k115 |
| Neon Wood Frankfurt Riedberg | https://neonwood.com/cities/frankfurt/frankfurt-riedberg |
| Neon Wood TÜ3 | https://neonwood.com/cities/tuebingen/tu3 |
| Tannhaus Frankfurter Tor | https://tannhaus.com/location/frankfurter-tor/ |
| Tannhaus Mitte-Wedding | https://tannhaus.com/location/mitte-wedding/ |
| Tannhaus Rix-Neukölln | https://tannhaus.com/location/neukoelln/ |

The email thread is `PARTNERSHIP PROPOSAL` in `duggal@hearthaway.com`. It says Neon Wood cannot offer API access and can supply property-level iCal feeds; an `iCal Links.xlsx` attachment is referenced. Availability is displayed as “Available” at catalogue level per the user's instruction; the pages tell students to confirm current vacancy and price with the provider. No live iCal vacancy count is represented.

## Catalogue mapping

- Neon Wood: 6 properties and 22 listed room types, excluding RIX from the Neon Wood lane.
- Tannhaus: 3 properties and 9 top-level room categories. Publicly named subcategories are recorded on their parent category so that the source's group-level advertised price is not misrepresented as an individual variant price.
- Property stable keys use provider + normalized official location path. Room stable keys use provider + official location path + the public category identifier. These are documented fallbacks because no API or partner source IDs were provided.
- Displayed availability uses the user-requested static “Available” catalogue status; it does not represent live vacancies or a unit count. Booking status, student discounts, deposit, and room-level occupancy remain unknown unless shown as a published room attribute.
- Universities and campus distances are left empty; no campus routing evidence was imported.
- Starting rents remain stored as monthly source values for the 2026-11-14 snapshot and are displayed as weekly equivalents using (monthly rent × 12) ÷ 52, rounded to the nearest 10 units in the source currency. EUR prices remain in EUR; no exchange-rate conversion is applied. Neon Wood describes rent as all-inclusive. Tannhaus says displayed rents are warm and that utility consumption can be billed individually depending on property and stay length.
- Property descriptions, neighborhood and transit information, facilities, service inclusions, room sizes, variants, occupancy (where published), rental terms, and source-listed room notes are included in the corresponding listing fields. Unknown items remain unasserted.
- The user confirmed that the signed agreements grant image usage rights. Official Neon Wood and Tannhaus room/property photography is stored in `public/neonwood/` and `public/tannhaus/`, mapped per property and room in `app/accommodation/new-provider-images.json`, and served through the established accommodation image fields like Iglu.

## Follow-up data needed

1. Retrieve and validate the attached iCal feed map if live vacancy synchronization is later required; catalogue availability is currently shown without claiming live feed status.
