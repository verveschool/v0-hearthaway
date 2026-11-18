begin;
set local search_path = pg_catalog, pg_temp;
select pg_advisory_xact_lock(hashtext('hearthaway catalogue import'));
create temp table batch on commit drop as
select * from catalogue_staging.source_snapshots
where source_commit=current_setting('ha.source_commit')
  and snapshot->>'digest' ~ '^[0-9a-f]{64}$'
  and snapshot ? 'catalogueMetadata';
create temp table props on commit drop as
select p.value d, b.snapshot->replace(c.key,'publishedOutput','rawAdapterOutput')->(p.ordinality::int-1) raw,
       split_part(c.key,'_',2)::int+p.ordinality::int pos
from batch b cross join lateral jsonb_each(b.snapshot) c
cross join lateral jsonb_array_elements(case when c.key ~ '^publishedOutput_[0-9]+$' then c.value else '[]' end)
with ordinality p;
create temp table units on commit drop as
with mappings as (
  select m.value d,row_number() over(partition by m.value->>'propertySlug'
    order by split_part(c.key,'_',2)::int,m.ordinality) pos
  from batch b cross join lateral jsonb_each(b.snapshot) c
  cross join lateral jsonb_array_elements(case when c.key ~ '^sourceRoomMappings_[0-9]+$' then c.value else '[]' end)
  with ordinality m
)
select p.d->>'slug' parent,p.d->>'provider' provider,p.d->>'country' country,m.d identity,r.value d,p.raw->'roomTypes'->(r.ordinality::int-1) raw,
       r.ordinality::int ordinal,row_number() over(order by p.pos,r.ordinality)::int pos
from props p cross join lateral jsonb_array_elements(p.d->'roomTypes') with ordinality r
join mappings m on m.d->>'propertySlug'=p.d->>'slug' and m.pos=r.ordinality;
do $$
begin
  if (select count(*) from props)<>73 or (select count(*) from units)<>374
     or exists(select from props where raw->>'slug' is distinct from d->>'slug')
     or exists(select from units where raw is null or identity->>'slug' is null)
  then raise exception 'Unexpected snapshot counts or unresolved identity'; end if;
end $$;
insert into catalogue.providers select distinct d->>'provider' from props on conflict do nothing;
insert into catalogue.cities(country,name,guide_slug)
select distinct coalesce(p.d->>'country',''),p.d->>'city',g.value->>'slug'
from props p cross join batch b
left join lateral jsonb_array_elements(b.snapshot->'catalogueMetadata'->'cityGuides') g
  on lower(g.value->>'name')=lower(p.d->>'city') and g.value->>'country'=p.d->>'country'
on conflict(country,name) do update set guide_slug=excluded.guide_slug;

insert into catalogue.universities(slug,name,country,city,city_id)
select g.value->>'slug',g.value->>'name',market.country,g.value->>'city',c.id
from batch b cross join lateral jsonb_array_elements(b.snapshot->'catalogueMetadata'->'universityGuides') g
cross join lateral (
  select case g.value->>'country' when 'UK' then 'United Kingdom' else g.value->>'country' end country
) market
left join catalogue.cities c on c.country=market.country and (
  c.guide_slug=g.value->>'citySlug' or (g.value->>'citySlug' is null and lower(c.name)=lower(g.value->>'city'))
)
on conflict(slug) do update set name=excluded.name,country=excluded.country,city=excluded.city,city_id=excluded.city_id;
insert into catalogue.properties(slug,provider,city_id,source_key,source_brand,source_url)
select p.d->>'slug',p.d->>'provider',c.id,coalesce(p.raw->>'sourceId',p.raw->>'key'),
       p.raw->>'sourceBrand',p.raw->>'sourceUrl'
from props p join catalogue.cities c on c.country=coalesce(p.d->>'country','') and c.name=p.d->>'city'
on conflict(slug) do nothing;
insert into catalogue.rooms(slug,property_id,source_key,identity_basis)
select u.identity->>'slug',p.id,u.identity->>'providerKey',u.identity->>'basis'
from units u join catalogue.properties p on p.slug=u.parent
on conflict(slug) do nothing;
do $$
begin
  if exists(select from props i join catalogue.properties p on p.slug=i.d->>'slug'
    where p.provider is distinct from i.d->>'provider' or p.source_key is distinct from coalesce(i.raw->>'sourceId',i.raw->>'key'))
  or exists(select from units u join catalogue.rooms r on r.slug=u.identity->>'slug'
    join catalogue.properties p on p.id=r.property_id
    where p.slug is distinct from u.parent or r.source_key is distinct from u.identity->>'providerKey'
       or r.identity_basis is distinct from u.identity->>'basis')
  then raise exception 'Existing slug maps to a different source'; end if;
end $$;
-- Refresh source-owned relationships while preserving the property and room UUIDs.
delete from catalogue.buildings d using catalogue.properties p, props i
where d.property_id=p.id and p.slug=i.d->>'slug';
insert into catalogue.buildings(property_id,ordinal,name,address,postcode,source_url,source_units_available)
select p.id,a.ordinality,a.value->>'name',a.value->>'address',a.value->>'postcode',
  b.snapshot->'catalogueMetadata'->'vitaBuildings'->(i.raw->>'key')->(a.ordinality::int-1)->>'externalLink',
  (a.value->>'unitsAvailable')::int
from props i join catalogue.properties p on p.slug=i.d->>'slug' cross join batch b
cross join lateral jsonb_array_elements(i.raw->'buildings') with ordinality a;

delete from catalogue.property_universities d using catalogue.properties p, props i
where d.property_id=p.id and p.slug=i.d->>'slug';
insert into catalogue.property_universities(property_id,ordinal,source_label,university_slug)
select p.id,a.ordinality,a.value,u.slug
from props i join catalogue.properties p on p.slug=i.d->>'slug'
cross join lateral jsonb_array_elements_text(i.raw->'universities') with ordinality a
left join lateral (
  select min(slug) slug from catalogue.universities
  where city_id=p.city_id and
    regexp_replace(lower(name),'^the ','')=regexp_replace(lower(btrim(split_part(a.value,',',1))),'^the ','')
  having count(*)=1
) u on true;

insert into public.ha_catalogue_properties
select p.id,p.slug,p.provider,i.d->>'city',i.d->>'country',i.pos,
  lower(concat_ws(' ',i.d->>'name',i.d->>'city',coalesce(i.d->>'country',''),
    coalesce(i.d->>'address',''),coalesce(i.d->>'description',''),
    (select string_agg(value,' ' order by ordinality) from jsonb_array_elements_text(i.d->'universities') with ordinality),
    (select string_agg(coalesce(value->>'name',''),' ' order by ordinality) from jsonb_array_elements(i.d->'buildings') with ordinality),
    (select string_agg(value->>'name',' ' order by ordinality) from jsonb_array_elements(i.d->'roomTypes') with ordinality))),
  (select jsonb_object_agg(key,value) from jsonb_each(i.d) where key in
    ('provider','slug','city','country','name','address','description','coverImage','gallery','galleryLabels',
    'amenities','inclusions','roomFeatures','contractTerms','depositNote','distance','universities','propertyPriceLabel',
    'highlights','facilities','transportConnections','landmarks','locationInfo','policies'))
  || jsonb_build_object('key',p.slug,'buildings',
    (select coalesce(jsonb_agg(jsonb_build_object('name',value->'name','address',value->'address',
      'postcode',value->'postcode','unitsAvailable',null) order by ordinality),'[]')
    from jsonb_array_elements(i.d->'buildings') with ordinality))
from props i join catalogue.properties p on p.slug=i.d->>'slug'
on conflict(id) do update set payload=excluded.payload,search_text=excluded.search_text;
insert into public.ha_catalogue_rooms
select r.id,r.slug,r.property_id,i.ordinal,i.pos,
  lower(concat_ws(' ',i.d->>'name',p.payload->>'name',p.city,p.country,p.provider)),
  (select jsonb_object_agg(key,value) from jsonb_each(i.d) where key in
    ('name','description','accommodationFormat','configuration','image','images','imageLabels','priceLabel',
    'nightlyPriceLabel','minimumOccupancy','maximumOccupancy','features','floorplan','floorplans','floorplanNote',
    'publishedAreaSqm','bedroomFeatures','bathroomFeatures','kitchenFeatures','furnishings','appliances','storage','studyFacilities'))
  || jsonb_build_object('priceFrom',i.d->'priceFrom','pricePerNight',i.d->'pricePerNight',
    'academicYear',null,'available',null,'status',null)
from units i join catalogue.rooms r on r.slug=i.identity->>'slug'
join public.ha_catalogue_properties p on p.id=r.property_id
on conflict(id) do update set payload=excluded.payload,search_text=excluded.search_text;
insert into catalogue.price_observations
select b.source_commit,r.property_id,r.id,r.slug||':'||v.key,v.amount,v.currency,v.period,v.url,v.academic_year,v.status,
       case when v.key='source-monthly' then 'published' else i.raw->>'priceConfidence' end,v.source
from units i join catalogue.rooms r on r.slug=i.identity->>'slug' cross join batch b
cross join lateral (
  select key,amount,
    case when i.provider='iglu' then 'AUD' when i.provider='study-inn' or i.country='United Kingdom' then 'GBP'
         when i.provider in ('stacey','neonwood') then 'EUR' end currency,
    case when i.provider='vita-student' and i.country is distinct from 'United Kingdom' then null else period end period,
    i.raw->>'priceSourceUrl' url,i.raw->>'academicYear' academic_year,i.raw->>'status' status,
    jsonb_build_object('basis',i.raw->'pricingBasis','label',i.raw->'priceLabel','layer','adapter') source
  from (values ('weekly',(i.raw->>'priceFrom')::numeric,'week'),('nightly',(i.raw->>'pricePerNight')::numeric,'night')) v(key,amount,period)
  where amount is not null
  union all
  select 'source-monthly',(m.d->>'amount')::numeric,'EUR','month',
    i.raw->>'priceSourceUrl',i.raw->>'academicYear',i.raw->>'status',
    jsonb_build_object('layer','provider','label',m.d->'label')
  from (select b.snapshot->'catalogueMetadata'->'monthlyPrices'->i.parent->(i.ordinal-1) d) m
  where m.d->>'amount' is not null
  union all
  select 'offer-'||ordinality,(value->>'amount')::numeric,value->>'currency',value->>'billingPeriod',
    value->>'sourceUrl',value->>'academicYear',value->>'status',value
  from jsonb_array_elements(coalesce(i.raw->'pricingOptions','[]')) with ordinality
) v on conflict do nothing;
insert into catalogue.price_observations
select b.source_commit,p.id,null,p.slug||':property',(i.raw->>'propertyPriceFrom')::numeric,
       case when i.d->>'provider'='study-inn' then 'GBP' end,
       case when i.d->>'provider'='study-inn' then 'week' end,
  i.raw->>'propertyPriceSourceUrl',null,null,i.raw->>'propertyPriceConfidence',
  jsonb_build_object('basis',i.raw->'propertyPricingBasis','label',i.raw->'propertyPriceLabel')
from props i join catalogue.properties p on p.slug=i.d->>'slug' cross join batch b
where i.raw->>'propertyPriceFrom' is not null on conflict do nothing;
insert into catalogue.media(property_id,room_id,source_commit,ordinal,role,url,label,provenance)
select p.id,r.id,b.source_commit,split_part(c.key,'_',2)::int+m.ordinality::int,m.value->>'role',m.value->>'url',
  coalesce(i.d->'imageLabels'->>(m.value->>'url'),h.payload->'galleryLabels'->>(m.value->>'url')),
  coalesce(b.snapshot->'catalogueMetadata'->'imageAttribution'->(m.value->>'url'),
           case when p.provider='neonwood' then jsonb_build_object('evidence','docs/neonwood-provider-evidence.md') end,
           case when p.provider='vita-student' then jsonb_build_object('sourceUrl',m.value->>'url') end)
from batch b cross join lateral jsonb_each(b.snapshot) c
cross join lateral jsonb_array_elements(case when c.key ~ '^mediaReferences_[0-9]+$' then c.value else '[]' end)
with ordinality m
join catalogue.properties p on p.slug=m.value->>'propertySlug'
join public.ha_catalogue_properties h on h.id=p.id
left join units i on i.parent=p.slug and i.ordinal=(m.value->>'roomIndex')::int+1
left join catalogue.rooms r on r.slug=i.identity->>'slug'
on conflict do nothing;
do $$
begin
  if (select count(*) from public.ha_catalogue_properties)<>73
     or (select count(*) from public.ha_catalogue_rooms)<>374
     or (select count(*) from catalogue.media where source_commit=current_setting('ha.source_commit'))<>807
     or (select count(*) from catalogue.buildings)<>(select sum(jsonb_array_length(raw->'buildings')) from props)
     or (select count(*) from catalogue.property_universities)<>(select sum(jsonb_array_length(raw->'universities')) from props)
     or (select count(*) from catalogue.price_observations
         where source_commit=current_setting('ha.source_commit') and observation_key like '%:source-monthly') <>
        (select count(*) from batch cross join lateral jsonb_each(snapshot->'catalogueMetadata'->'monthlyPrices') as prices(slug, units)
          cross join lateral jsonb_array_elements(prices.units) as monthly(d) where monthly.d->>'amount' is not null)
  then raise exception 'Catalogue reconciliation failed'; end if;
end $$;
commit;
