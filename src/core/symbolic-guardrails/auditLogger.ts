import type { GateResult, SymbolicFeatureSet, AuditEntry } from './types.js';
import { sha256 } from '../crypto/sha256.js';

/**
 * Creates an audit entry for a blocked or quarantined action.
 *
 * The audit trail satisfies both technical debugging and the feminist
 * principle of technological accountability: every defensive action
 * the platform takes is explainable and traceable to a specific policy.
 *
 * The requestHash is a SHA-256 of the raw payload — the payload
 * itself is never stored in the log (no PII in audit entries).
 */
export async function createAuditEntry(
  result: GateResult,
  featureSet: SymbolicFeatureSet,
  neuralConfidence: number
): Promise<AuditEntry> {
  const requestHash = await sha256(featureSet.rawPayload);

  return {
    timestamp: new Date().toISOString(),
    policyId: result.policyId ?? 'UNKNOWN',
    triggerBehavior: result.triggerBehavior ?? 'UNKNOWN',
    requestHash,
    action: result.verdict === 'QUARANTINE' ? 'QUARANTINED' : 'BLOCKED',
    neuralConfidence,
    symbolicVerdict: result.verdict,
  };
}
