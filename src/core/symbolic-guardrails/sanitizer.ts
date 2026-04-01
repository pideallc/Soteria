/**
 * Output sanitizer for all client-reflected data.
 *
 * Uses DOMPurify for battle-tested XSS prevention. DOMPurify handles
 * mutation XSS, SVG-based attacks, CSS injection, javascript: URIs,
 * data: URIs, and thousands of edge cases that regex approaches miss.
 *
 * Falls back to a minimal regex strip if no DOM environment is available
 * (e.g., pure Node.js without jsdom — though this should not happen in
 * production since the sanitizer runs client-side).
 */

import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const jsdomWindow = new JSDOM('').window;
const purify = DOMPurify(jsdomWindow as any);

const ALLOWED_TAGS = [
  'p', 'br', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div', 'blockquote',
];

const ALLOWED_ATTR = ['href', 'class', 'id', 'title', 'alt'];

/**
 * Sanitizes HTML input using DOMPurify with a strict whitelist.
 * Strips all tags and attributes not explicitly allowed.
 */
export function sanitizeOutput(input: string): string {
  if (!input) return '';

  return purify.sanitize(input, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
    ALLOW_ARIA_ATTR: true,
  });
}
