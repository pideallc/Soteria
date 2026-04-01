# Plan Phase: Phase 2 Execution Plan

**Date:** April 1, 2026  
**SPAR Stage:** Plan — Comprehensive next-phase plan addressing issues, long-term health, and execution order  
**Trigger:** Human requested a Plan with attention to long-term success and issue resolution

---

## Priorities: Fix the Foundation Before Building Higher

The previous plan (`07-next-steps.md`) identified two paths — defensive testing and constructive building. This plan refines that into a strict execution order that resolves the five Sense-phase issues first, establishes long-term structural health, and only then adds features. The principle: **never build on a cracked foundation.**

---

## Step 1: Resolve Issues (Before New Features)

These must be done first. Each is a standalone commit.

### 1a. Merge main into branch

The branch is 10 ahead, 1 behind main. Clean merge verified.

```
git merge origin/main
```

This synchronizes the branch and ensures we're working from the latest shared state. Takes 30 seconds.

### 1b. Add CI/CD (GitHub Actions)

Create `.github/workflows/test.yml`:
- Trigger on push and pull_request
- Run `npm ci`, `npx tsc --noEmit`, `npx vitest run`
- Node 22, ubuntu-latest
- Fail the workflow if any test fails or TypeScript has errors

This is a long-term structural investment. Without it, every future agent, contributor, or branch risks silently breaking a guardrail. For a security-critical project, automated test enforcement is not optional — it's the CI equivalent of the TDD Gate rule (A3) from the rules spec.

### 1c. Replace custom sanitizer with DOMPurify

The current `sanitizer.ts` uses regex patterns. The research and module spec both called for DOMPurify. Regex sanitizers are a known attack surface — they miss mutation XSS, SVG payloads, CSS injection, and encoding tricks.

**TDD approach:**
- RED: Add new test cases that exercise DOMPurify-specific vectors (mutation XSS, SVG `<use>` element, javascript: URI, CSS `expression()`)
- GREEN: Replace the regex implementation with DOMPurify, using jsdom environment in Vitest
- REFACTOR: Remove the unused regex patterns, verify all existing tests still pass

This changes the Vitest config for the guardrail test file to use jsdom environment. DOMPurify is already installed as a dependency.

### 1d. Close quickExit.ts coverage gap

The escape sequence detection logic (lines 105-129) is untested. This is the core of the physical safety module.

**TDD approach:**
- Write unit tests that simulate keyboard events with `vi.fn()` mocks:
  - Verify that a single Escape does NOT trigger exit
  - Verify that two Escapes within the timeout window do NOT trigger exit
  - Verify that three Escapes within the timeout window DO trigger exit
  - Verify that three Escapes separated by more than 1500ms do NOT trigger exit (timeout reset)
  - Verify that a non-Escape key between Escapes resets the sequence
- Target: quickExit.ts coverage from 57% to 90%+

This does NOT require Playwright — we can simulate the keyboard events at the unit level by calling the handler function directly with mock KeyboardEvent objects.

### 1e. Close remaining coverage gaps

Two minor branches are uncovered:
- `ruleEngine.ts` line 44: the code path where neural features exist below threshold and no pattern matches
- `auditLogger.ts` lines 23-26: the QUARANTINE (vs BLOCKED) path

Write 2-3 targeted tests. These are small but they bring overall coverage above 90%.

---

## Step 2: Long-Term Structural Health

These ensure the project stays healthy as it grows.

### 2a. Establish the testing contract

After Step 1, the project should have:
- ~60 tests (52 existing + ~8 new from coverage closure)
- Overall coverage above 90%
- CI running on every push
- Real DOMPurify instead of regex sanitizer

This is the **quality floor**. No future PR should be mergeable if tests drop below this. The CI workflow enforces this automatically.

### 2b. Create a CONTRIBUTING.md

For Brelyn or any future contributor, document:
- How to run tests (`npm test`, `npm run test:coverage`)
- The TDD mandate (write tests first)
- The SPAR cycle expectation
- The `.cursorrules` and `.cursor-state.md` files and their purpose
- How to read the SPAR documentation

### 2c. Establish the type safety invariant

The branded types (`BlindKey`, `BlindingFactor`) are powerful but only if they're used consistently. As the codebase grows, any function that handles PII needs to enforce the type boundary. This means:
- A lint rule or code review check: no function may accept a raw `string` parameter named `email`, `phone`, `name`, or `address` — it must be typed as an opaque hash input
- The `BlindKeyPayload` type must remain the only interface for database writes

This isn't a code change — it's a principle encoded in `.cursorrules` and enforced by review.

---

## Step 3: Build the Application

Only after Steps 1 and 2 are complete.

### 3a. Initialize Vite + React + TypeScript

- `npm create vite@latest` with React TypeScript template
- Integrate the existing `/src/core/` modules
- Configure Vitest to work within the Vite project
- Ensure `npm test` still runs all 60+ tests and they all pass
- Set up path aliases (`@core/*`, `@components/*`)

**Key decision:** The core modules are framework-agnostic TypeScript. They don't import React. They will continue to work regardless of the framework choice. The React layer wraps them — it doesn't modify them.

### 3b. Quick Exit UI Components (TDD)

Two components, both calling already-tested core logic:

**QuickExitButton:**
- Discreet, neutral-colored button at screen edge
- No Soteria branding on the button itself
- Calls `executeExit()` on click
- RED: test renders, triggers exit, has no branding, is visible but not prominent
- GREEN: minimum component
- REFACTOR: accessibility audit (aria-label, focus management)

**useQuickExit hook:**
- Registers/deregisters the global keystroke listener from `createExitListener()`
- Cleanup on unmount
- RED: test listener registration, cleanup, no leaks
- GREEN: minimum hook
- REFACTOR: verify capture-phase priority

### 3c. Vault Signup Component (TDD)

The first user-facing feature that exercises the Blind Key Protocol:
- Email input → client-side hash → display blind key → store only the hash
- The form NEVER submits plaintext (test assertion)
- Shows the user their blind key as proof of privacy
- RED: test form submission contains only BlindKeyPayload, no PII fields
- GREEN: minimum component
- REFACTOR: trauma-informed copy review (no blame language in form validation)

### 3d. Layout Shell

- App layout with routing
- QuickExitButton in the layout (present on every route — R4 enforcement)
- Navigation between sections

### 3e. Port prototype content

Move the 7 sections from `index.html` into React components:
1. Hero/Vision
2. Intelligence Gap (radar chart)
3. Neural-Symbolic Architecture
4. Blind Key Protocol (wired to real crypto module)
5. Operational Scenarios
6. Pioneers/Ground Game
7. The Vault (wired to real signup component)

Each component integrates with Quick Exit. The live SHA-256 demo uses the tested `sha256()` function from `src/core/crypto/`, not inline JS.

---

## Step 4: Adversarial Testing (After Application Exists)

Once there's a running application, the adversarial tests become meaningful:

### 4a. Adversarial Persona: Intimate Partner

- After Quick Exit, can traces of Soteria be found in localStorage, sessionStorage, IndexedDB, service worker caches, or browser history?
- Can the back button return to any Soteria page?
- Does the browser autocomplete suggest Soteria URLs?
- Are there Soteria-related entries in `performance.getEntries()`?

### 4b. Adversarial Persona: State Actor

- Can blind keys be correlated back to identities through timing attacks?
- Can the guardrail be bypassed with novel obfuscation?
- Are there metadata leaks in HTTP headers, error messages, or stack traces?

### 4c. Adversarial Persona: Platform Algorithm

- Can user behavior be profiled through request timing patterns?
- Does the sanitizer miss any metadata in uploaded content?
- Can network traffic patterns reveal the use of Soteria?

---

## Execution Order Summary

| # | Work | Type | Tests Added | Cumulative |
|---|------|------|-------------|------------|
| 1a | Merge main | Hygiene | 0 | 52 |
| 1b | CI/CD workflow | Infrastructure | 0 | 52 |
| 1c | DOMPurify sanitizer | Issue fix (TDD) | ~4 | 56 |
| 1d | quickExit coverage | Issue fix (TDD) | ~5 | 61 |
| 1e | Remaining coverage gaps | Issue fix | ~3 | 64 |
| 2b | CONTRIBUTING.md | Documentation | 0 | 64 |
| 3a | Vite + React init | Infrastructure | 0 | 64 |
| 3b | Quick Exit UI | Feature (TDD) | ~8 | 72 |
| 3c | Vault Signup | Feature (TDD) | ~6 | 78 |
| 3d | Layout shell | Feature | ~3 | 81 |
| 3e | Port prototype | Feature | ~6 | 87 |
| 4a-c | Adversarial suites | Testing | ~12 | ~99 |

**Target: ~100 tests, >90% coverage, CI green, all 5 Sense issues resolved.**

---

## What I Would Do Right Now

If told to execute, my immediate actions in order:

1. `git merge origin/main` — 30 seconds, resolves Issue 1
2. Create `.github/workflows/test.yml` — 5 minutes, resolves Issue 5
3. Write new sanitizer tests + swap to DOMPurify — resolves Issue 2
4. Write quickExit sequence tests — resolves Issue 3
5. Write remaining coverage gap tests — closes all gaps
6. Commit, push, verify CI passes on the new PR

That's 5 issues resolved and ~12 new tests before touching any new features. Everything after that builds on a clean, verified, CI-enforced foundation.
