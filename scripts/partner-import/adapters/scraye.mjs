// Runs in the authenticated listing tab's read-only DOM context.
export function readScrayeListing() {
  const title = document.querySelector('h1');
  const header = title?.parentElement?.parentElement?.innerText ?? '';
  const breadcrumb = header.split('\n').find(line => /\/\s*\d+#$/.test(line));
  const segments = breadcrumb?.split(/\s+\/\s+/) ?? [];
  const price = header.match(/RENT PER MONTH\s+£([\d,]+(?:\.\d{2})?)\s*pm/i);
  const availability = header.match(/^Available (.+)$/im)?.[1];
  const features = document.querySelector('#features')?.innerText.split(/Recent activity/i)[0].trim();
  const disclaimer = header.split('\n').find(line => /photos.*illustrative purposes/i.test(line));
  const gallery = [...document.querySelectorAll('#rooms img')].map(img => ({
    url: img.getAttribute('src'), alt: img.alt || null,
  }));
  const galleryCount = Number(header.match(/View all (\d+) photos/i)?.[1]);
  const id = location.pathname.match(/^\/listings\/([a-z\d]+)\/?$/i)?.[1];
  if (location.origin !== 'https://agents.scraye.com' || !id || !price || !title || !features ||
      segments.length < 3 || !availability || !gallery.length || (galleryCount && galleryCount !== gallery.length) ||
      gallery.some(img => !img.url?.startsWith('https://assets.scraye.com/')) ||
      (/^Illustrative$/im.test(header) && !disclaimer)) throw new Error('Incomplete Scraye listing');
  const postcode = title.innerText.match(/,\s*([A-Z]{1,2}\d[A-Z\d]?(?:\s+\d[A-Z]{2})?)\.?$/i)?.[1];
  if (!postcode) throw new Error('Missing advertised postcode district');
  const observed = new Date().toISOString();
  const name = title.innerText.trim();
  return {
    external_id: id, source_url: location.href, ...(location.search ? { referral_url: location.href } : {}), name, address: segments.at(-2), city: segments[0], postcode,
    country: 'GB', listing_reference: segments.at(-1), media_disclaimer: disclaimer || null,
    additional_charges: features.split(/\n/).map(line => line.trim()).filter(line => /(?:additional|laundry|utilities|occupancy).*£|£.*(?:additional|charge)/i.test(line)),
    description: features, property_facts: header.split(/View all \d+ photos/i).at(-1).trim(),
    images: gallery, rooms: [{external_id: id, name, images: [], offers: [{
      external_id: id, currency: 'GBP', period: 'month', observed_at: observed, status: availability,
      price_minor: Math.round(Number(price[1].replaceAll(',', '')) * 100),
    }]}],
  };
}

// The Photos view has a different order and larger assets than the Rooms slider.
export function readScrayeGallery() {
  const count = document.body.innerText.match(/^(\d+) photos?$/im);
  const images = [...document.querySelectorAll('img')].filter(img => {
    const src = img.getAttribute('src');
    return src && src.startsWith('https://assets.scraye.com/photos/');
  }).map(img => ({ url: img.getAttribute('src'), alt: img.alt || null }));
  if (!count || images.length !== Number(count[1]) || !images.length)
    throw new Error('Full gallery count did not reconcile');
  return images;
}
