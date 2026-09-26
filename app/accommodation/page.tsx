"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, MapPin, Search, SlidersHorizontal } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import {
  accommodationCategories,
  accommodationCities,
  accommodationCountries,
  accommodationProperties,
  accommodationRoomTypes,
  getAccommodationBudgetRanges,
  getAccommodationCitiesByCountry,
} from "./catalog";
import {
  formatAccommodationPrice,
  formatAccommodationPricePeriod,
} from "./formatters";

function AccommodationContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("query") ?? "");
  const [country, setCountry] = useState("All countries");
  const [city, setCity] = useState(() =>
    searchParams.get("city") &&
    accommodationCities.includes(searchParams.get("city") ?? "")
      ? (searchParams.get("city") ?? "All cities")
      : "All cities",
  );
  const [roomType, setRoomType] = useState("Any room type");
  const [category, setCategory] = useState("Any category");
  const [maxBudget, setMaxBudget] = useState("Any budget");
  const availableCities =
    country === "All countries"
      ? accommodationCities
      : getAccommodationCitiesByCountry(country);
  const budgetRanges = useMemo(
    () =>
      getAccommodationBudgetRanges(
        country === "All countries"
          ? accommodationProperties
          : accommodationProperties.filter(
              (property) => property.country === country,
            ),
      ),
    [country],
  );
  const selectedBudget = budgetRanges.find(
    (range) => range.value === maxBudget,
  );
  const properties = useMemo(
    () =>
      accommodationProperties.filter((property) => {
        const terms = [
          property.name,
          property.city,
          ...property.roomTypes,
          ...property.universities,
          ...property.amenities,
          ...(property.goodFor ?? []),
        ];
        return (
          (!query.trim() ||
            terms.some((term) =>
              term.toLowerCase().includes(query.trim().toLowerCase()),
            )) &&
          (country === "All countries" || property.country === country) &&
          (city === "All cities" || property.city === city) &&
          (roomType === "Any room type" ||
            property.roomTypes.includes(roomType)) &&
          (category === "Any category" ||
            property.categories.includes(category)) &&
          (!selectedBudget ||
            (property.currency === selectedBudget.currency &&
              property.pricePeriod === selectedBudget.pricePeriod &&
              property.priceFrom <= selectedBudget.upperBound))
        );
      }),
    [category, city, country, query, roomType, selectedBudget],
  );

  return (
    <>
      <Navigation />
      <main>
        <section className="bg-[#00319D] px-6 py-16 text-white lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <h1 className="font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Find your student <span className="text-[#FCC20A]">home</span>.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
                One clear listing for every property, with tentative pricing,
                property photography and room information together in one place.
              </p>
            </div>
            <div className="mt-10 rounded-2xl bg-white p-4 shadow-2xl sm:p-5">
              <div className="space-y-4">
                <label
                  htmlFor="accommodation-search"
                  className="block text-sm font-bold text-[#1A1A1A]"
                >
                  <span>Search accommodation</span>
                  <span className="mt-2 flex items-center gap-3 rounded-xl border border-[#E8E6E1] px-4 py-3">
                    <Search className="h-5 w-5 shrink-0 text-[#00319D]" />
                    <input
                      id="accommodation-search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search a city, property or university"
                      className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:font-normal placeholder:text-[#6B6860]"
                    />
                  </span>
                </label>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                  <label className="text-sm font-bold text-[#1A1A1A]">
                    Country
                    <select
                      value={country}
                      onChange={(event) => {
                        const value = event.target.value;
                        setCountry(value);
                        setMaxBudget("Any budget");
                        if (
                          city !== "All cities" &&
                          !(
                            value === "All countries"
                              ? accommodationCities
                              : getAccommodationCitiesByCountry(value)
                          ).includes(city)
                        )
                          setCity("All cities");
                      }}
                      className="mt-2 w-full rounded-xl border border-[#E8E6E1] px-4 py-3 text-sm font-medium"
                    >
                      <option>All countries</option>
                      {accommodationCountries.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                  <label className="text-sm font-bold text-[#1A1A1A]">
                    City
                    <select
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#E8E6E1] px-4 py-3 text-sm font-medium"
                    >
                      <option>All cities</option>
                      {availableCities.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                  <label className="text-sm font-bold text-[#1A1A1A]">
                    Room type
                    <select
                      value={roomType}
                      onChange={(event) => setRoomType(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#E8E6E1] px-4 py-3 text-sm font-medium"
                    >
                      <option>Any room type</option>
                      {accommodationRoomTypes.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                  <label className="text-sm font-bold text-[#1A1A1A]">
                    Category
                    <select
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#E8E6E1] px-4 py-3 text-sm font-medium"
                    >
                      <option>Any category</option>
                      {accommodationCategories.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                  <label className="text-sm font-bold text-[#1A1A1A]">
                    Budget
                    <select
                      value={maxBudget}
                      onChange={(event) => setMaxBudget(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#E8E6E1] px-4 py-3 text-sm font-medium"
                    >
                      <option value="Any budget">Any budget</option>
                      {budgetRanges.map((range) => (
                        <option key={range.value} value={range.value}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <Link
                    href="/get-matched"
                    className="inline-flex items-center justify-center rounded-xl bg-[#FCC20A] px-5 py-3 text-sm font-bold text-[#333333] lg:mt-6"
                  >
                    Get Matched
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#F7F6F3] px-6 py-14 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-[#00319D]" />
                  <span className="text-sm font-bold uppercase tracking-wider text-[#00319D]">
                    Explore
                  </span>
                </div>
                <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-4xl">
                  Properties to start with
                </h2>
                <p className="mt-2 text-sm text-[#6B6860]">
                  {properties.length} sourced properties with pricing and room
                  details.
                </p>
              </div>
              <Link
                href="/get-matched"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#00319D]"
              >
                Prefer a recommendation? Get matched{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            {properties.length === 0 ? (
              <div className="rounded-2xl border border-[#E8E6E1] bg-white p-12 text-center">
                <h3 className="font-heading text-xl font-extrabold">
                  No properties match those filters.
                </h3>
                <p className="mt-2 text-sm text-[#6B6860]">
                  Try a different city, category, room type or budget.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {properties.map((property) => (
                  <Link
                    key={property.slug}
                    href={`/accommodation/${property.slug}`}
                    className="group overflow-hidden rounded-2xl border border-[#E8E6E1] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-56 overflow-hidden bg-[#00319D]">
                      <img
                        src={property.image}
                        alt={`${property.name} accommodation`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-white">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                            {property.city}
                          </p>
                          <h3 className="font-heading text-2xl font-extrabold leading-tight">
                            {property.name}
                          </h3>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-xs text-white/70">from</p>
                          <p className="text-lg font-extrabold">
                            {formatAccommodationPrice(
                              property.currency,
                              property.priceFrom,
                            )}
                            {formatAccommodationPricePeriod(
                              property.pricePeriod ?? "month",
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start gap-2 text-sm text-[#6B6860]">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#00319D]" />
                        <span>{property.address}</span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {property.roomTypes.slice(0, 3).map((type) => (
                          <span
                            key={type}
                            className="rounded-full bg-[#F7F6F3] px-3 py-1 text-xs font-semibold text-[#1A1A1A]"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
export default function AccommodationPage() {
  return (
    <Suspense fallback={null}>
      <AccommodationContent />
    </Suspense>
  );
}
