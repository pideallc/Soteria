# Plan Phase: Cursor Agent Automations

**Date:** April 1, 2026  
**Source:** Gemini conversation — "What automations should we have the Cursor agents do?"  
**SPAR Stage:** Plan — Defining autonomous agent behaviors

---

## Context

The question was about how to use Cursor's agentic capabilities beyond basic code completion — to create an automated DevSecOps partner that enforces Soteria's feminist cybersecurity principles at the codebase level.

---

## Four High-Impact Automations

### 1. The "Blind Key" OPSEC Linter

**Purpose:** Prevent accidental plaintext exposure in database writes.

**Implementation:** A `.cursorrules` directive that automatically scans all new database writes (Firebase `setDoc`, `addDoc`, etc.).

**Rule:** If the agent detects fields named `email`, `phone`, `name`, or `address` being passed into a database payload without first being wrapped in the `sha256()` hashing utility, it must:
- Throw an error
- Highlight the vulnerability
- Rewrite the function to enforce the Blind Key protocol

**Why it matters:** Humans make mistakes. The OPSEC pipeline cannot.

### 2. Neuro-Symbolic Boundary Enforcement

**Purpose:** Maintain the integrity of the neural-symbolic architecture.

**Implementation:** Assign an agent to enforce architectural directory boundaries.

**Rule:** 
- Symbolic logic lives in `/src/core/symbolic-guardrails/`
- Neural logic lives in `/src/core/neural-eval/`
- Automatically reject and flag any `import` statement where a symbolic guardrail attempts to import a probabilistic neural module
- Ensure data flow is strictly one-way: neural → symbolic → action

**Why it matters:** The symbolic layer's guarantee of deterministic behavior is void if it depends on probabilistic outputs.

### 3. Agentic Adversarial Testing

**Purpose:** Generate dynamic, adversarial test suites that mimic real threat vectors.

**Implementation:** Prompt scripts for Cursor's Composer that assume an attacker persona.

**Example prompt:**
> "Act as a state-sponsored identity sniffer or a stalkerware exfiltration script. Write a testing suite that attempts to bypass the current identity segregation protocol in [filename]."

**Rule:** The agent actively tries to find loopholes in state-management logic, then writes regression tests to seal those loopholes.

**Why it matters:** Static unit tests don't think like adversaries. The agent can model threat actors dynamically.

### 4. Trauma-Informed UX Auditing

**Purpose:** Enforce the "Sanctuary" aesthetic and intentional friction principles.

**Implementation:** Feed Chayn-inspired trauma-informed design principles into the workspace context.

**Rules for the agent to check on all new components:**
- Flag aggressive "alert" colors (bright reds, blinking indicators)
- Ensure high-stakes actions (like "Segregate Identity") require intentional friction (slide-to-confirm, not single tap)
- Verify that a "Quick Exit" or "Hide" route is accessible from every new component
- Check that no component uses language that could cause panic or re-traumatization

**Why it matters:** Design decisions in a trauma context are safety decisions. A panic-inducing UI is a security failure.

---

## How These Map to SPAR

| Automation | SPAR Phase | Trigger |
|-----------|-----------|---------|
| Blind Key OPSEC Linter | **Sense** (detect violation) → **Act** (auto-fix) | Every database write |
| Boundary Enforcement | **Sense** (detect boundary cross) → **Reflect** (flag + reject) | Every import statement |
| Adversarial Testing | **Plan** (write attack tests) → **Act** (attempt bypass) → **Reflect** (seal loopholes) | On-demand via Composer |
| UX Auditing | **Sense** (scan new component) → **Reflect** (flag violations) | Every new UI component |

---

## Transition to TDD

After discussing these automations, the conversation pivoted to: **"This is great advice, but what I want it to do is periodically build from a TDD for the MVP."**

This led to the TDD directives (see `Plan/04-tdd-directives.md`), which became the primary workflow. The four automations above serve as **supporting checks** within the broader TDD cycle — they run alongside the Red-Green-Refactor loop rather than replacing it.
