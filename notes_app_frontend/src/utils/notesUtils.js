/**
 * PUBLIC_INTERFACE
 * Generate a random, URL-safe id.
 */
export function generateId() {
  // Prefer browser crypto if available
  const hasWindow = typeof window !== 'undefined';
  const hasCrypto =
    hasWindow &&
    window.crypto &&
    typeof window.crypto.getRandomValues === 'function';

  const bytes = hasCrypto
    ? window.crypto.getRandomValues(new Uint8Array(16))
    : Array.from({ length: 16 }, () => Math.floor(Math.random() * 256));

  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }

  // Base64 URL-safe
  const base64 = (typeof btoa === 'function'
    ? btoa(binary)
    // eslint-disable-next-line no-undef
    : (typeof Buffer !== 'undefined'
        ? Buffer.from(binary, 'binary').toString('base64')
        : binary))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return base64;
}

/**
 * PUBLIC_INTERFACE
 * Filter notes by a query string against title and content.
 * Returns notes sorted by updatedAt desc.
 */
export function filterNotes(notes, query) {
  const list = Array.isArray(notes) ? notes.slice() : [];
  if (!query) {
    return list.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  }
  const q = String(query).toLowerCase();
  return list
    .filter((n) => {
      const title = String(n.title || '').toLowerCase();
      const content = String(n.content || '').toLowerCase();
      return title.includes(q) || content.includes(q);
    })
    .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
}
