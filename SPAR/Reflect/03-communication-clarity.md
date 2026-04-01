# Reflect Phase: Communication Clarity — Eliminating Jargon

**Date:** April 1, 2026  
**Source:** Multiple Gemini conversation iterations on the email to Brelyn  
**SPAR Stage:** Reflect — Correcting how we communicate

---

## The Problem Identified

The email drafts to Brelyn were repeatedly flagged for:

1. **Industry jargon** that assumed technical literacy
2. **Missing context** for decisions Brelyn wasn't part of
3. **Missing directions** on what to actually look at and interact with
4. **Wrong assumptions** about shared knowledge

> "You're still using a lot of industry jargon. No jargon. Clear, concise text. Explain it as if you are talking to a very intelligent but possibly excluded from tech user."

> "We want to be respectful and not assume she doesn't know, but be clear enough that it wouldn't matter."

---

## Jargon Replacements

| Jargon Used | Plain Language Replacement |
|------------|---------------------------|
| Client-side SHA-256 hashing | The system scrambles the user's email on their own device, turning it into an unbreakable secret code |
| Web Crypto API | (removed — implementation detail irrelevant to the audience) |
| Neural-Symbolic architecture | Smart AI that looks for the behavior of abusers and automatically triggers hardcoded safety rules |
| The Neural Sentry / Symbolic Foundation | Smart Behavioral Defense (combined into one clear concept) |
| Zero-Knowledge Privacy / Pseudonymization | "Zero-Knowledge" Privacy Vault — we shouldn't even know who they are |
| FOSTA-SESTA | (named only when contextually necessary, not as assumed knowledge) |
| OPSEC | (replaced with descriptions of what it means: "protect their identity and assets") |
| Deterministic guardrails | Hardcoded safety rules |
| Identity segregation | (described as an action: "instantly protect the user's identity") |
| Diversity of mind | Defined inline: "building these ideas in different formats at the same time to catch flaws early" |

---

## The "What to Look At" Principle

Early drafts described what was built but didn't tell Brelyn **how to interact with it**. The correction:

### Before (Describes but doesn't direct)
> "The prototypes now successfully implement client-side hashing using the Web Crypto API."

### After (Directs the reader)
> "Scroll down to the 'Client-Side Blinding Engine' and type in an email address. You will see it instantly convert into a long string of random characters. This proves to the user that we never store their real email."

**Every prototype reference must include:**
1. A clickable link
2. What to try / interact with
3. What to look for / read
4. What the interaction proves or demonstrates

---

## Context Gaps Corrected

### Gap: Brelyn didn't pick the name
**Fix:** Present the name with its meaning, not as a collaborative decision:
> "I started playing around with the working title Soteria. In Greek mythology, she is the goddess of safety, preservation, and deliverance from harm."

### Gap: Brelyn doesn't know about "Project Shield"
**Fix:** Never mention it. Present only the final decision, not the brainstorming path.

### Gap: Brelyn doesn't know what "diversity of mind" means
**Fix:** Define it inline:
> "Building these ideas in different formats at the same time — a process called 'diversity of mind' — is helping us catch flaws early and figure out the absolute best experience."

### Gap: All of this happened in one night
**Fix:** Acknowledge the speed explicitly:
> "I actually fell down a bit of a rabbit hole tonight. I ended up mapping out some concepts and building a few rapid prototypes..."
> "I know this is a massive amount of stuff to send over from just one night of brainstorming!"

---

## The Agent Speed Problem

> "You're suffering from a common agent problem that you are unaware of your incredible speed."

AI agents produce volume at a pace that can feel overwhelming or exclusionary to human collaborators. The correction:
- Frame the work as "a burst of brainstorming tonight"
- Emphasize nothing is set in stone
- Invite feedback rather than presenting decisions as final
- Give the recipient permission to take their time: "Take your time looking through it"

---

## Principle Established

> **Communication about Soteria must be as accessible as the platform itself.**

If the platform is designed to protect people excluded from tech, the language used to describe the platform cannot exclude them either. Every communication should be understandable by "a very intelligent person who may not be in tech" — because that describes the people Soteria is built for.

This applies to:
- Stakeholder communications
- Website copy
- In-app messaging
- Error messages
- Onboarding flows
- Documentation
