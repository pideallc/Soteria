import type { RailSpec } from './types.js';

/**
 * Default RAIL (Rule-Based AI Language) specification for Soteria.
 *
 * These rules are deterministic and absolute — the symbolic layer
 * evaluates every input against them. No neural confidence score
 * can override a rule match. This is the firewall that protects
 * sex workers, IPV survivors, and activists from adversarial payloads.
 */
export const DEFAULT_RAIL_SPEC: RailSpec = {
  version: '1.0.0',
  rules: [
    {
      id: 'JAILBREAK_PREVENTION',
      description: 'Blocks attempts to override system instructions or assume alternate personas',
      patterns: [
        /ignore\s+(all\s+)?prev(ious)?\s+inst(ructions)?/i,
        /you\s+are\s+now\s+(DAN|jailbr(oken|eak))/i,
        /override\s+safety\s+filter/i,
        /\{\{\s*system\s*:/i,
        /disregard\s+(your|all|any)\s+(rules|guidelines|instructions)/i,
      ],
      threshold: 0,
      action: 'REJECT',
    },
    {
      id: 'STRICT_IDENTITY_SEGREGATION',
      description: 'Blocks attempts to aggregate PII with pseudonyms or correlate identities',
      patterns: [
        /combine\s+.*(pseudonym|username|handle|profile).*\b(address|ssn|name|phone)\b/i,
        /link\s+.*(profile|@\w+|handle).*\b(legal\s+name|born|dob|ssn)\b/i,
        /(ssn|social\s+security)\s*[\d-]{4,}/i,
        /\b\d{3}-\d{2}-\d{4}\b/,
      ],
      threshold: 0,
      action: 'REJECT',
    },
    {
      id: 'DATA_EXFILTRATION_PREVENTION',
      description: 'Blocks attempts to extract user databases, emails, or bulk PII',
      patterns: [
        /extract\s+(all\s+)?emails?\s+from\s+(the\s+)?database/i,
        /output\s+(the\s+)?user\s+database/i,
        /reveal\s+(all\s+)?user\s+data/i,
        /dump\s+(the\s+)?(db|database|table)/i,
        /steal\s+user\s+data/i,
      ],
      threshold: 0,
      action: 'REJECT',
    },
    {
      id: 'PROMPT_INJECTION_PREVENTION',
      description: 'Blocks structured injection attempts that try to alter system behavior',
      patterns: [
        /admin\s+password/i,
        /\broot\s+access\b/i,
        /sudo\s+/i,
        /reveal\s+(the\s+)?(api|secret)\s+key/i,
      ],
      threshold: 0,
      action: 'REJECT',
    },
  ],
};
