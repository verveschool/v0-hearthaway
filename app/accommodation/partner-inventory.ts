import type {
  AccommodationCurrency,
  AccommodationProperty,
  AccommodationRoomType,
} from "./accommodation-data";

type CatalogMeta = {
  partnerSlug: string;
  categories: string[];
  gallerySourceUrl: string;
  gallery: string[];
  primaryListingSlug?: string;
};
export type CatalogProperty = AccommodationProperty & CatalogMeta;

const studyInnRooms: AccommodationRoomType[] = [
  {
    name: "Gold En-suite Serviced Apartment",
    image:
      "https://studyinn.com/wp-content/uploads/2024/10/Sapphire-Plus-Apt-4.jpg.webp",
    price: {
      value: 165,
      currency: "GBP",
      period: "week",
      indicative: true,
      conditions:
        "Tentative starting price published by the provider; rates vary by apartment tier and contract length.",
    },
    features: ["En-suite bathroom", "Double bed", "Study desk", "Kitchenette"],
  },
  {
    name: "Sapphire Plus En-suite Serviced Apartment",
    image:
      "https://studyinn.com/wp-content/uploads/2024/10/Sapphire-Plus-Apt-4.jpg.webp",
    price: {
      value: 220,
      currency: "GBP",
      period: "week",
      indicative: true,
      conditions: "Tentative weekly price published by the provider.",
    },
    features: ["En-suite bathroom", "Double bed", "Study desk", "Kitchenette"],
  },
];

export const additionalAccommodationProperties: CatalogProperty[] = [
  {
    slug: "study-inn-brotherton-house",
    name: "Brotherton House",
    city: "Leeds",
    country: "UK",
    address: "Leeds city centre, Leeds, UK",
    priceFrom: 165,
    currency: "GBP",
    pricePeriod: "week",
    roomTypes: studyInnRooms.map((room) => room.name),
    rooms: studyInnRooms,
    propertyType: "Student residence",
    universities: ["University of Leeds", "Leeds Beckett University"],
    distance: "Central Leeds location",
    amenities: [
      "Superfast Wi-Fi",
      "Gym and wellbeing facilities",
      "Study rooms",
      "Regular cleaning",
    ],
    highlights: [
      "Serviced student living",
      "Room and shared-space photography included",
    ],
    image: "https://studyinn.com/wp-content/uploads/2022/11/11-1.jpg.webp",
    source: "Study Inn",
    sourceUrl:
      "https://studyinn.com/student-accommodation/leeds/brotherton-house/",
    pricingSourceUrl:
      "https://studyinn.com/student-accommodation/leeds/brotherton-house/",
    partnerSlug: "study-inn",
    categories: ["Student residence", "En-suite"],
    gallerySourceUrl:
      "https://studyinn.com/student-accommodation/leeds/brotherton-house/",
    gallery: [
      "https://studyinn.com/wp-content/uploads/2022/11/11-1.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2024/10/Brotherton-House-Building-3.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2022/11/Shared-kitchen-3.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2024/10/Sapphire-Plus-Apt-4.jpg.webp",
    ],
    inclusions: ["Utilities", "Bed linen and towels", "Regular cleaning"],
    roomFeatures: [
      "En-suite bathroom",
      "Double bed",
      "Study desk",
      "Kitchenette",
    ],
    pricingNote:
      "Tentative starting price from the provider. Confirm the exact rate, dates and contract before booking.",
  },
  {
    slug: "neon-wood-berlin-frankfurter-tor",
    name: "Neon Wood Berlin Frankfurter Tor",
    city: "Berlin",
    country: "Germany",
    address: "Frankfurter Tor, Berlin, Germany",
    priceFrom: 890,
    currency: "EUR",
    pricePeriod: "month",
    roomTypes: ["Classic studio"],
    rooms: [
      {
        name: "Classic studio",
        image:
          "https://assets.neonwood.com/uploads/NeonWood_GFT_Classic_A129_03_Deko.webp",
        price: {
          value: 890,
          currency: "EUR",
          period: "month",
          indicative: true,
          conditions:
            "Tentative monthly starting price published by the provider.",
        },
        features: [
          "Private kitchenette",
          "Private bathroom",
          "Furnished room",
          "Desk",
        ],
      },
    ],
    propertyType: "Student residence",
    universities: ["Humboldt University of Berlin", "TU Berlin"],
    distance: "Berlin location",
    amenities: ["Internet", "Common-area access", "On-site management"],
    highlights: ["Private studios", "Room photography included"],
    image: "https://assets.neonwood.com/uploads/berlin-frankfurter-tor.webp",
    source: "Neon Wood",
    sourceUrl: "https://neonwood.com/cities/berlin/berlin-frankfurter-tor",
    pricingSourceUrl:
      "https://neonwood.com/cities/berlin/berlin-frankfurter-tor",
    partnerSlug: "neon-wood",
    categories: ["Student residence", "Studio"],
    gallerySourceUrl:
      "https://neonwood.com/cities/berlin/berlin-frankfurter-tor",
    gallery: [
      "https://assets.neonwood.com/uploads/berlin-frankfurter-tor.webp",
      "https://assets.neonwood.com/uploads/Amenitie_GYM2.webp",
      "https://assets.neonwood.com/uploads/NeonWood_GFT_Classic_A129_03_Deko.webp",
      "https://assets.neonwood.com/uploads/Neonwood_Fft_Classic_Room.webp",
    ],
    pricingNote:
      "Tentative monthly starting price from the provider. Confirm the exact rate, dates and contract before booking.",
  },
];
