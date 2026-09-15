import type { CatalogProperty } from './partner-inventory'

type PropertyOverride = Partial<CatalogProperty>

export const propertyOverrides: Record<string, PropertyOverride> = {
  'study-inn-brotherton-house': {
    gallery: [
      'https://ecnf5ig9whg.exactdn.com/wp-content/uploads/2022/11/Platinum-APT-1-1-1024x752.jpg?lossy=0&sharp=1&ssl=1&strip=all',
      'https://media.studentcrowd.net/w1200/content/galleries/study-inn-leeds/n8a0780-social-space-close.jpg',
    ],
    roomFeatures: ['En-suite bathroom', 'Double bed', 'Study desk', 'Smart TV', 'Kitchenette', 'Wardrobe'],
    inclusions: ['Utilities', 'Superfast Wi-Fi', 'Bed linen and towels', 'Regular cleaning', 'On-site facilities'],
    goodFor: ['Students who want an all-inclusive setup', 'Students who value private space'],
  },
  'study-inn-reynard-house': {
    gallery: [
      'https://ecnf5ig9whg.exactdn.com/wp-content/uploads/2024/09/Building-evening-1-1024x902-1.jpg?sharp=1&strip=all',
      'https://assets.amberstudent.com/inventories/200441/f3795852.jpg?auto=format&fit=crop&h=480&q=80&trim=auto&w=720',
    ],
    roomFeatures: ['En-suite bathroom', 'Double bed', 'Study area', 'Smart TV', 'Kitchenette', 'Wardrobe'],
    inclusions: ['All utility bills', 'Regular room cleaning', 'Towel and linen replacement', 'Wi-Fi', 'Gym and wellbeing facilities'],
    depositNote: 'No damage deposit listed for the current room offer; confirm before booking.',
  },
  'study-inn-talbot-street': {
    gallery: [
      'https://casita-img.s3.eu-west-2.amazonaws.com/uploads/buildings/1329/building/orig/talbot-street-nottingham-193294773320230301081612AM.jpeg',
      'https://casita-img.s3.eu-west-2.amazonaws.com/uploads/buildings/1329/building/orig/talbot-street-nottingham-157124791520230301081613AM.jpeg',
      'https://media.mystudenthalls.com/app/uploads/2019/11/Talbot-Street-Gold-En-suite1-812x562.png',
    ],
    roomFeatures: ['En-suite bathroom', 'Double bed', 'Study desk', 'Wardrobe', 'Smart TV', 'Kitchenette'],
    inclusions: ['Bills', 'Superfast Wi-Fi', 'Regular cleaning', 'Bed linen and towels', 'Gym and wellbeing facilities'],
  },
  'study-inn-triumph-house': {
    gallery: [
      'https://cdn.universityliving.com/cms/fpJzKZ0gP5SQluF3qFoaPZRsjtaMFO.jpg?w=640',
    ],
    roomFeatures: ['En-suite bathroom', 'Double bed', 'Study area', 'Large wardrobe', 'Smart TV', 'Fully fitted kitchen'],
    inclusions: ['All-inclusive bills', 'Wi-Fi', 'Housekeeping', 'Gym', 'Wellness spa', 'Study rooms', '24/7 security'],
    goodFor: ['Students at the University of Nottingham', 'Students who want privacy plus social spaces'],
  },
  'study-inn-walnut-gardens': {
    gallery: [
      'https://cdn.beststudenthalls.com/media/room/platinum-plus-studio-18/883074',
      'https://cdn.beststudenthalls.com/media/listing/walnut-gardens-exeter/542977',
    ],
    roomFeatures: ['En-suite bathroom', 'Double bed', 'Study area', 'Smart TV', 'Private fridge/freezer', 'Kitchen appliances'],
    inclusions: ['Utility bills', 'Room and kitchen cleaning', 'Bed linen and towels', 'Wi-Fi', 'Gym and yoga room', 'Study rooms'],
    goodFor: ['Students who want serviced living', 'Students who want a quieter private space'],
  },
  'study-inn-lemyngton-street': {
    gallery: [
      'https://media.uhzcdn.com/image/1387/01HVR0X4PYWYXPQGCHNPXYMD07_z.webp',
      'https://media.uhzcdn.com/image/1399/01J4Q5HTNMB257Z04E1KRB9AZR_z.webp',
      'https://studyinn.com/wp-content/uploads/2022/11/Loughborough-1.jpg.webp',
      'https://studyinn.com/wp-content/uploads/2022/11/E5I1135-diamond-apartment-1.jpg.webp',
      'https://studyinn.com/wp-content/uploads/2022/11/E5I3133-Final-shared-kitchen-2.jpg.webp',
      'https://studyinn.com/wp-content/uploads/2022/11/E5I1123.jpg.webp',
    ],
    priceFrom: 199,
    roomFeatures: ['Private en-suite', 'Double bed', 'Study desk', 'Wardrobe', 'Smart TV', 'Kitchenette'],
    inclusions: ['All utility bills', 'Superfast Wi-Fi', 'Regular cleaning', 'Bed linen and towels', 'Gym', 'Wellness spa', 'Cinema', 'Study rooms'],
    goodFor: ['Students at Loughborough University', 'Students who want strong wellness facilities', 'Students who want all-inclusive living'],
  },
  'study-inn-marlborough-house': {
    gallery: [
      'https://media.studentcrowd.net/w852-h568-q90-cfill/index-data/20190605115217-gallery250ab.jpg',
      'https://media.studentcrowd.net/w1200/content/galleries/study-inn-bristol---marlborough-house/app-images-2fresizable-2fimage-1--26829493-1616747611383.png',
    ],
    roomFeatures: ['Private en-suite', 'Double bed', 'Study desk', 'Smart TV', 'Shared kitchen', 'Private storage'],
    inclusions: ['Bills', 'Superfast Wi-Fi', 'Gym', 'Cinema room', 'Study rooms', 'Bike storage', '24/7 staff'],
    goodFor: ['Students at the University of Bristol', 'Students who want a social central location'],
  },
  'study-inn-frederick-road': {
    roomFeatures: ['En-suite bathroom', 'Study desk', 'Wardrobe', 'Smart TV', 'Kitchenette'],
    inclusions: ['Bills', 'Wi-Fi', 'Housekeeping', 'On-site support'],
  },
  'study-inn-james-street': {
    roomFeatures: ['En-suite bathroom', 'Study desk', 'Wardrobe', 'Smart TV', 'Kitchenette'],
    inclusions: ['Bills', 'Wi-Fi', 'Housekeeping', 'On-site support'],
  },
  'neon-wood-berlin-frankfurter-tor': {
    gallery: [
      'https://neonwood.com/app/uploads/2019/06/20190430_32143_Neonwood_byDavidUlrich-HDR-988x0-c-default.jpg.webp',
      'https://neonwood.com/app/uploads/2022/02/AH448-863-69-73-81-Z6_V2-scaled-768x384-c-default.jpg',
    ],
    currency: 'EUR',
    pricePeriod: 'month',
    roomFeatures: ['Private kitchenette', 'Private bathroom', 'Furnished room', 'Desk', 'Wardrobe', 'Balcony options'],
    inclusions: ['Internet', 'Utilities', 'Common-area access', 'On-site management'],
  },
  'neon-wood-berlin-mitte-wedding': {
    gallery: ['https://neonwood.com/app/uploads/2018/01/mitte-wedding-360-988x0-c-default.jpg'],
    roomFeatures: ['Furnished apartment', 'Private bathroom', 'Kitchenette', 'Study space'],
  },
  'neon-wood-tannhaus-berlin-neukolln': {
    gallery: ['https://tannhaus.com/app/uploads/2023/08/Image00006-2-1440x0-c-default.jpg'],
    currency: 'EUR',
    pricePeriod: 'month',
    roomFeatures: ['40 m² studio example', 'Full kitchen', 'Oven', 'Dishwasher', 'Private balcony', 'Living area'],
  },
  'neon-wood-berlin-adlershof': {
    gallery: ['https://neonwood.com/app/uploads/2020/01/Neon-Wood-Studentenheim-Adlershof-02-988x0-c-default.jpg'],
  },
  'neon-wood-frankfurt-riedberg': {
    gallery: ['https://image.uhzcdn.com/house/c4/37056380d03d80f788e33c5aea6c94dac0e496.webp?x-oss-process=image%2Fresize%2Cm_fill%2Cw_640%2Ch_400%2Climit_0%2Finterlace%2C1%2Fquality%2Cq_90%2Fformat%2Cwebp'],
  },
  'vita-student-new-gough-street': {
    gallery: ['https://cdn.beststudenthalls.com/media/listing/gough-street/3_25tXhyS.webp'],
    distance: '10 min by train to the University of Birmingham; 1 min walk to Birmingham city centre',
    roomFeatures: ['En-suite bathroom', 'Double bed', 'Smart TV', 'Desk', 'Wardrobe', 'Kitchen with microwave, hob and fridge-freezer'],
    inclusions: ['Wi-Fi', 'Gym and fitness studio', 'Breakfast', 'Housekeeping', 'Study rooms', 'Events', 'Parcel collection'],
    goodFor: ['Students who want central Birmingham', 'Students at the University of Birmingham', 'Students who value all-inclusive services'],
  },
  'vita-student-pebble-mill': {
    gallery: [
      'https://pebblemillbirmingham.co.uk/wp-content/uploads/2020/06/Vita-Birmingham-08-1-640x640.jpg',
      'https://uniacco.imgix.net/inventory/classic_plus.jpg?auto=format&fit=max&w=828',
    ],
    distance: '25 min walk to the University of Birmingham',
    roomFeatures: ['Double bed', 'En-suite bathroom', 'Kitchen', 'Smart TV', 'Desk', 'Wardrobe'],
    inclusions: ['Bills', 'Gym and fitness studio', 'Cinema room', 'Study rooms', 'Housekeeping', 'Breakfast', 'Wi-Fi'],
    goodFor: ['Students at the University of Birmingham', 'Students who want strong shared facilities'],
  },
  'vita-student-zed-alley': {
    gallery: ['https://images.casita.com/uploads/buildings/502/room/2498/orig/zed-alley--3572905520260223110104AM.webp'],
    distance: 'Less than 10 min walk to the University of Bristol',
    roomFeatures: ['En-suite bathroom', 'Kitchen with microwave, hob and fridge-freezer', 'Three-quarter bed', 'Smart TV', 'Desk', 'Wardrobe'],
    inclusions: ['Breakfast', 'Superfast Wi-Fi', 'Gym', 'Study rooms', 'Housekeeping', 'Laundry', 'Events', '24/7 support'],
    goodFor: ['Students at the University of Bristol', 'Students who want central Bristol'],
  },
  'vita-student-park-place': {
    gallery: ['https://cdn.beststudenthalls.com/media/room/deluxe-studio-150/181312'],
  },
  'iglu-broadway': {
    roomFeatures: ['Furnished student room', 'Study desk', 'Shared kitchen options', 'Secure access'],
    inclusions: ['Unlimited Wi-Fi', 'Utilities', 'Gym access', 'Study areas', 'On-site support'],
    goodFor: ['University of Sydney students', 'UTS students', 'Students who want inner-city Sydney'],
  },
  'iglu-central': {
    gallery: ['https://images.casita.com/uploads/buildings/330929/room/9321913/orig/iglu-central--160466310020260428123130PM.jpg'],
    roomFeatures: ['Single bed', 'Study desk', 'Storage', 'Bright private room'],
  },
  'iglu-mascot': {
    gallery: ['https://iglu.com.au/wp-content/uploads/2023/04/IgluMascot-Exterior-1400x739-1.jpg'],
  },
}
