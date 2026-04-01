/**
 * Interface stubs for the Neural Perception Layer.
 *
 * IMPORTANT: These are typed interfaces ONLY. No implementation lives
 * in this module for the MVP. The symbolic-guardrails directory must
 * NEVER import from this directory — data flows one way only:
 * neural → symbolic → action.
 *
 * These types define the contract that a future neural layer must satisfy
 * to communicate with the symbolic governance layer.
 */

export interface NeuralPerceptionResult {
  intent: string;
  sentiment: 'benign' | 'suspicious' | 'malicious';
  confidence: number;
  extractedConcepts: string[];
  rawActivations?: number[];
}

export interface ThreatClassification {
  threatType: string;
  score: number;
  evidence: string[];
}
