/**
 * Output sanitizer for all client-reflected data.
 *
 * Prevents DOM-based XSS by stripping dangerous HTML elements
 * and attributes before any data is reflected back to the user.
 *
 * Uses a whitelist approach: only explicitly safe tags and attributes
 * are preserved. Everything else is stripped.
 */

const SAFE_TAGS = new Set([
  'p', 'br', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div', 'blockquote',
]);

const DANGEROUS_ATTR_PATTERN = /\s+(on\w+|style|srcdoc|formaction)\s*=/gi;

/**
 * Sanitizes HTML by stripping script tags, event handlers, and
 * other dangerous content. Safe structural tags are preserved.
 */
export function sanitizeOutput(input: string): string {
  if (!input) return '';

  let result = input;

  result = result.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  result = result.replace(/<iframe\b[^>]*>.*?<\/iframe>/gi, '');
  result = result.replace(/<object\b[^>]*>.*?<\/object>/gi, '');
  result = result.replace(/<embed\b[^>]*\/?>/gi, '');

  result = result.replace(DANGEROUS_ATTR_PATTERN, ' ');

  result = result.replace(/<(\/?)([\w-]+)([^>]*)>/g, (match, slash, tag, attrs) => {
    const lowerTag = tag.toLowerCase();
    if (SAFE_TAGS.has(lowerTag)) {
      const cleanAttrs = attrs.replace(DANGEROUS_ATTR_PATTERN, ' ');
      return `<${slash}${lowerTag}${cleanAttrs}>`;
    }
    return '';
  });

  return result.trim();
}
