import type { BlindKey } from './types.js';

/**
 * Computes a SHA-256 hash of the input using the Web Crypto API.
 * The input is normalized (lowercased, trimmed) before hashing to
 * ensure deterministic output for equivalent inputs.
 *
 * This function is the core of the Blind Key Protocol — it transforms
 * plaintext PII into an irreversible 64-character hex string that can
 * be stored, compared, and communicated without exposing the original.
 *
 * Runs entirely client-side. The plaintext never leaves the caller's
 * execution context.
 */
export async function sha256(message: string): Promise<BlindKey> {
  const normalized = message.toLowerCase().trim();
  const msgBuffer = new TextEncoder().encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('') as BlindKey;
}
