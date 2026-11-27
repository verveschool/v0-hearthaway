-- Export with psql -XAt --set=ON_ERROR_STOP=1 --file=baseline.sql > baseline.json
select jsonb_build_object('properties', coalesce(jsonb_agg(jsonb_build_object(
  'id', p.id, 'slug', p.slug, 'provider', p.provider,
  'source_key', p.source_key, 'source_url', p.source_url,
  'name', h.payload->>'name', 'city', h.payload->>'city',
  'country', h.payload->>'country',
  'address', coalesce(nullif(h.payload#>>'{buildings,0,address}', ''), h.payload->>'address'),
  'postcode', coalesce(nullif(h.payload#>>'{buildings,0,postcode}', ''), h.payload->>'postcode'),
  'payload_hash', prior.payload_hash
) order by p.id), '[]'::jsonb))
from catalogue.properties p
left join public.ha_catalogue_properties h on h.id = p.id
left join lateral (
  select i.payload_hash from public.ha_import_items i
  join public.ha_import_runs r on r.id = i.run_id
  where i.canonical_property_id = p.id and i.status = 'published' and r.status = 'published'
  order by r.updated_at desc, r.id desc limit 1
) prior on true;
