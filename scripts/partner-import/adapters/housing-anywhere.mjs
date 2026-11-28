// Map a delivered outbound JSON snapshot using paths from the agreed feed schema.
// Field paths are arrays of literal keys. No expressions, guessed endpoints or API calls.
function field(record, path, name) {
  if (!Array.isArray(path) || !path.length || path.some(key => typeof key !== 'string' || !key))
    throw new Error('Missing feed mapping for ' + name)
  return path.reduce((node, key) => node && Object.hasOwn(node, key) ? node[key] : undefined, record)
}

export function housingAnywhereManifest(feed, mapping) {
  if (!mapping || mapping.direction !== 'outbound' || mapping.unit !== 'single-rentable-listing')
    throw new Error('A verified outbound single-listing feed mapping is required')
  const header = name => field(feed, mapping.header?.[name], name)
  const records = header('listings')
  const expected = header('expected_count')
  if (header('complete') !== true || !Array.isArray(records) || !records.length || expected !== records.length)
    throw new Error('HousingAnywhere outbound snapshot is incomplete')
  const observed = header('observed_at')
  const properties = records.map(record => {
    const get = name => field(record, mapping.fields?.[name], name)
    if (get('billing_period') !== mapping.monthly_value || !mapping.monthly_value)
      throw new Error('Unexpected HousingAnywhere rent period')
    const id = get('listing_id')
    if (typeof id !== 'string' && !Number.isSafeInteger(id)) throw new Error('Missing stable listing ID')
    const external_id = String(id)
    const name = get('name')
    const photos = get('images')
    if (!Array.isArray(photos)) throw new Error('Missing gallery')
    const images = photos.map(photo => typeof photo === 'string' ? {url: photo} : {
      url: field(photo, mapping.image_url, 'image_url'),
      alt: mapping.image_alt ? field(photo, mapping.image_alt, 'image_alt') : null,
    })
    const offer = {
      external_id, price_minor: get('price_minor'), currency: get('currency'),
      period: 'month', observed_at: observed, status: get('availability'),
    }
    if (mapping.fields.start_date) offer.start_date = get('start_date')
    if (mapping.fields.end_date) offer.end_date = get('end_date')
    const listing = {
      external_id, source_url: get('source_url'), referral_url: get('referral_url'), name,
      address: get('address'), postcode: get('postcode'), city: get('city'), country: get('country'),
      description: get('description'), images, rooms: [{external_id, name, images: [], offers: [offer]}],
    }
    if (!listing.referral_url) throw new Error('Missing tracked referral destination')
    if (mapping.fields.additional_charges) listing.additional_charges = get('additional_charges')
    return listing
  })
  return { schema_version: 1, partner: 'housing-anywhere', complete: true, expected_count: expected,
    observed_at: observed, ...(feed.synthetic === true ? { synthetic: true } : {}), properties }
}
