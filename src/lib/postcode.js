/**
 * Postcode → service-area check. The browser only sends the postcode to our
 * own /api/check-postcode function (api/check-postcode.js), which holds the
 * private centre point and replies "in" or "out". Accepts a full postcode
 * ("NG10 1AA") or an outward code ("NG10").
 */
const FULL_RE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
const OUTWARD_RE = /^[A-Z]{1,2}\d[A-Z\d]?$/i;

export function normalisePostcode(value) {
  const compact = (value || '').replace(/\s+/g, '').toUpperCase();
  return compact.length > 4 ? `${compact.slice(0, -3)} ${compact.slice(-3)}` : compact;
}

export function isPostcodeLike(value) {
  const v = (value || '').trim();
  return FULL_RE.test(v) || OUTWARD_RE.test(v.replace(/\s+/g, ''));
}

/** @returns {Promise<{status: 'in'|'out'|'notfound'|'failed', postcode: string}>} */
export async function checkPostcode(input, { signal } = {}) {
  const postcode = normalisePostcode(input);
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}api/check-postcode`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postcode }),
      signal,
    });
    const json = await res.json().catch(() => ({}));
    const status = json?.status === 'invalid' ? 'notfound' : json?.status;
    return { status: ['in', 'out', 'notfound'].includes(status) ? status : 'failed', postcode };
  } catch (err) {
    if (err?.name === 'AbortError') throw err;
    return { status: 'failed', postcode };
  }
}
