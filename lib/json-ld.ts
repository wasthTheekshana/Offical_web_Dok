/**
 * Safely serialise a JSON-LD object for injection into a <script> tag.
 * JSON.stringify alone does not escape </script>, which can allow a
 * malicious string (e.g. from DB content) to break out of the script block.
 * This replaces <, >, and & with their Unicode escape equivalents.
 */
export function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}
