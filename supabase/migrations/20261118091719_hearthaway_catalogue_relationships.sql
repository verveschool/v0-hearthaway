alter table catalogue.cities add column guide_slug text unique;

create table catalogue.universities (
  slug text primary key,
  name text not null,
  country text not null,
  city text not null,
  city_id uuid references catalogue.cities
);
create index catalogue_university_city on catalogue.universities(city_id);

create table catalogue.property_universities (
  property_id uuid not null references catalogue.properties,
  ordinal integer not null check (ordinal > 0),
  source_label text not null,
  university_slug text references catalogue.universities,
  primary key (property_id, ordinal)
);
create index catalogue_property_university_slug on catalogue.property_universities(university_slug);

create table catalogue.buildings (
  property_id uuid not null references catalogue.properties,
  ordinal integer not null check (ordinal > 0),
  name text,
  address text,
  postcode text,
  source_url text,
  source_units_available integer,
  primary key (property_id, ordinal)
);

alter table catalogue.media add column provenance jsonb;
alter table catalogue.universities enable row level security;
alter table catalogue.property_universities enable row level security;
alter table catalogue.buildings enable row level security;
revoke all on catalogue.universities, catalogue.property_universities, catalogue.buildings from public, anon, authenticated;
