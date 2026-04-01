# Plan Phase: Neural-Symbolic Architecture

**Date:** April 1, 2026  
**Source:** Gemini research synthesis, iterative prototype refinement  
**SPAR Stage:** Plan — Core technical architecture decisions

---

## The Architecture: Neural-Symbolic AI

Soteria's core technical differentiator is a **neural-symbolic architecture** — the synthesis of two fundamentally different AI approaches working in concert.

### Why Neural-Symbolic?

Traditional cybersecurity uses either rule-based systems (brittle, can't adapt) or ML models (probabilistic, can make dangerous mistakes). Soteria's mission — protecting people in life-or-death situations — demands both:

- **Adaptability** to detect never-before-seen threats (neural)
- **Absolute guarantees** that certain safety rules are never violated (symbolic)

---

## The Two Layers

### The Adaptive Neural Layer ("The Neural Sentry" / "Intuition")

**Function:** Continuous threat-modeling of emerging patterns.

**What it does:**
- Detects doxxing campaigns and stalkerware signatures before they are codified into known databases
- Behavioral anomaly detection across app ecosystems
- Zero-day stalkerware pattern recognition
- Contextual threat escalation scoring
- Watches for the *behavioral patterns of violence* — how stalkers, state actors, and abusers move through digital breadcrumbs — rather than just looking for known malware

**Processing mode:** Real-time Behavioral

**Key insight from prototyping:** This layer handles **non-linear threats**. It actively models patterns like coordinated "SW-baiting" traps or stalkerware exfiltration *before the attack fully materializes*.

### The Symbolic Guardrails ("The Symbolic Foundation" / "Ethics")

**Function:** Hardcoded safety protocols grounded in feminist principles.

**What it does:**
- Immutable identity partition boundaries
- Duress-aware biometric verification
- Deterministic data-sovereignty enforcement
- Inviolable rules regarding identity segregation
- Non-coercive authentication requirements

**Processing mode:** Deterministic Logic

**Key examples of hardcoded rules:**
- "Never exfiltrate location data during a distress event"
- "Instantly segregate digital identity if platform de-banking is detected"
- "Access to Real_Identity field is restricted until User_Consent_Token is TRUE"

**Critical property:** These guardrails **cannot be bypassed by the neural net**. No matter what the neural layer's confidence score says, the symbolic layer has absolute veto power over actions that could endanger a user.

---

## The Synthesis

> "Intuition detects the ghost; Logic builds the wall."

The two layers interact through a strict protocol:

```
Neural Output → Symbolic Validation → Action
```

Key constraints:
- **No false positives that alert abusers** — the neural layer flags threats, but the symbolic layer validates before any visible action
- **Every action passes ethics guardrails** — no automated response can violate the hardcoded feminist principles
- **One-way data flow** — symbolic guardrails never import or depend on probabilistic neural modules

### System Data Flow

```
User Device (local encryption)
    → Neural Analysis (threat detection & scoring)
    → Symbolic Validation (ethics & rule enforcement)
    → Risk Assessment (combined neural + symbolic)
    → Action Engine (context-aware response)
    → Safe Action (ghost data, partition, alert)
```

---

## Architecture Boundary Enforcement

For the integrity of the system, the neural and symbolic layers must be **physically separated in the codebase**:

```
/src/core/symbolic-guardrails/   ← Deterministic logic ONLY
/src/core/neural-eval/           ← Probabilistic models ONLY
```

**Cursor agent automation** (see `Plan/05-agent-automations.md`) will automatically reject any import statements where a symbolic guardrail attempts to import or depend on a probabilistic neural module.

---

## Architecture in the Prototype

The website prototype represents the architecture as a three-column layout:

| Left Column | Center | Right Column |
|------------|--------|-------------|
| Adaptive Neural Layer | The Synthesis | Symbolic Guardrails |
| Rose accent (#9D174D) | Gradient bridge | Teal accent (#134E4A) |
| Pulsing status indicator | Cross symbol | Static status indicator |
| "Real-time Behavioral" | "Bridging Intuition & Logic" | "Deterministic Logic" |

This visual separation reinforces the conceptual separation of the two layers while showing that they work together through the synthesis point.
