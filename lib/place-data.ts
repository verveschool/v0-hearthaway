export type CountryCode = 'UK' | 'IE' | 'FR' | 'UAE' | 'DE' | 'AU'

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
    description: 'England&apos;s second largest city offering an affordable central tech hub with rapid national rail connections',
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
    description: 'Scotland&apos;s massive cultural capital containing world beating red brick campuses and elite creative arts academies',
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
    description: 'the welcoming capital of Wales offering a compact urban footprint castle grounds and approachable coastal living',
    avgRent: '£500 to £750 / mo',
    studentPositioning: 'cathays is the engine room of Cardiff student life where you trade premium silence for absolute walking convenience to lecture halls',
    bestAreasForStudents: {
      summary: 'cathays hosts the vast majority of shared properties while roath brings quiet green parks and enhanced room sizes to postgraduates',
      topNeighbourhoods: ['cathays', 'roath', 'heath', 'canton', 'city centre']
    },
    rentBudgeting: {
      summary: 'one of the most financially efficient capital cities in Western Europe for international student accommodation deployment',
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
    description: 'the thriving tech capital of Ireland hosting the European headquarters of the world&apos;s greatest internet giants',
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
    description: 'Ireland&apos;s southern maritime capital boasting an independent global pharmaceutical and food science presence',
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
    image: '/images/city-paris.png',
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
    image: '/images/city-lyon.png',
    slug: 'lyon',
    description: 'a major French student city combining research universities business schools and an efficient metro tram and river corridor layout',
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
    image: '/images/city-toulouse.png',
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
    name: 'Marseille',
    country: 'France',
    countryCode: 'FR',
    universities: '5+',
    image: '/images/city-marseille.png',
    slug: 'marseille',
    description: 'a vibrant Mediterranean port city and France&apos;s second largest metropolis blending historic architecture with modern research infrastructure',
    avgRent: '€550 to €900 / mo',
    studentPositioning: 'marseille rewards students who anchor to the metro and metro tramway network connecting to campuses spread across the wider urban basin',
    bestAreasForStudents: {
      summary: 'the vieux port and centre ville provide atmospheric walkable student quarters while les caillols and saint jerome sit adjacent to major science campuses',
      topNeighbourhoods: ['vieux port', 'centre ville', 'les caillols', 'saint jerome', 'prefecture']
    },
    rentBudgeting: {
      summary: 'marseille offers lower baseline costs than paris or lyon while maintaining strong transport connections and a thriving student culture',
      averageMonthlyRent: '€700'
    }
  },
  {
    name: 'Montpellier',
    country: 'France',
    countryCode: 'FR',
    universities: '4+',
    image: '/images/city-montpellier.png',
    slug: 'montpellier',
    description: 'a dynamic southern university city known for medicine life sciences research and a youthful energetic student centered urban environment',
    avgRent: '€500 to €800 / mo',
    studentPositioning: 'montpellier is highly student focused with compact city layout where most accommodation sits within easy walking or tram distance to major campuses',
    bestAreasForStudents: {
      summary: 'centre ville and antigone provide walkable central options while the northern campuses in sainte croix and millenaire offer suburban proximity',
      topNeighbourhoods: ['centre ville', 'antigone', 'sainte croix', 'millenaire', 'port marianne']
    },
    rentBudgeting: {
      summary: 'montpellier delivers excellent value with rising student population bringing new residence options and sharing competitive pricing across neighborhoods',
      averageMonthlyRent: '€650'
    }
  },
  {
    name: 'Bordeaux',
    country: 'France',
    countryCode: 'FR',
    universities: '3+',
    image: '/images/city-bordeaux.png',
    slug: 'bordeaux',
    description: 'a historic Atlantic port city renowned for wine business education and elegant urban design with strong public transport infrastructure',
    avgRent: '€550 to €850 / mo',
    studentPositioning: 'bordeaux student housing anchors to tram lines serving business schools and university campuses in the talence suburban clusters',
    bestAreasForStudents: {
      summary: 'the centre ville quarters host walkable traditional student zones while talence and pessac provide easy tram links to major engineering and research sites',
      topNeighbourhoods: ['centre ville', 'talence', 'pessac', 'chartrons', 'quais']
    },
    rentBudgeting: {
      summary: 'bordeaux combines regional affordability with strong urban amenities and wine culture making student budgets stretch considerably',
      averageMonthlyRent: '€700'
    }
  },
  {
    name: 'Lille',
    country: 'France',
    countryCode: 'FR',
    universities: '4+',
    image: '/images/city-lille.png',
    slug: 'lille',
    description: 'a northern gateway city connecting France to Belgium and the UK via rail with respected business schools and technical universities',
    avgRent: '€500 to €800 / mo',
    studentPositioning: 'lille students anchor to the metro network linking vieux lille historic quarters to suburban engineering and science campuses',
    bestAreasForStudents: {
      summary: 'vieux lille offers charming walkable bohemian student life while wazemmes and fives provide excellent metro connections to wider campus sites',
      topNeighbourhoods: ['vieux lille', 'wazemmes', 'fives', 'centre', 'moulins']
    },
    rentBudgeting: {
      summary: 'lille delivers strong rent value positioning northern france as an affordable alternative to southern and central city hubs',
      averageMonthlyRent: '€625'
    }
  },
  {
    name: 'Nice',
    country: 'France',
    countryCode: 'FR',
    universities: '2+',
    image: '/images/city-nice.png',
    slug: 'nice',
    description: 'a glamorous Côte d&apos;Azur resort city and academic hub famous for coastal living research institutions and Mediterranean climate',
    avgRent: '€600 to €950 / mo',
    studentPositioning: 'nice student housing trades between central promenade des anglais prestige and suburban campuses requiring bus or tram connections',
    bestAreasForStudents: {
      summary: 'vieux nice and the quartier des musiciens anchor walkable student quarters while saint barthelemy provides easier access to university campuses',
      topNeighbourhoods: ['vieux nice', 'quartier des musiciens', 'saint barthelemy', 'libération', 'promenade des anglais']
    },
    rentBudgeting: {
      summary: 'nice maintains mediterranean lifestyle prestige while offering student residences and shared housing that control costs relative to private market',
      averageMonthlyRent: '€750'
    }
  },
  {
    name: 'Strasbourg',
    country: 'France',
    countryCode: 'FR',
    universities: '3+',
    image: '/images/city-strasbourg.png',
    slug: 'strasbourg',
    description: 'a historic border city and European hub with renowned universities bike culture and strong Franco-German cultural integration',
    avgRent: '€500 to €800 / mo',
    studentPositioning: 'strasbourg is uniquely bike and tram oriented where most student housing clusters within direct access to university districts without transit cost',
    bestAreasForStudents: {
      summary: 'centre ville and the petite france quarters provide walkable historic charm while the northern neudorf and koenigshoffen campuses sit on tram lines',
      topNeighbourhoods: ['centre ville', 'petite france', 'neudorf', 'koenigshoffen', 'montagne verte']
    },
    rentBudgeting: {
      summary: 'strasbourg offers exceptional value with strong bike infrastructure reducing transport costs and excellent student residence options from crous',
      averageMonthlyRent: '€600'
    }
  },
  {
    name: 'Grenoble',
    country: 'France',
    countryCode: 'FR',
    universities: '3+',
    image: '/images/city-grenoble.png',
    slug: 'grenoble',
    description: 'a mountain gateway city and major research hub for engineering and science with excellent cable car tram and bus networks',
    avgRent: '€500 to €800 / mo',
    studentPositioning: 'grenoble campus geography requires students to anchor to tram and bus routes serving dispersed technology and research institutes in foothills',
    bestAreasForStudents: {
      summary: 'the centre ville provides walkable accommodation while the southern campuses in Gières and Saint-Martin-d&apos;Hères require tram line planning',
      topNeighbourhoods: ['centre ville', 'Gières', 'Saint-Martin-d&apos;Hères', 'South']
    },
    rentBudgeting: {
      summary: 'grenoble delivers strong student value with mountain culture appeal and solid crous and private residence options across suburbs',
      averageMonthlyRent: '€625'
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
    description: 'the cultural arts and dining champion of Australia designed around a highly structured city tram grid',
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
      summary: 'St Lucia is the classic dedicated UQ university bubble while Toowong delivers the essential rail and commercial retail links',
      topNeighbourhoods: ['St Lucia', 'Kelvin Grove', 'Toowong', 'South Bank', 'Indooroopilly']
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
    studentPositioning: 'unlike other major Australian cities city centre living is highly practical affordable and integrated with campus gates here',
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
  },
  {
    name: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'UAE',
    universities: '15+',
    image: '/images/city-dubai.png',
    slug: 'dubai',
    description: 'the middle east&apos;s global education hub with modern branch campuses, tax free income, and world class infrastructure for international students',
    avgRent: 'AED 2500 to 4500 / mo',
    studentPositioning: 'metro linked marina and jbr offer beachside student accommodation with easy access to major universities across emirates hills and downtown',
    bestAreasForStudents: {
      summary: 'marina and jbr provide walkable beachfront lifestyle while emirates hills and downtown offer proximity to major international branch campuses',
      topNeighbourhoods: ['marina', 'jbr', 'emirates hills', 'downtown dubai', 'business bay']
    },
    rentBudgeting: {
      summary: 'furnished studios and shared villas dominate the student market with utilities typically included in quoted rent making budgeting predictable',
      averageMonthlyRent: 'AED 3500'
    }
  },
  {
    name: 'Abu Dhabi',
    country: 'United Arab Emirates',
    countryCode: 'UAE',
    universities: '8+',
    image: '/images/city-abu-dhabi.png',
    slug: 'abu-dhabi',
    description: 'the capital city combining nyu branch campus prestige with government university strength and a more relaxed pace than dubai',
    avgRent: 'AED 2000 to 3500 / mo',
    studentPositioning: 'nyu abu dhabi dominates the international student landscape while uae university appeals to regional and international cohorts',
    bestAreasForStudents: {
      summary: 'yas island hosts nyu with modern accommodation while zanzibar and electra offer accessible housing near khalifa and zayed universities',
      topNeighbourhoods: ['yas island', 'zanzibar', 'electra', 'al mina', 'corniche']
    },
    rentBudgeting: {
      summary: 'government sponsored housing and university residences keep baseline costs significantly lower than dubai with quality comparable to premium international standards',
      averageMonthlyRent: 'AED 2750'
    }
  },
  {
    name: 'Sharjah',
    country: 'United Arab Emirates',
    countryCode: 'UAE',
    universities: '5+',
    image: '/images/city-sharjah.png',
    slug: 'sharjah',
    description: 'the cultural heart of the emirates with the university of sharjah as its anchor and significantly lower accommodation costs than dubai',
    avgRent: 'AED 1500 to 2800 / mo',
    studentPositioning: 'university of sharjah provides strong regional reputation while metro bus links connect to job opportunities and social life in dubai and ajman',
    bestAreasForStudents: {
      summary: 'al qasba and university city deliver walking accessible student life while al majaz offers metro bus connectivity to broader emirates employment',
      topNeighbourhoods: ['al qasba', 'university city', 'al majaz', 'rolla', 'al furjan']
    },
    rentBudgeting: {
      summary: 'sharjah delivers the lowest accommodation cost of the three emirates with shared villas and furnished studios under aed 2000 per month making it ideal for budget conscious students',
      averageMonthlyRent: 'AED 2000'
    }
  },
  {
    name: 'Munich',
    country: 'Germany',
    countryCode: 'DE',
    universities: '6',
    image: '/images/city-munich.png',
    slug: 'munich',
    description: 'the powerhouse of german engineering and technology with tum as a global leader and exceptional quality of life offset by higher bavarian accommodation costs',
    avgRent: 'EUR 500 to 900 / mo',
    studentPositioning: 'tum and lmu campuses spread across the city with s bahn and u bahn networks anchoring student neighborhoods far from expensive city centre',
    bestAreasForStudents: {
      summary: 'schwabing and neuhausen offer walkable student quarters with bohemian culture while moosach and feldmoching provide affordable u bahn access to tum',
      topNeighbourhoods: ['schwabing', 'neuhausen', 'moosach', 'feldmoching', 'bogenhausen']
    },
    rentBudgeting: {
      summary: 'studentenwerk dorms offer foundational EUR 300 400 options though waitlists stretch beyond one year meaning private wg shares at EUR 600 800 dominate actual student housing',
      averageMonthlyRent: 'EUR 700'
    }
  },
  {
    name: 'Berlin',
    country: 'Germany',
    countryCode: 'DE',
    universities: '5',
    image: '/images/city-berlin.png',
    slug: 'berlin',
    description: 'the vibrant capital with world class research universities and an explosion of cultural life offset by ongoing student housing shortages',
    avgRent: 'EUR 400 to 700 / mo',
    studentPositioning: 'humboldt university fu and tu berlin spread across the city with u bahn and s bahn providing fast connections to student neighborhoods',
    bestAreasForStudents: {
      summary: 'kreuzberg prenzlauer berg and friedrichshain deliver the highest concentration of student communities while spandau and rummelsburg offer budget alternatives',
      topNeighbourhoods: ['kreuzberg', 'prenzlauer berg', 'friedrichshain', 'charlottenburg', 'neukölln']
    },
    rentBudgeting: {
      summary: 'berlin&apos;s reputation for affordability is eroding as new students flood the market meaning wg rooms increasingly stretch toward EUR 700 800 in central districts',
      averageMonthlyRent: 'EUR 600'
    }
  },
  {
    name: 'Frankfurt',
    country: 'Germany',
    countryCode: 'DE',
    universities: '4',
    image: '/images/city-frankfurt.png',
    slug: 'frankfurt',
    description: 'a global financial hub with goethe university as its anchor offering strong business and international programs amid high accommodation costs',
    avgRent: 'EUR 450 to 800 / mo',
    studentPositioning: 'goethe university spreads across westend sachsenhausen and bockenheim with u bahn connections anchoring student housing decisions',
    bestAreasForStudents: {
      summary: 'sachsenhausen and westend provide bohemian and academic vibes while bockenheim and bornheim offer better value with quick u bahn access to campus',
      topNeighbourhoods: ['sachsenhausen', 'westend', 'bockenheim', 'bornheim', 'höchst']
    },
    rentBudgeting: {
      summary: 'frankfurt studentenwerk provides foundational options but private wg shares in walkable areas command premium due to geographic remoteness from other major cities',
      averageMonthlyRent: 'EUR 650'
    }
  },
  {
    name: 'Hamburg',
    country: 'Germany',
    countryCode: 'DE',
    universities: '3',
    image: '/images/city-hamburg.png',
    slug: 'hamburg',
    description: 'germany&apos;s northern port city with hamburg university and haw hamburg offering maritime research strength and cosmopolitan student culture',
    avgRent: 'EUR 400 to 750 / mo',
    studentPositioning: 'university of hamburg and haw campuses connect via s bahn with student housing concentrated in areas anchoring the ring around the inner lakes',
    bestAreasForStudents: {
      summary: 'san pauli and ottensen deliver bohemian energy while altona and eppendorf offer quieter academic atmospheres with s bahn connections',
      topNeighbourhoods: ['san pauli', 'ottensen', 'altona', 'eppendorf', 'winter huder']
    },
    rentBudgeting: {
      summary: 'hamburg&apos;s studentenwerk maintains strong inventory of EUR 300 500 dorms offsetting private market pressure on wg shares in central districts',
      averageMonthlyRent: 'EUR 580'
    }
  },
  {
    name: 'Cologne',
    country: 'Germany',
    countryCode: 'DE',
    universities: '4',
    image: '/images/city-cologne.png',
    slug: 'cologne',
    description: 'the cathedral city on the rhine with university of cologne delivering humanities strength and excellent nightlife offsetting accommodation pressures',
    avgRent: 'EUR 400 to 700 / mo',
    studentPositioning: 'university of cologne campuses spread across the city with u bahn and s bahn providing efficient connections to residential quarters',
    bestAreasForStudents: {
      summary: 'south city cologne deliver student neighborhoods on the rhine with ehrenfeld and nippes offering cheaper alternatives with quick u bahn access',
      topNeighbourhoods: ['south city', 'ehrenfeld', 'nippes', 'poll', 'junkersdorf']
    },
    rentBudgeting: {
      summary: 'cologne maintains middle tier accommodation costs with solid studentenwerk coverage though wg shares increasingly compete for younger international students',
      averageMonthlyRent: 'EUR 600'
    }
  },
  {
    name: 'Aachen',
    country: 'Germany',
    countryCode: 'DE',
    universities: '3',
    image: '/images/city-aachen.png',
    slug: 'aachen',
    description: 'the engineering capital with rwth aachen university as one of europe&apos;s top technical institutions attracting strong international student cohorts',
    avgRent: 'EUR 350 to 600 / mo',
    studentPositioning: 'rwth aachen dominates the city with student accommodation concentrated around the main campus connected by tram network',
    bestAreasForStudents: {
      summary: 'aachen city centre and west offer walking access to rwth while eilendorf and brand provide affordable tram linked alternatives',
      topNeighbourhoods: ['city centre', 'west', 'eilendorf', 'brand', 'laurensberg']
    },
    rentBudgeting: {
      summary: 'aachen offers the best value of major german university cities with strong studentenwerk presence and competitive wg market keeping monthly costs under EUR 600',
      averageMonthlyRent: 'EUR 500'
    }
  },
  {
    name: 'Heidelberg',
    country: 'Germany',
    countryCode: 'DE',
    universities: '2',
    image: '/images/city-heidelberg.png',
    slug: 'heidelberg',
    description: 'germany&apos;s oldest university town nestled on the neckar river with exceptional student culture and walkable intimacy versus big city competition',
    avgRent: 'EUR 400 to 700 / mo',
    studentPositioning: 'heidelberg university dominates the city with most student accommodation within walking or short tram distance of historic old town campuses',
    bestAreasForStudents: {
      summary: 'old town delivers romantic walkable student life while neuenheim rohrbach and baiertal provide quieter residential alternatives minutes from lectures',
      topNeighbourhoods: ['old town', 'neuenheim', 'rohrbach', 'baiertal', 'handschuhsheim']
    },
    rentBudgeting: {
      summary: 'heidelberg&apos;s smaller scale keeps rent competitive with strong studentenwerk provision meaning wg shares anchor around EUR 550 per person',
      averageMonthlyRent: 'EUR 550'
    }
  },
  {
    name: 'Leipzig',
    country: 'Germany',
    countryCode: 'DE',
    universities: '3',
    image: '/images/city-leipzig.png',
    slug: 'leipzig',
    description: 'the eastern renaissance with leipzig university as a historic institution and a thriving cultural scene with exceptional affordability',
    avgRent: 'EUR 300 to 550 / mo',
    studentPositioning: 'leipzig university campuses spread across the city with tram network delivering fast connections to residential student quarters',
    bestAreasForStudents: {
      summary: 'schleußig plagwitz and reudnitz deliver the highest concentration of student culture and bars while zentrum west offer classic apartment stock',
      topNeighbourhoods: ['schleußig', 'plagwitz', 'reudnitz', 'zentrum west', 'connewitz']
    },
    rentBudgeting: {
      summary: 'leipzig remains germany&apos;s affordable sanctuary with wg shares regularly under EUR 450 and studentenwerk dorms below EUR 350 per month',
      averageMonthlyRent: 'EUR 425'
    }
  },
  {
    name: 'Dresden',
    country: 'Germany',
    countryCode: 'DE',
    universities: '2',
    image: '/images/city-dresden.png',
    slug: 'dresden',
    description: 'the baroque jewel of eastern germany with tu dresden delivering engineering and science research excellence amid cultural recovery',
    avgRent: 'EUR 350 to 600 / mo',
    studentPositioning: 'tu dresden campuses spread across the city with straßenbahn network providing extensive connections to student residential areas',
    bestAreasForStudents: {
      summary: 'prager straße altstadt and neustadt deliver student atmosphere with walkable access while südvorstadt and striesen offer value with tram connections',
      topNeighbourhoods: ['prager straße', 'altstadt', 'neustadt', 'südvorstadt', 'striesen']
    },
    rentBudgeting: {
      summary: 'dresden maintains excellent value with strong studentenwerk presence keeping monthly costs competitive while cultural attractions remain globally priced',
      averageMonthlyRent: 'EUR 500'
    }
  },
  {
    name: 'Stuttgart',
    country: 'Germany',
    countryCode: 'DE',
    universities: '3',
    image: '/images/city-stuttgart.png',
    slug: 'stuttgart',
    description: 'the engineering and automotive capital with u stuttgart delivering technical excellence amid higher swabian accommodation costs',
    avgRent: 'EUR 450 to 800 / mo',
    studentPositioning: 'u stuttgart campuses spread across multiple zones with s bahn providing fast connections to student neighborhoods in surrounding valleys',
    bestAreasForStudents: {
      summary: 'west end and south deliver walkable student neighborhoods while neugereut and cannstatt offer value with s bahn access to main campus',
      topNeighbourhoods: ['west end', 'south', 'neugereut', 'cannstatt', 'freiberg']
    },
    rentBudgeting: {
      summary: 'stuttgart maintains higher accommodation costs reflecting regional prosperity with wg shares typically EUR 650 800 and studentenwerk providing foundational options',
      averageMonthlyRent: 'EUR 700'
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
  { name: 'University of Lyon', city: 'Lyon', country: 'FR', students: '50,000+', slug: 'lyon-univ', citySlug: 'lyon' },
  { name: 'University of Toulouse', city: 'Toulouse', country: 'FR', students: '40,000+', slug: 'toulouse-univ', citySlug: 'toulouse' },
  { name: 'Aix-Marseille University', city: 'Marseille', country: 'FR', students: '65,000+', slug: 'marseille-univ', citySlug: 'marseille' },
  { name: 'University of Montpellier', city: 'Montpellier', country: 'FR', students: '48,000+', slug: 'montpellier-univ', citySlug: 'montpellier' },
  { name: 'University of Bordeaux', city: 'Bordeaux', country: 'FR', students: '35,000+', slug: 'bordeaux-univ', citySlug: 'bordeaux' },
  { name: 'University of Lille', city: 'Lille', country: 'FR', students: '42,000+', slug: 'lille-univ', citySlug: 'lille' },
  { name: 'Université Côte d\'Azur', city: 'Nice', country: 'FR', students: '28,000+', slug: 'nice-univ', citySlug: 'nice' },
  { name: 'University of Strasbourg', city: 'Strasbourg', country: 'FR', students: '42,000+', slug: 'strasbourg-univ', citySlug: 'strasbourg' },
  { name: 'Université Grenoble Alpes', city: 'Grenoble', country: 'FR', students: '58,000+', slug: 'grenoble-univ', citySlug: 'grenoble' },
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
  { name: 'Griffith University Gold Coast', city: 'Gold Coast', country: 'Australia', students: '18,000+', slug: 'griffith-gc', citySlug: 'gold-coast' },
  { name: 'Heriot-Watt University Dubai', city: 'Dubai', country: 'UAE', students: '6,000+', slug: 'heriot-watt-dubai', citySlug: 'dubai' },
  { name: 'University of Birmingham Dubai', city: 'Dubai', country: 'UAE', students: '2,500+', slug: 'birmingham-dubai', citySlug: 'dubai' },
  { name: 'Middlesex University Dubai', city: 'Dubai', country: 'UAE', students: '4,500+', slug: 'middlesex-dubai', citySlug: 'dubai' },
  { name: 'American University in Dubai', city: 'Dubai', country: 'UAE', students: '1,200+', slug: 'aiu-dubai', citySlug: 'dubai' },
  { name: 'University of Wollongong Dubai', city: 'Dubai', country: 'UAE', students: '3,000+', slug: 'uow-dubai', citySlug: 'dubai' },
  { name: 'NYU Abu Dhabi', city: 'Abu Dhabi', country: 'UAE', students: '1,600+', slug: 'nyu-abu-dhabi', citySlug: 'abu-dhabi' },
  { name: 'UAE University', city: 'Abu Dhabi', country: 'UAE', students: '16,000+', slug: 'uae-univ', citySlug: 'abu-dhabi' },
  { name: 'Khalifa University', city: 'Abu Dhabi', country: 'UAE', students: '3,500+', slug: 'khalifa-univ', citySlug: 'abu-dhabi' },
  { name: 'Zayed University', city: 'Abu Dhabi', country: 'UAE', students: '4,000+', slug: 'zayed-univ', citySlug: 'abu-dhabi' },
  { name: 'University of Sharjah', city: 'Sharjah', country: 'UAE', students: '14,000+', slug: 'sharjah-univ', citySlug: 'sharjah' },
  { name: 'Technical University of Munich', city: 'Munich', country: 'DE', students: '47,000+', slug: 'tum-munich', citySlug: 'munich' },
  { name: 'Ludwig Maximilian University Munich', city: 'Munich', country: 'DE', students: '52,000+', slug: 'lmu-munich', citySlug: 'munich' },
  { name: 'Humboldt University Berlin', city: 'Berlin', country: 'DE', students: '36,000+', slug: 'humboldt-berlin', citySlug: 'berlin' },
  { name: 'University of Heidelberg', city: 'Heidelberg', country: 'DE', students: '30,000+', slug: 'heidelberg-univ', citySlug: 'heidelberg' },
  { name: 'RWTH Aachen University', city: 'Aachen', country: 'DE', students: '47,000+', slug: 'rwth-aachen', citySlug: 'aachen' },
  { name: 'University of Hamburg', city: 'Hamburg', country: 'DE', students: '43,000+', slug: 'hamburg-univ', citySlug: 'hamburg' },
  { name: 'Goethe University Frankfurt', city: 'Frankfurt', country: 'DE', students: '45,000+', slug: 'goethe-frankfurt', citySlug: 'frankfurt' },
  { name: 'University of Göttingen', city: 'Hamburg', country: 'DE', students: '36,000+', slug: 'gottingen-univ', citySlug: 'hamburg' },
  { name: 'University of Tübingen', city: 'Stuttgart', country: 'DE', students: '28,000+', slug: 'tubingen-univ', citySlug: 'stuttgart' },
  { name: 'University of Stuttgart', city: 'Stuttgart', country: 'DE', students: '65,000+', slug: 'stuttgart-univ', citySlug: 'stuttgart' }
]

export const groupedCities: Record<string, CityPlace[]> = {
  'United Kingdom': cities.filter((city) => city.countryCode === 'UK'),
  Ireland: cities.filter((city) => city.countryCode === 'IE'),
  France: cities.filter((city) => city.countryCode === 'FR'),
  'United Arab Emirates': cities.filter((city) => city.countryCode === 'UAE'),
  Germany: cities.filter((city) => city.countryCode === 'DE'),
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
