# Act Phase: Module 3 — Panic Button Exit (Trauma-Informed Rapid Escape)

**Date:** April 1, 2026  
**Source:** Final Gemini Deep Research — Module execution specification  
**SPAR Stage:** Act — Third TDD cycle for the MVP  
**Priority:** 3 of 3 (physical safety)

---

## Mission Context

A user may be accessing Soteria when an abuser unexpectedly enters the physical space. A rapid, intuitive escape mechanism is required to instantly obfuscate the screen. A poorly engineered exit that simply redirects the browser is **highly dangerous** — it leaves the previous URL in the browser's history stack. If the abuser clicks "back," the sensitive page is immediately revealed, placing the user in imminent physical danger.

This module translates Chayn's trauma-informed Safety principle directly into code: the system must be predictable, avoid sudden changes that expose the user, and provide absolute control over the digital footprint.

---

## Architecture: DOM Manipulation + History API

The exit mechanism executes a precise sequence within milliseconds:

1. **`event.stopPropagation()`** — prevents the keystroke from conflicting with modals or interfering with screen readers transitioning between application and browse modes
2. **`document.body.innerHTML = ''`** — instant visual wipe, capitalizing on the user's natural startle response without waiting for network latency
3. **`window.history.replaceState("", title, decoyUrl)`** — forcefully **overwrites** (not pushes) the current history entry with a decoy URL, excising the sensitive URL from the back-button stack
4. **`window.location.replace(decoyUrl)`** — full redirect to benign content, preventing back-button return

### Trigger Design (Per GOV.UK Research)

- **Do NOT use single Escape key** — conflicts with assistive technology browse mode transitions, modal close behaviors, and fullscreen exit
- Use a **deliberate multi-key sequence** (e.g., triple Escape, or Shift+Escape, or a custom soft-key pattern)
- The sequence must be discrete enough to avoid accidental activation but fast enough for emergency use
- Consider also providing a **visible but discreet button** (small, neutral-colored, positioned at screen edge) for users who cannot use keyboard shortcuts

---

## SPAR-TDD Execution Cycle

### Sense

Agent examines the frontend architecture, routing configuration, and existing event listener landscape. Reviews GOV.UK Exit this Page component research and CSS-Tricks quick exit patterns.

### Plan → RED (Write Failing Tests)

```
File: /tests/security/panic-button.test.ts

describe('Panic Button: Trauma-Informed Rapid Escape', () => {

  describe('Visual Clearance', () => {
    it('should empty document.body.innerHTML on trigger')
    it('should complete visual clearance in under 100ms')
    it('should leave zero Soteria branding elements in the DOM')
    it('should leave zero application data in the DOM')
    it('should not flash or partially render during transition')
  })

  describe('History Sanitization', () => {
    it('should replace current history entry with decoy URL')
    it('should not push a new history entry')
    it('should prevent history.back() from returning to Soteria')
    it('should set document.title to the decoy page title')
  })

  describe('Redirect', () => {
    it('should redirect to a predefined benign URL')
    it('should use location.replace, not location.href')
    it('should display realistic benign content at destination')
  })

  describe('Local Storage Sanitization', () => {
    it('should clear all Soteria-related localStorage keys')
    it('should clear all Soteria-related sessionStorage keys')
    it('should not leave IndexedDB entries identifiable as Soteria')
    it('should clear any service worker caches')
  })

  describe('Event Handling', () => {
    it('should call event.stopPropagation() before any DOM changes')
    it('should not conflict with screen reader Escape key behavior')
    it('should not conflict with modal close behaviors')
    it('should not trigger on single accidental Escape press')
    it('should trigger on the defined deliberate key sequence')
  })

  describe('Accessibility', () => {
    it('should not break keyboard navigation before trigger')
    it('should not interfere with assistive technology modes')
    it('should provide a visible discreet exit button as fallback')
    it('should announce nothing to screen readers during exit')
  })

  describe('Component Integration', () => {
    it('should be available on every route/view of the application')
    it('should persist across client-side navigation')
    it('should not introduce memory leaks from event listeners')
    it('should be removable/configurable per user preference')
  })

})
```

**Verification:** All tests must fail. Use Playwright for browser automation testing.

### Act → GREEN (Minimum Implementation)

Agent writes:
1. **`quickExit.ts`** — core module:
   - Global keystroke listener with multi-key sequence detection
   - `executeExit()` function executing the 4-step sequence
   - Local/session storage purge utility
   - Service worker cache clearance
2. **`QuickExitButton.tsx`** — visible fallback component:
   - Discreet, neutral-colored button at screen edge
   - Calls the same `executeExit()` function
   - No Soteria branding on the button itself
3. **`useQuickExit.ts`** — hook for component integration:
   - Registers/deregisters the global listener
   - Prevents memory leaks on unmount
   - Provides configuration interface (trigger sequence, decoy URL)

**Constraint:** Benign decoy defaults to `https://www.google.com`. No styling beyond functional visibility. No animation.

### Reflect → REFACTOR

- Encapsulate into a reusable, framework-agnostic module
- Ensure the keystroke listener is registered at the highest priority (capture phase, not bubble phase)
- Verify no event listener leaks across route transitions
- Integrate **DOMPurify** sanitization on any content injected during the exit sequence
- Review accessibility: confirm the exit does not announce to screen readers (which could alert a nearby abuser)
- Run adversarial test: attempt to recover Soteria state from browser after exit (history, cache, storage, service workers)
- Consider: should the exit also close the tab entirely? (Configurable per user preference)

---

## Success Criteria

| Property | Assertion |
|----------|-----------|
| Visual clear time | < 100ms |
| DOM after exit | Empty — zero Soteria elements |
| history.back() | Does NOT return to Soteria |
| localStorage | Zero Soteria keys |
| sessionStorage | Zero Soteria keys |
| Single Escape | Does NOT trigger exit |
| Defined sequence | Triggers exit |
| Screen reader impact | None — silent exit |
| Memory leaks | Zero — clean listener lifecycle |
| Available everywhere | Present on every route |

---

## Decoy Strategy

The decoy URL must be:
- **Realistic** — a site the user would plausibly be visiting (Google, weather, news)
- **Fast-loading** — no delay that would reveal the transition
- **Configurable** — users in different contexts need different plausible decoys
- **Not suspicious** — avoid loading blank pages or error states

Default: `https://www.google.com`  
Configurable alternatives: local news site, weather portal, email provider login page
