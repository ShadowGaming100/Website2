/**
 * Converts a host name to a URL-safe slug.
 * Pure function, edge-runtime safe.
 *
 * Steps (in order):
 * 1. Lowercase the input.
 * 2. Replace each whitespace sequence with a single hyphen.
 * 3. Remove all characters that are not [a-z0-9-].
 * 4. Collapse consecutive hyphens into a single hyphen.
 * 5. Strip leading and trailing hyphens.
 */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}
