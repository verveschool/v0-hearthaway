/**
 * Neon Wood and Tannhaus public inventory captured 2026-11-14.
 * No property photographs are republished: provider image reuse permission was
 * not confirmed in the accessible agreement text. Prices are dated snapshots.
 */
export type NewProviderRoom = {
  sourcePath: string
  name: string
  monthlyFrom: number | null
  size: string | null
  details: string[]
}

export type NewProviderProperty = {
  provider: 'neonwood' | 'tannhaus'
  sourcePath: string
  city: string
  name: string
  address: string
  description: string
  amenities: string[]
  inclusions: string[]
  contractTerms: string[]
  rooms: NewProviderRoom[]
}

const nwRoomPaths: Record<string, string> = {
  '/cities/berlin/berlin-adlershof|Classic': '/apartments/classic',
  '/cities/berlin/berlin-adlershof|Deluxe': '/apartments/deluxe-22m2',
  '/cities/berlin/berlin-adlershof|Double Deluxe': '/apartments/double-deluxe-22m2',
  '/cities/berlin/berlin-frankfurter-tor|Classic': '/apartments/classic-18m2',
  '/cities/berlin/berlin-frankfurter-tor|Deluxe': '/apartments/deluxe-balcony-24m2',
  '/cities/berlin/berlin-frankfurter-tor|Double': '/apartments/double-29m2',
  '/cities/berlin/berlin-frankfurter-tor|Neon Silver / Gold': '/apartments/neon-silver-24m2-fully-equipped',
  '/cities/berlin/berlin-mitte-wedding|Classic': '/apartments/classic-balcony-18m2',
  '/cities/berlin/berlin-mitte-wedding|Deluxe': '/apartments/deluxe-21m2',
  '/cities/berlin/berlin-mitte-wedding|Neon Gold': '/apartments/neon-gold-31m2-fully-equipped',
  '/cities/berlin/berlin-mitte-wedding|Penthouse': '/apartments/penthouse-balcony-22m2',
  '/cities/cologne/cologne-k115|Comfort': '/apartments/comfort-23sqm',
  '/cities/cologne/cologne-k115|Cozy': '/apartments/cozy-20sqm',
  '/cities/cologne/cologne-k115|Double': '/apartments/premium-double-32qm',
  '/cities/frankfurt/frankfurt-riedberg|Classic': '/apartments/classic-17',
  '/cities/frankfurt/frankfurt-riedberg|Deluxe': '/apartments/deluxe-patio-37m2',
  '/cities/frankfurt/frankfurt-riedberg|Double': '/apartments/double-31m2',
  '/cities/frankfurt/frankfurt-riedberg|Penthouse': '/apartments/penthouse-balcony-23m2',
  '/cities/tuebingen/tu3|Comfort': '/apartments/comfort-study-a',
  '/cities/tuebingen/tu3|Cozy': '/apartments/cozy-study-a',
  '/cities/tuebingen/tu3|Double': '/apartments/premium-study-b',
  '/cities/tuebingen/tu3|Superior': '/apartments/superior-study-a',
}

const nw = (path: string, name: string, monthlyFrom: number, size: string | null, ...details: string[]): NewProviderRoom => ({
  sourcePath: `${path}${nwRoomPaths[`${path}|${name}`] ?? `#category-${name.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-')}`}`,
  name,
  monthlyFrom,
  size,
  details,
})

const neonwood = (path: string, city: string, name: string, address: string, description: string, amenities: string[], rooms: NewProviderRoom[]): NewProviderProperty => ({
  provider: 'neonwood', sourcePath: path, city, name, address, description,
  amenities, inclusions: ['Fully furnished', 'All-inclusive monthly rent'],
  contractTerms: [], rooms,
})

const tannhaus = (path: string, name: string, address: string, rooms: NewProviderRoom[], contractTerms: string[] = []): NewProviderProperty => ({
  provider: 'tannhaus', sourcePath: path, city: 'Berlin', name, address,
  description: 'Furnished apartments by Tannhaus, a Cresco Immobilien Verwaltungs GmbH brand. Public room categories and starting rents are shown as published on 2026-11-14.',
  amenities: ['High-speed internet', 'Laundrette', 'Housekeeping on call'],
  inclusions: ['Furnished apartment'], contractTerms, rooms,
})

export const neonwoodProperties: NewProviderProperty[] = [
  neonwood('/cities/berlin/berlin-adlershof', 'Berlin', 'Berlin Adlershof', 'Büchnerweg 91, 12489 Berlin', 'Fully furnished student apartments with private kitchenette and bathroom. Provider describes rent as all-inclusive.', ['Gym', 'Community kitchen', 'Study areas', 'Gaming room', 'Movie room', 'Launderette', 'Rooftop terrace'], [
    nw('/cities/berlin/berlin-adlershof', 'Classic', 795, '17 m²'),
    nw('/cities/berlin/berlin-adlershof', 'Deluxe', 835, '22–35 m²'),
    nw('/cities/berlin/berlin-adlershof', 'Double Deluxe', 865, '22–35 m²'),
  ]),
  neonwood('/cities/berlin/berlin-frankfurter-tor', 'Berlin', 'Berlin Frankfurter Tor', 'Warschauer Strasse 6, 10243 Berlin', 'Fully furnished apartments with private kitchenette and bathroom. Provider describes rent as all-inclusive.', ['Community spaces', 'Shared living facilities'], [
    nw('/cities/berlin/berlin-frankfurter-tor', 'Classic', 830, '18 m²', 'Balcony or patio options are listed.'),
    nw('/cities/berlin/berlin-frankfurter-tor', 'Deluxe', 1166, '24 m²', 'Balcony option is listed.'),
    nw('/cities/berlin/berlin-frankfurter-tor', 'Double', 1309, '29–35 m²'),
    nw('/cities/berlin/berlin-frankfurter-tor', 'Neon Silver / Gold', 1364, '24–31 m²'),
  ]),
  neonwood('/cities/berlin/berlin-mitte-wedding', 'Berlin', 'Berlin Mitte-Wedding', 'Stralsunder Strasse 14, 13355 Berlin', 'Fully furnished apartments with private kitchenette, bathroom and high-speed Wi-Fi. Provider describes rent as all-inclusive.', ['Gym', 'Lounge', 'Study rooms', 'Cinema room', 'Front desk'], [
    nw('/cities/berlin/berlin-mitte-wedding', 'Classic', 830, '17–18 m²', 'Balcony or patio options are listed.'),
    nw('/cities/berlin/berlin-mitte-wedding', 'Deluxe', 1102, '21–23 m²', 'Balcony or patio options are listed.'),
    nw('/cities/berlin/berlin-mitte-wedding', 'Neon Gold', 1364, '27–31 m²', 'Balcony option is listed.'),
    nw('/cities/berlin/berlin-mitte-wedding', 'Penthouse', 1081, '17–30 m²', 'Balcony option is listed.'),
  ]),
  neonwood('/cities/cologne/cologne-k115', 'Cologne', 'K115 by Neon Wood', 'Melatengürtel 113–115, 50825 Cologne', 'Fully furnished student apartments. Provider describes rent as all-inclusive.', ['High-speed internet', 'Bicycle storage', 'Laundry room', 'TULU smart rental store'], [
    nw('/cities/cologne/cologne-k115', 'Comfort', 1046, '23 m²', '12-month rent term shown.'),
    nw('/cities/cologne/cologne-k115', 'Cozy', 875, '20–21 m²', '12-month rent term shown.'),
    nw('/cities/cologne/cologne-k115', 'Double', 1170, '28–32 m²', '12-month rent term shown.'),
  ]),
  neonwood('/cities/frankfurt/frankfurt-riedberg', 'Frankfurt', 'Frankfurt Riedberg', 'Marie-Curie-Strasse 20, 60439 Frankfurt', 'Fully furnished student apartments. Provider describes rent as all-inclusive.', ['Gym', 'Community kitchen', 'Study areas', 'Gaming room', 'Movie room', 'Laundry room'], [
    nw('/cities/frankfurt/frankfurt-riedberg', 'Classic', 789, '17–19 m²'),
    nw('/cities/frankfurt/frankfurt-riedberg', 'Deluxe', 1305, '37 m²'),
    nw('/cities/frankfurt/frankfurt-riedberg', 'Double', 1325, '31 m²'),
    nw('/cities/frankfurt/frankfurt-riedberg', 'Penthouse', 995, '23–35 m²', 'Balcony option is listed.'),
  ]),
  neonwood('/cities/tuebingen/tu3', 'Tübingen', 'TÜ3 by Neon Wood', 'Wohlboldstraße 7, 72072 Tübingen', 'Fully furnished student apartments in two buildings. Provider describes rent as all-inclusive.', ['Community kitchen', 'Multifunctional study room', 'Laundry rooms', 'Rooftop gardens', 'Bicycle storage'], [
    nw('/cities/tuebingen/tu3', 'Comfort', 995, '32 m²', 'Public page also lists Comfort Study A and Comfort Study B variants.'),
    nw('/cities/tuebingen/tu3', 'Cozy', 835, '28 m²'),
    nw('/cities/tuebingen/tu3', 'Double', 1269, '51 m²'),
    nw('/cities/tuebingen/tu3', 'Superior', 1145, '41–43 m²'),
  ]),
]

const tannhausPath = (path: string, name: string, monthlyFrom: number | null, size: string | null, ...details: string[]): NewProviderRoom => ({
  sourcePath: `${path}#${name.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  name, monthlyFrom, size, details,
})

export const tannhausProperties: NewProviderProperty[] = [
  tannhaus('/location/frankfurter-tor', 'Tannhaus Berlin Frankfurter Tor', 'Warschauer Strasse 5, 10243 Berlin', [
    tannhausPath('/location/frankfurter-tor', 'Fir', 1900, '37 m²'),
    tannhausPath('/location/frankfurter-tor', 'Sequoia Superior', 1849, '39 m²'),
  ]),
  tannhaus('/location/mitte-wedding', 'Tannhaus Berlin Mitte-Wedding', 'Brunnenstrasse 125, 13355 Berlin', [
    tannhausPath('/location/mitte-wedding', 'Pine Superior Balcony', 1900, '41 m²'),
    tannhausPath('/location/mitte-wedding', 'Fir', 1755, '46–64 m²', 'Variants listed: Fir Classic (46–52 m²), Fir Classic Balcony (50 m²), Fir Superior Balcony.'),
    tannhausPath('/location/mitte-wedding', 'Fir Family', 2879, '64 m²'),
  ]),
  tannhaus('/location/neukoelln', 'Tannhaus Berlin Rix-Neukölln', 'Braunschweiger Strasse 21, 12055 Berlin', [
    tannhausPath('/location/neukoelln', 'Pine', 1070, '27–36 m²', 'Up to 2 people. Variants: Pine Classic Balcony, Pine Superior, Pine Superior Balcony.'),
    tannhausPath('/location/neukoelln', 'Cedar', 1200, '40–44 m²', 'Up to 2 people. Variants: Cedar Patio, Cedar Balcony.'),
    tannhausPath('/location/neukoelln', 'Fir', 1310, '30–46 m²', 'Up to 3 people. Variants: Fir Classic, Fir Classic Balcony, Fir Superior, Fir Superior Balcony.'),
    tannhausPath('/location/neukoelln', 'Sequoia', 1530, '50–67 m²', 'Up to 4 people. Variants: Sequoia Classic, Sequoia Classic Balcony, Sequoia Superior, Sequoia Superior Balcony.'),
  ], ['Open-ended leases; minimum term 12 months']),
]

export const newProviderProperties = [...neonwoodProperties, ...tannhausProperties]
