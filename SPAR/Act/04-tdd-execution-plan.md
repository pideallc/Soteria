# Act Phase: SPAR-Aligned TDD Execution Plan

**Date:** April 1, 2026  
**Source:** Final Gemini research plan — "Building Soteria with TDD & SPAR"  
**SPAR Stage:** Act — Defining the automated build workflow

---

## Context

At the end of the Gemini conversation, the TDD methodology was formalized into a SPAR-aligned research and execution plan. This plan was submitted to Gemini's Deep Research feature for web-based research synthesis.

---

## The 8-Step SPAR-TDD Workflow

### Step 1: Sense — Establish Agent Baseline Context

**Action:** Formalize the `.cursorrules` TDD mandate into the development environment.

**Deliverables:**
- `.cursorrules` file with the DevSecOps TDD Agent role definition
- Red-Green-Refactor cycle enforcement
- Zero-Trust Rule (no mocking security functions)
- OPSEC constraint definitions for the agent to evaluate against

**What the agent "senses":**
- The existing codebase (index.html, SPAR documentation)
- The strict operational security requirements of marginalized users
- The architectural boundaries (neural vs. symbolic)
- The Blind Key Protocol implementation

### Step 2: Plan (RED Phase) — Write Failing Tests

**Action:** Agent generates comprehensive, deterministic test suites for MVP components.

**Rules:**
- Output **only** the failing test code
- No application logic generated yet
- Tests must define expected behavior, edge cases, and OPSEC constraints
- Tests must be runnable and must fail

**Frameworks:** Jest, Vitest, or equivalent

### Step 3: Act — Vault OPSEC Test

**Test specification:**
```
describe('Blind Key Protocol', () => {
    it('should produce exactly 64-character SHA-256 hash')
    it('should never equal the plaintext input')
    it('should produce consistent output for same input')
    it('should produce different output for different inputs')
    it('should not include email in database payload')
    it('should nullify plaintext variable after hashing')
})
```

**Success criteria:** All tests fail (RED) because no implementation exists yet.

### Step 4: Act — Guardrail Isolation Test

**Test specification:**
```
describe('Symbolic Guardrails', () => {
    it('should always fire when neural threat threshold is met')
    it('should fire regardless of current UI state')
    it('should not import any module from neural-eval directory')
    it('should enforce one-way data flow: neural → symbolic → action')
    it('should never exfiltrate location data during distress event')
    it('should trigger identity segregation on financial lockout detection')
})
```

**Success criteria:** All tests fail (RED) because no guardrail logic exists yet.

### Step 5: Act — Panic Button Test

**Test specification:**
```
describe('Quick Exit / Panic Button', () => {
    it('should replace entire DOM on triple Escape press')
    it('should complete replacement in under 100ms')
    it('should show no Soteria branding after exit')
    it('should display realistic benign content')
    it('should not reveal Soteria URL in browser history')
})
```

**Success criteria:** All tests fail (RED) because no exit mechanism exists yet.

### Step 6: Act (GREEN Phase) — Write Minimal Implementation

**Trigger:** Human confirms all tests fail as expected.

**Prompt to agent:**
> "Tests failed as expected. Execute step two of the TDD Mandate."

**Agent action:** Write the **absolute minimum** implementation code to make each failing test pass. No extra features, no UI polish — just make the tests green.

**Order of implementation:**
1. Blind Key Protocol (highest priority — trust foundation)
2. Symbolic Guardrails (second priority — safety mechanism)
3. Panic Button (third priority — physical safety)

### Step 7: Reflect (REFACTOR Phase) — Security Review

**Agent action:** After all tests pass, perform a rigorous review:

- Scan for **memory leaks** (especially around plaintext variables)
- Scan for **plaintext exposure** (any variable holding real email/phone/name)
- Scan for **OPSEC vulnerabilities** (timing attacks, logging, console output)
- Verify **UI/UX alignment** with trauma-informed design standards
- Check for **accessibility compliance** (WAI-ARIA, keyboard navigation)
- Refactor code cleanly

### Step 8: Iterate — Next MVP Component

**Action:** Return to Step 1 (Sense) with the next component on the MVP backlog.

**MVP Component Backlog:**
1. ~~Blind Key Protocol~~ (completed in Steps 3/6)
2. ~~Symbolic Guardrails~~ (completed in Steps 4/6)
3. ~~Panic Button~~ (completed in Steps 5/6)
4. Identity Segregation module
5. Ghost Data / decoy feed generation
6. Shadow Account protocol
7. Automated doxxing response (multi-vector takedown)
8. Non-coercive biometric authentication
9. Communication Relay (team-blind messaging)

---

## Research Status

This execution plan was **submitted as a Gemini Deep Research task** at the end of the session. Gemini began researching:

1. SPAR cognitive architecture for autonomous AI coding agents
2. Best practices for TDD in privacy-first, security-critical web applications
3. Testing frameworks suitable for cryptographic functions
4. Each SPAR phase formalized as agent directives

The research was initiated but the session ended before results were returned. The plan above represents the **pre-research specification** that Gemini is researching against.

---

## How This Maps to Cursor Cloud Agents

The SPAR-TDD workflow is designed to be triggered as a **Cursor Agent task**:

1. **Create `.cursorrules`** with TDD mandate
2. **Open Composer** and prompt with the outcome to prove
3. **Agent generates tests** (RED) and stops
4. **Human reviews and confirms** test failures
5. **Agent implements** (GREEN) and stops
6. **Human reviews and confirms** test passes
7. **Agent refactors** (REFACTOR) and stops
8. **Human approves** and moves to next component

The human remains in the loop at every phase boundary, maintaining oversight over a system designed to protect lives.
