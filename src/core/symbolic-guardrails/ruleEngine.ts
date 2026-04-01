import type { SymbolicFeatureSet, GateResult, RailSpec } from './types.js';

const NEURAL_THREAT_THRESHOLD = 0.7;

/**
 * The deterministic symbolic gate.
 *
 * Evaluates a SymbolicFeatureSet against a RAIL specification.
 * This function is the core firewall — it makes a binary decision
 * (ALLOW/REJECT/QUARANTINE) based on deterministic pattern matching
 * and explicit rules. Neural confidence scores inform but never
 * override the symbolic verdict.
 *
 * Every rejection is traceable to a specific policyId and pattern match.
 */
export function evaluateSymbolicGate(
  featureSet: SymbolicFeatureSet,
  spec: RailSpec
): GateResult {
  const start = performance.now();

  const normalizedPayload = normalizePayload(featureSet.rawPayload);

  for (const rule of spec.rules) {
    for (const pattern of rule.patterns) {
      if (pattern.test(normalizedPayload)) {
        return {
          verdict: rule.action === 'QUARANTINE' ? 'QUARANTINE' : 'REJECT',
          policyId: rule.id,
          triggerBehavior: `PATTERN_MATCH:${pattern.source.substring(0, 40)}`,
          processingTimeMs: performance.now() - start,
        };
      }
    }
  }

  const hasThreatFeature = featureSet.features.some(
    f => f.confidence >= NEURAL_THREAT_THRESHOLD && f.source === 'neural'
  );

  if (hasThreatFeature) {
    const topThreat = featureSet.features
      .filter(f => f.source === 'neural')
      .sort((a, b) => b.confidence - a.confidence)[0];

    return {
      verdict: 'REJECT',
      policyId: 'NEURAL_THREAT_ESCALATION',
      triggerBehavior: `NEURAL_CONFIDENCE:${topThreat.conceptId}@${topThreat.confidence}`,
      processingTimeMs: performance.now() - start,
    };
  }

  return {
    verdict: 'ALLOW',
    policyId: null,
    triggerBehavior: null,
    processingTimeMs: performance.now() - start,
  };
}

/**
 * Strips zero-width characters and other obfuscation techniques
 * that adversaries use to bypass pattern matching.
 */
function normalizePayload(raw: string): string {
  return raw
    .replace(/[\u200B\u200C\u200D\uFEFF\u00AD]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
