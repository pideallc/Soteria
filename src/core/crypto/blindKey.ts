import type { BlindKey, BlindingFactor } from './types.js';
import { sha256 } from './sha256.js';

/**
 * Generates a cryptographically secure random blinding factor (salt).
 * Uses crypto.getRandomValues for true randomness — not Math.random.
 *
 * The blinding factor ensures that even if two users share the same
 * email, their blind keys are different (unlinkability).
 */
export function generateBlindingFactor(): BlindingFactor {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('') as BlindingFactor;
}

/**
 * Creates a blind key by combining the plaintext identifier with
 * a blinding factor before hashing. This provides:
 *
 * 1. Irreversibility — SHA-256 cannot be reversed
 * 2. Unlinkability — the salt means identical inputs produce different keys
 * 3. Determinism — the same input + salt always produces the same key
 *
 * After this function returns, the caller MUST nullify any variable
 * holding the plaintext input. The blind key is the only value that
 * should persist.
 */
export async function createBlindKey(
  plaintext: string,
  salt: BlindingFactor
): Promise<BlindKey> {
  const combined = `${salt}:${plaintext}`;
  return sha256(combined);
}
