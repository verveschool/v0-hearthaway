/**
 * Neon Wood and Tannhaus public inventory captured 2026-11-14.
 * Prices are dated snapshots; photo assets and usage rights are recorded in the
 * image catalog and onboarding evidence file.
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
  amenities, inclusions: ['Fully furnished', 'All-inclusive rent'],
  contractTerms: [], rooms,
})

const tannhaus = (path: string, name: string, address: string, rooms: NewProviderRoom[], contractTerms: string[] = []): NewProviderProperty => ({
  provider: 'tannhaus', sourcePath: path, city: 'Berlin', name, address,
  description: 'Tannhaus furnished apartments, grouped under Neon Homes on HearthAway. The provider describes custom-crafted interiors using natural materials and vintage pieces. Displayed rents are warm rents; utility consumption may be billed individually depending on the property and length of stay. Contact Tannhaus at +49 (0) 30 555 707 111 or info@tannhaus.com. A 360° tour is available from the provider.',
  amenities: ['High-speed internet included', 'Laundrette with washers and dryers available seven days a week', 'On-call housekeeping'],
  inclusions: ['Fully furnished and equipped apartments'], contractTerms, rooms,
})

export const neonwoodProperties: NewProviderProperty[] = [
  neonwood('/cities/berlin/berlin-adlershof', 'Berlin', 'Berlin Adlershof', 'Büchnerweg 91, 12489 Berlin', 'In Adlershof, Germany’s largest science and technology park, near six Humboldt University institutes. The campus is a few minutes’ walk away and the S-Bahn is outside the door; shops, supermarkets and a gym are nearby. Apartments are fully furnished with a private kitchenette and bathroom. Rent is all-inclusive. The property is listed as a SW Top Dorm Partner and Global Student Living Silver Certified Property.', ['Community lobby and gardens', '24/7 fitness centre (200 m²)', 'Community kitchen', 'Study areas and silent study room', 'Gaming area and multimedia/movie room', 'Launderette', 'Rooftop terrace', 'Housekeeping available to book', 'Reception printing', 'High-speed Wi-Fi up to 1 Gbit/s'], [
    nw('/cities/berlin/berlin-adlershof', 'Classic', 795, '17 m²', 'Single room suitable for 1 resident; fully furnished; private kitchenette and bathroom.'),
    nw('/cities/berlin/berlin-adlershof', 'Deluxe', 835, '22–35 m²', 'Single room suitable for 1 resident; fully furnished; private kitchenette and bathroom; balcony or patio variants are listed.'),
    nw('/cities/berlin/berlin-adlershof', 'Double Deluxe', 865, '22–35 m²', 'Single room suitable for 1 resident; fully furnished; private kitchenette and bathroom; room category is named Double Deluxe by the provider.'),
  ]),
  neonwood('/cities/berlin/berlin-frankfurter-tor', 'Berlin', 'Berlin Frankfurter Tor', 'Warschauer Strasse 6, 10243 Berlin', 'In Friedrichshain on Karl-Marx-Allee, beside the U-Bahn, tram and bus. Simon-Dach-Straße, Boxhagener Platz, Volkspark Friedrichshain, RAW-Gelände and the East Side Gallery are nearby. Apartments are fully furnished and equipped, each with its own kitchenette and bathroom; rent is all-inclusive. The property is listed as a SW Top Dorm Partner and Global Student Living Silver Certified Property.', ['Housekeeping available to book', 'TULU rental service', 'Reception printing', 'High-speed Wi-Fi up to 1 Gbit/s', '24/7 fitness centre (200 m²)', 'Community lobby and gardens', 'Study areas and silent study room', 'Outdoor areas', 'Gaming area, games room and multimedia room', 'Community events', 'Launderette'], [
    nw('/cities/berlin/berlin-frankfurter-tor', 'Classic', 830, '18 m²', 'Single room; fully furnished and equipped; private kitchenette and bathroom; Classic, Classic Balcony and Classic Patio variants.'),
    nw('/cities/berlin/berlin-frankfurter-tor', 'Deluxe', 1166, '24 m²', 'Single room; fully furnished and equipped; private kitchenette and bathroom; balcony variant is listed.'),
    nw('/cities/berlin/berlin-frankfurter-tor', 'Double', 1309, '29–35 m²', 'Single room; fully furnished and equipped; private kitchenette and bathroom.'),
    nw('/cities/berlin/berlin-frankfurter-tor', 'Neon Silver / Gold', 1364, '24–31 m²', 'Single room; fully furnished and equipped; private kitchenette and bathroom.'),
  ]),
  neonwood('/cities/berlin/berlin-mitte-wedding', 'Berlin', 'Berlin Mitte-Wedding', 'Stralsunder Strasse 14, 13355 Berlin', 'Between Prenzlauer Berg, Mitte and Wedding, minutes from U-Bahn, tram and bus. Bernauer Straße co-working spaces and Mauerpark are nearby; central campuses are under 30 minutes away. Apartments are fully furnished with a private kitchenette, bathroom and high-speed Wi-Fi. All-inclusive rent includes the 24/7 gym, lounge, study rooms and cinema room. A multilingual front desk team is available. The property is listed as a SW Top Dorm Partner and Global Student Living Silver Certified Property.', ['TULU rental service', 'Vending machines with cashless keycard payment', 'IP-TV', 'High-speed Wi-Fi up to 1 Gbit/s', '24/7 fitness centre (200 m²)', 'Community lobby and gardens', 'Study areas and silent study room', 'Outdoor areas', 'Gaming area, games room and multimedia room', 'Community events', 'Launderette', 'Multilingual front desk'], [
    nw('/cities/berlin/berlin-mitte-wedding', 'Classic', 830, '17–18 m²', 'Single room; fully furnished; private kitchenette and bathroom; Classic, Classic Balcony and Classic Patio variants.'),
    nw('/cities/berlin/berlin-mitte-wedding', 'Deluxe', 1102, '21–23 m²', 'Single room; fully furnished and equipped; private kitchenette and bathroom; balcony or patio variants are listed.'),
    nw('/cities/berlin/berlin-mitte-wedding', 'Neon Gold', 1364, '27–31 m²', 'Single room; fully furnished and equipped; private kitchenette and bathroom; balcony variant is listed.'),
    nw('/cities/berlin/berlin-mitte-wedding', 'Penthouse', 1081, '17–30 m²', 'Single room; fully furnished; private kitchenette and bathroom; balcony variant is listed.'),
  ]),
  neonwood('/cities/cologne/cologne-k115', 'Cologne', 'K115 by Neon Wood', 'Melatengürtel 113–115, 50825 Cologne', 'Between Braunsfeld and Ehrenfeld beside Cologne’s inner green belt. Stadtwald and Melaten cemetery are a short walk away; trams along Aachener Straße connect to the University of Cologne campus in Lindenthal and the city centre. Ehrenfeld cafés, bars and Venloer Straße are nearby. Apartments are fully furnished, rent is all-inclusive and new communal areas are opening soon. The property is listed as a SW Top Dorm Partner and Global Student Living Silver Certified Property.', ['High-speed Wi-Fi up to 1 Gbit/s', 'Bicycle storage in courtyards and basement', '24/7 laundry room with fee-based washers and dryers', '24/7 TULU Smart Rental Store with app-based borrowing, snacks, drinks, household essentials and on-the-spot printing', 'Partner benefits'], [
    nw('/cities/cologne/cologne-k115', 'Comfort', 1046, '23 m²', 'Single room; fully furnished; all-inclusive rent; Comfort and Comfort Patio/Balcony variants are listed; 12-month rent term shown.'),
    nw('/cities/cologne/cologne-k115', 'Cozy', 875, '20–21 m²', 'Single room; fully furnished; all-inclusive rent; balcony or patio variant is listed; 12-month rent term shown.'),
    nw('/cities/cologne/cologne-k115', 'Double', 1170, '28–32 m²', 'Single room; fully furnished; all-inclusive rent; balcony or patio variant is listed; 12-month rent term shown.'),
  ]),
  neonwood('/cities/frankfurt/frankfurt-riedberg', 'Frankfurt', 'Frankfurt Riedberg', 'Marie-Curie-Strasse 20, 60439 Frankfurt', 'A few minutes’ walk from Goethe University’s natural sciences campus. Cafés, restaurants, supermarkets and everyday shops are nearby; the elevated district has views towards the Frankfurt skyline and Taunus hills. Two U-Bahn lines and two bus routes connect to the city centre and surrounding districts. Apartments are fully furnished and all-inclusive. The property is listed as a SW Top Dorm Partner and Global Student Living Silver Certified Property.', ['Community lobby and gardens', '24/7 fitness centre (200 m²)', 'Community kitchen', 'Study areas and silent study room', 'Gaming area and multimedia room', 'Laundry room', 'Outdoor areas', 'Housekeeping available to book', 'Reception printing', 'High-speed Wi-Fi up to 1 Gbit/s'], [
    nw('/cities/frankfurt/frankfurt-riedberg', 'Classic', 789, '17–19 m²', 'Single room; fully furnished; all-inclusive rent; patio option is listed.'),
    nw('/cities/frankfurt/frankfurt-riedberg', 'Deluxe', 1305, '37 m²', 'Single room; fully furnished; all-inclusive rent; patio option is listed.'),
    nw('/cities/frankfurt/frankfurt-riedberg', 'Double', 1325, '31 m²', 'Single room; fully furnished; all-inclusive rent.'),
    nw('/cities/frankfurt/frankfurt-riedberg', 'Penthouse', 995, '23–35 m²', 'Single room; fully furnished; all-inclusive rent; balcony option is listed.'),
  ]),
  neonwood('/cities/tuebingen/tu3', 'Tübingen', 'TÜ3 by Neon Wood', 'Wohlboldstraße 7, 72072 Tübingen', 'TÜ3 spans two buildings with everyday shopping downstairs. Tübingen is a university town with the old town, cafés, bars, shops, parks and green spaces nearby; bus and train connections reach campus, the station and the Swabian countryside. Apartments are fully furnished and all-inclusive. TÜ3 is listed as a SW Top Dorm Partner and Global Student Living Silver Certified Property.', ['High-speed Wi-Fi up to 1 Gbit/s', 'Community kitchen', 'Multifunctional room for group work', 'Laundry lounge with washers, dryers and vending machines (extra costs)', 'Planted roof terraces and rooftop garden', 'Bicycle storage in courtyards and basement', 'Partner benefits'], [
    nw('/cities/tuebingen/tu3', 'Comfort', 995, '32 m²', 'Single room; fully furnished; all-inclusive rent; Comfort Study A and Comfort Study B variants are listed; 12-month rent term shown.'),
    nw('/cities/tuebingen/tu3', 'Cozy', 835, '28 m²', 'Single room; fully furnished; all-inclusive rent; Cozy Study A variant is listed; 12-month rent term shown.'),
    nw('/cities/tuebingen/tu3', 'Double', 1269, '51 m²', 'Single room; fully furnished; all-inclusive rent; Double Study B variant is listed; 12-month rent term shown.'),
    nw('/cities/tuebingen/tu3', 'Superior', 1145, '41–43 m²', 'Single room; fully furnished; all-inclusive rent; Superior Study A variant is listed; 12-month rent term shown.'),
  ]),
]

const tannhausPath = (path: string, name: string, monthlyFrom: number | null, size: string | null, ...details: string[]): NewProviderRoom => ({
  sourcePath: `${path}#${name.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  name, monthlyFrom, size, details,
})

export const tannhausProperties: NewProviderProperty[] = [
  tannhaus('/location/frankfurter-tor', 'Tannhaus Berlin Frankfurter Tor', 'Warschauer Strasse 5, 10243 Berlin', [
    tannhausPath('/location/frankfurter-tor', 'Fir', 1900, '37 m²', 'Studio apartment with an open living and dining area; furnished and equipped.'),
    tannhausPath('/location/frankfurter-tor', 'Sequoia Superior', 1849, '39 m²', 'Fully equipped apartment with separate bedroom and living area with open kitchen.'),
  ], ['Friedrichshain location; near Kreuzberg, Neukölln and Mitte.', '360° tour available from the provider.']),
  tannhaus('/location/mitte-wedding', 'Tannhaus Berlin Mitte-Wedding', 'Brunnenstrasse 125, 13355 Berlin', [
    tannhausPath('/location/mitte-wedding', 'Pine Superior Balcony', 1900, '41 m²', 'Fully furnished and equipped; double bed, open-kitchen living area and modern bathroom with bathtub.'),
    tannhausPath('/location/mitte-wedding', 'Fir', 1755, '46–64 m²', 'Two bedrooms, separate living area with open kitchen, city views and optional balcony. Variants: Fir Classic (46–52 m²), Fir Classic Balcony (50 m²), Fir Superior Balcony.'),
    tannhausPath('/location/mitte-wedding', 'Fir Family', 2879, '64 m²', 'Two separate bedrooms, stylishly furnished living area and fully equipped kitchen; designed for family stays.'),
  ], ['Central Wedding location between Mitte and Prenzlauer Berg, a short walk from Mauerpark.', '360° tour available from the provider.']),
  tannhaus('/location/neukoelln', 'Tannhaus Berlin Rix-Neukölln', 'Braunschweiger Strasse 21, 12055 Berlin', [
    tannhausPath('/location/neukoelln', 'Pine', 1070, '27–36 m²', 'Up to 2 people. Variants: Pine Classic Balcony, Pine Superior, Pine Superior Balcony.'),
    tannhausPath('/location/neukoelln', 'Cedar', 1200, '40–44 m²', 'Up to 2 people. Variants: Cedar Patio, Cedar Balcony.'),
    tannhausPath('/location/neukoelln', 'Fir', 1310, '30–46 m²', 'Up to 3 people. Variants: Fir Classic, Fir Classic Balcony, Fir Superior, Fir Superior Balcony.'),
    tannhausPath('/location/neukoelln', 'Sequoia', 1530, '50–67 m²', 'Up to 4 people. Variants: Sequoia Classic, Sequoia Classic Balcony, Sequoia Superior, Sequoia Superior Balcony.'),
  ], ['Open-ended leases; minimum term 12 months.', 'Registration available; digital booking process.', 'Central Neukölln location, a few minutes from Sonnenallee S-Bahn and Maybachufer.', 'Apartments on ground floor through 6th floor; studios and apartments with two bedrooms and living/dining areas; apartments with or without balcony.', 'Free tours: Wednesdays 9:00–16:00 and Fridays 15:00–16:30.']),
]

export const newProviderProperties = [...neonwoodProperties, ...tannhausProperties]
