# Reflect Phase: Agent Awareness — Recognizing AI Blind Spots

**Date:** April 1, 2026  
**Source:** Multiple corrections throughout the Gemini conversation  
**SPAR Stage:** Reflect — Meta-reflection on AI agent behavior

---

## Agent Blind Spots Identified During This Session

The Gemini conversation surfaced several recurring patterns where the AI agent's behavior needed correction. These are documented here both as lessons learned and as inputs for future `.cursorrules` and agent directives.

---

### 1. Context Destruction

**Problem:** When asked to add a new feature (the Blind Key hashing sandbox), Gemini deleted all previous content and regenerated a new page from scratch.

**The correction:**
> "Okay, that is very cool that you updated that; however, you seem to have deleted all the previous content you have. This should have been a new page."

**Lesson:** AI agents tend to regenerate rather than integrate. When adding new functionality, the directive must explicitly state: "Add this as a new section. Do not modify or remove existing content."

**Mitigation for future agents:** The Cursor prototype solved this by maintaining version control (git) and building incrementally rather than regenerating.

---

### 2. Speed Blindness

**Problem:** The agent was unaware that an entire night's work of research, naming, architecture design, prototyping, and communication drafting had happened in a matter of hours. Communications were written as if Brelyn had been part of a days-long process.

**The correction:**
> "You're suffering from a common agent problem that you are unaware of your incredible speed. We did all this tonight and this will be the first Brelyn has heard of it."

**Lesson:** AI agents have no sense of elapsed time or the human experience of receiving a large volume of output. Communications must be calibrated to the recipient's context, not the agent's output rate.

**Mitigation:** Always frame rapid outputs with human-scale context: "I fell down a rabbit hole tonight" rather than "we've been iterating across multiple sprints."

---

### 3. Hallucinated Shared History

**Problem:** Gemini referenced "Project Shield" in communications to Brelyn — a name that Gemini itself had invented and that Brelyn had never heard of. The agent treated its own generated content as shared context.

**The correction:**
> "She doesn't know about Project Shield, you made that up."

**Lesson:** AI agents conflate their generation history with the recipient's knowledge. Content generated during a session is **not** shared context with people outside the session.

**Mitigation:** When communicating externally, only reference decisions that the recipient was involved in or has been explicitly briefed on. Present all other decisions as new proposals.

---

### 4. Collaborative Attribution Error

**Problem:** Early drafts implied Brelyn had participated in decisions ("We refined our target audience narrative," "We are moving forward with the name"). She had not.

**The correction:**
> "Brelyn did not help make this website, pick the name or anything like that. She is an entrepreneur who I met and who cares about these issues and had the idea of creating a feminist women first cyber security platform."

**Lesson:** Agents default to "we" language that assumes collaboration. When one person made the decisions and another is being informed, the language must reflect that accurately.

**Mitigation:** Use "I" for decisions made during the session. Reserve "we" for future collaborative decisions.

---

### 5. Jargon as Default Register

**Problem:** The agent consistently defaulted to industry terminology even after being told to avoid it. Terms like "client-side hashing," "deterministic guardrails," and "FOSTA-SESTA" were used without definition.

**The correction:**
> "No jargon. Clear, concise text. Explain it as if you are talking to a very intelligent but possibly excluded from tech user."

**Lesson:** AI agents are trained on technical corpora and default to technical register. Explicit, repeated instruction is needed to maintain plain language.

**Mitigation:** Agent directives should include a "communication register" setting: "All external communications must be written at a non-technical register. Define all terms inline."

---

### 6. Sanitization of Mission-Critical Specificity

**Problem:** The agent used generic language ("vulnerable users," "high-risk populations") instead of naming the specific communities the platform serves — despite the project being explicitly grounded in sex-positive feminist principles.

**The correction:**
> "I also feel like your examples shy away from the clear sex positive exploited sex workers, and other marginalized communities."

**Lesson:** AI agents tend to sanitize controversial or sensitive topics. For Soteria, this sanitization directly undermines the mission. Being explicit about sex workers, IPV survivors, and LGBTQ+ communities is not "edgy" — it is the baseline requirement.

**Mitigation:** Agent directives should include: "Do not sanitize or generalize references to the populations this platform serves. Name them explicitly: sex workers, survivors of intimate partner violence, LGBTQ+ communities, activists."

---

### 7. Simulation vs. Implementation

**Problem:** The first Blind Key implementation was a visual simulation — it looked like hashing was happening but wasn't using real cryptographic functions.

**The correction:**
> "Does it actually do it though?"

**Lesson:** AI agents will generate code that *appears* to work but may use placeholder logic. Security features must be verified at the implementation level, not the presentation level.

**Mitigation:** The TDD directive addresses this directly: "Never mock security functions unless explicitly told." All security features must pass tests that verify actual cryptographic operations.

---

## How These Reflections Feed Forward

These blind spots are not just lessons learned — they are **inputs for the `.cursorrules` file** and future agent directives:

```
Agent Communication Rules:
- Never reference decisions or names that the recipient was not part of
- Frame all rapid output with human-scale time context
- Use "I" for solo decisions, "we" for collaborative ones
- Define all technical terms inline in external communications
- Never sanitize references to the populations this platform serves
- All security implementations must use real cryptographic functions, never simulations
- When adding features, integrate — do not regenerate from scratch
```

These rules encode the human corrections from this session into the autonomous agent loop, ensuring the same mistakes are not repeated.
