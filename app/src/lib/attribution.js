// Attribution identifiers captured on the landing and sent with the lead, so the WhatsApp conversation
// (Conversation ID → Lead ID → CRM) can be joined back to the ad click that started it.
const storageKey = 'mb-attribution';
const urlParams = { utm_source: 'source', utm_medium: 'medium', utm_campaign: 'campaign', gclid: 'gclid', wbraid: 'wbraid', gbraid: 'gbraid' };

function readCookie(name) {
  return document.cookie.split('; ').find((row) => row.startsWith(`${name}=`))?.split('=').slice(1).join('=') || '';
}

// _ga = "GA1.1.<random>.<timestamp>" → client_id "<random>.<timestamp>".
function gaClientId() {
  return readCookie('_ga').split('.').slice(2).join('.');
}

// _ga_<container> is "GS1.1.<session>.…" (legacy) or "GS2.1.s<session>$o…" (current).
function gaSessionId() {
  const cookie = document.cookie.split('; ').find((row) => /^_ga_[A-Z0-9]+=/.test(row))?.split('=')[1] || '';
  if (cookie.startsWith('GS1.')) return cookie.split('.')[2] || '';
  return cookie.match(/[.$]s(\d+)/)?.[1] || '';
}

function readStored() {
  try { return JSON.parse(sessionStorage.getItem(storageKey) || '{}'); } catch { return {}; }
}

// First touch within the session wins: a later internal navigation without UTMs must not erase them.
export function captureAttribution() {
  const stored = readStored();
  const search = new URLSearchParams(window.location.search);
  let changed = false;
  for (const [param, key] of Object.entries(urlParams)) {
    const value = search.get(param);
    if (value && !stored[key]) { stored[key] = value.slice(0, 200); changed = true; }
  }
  if (!stored.landing_page) { stored.landing_page = window.location.pathname; changed = true; }
  if (changed) {
    try { sessionStorage.setItem(storageKey, JSON.stringify(stored)); } catch { /* storage blocked: keep in-memory values only */ }
  }
  return stored;
}

export function getAttribution() {
  return { ...captureAttribution(), client_id: gaClientId(), session_id: gaSessionId(), referrer: document.referrer || '' };
}

export function newClickId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
