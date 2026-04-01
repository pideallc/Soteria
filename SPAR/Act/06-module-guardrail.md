# Act Phase: Module 2 — Guardrail Isolation (Neuro-Symbolic Defense)

**Date:** April 1, 2026  
**Source:** Final Gemini Deep Research — Module execution specification  
**SPAR Stage:** Act — Second TDD cycle for the MVP  
**Priority:** 2 of 3 (semantic firewall)

---

## Mission Context

The Guardrail Isolation module acts as the semantic firewall for the platform. It protects the system's underlying language models and API endpoints from targeted misuse, data poisoning, and adversarial perturbations. Standard alignment training and safety fine-tuning provide only superficial robustness against jailbreak attacks — a deterministic defense mechanism is required.

---

## Architecture: ConceptGuard-Inspired Neuro-Symbolic Filtering

1. **Neural Perception Layer** processes unstructured inputs (user requests, API payloads, behavioral event logs) to extract semantic intent, classify sentiment, and identify anomalies
2. **Sparse Autoencoders (SAEs)** monitor internal LLM activations, identifying interpretable semantic concepts associated with threat themes
3. **Otsu-Thresholding** separates meaningful semantic features from noise features
4. **Symbolic Governance Layer** evaluates neural classifications against predefined security rules (RAIL specifications) and zero-trust access policies
5. **Deterministic Gate** — only outputs passing all symbolic checks are authorized for execution

The neural layer's probabilistic outputs **never directly influence system state**. They must pass through the symbolic gate first.

---

## SPAR-TDD Execution Cycle

### Sense

Agent analyzes current API routing and the interface points where user input interacts with any language model or data processing. Identifies all paths where external input could reach internal systems.

### Plan → RED (Write Failing Tests)

```
File: /tests/security/guardrail-isolation.test.ts

describe('Guardrail Isolation: Neuro-Symbolic Defense', () => {

  describe('Architectural Boundary', () => {
    it('should have no imports from neural-eval in symbolic-guardrails directory')
    it('should enforce one-way data flow: neural → symbolic → action')
    it('should reject any direct neural output reaching system state')
  })

  describe('Adversarial Input Rejection', () => {
    it('should return HTTP 403 for known jailbreak payloads')
    it('should return HTTP 403 for prompt injection attempts')
    it('should return HTTP 403 for PII aggregation patterns')
    it('should return HTTP 403 for identity correlation attempts')
    it('should handle payload with nested obfuscation techniques')
  })

  describe('Symbolic Rule Enforcement', () => {
    it('should always fire guardrail when threat score exceeds threshold')
    it('should fire guardrail regardless of current UI state')
    it('should fire guardrail regardless of user session state')
    it('should produce an auditable log entry for every blocked action')
    it('should include policy ID and trigger behavior in the log')
  })

  describe('RAIL Specification Compliance', () => {
    it('should validate payload structure against RAIL schema')
    it('should reject payloads violating structural constraints')
    it('should sanitize all reflected output with DOMPurify')
    it('should prevent DOM-based XSS in any client-reflected data')
  })

  describe('Performance', () => {
    it('should process the symbolic gate in under 50ms')
    it('should not introduce observable latency to normal requests')
  })

})
```

**Verification:** All tests must fail. No implementation file edits permitted.

### Act → GREEN (Minimum Implementation)

Agent writes:
1. **RAIL specification file** — XML-based structural and content constraints for payloads
2. **Symbolic validation engine** — deterministic parser that evaluates inputs against RAIL specs
3. **Threat classification interface** — accepts neural perception output, maps to symbolic feature set
4. **Deterministic gate function** — `evaluateSymbolicGate(features: SymbolicFeatureSet): GateResult`
5. **Audit logger** — records every block with `{ policyId, triggerBehavior, timestamp, requestHash }`
6. **Output sanitizer** — DOMPurify integration for all client-reflected data

**Constraint:** No neural model training, no SAE implementation yet — the GREEN phase builds only the symbolic governance layer and its interfaces. The neural perception layer is stubbed with typed interfaces.

### Reflect → REFACTOR

- Optimize the symbolic gate for <50ms processing
- Ensure audit log entries are themselves hashed (no PII in logs)
- Review RAIL specifications for completeness against known attack patterns
- Verify the stub interfaces are typed strictly enough that future neural integration cannot bypass the gate
- Run adversarial test: attempt to craft a payload that passes the symbolic gate while containing malicious intent

---

## Success Criteria

| Property | Assertion |
|----------|-----------|
| No boundary violations | Zero imports from neural-eval in symbolic-guardrails |
| Jailbreak rejection | All known payloads return 403 |
| Guardrail determinism | Fires at threshold regardless of state |
| Audit trail | Every block logged with policy ID + behavior |
| XSS prevention | All reflected output sanitized |
| Latency | Symbolic gate < 50ms |

---

## Audit Trail Format

```json
{
  "timestamp": "2026-04-01T03:42:00Z",
  "policyId": "STRICT_IDENTITY_SEGREGATION",
  "triggerBehavior": "UNAUTHORIZED_PII_AGGREGATION",
  "requestHash": "a3f8c2...",
  "action": "BLOCKED",
  "neuralConfidence": 0.92,
  "symbolicVerdict": "REJECT"
}
```

This format satisfies both technical debugging and the feminist principle of technological accountability — every defensive action is explainable.
