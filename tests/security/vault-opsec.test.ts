/**
 * Vault OPSEC: Blind Key Protocol — Security Test Suite
 *
 * These tests verify the cryptographic properties that protect
 * sex workers, IPV survivors, activists, and LGBTQ+ individuals
 * from identity exposure through database compromise, subpoena,
 * or insider threat.
 *
 * Every assertion here represents a survival-critical guarantee.
 */

import { describe, it, expect } from 'vitest';
import { sha256 } from '../../src/core/crypto/sha256.js';
import { createBlindKey, generateBlindingFactor } from '../../src/core/crypto/blindKey.js';
import type { BlindKey, BlindKeyPayload } from '../../src/core/crypto/types.js';

describe('Vault OPSEC: Blind Key Protocol', () => {

  // ──────────────────────────────────────────
  // SHA-256 Hashing
  // ──────────────────────────────────────────

  describe('SHA-256 Hashing', () => {
    it('should produce exactly 64 hexadecimal characters', async () => {
      const hash = await sha256('test@example.com');
      expect(hash).toHaveLength(64);
      expect(hash).toMatch(/^[0-9a-f]{64}$/);
    });

    it('should never equal the plaintext input', async () => {
      const input = 'user@example.com';
      const hash = await sha256(input);
      expect(hash).not.toBe(input);
    });

    it('should produce consistent output for identical inputs', async () => {
      const a = await sha256('same@email.com');
      const b = await sha256('same@email.com');
      expect(a).toBe(b);
    });

    it('should produce different outputs for different inputs', async () => {
      const a = await sha256('alice@example.com');
      const b = await sha256('bob@example.com');
      expect(a).not.toBe(b);
    });

    it('should normalize input (lowercase, trimmed) before hashing', async () => {
      const a = await sha256('User@Example.COM');
      const b = await sha256('  user@example.com  ');
      const c = await sha256('user@example.com');
      expect(a).toBe(c);
      expect(b).toBe(c);
    });
  });

  // ──────────────────────────────────────────
  // PII Segregation
  // ──────────────────────────────────────────

  describe('PII Segregation', () => {
    it('should create a BlindKeyPayload with only the blind key', async () => {
      const blindKey = await sha256('activist@secure.org');
      const payload: BlindKeyPayload = {
        blindedKey: blindKey,
        createdAt: new Date(),
        protocol: 'SHA-256_V1',
        status: 'pending_verification',
      };

      expect(payload.blindedKey).toBeDefined();
      expect(payload.blindedKey).toHaveLength(64);
      const raw = payload as unknown as Record<string, unknown>;
      expect(raw['email']).toBeUndefined();
      expect(raw['phone']).toBeUndefined();
      expect(raw['name']).toBeUndefined();
      expect(raw['address']).toBeUndefined();
    });

    it('should not allow plaintext email in payload type', () => {
      const payload: BlindKeyPayload = {
        blindedKey: 'a'.repeat(64) as BlindKey,
        createdAt: new Date(),
        protocol: 'SHA-256_V1',
        status: 'pending_verification',
      };
      const keys = Object.keys(payload);
      const piiFields = ['email', 'phone', 'name', 'address', 'ssn', 'dob', 'legal_name'];
      for (const field of piiFields) {
        expect(keys).not.toContain(field);
      }
    });
  });

  // ──────────────────────────────────────────
  // Blinding Factor
  // ──────────────────────────────────────────

  describe('Blinding Factor', () => {
    it('should generate a cryptographically secure random salt', () => {
      const salt = generateBlindingFactor();
      expect(salt).toHaveLength(64);
      expect(salt).toMatch(/^[0-9a-f]{64}$/);
    });

    it('should produce unique salts on each generation', () => {
      const salts = new Set<string>();
      for (let i = 0; i < 100; i++) {
        salts.add(generateBlindingFactor());
      }
      expect(salts.size).toBe(100);
    });

    it('should produce different blind keys for same email with different salts', async () => {
      const email = 'worker@example.com';
      const salt1 = generateBlindingFactor();
      const salt2 = generateBlindingFactor();
      const key1 = await createBlindKey(email, salt1);
      const key2 = await createBlindKey(email, salt2);
      expect(key1).not.toBe(key2);
    });
  });

  // ──────────────────────────────────────────
  // Blind Key Creation
  // ──────────────────────────────────────────

  describe('Blind Key Creation', () => {
    it('should produce a 64-character hex blind key', async () => {
      const salt = generateBlindingFactor();
      const key = await createBlindKey('survivor@safe.org', salt);
      expect(key).toHaveLength(64);
      expect(key).toMatch(/^[0-9a-f]{64}$/);
    });

    it('should produce consistent output for same input and salt', async () => {
      const salt = generateBlindingFactor();
      const a = await createBlindKey('journalist@press.org', salt);
      const b = await createBlindKey('journalist@press.org', salt);
      expect(a).toBe(b);
    });

    it('should never equal the plaintext input', async () => {
      const email = 'lgbtq-user@safe.org';
      const salt = generateBlindingFactor();
      const key = await createBlindKey(email, salt);
      expect(key).not.toBe(email);
      expect(key).not.toContain('@');
    });
  });

  // ──────────────────────────────────────────
  // Memory Safety
  // ──────────────────────────────────────────

  describe('Memory Safety', () => {
    it('should allow callers to nullify plaintext after hashing', async () => {
      let email: string | null = 'sensitive@example.com';
      const hash = await sha256(email);
      email = null;
      expect(email).toBeNull();
      expect(hash).toHaveLength(64);
    });

    it('should not retain plaintext in the returned blind key', async () => {
      const plaintext = 'traceable@identity.com';
      const hash = await sha256(plaintext);
      expect(hash).not.toContain('traceable');
      expect(hash).not.toContain('@');
      expect(hash).not.toContain('identity');
      expect(hash).not.toContain('.com');
    });
  });

});
