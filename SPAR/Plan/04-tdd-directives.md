# Plan Phase: Test-Driven Development Directives

**Date:** April 1, 2026  
**Source:** Gemini conversation — "This is great advice, but what I want it to do is periodically build from a TDD for the MVP."  
**SPAR Stage:** Plan — Defining the development methodology

---

## Why TDD is Non-Negotiable for Soteria

> "For a project where a failure means a physical safety risk, Test-Driven Development isn't just a coding preference; it is your primary Operational Security mechanism. It mathematically proves your Symbolic Guardrails work before a single piece of user interface is built."

TDD provides **verifiable proof** that the feminist guardrails are hardcoded into the foundation. Without it, "the system is secure" is just a marketing claim.

---

## The .cursorrules TDD Directive

This behavioral mandate tells the Cursor agent it is **not allowed to write application code until a failing test exists**:

```
Role: You are a strict DevSecOps Test-Driven Development Agent.

The TDD Mandate: For every new feature, component, or logic change requested,
you MUST strictly follow the Red-Green-Refactor cycle.

RED: You must FIRST write a comprehensive test suite (using Jest/Vitest/etc.)
that defines the expected behavior, edge cases, and OPSEC constraints.
You will stop and output ONLY the test code.

GREEN: Only after I confirm the test fails (or you run it and see it fail),
you will write the absolute minimum implementation code required to make
the test pass.

REFACTOR: Once the test passes, you will review the implementation for
OPSEC vulnerabilities, memory leaks, or plain-text exposure, and refactor
the code cleanly.

Zero-Trust Rule: Never mock security functions unless explicitly told.
If testing the "Blind Key" protocol, the test must prove the plain-text
email is destroyed in memory.
```

---

## The Red-Green-Refactor Cycle with SPAR

The TDD cycle maps directly onto the SPAR framework:

| TDD Phase | SPAR Phase | Agent Action |
|-----------|-----------|--------------|
| **RED** (Write failing test) | **Sense + Plan** | Agent evaluates the codebase, understands the requirement, writes tests that define expected behavior |
| **GREEN** (Write minimal passing code) | **Act** | Agent writes the absolute minimum implementation to make tests pass |
| **REFACTOR** (Clean and secure) | **Reflect** | Agent reviews for OPSEC vulnerabilities, memory leaks, plain-text exposure |

---

## How to Trigger the Cycle (Composer Workflow)

Instead of asking Cursor to "build a signup page," prompt with the **outcome you want to prove**:

### Example Prompt

> "We are building the 'Identity Segregation' module. Activating the 'Distress Flag' should immediately shift the user's active session to a shadow account and clear local storage. Execute step one of the TDD Mandate."

### What the Agent Does

1. Generates `identitySegregation.test.ts`
2. Writes the tests:
   - `it('should clear local storage when distress flag is true')`
   - `it('should route to shadow account ID')`
3. **Stops and waits**

### Human Confirms

Run the tests. They fail (RED). Reply: "Tests failed as expected. Execute step two."

### Agent Continues

Generates the actual application code to turn those tests GREEN.

---

## MVP Test Suites to Build First

### 1. The Vault OPSEC Test
**Tests the Blind Key Protocol**

- Simulate a user entering an email
- Assert output string is exactly 64 characters (SHA-256 length)
- Assert `output === "user@email.com"` strictly returns `false`
- Assert the plaintext email variable is nullified/destroyed after hashing
- Assert the Firestore payload contains no field named `email`, `phone`, `name`, or `address`

### 2. The Guardrail Isolation Test
**Tests the Symbolic Foundation**

- If the Neural Sentry sends a probabilistic threat assessment (e.g., `threatLevel: 85%`), the deterministic guardrail must **always fire**
- Test must prove the guardrail fires regardless of UI state
- Test must prove no symbolic guardrail imports any module from `/src/core/neural-eval/`
- Test must prove data flow is strictly one-way: neural → symbolic → action

### 3. The "Panic Button" Exit Test
**Tests physical safety**

- Pressing a specific keystroke sequence (e.g., Escape three times) must instantly replace the entire visible page with benign content
- The replacement must happen in under 100ms
- No Soteria branding, data, or UI elements should remain visible
- Browser history should not reveal the Soteria URL
- The benign page should look realistic (not a blank screen)

---

## SPAR-Aligned TDD Execution Plan (from final Gemini research)

Gemini proposed an 8-step research plan specifically mapping TDD to SPAR for the Soteria MVP:

1. **Sense:** Define the agent's baseline context by formalizing the .cursorrules TDD mandate and zero-trust OPSEC rules
2. **Plan (RED):** Generate comprehensive, deterministic test suites for MVP components — output only failing test code
3. **Act (Vault OPSEC):** Execute the Vault test — SHA-256 hash verification and plaintext destruction
4. **Act (Guardrail Isolation):** Execute the Guardrail test — prove deterministic symbolic guardrails always fire regardless of UI state
5. **Act (Panic Button):** Execute the physical safety test — keystroke-triggered DOM replacement
6. **Act (GREEN):** Upon human confirmation of failing tests, write minimum implementation code to pass
7. **Reflect (REFACTOR):** Scan passing code for memory leaks, plaintext exposure, OPSEC vulnerabilities; refactor cleanly
8. **Iterate:** Repeat the SPAR-aligned TDD loop for the next MVP component

This research plan was **initiated** at the end of the conversation session, with Gemini beginning web research to formalize each step.
