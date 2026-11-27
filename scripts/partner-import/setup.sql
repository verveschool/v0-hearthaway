-- HearthAway partner-import staging setup. Review before applying.
-- Check migration history and existing objects in the configured catalogue project.
-- Apply once in an explicit transaction, e.g.:
-- psql "$HA_IMPORT_DATABASE_URL" --single-transaction --set=ON_ERROR_STOP=1 \
--   --file=scripts/partner-import/setup.sql
-- This file deliberately has no BEGIN/COMMIT so verification can create and
-- exercise the complete schema inside one transaction that ends in ROLLBACK.
-- Existing catalogue and public ha_catalogue_* records are not modified.
-- These are server-only REST tables. Never use a service-role key in a browser.

create table public.ha_import_partners (
  slug text primary key
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(slug) <= 100),
  name text not null check (length(btrim(name)) between 1 and 200),
  listing_hosts text[] not null default '{}'::text[],
  image_hosts text[] not null default '{}'::text[],
  permission_ref text,
  can_import boolean not null default false,
  can_republish boolean not null default false,
  can_copy_images boolean not null default false,
  active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ha_import_partners_permission_required check (
    not (can_import or can_republish or can_copy_images)
    or nullif(btrim(permission_ref), '') is not null
  ),
  constraint ha_import_partners_republish_requires_import check (
    not can_republish or can_import
  ),
  constraint ha_import_partners_images_require_import check (
    not can_copy_images or can_import
  )
);

create table public.ha_import_runs (
  id uuid primary key default gen_random_uuid(),
  partner_slug text not null references public.ha_import_partners(slug),
  manifest_hash text not null check (manifest_hash ~ '^[a-f0-9]{64}$'),
  status text not null default 'staging'
    check (status in ('staging', 'staged', 'failed', 'approved', 'published')),
  counts jsonb not null default '{}'::jsonb
    check (jsonb_typeof(counts) = 'object'),
  errors jsonb not null default '[]'::jsonb
    check (jsonb_typeof(errors) = 'array'),
  warnings jsonb not null default '[]'::jsonb
    check (jsonb_typeof(warnings) = 'array'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ha_import_runs_partner_manifest_unique
    unique (partner_slug, manifest_hash)
);

create table public.ha_import_items (
  run_id uuid not null references public.ha_import_runs(id),
  external_id text not null check (length(btrim(external_id)) between 1 and 512),
  canonical_property_id uuid references catalogue.properties(id),
  payload jsonb not null check (jsonb_typeof(payload) = 'object'),
  payload_hash text not null check (payload_hash ~ '^[a-f0-9]{64}$'),
  address_key text,
  action text not null
    check (action in ('create', 'update', 'unchanged', 'hold', 'conflict', 'reject')),
  status text not null default 'ready'
    check (status in ('ready', 'conflict', 'error', 'staged', 'approved', 'published')),
  errors jsonb not null default '[]'::jsonb
    check (jsonb_typeof(errors) = 'array'),
  warnings jsonb not null default '[]'::jsonb
    check (jsonb_typeof(warnings) = 'array'),
  gallery jsonb not null default '[]'::jsonb
    check (jsonb_typeof(gallery) = 'array'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (run_id, external_id)
);

create table public.ha_import_media_sources (
  partner_slug text not null references public.ha_import_partners(slug),
  source_url text not null check (source_url ~ '^https://[^/[:space:]]+'),
  content_hash text check (content_hash ~ '^[a-f0-9]{64}$'),
  bucket text,
  object_path text check (
    length(object_path) between 1 and 1024
    and object_path not like '/%'
    and object_path !~ '(^|/)\.\.?(/|$)'
  ),
  content_type text,
  size_bytes bigint check (size_bytes > 0),
  status text not null default 'pending'
    check (status in ('pending', 'uploaded', 'failed')),
  error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (partner_slug, source_url),
  constraint ha_import_media_uploaded_metadata check (
    status <> 'uploaded' or (
      content_hash is not null
      and nullif(btrim(bucket), '') is not null
      and nullif(btrim(object_path), '') is not null
      and content_type is not null
      and content_type in ('image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif')
      and size_bytes is not null
      and error is null
    )
  )
);

create index ha_import_runs_partner_status
  on public.ha_import_runs (partner_slug, status, updated_at);
-- A new manifest must not bypass an existing worker's lease for this partner.
create unique index ha_import_one_active_run
  on public.ha_import_runs (partner_slug) where status = 'staging';
create index ha_import_items_canonical_property
  on public.ha_import_items (canonical_property_id)
  where canonical_property_id is not null;
create index ha_import_items_address
  on public.ha_import_items (address_key) where address_key is not null;
create index ha_import_media_content
  on public.ha_import_media_sources (partner_slug, content_hash)
  where content_hash is not null;

alter table public.ha_import_partners enable row level security;
alter table public.ha_import_runs enable row level security;
alter table public.ha_import_items enable row level security;
alter table public.ha_import_media_sources enable row level security;

-- Revoke automatic project defaults explicitly, including service_role, then
-- grant only the operations used by this importer. No browser policies, public
-- functions, schema-exposure changes, or broad default-privilege changes.
revoke all on public.ha_import_partners, public.ha_import_runs,
  public.ha_import_items, public.ha_import_media_sources
  from public, anon, authenticated, service_role;
grant select, insert, update on public.ha_import_partners, public.ha_import_runs,
  public.ha_import_items, public.ha_import_media_sources to service_role;

comment on table public.ha_import_partners is
  'Server-only import configuration. Recorded rights default to false; a logo is not a permission record.';
comment on table public.ha_import_runs is
  'Server-only import ledger. Unique partner/manifest identity supports retry; one active staging run per partner.';
comment on table public.ha_import_items is
  'Private staging payloads. Presence here never publishes into ha_catalogue_*.';
comment on table public.ha_import_media_sources is
  'Server-only verified Storage-object metadata, scoped to partner rights; no expiring signed URLs.';

-- The caller updates updated_at on lease acquisition, heartbeat and completion.
-- State transitions and required rights checks are enforced by the server CLI.
-- Create the private ha-import-staging bucket through the Storage API or the
-- reviewed bootstrap.sql. Never insert/update storage.objects or reuse any
-- unrelated bucket.
