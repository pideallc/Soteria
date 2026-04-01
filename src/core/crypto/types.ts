/**
 * A SHA-256 hash string — always exactly 64 lowercase hex characters.
 * This branded type prevents accidental confusion with plaintext strings.
 */
export type BlindKey = string & { readonly __brand: 'BlindKey' };

/**
 * The payload structure that is safe to store in a database.
 * Contains ONLY the blind key — never plaintext PII fields.
 */
export interface BlindKeyPayload {
  blindedKey: BlindKey;
  createdAt: Date | { seconds: number; nanoseconds: number };
  protocol: 'SHA-256_V1';
  status: 'pending_verification' | 'verified' | 'revoked';
}

/**
 * A cryptographically secure blinding factor (salt).
 * Generated per-user, stored in isolated encrypted storage.
 */
export type BlindingFactor = string & { readonly __brand: 'BlindingFactor' };
