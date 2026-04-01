# Act Phase: Three Parallel Prototypes

**Date:** April 1, 2026  
**Source:** Entire conversation session — builds across Gemini, Cursor, and Stitch  
**SPAR Stage:** Act — Executing the plan through "Diversity of Mind"

---

## The Diversity of Mind Principle

All prototypes were built simultaneously across three different environments. This approach — called **"diversity of mind"** — intentionally lets the unique constraints and workflows of different tools challenge assumptions and shape how UX problems are solved.

Each environment forces different trade-offs:
- **Gemini:** Rapid ideation, full-page generation, research integration — but loses context when generating new versions
- **Cursor:** Code-level precision, version control, integration of multiple concepts — but requires explicit instruction
- **Stitch:** Mobile-first visual design, component-driven — but separate from codebase logic

---

## Prototype 1: Gemini (Raw Architectural Sandbox)

### What it produced
Two complete HTML pages generated over the course of the conversation:

**Version 1 (Scrolling Single-Page):**
- Foundational layout with smooth scroll navigation
- Intelligence Gap section with radar chart comparison (Chart.js)
- Neural-Symbolic Architecture three-column design
- Three interactive scenario simulations (Stalkerware, Identity Segregation, Financial Sovereignty)
- Community signup flow with Firebase/Firestore integration
- Soteria Harmony color palette

**Version 2 (Multi-View Dashboard):**
- Tabbed navigation between views (Vision, Intelligence, Protocol, Pioneers)
- The Blind Key Protocol section with **real** SHA-256 hashing sandbox (Web Crypto API)
- Expanded Pioneers/Ground Game section with organizational profiles
- The Vault signup with blind-key display and storage
- JetBrains Mono monospace font for cryptographic elements
- Soteria Deep color palette (added indigo accent)

### Key learning from Gemini builds
- Gemini tends to **overwrite previous content** when generating new features (identified and corrected: "you seem to have deleted all the previous content")
- The "simulation vs. real" gap was caught when the hashing was initially decorative, not functional ("Does it actually do it though?")
- Each version contributed unique elements that neither contained on its own

---

## Prototype 2: Cursor (Integrated Codebase)

### What it produced
A single comprehensive `index.html` integrating the best of both Gemini versions, with significant expansion:

**Seven sections total** (up from 5 in each Gemini version):
1. Hero/Vision — Goddess archetype with three pillars (Metis Wisdom, Artemis Shield, Blind Key)
2. Intelligence Gap — Radar chart, threat model comparison, stats grid, gendered violence block
3. Neural-Symbolic Architecture — Three-column layout with expanded detail + system data flow diagram
4. Blind Key Protocol — Three-step explanation + live SHA-256 hashing sandbox
5. Operational Scenarios — Four interactive simulations with three-phase detail each
6. Pioneers/Ground Game — Expanded profiles + Core Feminist Principles grid
7. The Vault — Signup with blind key hashing + Firebase persistence (graceful degradation)

**New content added by Cursor:**
- Fourth scenario: Doxxing Defense
- Third phase per scenario: Resolution (Detection → Protocol → Resolution)
- System Data Flow diagram (10-step visual pipeline)
- Core Feminist Principles grid (Communal Care, Bodily Autonomy, Radical Accessibility)
- Stats grid with 4 key metrics
- Firebase graceful degradation (works without config)

### Deployment
- Pushed to GitHub at `pideallc/Soteria`
- Live at: https://pideallc.github.io/Soteria/ (pending GitHub Pages activation)

---

## Prototype 3: Stitch (Mobile-First Visual Design)

### What it produced
A mobile-optimized prototype focused on:
- How the interface **feels in the palm of your hand**
- Layout and color adaptation for phone screens
- Whether the design conveys a **calm, safe, easy-to-navigate space** for someone in a high-stress situation

### Access
- Link: https://stitch.withgoogle.com/preview/5428734180958611790?node-id=af8762326158437e9204069ffc44f1ef
- QR code generated for mobile access (included in email to Brelyn)

### Purpose relative to other prototypes
While the Cursor website tells the whole story, Stitch tests the **tactile, emotional experience** of the interface. The question it answers: "Does this feel like a sanctuary?"

---

## Cross-Pollination Between Prototypes

| Element | Originated In | Adopted By |
|---------|--------------|-----------|
| Radar chart comparison | Gemini V1 | Cursor |
| Blind Key live hashing | Gemini V2 | Cursor |
| Three-column architecture | Gemini V1 | Cursor |
| Pioneer profiles | Gemini V2 | Cursor |
| System data flow diagram | Cursor | (new) |
| Doxxing Defense scenario | Cursor | (new) |
| Three-phase scenario detail | Cursor | (new) |
| Feminist Principles grid | Cursor | (new) |
| Mobile-first layout testing | Stitch | (informs future Cursor responsive) |
