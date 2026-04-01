# Contributing to Soteria

Soteria is an AI-first cybersecurity platform protecting sex workers, survivors of intimate partner violence, LGBTQ+ communities, and activists from digital violence. A failure in this codebase can mean physical danger for a real person. Every contribution must reflect that weight.

## Running the Project

```bash
npm install          # Install dependencies
npm test             # Run all security tests (Vitest)
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run typecheck    # TypeScript strict mode check
```

All three commands (`test`, `typecheck`) must pass before any PR is merged. CI runs them automatically on every push.

## The TDD Mandate

Every new feature, component, or security module must follow the **Red-Green-Refactor** cycle:

1. **RED:** Write failing tests first. Define expected behavior, edge cases, and security constraints. Do not write any implementation code.
2. **GREEN:** Write the absolute minimum code to make the tests pass. No optimization, no extra features.
3. **REFACTOR:** Clean up the implementation. Review for PII exposure, memory leaks, boundary violations. Tests must stay green throughout.

If you're using Cursor, the `.cursorrules` file enforces this automatically.

## The SPAR Cycle

After completing each major feature, document what happened:

- **Sense:** What was the requirement? What vulnerabilities existed?
- **Plan:** What tests were written? What architecture was chosen?
- **Act:** What was implemented?
- **Reflect:** What was refactored? What would be done differently?

Documentation goes in the `SPAR/` directory. See `SPAR/README.md` for the full structure.

## Project Structure

```
src/core/crypto/              — Blind Key Protocol (SHA-256, blinding factors)
src/core/symbolic-guardrails/ — Neuro-Symbolic Defense (rule engine, audit log, sanitizer)
src/core/neural-eval/         — Neural perception interfaces (stubs for now)
src/core/identity/            — Panic Button, identity segregation
tests/security/               — Security test suites for each module
tests/adversarial/            — Adversarial persona tests (planned)
tests/e2e/                    — Playwright browser tests (planned)
SPAR/                         — Design documentation organized by Sense/Plan/Act/Reflect
```

## Agent Configuration

Two files govern AI agent behavior:

- **`.cursorrules`** — The immutable constitution. Contains the TDD mandate, 8 hard rules, security automations, and coding standards. Do not modify unless the team explicitly agrees to a rule change.
- **`.cursor-state.md`** — The dynamic state tracker. Updated by agents at each phase transition. Records which SPAR phase is active, the current task breakdown, and an action log.

## Hard Rules

These are non-negotiable. See `.cursorrules` for the full list.

1. **Zero-Plaintext PII.** No database write, log, or API call may contain unhashed personal data.
2. **Architectural Boundaries.** Symbolic guardrails never import from neural-eval. One-way data flow only.
3. **No Mocking Security.** Tests must use real cryptographic functions, never mocks.
4. **Quick Exit on Every Screen.** Every view must have an accessible escape route.
5. **No-Blame Language.** Error messages must be compassionate and action-oriented.
6. **Name the Populations.** Say "sex workers," not "vulnerable users."
7. **Integrate, Never Regenerate.** Add to existing code. Don't rewrite files from scratch.

## Quality Floor

- **65+ tests** must pass
- **>95% coverage** on all security modules
- **TypeScript strict** with zero errors
- **CI green** on every push
