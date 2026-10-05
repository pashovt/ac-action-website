/**
 * Analytics (Microsoft Clarity + UTM capture), per the studio's web standard.
 *
 * OFF BY DEFAULT: nothing loads and nothing is stored unless VITE_CLARITY_ID
 * is set at build time. Before enabling, update the privacy policy to cover
 * session recording and add a cookie-consent banner (UK GDPR / PECR).
 */
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID || '';
const UTM_KEY = 'ac_utm';
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];

export const analyticsEnabled = Boolean(CLARITY_ID);

export function initAnalytics() {
  if (!analyticsEnabled || typeof window === 'undefined') return;
  /* eslint-disable */
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', CLARITY_ID);
  /* eslint-enable */
  captureAndStoreUtm();
}

export function captureAndStoreUtm() {
  if (!analyticsEnabled) return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found = Object.fromEntries(UTM_PARAMS.filter((k) => params.get(k)).map((k) => [k, params.get(k)]));
    if (Object.keys(found).length) localStorage.setItem(UTM_KEY, JSON.stringify({ ...found, ts: Date.now() }));
  } catch {
    /* storage unavailable: ignore */
  }
}

export function trackEvent(name, meta) {
  if (!analyticsEnabled || typeof window === 'undefined' || typeof window.clarity !== 'function') return;
  try {
    window.clarity('event', name);
    if (meta) Object.entries(meta).forEach(([k, v]) => window.clarity('set', k, String(v)));
  } catch {
    /* never break the page for analytics */
  }
}
