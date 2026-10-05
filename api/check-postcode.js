/**
 * POST /api/check-postcode  { "postcode": "NG1 5FF" }  →  { "status": "in" | "out" | "notfound" | "invalid" | "failed" }
 *
 * Server-side service-area check (Vercel Function). The centre point is read
 * from environment variables so it never ships to the browser or the public
 * repo: SERVICE_CENTRE_LAT, SERVICE_CENTRE_LNG, SERVICE_RADIUS_MILES (default 15).
 * Postcodes are looked up with postcodes.io and are not stored or logged.
 */
const FULL_RE = /^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/;
const OUTWARD_RE = /^[A-Z]{1,2}\d[A-Z\d]?$/;

function milesBetween(a, b) {
  const R = 3958.8;
  const rad = (d) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

async function lookup(compact) {
  if (FULL_RE.test(compact)) {
    const r = await fetch('https://api.postcodes.io/postcodes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postcodes: [compact] }),
    });
    if (!r.ok) throw new Error(`postcodes.io ${r.status}`);
    return (await r.json())?.result?.[0]?.result || null;
  }
  const r = await fetch(`https://api.postcodes.io/outcodes/${encodeURIComponent(compact)}`);
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`postcodes.io ${r.status}`);
  return (await r.json())?.result || null;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ status: 'failed' });
  }
  const lat = Number(process.env.SERVICE_CENTRE_LAT);
  const lng = Number(process.env.SERVICE_CENTRE_LNG);
  const radius = Number(process.env.SERVICE_RADIUS_MILES || 15);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return res.status(500).json({ status: 'failed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  const compact = String(body?.postcode || '').replace(/\s+/g, '').toUpperCase().slice(0, 8);
  if (!FULL_RE.test(compact) && !OUTWARD_RE.test(compact)) {
    return res.status(200).json({ status: 'invalid' });
  }

  try {
    const result = await lookup(compact);
    if (!result || result.latitude == null) return res.status(200).json({ status: 'notfound' });
    const miles = milesBetween({ lat, lng }, { lat: result.latitude, lng: result.longitude });
    return res.status(200).json({ status: miles <= radius ? 'in' : 'out' });
  } catch {
    return res.status(502).json({ status: 'failed' });
  }
}
