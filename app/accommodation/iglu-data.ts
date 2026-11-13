/**
 * Iglu source records remain split by source entity. Room.parentPropertyId
 * references the stable Property ID captured from the public page state.
 * Images were copied from partner-approved public assets into /public/iglu.
 */
export type IgluProperty = {
  id: string
  slug: string
  name: string
  city: string
  country: string
  address: string
  description: string
  gallery: string[]
  amenities: string[]
  inclusions: string[]
}

export type IgluRoom = {
  id: string
  parentPropertyId: string
  name: string
  image: string
  images: string[]
  floorplan: string
  features: string[]
  inclusions: string[]
  approximateArea: string
}

export const igluProperties: IgluProperty[] = [{
  id: '18',
  slug: 'sydney-broadway',
  name: 'Iglu Broadway',
  city: 'Sydney',
  country: 'Australia',
  address: '9 Kensington Street, Chippendale NSW 2008, Australia',
  description: 'Student accommodation close to Sydney universities, with furnished rooms, shared facilities and on-site resident support.',
  gallery: [
    '/iglu/broadway/iglu-broadway-exterior-2.jpg',
    '/iglu/broadway/iglu-broadway-exterior-1.jpg',
    '/iglu/broadway/iglu-broadway-communal-kitchen.jpg',
    '/iglu/broadway/iglu-broadway-games.jpg',
    '/iglu/broadway/iglu-broadway-study-spaces.jpg',
    '/iglu/broadway/iglu-broadway-surrounds.jpg',
    '/iglu/broadway/IgluCentralPark-Gym-1400x739.jpg',
  ],
  amenities: ['Study spaces', 'Communal kitchen', 'Games room', 'Gym', 'On-site resident support'],
  inclusions: ['Unlimited Wi-Fi', 'Utilities', 'Use of communal spaces', 'Resident events'],
}]

export const igluRooms: IgluRoom[] = [{
  id: '1265',
  parentPropertyId: '18',
  name: 'Standard Studio Apartment',
  image: '/iglu/broadway/Broadway-Standard-810x1215-room-1.jpg',
  images: [
    '/iglu/broadway/Broadway-Standard-810x1215-room-1.jpg',
    '/iglu/broadway/Broadway-Standard-810x1215-room-2.jpg',
    '/iglu/broadway/Broadway-Standard-810x1215-room-3.jpg',
    '/iglu/broadway/Broadway-Standard-810x1215-room-4.jpg',
    '/iglu/broadway/Broadway-Standard-810x1215-room-5.jpg',
    '/iglu/broadway/Broadway-Standard-810x1215-room-6.jpg',
  ],
  floorplan: '/iglu/broadway/SBR-standard-studio.webp',
  features: [
    'Private studio for one resident',
    'King single or double bed',
    'Private bathroom',
    'Air conditioning and heating',
    'Study desk, chair and lamp',
    'Kitchenette with sink, convection microwave, two-burner cooktop and refrigerator',
    'Approximately 19 m²',
  ],
  inclusions: ['Unlimited high-speed Wi-Fi', 'Smart TV with Apple TV', 'Utilities and communal spaces'],
  approximateArea: '19 m²',
}]

export function getIgluPropertyForRoom(room: IgluRoom): IgluProperty | undefined {
  return igluProperties.find((property) => property.id === room.parentPropertyId)
}
