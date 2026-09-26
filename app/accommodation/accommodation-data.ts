export type AccommodationCurrency =
  | "GBP"
  | "EUR"
  | "AUD"
  | "USD"
  | "CAD"
  | "AED"
  | "SGD"
  | "MYR";
export type AccommodationPricePeriod =
  | "week"
  | "month"
  | "term"
  | "night"
  | "check";

/**
 * A room type's pricing is stored separately from whether the room is currently
 * bookable. The source may only offer an exact figure, a range, or nothing at
 * all — this shape can represent all three without inventing a number that
 * was never on the source page.
 */
export type AccommodationRoomPrice = {
  /** Exact figure when the source gives a single confirmed price. */
  value?: number;
  /** Lower bound when the source gives a range instead of one figure. */
  minValue?: number;
  /** Upper bound when the source gives a range instead of one figure. */
  maxValue?: number;
  currency: AccommodationCurrency;
  period?: AccommodationPricePeriod;
  /** Pre-formatted label to use verbatim instead of composing one from the numeric fields. */
  label?: string;
  /** True when the source frames this figure as a starting point, estimate or typical rate rather than a fixed guaranteed price. */
  indicative?: boolean;
  /** Preserves why the price varies, e.g. "Depends on tenancy length and contract dates." */
  conditions?: string;
  /** The pricing text as it appeared on the source page, kept for maintenance and transparency. */
  sourceText?: string;
  /** True when the source lists the room type but gives no usable price at all. */
  priceOnEnquiry?: boolean;
};

/** A single room type offered within a property-level listing. */
export type AccommodationRoomType = {
  name: string;
  /** The room-specific photo from the source, when the source provides one. Falls back to no image rather than reusing an unrelated property photo. */
  image?: string;
  gallery?: string[];
  price: AccommodationRoomPrice;
  features?: string[];
  /** Tenancy length, contract type or occupancy details specific to this room type. */
  tenancy?: string;
};

export type AccommodationProperty = {
  slug: string;
  name: string;
  city: string;
  country: string;
  address: string;
  priceFrom: number;
  currency: AccommodationCurrency;
  pricePeriod?: AccommodationPricePeriod;
  roomTypes: string[];
  /** Rich per-room-type catalogue entries. When omitted, the catalogue layer synthesizes one entry per name in `roomTypes` without inventing pricing. */
  rooms?: AccommodationRoomType[];
  propertyType: string;
  universities: string[];
  distance: string;
  amenities: string[];
  highlights: string[];
  image: string;
  source: string;
  sourceUrl: string;
  roomFeatures?: string[];
  inclusions?: string[];
  contractTerms?: string[];
  depositNote?: string;
  goodFor?: string[];
  verifiedAt?: string;
  /** Pricing is indicative only; confirm the live room offer, dates and contract with the provider. */
  pricingNote?: string;
  pricingSourceUrl?: string;
  locationMapUrl?: string;
};

export const accommodationProperties: AccommodationProperty[] = [];

export const accommodationCities = [
  ...new Set(accommodationProperties.map((property) => property.city)),
];
export function getAccommodationBySlug(slug: string) {
  return accommodationProperties.find((property) => property.slug === slug);
}
