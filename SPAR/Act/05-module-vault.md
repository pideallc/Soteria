# Act Phase: Module 1 — Vault OPSEC (Blind Key Protocol)

**Date:** April 1, 2026  
**Source:** Final Gemini Deep Research — Module execution specification  
**SPAR Stage:** Act — First TDD cycle for the MVP  
**Priority:** 1 of 3 (highest — trust foundation)

---

## Mission Context

In systems designed for populations vulnerable to systemic tracking, state-sponsored surveillance, or domestic abuse, identity segregation is life-critical. The Vault OPSEC module structurally prevents the aggregation of personally identifiable information with user behavioral data or platform activity.

If the database is compromised, the threat actor must gain **nothing actionable** — no email addresses, no legal names, no link between identity and activity.

---

## Architecture: Blind Key Protocol

Rooted in David Chaum's blind signature concept (1982): a cryptographic mechanism that allows content to be disguised ("blinded") before it is processed. The signing authority cannot link the blinded request to the unblinded output, providing **absolute unlinkability**.

For Soteria: SHA-256 hashing combined with a cryptographically secure blinding factor (salt), executed entirely client-side via the Web Crypto API.

---

## SPAR-TDD Execution Cycle

### Sense

Agent parses the current database schema and authentication flow. Reads `index.html` to understand the existing SHA-256 implementation. Reviews SPAR documentation to understand the Blind Key Protocol design.

### Plan → RED (Write Failing Tests)

```
File: /tests/security/vault-opsec.test.ts

describe('Vault OPSEC: Blind Key Protocol', () => {

  describe('SHA-256 Hashing', () => {
    it('should produce exactly 64 hexadecimal characters')
    it('should never equal the plaintext input')
    it('should produce consistent output for identical inputs')
    it('should produce different outputs for different inputs')
    it('should normalize input (lowercase, trimmed) before hashing')
  })

  describe('PII Segregation', () => {
    it('should not include email field in database payload')
    it('should not include phone field in database payload')
    it('should not include name field in database payload')
    it('should not include address field in database payload')
    it('should include only blindedKey in the stored document')
  })

  describe('Memory Safety', () => {
    it('should nullify the plaintext email variable after hashing')
    it('should not retain plaintext in any closure or callback scope')
    it('should not log plaintext to console at any verbosity level')
  })

  describe('Blinding Factor', () => {
    it('should generate a cryptographically secure random salt')
    it('should store the salt in isolated, encrypted storage')
    it('should produce different hashes for the same email with different salts')
  })

  describe('Query Resistance', () => {
    it('should fail when querying database with plaintext email')
    it('should succeed when querying with correctly hashed blind key')
  })

})
```

**Verification:** All tests must fail. Pre-execution hook blocks any implementation file edits.

### Act → GREEN (Minimum Implementation)

Agent writes:
1. `sha256(message: string): Promise<string>` — using `crypto.subtle.digest`
2. `generateBlindingFactor(): string` — using `crypto.getRandomValues`
3. `createBlindKey(email: string, salt: string): Promise<string>` — combining email + salt before hashing
4. Database write wrapper that accepts only `BlindKeyPayload` type (no raw string fields)
5. Memory cleanup: explicit nullification of plaintext variables after hashing

**Constraint:** No optimization, no UI, no error handling beyond what tests require.

### Reflect → REFACTOR

- Refine blinding factor generation and isolated storage
- Evaluate upgrade path to **Paillier encryption** for homomorphic operations
- Ensure TypeScript types enforce that no function accepting PII can return or pass it unhashed
- Verify no `console.log` calls reference plaintext variables
- Run adversarial test: attempt to reconstruct email from stored hash

---

## Success Criteria

| Property | Assertion |
|----------|-----------|
| Hash length | `=== 64` |
| Hash ≠ input | `hash !== email` |
| Hash determinism | `hash(a) === hash(a)` |
| Hash uniqueness | `hash(a) !== hash(b)` |
| DB has no email | `payload.email === undefined` |
| Memory clean | `emailVar === null` after hash |
| Query by plaintext | Fails |
| Query by blind key | Succeeds |
