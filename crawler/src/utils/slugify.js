export function safeSlug(input, fallback) {
  const s = (input ?? '').toString().trim();
  if (!s) return fallback;
  return s
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120) || fallback;
}
