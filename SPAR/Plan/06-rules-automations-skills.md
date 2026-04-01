# Plan Phase: Rules, Automations, and Skills

**Date:** April 1, 2026  
**Source:** Synthesis of all SPAR documentation to date — prepared before Gemini Deep Research returns  
**SPAR Stage:** Plan — Defining the behavioral boundaries and capabilities for agents building the MVP  
**Status:** Pre-research analysis; to be refined when Gemini's TDD/SPAR research completes

---

## Framing: Why Rules, Automations, and Skills Are Distinct

These three concepts serve different functions in the development workflow:

| Concept | Function | Enforcement | Example |
|---------|----------|-------------|---------|
| **Rules** | Hard behavioral constraints that agents must never violate | Passive — always active, checked against every action | "Never store plaintext PII in any database write" |
| **Automations** | Triggered workflows that execute without human prompting | Active — fire when a specific condition is met | "When a test fails, halt and report before generating implementation" |
| **Skills** | Reusable capabilities the agent can invoke when needed | On-demand — called as part of a larger task | "Run the Blind Key hash verification suite" |

Rules define what the agent **cannot do**. Automations define what the agent **must do when conditions are met**. Skills define what the agent **knows how to do when asked**.

---

## Rules (Hard Constraints)

These are the behavioral boundaries that no agent should cross under any circumstance. They derive from three sources: the Gemini conversation corrections (Reflect phase), the feminist cybersecurity principles (Sense phase), and the architectural decisions (Plan phase).

### R1: Zero-Plaintext Rule

> No database write, API call, log statement, or console output may contain plaintext personally identifiable information (email, phone, legal name, physical address, government ID). All PII must pass through the `sha256()` hashing utility before leaving the client.

**Source:** Blind Key Protocol (`Plan/03-blind-key-protocol.md`), Agent Awareness blind spot #7 (`Reflect/04-agent-awareness.md`)  
**Why:** A single plaintext leak in a Firestore payload, a `console.log`, or an error report could expose a sex worker or IPV survivor to their abuser, law enforcement, or a data breach. This is a survival-critical constraint, not a best practice.  
**Enforcement:** Static analysis of all `setDoc`, `addDoc`, `fetch`, `console.log`, and `XMLHttpRequest` calls.

### R2: Architectural Boundary Rule

> Code in `/src/core/symbolic-guardrails/` may never import from `/src/core/neural-eval/`. Data flows one direction only: neural → symbolic → action.

**Source:** Architecture (`Plan/02-architecture.md`), Agent Automations #2 (`Plan/05-agent-automations.md`)  
**Why:** The symbolic layer's guarantee of deterministic behavior is void if it depends on probabilistic outputs. This is the separation that allows us to say "this guardrail always fires" — which becomes impossible if the guardrail itself is influenced by the neural layer's uncertainty.  
**Enforcement:** Import analysis on every file in the symbolic-guardrails directory.

### R3: Test-Before-Code Rule

> No application code may be written for a new feature, component, or security module until a failing test exists that defines the expected behavior.

**Source:** TDD Directives (`Plan/04-tdd-directives.md`)  
**Why:** For Soteria, TDD is not a coding preference — it is the primary OPSEC mechanism. A guardrail that is not tested is a guardrail that might not fire. In a context where failure means physical danger, "probably works" is not acceptable.  
**Enforcement:** Agent behavioral mandate in `.cursorrules`; the agent must output test code first and stop.

### R4: No-Mock-Security Rule

> Security-critical functions (hashing, encryption, authentication, identity segregation) may never be mocked in tests unless the human explicitly authorizes it.

**Source:** TDD Directives, Agent Awareness blind spot #7  
**Why:** A mocked `sha256()` that returns a fake string proves nothing about whether plaintext is actually destroyed. The test must exercise real cryptographic operations against real memory to be meaningful.  
**Enforcement:** Agent behavioral mandate; test file scanning for `jest.mock` or `vi.mock` on security modules.

### R5: Quick Exit Accessibility Rule

> Every screen, view, and modal in the application must have an accessible Quick Exit route. No component may be added that blocks, delays, or obscures the exit mechanism.

**Source:** Design Systems (`Sense/04-design-systems.md`), Chayn trauma-informed principles  
**Why:** A user living with an abuser may have seconds to hide the application. If any screen lacks the exit route — even a settings modal or an error state — that screen becomes a physical safety risk.  
**Enforcement:** Component-level audit; every new component must document its exit route.

### R6: No-Blame Language Rule

> No error message, warning, notification, or prompt in the application may use language that blames the user, implies they did something wrong, or assigns fault. Error states must be compassionate, non-punitive, and action-oriented.

**Source:** Chayn trauma-informed principles, Communication Clarity (`Reflect/03-communication-clarity.md`)  
**Why:** Users of this platform may be in states of acute distress. Language like "Invalid input" or "You must provide..." replicates the blame patterns of abuse. Errors should say what to do, not what went wrong.  
**Enforcement:** String review on all user-facing text.

### R7: No-Sanitization Rule

> Documentation, comments, and user-facing copy must not sanitize or generalize references to the populations this platform serves. Name them explicitly: sex workers, survivors of intimate partner violence, LGBTQ+ communities, activists, people in criminalized industries.

**Source:** Inclusivity (`Reflect/02-inclusivity.md`), Agent Awareness blind spot #6  
**Why:** Sanitizing the language is a form of the same exclusion the platform is designed to fight. If the code comments say "vulnerable users" instead of "sex workers," the codebase itself fails the mission test.  
**Enforcement:** Agent behavioral mandate; code review flag on generic terms.

### R8: Incremental Integration Rule

> When adding new features, the agent must integrate them into the existing codebase. Never regenerate files from scratch, replace existing sections, or discard previous work without explicit instruction.

**Source:** Agent Awareness blind spot #1 (`Reflect/04-agent-awareness.md`)  
**Why:** Gemini deleted an entire working prototype when asked to add a single feature. In a version-controlled codebase with security-tested components, regeneration risks destroying tested code and re-introducing fixed vulnerabilities.  
**Enforcement:** Git diff review; agent mandate.

---

## Automations (Triggered Workflows)

These fire automatically when a specific condition is met, without requiring a human prompt.

### A1: PII Exposure Scanner

**Trigger:** Any new or modified file containing a database write function (`setDoc`, `addDoc`, `updateDoc`, `fetch` with POST/PUT body, `XMLHttpRequest.send`)  
**Action:** Scan the payload object for fields matching PII patterns (`email`, `phone`, `name`, `address`, `ssn`, `dob`, `real_name`, `legal_name`). If found in plaintext, halt and flag.  
**Resolution:** Agent rewrites the function to pipe the field through `sha256()` before inclusion.

### A2: Boundary Violation Detector

**Trigger:** Any new or modified file in `/src/core/symbolic-guardrails/`  
**Action:** Scan all `import` and `require` statements. If any resolve to a path within `/src/core/neural-eval/`, halt and flag.  
**Resolution:** Agent proposes an alternative data flow that maintains one-way direction.

### A3: TDD Gate

**Trigger:** Agent is asked to implement a new feature or module  
**Action:** Before generating any implementation code, agent must:
  1. Check if a corresponding `.test.ts` (or `.test.js`) file exists
  2. If not, generate the test file first and stop
  3. If yes, check if the tests are currently failing (RED state)
  4. Only proceed to implementation if tests exist and are failing  
**Resolution:** The agent outputs only test code and waits for human confirmation.

### A4: Quick Exit Audit

**Trigger:** Any new component file created in `/src/components/` or equivalent  
**Action:** Verify the component does not trap focus, block keyboard events, or render a full-screen overlay without documenting an exit route. Check for the presence of the global `QuickExit` handler integration.  
**Resolution:** Agent adds the exit hook or flags the component for review.

### A5: Metadata Scrub Check

**Trigger:** Any file upload handler, image processing function, or media attachment flow  
**Action:** Verify that EXIF data, GPS coordinates, timestamps, camera model, and author tags are stripped before the file leaves the client.  
**Resolution:** Agent adds the metadata scrubbing utility call or flags the handler.

### A6: Post-Merge Security Sweep

**Trigger:** After any branch merge or significant commit batch  
**Action:** Run the full test suite. If any security test fails, the agent must halt further development and report which guardrail broke.  
**Resolution:** Agent enters Reflect phase — analyzes the regression, writes a fix, and adds a regression test.

---

## Skills (Reusable Capabilities)

These are named capabilities the agent can invoke as part of larger tasks.

### S1: Blind Key Hash Verification

**What it does:** Given an input string, hash it with SHA-256 using the Web Crypto API and verify that: (a) the output is exactly 64 hex characters, (b) the output does not equal the input, (c) the same input always produces the same output, (d) different inputs produce different outputs.  
**When to use:** Any time a new data collection point is added (signup form, contact form, feedback form, support request).  
**Test pattern:** `expect(hash).toHaveLength(64); expect(hash).not.toBe(input);`

### S2: Adversarial Persona Testing

**What it does:** The agent assumes the role of a specific threat actor and writes a test suite attempting to breach a specific module. Personas include:
  - **Intimate partner with device access:** Attempts to discover hidden personas, access partitioned data, or find forensic traces of the application
  - **State-sponsored actor:** Attempts to correlate blind keys back to identities, intercept relay communications, or force identity disclosure through legal API endpoints
  - **Platform algorithm:** Attempts to correlate user activity across sessions, build a behavioral profile, or bypass metadata scrubbing  
**When to use:** After any identity segregation, privacy, or authentication module reaches GREEN status.  
**Output:** A test file with attack scenarios and a report of findings.

### S3: Trauma-Informed Copy Review

**What it does:** Scans all user-facing strings in a component or view for: blame language, panic-inducing terms ("WARNING," "DANGER," "ERROR," "INVALID"), unexplained jargon, assumptions of technical literacy, and missing plain-language alternatives.  
**When to use:** Before any component is considered complete.  
**Output:** A list of flagged strings with suggested replacements.

### S4: Quick Exit Integration

**What it does:** Adds the Quick Exit mechanism to a component or view. This includes: registering the component with the global exit handler, ensuring the component can be instantly hidden/replaced, verifying no state leaks to local storage that would reveal the application's existence.  
**When to use:** When building any new view, modal, or overlay.  
**Implementation:** Discrete keystroke listener (not single Escape — per GOV.UK research), instant DOM replacement with benign content, session purge.

### S5: Scenario Simulation

**What it does:** Given a threat scenario (stalkerware, doxxing, financial abuse, device seizure), walks through the full detection-protocol-resolution pipeline and generates a test that exercises each phase.  
**When to use:** When extending the threat model or adding a new scenario to the operational showcase.  
**Output:** A three-phase test file (detection assertion, protocol assertion, resolution assertion).

### S6: SPAR Cycle Documentation

**What it does:** At the end of a development cycle, generates a SPAR summary: what was sensed (requirements, vulnerabilities), what was planned (tests, architecture), what was acted on (implementation), and what was reflected on (corrections, refinements).  
**When to use:** After completing each major feature or module.  
**Output:** A markdown file in the appropriate `SPAR/` subdirectory.

---

## How Rules, Automations, and Skills Interact

```
Human requests feature
       │
       ▼
   A3: TDD Gate fires
       │
       ├─ No test exists → Agent uses S1-S5 skills to WRITE tests → STOP
       │
       ▼
   Human confirms tests fail (RED)
       │
       ▼
   Agent writes minimum implementation (GREEN)
       │
       ├─ A1: PII Scanner runs on every database write
       ├─ A2: Boundary Detector runs on every import
       ├─ A4: Quick Exit Audit runs on every component
       ├─ A5: Metadata Scrub Check runs on every upload handler
       │
       ▼
   All rules (R1-R8) enforced continuously
       │
       ▼
   Tests pass → Agent enters REFACTOR
       │
       ├─ S2: Adversarial testing on security modules
       ├─ S3: Trauma-informed copy review
       ├─ S6: SPAR cycle documentation
       │
       ▼
   A6: Post-merge security sweep
       │
       ▼
   Cycle complete → Next feature
```

---

## Implementation Priority

The rules and automations above should be implemented in this order:

1. **`.cursorrules`** — encodes R1-R8 and the TDD behavioral mandate (immediate)
2. **PII Scanner (A1)** — highest physical safety impact (first automation)
3. **TDD Gate (A3)** — ensures the build process itself is secure (second automation)
4. **Blind Key Hash Verification (S1)** — first skill, first test suite (first TDD cycle)
5. **Quick Exit Integration (S4)** — second skill, second test suite (second TDD cycle)
6. **Remaining automations and skills** — as the codebase grows

---

## Awaiting Research

The Gemini Deep Research task currently running is researching the formalization of these concepts specifically through the SPAR lens. When those results return, this document should be updated with:
- Specific test framework recommendations (Jest vs. Vitest vs. other)
- Refined SPAR-to-TDD phase mapping based on web research
- Community patterns for enforcing TDD in Cursor (from cursor.directory and Reddit sources identified in the bibliography)
- GOV.UK quick exit implementation details
- Chayn's specific trauma-informed design checklist items
