/**
 * Safely serializes a JSON-LD object for injection into a <script type="application/ld+json">
 * tag via dangerouslySetInnerHTML.
 *
 * JSON.stringify() escapes quotes and control characters but does NOT escape
 * `<`. If any string value in the object ever contains a literal
 * `</script>` (e.g. a host name or description sourced from a community
 * submission), the browser's HTML parser will close the script tag early
 * and treat whatever follows as new, executable markup — a real XSS vector
 * for JSON embedded in HTML, not a theoretical one.
 *
 * Replacing `<` with its unicode escape (`\u003c`) keeps the value valid
 * inside a JSON string (unicode escapes are valid JSON) while making it
 * impossible for the HTML parser to ever see a literal `<` in the output,
 * so `</script>` can never appear.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
