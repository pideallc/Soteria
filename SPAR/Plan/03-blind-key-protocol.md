# Plan Phase: The Blind Key Protocol

**Date:** April 1, 2026  
**Source:** Gemini conversation — "I want a system where if the user gives us their email, there is a privacy protection..."  
**SPAR Stage:** Plan — Privacy engineering strategy

---

## The Originating Question

> "I want a system where if the user gives us their email, there is a privacy protection for them. We can talk with them, but no one on our team can see their email without express permission. Maybe there is a key that reflects their email in the code and hides it. Is this something that people do already?"

## Gemini's Answer: Yes, This Is Established Practice

This is a foundational concept in **Privacy-Preserving Engineering**, often called **Pseudonymization** or **Communication Relaying**. It is common in:
- Medical research
- Whistleblower platforms
- Apps for survivors of violence

---

## The Protocol Design

### Step 1: The Blind Key (Client-Side Hashing)

When a user enters their email, it is passed through a **cryptographic hash (SHA-256)** in the user's browser. This creates a unique, irreversible 64-character string (the "Key") that represents that email.

**Critical property:** The hashing happens **on the user's device** using the Web Crypto API. The plaintext email **never leaves the browser**. Only the hash is transmitted.

### Step 2: The Communication Proxy

Instead of communicating directly with `user@gmail.com`, the system communicates through a relay. The team sees `user_4f2a9...` and the system handles the handshake to the real email in a secure, isolated vault.

### Step 3: Express Permission (The Unmasking Protocol)

In the Neural-Symbolic architecture, the Symbolic Guardrail enforces a hardcoded rule:

```
Access to 'Real_Identity' field is restricted until 'User_Consent_Token' is TRUE
```

---

## The Critical Follow-Up: "Does it actually do it though?"

The first implementation was a simulation. After being challenged, Gemini implemented **real client-side hashing** using the Web Crypto API:

```javascript
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message.toLowerCase().trim());
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
```

### Verification Points

1. **The hash is real:** `crypto.subtle.digest('SHA-256', ...)` is a built-in browser function that generates a cryptographic hash. Not a visual trick.

2. **Client-side privacy:** The `blindedKey` is created first, and the Firestore call only uses the `blindedKey`. The variable `email` is **never included** in the database payload.

3. **Team blindness:** The Firebase database contains documents where the email field simply does not exist. Only SHA-256 strings are stored.

4. **Irreversibility:** SHA-256 is a one-way cryptographic function. It is computationally infeasible to reverse the hash back to the original input.

---

## Why This Matters for Soteria

> "This is the standard for building trust with vulnerable communities. You are effectively proving to them that you don't even want to know who they are, because you've designed a system where you can't."

For the Vanguard Use Case (sex workers, IPV survivors, activists):
- **Subpoena resistance:** Even if a court orders data disclosure, the team cannot reveal what they do not possess
- **Breach resilience:** A complete database compromise reveals nothing about users' identities
- **Trust architecture:** The system proves its privacy claims technically, not just in marketing copy

---

## Integration in the Prototype

The Blind Key Protocol is demonstrated in two places in the unified website:

1. **The Protocol Section:** A live SHA-256 hashing sandbox where visitors can type any text and watch it transform into a hash in real time. Includes three-step explanation (Client-Side Transformation, Irreversible One-Way Function, Blind Communication).

2. **The Vault Section:** The signup form where the actual enrollment uses the Blind Key. On successful submission, the user sees only the hash that was stored — proof that their email is not retained.

---

## TDD Implications

The Blind Key Protocol is the **first TDD loop** to automate (see `Plan/04-tdd-directives.md`):

> Write a test that simulates a user entering an email. The test must assert that the output string is exactly 64 characters (SHA-256 length) and that `output === "user@email.com"` strictly returns `false`.
