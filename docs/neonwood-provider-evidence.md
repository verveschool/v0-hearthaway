# Neon Wood and Tannhaus onboarding evidence

Research snapshot: 2026-11-14. Prices are changing advertised starting rents and are not availability promises.

## Identity and agreement mapping

The Neon Wood–HearthAway email thread and the supplied agreement screenshot show nine accommodation agreements: six with `NW` in the filename and three with `TH`. The email names six Neon Wood locations (Adlershof, Frankfurter Tor, Mitte-Wedding, K115, Frankfurt Riedberg, TÜ3) and three Tannhaus locations (Frankfurter Tor, Mitte-Wedding, Rix-Neukölln). Neon Wood and Tannhaus are kept as separate student-facing provider brands. Neon Wood and Tannhaus official sites each identify Cresco Immobilien Verwaltungs GmbH as their operator/brand entity.

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

The email thread is `PARTNERSHIP PROPOSAL` in `duggal@hearthaway.com`. It says Neon Wood cannot offer API access and can supply property-level iCal feeds; an `iCal Links.xlsx` attachment is referenced. The spreadsheet contents were not available through the connected email attachment tools during this implementation. No iCal data or current vacancy count has been imported, and all availability remains “Not provided”.

## Catalogue mapping

- Neon Wood: 6 properties and 22 listed room types, excluding RIX from the Neon Wood lane.
- Tannhaus: 3 properties and 9 top-level room categories. Publicly named subcategories are recorded on their parent category so that the source's group-level advertised price is not misrepresented as an individual variant price.
- Property stable keys use provider + normalized official location path. Room stable keys use provider + official location path + the public category identifier. These are documented fallbacks because no API or partner source IDs were provided.
- Inventory availability, booking status, student discounts, deposit, and room-level occupancy are unknown unless shown as a published room attribute. They are not inferred.
- Universities and campus distances are left empty; no campus routing evidence was imported.
- Current starting rents are recorded as numeric source values for the 2026-11-14 snapshot. Neon Wood describes rent as all-inclusive. Tannhaus says displayed rents are warm and that utility consumption can be billed individually depending on property and stay length.
- No property photographs are republished. The accessible agreements were not reviewed for image licensing terms, so image usage permission remains unverified. The shared HearthAway empty-photo state is used.

## Follow-up data needed

1. Retrieve and validate the attached iCal feed map, then record feed URL, retrieval time, response status and content hash for every authorized property.
2. Review the agreements' image and marketing rights clauses, or obtain written image approval, before adding provider photos.
3. Confirm whether the parties intend to surface Tannhaus under its distinct brand in HearthAway; this implementation follows the agreement names and official provider identity.
