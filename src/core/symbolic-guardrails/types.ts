/**
 * Types for the Symbolic Governance Layer.
 *
 * The symbolic layer evaluates neural perception outputs against
 * deterministic security rules. It never imports from neural-eval —
 * it receives typed data through these interfaces only.
 */

export interface SymbolicFeature {
  conceptId: string;
  confidence: number;
  source: 'neural' | 'heuristic' | 'rule';
}

export interface SymbolicFeatureSet {
  features: SymbolicFeature[];
  rawPayload: string;
  timestamp: Date;
  sessionId?: string;
}

export type GateVerdict = 'ALLOW' | 'REJECT' | 'QUARANTINE';

export interface GateResult {
  verdict: GateVerdict;
  policyId: string | null;
  triggerBehavior: string | null;
  processingTimeMs: number;
}

export interface AuditEntry {
  timestamp: string;
  policyId: string;
  triggerBehavior: string;
  requestHash: string;
  action: 'BLOCKED' | 'QUARANTINED';
  neuralConfidence: number;
  symbolicVerdict: GateVerdict;
}

export interface RailRule {
  id: string;
  description: string;
  patterns: RegExp[];
  threshold: number;
  action: 'REJECT' | 'QUARANTINE';
}

export interface RailSpec {
  version: string;
  rules: RailRule[];
}
