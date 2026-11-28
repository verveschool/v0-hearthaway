-- One-time, additive bootstrap after setup.sql, in the same transaction.
-- These rows mirror configs/*.json and record no granted extraction/image rights.
-- Every partner remains inactive until authorized source access is recorded.

insert into public.ha_import_partners (
  slug, name, listing_hosts, image_hosts, permission_ref,
  can_import, can_republish, can_copy_images, active
) values
  ('scraye', 'Scraye',
    array['www.scraye.com', 'scraye.com', 'agents.scraye.com', 'replmsgh.com', 'replyhar.com'],
    array['assets.scraye.com'], null, false, false, false, false),
  ('campus-living-villages', 'Campus Living Villages',
    array['campuslivingvillages.com', 'www.campuslivingvillages.com'],
    array['cdn.campuslivingvillages.com'], null, false, false, false, false),
  ('housing-anywhere', 'HousingAnywhere',
    array['housinganywhere.com', 'www.housinganywhere.com'],
    '{}'::text[], null, false, false, false, false);

-- Supabase documents bucket creation by SQL:
-- https://supabase.com/docs/guides/storage/buckets/creating-buckets
-- Only the bucket is created here. Upload image bytes through the Storage API;
-- never insert or update storage.objects directly.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'ha-import-staging', 'ha-import-staging', false, 5242880,
  array['image/jpeg', 'image/png', 'image/webp']
);
