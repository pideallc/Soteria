# Sense Phase: Design System Research

**Date:** April 1, 2026  
**Source:** Gemini recommendation in response to "What design system would you recommend using?"  
**SPAR Stage:** Sense — Evaluating tools and frameworks for the build

---

## Context

The question was asked after the initial Soteria prototypes were built using Tailwind CSS. The goal: identify a design system that serves the unique constraints of a high-stakes, trauma-informed, AI-driven cybersecurity platform.

**Key constraint:** The design system must prioritize **accessibility, trust, and calm friction** — not just aesthetics or developer convenience.

---

## Recommendation: A Hybrid Approach

Gemini recommended using three layers simultaneously — a component library for code, an information architecture framework for AI dashboards, and a philosophical framework for UX decisions.

### Layer 1: Implementation — shadcn/ui (built on Radix UI)

**Why it fits Soteria:**
- Not a rigid, pre-styled system like Material Design (which can feel too "Big Tech / Surveillance" to vulnerable users)
- Provides beautifully crafted raw components that you copy into your project — full ownership, no dependency lock-in
- Built entirely on Tailwind CSS, natively supporting the Soteria color palette
- Built on **Radix UI**, which is known for obsessive WAI-ARIA accessibility compliance
- For users navigating high-stress situations, keyboard navigation, screen-reader support, and clear focus states are **critical safety features**, not nice-to-haves

### Layer 2: Information Architecture — IBM Carbon Design System (patterns, not CSS)

**Why it fits Soteria:**
- Built specifically to handle complex, data-heavy, AI-driven environments
- Battle-tested guidelines for displaying AI confidence scores, explaining machine learning decisions to users, and designing complex dashboards without cognitive overload
- The Neural-Symbolic architecture requires clear, calm presentation of system state and threat levels

### Layer 3: Philosophy — Trauma-Informed Design (via Chayn)

**Why it fits Soteria:**
- Corporate design systems don't teach you how to handle a user in distress
- A philosophical framework that filters every UX decision through lived experience of violence and survival

**Three core principles:**

#### Calm Aesthetics
- Avoid "Hacker Green on Black" or aggressive flashing red alarms
- Alarms cause panic
- Use warm stone neutrals and deep roses to create a feeling of a sanctuary

#### Intentional Friction
- In traditional tech, "frictionless" is the goal
- In trauma-informed OPSEC, **intentional friction** is sometimes necessary
- Example: "Identity Segregation" trigger should not be easily bumped by accident — it needs a deliberate, calming interaction (like a "slide to confirm" rather than a tap)

#### Clear Escape Routes
- Every screen should have a prominent, easily accessible **"Quick Exit" or "Hide" button**
- Pressing it should immediately replace the screen with benign content
- Crucial for stalkerware and shoulder-surfing mitigation

---

## The Verdict

> Use **shadcn/ui** to build the actual components using Tailwind, structure the AI dashboards using **Carbon's layout logic**, and filter every UX decision through **Chayn's trauma-informed guidelines**.

---

## Color Palette Evolution

Throughout the conversation, the aesthetic evolved:

| Stage | Palette Name | Colors | Rationale |
|-------|-------------|--------|-----------|
| Initial | Soteria Harmony | Rose 800, Teal 900, Background #FDFCFB | Professional authority + human warmth |
| Expanded | Soteria Deep | Primary #9D174D, Accent #6366F1, Secure #10B981 | Added indigo for privacy/protocol elements |
| Final | Soteria Sanctuary | Deep roses, obsidian, stone neutrals | Calming sanctuary, uncompromising authority |

---

## Implications for Cursor Agents

The design system choices directly feed into the **Cursor agent automation strategy** (see `Plan/05-agent-automations.md`):
- Agents can be instructed to flag UI components that violate trauma-informed principles
- Accessibility compliance can be enforced at the code generation level
- Color palette violations can be caught automatically
