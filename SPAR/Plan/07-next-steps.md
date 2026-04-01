# Plan Phase: Next Steps — From Core Modules to Working Application

**Date:** April 1, 2026  
**SPAR Stage:** Plan — Bridging tested core modules to a functional application  
**Status:** Active planning document

---

## Current State

### What exists and is tested (52/52 green)

| Layer | Module | Files | Tests | State |
|-------|--------|-------|-------|-------|
| Crypto | Blind Key Protocol | `sha256.ts`, `blindKey.ts`, `types.ts` | 15 | Production-ready |
| Security | Symbolic Guardrails | `ruleEngine.ts`, `railSpec.ts`, `auditLogger.ts`, `sanitizer.ts` | 19 | Production-ready |
| Safety | Quick Exit | `quickExit.ts` | 18 | Unit-tested, needs E2E |
| Neural | Interface stubs | `neural-eval/types.ts` | — | Types only, no implementation |

### What does NOT exist yet

- No frontend framework (React/Vue/Solid) — just raw `index.html`
- No build tooling (Vite dev server, bundler)
- No Playwright E2E tests
- No component library or design system integration
- No API layer or server
- No database integration (Firebase is in the prototype HTML but untested)
- No routing
- No authentication flow beyond the prototype
- The `index.html` prototype and the `/src` modules are completely disconnected

---

## The Two Paths Forward

There are two distinct workstreams that can proceed in parallel:

### Path A: Deepen Testing (Defensive)

Increase confidence in what's already built before adding complexity.

**A1. Playwright E2E for Panic Button**
- Install Playwright
- Write browser-level tests that exercise the real DOM, real History API, real localStorage
- Verify that `history.back()` genuinely cannot return to Soteria in a real browser
- Verify that the triple-Escape sequence works with real keyboard events
- This closes the coverage gap (quickExit.ts at 57% → target 90%+)

**A2. Adversarial Test Suites**
- Invoke Skill S2 (Adversarial Persona Testing) from the rules/automations/skills spec
- Write tests from the perspective of three threat actors:
  - **Intimate partner with device access:** Can they find traces of Soteria in localStorage, IndexedDB, service worker caches, or browser history after a Quick Exit?
  - **State actor:** Can they correlate blind keys back to identities? Can they force the guardrail to pass a malicious payload?
  - **Platform algorithm:** Can they profile user behavior through metadata the sanitizer missed?
- These go in `/tests/adversarial/`

**A3. Coverage Gap Closure**
- `ruleEngine.ts` line 44 (uncovered branch — the case where no neural features exist but a direct pattern match fails)
- `auditLogger.ts` branch at line 23-26 (QUARANTINE vs BLOCKED path)
- Write targeted tests to exercise these specific branches

### Path B: Build the Application (Constructive)

Wire the tested modules into a real, usable frontend application.

**B1. Vite + React Scaffolding**
- Initialize a Vite project with React + TypeScript
- Move the existing `/src/core/` modules into the Vite project structure
- Configure path aliases, Vitest integration with Vite
- Create the app shell with routing (React Router or TanStack Router)

**B2. QuickExitButton Component**
- The visible fallback button for the Panic Button module
- Discreet, neutral-colored, positioned at screen edge
- No Soteria branding on the button
- Calls `executeExit()` from the tested `quickExit.ts`
- Must be present on every route (layout-level component)
- TDD cycle: RED (test the component renders, triggers exit, has no branding) → GREEN → REFACTOR

**B3. useQuickExit Hook**
- React hook that registers/deregisters the global keystroke listener
- Calls `createExitListener()` from the tested `quickExit.ts`
- Handles cleanup on unmount (prevents memory leaks)
- TDD cycle: RED → GREEN → REFACTOR

**B4. Vault Signup Flow**
- A proper signup component that uses `createBlindKey()` from the tested crypto module
- Form with email input → client-side hash → store only the blind key
- Shows the user their blind key as proof
- TDD cycle: RED (test that the form submits only hashed data, never plaintext) → GREEN → REFACTOR

**B5. Guardrail-Protected API Layer**
- An API handler (or middleware) that pipes all incoming requests through `evaluateSymbolicGate()`
- Returns 403 for rejected payloads with an audit log entry
- TDD cycle: RED → GREEN → REFACTOR

**B6. Port the Prototype Content**
- Move the 7 website sections from `index.html` into React components
- Radar chart, scenario simulations, pioneer cards, etc.
- Wire the live SHA-256 demo to the real crypto module (not inline JS)
- Ensure every component integrates with the Quick Exit handler

---

## Recommended Execution Order

The paths interleave — defensive testing provides confidence for constructive building.

| Step | Path | Work | TDD Tests Added |
|------|------|------|-----------------|
| 1 | A1 | Playwright E2E for Panic Button | ~8 E2E tests |
| 2 | B1 | Vite + React scaffolding | 0 (infrastructure) |
| 3 | B2 | QuickExitButton component | ~5 component tests |
| 4 | B3 | useQuickExit hook | ~4 hook tests |
| 5 | B4 | Vault Signup flow | ~6 integration tests |
| 6 | A2 | Adversarial test suites | ~12 adversarial tests |
| 7 | B5 | Guardrail API middleware | ~6 middleware tests |
| 8 | A3 | Coverage gap closure | ~3 targeted tests |
| 9 | B6 | Port prototype content | ~4 component tests |
| | | **Running total** | **~100 tests** |

---

## Decision Points

### Framework choice
React is the current assumption (shadcn/ui recommendation from design systems research). But Solid, Svelte, or even vanilla TS with Web Components could work — the core modules are framework-agnostic by design. The `quickExit.ts` module takes plain DOM/Window interfaces, not React refs.

### Server vs. serverless
The guardrail module currently runs client-side. For a real API layer, it could run in:
- Edge functions (Cloudflare Workers, Vercel Edge)
- A Node.js server (Express, Fastify)
- Serverless functions (AWS Lambda, Firebase Functions)

The symbolic gate is pure TypeScript with no heavy dependencies — it runs anywhere.

### Firebase vs. alternative
The prototype uses Firebase. The Blind Key module is Firebase-agnostic (it produces a hash; where you store it is separate). The decision to continue with Firebase or move to Supabase/PlanetScale/etc. can be deferred — the crypto layer doesn't care.

---

## What I Would Do Right Now

If given the instruction to execute, I would:

1. **Install Playwright** and write the 8 E2E tests that exercise the Panic Button in a real browser — this is the highest-value work because it closes the most critical coverage gap (physical safety module)
2. **Initialize Vite + React** — the minimum scaffolding to get a dev server running with the existing modules importable
3. **Build QuickExitButton + useQuickExit** — the first React components, both wired to already-tested core logic
4. **Build the Vault Signup component** — the first user-facing feature that exercises the Blind Key Protocol for real

Each step follows the same SPAR-TDD cycle. Each step has a commit checkpoint. Each step leaves the test suite green.
