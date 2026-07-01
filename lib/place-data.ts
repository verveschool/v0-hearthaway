export type CountryCode = 'UK' | 'IE' | 'AU' | 'FR'

export type CityPlace = {
  name: string
  country: string
  countryCode: CountryCode
  universities: string
  image: string
  slug: string
  description: string
  avgRent: string
  studentPositioning: string
  bestAreasForStudents: {
    summary: string
    topNeighbourhoods: string[]
  }
  rentBudgeting: {
    summary: string
    averageMonthlyRent: string
  }
}

export type UniversityPlace = {
  name: string
  city: string
  country: string
  students: string
  slug: string
  citySlug?: string
}

export const cities: CityPlace[] = [
  {
    name: 'London',
    country: 'United Kingdom',
    countryCode: 'UK',
    universities: '40+',
    image: '/images/city-london.png',
    slug: 'london',
    description: 'the undisputed global capital for higher education with elite institutions scattered across multiple transport zones',
    avgRent: '£900 to £1600 / mo',
    studentPositioning: 'a fragmented market where chasing cheap rent in outer zones destroys your budget through high transport costs anchor to tube lines not postcodes',
    bestAreasForStudents: {
      summary: 'bloomsbury and kings cross provide walking access to central campuses while stratford and shoreditch offer modern builds with direct transit links',
      topNeighbourhoods: ['bloomsbury', 'kings cross', 'stratford', 'shoreditch', 'islington']
    },
    rentBudgeting: {
      summary: 'zone one and two commands premium rates for purpose built student accommodation while shared housing further out requires a zone travel card budget',
      averageMonthlyRent: '£1250'
    }
  },
  {
    name: 'Manchester',
    country: 'United Kingdom',
    countryCode: 'UK',
    universities: '5',
    image: '/images/city-manchester.png',
    slug: 'manchester',
    description: 'a high energy student metropolis with an incredible industrial music heritage and top tier academic infrastructure',
    avgRent: '£650 to £950 / mo',
    studentPositioning: 'the oxford road corridor is the heavy center of gravity for campus life blending massive social culture with reachable living options',
    bestAreasForStudents: {
      summary: 'fallowfield is the definitive hub for undergraduate lifestyle while victoria park and the city centre cater to postgraduate students seeking high spec inventory',
      topNeighbourhoods: ['fallowfield', 'victoria park', 'rusholme', 'oxford road', 'salford']
    },
    rentBudgeting: {
      summary: 'private house shares along the main bus corridors offer maximum value while city centre apartments command high tier corporate rates',
      averageMonthlyRent: '£800'
    }
  },
  {
    name: 'Edinburgh',
    country: 'United Kingdom',
    countryCode: 'UK',
    universities: '4',
    image: '/images/city-edinburgh.png',
    slug: 'edinburgh',
    description: 'a stunning historic capital blending ancient architecture with world class research and a highly walkable urban layout',
    avgRent: '£700 to £1000 / mo',
    studentPositioning: 'extremely competitive private rental sector with old architectural stock early preparation is your only leverage here',
    bestAreasForStudents: {
      summary: 'marchmont and newington surround the main campus fields while leith offers an independent coastal vibe for students willing to take the tram link',
      topNeighbourhoods: ['marchmont', 'newington', 'bruntsfield', 'haymarket', 'leith']
    },
    rentBudgeting: {
      summary: 'traditional tenement flats are highly prized but older insulation means utility budgets must be factored into winter costs',
      averageMonthlyRent: '£850'
    }
  },
  {
    name: 'Birmingham',
    country: 'United Kingdom',
    countryCode: 'UK',
    universities: '5',
    image: '/images/city-birmingham.png',
    slug: 'birmingham',
    description: 'englands second largest city offering an affordable central tech hub with rapid national rail connections',
    avgRent: '£550 to £800 / mo',
    studentPositioning: 'a highly practical and well connected city where international students can live adjacent to campus without sacrificing urban access',
    bestAreasForStudents: {
      summary: 'selly oak is the dedicated student village for the university of birmingham while the city centre houses aston and bcu cohorts in high density hubs',
      topNeighbourhoods: ['selly oak', 'edgbaston', 'harborne', 'city centre', 'moseley']
    },
    rentBudgeting: {
      summary: 'selly oak remains one of the most cost effective student territories in the country while city centre en suites track standard mid tier averages',
      averageMonthlyRent: '£675'
    }
  },
  {
    name: 'Bristol',
    country: 'United Kingdom',
    countryCode: 'UK',
    universities: '2',
    image: '/images/city-bristol.png',
    slug: 'bristol',
    description: 'a creative fiercely independent port city known for engineering street art and high student retention rates',
    avgRent: '£650 to £950 / mo',
    studentPositioning: 'bristol has challenging topography and premium pricing scale your location based on your walking endurance and proximity to bus lines',
    bestAreasForStudents: {
      summary: 'clifton and cotham represent the classic premium academic run while gloucester road and stokes croft host the alternative creative indie communities',
      topNeighbourhoods: ['clifton', 'redland', 'cotham', 'stokes croft', 'gloucester road']
    },
    rentBudgeting: {
      summary: 'housing demand routinely outstrips supply across the west country driving average rates close to london standards in premium postcodes',
      averageMonthlyRent: '£800'
    }
  },
  {
    name: 'Leeds',
    country: 'United Kingdom',
    countryCode: 'UK',
    universities: '5',
    image: '/images/city-leeds.png',
    slug: 'leeds',
    description: 'a massive financial and legal hub with a dense vibrant student populace that dominates the northern landscape',
    avgRent: '£550 to £800 / mo',
    studentPositioning: 'a textbook northern student setup with highly concentrated social strips running right into the academic core',
    bestAreasForStudents: {
      summary: 'headingley and hyde park form the traditional undergraduate belt while woodhouse gives immediate walkable access to the main campus gates',
      topNeighbourhoods: ['headingley', 'hyde park', 'woodhouse', 'burley', 'city centre']
    },
    rentBudgeting: {
      summary: 'large scale terraced housing provides excellent group value while new city edge high rises focus on premium single occupancy',
      averageMonthlyRent: '£675'
    }
  },
  {
    name: 'Sheffield',
    country: 'United Kingdom',
    countryCode: 'UK',
    universities: '2',
    image: '/images/city-sheffield.png',
    slug: 'sheffield',
    description: 'one of the safest and greenest cities in the country framed by hills and backed by prestigious steel city research labs',
    avgRent: '£500 to £750 / mo',
    studentPositioning: 'cleanly divided along institutional lines with an incredibly friendly community vibe and highly approachable living expenses',
    bestAreasForStudents: {
      summary: 'ecclesall road is the premium social strip for entertainment while crookes and broomhill sit high on the hills overlooking the academic buildings',
      topNeighbourhoods: ['ecclesall road', 'broomhill', 'crookes', 'city centre', 'walkley']
    },
    rentBudgeting: {
      summary: 'sheffield remains highly competitive offering premium student flats for a fraction of southern uk price structures',
      averageMonthlyRent: '£625'
    }
  },
  {
    name: 'Nottingham',
    country: 'United Kingdom',
    countryCode: 'UK',
    universities: '2',
    image: '/images/city-nottingham.png',
    slug: 'nottingham',
    description: 'a dynamic midlands hub balancing legends of history with modern commercial enterprise and major medical labs',
    avgRent: '£550 to £800 / mo',
    studentPositioning: 'the city tram infrastructure changes the game allowing students to choose between suburban campus enclaves and dense urban quarters',
    bestAreasForStudents: {
      summary: 'lenton is the undisputed heart of the university of nottingham social map while hockley brings retail and warehouse living to trent attendees',
      topNeighbourhoods: ['lenton', 'beeston', 'dunkirk', 'hockley', 'city centre']
    },
    rentBudgeting: {
      summary: 'lenton house shares are highly sought after and lease early while modern private blocks around the train station offer premium alternatives',
      averageMonthlyRent: '£675'
    }
  },
  {
    name: 'Newcastle',
    country: 'United Kingdom',
    countryCode: 'UK',
    universities: '2',
    image: '/images/city-newcastle.png',
    slug: 'newcastle',
    description: 'a legendary northern powerhouse celebrated for its intense football culture nightlife and high research output',
    avgRent: '£500 to £750 / mo',
    studentPositioning: 'a compact urban layout where you can walk from the standard residential student sectors straight into class within fifteen minutes',
    bestAreasForStudents: {
      summary: 'jesmond is the premier high tier student neighborhood while heaton gives you the exact same style of housing at a twenty percent discount',
      topNeighbourhoods: ['jesmond', 'heaton', 'sandyford', 'city centre', 'gosforth']
    },
    rentBudgeting: {
      summary: 'exceptional rent to value metrics across tyne and wear make newcastle an incredibly efficient deployment of capital for international learners',
      averageMonthlyRent: '£625'
    }
  },
  {
    name: 'Liverpool',
    country: 'United Kingdom',
    countryCode: 'UK',
    universities: '3',
    image: '/images/city-liverpool.png',
    slug: 'liverpool',
    description: 'a global maritime city rich in cultural influence maritime commerce and creative arts schools',
    avgRent: '£500 to £750 / mo',
    studentPositioning: 'the market flows from traditional terraced streets directly toward dockside creative regeneration districts with high aesthetic appeal',
    bestAreasForStudents: {
      summary: 'smithdown road serves as the historical student arterial route while the baltic triangle satisfies students looking for modern waterfront apartments',
      topNeighbourhoods: ['smithdown road', 'kensington', 'baltic triangle', 'city centre', 'wavertree']
    },
    rentBudgeting: {
      summary: 'highly affordable multi bed house shares dominate the student landscape alongside competitive city center studios',
      averageMonthlyRent: '£625'
    }
  },
  {
    name: 'Glasgow',
    country: 'United Kingdom',
    countryCode: 'UK',
    universities: '5',
    image: '/images/city-glasgow.png',
    slug: 'glasgow',
    description: 'scotlands massive cultural capital containing world beating red brick campuses and elite creative arts academies',
    avgRent: '£600 to £850 / mo',
    studentPositioning: 'the west end is beautiful but commands intense premiums look to adjacent transport lines to find real margin',
    bestAreasForStudents: {
      summary: 'hillhead is the epicenter of university life while finnieston and partick supply excellent dining and easier rental matching profiles',
      topNeighbourhoods: ['west end', 'hillhead', 'finnieston', 'city centre', 'partick']
    },
    rentBudgeting: {
      summary: 'tenement properties around the west end require early deposits while modern purpose built student blocks line the paths to the city center',
      averageMonthlyRent: '£725'
    }
  },
  {
    name: 'Cardiff',
    country: 'United Kingdom',
    countryCode: 'UK',
    universities: '3',
    image: '/images/city-cardiff.png',
    slug: 'cardiff',
    description: 'the welcoming capital of wales offering a compact urban footprint castle grounds and approachable coastal living',
    avgRent: '£500 to £750 / mo',
    studentPositioning: 'cathays is the engine rooms of cardiff student life where you trade premium silence for absolute walking convenience to lecture halls',
    bestAreasForStudents: {
      summary: 'cathays hosts the vast majority of shared properties while roath brings quiet green parks and enhanced room sizes to postgraduates',
      topNeighbourhoods: ['cathays', 'roath', 'heath', 'canton', 'city centre']
    },
    rentBudgeting: {
      summary: 'one of the most financially efficient capital cities in western europe for international student accommodation deployment',
      averageMonthlyRent: '£625'
    }
  },
  {
    name: 'Belfast',
    country: 'United Kingdom',
    countryCode: 'UK',
    universities: '2',
    image: '/images/city-belfast.png',
    slug: 'belfast',
    description: 'a rapidly scaling tech and cinematic hub defined by historical resilience and approachable cost matrices',
    avgRent: '£450 to £700 / mo',
    studentPositioning: 'a highly centralized footprint where anchoring to the queen university quarter unlocks access to the entire city layout',
    bestAreasForStudents: {
      summary: 'stranmillis and botanic offer exceptional cafe culture and campus proximity while the city centre handles the new ulster campus towers',
      topNeighbourhoods: ['stranmillis', 'botanic', 'holylands', 'city centre', 'lisburn road']
    },
    rentBudgeting: {
      summary: 'belfast consistently delivers the lowest entry point for institutional student living across the entire United Kingdom network',
      averageMonthlyRent: '£575'
    }
  },
  {
    name: 'Coventry',
    country: 'United Kingdom',
    countryCode: 'UK',
    universities: '2',
    image: '/images/city-coventry.png',
    slug: 'coventry',
    description: 'a manufacturing and engineering center with high density student facilities and proximity to deep corporate operations',
    avgRent: '£550 to £800 / mo',
    studentPositioning: 'the critical industry insider trick is that half of the warwick university cohort chooses to live in adjacent historic spa towns for lifestyle reasons',
    bestAreasForStudents: {
      summary: 'coventry city centre is custom built for dense studio operations while leamington spa holds the premium social and independent scene for warwick learners',
      topNeighbourhoods: ['earlsdon', 'city centre', 'leamington spa', 'canley', 'tile hill']
    },
    rentBudgeting: {
      summary: 'urban coventry offers highly standardized private student studios while leamington spa properties fetch historical suburban premiums',
      averageMonthlyRent: '£675'
    }
  },
  {
    name: 'Dublin',
    country: 'Ireland',
    countryCode: 'IE',
    universities: '8',
    image: '/images/city-dublin.png',
    slug: 'dublin',
    description: 'the thriving tech capital of ireland hosting the european headquarters of the worlds greatest internet giants',
    avgRent: '€900 to €1400 / mo',
    studentPositioning: 'an extreme supply squeeze dictates terms here focus entirely on transport routing reliability to maintain sanity',
    bestAreasForStudents: {
      summary: 'rathmines and ranelagh represent premium southside standard addresses while smithfield and phibsborough unlock excellent tram corridors',
      topNeighbourhoods: ['rathmines', 'phibsborough', 'smithfield', 'drumcondra', 'ranelagh']
    },
    rentBudgeting: {
      summary: 'irelands macro market requires comprehensive proof of funds and early matching to lock down competitive luxury student rooms',
      averageMonthlyRent: '€1150'
    }
  },
  {
    name: 'Cork',
    country: 'Ireland',
    countryCode: 'IE',
    universities: '3',
    image: '/images/city-cork.png',
    slug: 'cork',
    description: 'irelands southern maritime capital boasting an independent global pharmaceutical and food science presence',
    avgRent: '€700 to €1000 / mo',
    studentPositioning: 'a compact river delta layout where college road functions as an immediate structural extension of the academic campus',
    bestAreasForStudents: {
      summary: 'college road is ground zero for ucc cohorts while bishopstown provides strategic proximity to the munster technological university campus',
      topNeighbourhoods: ['college road', 'bishopstown', 'douglas', 'city centre', 'wilton']
    },
    rentBudgeting: {
      summary: 'suburban homes offer shared value options while newer purpose built layouts focus on high quality student lifestyle inclusion packages',
      averageMonthlyRent: '€850'
    }
  },
  {
    name: 'Galway',
    country: 'Ireland',
    countryCode: 'IE',
    universities: '2',
    image: '/images/city-galway.png',
    slug: 'galway',
    description: 'the bohemian cultural heart of the irish west coast famous for traditional music art and coastal beauty',
    avgRent: '€650 to €950 / mo',
    studentPositioning: 'balance your requirements between winter weather endurance and the desire for iconic coastal views outside of lecture hours',
    bestAreasForStudents: {
      summary: 'newcastle delivers complete walking convenience to the central campus gates while salthill offers an unmatched seaside lifestyle pattern',
      topNeighbourhoods: ['newcastle', 'salthill', 'terryland', 'renmore', 'city centre']
    },
    rentBudgeting: {
      summary: 'traditional housing near the river corrib trades at a premium while outlying suburbs require dedicated cycling or bus arrangements',
      averageMonthlyRent: '€800'
    }
  },
  {
    name: 'Paris',
    country: 'France',
    countryCode: 'FR',
    universities: '15+',
    image: '/images/hero-building.png',
    slug: 'paris',
    description: 'a dense global capital for arts sciences business and public policy with campuses spread across metro connected districts',
    avgRent: '€900 to €1500 / mo',
    studentPositioning: 'the metro and rer network define the real housing map so prioritize direct lines to campus over central postcode prestige',
    bestAreasForStudents: {
      summary: 'the latin quarter and cité universitaire anchor traditional student life while the 13th and 14th arrondissements offer practical transit access',
      topNeighbourhoods: ['latin quarter', 'cité universitaire', '13th arrondissement', '14th arrondissement', 'bastille']
    },
    rentBudgeting: {
      summary: 'private studios command premium rates while managed residences and shared flats can control costs if applications start before peak intake pressure',
      averageMonthlyRent: '€1200'
    }
  },
  {
    name: 'Lyon',
    country: 'France',
    countryCode: 'FR',
    universities: '8+',
    image: '/images/hero-building.png',
    slug: 'lyon',
    description: 'a major french student city combining research universities business schools and an efficient metro tram and river corridor layout',
    avgRent: '€650 to €1000 / mo',
    studentPositioning: 'the city rewards students who anchor to metro and tram interchanges serving campus clusters in villeurbanne and the city core',
    bestAreasForStudents: {
      summary: 'guillotière and part dieu provide central connectivity while villeurbanne gives direct access to major science and engineering campuses',
      topNeighbourhoods: ['guillotière', 'villeurbanne', 'part dieu', 'croix rousse', 'gerland']
    },
    rentBudgeting: {
      summary: 'lyon is more approachable than paris but early searches still matter for modern residences near the metro and university corridors',
      averageMonthlyRent: '€825'
    }
  },
  {
    name: 'Toulouse',
    country: 'France',
    countryCode: 'FR',
    universities: '6+',
    image: '/images/hero-building.png',
    slug: 'toulouse',
    description: 'a high growth aerospace and engineering hub with large student populations warm southern culture and practical tram and metro links',
    avgRent: '€550 to €850 / mo',
    studentPositioning: 'students should map housing around metro line access to the city centre and campus routes toward rangueil and the aerospace districts',
    bestAreasForStudents: {
      summary: 'saint cyprien and compans provide central student living while rangueil and saint michel suit science and engineering campus access',
      topNeighbourhoods: ['saint cyprien', 'compans', 'rangueil', 'saint michel', 'carmes']
    },
    rentBudgeting: {
      summary: 'toulouse offers strong value by french city standards with shared flats and student residences keeping monthly costs comparatively manageable',
      averageMonthlyRent: '€700'
    }
  },
  {
    name: 'Sydney',
    country: 'Australia',
    countryCode: 'AU',
    universities: '6',
    image: '/images/city-sydney.png',
    slug: 'sydney',
    description: 'an iconic global harbor metropolis offering premium lifestyles top sandstones and incredible economic power',
    avgRent: 'A$1300 to A$2000 / mo',
    studentPositioning: 'massive geographical scale means daily travel times can ruin budgets anchor yourself directly to rail lines and primary campus zones',
    bestAreasForStudents: {
      summary: 'newtown and glebe hold the traditional usyd creative culture while randwick operates as the ironclad home base for unsw scholars',
      topNeighbourhoods: ['newtown', 'randwick', 'ultimo', 'glebe', 'camperdown']
    },
    rentBudgeting: {
      summary: 'sydney features some of the highest real estate valuations globally requiring clear scaling between private studios and managed shares',
      averageMonthlyRent: 'A$1650'
    }
  },
  {
    name: 'Melbourne',
    country: 'Australia',
    countryCode: 'AU',
    universities: '8',
    image: '/images/city-melbourne.png',
    slug: 'melbourne',
    description: 'the cultural arts and dining champion of australia designed around a highly structured city tram grid',
    avgRent: 'A$1100 to A$1600 / mo',
    studentPositioning: 'carlton is the academic heartland but the real creative energy lives out along the northern tram links',
    bestAreasForStudents: {
      summary: 'carlton is steps from the university of melbourne while clayton is an absolute necessity for monash students wishing to avoid long transit lines',
      topNeighbourhoods: ['carlton', 'brunswick', 'fitzroy', 'clayton', 'richmond']
    },
    rentBudgeting: {
      summary: 'the inner city tram zone provides exceptional flexibility allowing students to unlock high spec builds across the city fringe',
      averageMonthlyRent: 'A$1350'
    }
  },
  {
    name: 'Brisbane',
    country: 'Australia',
    countryCode: 'AU',
    universities: '4',
    image: '/images/city-brisbane.png',
    slug: 'brisbane',
    description: 'a rapidly developing subtropical hub offering outdoor lifestyle patterns and excellent modern research infrastructure',
    avgRent: 'A$900 to A$1300 / mo',
    studentPositioning: 'the winding lines of the brisbane river dictate transport options prioritize citycat ferry routes or direct green bridge access',
    bestAreasForStudents: {
      summary: 'st lucia is the classic dedicated uq university bubble while toowong delivers the essential rail and commercial retail links',
      topNeighbourhoods: ['st lucia', 'kelvin grove', 'toowong', 'south bank', 'indooroopilly']
    },
    rentBudgeting: {
      summary: 'brisbane delivers premium modern purpose built student assets at a structurally better entry margin than sydney or melbourne',
      averageMonthlyRent: 'A$1100'
    }
  },
  {
    name: 'Perth',
    country: 'Australia',
    countryCode: 'AU',
    universities: '4',
    image: '/images/city-perth.png',
    slug: 'perth',
    description: 'a booming resource rich sunset coast city facing the indian ocean with a clean relaxed outdoor campus model',
    avgRent: 'A$850 to A$1200 / mo',
    studentPositioning: 'crawley and nedlands offer beautiful quiet riverside options while the urban nightlife concentrates entirely in separate quarters',
    bestAreasForStudents: {
      summary: 'crawley tracks directly along the uwa campus lines while bentley services the massive curtin university science footprint',
      topNeighbourhoods: ['crawley', 'subiaco', 'nedlands', 'northbridge', 'bentley']
    },
    rentBudgeting: {
      summary: 'perth student apartments feature exceptional design footprints with pricing closely aligned to resource driven economic cycles',
      averageMonthlyRent: 'A$1025'
    }
  },
  {
    name: 'Adelaide',
    country: 'Australia',
    countryCode: 'AU',
    universities: '3',
    image: '/images/city-adelaide.png',
    slug: 'adelaide',
    description: 'a parkland ringed festival city highly celebrated for medical sciences wine research and exceptional walkability',
    avgRent: 'A$800 to A$1150 / mo',
    studentPositioning: 'unlike other major australian cities city centre living is highly practical affordable and integrated with campus gates here',
    bestAreasForStudents: {
      summary: 'north adelaide and the central business district dominate the group layout while marion provides tailored access to the flinders hospital grid',
      topNeighbourhoods: ['north adelaide', 'city centre', 'norwood', 'prospect', 'marion']
    },
    rentBudgeting: {
      summary: 'highly efficient urban layout translates to lower baseline transport expenditures alongside approachable rent rates',
      averageMonthlyRent: 'A$975'
    }
  },
  {
    name: 'Canberra',
    country: 'Australia',
    countryCode: 'AU',
    universities: '2',
    image: '/images/city-canberra.png',
    slug: 'canberra',
    description: 'the master planned federal capital hosting top tier national research institutions and political think tanks',
    avgRent: 'A$950 to A$1400 / mo',
    studentPositioning: 'acton and braddon form an intense self contained academic ecosystem that runs directly on bike tracks and light rail link corridors',
    bestAreasForStudents: {
      summary: 'acton handles the heavy anu campus footprint while belconnen operates as an independent high value commercial center for uc students',
      topNeighbourhoods: ['acton', 'braddon', 'turner', 'belconnen', 'bruce']
    },
    rentBudgeting: {
      summary: 'purpose built student accommodation on campus grounds represents the dominant and most efficient operational choice in the territory',
      averageMonthlyRent: 'A$1175'
    }
  },
  {
    name: 'Gold Coast',
    country: 'Australia',
    countryCode: 'AU',
    universities: '2',
    image: '/images/city-gold-coast.png',
    slug: 'gold-coast',
    description: 'a world famous coastal strip balancing academic business research with beach lifestyle options and global tourism',
    avgRent: 'A$900 to A$1300 / mo',
    studentPositioning: 'the g link light rail track is the absolute line of life here anchor your room choice to a tram platform link',
    bestAreasForStudents: {
      summary: 'southport handles the heavy grid for griffith university while robina houses the executive framework for bond university scholars',
      topNeighbourhoods: ['southport', 'robina', 'surfers paradise', 'burleigh heads', 'broadbeach']
    },
    rentBudgeting: {
      summary: 'beachside apartments command high holiday seasonal premiums while inland student complexes maintain stable structural baseline costs',
      averageMonthlyRent: 'A$1100'
    }
  }
]

export const universities: UniversityPlace[] = [
  { name: 'University College London', city: 'London', country: 'UK', students: '42,000+', slug: 'ucl', citySlug: 'london' },
  { name: 'Kings College London', city: 'London', country: 'UK', students: '31,000+', slug: 'kcl', citySlug: 'london' },
  { name: 'Imperial College London', city: 'London', country: 'UK', students: '22,000+', slug: 'imperial', citySlug: 'london' },
  { name: 'London School of Economics', city: 'London', country: 'UK', students: '11,000+', slug: 'lse', citySlug: 'london' },
  { name: 'Queen Mary University of London', city: 'London', country: 'UK', students: '28,000+', slug: 'qmul', citySlug: 'london' },
  { name: 'University of Manchester', city: 'Manchester', country: 'UK', students: '40,000+', slug: 'manchester', citySlug: 'manchester' },
  { name: 'Manchester Metropolitan University', city: 'Manchester', country: 'UK', students: '34,000+', slug: 'mmu', citySlug: 'manchester' },
  { name: 'University of Edinburgh', city: 'Edinburgh', country: 'UK', students: '35,000+', slug: 'edinburgh', citySlug: 'edinburgh' },
  { name: 'Heriot Watt University', city: 'Edinburgh', country: 'UK', students: '10,000+', slug: 'heriot-watt', citySlug: 'edinburgh' },
  { name: 'University of Birmingham', city: 'Birmingham', country: 'UK', students: '38,000+', slug: 'birmingham', citySlug: 'birmingham' },
  { name: 'Aston University', city: 'Birmingham', country: 'UK', students: '15,000+', slug: 'aston', citySlug: 'birmingham' },
  { name: 'University of Bristol', city: 'Bristol', country: 'UK', students: '25,000+', slug: 'bristol', citySlug: 'bristol' },
  { name: 'University of the West of England', city: 'Bristol', country: 'UK', students: '30,000+', slug: 'uwe-bristol', citySlug: 'bristol' },
  { name: 'University of Leeds', city: 'Leeds', country: 'UK', students: '36,000+', slug: 'leeds', citySlug: 'leeds' },
  { name: 'Leeds Beckett University', city: 'Leeds', country: 'UK', students: '24,000+', slug: 'leeds-beckett', citySlug: 'leeds' },
  { name: 'University of Sheffield', city: 'Sheffield', country: 'UK', students: '29,000+', slug: 'sheffield', citySlug: 'sheffield' },
  { name: 'Sheffield Hallam University', city: 'Sheffield', country: 'UK', students: '31,000+', slug: 'sheffield-hallam', citySlug: 'sheffield' },
  { name: 'University of Nottingham', city: 'Nottingham', country: 'UK', students: '34,000+', slug: 'nottingham', citySlug: 'nottingham' },
  { name: 'Nottingham Trent University', city: 'Nottingham', country: 'UK', students: '35,000+', slug: 'nottingham-trent', citySlug: 'nottingham' },
  { name: 'University of Newcastle', city: 'Newcastle', country: 'UK', students: '28,000+', slug: 'newcastle', citySlug: 'newcastle' },
  { name: 'Northumbria University', city: 'Newcastle', country: 'UK', students: '27,000+', slug: 'northumbria', citySlug: 'newcastle' },
  { name: 'University of Liverpool', city: 'Liverpool', country: 'UK', students: '29,000+', slug: 'liverpool', citySlug: 'liverpool' },
  { name: 'Liverpool John Moores University', city: 'Liverpool', country: 'UK', students: '25,000+', slug: 'ljmu', citySlug: 'liverpool' },
  { name: 'University of Glasgow', city: 'Glasgow', country: 'UK', students: '33,000+', slug: 'glasgow', citySlug: 'glasgow' },
  { name: 'University of Strathclyde', city: 'Glasgow', country: 'UK', students: '23,000+', slug: 'strathclyde', citySlug: 'glasgow' },
  { name: 'Cardiff University', city: 'Cardiff', country: 'UK', students: '33,000+', slug: 'cardiff', citySlug: 'cardiff' },
  { name: 'Cardiff Metropolitan University', city: 'Cardiff', country: 'UK', students: '11,000+', slug: 'cardiff-met', citySlug: 'cardiff' },
  { name: 'Queens University Belfast', city: 'Belfast', country: 'UK', students: '25,000+', slug: 'queens-belfast', citySlug: 'belfast' },
  { name: 'Ulster University', city: 'Belfast', country: 'UK', students: '24,000+', slug: 'ulster', citySlug: 'belfast' },
  { name: 'Coventry University', city: 'Coventry', country: 'UK', students: '29,000+', slug: 'coventry', citySlug: 'coventry' },
  { name: 'University of Warwick', city: 'Coventry', country: 'UK', students: '27,000+', slug: 'warwick', citySlug: 'coventry' },
  { name: 'Trinity College Dublin', city: 'Dublin', country: 'Ireland', students: '18,000+', slug: 'tcd', citySlug: 'dublin' },
  { name: 'University College Dublin', city: 'Dublin', country: 'Ireland', students: '32,000+', slug: 'ucd', citySlug: 'dublin' },
  { name: 'Dublin City University', city: 'Dublin', country: 'Ireland', students: '17,000+', slug: 'dcu', citySlug: 'dublin' },
  { name: 'Technological University Dublin', city: 'Dublin', country: 'Ireland', students: '28,000+', slug: 'tud', citySlug: 'dublin' },
  { name: 'University College Cork', city: 'Cork', country: 'Ireland', students: '21,000+', slug: 'ucc', citySlug: 'cork' },
  { name: 'Munster Technological University', city: 'Cork', country: 'Ireland', students: '18,000+', slug: 'mtu', citySlug: 'cork' },
  { name: 'University of Galway', city: 'Galway', country: 'Ireland', students: '18,000+', slug: 'galway', citySlug: 'galway' },
  { name: 'Atlantic Technological University', city: 'Galway', country: 'Ireland', students: '16,000+', slug: 'atu', citySlug: 'galway' },
  { name: 'Sorbonne University', city: 'Paris', country: 'FR', students: '55,000+', slug: 'sorbonne', citySlug: 'paris' },
  { name: 'Sciences Po', city: 'Paris', country: 'FR', students: '15,000+', slug: 'sciences-po', citySlug: 'paris' },
  { name: 'PSL University', city: 'Paris', country: 'FR', students: '17,000+', slug: 'psl', citySlug: 'paris' },
  { name: 'University of Lyon', city: 'Lyon', country: 'FR', students: '50,000+', slug: 'lyon', citySlug: 'lyon' },
  { name: 'University of Toulouse', city: 'Toulouse', country: 'FR', students: '40,000+', slug: 'toulouse', citySlug: 'toulouse' },
  { name: 'University of Sydney', city: 'Sydney', country: 'Australia', students: '60,000+', slug: 'sydney', citySlug: 'sydney' },
  { name: 'University of New South Wales', city: 'Sydney', country: 'Australia', students: '59,000+', slug: 'unsw', citySlug: 'sydney' },
  { name: 'University of Technology Sydney', city: 'Sydney', country: 'Australia', students: '44,000+', slug: 'uts', citySlug: 'sydney' },
  { name: 'Macquarie University', city: 'Sydney', country: 'Australia', students: '40,000+', slug: 'macquarie', citySlug: 'sydney' },
  { name: 'University of Melbourne', city: 'Melbourne', country: 'Australia', students: '52,000+', slug: 'melbourne', citySlug: 'melbourne' },
  { name: 'Monash University', city: 'Melbourne', country: 'Australia', students: '86,000+', slug: 'monash', citySlug: 'melbourne' },
  { name: 'RMIT University', city: 'Melbourne', country: 'Australia', students: '80,000+', slug: 'rmit', citySlug: 'melbourne' },
  { name: 'Deakin University', city: 'Melbourne', country: 'Australia', students: '60,000+', slug: 'deakin', citySlug: 'melbourne' },
  { name: 'University of Queensland', city: 'Brisbane', country: 'Australia', students: '54,000+', slug: 'uq', citySlug: 'brisbane' },
  { name: 'Queensland University of Technology', city: 'Brisbane', country: 'Australia', students: '48,000+', slug: 'qut', citySlug: 'brisbane' },
  { name: 'Griffith University', city: 'Brisbane', country: 'Australia', students: '46,000+', slug: 'griffith', citySlug: 'brisbane' },
  { name: 'University of Western Australia', city: 'Perth', country: 'Australia', students: '25,000+', slug: 'uwa', citySlug: 'perth' },
  { name: 'Curtin University', city: 'Perth', country: 'Australia', students: '50,000+', slug: 'curtin', citySlug: 'perth' },
  { name: 'Edith Cowan University', city: 'Perth', country: 'Australia', students: '30,000+', slug: 'ecu', citySlug: 'perth' },
  { name: 'University of Adelaide', city: 'Adelaide', country: 'Australia', students: '27,000+', slug: 'adelaide', citySlug: 'adelaide' },
  { name: 'University of South Australia', city: 'Adelaide', country: 'Australia', students: '32,000+', slug: 'unisa', citySlug: 'adelaide' },
  { name: 'Flinders University', city: 'Adelaide', country: 'Australia', students: '26,000+', slug: 'flinders', citySlug: 'adelaide' },
  { name: 'Australian National University', city: 'Canberra', country: 'Australia', students: '21,000+', slug: 'anu', citySlug: 'canberra' },
  { name: 'University of Canberra', city: 'Canberra', country: 'Australia', students: '16,000+', slug: 'uc', citySlug: 'canberra' },
  { name: 'Bond University', city: 'Gold Coast', country: 'Australia', students: '4,000+', slug: 'bond', citySlug: 'gold-coast' },
  { name: 'Griffith University Gold Coast', city: 'Gold Coast', country: 'Australia', students: '18,000+', slug: 'griffith-gc', citySlug: 'gold-coast' }
]

export const groupedCities: Record<string, CityPlace[]> = {
  'United Kingdom': cities.filter((city) => city.countryCode === 'UK'),
  Ireland: cities.filter((city) => city.countryCode === 'IE'),
  France: cities.filter((city) => city.countryCode === 'FR'),
  Australia: cities.filter((city) => city.countryCode === 'AU')
}

export function getCityBySlug(slug: string): CityPlace | undefined {
  return cities.find((city) => city.slug === slug)
}

export function getUniversitiesByCity(cityName: string): UniversityPlace[] {
  return universities.filter((university) => university.city === cityName)
}

export function getUniversityBySlug(slug: string): UniversityPlace | undefined {
  return universities.find((university) => university.slug === slug)
}
