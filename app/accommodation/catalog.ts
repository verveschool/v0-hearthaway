import { accommodationProperties as seedProperties } from "./accommodation-data";
import {
  additionalAccommodationProperties,
  type CatalogProperty,
} from "./partner-inventory";
import { propertyOverrides } from "./property-overrides";
import { getUniversitiesByCity } from "@/lib/place-data";
import {
  formatAccommodationPrice,
  formatAccommodationPricePeriod,
} from "./formatters";
import type {
  AccommodationCurrency,
  AccommodationPricePeriod,
  AccommodationRoomType,
} from "./accommodation-data";

function buildRooms(
  property: CatalogProperty,
  currency: AccommodationCurrency,
  pricePeriod: AccommodationPricePeriod,
): AccommodationRoomType[] {
  if (property.rooms?.length) return property.rooms;
  return (property.roomTypes ?? []).map((name, index) => ({
    name,
    price:
      index === 0 && property.priceFrom > 0
        ? {
            value: property.priceFrom,
            currency,
            period: pricePeriod,
            indicative: true,
            conditions:
              "Starting price for this property; confirm the exact rate, dates and contract length with the provider.",
          }
        : { currency, period: pricePeriod, priceOnEnquiry: true },
  }));
}

const normalizeProperty = (property: CatalogProperty): CatalogProperty => {
  const gallery = property.gallery?.length
    ? property.gallery
    : [property.image].filter(Boolean);
  const currency = property.currency ?? "GBP";
  const pricePeriod =
    property.pricePeriod && property.pricePeriod !== "check"
      ? property.pricePeriod
      : currency === "GBP" || currency === "AUD"
        ? "week"
        : "month";
  const rooms = buildRooms(property, currency, pricePeriod);
  return {
    ...property,
    priceFrom:
      Number.isFinite(property.priceFrom) && property.priceFrom > 0
        ? property.priceFrom
        : 0,
    currency,
    pricePeriod,
    image: gallery[0] ?? property.image,
    gallery,
    gallerySourceUrl: "",
    sourceUrl: "",
    pricingSourceUrl: property.pricingSourceUrl || property.sourceUrl,
    locationMapUrl:
      property.locationMapUrl ||
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.address}, ${property.city}, ${property.country}`)}`,
    universities: property.universities?.length
      ? property.universities
      : getUniversitiesByCity(property.city).map(
          (university) => university.name,
        ),
    categories: property.categories ?? [],
    roomTypes: property.roomTypes ?? rooms.map((room) => room.name),
    rooms,
    primaryListingSlug: property.slug,
    amenities: property.amenities ?? [],
    highlights: property.highlights ?? [],
    pricingNote:
      property.pricingNote ??
      "Tentative starting price; confirm the exact rate, dates, contract length, bills and deposit before booking.",
  };
};

const applyOverride = (property: CatalogProperty): CatalogProperty =>
  normalizeProperty({
    ...property,
    ...(propertyOverrides[property.slug] ?? {}),
  });
const normalizedSeedProperties = seedProperties.map((property) =>
  applyOverride({
    ...property,
    partnerSlug: property.source.toLowerCase().replace(/\s+/g, "-"),
    categories: [property.propertyType, ...property.roomTypes],
    gallery: [property.image],
    gallerySourceUrl: property.sourceUrl,
  }),
);
const allAccommodationProperties = [
  ...normalizedSeedProperties,
  ...additionalAccommodationProperties.map(applyOverride),
];

/** A property is only published when it has a sourced tentative starting price and imagery. */
export function hasListingLevelEvidence(property: CatalogProperty): boolean {
  return Boolean(
    property.pricingSourceUrl &&
    property.image &&
    property.gallery.length &&
    property.priceFrom > 0,
  );
}

export const accommodationProperties: CatalogProperty[] =
  allAccommodationProperties.filter(hasListingLevelEvidence);
/** Compatibility alias: each entry is now one property, never a room-level listing. */
export const accommodationListings = accommodationProperties;
export const accommodationCities = [
  ...new Set(accommodationProperties.map((property) => property.city)),
].sort();
export const accommodationCountries = [
  ...new Set(accommodationProperties.map((property) => property.country)),
].sort();
export const accommodationCitiesByCountry = new Map(
  accommodationCountries.map((country) => [
    country,
    [
      ...new Set(
        accommodationProperties
          .filter((property) => property.country === country)
          .map((property) => property.city),
      ),
    ].sort(),
  ]),
);
export function getAccommodationCitiesByCountry(
  country: string,
): readonly string[] {
  return accommodationCitiesByCountry.get(country) ?? [];
}
export const accommodationCategories = [
  ...new Set(
    accommodationProperties.flatMap((property) => property.categories),
  ),
].sort();
export const accommodationRoomTypes = [
  ...new Set(accommodationProperties.flatMap((property) => property.roomTypes)),
].sort();
type ConfirmedAccommodationPricePeriod = Exclude<
  AccommodationPricePeriod,
  "check"
>;
export type AccommodationBudgetRange = Readonly<{
  value: string;
  currency: AccommodationCurrency;
  upperBound: number;
  pricePeriod: ConfirmedAccommodationPricePeriod;
  label: string;
}>;
function getBudgetIncrement(amount: number): number {
  return amount < 1_000 ? 50 : amount < 5_000 ? 100 : 500;
}
export function getAccommodationBudgetRanges(
  properties: readonly CatalogProperty[],
): AccommodationBudgetRange[] {
  const ranges = new Map<string, AccommodationBudgetRange>();
  for (const property of properties) {
    if (
      !property.pricePeriod ||
      property.pricePeriod === "check" ||
      property.priceFrom <= 0
    )
      continue;
    const upperBound =
      Math.ceil(property.priceFrom / getBudgetIncrement(property.priceFrom)) *
      getBudgetIncrement(property.priceFrom);
    const key = `${property.currency}:${property.pricePeriod}:${upperBound}`;
    ranges.set(key, {
      value: key,
      currency: property.currency,
      upperBound,
      pricePeriod: property.pricePeriod,
      label: `Up to ${formatAccommodationPrice(property.currency, upperBound)}${formatAccommodationPricePeriod(property.pricePeriod)}`,
    });
  }
  return [...ranges.values()].sort(
    (a, b) =>
      a.currency.localeCompare(b.currency) ||
      a.pricePeriod.localeCompare(b.pricePeriod) ||
      a.upperBound - b.upperBound,
  );
}
export function getAccommodationBySlug(slug: string) {
  return accommodationProperties.find((property) => property.slug === slug);
}
