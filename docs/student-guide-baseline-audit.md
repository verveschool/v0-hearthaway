# Production guide audit

Baseline checked on 27 November 2026 (India time). GitHub recorded a successful Vercel production deployment for main commit `96c4e36af260efb1c676371473fbb6bc3ecde5ab`. The live sitemap and public route tree establish **24 canonical articles**. Each returned 200 and rendered all its authored sections. The pages contained short summaries and bullets, with no table of contents, published source roll-up, FAQ or article canonical tag. Their metadata title and description were generated from the corresponding record. Related cards were chosen by broad stage and category. The guide word counts below count titles, descriptions and rendered editorial section fields once, excluding repeated takeaways, related cards and navigation.

`/moving-abroad/accommodation-guide` and `/moving-abroad/budget-planning` are permanent aliases to `choose-accommodation` and `real-cost-abroad`. `/tools/budget` is a calculator with supporting copy. `/moving-abroad` and `/all-resources` are indexes. The latter advertised the former as its canonical and lacked a sitemap entry. No independent blog route turned up in the source tree or live sitemap. The live `/usa` and `/canada` routes redirected to `/cities`, and `/mexico` returned 404. Historic source records remain. Several common guides still carried retired associations or excluded relevant active countries. The university directory generated guide URLs from country slugs without matching guide records.

[Draft PR #118](https://github.com/verveschool/v0-hearthaway/pull/118) was open, draft and unmerged at `abd88e928d4f532661e23c7492fed55b21d0acf5`. It proposed 24 short rewrites in one data file, each claiming two minutes and a blanket review date. It supplies several promising references and corrections. Its scope, date and short-form structure do not establish that each article had the requested substantive review.

## Article-by-article findings

### The Complete 2026 Pre Arrival Checklist For International Students

- [`/moving-abroad/pre-arrival-checklist`](https://www.hearthaway.com/moving-abroad/pre-arrival-checklist) · 182 words · claimed 12 min read · 3 complete short sections.
- Associations in baseline: uk, ireland, australia, usa, canada, spain, austria, belgium, hungary, singapore, malta, italy, netherlands, malaysia. Placement: both index datasets, sitemap, Before you go, featured, home preview data.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/uk-bank-account`, `/moving-abroad/packing-list`, `/moving-abroad/uae-visa-sponsorship`.
- Existing sources: [/moving-abroad/student-visa](https://www.hearthaway.com/moving-abroad/student-visa).
- Finding: Remove speculation linking housing to enrolment, assumed fixed bills and escrow requirements, intake caps, and universal digital-border instructions.
- Editorial action: Replace with staged dependency checks, fallback plans, and official links for travel and financial evidence.

### How To Choose The Right Accommodation And Avoid The Commute Trap

- [`/moving-abroad/choose-accommodation`](https://www.hearthaway.com/moving-abroad/choose-accommodation) · 237 words · claimed 10 min read · 3 complete short sections.
- Associations in baseline: uk, ireland, australia, usa, canada, spain, austria, belgium, hungary, singapore, malta, italy, netherlands, malaysia. Placement: both index datasets, sitemap, Accommodation, featured.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/halls-vs-private`, `/moving-abroad/avoid-scams`, `/moving-abroad/tenancy-agreement`, `/moving-abroad/uae-housing-furnished`.
- Existing sources: none.
- Finding: Remove universal deposit protection, a blanket state-bond claim, fixed utilities and the requirement for high-speed rail.
- Editorial action: Develop a whole-week housing selection workflow, with evidence and decisions about cost, support and travel.

### The Real Cost Of Studying Abroad Exact 2026 Capital Requirements

- [`/moving-abroad/real-cost-abroad`](https://www.hearthaway.com/moving-abroad/real-cost-abroad) · 230 words · claimed 14 min read · 3 complete short sections.
- Associations in baseline: uk, ireland, australia, usa, canada, spain, austria, belgium, hungary, singapore, malta, italy, netherlands, malaysia. Placement: both index datasets, sitemap, Budgeting, featured.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/cost-of-living`, `/moving-abroad/student-budget`, `/moving-abroad/hidden-costs`, `/moving-abroad/student-discounts`.
- Existing sources: none.
- Finding: The UK, Australia and Ireland thresholds mix up application evidence and spending, omit exceptions and oversimplify accepted funds.
- Editorial action: Rebuild as total study-cost planning. Keep current application rules in the visa article.

### How to check student visa financial requirements

- [`/moving-abroad/student-visa`](https://www.hearthaway.com/moving-abroad/student-visa) · 211 words · claimed 4 min read · 5 complete short sections.
- Associations in baseline: uk, ireland, australia, france, usa, canada, spain, austria, belgium, hungary, singapore, malta, italy, netherlands, malaysia. Placement: both index datasets, sitemap, Before you go, country hub cards: uk, ireland, france, australia, spain, austria, belgium, hungary, singapore, malta, italy, netherlands, malaysia.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/pre-arrival-checklist`, `/moving-abroad/uk-bank-account`, `/moving-abroad/packing-list`, `/moving-abroad/uae-visa-sponsorship`.
- Existing sources: [https://www.gov.uk/guidance/financial-evidence-for-student-and-child-student-route-applicants](https://www.gov.uk/guidance/financial-evidence-for-student-and-child-student-route-applicants), [https://www.irishimmigration.ie/coming-to-study-in-ireland/frequently-asked-questions-for-students/](https://www.irishimmigration.ie/coming-to-study-in-ireland/frequently-asked-questions-for-students/), [https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500](https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500), [https://www.france-visas.gouv.fr/en/etudiant](https://www.france-visas.gouv.fr/en/etudiant).
- Finding: The recent fix adds primary sources, but compact guidance lacks separate application and arrival stages, examples, and route-specific qualifications.
- Editorial action: Expand the evidence process, accepted evidence and exception handling. Verify individual official links and avoid implied coverage of every visa route.

### How To Open A UK Bank Account And Bridge The Gap

- [`/moving-abroad/uk-bank-account`](https://www.hearthaway.com/moving-abroad/uk-bank-account) · 128 words · claimed 5 min read · 3 complete short sections.
- Associations in baseline: uk. Placement: both index datasets, sitemap, Before you go.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/pre-arrival-checklist`, `/moving-abroad/student-visa`, `/moving-abroad/packing-list`, `/moving-abroad/uae-visa-sponsorship`.
- Existing sources: none.
- Finding: Universal physical letter and named digital-account claims are unsupported. Rent may have another route or due date.
- Editorial action: Explain account types, institution-specific eligibility, verification and first-payment fallback.

### The Tactical Packing List For International Students

- [`/moving-abroad/packing-list`](https://www.hearthaway.com/moving-abroad/packing-list) · 94 words · claimed 4 min read · 3 complete short sections.
- Associations in baseline: uk, ireland, australia, usa, canada, spain, austria, belgium, hungary, singapore, malta, italy, netherlands, malaysia. Placement: both index datasets, sitemap, Before you go, country hub cards: australia.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/pre-arrival-checklist`, `/moving-abroad/student-visa`, `/moving-abroad/uk-bank-account`, `/moving-abroad/uae-visa-sponsorship`.
- Existing sources: none.
- Finding: A fixed quantity of medication and blanket cabin-bag rule ignore legal and airline restrictions. Bed sizes and buying advice are unqualified.
- Editorial action: Expand with use of an inventory and airline/transit rules, followed by a first-night plan.

### How Much Purpose Built Student Housing Actually Costs

- [`/moving-abroad/accommodation-costs`](https://www.hearthaway.com/moving-abroad/accommodation-costs) · 123 words · claimed 8 min read · 3 complete short sections.
- Associations in baseline: uk, ireland, australia, usa, canada, spain, austria, belgium, hungary, singapore, malta, italy, netherlands, malaysia. Placement: both index datasets, sitemap, Accommodation, home preview data.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/choose-accommodation`, `/moving-abroad/halls-vs-private`, `/moving-abroad/avoid-scams`, `/moving-abroad/tenancy-agreement`.
- Existing sources: none.
- Finding: Unsupported market-velocity claims pressure readers. The text does not calculate the total contract cost.
- Editorial action: Keep as quote comparison and calculate rent, contractual dates, fees, utilities, travel and deposit timing.

### Purpose Built Student Blocks Versus Private Rentals

- [`/moving-abroad/halls-vs-private`](https://www.hearthaway.com/moving-abroad/halls-vs-private) · 104 words · claimed 6 min read · 3 complete short sections.
- Associations in baseline: uk, ireland, australia, usa, canada, spain, austria, belgium, hungary, singapore, malta, italy, netherlands, malaysia. Placement: both index datasets, sitemap, Accommodation, country hub cards: australia.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/choose-accommodation`, `/moving-abroad/avoid-scams`, `/moving-abroad/tenancy-agreement`, `/moving-abroad/uae-housing-furnished`.
- Existing sources: none.
- Finding: Halls are not uniformly fixed-price or staffed and shared rentals are not universally cheaper. The choice is not determined by year of study.
- Editorial action: Compare formats, contracts, responsibility, continuity and support. Absorb the proposed accommodation-types overview without adding a duplicate URL.

### How To Identify And Avoid Rental Fraud Syndicates

- [`/moving-abroad/avoid-scams`](https://www.hearthaway.com/moving-abroad/avoid-scams) · 105 words · claimed 5 min read · 3 complete short sections.
- Associations in baseline: uk, ireland, australia, usa, canada, spain, austria, belgium, hungary, singapore, malta, italy, netherlands, malaysia. Placement: both index datasets, sitemap, Accommodation, home preview data, country hub cards: ireland, spain, austria, belgium, hungary, singapore, malta, italy, netherlands, malaysia.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/choose-accommodation`, `/moving-abroad/halls-vs-private`, `/moving-abroad/tenancy-agreement`, `/moving-abroad/uae-housing-furnished`.
- Existing sources: none.
- Finding: Escrow is not a property verification standard and a record alone does not verify control of the listing or beneficiary.
- Editorial action: Replace with a pre-payment process and links to official fraud guidance. Reserve post-payment triage for a distinct guide.

### How To Read Your Tenancy Agreement Without Getting Trapped

- [`/moving-abroad/tenancy-agreement`](https://www.hearthaway.com/moving-abroad/tenancy-agreement) · 110 words · claimed 9 min read · 3 complete short sections.
- Associations in baseline: uk, ireland, australia, france. Placement: both index datasets, sitemap, Accommodation, country hub cards: uk, france.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/choose-accommodation`, `/moving-abroad/halls-vs-private`, `/moving-abroad/avoid-scams`, `/moving-abroad/uae-housing-furnished`.
- Existing sources: none.
- Finding: The agreement terminology is absent and the cash or advance-rent claim is unsupported. Notice and exit terms vary by jurisdiction and arrangement.
- Editorial action: Cover the contract-reading workflow, parties, liability, costs, repairs, cancellation and jurisdiction.

### The Exact Weekly Cost Of Living In Major Student Hubs

- [`/moving-abroad/cost-of-living`](https://www.hearthaway.com/moving-abroad/cost-of-living) · 186 words · claimed 7 min read · 3 complete short sections.
- Associations in baseline: uk, ireland, australia, usa, canada, spain, austria, belgium, hungary, singapore, malta, italy, netherlands, malaysia. Placement: both index datasets, sitemap, Budgeting, country hub cards: uk.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/real-cost-abroad`, `/moving-abroad/student-budget`, `/moving-abroad/hidden-costs`, `/moving-abroad/student-discounts`.
- Existing sources: none.
- Finding: The title promises exact figures, while transport and energy claims and supermarket rankings lack sourcing.
- Editorial action: Provide local verification steps and an illustrative weekly budget without citywide averages.

### How To Structure Your Cash Flow As An International Student

- [`/moving-abroad/student-budget`](https://www.hearthaway.com/moving-abroad/student-budget) · 96 words · claimed 6 min read · 3 complete short sections.
- Associations in baseline: uk, ireland, australia, france, usa, canada, spain, austria, belgium, hungary, singapore, malta, italy, netherlands, malaysia. Placement: both index datasets, sitemap, Budgeting, country hub cards: ireland, france, spain, austria, belgium, hungary, singapore, malta, italy, netherlands, malaysia.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/real-cost-abroad`, `/moving-abroad/cost-of-living`, `/moving-abroad/hidden-costs`, `/moving-abroad/student-discounts`.
- Existing sources: none.
- Finding: One cash buffer amount in different currencies and the suggestion of automatic overdraft penalties are unsupported.
- Editorial action: Explain payment timing, irregular funding, reserves and adjustment triggers.

### Hidden Capital Drains New Students Never Expect

- [`/moving-abroad/hidden-costs`](https://www.hearthaway.com/moving-abroad/hidden-costs) · 95 words · claimed 5 min read · 3 complete short sections.
- Associations in baseline: uk, ireland, australia, usa, canada, spain, austria, belgium, hungary, singapore, malta, italy, netherlands, malaysia. Placement: both index datasets, sitemap, Budgeting, country hub cards: australia.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/real-cost-abroad`, `/moving-abroad/cost-of-living`, `/moving-abroad/student-budget`, `/moving-abroad/student-discounts`.
- Existing sources: none.
- Finding: Unsupported spending pressure and first-week timing. No distinction among fees, refundable cash and purchases.
- Editorial action: Expand the first-month setup budget, use an inventory first and define an accessible reserve.

### How To Leverage Student Status For Structural Savings

- [`/moving-abroad/student-discounts`](https://www.hearthaway.com/moving-abroad/student-discounts) · 98 words · claimed 4 min read · 3 complete short sections.
- Associations in baseline: uk, ireland, australia, usa, canada, spain, austria, belgium, hungary, singapore, malta, italy, netherlands, malaysia. Placement: both index datasets, sitemap, Budgeting.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/real-cost-abroad`, `/moving-abroad/cost-of-living`, `/moving-abroad/student-budget`, `/moving-abroad/hidden-costs`.
- Existing sources: none.
- Finding: Commercial discount recommendations and promised savings are unsourced.
- Editorial action: Teach eligibility, renewal and break-even with official operator examples.

### Your First Week Playbook Registration And Survival

- [`/moving-abroad/first-week`](https://www.hearthaway.com/moving-abroad/first-week) · 188 words · claimed 7 min read · 3 complete short sections.
- Associations in baseline: uk, ireland, australia, usa, canada, spain, austria, belgium, hungary, singapore, malta, italy, netherlands, malaysia. Placement: both index datasets, sitemap, Arriving, home preview data, country hub cards: uk, spain, austria, belgium, hungary, singapore, malta, italy, netherlands, malaysia.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/airport-to-home`, `/moving-abroad/healthcare`, `/moving-abroad/making-friends`.
- Existing sources: none.
- Finding: Outdated physical-permit terminology, sweeping work/tax urgency and oversimplified consequences.
- Editorial action: Separate provider arrival steps from country-specific immigration follow-up and university actions.

### Getting From The Arrival Terminal To Your Room Safely

- [`/moving-abroad/airport-to-home`](https://www.hearthaway.com/moving-abroad/airport-to-home) · 101 words · claimed 5 min read · 3 complete short sections.
- Associations in baseline: uk, ireland, australia, france. Placement: both index datasets, sitemap, Arriving, country hub cards: ireland, france.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/first-week`, `/moving-abroad/healthcare`, `/moving-abroad/making-friends`.
- Existing sources: none.
- Finding: One airport route pattern misses accessible travel, terminal transfers, disruption and key deadlines.
- Editorial action: Add backwards planning, realistic baggage buffers and a backup handover.

### How To Navigate Local Healthcare And Register With A Doctor

- [`/moving-abroad/healthcare`](https://www.hearthaway.com/moving-abroad/healthcare) · 113 words · claimed 4 min read · 3 complete short sections.
- Associations in baseline: uk, ireland, australia, usa, canada, spain, austria, belgium, hungary, singapore, malta, italy, netherlands, malaysia. Placement: both index datasets, sitemap, Arriving.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/making-friends`, `/moving-abroad/first-week`, `/moving-abroad/airport-to-home`.
- Existing sources: none.
- Finding: England-specific GP and NHS costs are framed as universal. Registration, insurance, eligibility, charges and emergencies are conflated.
- Editorial action: Develop distinct access and coverage checks and source qualified England and Australia examples.

### Building A High Value Network In A Foreign Country

- [`/moving-abroad/making-friends`](https://www.hearthaway.com/moving-abroad/making-friends) · 93 words · claimed 6 min read · 3 complete short sections.
- Associations in baseline: uk, ireland, australia, usa, canada, spain, austria, belgium, hungary, singapore, malta, italy, netherlands, malaysia. Placement: both index datasets, sitemap, Arriving.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/healthcare`, `/moving-abroad/first-week`, `/moving-abroad/airport-to-home`.
- Existing sources: none.
- Finding: Ranking social channels and claiming everyone struggles are unsupported. No concrete next step for ongoing isolation.
- Editorial action: Offer repeatable ways to make connections and routes to university support.

### UAE Student Visa And Visa Sponsorship: Understanding Your Pathway

- [`/moving-abroad/uae-visa-sponsorship`](https://www.hearthaway.com/moving-abroad/uae-visa-sponsorship) · 238 words · claimed 8 min read · 3 complete short sections.
- Associations in baseline: uae. Placement: both index datasets, sitemap, Before you go, country hub cards: uae.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/pre-arrival-checklist`, `/moving-abroad/student-visa`, `/moving-abroad/uk-bank-account`, `/moving-abroad/packing-list`.
- Existing sources: none.
- Finding: The article confuses the sponsor with the issuing authority, excludes parent routes and promises time frames or work outcomes.
- Editorial action: Explain sponsor options, authority, admission, approval, renewal and travel dependencies.

### Understanding Furnished Housing And Utilities In The UAE

- [`/moving-abroad/uae-housing-furnished`](https://www.hearthaway.com/moving-abroad/uae-housing-furnished) · 251 words · claimed 7 min read · 3 complete short sections.
- Associations in baseline: uae. Placement: both index datasets, sitemap, Accommodation, country hub cards: uae.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/choose-accommodation`, `/moving-abroad/halls-vs-private`, `/moving-abroad/avoid-scams`, `/moving-abroad/tenancy-agreement`.
- Existing sources: none.
- Finding: Unsupported inventory, market rents, deposit escrow, rent increases and guarantees about first-year campus housing.
- Editorial action: Focus on furnishings and billing terms. Use official Dubai registration guidance only within its scope.

### Tax-Free Income And Student Work: Financial Planning For UAE Study

- [`/moving-abroad/uae-tax-free-income-planning`](https://www.hearthaway.com/moving-abroad/uae-tax-free-income-planning) · 227 words · claimed 6 min read · 3 complete short sections.
- Associations in baseline: uae. Placement: both index datasets, sitemap, Budgeting, country hub cards: uae.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/real-cost-abroad`, `/moving-abroad/cost-of-living`, `/moving-abroad/student-budget`, `/moving-abroad/hidden-costs`.
- Existing sources: none.
- Finding: Unsupported take-home comparisons, work hours, wages and cross-border tax claims.
- Editorial action: Reframe around a no-wages budget, employer permits and individual tax circumstances.

### Studentenwerk Dorms, WG Flats, And Finding Affordable Student Housing In Germany

- [`/moving-abroad/germany-studentenwerk-housing`](https://www.hearthaway.com/moving-abroad/germany-studentenwerk-housing) · 338 words · claimed 9 min read · 3 complete short sections.
- Associations in baseline: germany. Placement: both index datasets, sitemap, Accommodation, country hub cards: germany.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/germany-tenancy-law-deposits`, `/moving-abroad/choose-accommodation`, `/moving-abroad/halls-vs-private`, `/moving-abroad/avoid-scams`.
- Existing sources: none.
- Finding: Unsupported share of students, wait lengths, rents and apartment prices. Portal names are duplicated.
- Editorial action: Explain local student services, private and sublet alternatives, local application evidence and address registration.

### Monthly Budget Planning For German University Cities: Rent, Food, And Student Life

- [`/moving-abroad/germany-monthly-budgeting`](https://www.hearthaway.com/moving-abroad/germany-monthly-budgeting) · 248 words · claimed 8 min read · 3 complete short sections.
- Associations in baseline: germany. Placement: both index datasets, sitemap, Budgeting, country hub cards: germany.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/real-cost-abroad`, `/moving-abroad/cost-of-living`, `/moving-abroad/student-budget`, `/moving-abroad/hidden-costs`.
- Existing sources: none.
- Finding: Invented ranges, inaccurate work units, overbroad tuition claims and unsupported savings.
- Editorial action: Use a sample budget, local institution fees, warm rent, transport and independent work guidance.

### German Tenancy Agreements, Deposits, And Landlord-Tenant Rights You Must Know

- [`/moving-abroad/germany-tenancy-law-deposits`](https://www.hearthaway.com/moving-abroad/germany-tenancy-law-deposits) · 262 words · claimed 7 min read · 3 complete short sections.
- Associations in baseline: germany. Placement: both index datasets, sitemap, Accommodation, country hub cards: germany.
- Live metadata: title and description present; article canonical absent. Related or action links in main: `/moving-abroad/germany-studentenwerk-housing`, `/moving-abroad/choose-accommodation`, `/moving-abroad/halls-vs-private`, `/moving-abroad/avoid-scams`.
- Existing sources: none.
- Finding: Written-form, deposit return, rent-increase, eviction and repair statements are overbroad or incorrect.
- Editorial action: Verify BGB provisions, residence exceptions, payment timing and handover documentation.
