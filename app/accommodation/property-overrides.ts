import type { CatalogProperty } from "./partner-inventory";
import type { AccommodationRoomType } from "./accommodation-data";

type PropertyOverride = Partial<CatalogProperty>;

const startingPriceConditions =
  "Starting price for this property; confirm the exact rate for this room type, dates and contract length with the provider.";

export const propertyOverrides: Record<string, PropertyOverride> = {
  "atlantic-point-liverpool": {
    image:
      "https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/a2c0197f-152a-41f2-b2f6-ef8db9c72645/liverpool_atlanticpoint_exterior_G1_T2_L9A9826.jpg.preview.webp",
    gallery: [
      "https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/a2c0197f-152a-41f2-b2f6-ef8db9c72645/liverpool_atlanticpoint_exterior_G1_T2_L9A9826.jpg.preview.webp",
      "https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/7529fd8c-a919-486b-82a8-f0fba1a07b0d/liverpool_atlanticpoint_courtyard_22_1064_G1_T1.jpg.preview.webp",
      "https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/a1b8c708-5b3e-4dc2-a9f4-344c5adae509/liverpool_atlanticpoint_gamesarea_22_0894_G1_T1.jpg.preview.webp",
      "https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/45e6c3ef-8706-4d62-b636-ea9dbadef4e6/liverpool_atlanticpoint_sharedkitchen_22_0291_G1_T1.jpg.preview.webp",
      "https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/528fadc9-57a9-4320-86dc-95f59aa000ae/liverpool_atlanticpoint_classicensuite_0149_G1_T1.jpg.preview.webp",
    ],
    rooms: [
      {
        name: "Ensuite",
        image:
          "https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/528fadc9-57a9-4320-86dc-95f59aa000ae/liverpool_atlanticpoint_classicensuite_0149_G1_T1.jpg.preview.webp",
        price: {
          value: 123,
          currency: "GBP",
          period: "week",
          indicative: true,
          conditions: startingPriceConditions,
        },
      },
      {
        name: "Private Room",
        price: { currency: "GBP", period: "week", priceOnEnquiry: true },
      },
      {
        name: "Studio",
        price: { currency: "GBP", period: "week", priceOnEnquiry: true },
      },
    ] satisfies AccommodationRoomType[],
  },
  "emily-bowes-court-london": {
    image:
      "https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/e2b25049-cf39-40c7-bc18-21bea1c2c871/London_EmilyBowes_Exterior_02.jpg.preview.webp",
    gallery: [
      "https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/e2b25049-cf39-40c7-bc18-21bea1c2c871/London_EmilyBowes_Exterior_02.jpg.preview.webp",
      "https://www.storylink.us/cdn-cgi/image/w=3840,q=90,f=webp/https://us-cdn.storylink.us/93c27672-474b-484d-b038-fbdaaafba29b/London_EmilyBowesCourt_Lounge_Area_1.jpg_preview",
      "https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/f7c2e4b4-4fa5-481a-9455-6af144b6cfbc/London_EmilyBowes_ClassicStudio_02.jpg.preview.webp",
      "https://www.storylink.us/cdn-cgi/image/w=3840,q=90,f=webp/https://us-cdn.storylink.us/73154600-8b43-4263-9bc0-8448f03f5097/London_EmilyBowesCourt_Games_Area_2.jpg_preview",
      "https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/c227cde1-fe38-47ba-85d4-c270fff57e24/London_EmilyBowes_BasicEnsuite_01.jpg.webp",
      "https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/c9ab1758-1244-496e-8d82-ccae27dea9b4/London_EmilyBowes_Premium1Ensuite_01.jpg.webp",
      "https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/ff3146d0-a034-4268-9b92-839cfc9e2567/London_EmilyBowes_Bathroom.jpg.webp",
    ],
    rooms: [
      {
        name: "Ensuite",
        image:
          "https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/c227cde1-fe38-47ba-85d4-c270fff57e24/London_EmilyBowes_BasicEnsuite_01.jpg.webp",
        price: {
          value: 287,
          currency: "GBP",
          period: "week",
          indicative: true,
          conditions: startingPriceConditions,
        },
      },
      {
        name: "Private Room",
        price: { currency: "GBP", period: "week", priceOnEnquiry: true },
      },
      {
        name: "Studio",
        image:
          "https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/f7c2e4b4-4fa5-481a-9455-6af144b6cfbc/London_EmilyBowes_ClassicStudio_02.jpg.preview.webp",
        price: { currency: "GBP", period: "week", priceOnEnquiry: true },
      },
    ] satisfies AccommodationRoomType[],
  },
  "pacific-court-london": {
    image:
      "https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/fd2ba219-77bc-4cfa-84df-f2c82de00b42/London_PacificCourt_Exterior_03.jpg.preview.png",
    gallery: [
      "https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/fd2ba219-77bc-4cfa-84df-f2c82de00b42/London_PacificCourt_Exterior_03.jpg.preview.png",
      "https://www.storylink.us/cdn-cgi/image/w=3840,q=90,f=webp/https://us-cdn.storylink.us/f48085b1-d794-47f9-9d19-8cff580ff3d0/London_PacificCourt_Lounge_Area.jpg_preview",
      "https://www.storylink.us/cdn-cgi/image/w=3840,q=90,f=webp/https://us-cdn.storylink.us/4440b660-353c-4674-bdba-af8c86b76c63/London_PacificCourt_Courtyard_2.jpg_preview",
      "https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/c34438f2-b059-4ddc-9dbd-126faec5cc2d/London_PacificCourt_SharedKitchen.jpg.preview.png",
      "https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/88e2ba85-72de-495a-b1c5-eec2d3a73623/London_PacificCourt_ClassicEnsuite_01.jpg.png",
      "https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/0ae05a56-d26a-410b-a71e-67b6303c68f7/London_PacificCourt_PR1Studio_01.jpg.png",
      "https://www.storylink.us/cdn-cgi/image/w=3840,q=90,f=webp/https://us-cdn.storylink.us/21884f3a-b0c7-47bc-b2f9-447204cab612/London_PacificCourt_Reception_2.jpg_preview",
    ],
    rooms: [
      {
        name: "Ensuite",
        image:
          "https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/88e2ba85-72de-495a-b1c5-eec2d3a73623/London_PacificCourt_ClassicEnsuite_01.jpg.png",
        price: {
          value: 352,
          currency: "GBP",
          period: "week",
          indicative: true,
          conditions: startingPriceConditions,
        },
      },
      {
        name: "Private Room",
        price: { currency: "GBP", period: "week", priceOnEnquiry: true },
      },
      {
        name: "Studio",
        image:
          "https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/0ae05a56-d26a-410b-a71e-67b6303c68f7/London_PacificCourt_PR1Studio_01.jpg.png",
        price: { currency: "GBP", period: "week", priceOnEnquiry: true },
      },
    ] satisfies AccommodationRoomType[],
  },
  "iq-chandos-house-manchester": {
    image:
      "https://www.iqstudentaccommodation.com/sites/default/files/styles/ratio_4x3_lg/public/2026-08/Externals%20w00.jpg?itok=K28dBtqP",
    gallery: [
      "https://www.iqstudentaccommodation.com/sites/default/files/styles/ratio_4x3_lg/public/2026-08/Externals%20w00.jpg?itok=K28dBtqP",
      "https://www.iqstudentaccommodation.com/sites/default/files/styles/ratio_4x3_lg/public/2026-08/Amenities%20w01.jpg?itok=WjcU-AFK",
      "https://www.iqstudentaccommodation.com/sites/default/files/styles/ratio_4x3_lg/public/2026-08/Amenities%20w02.jpg?itok=Di7UoF8V",
      "https://www.iqstudentaccommodation.com/sites/default/files/styles/ratio_4x3_lg/public/2026-08/Amenities%20w04.jpg?itok=a-7SYCKv",
      "https://www.iqstudentaccommodation.com/sites/default/files/styles/ratio_4x3_lg/public/2026-08/Amenities%20w03.jpg?itok=w_TGokFO",
    ],
  },
  "study-inn-brotherton-house": {
    gallery: [
      "https://studyinn.com/wp-content/uploads/2022/11/11-1.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2024/10/Brotherton-House-Building-3.jpg.webp",
      "https://media.studentcrowd.net/w1200/content/galleries/study-inn-leeds/n8a0780-social-space-close.jpg",
      "https://studyinn.com/wp-content/uploads/2022/11/Shared-kitchen-3.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2024/10/Sapphire-Plus-Apt-4.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2022/11/Leeds-3.jpg.webp",
    ],
    roomFeatures: [
      "En-suite bathroom",
      "Double bed",
      "Study desk",
      "Smart TV",
      "Kitchenette",
      "Wardrobe",
    ],
    inclusions: [
      "Utilities",
      "Superfast Wi-Fi",
      "Bed linen and towels",
      "Regular cleaning",
      "On-site facilities",
    ],
    goodFor: [
      "Students who want an all-inclusive setup",
      "Students who value private space",
    ],
  },
  "study-inn-reynard-house": {
    gallery: [
      "https://studyinn.com/wp-content/uploads/2022/11/10.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2022/11/Building-evening-1.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2022/11/N8A6228-Shared-Kitchen.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2022/11/N8A5966-Platinum-Apt.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2022/11/Leicester.jpg.webp",
    ],
    roomFeatures: [
      "En-suite bathroom",
      "Double bed",
      "Study area",
      "Smart TV",
      "Kitchenette",
      "Wardrobe",
    ],
    inclusions: [
      "All utility bills",
      "Regular room cleaning",
      "Towel and linen replacement",
      "Wi-Fi",
      "Gym and wellbeing facilities",
    ],
    depositNote:
      "No damage deposit listed for the current room offer; confirm before booking.",
  },
  "study-inn-talbot-street": {
    gallery: [
      "https://casita-img.s3.eu-west-2.amazonaws.com/uploads/buildings/1329/building/orig/talbot-street-nottingham-193294773320230301081612AM.jpeg",
      "https://casita-img.s3.eu-west-2.amazonaws.com/uploads/buildings/1329/building/orig/talbot-street-nottingham-157124791520230301081613AM.jpeg",
      "https://media.mystudenthalls.com/app/uploads/2019/11/Talbot-Street-Gold-En-suite1-812x562.png",
      "https://studyinn.com/wp-content/uploads/2022/11/Talbot-St-Outside-4-Final.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2022/11/Small-kitchen-E5I6913-Final.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2022/11/Gold-Apt-E5I7030-Final.jpg.webp",
    ],
    roomFeatures: [
      "En-suite bathroom",
      "Double bed",
      "Study desk",
      "Wardrobe",
      "Smart TV",
      "Kitchenette",
    ],
    inclusions: [
      "Bills",
      "Superfast Wi-Fi",
      "Regular cleaning",
      "Bed linen and towels",
      "Gym and wellbeing facilities",
    ],
  },
  "study-inn-triumph-house": {
    gallery: [
      "https://cdn.universityliving.com/cms/fpJzKZ0gP5SQluF3qFoaPZRsjtaMFO.jpg?w=640",
      "https://studyinn.com/wp-content/uploads/2023/07/Triumph-House-80-1.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2022/11/Triumph-House.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2022/11/Triumph-House-2.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2022/11/Shared-kitchen-1.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2022/11/Platinum-apt.jpg.webp",
    ],
    roomFeatures: [
      "En-suite bathroom",
      "Double bed",
      "Study area",
      "Large wardrobe",
      "Smart TV",
      "Fully fitted kitchen",
    ],
    inclusions: [
      "All-inclusive bills",
      "Wi-Fi",
      "Housekeeping",
      "Gym",
      "Wellness spa",
      "Study rooms",
      "24/7 security",
    ],
    goodFor: [
      "Students at the University of Nottingham",
      "Students who want privacy plus social spaces",
    ],
  },
  "study-inn-walnut-gardens": {
    gallery: [
      "https://cdn.beststudenthalls.com/media/room/platinum-plus-studio-18/883074",
      "https://cdn.beststudenthalls.com/media/listing/walnut-gardens-exeter/542977",
      "https://studyinn.com/wp-content/uploads/2023/07/Walnut-Gardens1-1.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2022/11/Exeter-2.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2022/11/N8A0469-APT-diamond-plus.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2022/11/N8A0625-shared-kitchen-1.jpg.webp",
    ],
    roomFeatures: [
      "En-suite bathroom",
      "Double bed",
      "Study area",
      "Smart TV",
      "Private fridge/freezer",
      "Kitchen appliances",
    ],
    inclusions: [
      "Utility bills",
      "Room and kitchen cleaning",
      "Bed linen and towels",
      "Wi-Fi",
      "Gym and yoga room",
      "Study rooms",
    ],
    goodFor: [
      "Students who want serviced living",
      "Students who want a quieter private space",
    ],
  },
  "study-inn-lemyngton-street": {
    gallery: [
      "https://media.uhzcdn.com/image/1387/01HVR0X4PYWYXPQGCHNPXYMD07_z.webp",
      "https://media.uhzcdn.com/image/1399/01J4Q5HTNMB257Z04E1KRB9AZR_z.webp",
      "https://studyinn.com/wp-content/uploads/2022/11/Loughborough-1.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2022/11/E5I1135-diamond-apartment-1.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2022/11/E5I3133-Final-shared-kitchen-2.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2022/11/E5I1123.jpg.webp",
    ],
    priceFrom: 199,
    roomFeatures: [
      "Private en-suite",
      "Double bed",
      "Study desk",
      "Wardrobe",
      "Smart TV",
      "Kitchenette",
    ],
    inclusions: [
      "All utility bills",
      "Superfast Wi-Fi",
      "Regular cleaning",
      "Bed linen and towels",
      "Gym",
      "Wellness spa",
      "Cinema",
      "Study rooms",
    ],
    goodFor: [
      "Students at Loughborough University",
      "Students who want strong wellness facilities",
      "Students who want all-inclusive living",
    ],
  },
  "study-inn-marlborough-house": {
    gallery: [
      "https://media.studentcrowd.net/w852-h568-q90-cfill/index-data/20190605115217-gallery250ab.jpg",
      "https://media.studentcrowd.net/w1200/content/galleries/study-inn-bristol---marlborough-house/app-images-2fresizable-2fimage-1--26829493-1616747611383.png",
      "https://studyinn.com/wp-content/uploads/2022/11/Bristol-Building-2.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2022/11/E5I1388-shared-kitchen-red-1.jpg.webp",
      "https://studyinn.com/wp-content/uploads/2022/11/E5I1273-gold-apartment.jpg.webp",
    ],
    roomFeatures: [
      "Private en-suite",
      "Double bed",
      "Study desk",
      "Smart TV",
      "Shared kitchen",
      "Private storage",
    ],
    inclusions: [
      "Bills",
      "Superfast Wi-Fi",
      "Gym",
      "Cinema room",
      "Study rooms",
      "Bike storage",
      "24/7 staff",
    ],
    goodFor: [
      "Students at the University of Bristol",
      "Students who want a social central location",
    ],
  },
  "study-inn-frederick-road": {
    image:
      "https://studyinn.com/wp-content/uploads/2025/11/Study-Inn_Frederick-Road.jpg.webp",
    gallery: [
      "https://studyinn.com/wp-content/uploads/2025/11/Study-Inn_Frederick-Road.jpg.webp",
    ],
    roomFeatures: [
      "En-suite bathroom",
      "Study desk",
      "Wardrobe",
      "Smart TV",
      "Kitchenette",
    ],
    inclusions: ["Bills", "Wi-Fi", "Housekeeping", "On-site support"],
  },
  "study-inn-james-street": {
    image:
      "https://studyinn.com/wp-content/uploads/2026/02/Study-Inn-York.jpg.webp",
    gallery: [
      "https://studyinn.com/wp-content/uploads/2026/02/Study-Inn-York.jpg.webp",
    ],
    roomFeatures: [
      "En-suite bathroom",
      "Study desk",
      "Wardrobe",
      "Smart TV",
      "Kitchenette",
    ],
    inclusions: ["Bills", "Wi-Fi", "Housekeeping", "On-site support"],
  },
  "neon-wood-berlin-frankfurter-tor": {
    gallery: [
      "https://assets.neonwood.com/uploads/berlin-frankfurter-tor.webp",
      "https://assets.neonwood.com/uploads/Amenitie_GYM2.webp",
      "https://assets.neonwood.com/uploads/Amenitie_Gaming_Area2.webp",
      "https://assets.neonwood.com/uploads/NeonWood_GFT_Classic_A129_03_Deko.webp",
      "https://assets.neonwood.com/uploads/Neonwood_Fft_Classic_Room.webp",
      "https://assets.neonwood.com/uploads/Neonwood_Fft_Classic_Kitchen.jpg",
    ],
    currency: "EUR",
    pricePeriod: "month",
    roomFeatures: [
      "Private kitchenette",
      "Private bathroom",
      "Furnished room",
      "Desk",
      "Wardrobe",
      "Balcony options",
    ],
    inclusions: [
      "Internet",
      "Utilities",
      "Common-area access",
      "On-site management",
    ],
  },
  "neon-wood-berlin-mitte-wedding": {
    gallery: [
      "https://assets.neonwood.com/uploads/Berlin-Mitte_wedding.webp",
      "https://neonwood.com/media/locations/berlin-mitte-wedding/hero-background-fbea4d.png",
      "https://assets.neonwood.com/uploads/Neonwood_Mw_Classic_Balcony_Room1.webp",
      "https://assets.neonwood.com/uploads/Neonwood_Mw_Classic_Balcony_Room2.webp",
      "https://assets.neonwood.com/uploads/Neonwood_Mw_Classic_Balcony_Room3.webp",
    ],
    roomFeatures: [
      "Furnished apartment",
      "Private bathroom",
      "Kitchenette",
      "Study space",
    ],
  },
  "neon-wood-tannhaus-berlin-neuk-lln": {
    gallery: [
      "https://tannhaus.com/app/uploads/2023/08/Image00006-2-1440x0-c-default.jpg",
      "https://tannhaus.com/app/uploads/2017/10/20180731_1125_tannhaus_byDavidUlrich-1440x0-c-default.jpg",
      "https://tannhaus.com/app/uploads/2023/02/Tannhaus-Rixdorf-Aussenbereich-01-1440x0-c-default.jpg",
      "https://tannhaus.com/app/uploads/2023/08/Tannhaus-Rixdorf-A504-01-1440x600-c-default.jpg",
      "https://tannhaus.com/app/uploads/2023/08/Tannhaus-Rixdorf-B403-01-1440x600-c-default.jpg",
    ],
    currency: "EUR",
    pricePeriod: "month",
    roomFeatures: [
      "40 m² studio example",
      "Full kitchen",
      "Oven",
      "Dishwasher",
      "Private balcony",
      "Living area",
    ],
  },
  "neon-wood-berlin-adlershof": {
    gallery: [
      "https://assets.neonwood.com/uploads/berlin-adlershof.webp",
      "https://assets.neonwood.com/uploads/CAB_Classic_Patio_Balcony_Horizontal1.webp",
      "https://assets.neonwood.com/uploads/CAB_Classic_Patio_Balcony_Horizontal2.webp",
      "https://assets.neonwood.com/uploads/CAB_Classic_Patio_Balcony_Horizontal3.webp",
      "https://assets.neonwood.com/uploads/neonwood_cable_superiorbalcony_A316_2.webp",
    ],
  },
  "neon-wood-frankfurt-riedberg": {
    gallery: [
      "https://image.uhzcdn.com/house/c4/37056380d03d80f788e33c5aea6c94dac0e496.webp?x-oss-process=image%2Fresize%2Cm_fill%2Cw_640%2Ch_400%2Climit_0%2Finterlace%2C1%2Fquality%2Cq_90%2Fformat%2Cwebp",
      "https://assets.neonwood.com/uploads/frankfurt-riedberg-1200x630.webp",
      "https://assets.neonwood.com/uploads/RIE_Deluxe_Patio_2.webp",
      "https://assets.neonwood.com/uploads/RIE_Double_3.webp",
      "https://assets.neonwood.com/uploads/wp-28f667358f3e-20180730_4639_neonwood_byDavidUlrich.jpg",
    ],
  },
  "vita-student-new-gough-street": {
    gallery: [
      "https://cdn.beststudenthalls.com/media/listing/gough-street/3_25tXhyS.webp",
      "https://www.vitastudent.com/wp-content/uploads/2026/09/19-VS_Birmingham-Gough-Street-External_RT-01-2400x1971-8bfba73.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2026/09/1-VS_Birmingham-Gough-Street-Hub-Spaces_RT-05-2401x1600-5397542.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2025/07/CLASSICF-706-VITA-GOUGH-STREET-AUG-20260096.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2025/07/DELUXE-740-VITA-GOUGH-STREET-AUG-20260017.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2025/07/PREMIUM-709-VITA-GOUGH-STREET-AUG-20260153.jpg",
    ],
    distance:
      "10 min by train to the University of Birmingham; 1 min walk to Birmingham city centre",
    roomFeatures: [
      "En-suite bathroom",
      "Double bed",
      "Smart TV",
      "Desk",
      "Wardrobe",
      "Kitchen with microwave, hob and fridge-freezer",
    ],
    inclusions: [
      "Wi-Fi",
      "Gym and fitness studio",
      "Breakfast",
      "Housekeeping",
      "Study rooms",
      "Events",
      "Parcel collection",
    ],
    goodFor: [
      "Students who want central Birmingham",
      "Students at the University of Birmingham",
      "Students who value all-inclusive services",
    ],
  },
  "vita-student-pebble-mill": {
    gallery: [
      "https://pebblemillbirmingham.co.uk/wp-content/uploads/2020/06/Vita-Birmingham-08-1-640x640.jpg",
      "https://uniacco.imgix.net/inventory/classic_plus.jpg?auto=format&fit=max&w=828",
      "https://www.vitastudent.com/wp-content/uploads/2022/11/Birmingham-Building-Thumbnail-684x1200-f5d90c5.jpeg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/CLASSIC-405-VITA-BIRMINGHAM-JULY-20223124_RT.jpeg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/PREMIUM-Room-420-VITA-BIRMINGHAM-JULY-20220207_RT.jpeg",
    ],
    distance: "25 min walk to the University of Birmingham",
    roomFeatures: [
      "Double bed",
      "En-suite bathroom",
      "Kitchen",
      "Smart TV",
      "Desk",
      "Wardrobe",
    ],
    inclusions: [
      "Bills",
      "Gym and fitness studio",
      "Cinema room",
      "Study rooms",
      "Housekeeping",
      "Breakfast",
      "Wi-Fi",
    ],
    goodFor: [
      "Students at the University of Birmingham",
      "Students who want strong shared facilities",
    ],
  },
  "vita-student-zed-alley": {
    gallery: [
      "https://images.casita.com/uploads/buildings/502/room/2498/orig/zed-alley--3572905520260223110104AM.webp",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/VS_Bristol_Hub-Space_006-RT_WEB.jpeg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/VS_Bristol_Hub-Space_008-RT_WEB.jpeg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Bristol-Zed-Alley-Ultimate-1.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Bristol-Zed-Alley-Ultimate-2.jpg",
    ],
    distance: "Less than 10 min walk to the University of Bristol",
    roomFeatures: [
      "En-suite bathroom",
      "Kitchen with microwave, hob and fridge-freezer",
      "Three-quarter bed",
      "Smart TV",
      "Desk",
      "Wardrobe",
    ],
    inclusions: [
      "Breakfast",
      "Superfast Wi-Fi",
      "Gym",
      "Study rooms",
      "Housekeeping",
      "Laundry",
      "Events",
      "24/7 support",
    ],
    goodFor: [
      "Students at the University of Bristol",
      "Students who want central Bristol",
    ],
  },
  "vita-student-park-place": {
    gallery: [
      "https://cdn.beststudenthalls.com/media/room/deluxe-studio-150/181312",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Cardiff-Building-Thumbnail-685x1201-f7a4041.jpeg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Cardiff-Classic-1.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Cardiff-Classic-2.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Cardiff-Classic-3.jpg",
    ],
  },
  "iglu-broadway": {
    image:
      "https://iglu.com.au/wp-content/uploads/2017/06/broadway-tile-397x297-1.png",
    gallery: [
      "https://iglu.com.au/wp-content/uploads/2017/06/broadway-tile-397x297-1.png",
      "https://iglu.com.au/wp-content/uploads/2017/06/iglu-broadway-exterior-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/iglu-broadway-exterior-2.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/iglu-broadway-communal-kitchen.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/iglu-broadway-study-spaces.jpg",
    ],
    roomFeatures: [
      "Furnished student room",
      "Study desk",
      "Shared kitchen options",
      "Secure access",
    ],
    inclusions: [
      "Unlimited Wi-Fi",
      "Utilities",
      "Gym access",
      "Study areas",
      "On-site support",
    ],
    goodFor: [
      "University of Sydney students",
      "UTS students",
      "Students who want inner-city Sydney",
    ],
  },
  "iglu-central": {
    gallery: [
      "https://images.casita.com/uploads/buildings/330929/room/9321913/orig/iglu-central--160466310020260428123130PM.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/Iglu-Central-Teaser-397x297-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/sce-hero-1-2022.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/sce-hero-2-2022.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/10/Iglu-Central-380x460-6-bed-share-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/11/Iglu-Central-380x460-standard-studio.jpg",
    ],
    roomFeatures: [
      "Single bed",
      "Study desk",
      "Storage",
      "Bright private room",
    ],
  },
  "iglu-mascot": {
    gallery: [
      "https://iglu.com.au/wp-content/uploads/2023/04/IgluMascot-Exterior-1400x739-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2022/12/IgluMascot-Feature-397x297-2.jpg",
      "https://iglu.com.au/wp-content/uploads/2022/12/iglu-mascot-hero-1-1400x739-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2022/12/iglu-mascot-hero-2-1400x739-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2023/01/Iglu-Mascot-380x460-6-Share-Ensuite.jpg",
      "https://iglu.com.au/wp-content/uploads/2023/02/Iglu-Mascot-380x460-Standard-Studio.jpg",
    ],
  },
  // --- Neon Wood (neonwood.com) ---
  "neon-wood-cologne-k115": {
    image: "https://assets.neonwood.com/uploads/cologne-k115.webp",
    gallery: [
      "https://assets.neonwood.com/uploads/cologne-k115.webp",
      "https://assets.neonwood.com/uploads/Neonwood_Köln_Comfort_1.webp",
      "https://assets.neonwood.com/uploads/Neonwood_Köln_Comfort_2.webp",
      "https://assets.neonwood.com/uploads/Neonwood_Köln_Comfort_3.webp",
    ],
  },
  "neon-wood-t-3": {
    image: "https://assets.neonwood.com/uploads/tubingen-tu3.webp",
    gallery: [
      "https://assets.neonwood.com/uploads/tubingen-tu3.webp",
      "https://assets.neonwood.com/uploads/TU3_Neonwood_outside.webp",
      "https://assets.neonwood.com/uploads/TU3_Neonwood_ComunnitySpaces_1.webp",
      "https://assets.neonwood.com/uploads/TU3_Neonwood_ComunnitySpaces_2.webp",
      "https://assets.neonwood.com/uploads/wp-104929bf83c6-TU3-Tubingen-Apt-21_05-1.webp",
    ],
  },

  // --- Vita Student (vitastudent.com) ---
  "vita-student-bruce-street": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Belfast-Thumbnail-686x1200-f72cd2b.jpg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Belfast-Thumbnail-686x1200-f72cd2b.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/ACCESSIBLE-DELUXE-917-VITA-BELFAST-AUG-20235559_RT-1574x1050-60d12cb.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/ACCESSIBLE-DELUXE-917-VITA-BELFAST-AUG-20235567_RT-1574x1050-60d12cb.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/ACCESSIBLE-DELUXE-917-VITA-BELFAST-AUG-20235572_RT-1574x1050-60d12cb-1.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/ACCESSIBLE-DELUXE-917-VITA-BELFAST-AUG-20235573_RT-1574x1050-60d12cb.jpg",
    ],
  },
  "vita-student-copper-towers": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Thumbnail-Coventry-Building-Tour-Ad-679x1201-c86130c.jpg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Thumbnail-Coventry-Building-Tour-Ad-679x1201-c86130c.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/CLASSIC-A13.11-VITA-Coventry-JUNE-20234841.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/CLASSIC-A13.11-VITA-Coventry-JUNE-20234846.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/CLASSIC-A13.11-VITA-Coventry-JUNE-20234852.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/CLASSIC-A13.11-VITA-Coventry-JUNE-20234863.jpg",
    ],
  },
  "vita-student-warwick-cannon-park": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2023/03/CLASSIC%20C207%20VITA%20WARWICK%20-%20AUG%2020220990_RT.jpg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2023/03/CLASSIC%20C207%20VITA%20WARWICK%20-%20AUG%2020220990_RT.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/CLASSIC%20C207%20VITA%20WARWICK%20-%20AUG%2020220998_RT.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/CLASSIC%20C207%20VITA%20WARWICK%20-%20AUG%2020221012_RT%20copy.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/CLASSIC%20C207%20VITA%20WARWICK%20-%20AUG%2020221019_RT.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/CLASSIC%20C207%20VITA%20WARWICK%20-%20AUG%2020221021_RT.jpg",
    ],
  },
  "vita-student-fountainbridge": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2022/12/VS_Edinburgh_Hub-Space_008-RT_WEB-1.jpg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2022/12/VS_Edinburgh_Hub-Space_008-RT_WEB-1.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VS_Edinburgh_Hub%20Space_003%20RT_WEB.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VS_Edinburgh_Hub%20Space_010%20RT_WEB.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VS_Edinburgh_Hub%20Space_032%20RT_WEB.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VS_Edinburgh_Hub%20Space_040%20RT_WEB.jpg",
    ],
  },
  "vita-student-iona-street": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2022/12/ACCESSIBLE-IS-D-336FF-IONA-STREET-EDINBURGH-VITA-DEC-20230251.jpg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2022/12/ACCESSIBLE-IS-D-336FF-IONA-STREET-EDINBURGH-VITA-DEC-20230251.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/ACCESSIBLE-IS-D-336FF-IONA-STREET-EDINBURGH-VITA-DEC-20230258.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/ACCESSIBLE-IS-D-336FF-IONA-STREET-EDINBURGH-VITA-DEC-20230265.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/ACCESSIBLE-IS-D-336FF-IONA-STREET-EDINBURGH-VITA-DEC-20230266.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/ACCESSIBLE-IS-D-336FF-IONA-STREET-EDINBURGH-VITA-DEC-20230272.jpg",
    ],
  },
  "vita-student-new-waverley": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2025/07/1-VS_Edinburgh-New-Waverley-Hub-Spaces_RT-15-2400x1600-5397542.jpg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2025/07/1-VS_Edinburgh-New-Waverley-Hub-Spaces_RT-15-2400x1600-5397542.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2025/07/10-VS_Edinburgh-New-Waverley-Hub-Spaces_RT-05-2401x1601-ac2f3a6.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2025/07/11-VS_Edinburgh-New-Waverley-Hub-Spaces_RT-01-2400x1600-5397542.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2025/07/12-VS_Edinburgh-New-Waverley-Hub-Spaces_RT-02-2401x1601-ac2f3a6.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2025/07/13-VS_Edinburgh-New-Waverley-Hub-Spaces_RT-19-2400x1600-5397542.jpg",
    ],
  },
  "vita-student-portland-house": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Exeter-building-tour-thumbnail.png",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Exeter-building-tour-thumbnail.png",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/VS-Exeter-Gym-July2025-RT-01-1200x800-5b2df79.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/CLASSIC-321-VITA-EXETER-JULY-20251022_RT-1200x800-5b2df79.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/CLASSIC-321-VITA-EXETER-JULY-20251027-1200x800-5b2df79.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/CLASSIC-321-VITA-EXETER-JULY-20251032_RT-1200x800-5b2df79.jpg",
    ],
  },
  "vita-student-new-india-street": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2026/07/BF_VS_INDIA-ST_STUDIO-TYPE-5_CGI-01-2400x1200-ffeadc1.jpg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2026/07/BF_VS_INDIA-ST_STUDIO-TYPE-5_CGI-01-2400x1200-ffeadc1.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2026/07/BF_VS_INDIA-ST_STUDIO-TYPE-5_CGI-02-2400x1350-47d74d5.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2026/07/BF_VS_INDIA-ST_STUDIO-TYPE-6_CGI-01-2400x1200-ffeadc1.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2026/07/BF_VS_INDIA-ST_STUDIO-TYPE-6_CGI-02-2400x1350-47d74d5.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2026/07/VS_Glasgow_India_Street_Shared_Space_1-2400x1200-ffeadc1.jpg",
    ],
  },
  "vita-student-west-end": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Thumbnail-Glasgow-Building-Tour-Ad-678x1201-3c335ac.jpg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Thumbnail-Glasgow-Building-Tour-Ad-678x1201-3c335ac.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/VS_Glasgow_Hub_Spaces_006_RT-2361x1574-166850d.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VG_Glasgow_Deluxe%20109%20RT_WEB.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VG_Glasgow_Deluxe%2096%20RT.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VG_Glasgow_Deluxe%2097%20RT.jpg",
    ],
  },
  "vita-student-portland-crescent": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Portland-Crescent-Building-Thumbnail-683x1200-5aa2b5a.jpeg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Portland-Crescent-Building-Thumbnail-683x1200-5aa2b5a.jpeg",
      "https://www.vitastudent.com/wp-content/uploads/2022/09/Leeds-2-Gym-01-scaled.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/09/Leeds-2-Hub-02-scaled.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/09/Leeds-2-Hub-04-scaled.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/09/Leeds-2-Hub-Coffee-scaled.jpg",
    ],
  },
  "vita-student-st-albans": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2022/12/St-Albans-Thumbnail-689x1201-3d50481.jpg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2022/12/St-Albans-Thumbnail-689x1201-3d50481.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/PREMIUM_311_VITA_LEEDS_PC_-_JULY_20220663.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VITA_Leeds_Aug2019%20Classic%2092.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VITA_Leeds_Aug2019%20Premium%20106.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2025/03/PREMIUM_ROOM_1201_VITA_LEEDS_PC_-_JULY_20220432-1200x800-5b2df79.jpg",
    ],
  },
  "vita-student-crosshall-st-": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Liverpool-thumbnail-680x1201-cd7527a.jpeg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Liverpool-thumbnail-680x1201-cd7527a.jpeg",
      "https://www.vitastudent.com/wp-content/uploads/2025/03/Reasons-to-live-at-VS-Liverpool-Thumbnail.png",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Vita_Student_Liverpool_-_Communal_Hub__3-1-scaled.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/ACCESSIBLE_CROSSHALL_ROOM_C301_VITA_Liverpool_-_AUG_20221715.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/ACCESSIBLE_CROSSHALL_ROOM_C301_VITA_Liverpool_-_AUG_20221716.jpg",
    ],
  },
  "vita-student-lewisham-exchange": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2022/12/London-Building-Thumbnail-694x1201-5071dfc.jpeg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2022/12/London-Building-Thumbnail-694x1201-5071dfc.jpeg",
      "https://www.vitastudent.com/wp-content/uploads/2023/02/Lewisham_Gym07.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/CLUSTER-ROOM-317-VITA-LEWISHAM-AUG-20221441-1200x800-5b2df79.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Lewisham_-_Classic_Studio_1-1201x801-d21b45d.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Lewisham_-_Classic_Studio_15-1201x801-d21b45d.jpg",
    ],
  },
  "vita-student-circle-square": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Manchester-Cinema-2186x1229-166850d.jpg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Manchester-Cinema-2186x1229-166850d.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/VG_Manc_CircleSquare_B11_Deluxe_118_RT_WEB.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/Accessible-1504-VITA---Manchester-B10---JULY-20222692_RT.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/Accessible-1504-VITA---Manchester-B10---JULY-20222832_RT.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/Accessible-1504-VITA---Manchester-B10---JULY-20222840_RT.jpg",
    ],
  },
  "vita-student-first-street": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VG_Manc_FirstStreet_Classic%2022%20RT_WEB.jpg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VG_Manc_FirstStreet_Classic%2022%20RT_WEB.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VG_Manc_FirstStreet_Classic%2025%20RT_WEB.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VG_Manc_FirstStreet_Classic%2044%20RT_WEB.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VG_Manc_FirstStreet_Disabled%20Room%20119%20RT_WEB.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VG_Manc_FirstStreet_Disabled%20Room%20124%20RT_WEB.jpg",
    ],
  },
  "vita-student-new-leazes-park": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2026/09/VS_Newcastle-Leazes-Park-External_RT-03-2401x1601-ac2f3a6.jpg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2026/09/VS_Newcastle-Leazes-Park-External_RT-03-2401x1601-ac2f3a6.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2026/09/1-VS_Newcastle-Leazes-Park-Hub-Spaces_RT-09-2401x1601-ac2f3a6.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2026/09/10-VS_Newcastle-Leazes-Park-Hub-Spaces_RT-00-2400x1600-5397542.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2026/09/11-VS_Newcastle-Leazes-Park-Hub-Spaces_RT-10-2401x1601-ac2f3a6.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2026/09/12-VS_Newcastle-Leazes-Park-Hub-Spaces_RT-16-2400x1600-5397542.jpg",
    ],
  },
  "vita-student-strawberry-place": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Strawberry-Place-Building-Thumbnail-687x1201-2496866.jpeg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Strawberry-Place-Building-Thumbnail-687x1201-2496866.jpeg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/ACCESSIBLE%20ROOM%20603CCC%20STRAWBS%20VITA%20NEWCASTLE%20-%20AUG%2020222609.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/ACCESSIBLE%20ROOM%20603CCC%20STRAWBS%20VITA%20NEWCASTLE%20-%20AUG%2020222622.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/ACCESSIBLE%20ROOM%20603CCC%20STRAWBS%20VITA%20NEWCASTLE%20-%20AUG%2020222625.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/ACCESSIBLE%20ROOM%20603CCC%20STRAWBS%20VITA%20NEWCASTLE%20-%20AUG%2020222629.jpg",
    ],
  },
  "vita-student-westgate": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Westgate-Building-Thumbnail-685x1201-f7a4041.jpeg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Westgate-Building-Thumbnail-685x1201-f7a4041.jpeg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Westgate-Ultimate-1.webp",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Westgate-Ultimate-2.webp",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Westgate-Ultimate-4.webp",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Westgate-Ultimate-5.webp",
    ],
  },
  "vita-student-station-street": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Vita-Student-Station-Street-Thumbnail.jpg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Vita-Student-Station-Street-Thumbnail.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2026/02/jay-gomez-Y1ni57HUblc-unsplash.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/Nottingham_Room_01_-_Classic_-_2000_x_1360_RT.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/VS_Nottingham_March2025_RT-13-1200x800-5b2df79-1.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/01/9C8C7D59-47FF-4276-A504-5169DA108207.jpg",
    ],
  },
  "vita-student-telephone-house": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Thumbnail-Sheffield-Building-Tour-Ad-680x1200-1922b9f.jpg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Thumbnail-Sheffield-Building-Tour-Ad-680x1200-1922b9f.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Sheffield_Hub_01.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VS_Sheffield_Hub%20Space_001%20RT_WEB.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VS_Sheffield_Hub%20Space_009%20RT_WEB.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VS_Sheffield_Hub%20Space_014%20RT_WEB.jpg",
    ],
  },
  "vita-student-richmond-house": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VG_Southampton%20RH_Classic%20Plus%20212%20RT.jpg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VG_Southampton%20RH_Classic%20Plus%20212%20RT.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VG_Southampton%20RH_Classic%20Plus%20214%20RT.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VG_Southampton%20RH_Deluxe%20218%20RT.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VG_Southampton%20RH_Deluxe%20220%20RT.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2023/03/VG_Southampton%20RH_Disabled%20Room%20124%20RT.jpg",
    ],
  },
  "vita-student-lawrence-street": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2022/12/York-Building-Thumbnail-685x1201-f7a4041.jpeg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2022/12/York-Building-Thumbnail-685x1201-f7a4041.jpeg",
      "https://www.vitastudent.com/wp-content/uploads/2025/03/Reasons-to-live-at-VS-York-Thumbnail-678x1200-c896efe.jpeg",
      "https://www.vitastudent.com/wp-content/uploads/2026/06/EXTERNAL_YORK_VITA_JULY2024-39.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/York_Hub-Space_02.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Accessible-Vita-Student-York-6.jpg",
    ],
  },
  "vita-student-pedralbes": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Barcelona-Building-Thumbnail-686x1201-4cf8d5d.jpeg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2022/12/Barcelona-Building-Thumbnail-686x1201-4cf8d5d.jpeg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/BCN-Pedralbes-Hub-11_RT.jpeg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/BCN-Pedralbes-Hub-18_RT.jpeg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/BCN-Pedralbes-Hub-27_RT-1574x1051-60d12cb.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/BCN-Pedralbes-Hub-31_RT.jpeg",
    ],
  },
  "vita-student-poblenou": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2022/12/BCN_Poblenou_External-RT-02-1200x798-36b7a2e.jpg",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2022/12/BCN_Poblenou_External-RT-02-1200x798-36b7a2e.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/BCN_Poblenou_External-RT-04-1200x798-36b7a2e.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/La-Selectivitat-Barcelona-Influencers-thumbnail-678x1200-3c335ac.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/BCN_Poblenou_Games-Area-RT-01-1200x798-36b7a2e.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2022/12/BCN-Poblenou-Room-1201-1-RT.jpg",
    ],
  },
  "vita-student-new-oria": {
    image:
      "https://www.vitastudent.com/wp-content/uploads/2025/10/Time-to-upgrade-your-student-accommodation-Vita-Student-thumbnail.png",
    gallery: [
      "https://www.vitastudent.com/wp-content/uploads/2025/10/Time-to-upgrade-your-student-accommodation-Vita-Student-thumbnail.png",
      "https://www.vitastudent.com/wp-content/uploads/2026/09/0-VS_Madrid-Oria-Hub-Spaces_RT-07-2401x1601-ac2f3a6.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2026/09/1-VS_Madrid-Oria-Hub-Spaces_RT-18-2401x1600-5397542.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2026/09/10-VS_Madrid-Oria-Hub-Spaces_RT-11-2401x1600-5397542.jpg",
      "https://www.vitastudent.com/wp-content/uploads/2026/09/11-VS_Madrid-Oria-Hub-Spaces_RT-10-2401x1601-ac2f3a6.jpg",
    ],
  },

  // --- Iglu (iglu.com.au) ---
  "iglu-central-park": {
    image:
      "https://iglu.com.au/wp-content/uploads/2017/06/Iglu-Central-Park-tile-397x297-1.jpg",
    gallery: [
      "https://iglu.com.au/wp-content/uploads/2017/06/Iglu-Central-Park-tile-397x297-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/iglu-central-park-flexi-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/iglu-central-park-flexi-2.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/iglu-central-park-front-desk.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/iglu-central-park-media-room.jpg",
    ],
  },
  "iglu-chatswood": {
    image:
      "https://iglu.com.au/wp-content/uploads/2017/06/Chatswood-communal-1400x739-5.jpg",
    gallery: [
      "https://iglu.com.au/wp-content/uploads/2017/06/Chatswood-communal-1400x739-5.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/Chatswood-courtyard-edit.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/Chatswood-lobby-1400x739-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/Chatswood-lobby-1400x739-2.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/Chatswood-study-1400x739-3.jpg",
    ],
  },
  "iglu-redfern": {
    image:
      "https://iglu.com.au/wp-content/uploads/2017/06/Iglu-Redfern-Web-1.jpg",
    gallery: [
      "https://iglu.com.au/wp-content/uploads/2017/06/Iglu-Redfern-Web-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/Iglu-Redfern-Web-2.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/Iglu-Redfern-Web-4.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/Iglu-Redfern-Web-6.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/Iglu-Redfern-study-2.jpg",
    ],
  },
  "iglu-mascot-duo": {
    image:
      "https://iglu.com.au/wp-content/uploads/2026/06/Iglu-Mascot-Duo-Hero-1400x739-1.jpg",
    gallery: [
      "https://iglu.com.au/wp-content/uploads/2026/06/Iglu-Mascot-Duo-Hero-1400x739-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2026/06/Iglu-Mascot-Duo-Hero-1400x739-2.jpg",
      "https://iglu.com.au/wp-content/uploads/2026/06/Iglu-Mascot-Duo-Hero-1400x739-3.jpg",
      "https://iglu.com.au/wp-content/uploads/2026/06/Iglu-Mascot-Duo-Hero-1400x739-4.jpg",
      "https://iglu.com.au/wp-content/uploads/2026/06/Iglu-Mascot-Duo-Hero-1400x739-5.jpg",
    ],
  },
  "iglu-summer-hill": {
    image:
      "https://iglu.com.au/wp-content/uploads/2022/02/Iglu-Summer-Hill-Exterior-1400x739-1.jpg",
    gallery: [
      "https://iglu.com.au/wp-content/uploads/2022/02/Iglu-Summer-Hill-Exterior-1400x739-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2022/02/Iglu-Summer-Hill-Exterior-1400x739-2.jpg",
      "https://iglu.com.au/wp-content/uploads/2022/02/Iglu-Summer-Hill-Exterior-1400x739-3.jpg",
      "https://iglu.com.au/wp-content/uploads/2022/02/Iglu-Summer-Hill-Exterior-1400x739-4.jpg",
      "https://iglu.com.au/wp-content/uploads/2022/02/Iglu-Summer-Hill-Exterior-2.jpg",
    ],
  },
  "iglu-waterloo": {
    image:
      "https://iglu.com.au/wp-content/uploads/2025/08/Iglu-Waterloo-Feature-397x297-1.jpg",
    gallery: [
      "https://iglu.com.au/wp-content/uploads/2025/08/Iglu-Waterloo-Feature-397x297-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2025/08/Iglu-Waterloo-Front-Desk-1400x739-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2025/08/Iglu-Waterloo-Front-Desk-1400x739-2.jpg",
      "https://iglu.com.au/wp-content/uploads/2025/08/Iglu-Waterloo-Gym-1400x739-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2025/08/Iglu-Waterloo-Media-Room-1400x739-1.jpg",
    ],
  },
  "iglu-brisbane-city": {
    image:
      "https://iglu.com.au/wp-content/uploads/2017/06/Iglu-Brisbane-City-Feature-Image-397x297-1.jpg",
    gallery: [
      "https://iglu.com.au/wp-content/uploads/2017/06/Iglu-Brisbane-City-Feature-Image-397x297-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/11/Iglu-Brisbane-City-380x460-Premium-Studio-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/11/Iglu-Brisbane-City-380x460-Standard-Studio-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/11/Iglu-Brisbane-City-380x460-share-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/11/Iglu-Brisbane-City-380x460-share-2.jpg",
    ],
  },
  "iglu-kelvin-grove": {
    image:
      "https://iglu.com.au/wp-content/uploads/2017/06/Iglu-Kelvin-Grove-1.jpg",
    gallery: [
      "https://iglu.com.au/wp-content/uploads/2017/06/Iglu-Kelvin-Grove-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/Iglu-Kelvin-Grove-2.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/Iglu-Kelvin-Grove-3.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/Iglu-Kelvin-Grove-397x297-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/Iglu-Kelvin-Grove-4a.jpg",
    ],
  },
  "iglu-melbourne-city": {
    image:
      "https://iglu.com.au/wp-content/uploads/2017/06/Iglu-Melbourne-City-Teaser-397x297-1.jpg",
    gallery: [
      "https://iglu.com.au/wp-content/uploads/2017/06/Iglu-Melbourne-City-Teaser-397x297-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/IgluMelbourneCity-Communal-1400x739-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/IgluMelbourneCity-Gym-1400x739-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/IgluMelbourneCity-Library-1400x739-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2017/06/IgluMelbourneCity-Library2-1400x739-1.jpg",
    ],
  },
  "iglu-south-yarra": {
    image:
      "https://iglu.com.au/wp-content/uploads/2019/07/Iglu-South-Yarra-Teaser-397x297-1.jpg",
    gallery: [
      "https://iglu.com.au/wp-content/uploads/2019/07/Iglu-South-Yarra-Teaser-397x297-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2019/09/Iglu-South-Yarra-380x460-5-Share-Standard.jpg",
      "https://iglu.com.au/wp-content/uploads/2019/09/Iglu-South-Yarra-380x460-6-Share-Standard.jpg",
      "https://iglu.com.au/wp-content/uploads/2019/09/Iglu-South-Yarra-380x460-Single-Studio.jpg",
      "https://iglu.com.au/wp-content/uploads/2019/09/Iglu-South-Yarra-380x460-Standard-Studio.jpg",
    ],
  },
  "iglu-flagstaff-gardens": {
    image:
      "https://iglu.com.au/wp-content/uploads/2022/08/Flagstaff-King-St-1.jpg",
    gallery: [
      "https://iglu.com.au/wp-content/uploads/2022/08/Flagstaff-King-St-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2022/08/Flagstaff-King-St-2.jpg",
      "https://iglu.com.au/wp-content/uploads/2022/08/Flagstaff-communal.jpg",
      "https://iglu.com.au/wp-content/uploads/2022/08/Flagstaff-games.jpg",
      "https://iglu.com.au/wp-content/uploads/2022/08/Flagstaff-gym.jpg",
    ],
  },
  "iglu-melbourne-central": {
    image:
      "https://iglu.com.au/wp-content/uploads/2023/05/Iglu-Melbourne-Central-Teaser-397x297-1.jpg",
    gallery: [
      "https://iglu.com.au/wp-content/uploads/2023/05/Iglu-Melbourne-Central-Teaser-397x297-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2023/05/iglu-melbourne-central-hero-1-1400x739-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2023/05/iglu-melbourne-central-hero-2-1400x739-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2023/05/iglu-melbourne-central-hero-3-1400x739-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2023/05/iglu-melbourne-central-hero-4-1400x739-1.jpg",
    ],
  },
  "iglu-flagstaff-station": {
    image:
      "https://iglu.com.au/wp-content/uploads/2026/03/Flagstaff-Station-397x297-1.jpg",
    gallery: [
      "https://iglu.com.au/wp-content/uploads/2026/03/Flagstaff-Station-397x297-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2026/03/Iglu-Flagstaff-Station-2-share-380x460-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2026/03/Iglu-Flagstaff-Station-Premium-Corner-380x460-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2026/03/Iglu-Flagstaff-Station-Premium-Studio-380x460-1.jpg",
      "https://iglu.com.au/wp-content/uploads/2026/03/Iglu-Flagstaff-Station-Standard-Studio-380x460-1.jpg",
    ],
  },
};
