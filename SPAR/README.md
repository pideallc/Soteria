# SPAR Framework — Project Soteria

This directory documents the development of Project Soteria using the **SPAR framework** (Sense, Plan, Act, Reflect) by Pascal Bornet. SPAR provides a structured cognitive loop for autonomous agents and human decision-makers to build iteratively, with each phase feeding into the next.

## What is SPAR?

| Phase | Purpose | Soteria Application |
|-------|---------|---------------------|
| **Sense** | Gather context, understand the environment, identify constraints | Research feminist cybersecurity landscape, threat models, academic discourse, target populations |
| **Plan** | Formulate strategy, make architectural decisions, define tests before code | Name selection, vanguard strategy, neural-symbolic architecture, TDD directives, design system choices |
| **Act** | Execute the plan — build, write, deploy | Prototype builds (Cursor, Stitch, Gemini), Blind Key implementation, stakeholder communications |
| **Reflect** | Evaluate outcomes, course-correct, refine | Mission recentering, inclusivity corrections, jargon elimination, trauma-informed design principles |

## Context

This documentation captures a rapid prototyping session conducted on the night of March 31 / April 1, 2026, during which the Soteria concept was researched, named, architected, prototyped across three platforms, and prepared for stakeholder review — all in a single session leveraging AI agents (Gemini Pro, Cursor) and Google Stitch.

The conversation with Gemini Pro is documented across the four SPAR phases, organized by the nature of each exchange rather than strict chronological order. Cross-references are noted where a single exchange spans multiple phases.

## Foundational Document

The comprehensive research paper `Sense/05-whitepaper.md` — *"Engineering Project Shield: A Neuro-Symbolic Architecture for Trauma-Informed, Feminist Cybersecurity"* — is the full output of Gemini Pro's Deep Research synthesis. This 7-section whitepaper covers the theoretical foundation (feminist cybersecurity discourse), the threat landscape (stalkerware, doxxing, financial exclusion), the NeSy architecture (G-I-A framework, causal reasoning, semantic guardrails), identity segregation (DIDs, ZKPs, TEEs), trauma-informed UX, and the curb-cut effect. It is the document from which all other SPAR materials are derived.

> **Note:** The paper uses the working title "Project Shield" (Gemini's invention). The project was renamed **Soteria** after the paper was generated. See `Plan/01-naming.md`.

## Folder Structure

```
SPAR/
├── README.md                    (this file)
├── Sense/
│   ├── 01-research-question.md  (the founding prompt and theoretical framing)
│   ├── 02-landscape-analysis.md (core issues, academics, pioneers)
│   ├── 03-threat-models.md      (gendered threats, target populations, vanguard strategy)
│   ├── 04-design-systems.md     (design system research and recommendations)
│   ├── 05-whitepaper.md         (*** FULL RESEARCH PAPER — foundational reference ***)
│   ├── 06-gemini-research-process.md (reasoning trace: 25 cycles, 7 threads, contradictions resolved)
│   └── 07-research-bibliography.md   (complete bibliography: ~147 unique sources across 10 categories)
├── Plan/
│   ├── 01-naming.md             (goddess naming process and Soteria selection)
│   ├── 02-architecture.md       (neural-symbolic architecture decisions)
│   ├── 03-blind-key-protocol.md (privacy engineering strategy)
│   ├── 04-tdd-directives.md     (test-driven development mandates and .cursorrules)
│   ├── 05-agent-automations.md  (Cursor agent automation strategies)
│   └── 06-rules-automations-skills.md (comprehensive analysis: 8 rules, 6 automations, 6 skills)
├── Act/
│   ├── 01-prototypes.md         (three parallel builds: Cursor, Stitch, Gemini)
│   ├── 02-hashing-implementation.md (real SHA-256 client-side hashing)
│   ├── 03-stakeholder-comms.md  (text message, email drafts for Brelyn)
│   └── 04-tdd-execution-plan.md (SPAR-aligned TDD workflow for MVP)
└── Reflect/
    ├── 01-mission-recentering.md (correcting the "scale to mainstream" framing)
    ├── 02-inclusivity.md         (centering sex workers and marginalized communities)
    ├── 03-communication-clarity.md (eliminating jargon, respecting the audience)
    └── 04-agent-awareness.md     (recognizing agent speed blindness and context gaps)
```

## Participants

- **Shad** — Founder, architect, prototyper
- **Brelyn** — Co-founder, entrepreneur, originated the feminist cybersecurity platform vision
- **Gemini Pro** — Research and brainstorming partner, content generation
- **Cursor Agent** — Code generation, website integration, TDD execution
- **Google Stitch** — Mobile-first prototype design
