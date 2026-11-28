-- Run only inside an explicit transaction that ends in ROLLBACK. To test fresh
-- setup atomically: BEGIN; SET LOCAL lock_timeout='3s'; SET LOCAL
-- statement_timeout='30s'; <setup.sql>; <verify.sql>; ROLLBACK;
-- This file writes only synthetic records to the four new staging tables.
-- It does not modify the live catalogue, Storage metadata or project settings.

do $verify$
declare
  table_name text;
  role_name text;
  privilege_name text;
  test_run_id uuid := gen_random_uuid();
  second_run_id uuid := gen_random_uuid();
  test_partner_slug text := 'verification-' || replace(gen_random_uuid()::text, '-', '');
  test_manifest_hash text := repeat('a', 64);
  test_payload_hash text := repeat('b', 64);
  affected integer;
  violated_constraint text;
begin
  foreach table_name in array array[
    'ha_import_partners', 'ha_import_runs', 'ha_import_items', 'ha_import_media_sources'
  ] loop
    if not exists (
      select 1 from pg_class c join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public' and c.relname = table_name
        and c.relkind = 'r' and c.relrowsecurity
    ) then
      raise exception 'Expected staging table with RLS enabled: %', table_name;
    end if;

    foreach role_name in array array['anon', 'authenticated'] loop
      foreach privilege_name in array array['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'REFERENCES', 'TRIGGER'] loop
        if has_table_privilege(role_name, 'public.' || table_name, privilege_name) then
          raise exception 'Unexpected client grant: % %.%', role_name, table_name, privilege_name;
        end if;
      end loop;
    end loop;

    foreach privilege_name in array array['SELECT', 'INSERT', 'UPDATE'] loop
      if not has_table_privilege('service_role', 'public.' || table_name, privilege_name) then
        raise exception 'Missing importer grant: %.%', table_name, privilege_name;
      end if;
    end loop;

    if exists (select 1 from pg_policies where schemaname = 'public' and tablename = table_name) then
      raise exception 'Staging unexpectedly has a client RLS policy: %', table_name;
    end if;
  end loop;

  insert into public.ha_import_partners (slug, name)
    values (test_partner_slug, 'Synthetic verification partner');
  if exists (select 1 from public.ha_import_partners p where p.slug = test_partner_slug
      and (p.can_import or p.can_republish or p.can_copy_images or p.active)) then
    raise exception 'Partner must default to inactive with no recorded rights';
  end if;

  begin
    update public.ha_import_partners set can_import = true where slug = test_partner_slug;
    raise exception 'Permission reference constraint failed';
  exception when check_violation then null;
  end;

  insert into public.ha_import_runs (id, partner_slug, manifest_hash)
    values (test_run_id, test_partner_slug, test_manifest_hash);
  begin
    insert into public.ha_import_runs (partner_slug, manifest_hash)
      values (test_partner_slug, test_manifest_hash);
    raise exception 'Repeated partner/manifest must not create another run';
  exception when unique_violation then null;
  end;

  -- Different manifests may coexist historically, but not as active workers.
  insert into public.ha_import_runs (id, partner_slug, manifest_hash, status)
    values (second_run_id, test_partner_slug, repeat('c', 64), 'staged');
  begin
    insert into public.ha_import_runs (partner_slug, manifest_hash)
      values (test_partner_slug, repeat('d', 64));
    raise exception 'Different manifests must not run concurrently for one partner';
  exception when unique_violation then
    get stacked diagnostics violated_constraint = constraint_name;
    if violated_constraint <> 'ha_import_one_active_run' then
      raise exception 'Unexpected constraint for overlapping partner runs: %', violated_constraint;
    end if;
  end;

  insert into public.ha_import_items (run_id, external_id, payload, payload_hash, action)
    values (test_run_id, 'fixture-property', '{"name":"Fixture only"}', test_payload_hash, 'hold');
  insert into public.ha_import_items (run_id, external_id, payload, payload_hash, action)
    values (test_run_id, 'fixture-property', '{"name":"Fixture changed"}', test_payload_hash, 'hold')
    on conflict (run_id, external_id) do update set payload = excluded.payload;
  if (select count(*) from public.ha_import_items i where i.run_id = test_run_id) <> 1 then
    raise exception 'Item upsert must retain one source identity';
  end if;

  begin
    update public.ha_import_items set canonical_property_id = gen_random_uuid()
      where ha_import_items.run_id = test_run_id;
    raise exception 'Canonical property link must reference an existing property';
  exception when foreign_key_violation then null;
  end;

  begin
    update public.ha_import_items set gallery = '{}'::jsonb where ha_import_items.run_id = test_run_id;
    raise exception 'Gallery must be a JSON array';
  exception when check_violation then null;
  end;

  begin
    insert into public.ha_import_media_sources (partner_slug, source_url, status)
      values (test_partner_slug, 'https://example.invalid/synthetic.jpg', 'uploaded');
    raise exception 'Uploaded media must include verified object metadata';
  exception when check_violation then null;
  end;

  -- Lease ownership uses a conditional UPDATE. A second worker sees no match.
  update public.ha_import_runs set status = 'staged' where id = test_run_id;
  update public.ha_import_runs set status = 'staging', updated_at = clock_timestamp()
    where id = test_run_id and status in ('staged', 'failed');
  get diagnostics affected = row_count;
  if affected <> 1 then raise exception 'Initial lease claim failed'; end if;
  update public.ha_import_runs set status = 'staging', updated_at = clock_timestamp()
    where id = test_run_id and status in ('staged', 'failed');
  get diagnostics affected = row_count;
  if affected <> 0 then raise exception 'Second worker unexpectedly obtained the same lease'; end if;

  begin
    update public.ha_import_runs set status = 'staging', updated_at = clock_timestamp()
      where id = second_run_id and status in ('staged', 'failed');
    raise exception 'A different existing manifest must not acquire an overlapping partner lease';
  exception when unique_violation then
    get stacked diagnostics violated_constraint = constraint_name;
    if violated_constraint <> 'ha_import_one_active_run' then
      raise exception 'Unexpected constraint for overlapping partner lease: %', violated_constraint;
    end if;
  end;

  update public.ha_import_runs set status = 'staged', updated_at = clock_timestamp()
    where id = test_run_id;
  update public.ha_import_runs set status = 'staging', updated_at = clock_timestamp()
    where id = second_run_id and status in ('staged', 'failed');
  get diagnostics affected = row_count;
  if affected <> 1 then raise exception 'Next manifest must acquire lease after previous completion'; end if;
end;
$verify$;

select 'Staging grants, defaults, constraints, item upsert, canonical FK, item lease and partner concurrency checks passed' as verification;
