create schema catalogue;
revoke all on schema catalogue from public, anon, authenticated;

create table catalogue.providers (slug text primary key);
create table catalogue.cities (
  id uuid primary key default gen_random_uuid(),
  country text not null,
  name text not null,
  unique (country,name)
);
create table catalogue.properties (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  provider text not null references catalogue.providers,
  city_id uuid not null references catalogue.cities,
  source_key text not null,
  source_brand text,
  source_url text,
  unique (provider,source_key)
);
create index catalogue_property_city on catalogue.properties(city_id);
create table catalogue.rooms (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  property_id uuid not null references catalogue.properties,
  source_key text,
  identity_basis text not null,
  unique (property_id,id)
);
create index catalogue_room_property on catalogue.rooms(property_id);
create table catalogue.price_observations (
  source_commit text not null references catalogue_staging.source_snapshots,
  property_id uuid not null references catalogue.properties,
  room_id uuid,
  observation_key text not null,
  amount numeric,
  currency text check (currency ~ '^[A-Z]{3}$'),
  period text check (period in ('night','week','month')),
  source_url text,
  academic_year text,
  source_status text,
  confidence text,
  provenance jsonb not null,
  primary key(source_commit, observation_key),
  foreign key(property_id,room_id) references catalogue.rooms(property_id,id)
);
create index catalogue_price_property on catalogue.price_observations(property_id,room_id);
create table catalogue.media (
  property_id uuid not null references catalogue.properties,
  room_id uuid,
  source_commit text not null references catalogue_staging.source_snapshots,
  ordinal integer not null,
  role text not null,
  url text not null check (url ~ '^(/[^/]|https?://)'),
  label text,
  primary key(source_commit,ordinal),
  foreign key(property_id,room_id) references catalogue.rooms(property_id,id)
);
create index catalogue_media_owner on catalogue.media(property_id,room_id);

-- Only allowlisted, published representations go into these Data API tables.
create table public.ha_catalogue_properties (
  id uuid primary key references catalogue.properties,
  slug text not null unique,
  provider text not null,
  city text not null,
  country text,
  sort_order integer not null unique,
  search_text text not null,
  payload jsonb not null
);
create table public.ha_catalogue_rooms (
  id uuid primary key references catalogue.rooms,
  slug text not null unique,
  property_id uuid not null references public.ha_catalogue_properties,
  ordinal integer not null,
  sort_order integer not null unique,
  search_text text not null,
  payload jsonb not null,
  unique(property_id,ordinal)
);
create index ha_catalogue_provider_order on public.ha_catalogue_properties(provider,sort_order);
create index ha_catalogue_city_order on public.ha_catalogue_properties(city,sort_order);
alter table public.ha_catalogue_properties enable row level security;
alter table public.ha_catalogue_rooms enable row level security;
revoke all on public.ha_catalogue_properties, public.ha_catalogue_rooms from public, anon, authenticated;
grant select on public.ha_catalogue_properties, public.ha_catalogue_rooms to anon, authenticated;
create policy ha_catalogue_property_read on public.ha_catalogue_properties for select to anon, authenticated using (true);
create policy ha_catalogue_room_read on public.ha_catalogue_rooms for select to anon, authenticated using (true);
do $$
declare relation record;
begin
  for relation in select tablename from pg_tables where schemaname='catalogue' loop
    execute format('alter table catalogue.%I enable row level security', relation.tablename);
    execute format('revoke all on catalogue.%I from public, anon, authenticated', relation.tablename);
  end loop;
end
$$;
