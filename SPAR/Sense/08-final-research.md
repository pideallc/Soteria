# Sense Phase: Final Deep Research — SPAR-Guided Neuro-Symbolic DevSecOps

**Date:** April 1, 2026  
**Source:** Gemini Pro Deep Research — completed output from the "Building Soteria with TDD & SPAR" research plan  
**SPAR Stage:** Sense — The technical execution blueprint  
**Status:** Foundational execution document

---

> **What is this document?**  
> This is the final research output from Gemini Pro's Deep Research on formalizing the SPAR-guided TDD workflow for the Soteria MVP. While `05-whitepaper.md` covers the *what* and *why* (feminist cybersecurity, NeSy architecture, threat landscape), this document covers the *how* — the precise execution methodology for building the three foundational security modules.

---

## Key Findings and Refinements

The research validated and significantly deepened the initial plans from the conversation, introducing several new concepts:

### 1. Dual-File Agent Governance

The research identified that a single `.cursorrules` file is insufficient. The Soteria MVP requires a **dual-file configuration strategy**:

- **File 1 (Immutable Constitution):** `.cursorrules` — stable, long-term directives including tech stack, mandatory security patterns, and the Red-Green-Refactor requirement. This is the foundational context.
- **File 2 (Dynamic State):** `.cursor-state.md` — tracks the current workflow state: which SPAR phase the agent occupies, the step-by-step task breakdown from the Plan phase, and a running log of actions/observations/decisions. This creates an auditable trail.

**Why:** Without state tracking, agents suffer "knowledge evaporation" — they solve a problem, commit the code, but lose the reasoning. Subsequent agents must rediscover the same context or may misinterpret unstated intent.

### 2. Pre-Execution Hooks

The research formalized a concept that goes beyond passive rules: **pre-execution hooks** that monitor file modifications in real time. If the agent attempts to edit an implementation file without a corresponding failing test registered in the test suite, the hook halts the pipeline entirely, forcing the agent back to RED phase.

### 3. The SPAR-TDD Phase Map (Formalized)

| SPAR Phase | TDD State | Agent Action | Verification |
|-----------|-----------|-------------|--------------|
| **Sense** | Pre-Red | Parse AST, read test coverage, review state file | Agent logs environment state |
| **Plan** | Red | Decompose requirement, write minimal failing test | Test suite must fail definitively |
| **Act** | Green | Write absolute minimum code to pass the test | Test suite must pass. No unrelated edits. |
| **Reflect** | Refactor | Clean up, enforce clean architecture, security review | Tests must remain green throughout |

### 4. Differential Diagnosis Mandate

Before any bug fix, the agent must output: **"Let me make sure this is really the issue"** — forcing it into a reflective analytical state. This prevents agents from pattern-matching a fix without understanding the root cause.

### 5. Three Foundational Modules (Detailed Execution)

The research provided precise execution cycles for three modules. These are documented separately in `Act/05-module-vault.md`, `Act/06-module-guardrail.md`, and `Act/07-module-panic-button.md`.

### 6. Neuro-Symbolic Architecture Refinements

- **ConceptGuard-inspired filtering** using Sparse Autoencoders (SAEs) on LLM internal activations
- **Otsu-Thresholding** for separating meaningful semantic features from noise
- **RAIL specifications** (Rule-Based AI Language) for XML-based symbolic constraint definitions
- **Logic Tensor Networks** for embedding logical constraints directly into neural training
- **G-I-A framework** (Grounding, Instructibility, Alignment) as the evaluation benchmark

### 7. Blind Key Protocol Deepened

- Rooted in **David Chaum's blind signature** concept (1982)
- SHA-256 combined with a **cryptographically secure blinding factor (salt)**
- Potential upgrade path to **Paillier encryption** for homomorphic operations on encrypted data
- **Absolute unlinkability**: the signing authority cannot link the blinded request to the unblinded output

### 8. Panic Button Technical Specifics

- `event.stopPropagation()` **first** — prevents keystroke from conflicting with modals or screen readers
- `document.body.innerHTML = ''` — instant visual wipe before any network latency
- `window.history.replaceState()` — overwrites (not pushes) the history entry, excising the sensitive URL
- `window.location.replace()` — final redirect, prevents back-button return
- Must not use single Escape key alone (conflicts with assistive technology browse mode transitions)
- **DOMPurify** for output sanitization to prevent DOM-based XSS

---

## How This Research Feeds Forward

| Research Finding | Implementation Target |
|-----------------|----------------------|
| Dual-file governance | `.cursorrules` (updated) + `.cursor-state.md` (new) |
| Pre-execution hooks | Encoded in `.cursorrules` behavioral mandate |
| SPAR-TDD phase map | Reference table in both config files |
| Differential diagnosis | Agent behavioral mandate |
| Module: Vault OPSEC | `Act/05-module-vault.md` → first TDD cycle |
| Module: Guardrail Isolation | `Act/06-module-guardrail.md` → second TDD cycle |
| Module: Panic Button | `Act/07-module-panic-button.md` → third TDD cycle |
| NeSy refinements | Architecture docs update |
| Blind Key deepened | Crypto module design |
| Panic Button specifics | Quick Exit component spec |
