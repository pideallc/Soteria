# Act Phase: TDD Execution Roadmap

**Date:** April 1, 2026  
**SPAR Stage:** Act — The bridge from planning to code  
**Status:** Active execution plan

---

## Current State Assessment

| Asset | Status |
|-------|--------|
| Research & architecture | Complete — 25 SPAR documents, whitepaper, bibliography |
| Module specs | Complete — Vault, Guardrail, Panic Button with test inventories |
| Agent governance | Complete — `.cursorrules` (constitution) + `.cursor-state.md` (dynamic state) |
| Project scaffolding | **Does not exist** — no package.json, no TypeScript, no test framework |
| Source code | `index.html` only — single HTML file with inline JS, CDN dependencies |
| Test infrastructure | **Does not exist** — zero test files, zero test runner config |
| Test coverage | **0%** — nothing is tested |

**The gap:** Extensive planning, zero executable tests. The entire codebase is a single prototype HTML file. Before any TDD cycle can run, the project needs scaffolding.

---

## Execution Phases

### Phase 0: Project Scaffolding (Pre-TDD)

**Goal:** Create the infrastructure that makes TDD possible.

This is not a TDD cycle itself — it is the foundation the cycles run on. Without a test runner, there are no failing tests.

**Steps:**
1. Initialize Node.js project (`package.json`)
2. Install core dependencies:
   - `typescript` — language
   - `vitest` — unit test framework (fast, ESM-native, good crypto support)
   - `@vitest/coverage-v8` — coverage reporting
   - `playwright` — E2E browser testing (for Panic Button)
   - `jsdom` — DOM environment for Vitest (for component tests)
   - `dompurify` — output sanitization
3. Create `tsconfig.json` with strict mode
4. Create `vitest.config.ts`
5. Create directory structure:
   ```
   /src
     /core
       /crypto/          ← sha256, blind key, blinding factor
       /symbolic-guardrails/  ← deterministic rules engine
       /neural-eval/     ← neural perception interfaces (stubs)
       /identity/        ← persona management
     /components/        ← UI components
     /utils/             ← shared utilities
   /tests
     /security/          ← security-specific test suites
     /adversarial/       ← adversarial persona tests
     /e2e/               ← Playwright browser tests
   ```
6. Extract SHA-256 utility from `index.html` into `/src/core/crypto/sha256.ts` as a typed TypeScript module
7. Verify `npx vitest run` executes (even if zero tests)

**Deliverable:** A project that can run `npm test` and report zero tests found.

---

### Phase 1: Module 1 — Vault OPSEC (Blind Key Protocol)

**Build order rationale:** The Blind Key is the trust foundation. Everything else depends on users trusting that their identity is protected. Test this first.

#### 1a. RED — Write Failing Tests

File: `/tests/security/vault-opsec.test.ts`

Test categories (from `SPAR/Act/05-module-vault.md`):
1. **SHA-256 Hashing** (5 tests) — output length, irreversibility, determinism, uniqueness, normalization
2. **PII Segregation** (5 tests) — database payloads contain zero plaintext fields
3. **Memory Safety** (3 tests) — plaintext destroyed after hashing, no closure leaks, no console exposure
4. **Blinding Factor** (3 tests) — cryptographic salt generation, isolated storage, salt-varied output
5. **Query Resistance** (2 tests) — plaintext queries fail, blind key queries succeed

**Total: 18 assertions that must all fail.**

Human gate: Verify all tests fail. Confirm "Execute GREEN."

#### 1b. GREEN — Minimum Implementation

Files:
- `/src/core/crypto/sha256.ts` — hash function using `crypto.subtle.digest`
- `/src/core/crypto/blindKey.ts` — blinding factor generation + combined hash
- `/src/core/crypto/types.ts` — `BlindKeyPayload` type (no raw string fields)
- `/src/core/crypto/index.ts` — public API

Write the absolute minimum to make 18 tests pass. No UI, no optimization, no error handling beyond what tests require.

Human gate: Verify all tests pass. Confirm "Execute REFACTOR."

#### 1c. REFACTOR — Security Review

- Verify plaintext variables are nullified (not just out of scope)
- Verify no `console.log` references plaintext
- Verify TypeScript types prevent accidental plaintext passthrough
- Evaluate Paillier encryption upgrade path
- Add JSDoc comments explaining the cryptographic properties
- Run: `npx vitest run --coverage` — confirm coverage on all crypto functions

**Deliverable:** A tested, secure Blind Key module with coverage report.

---

### Phase 2: Module 2 — Guardrail Isolation (Neuro-Symbolic Defense)

**Build order rationale:** With identity protected, now protect the system's decision-making layer from adversarial manipulation.

#### 2a. RED — Write Failing Tests

File: `/tests/security/guardrail-isolation.test.ts`

Test categories (from `SPAR/Act/06-module-guardrail.md`):
1. **Architectural Boundary** (3 tests) — no imports from neural-eval in symbolic-guardrails
2. **Adversarial Input Rejection** (5 tests) — jailbreak, prompt injection, PII aggregation, identity correlation, obfuscation
3. **Symbolic Rule Enforcement** (5 tests) — threshold firing, state independence, audit logging
4. **RAIL Compliance** (4 tests) — schema validation, structural rejection, DOMPurify output sanitization
5. **Performance** (2 tests) — symbolic gate <50ms

**Total: 19 assertions.**

#### 2b. GREEN — Minimum Implementation

Files:
- `/src/core/symbolic-guardrails/ruleEngine.ts` — deterministic validation against RAIL specs
- `/src/core/symbolic-guardrails/auditLogger.ts` — structured block logging
- `/src/core/symbolic-guardrails/types.ts` — `SymbolicFeatureSet`, `GateResult`, `AuditEntry`
- `/src/core/neural-eval/types.ts` — interface stubs only (no implementation)

#### 2c. REFACTOR

- Optimize gate for <50ms
- Verify audit log entries are hashed (no PII in logs)
- Verify stub interfaces are typed strictly enough to prevent future bypass
- Run adversarial test: craft payload to pass the gate with malicious intent

**Deliverable:** A tested symbolic governance layer with audit trail.

---

### Phase 3: Module 3 — Panic Button Exit (Trauma-Informed Escape)

**Build order rationale:** With identity and system integrity protected, now protect the user's physical safety.

#### 3a. RED — Write Failing Tests

File: `/tests/security/panic-button.test.ts` (Vitest + jsdom)  
File: `/tests/e2e/panic-button.spec.ts` (Playwright)

Test categories (from `SPAR/Act/07-module-panic-button.md`):
1. **Visual Clearance** (5 tests) — body emptied, <100ms, zero branding
2. **History Sanitization** (4 tests) — replaceState, no push, back-button blocked
3. **Redirect** (3 tests) — location.replace to benign URL
4. **Storage Purge** (4 tests) — localStorage, sessionStorage, IndexedDB, service worker caches
5. **Event Handling** (5 tests) — stopPropagation first, no single-Escape, deliberate sequence
6. **Accessibility** (4 tests) — keyboard nav, assistive tech, visible fallback button
7. **Component Integration** (4 tests) — every route, persistence, no memory leaks

**Total: 29 assertions across unit + E2E.**

#### 3b. GREEN — Minimum Implementation

Files:
- `/src/core/identity/quickExit.ts` — core exit logic (4-step DOM sequence)
- `/src/components/QuickExitButton.tsx` — visible fallback
- `/src/hooks/useQuickExit.ts` — component integration hook

#### 3c. REFACTOR

- Ensure capture-phase listener registration
- Verify no screen reader announcement during exit
- Run adversarial test: attempt to recover Soteria state from browser after exit
- Encapsulate as framework-agnostic module

**Deliverable:** A tested, accessible panic button available on every route.

---

## Immediate Next Steps

The following actions happen now, in this order:

1. **Scaffold the project** — `npm init`, install Vitest/Playwright/TypeScript, create directory structure
2. **Extract `sha256`** — move the working function from `index.html` into `/src/core/crypto/sha256.ts`
3. **Write Vault OPSEC tests** — the first RED phase, 18 failing assertions
4. **Verify all fail** — `npx vitest run` shows 18 red
5. **Write minimum implementation** — GREEN phase
6. **Verify all pass** — `npx vitest run` shows 18 green
7. **Security review** — REFACTOR phase
8. **Commit and update state** — push, update `.cursor-state.md`

Then repeat for Guardrail (19 tests) and Panic Button (29 tests).

---

## Total Test Inventory

| Module | Tests | Category |
|--------|-------|----------|
| Vault OPSEC | 18 | Unit (Vitest) |
| Guardrail Isolation | 19 | Unit + Integration (Vitest) |
| Panic Button | 29 | Unit (Vitest/jsdom) + E2E (Playwright) |
| **Total MVP** | **66** | **All must pass before MVP ships** |
