create schema catalogue_staging;
revoke all on schema catalogue_staging from public, anon, authenticated;
create table catalogue_staging.source_snapshots (
  source_commit text primary key,
  snapshot jsonb not null,
  created_at timestamptz not null default now()
);
alter table catalogue_staging.source_snapshots enable row level security;
revoke all on catalogue_staging.source_snapshots from public, anon, authenticated;
