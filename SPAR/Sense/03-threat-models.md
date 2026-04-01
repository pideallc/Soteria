# Sense Phase: Threat Models & Target Populations

**Date:** April 1, 2026  
**Source:** Gemini research synthesis + iterative conversation refinements  
**SPAR Stage:** Sense — Defining what we are protecting against and for whom

---

## The Mainstream vs. Soteria Threat Model

### Mainstream Cybersecurity
- Protects **corporate networks and state secrets**
- Assumes adversary is a **faceless, external hacker**
- Goal: **impenetrable digital fortress**
- User is treated as the **weakest link**
- Metrics: enterprise defense, network stability, perimeter integrity

### Soteria Cybersecurity
- Protects **bodies, identities, and autonomy**
- Assumes adversary may be an **intimate partner, state actor, platform, or financial institution**
- Goal: **communal care and deliverance from harm**
- System is treated as the **point of failure if it burdens the user**
- Metrics: individual safety, OPSEC automation, stigma reduction, gendered threat mitigation

---

## Specific Threat Vectors

### 1. Stalkerware
- "Child Monitoring" apps repurposed for intimate partner surveillance
- Exfiltration of camera feeds, GPS, microphone, and browsing history via hidden proxies
- Traditional "remove the app" response **alerts the abuser and escalates danger**
- Requires: deception-based countermeasures (ghost data, static room loops)

### 2. Doxxing
- Coordinated scraping of personal information across social media, public records, data brokers
- Organized campaigns with multiple actors
- Targets: activists, sex workers, journalists, LGBTQ+ individuals
- Requires: automated takedown, decoy data seeding, continuous monitoring across 200+ data broker sites

### 3. Financial Exclusion / Financial Abuse
- FOSTA-SESTA driven deplatforming and de-banking
- Shared account manipulation (sudden withdrawals, password changes, access revocation)
- Shadow patterns during geofence exit events
- Requires: shadow account protocols, unlinked private vaults, documentation for legal proceedings

### 4. Device Seizure / Border Crossing
- Compromised devices at border crossings
- State-sponsored surveillance of journalists and activists
- Physical device inspection under duress
- Requires: one-touch identity segregation, clean device presentation, non-coercive biometric restoration

### 5. Platform-Level Structural Violence
- Shadowbanning and content suppression
- Account suspension without recourse
- Algorithmic discrimination
- Requires: identity segregation, platform-independent communication channels

---

## Target Populations: The Coalition of the Vulnerable

### Primary (Vanguard Use Case): Sex Workers
- Face **simultaneous financial, legal, physical, and social threats**
- Financial exclusion via FOSTA-SESTA and banking algorithms
- Platform-level shadowbanning and deplatforming
- Physical safety risks via doxxing
- State surveillance of bodily autonomy
- **Engineering constraint:** solving for this population forces the creation of security protocols that don't exist in enterprise security

### Core Coalition Members
- **Survivors of Intimate Partner Violence (IPV):** stalkerware, domestic surveillance, financial abuse
- **Women Human Rights Defenders (WHRDs) & Activists:** state-sponsored doxxing, Pegasus-style spyware, identity tracking
- **LGBTQ+ Communities:** "outing" as a weapon, safety of digital "third spaces"

### Critical Distinction (Identified During Reflect Phase)

> Protecting high-risk, high-need populations **is the primary mission** because that is where the danger is most acute and the urgency is life-or-death. If the mainstream benefits from these protections, that is a positive outcome — but the hunted are the North Star.
>
> Soteria is **not** a beta-test for the mainstream.

---

## Threat Model Summary Table

| Threat Vector | Affected Populations | Mainstream Response | Soteria Response |
|--------------|---------------------|--------------------|--------------------|
| Stalkerware | IPV survivors, sex workers | Remove app (alerts abuser) | Ghost data + identity partition |
| Doxxing | Activists, sex workers, LGBTQ+ | Report to platform (slow, unreliable) | Automated multi-vector takedown + decoy seeding |
| Financial exclusion | Sex workers, activists | None | Shadow account protocol + private vault |
| Device seizure | Journalists, activists | Full disk encryption (coercible) | Non-coercive biometric partition |
| Platform violence | Sex workers, LGBTQ+ | None | Identity segregation + independent channels |
