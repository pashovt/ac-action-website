/**
 * Enquiry form logic, kept separate from the UI so a real endpoint can be
 * added later without touching the component.
 *
 * DEMO BEHAVIOUR: `submitEnquiry` never sends or stores anything. It returns
 * a summary built from the values held in component state.
 */

export const EMPTY_ENQUIRY = {
  name: '',
  email: '',
  business: '',
  postcode: '',
  siteType: '',
  dailyUsers: '',
  message: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Lenient UK postcode check (e.g. "SW1A 1AA", "m1 1ae"). Not an address lookup.
const POSTCODE_RE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

export const MAX_MESSAGE = 800;

/** Returns an object of field -> error message. Empty object means valid. */
export function validateEnquiry(values) {
  const errors = {};
  const v = (k) => (values[k] || '').trim();

  if (!v('name')) errors.name = 'Enter a contact name.';
  if (!v('email')) errors.email = 'Enter a work email address.';
  else if (!EMAIL_RE.test(v('email'))) errors.email = 'Enter an email address in the format name@company.co.uk.';
  if (!v('business')) errors.business = 'Enter the business or site name.';
  if (!v('postcode')) errors.postcode = 'Enter the site postcode.';
  else if (!POSTCODE_RE.test(v('postcode'))) errors.postcode = 'Enter a valid UK postcode, for example SW1A 1AA.';
  if (!v('siteType')) errors.siteType = 'Select a site type.';
  if (v('message').length > MAX_MESSAGE) errors.message = `Keep additional information under ${MAX_MESSAGE} characters.`;

  return errors;
}

export function normalisePostcode(value) {
  const compact = (value || '').replace(/\s+/g, '').toUpperCase();
  return compact.length > 3 ? `${compact.slice(0, -3)} ${compact.slice(-3)}` : compact;
}

/**
 * Demo submission. Replace the body of this function with a real request
 * (for example `fetch('/api/enquiry', { method: 'POST', ... })`) once a
 * privacy notice, data handling process and endpoint are in place.
 */
export async function submitEnquiry(values) {
  const clean = Object.fromEntries(Object.entries(values).map(([k, val]) => [k, (val || '').trim()]));
  clean.postcode = normalisePostcode(clean.postcode);
  return { sent: false, summary: clean };
}
