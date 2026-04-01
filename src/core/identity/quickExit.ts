/**
 * Panic Button: Trauma-Informed Rapid Escape Module
 *
 * This module provides the Quick Exit mechanism for Soteria. When
 * triggered, it executes a precise 4-step sequence designed to
 * protect a user whose abuser has entered their physical space:
 *
 *   1. event.stopPropagation() — prevent keystroke conflicts
 *   2. document.body.innerHTML = '' — instant visual wipe
 *   3. history.replaceState() — excise URL from back-button
 *   4. location.replace() — redirect to benign decoy
 *
 * The sequence prioritizes INSTANT VISUAL SAFETY over everything else.
 * The DOM wipe happens before any network operation because a user's
 * physical startle response gives them milliseconds, not seconds.
 *
 * Per GOV.UK accessibility research: we do NOT use a single Escape
 * key press, as it conflicts with screen reader browse mode transitions.
 * The trigger is a deliberate triple-Escape sequence.
 */

export const DEFAULT_DECOY_URL = 'https://www.google.com';
export const DEFAULT_DECOY_TITLE = 'Google';
export const STORAGE_PREFIX = 'soteria';
export const EXIT_SEQUENCE: string[] = ['Escape', 'Escape', 'Escape'];

const SEQUENCE_TIMEOUT_MS = 1500;

interface MinimalDocument {
  body: { innerHTML: string };
  title: string;
}

interface MinimalWindow {
  history: {
    replaceState: (state: string, title: string, url: string) => void;
  };
  location: {
    replace: (url: string) => void;
  };
  localStorage: Storage;
  sessionStorage: Storage;
}

/**
 * Executes the 4-step exit sequence.
 * Order is critical — DOM wipe FIRST, then history, then redirect.
 */
export function executeExit(
  doc: MinimalDocument,
  win: MinimalWindow,
  decoyUrl: string = DEFAULT_DECOY_URL
): void {
  doc.body.innerHTML = '';
  doc.title = DEFAULT_DECOY_TITLE;

  win.history.replaceState('', '', decoyUrl);

  purgeLocalStorage(win, STORAGE_PREFIX);
  win.sessionStorage.clear();

  win.location.replace(decoyUrl);
}

/**
 * Removes all localStorage keys that start with the given prefix.
 * Leaves unrelated keys untouched to avoid suspicion if the device
 * is inspected — a completely empty localStorage is itself a signal.
 */
export function purgeLocalStorage(
  win: Pick<MinimalWindow, 'localStorage'>,
  prefix: string
): void {
  const keysToRemove: string[] = [];
  for (let i = 0; i < win.localStorage.length; i++) {
    const key = win.localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      keysToRemove.push(key);
    }
  }
  for (const key of keysToRemove) {
    win.localStorage.removeItem(key);
  }
}

/**
 * Creates a global keydown listener that detects the exit sequence.
 *
 * Uses capture phase (not bubble) to intercept the event at the
 * highest priority before any other handler can consume it.
 *
 * Returns a cleanup function that removes the listener — call this
 * on component unmount to prevent memory leaks.
 */
export function createExitListener(
  doc: { addEventListener: Function; removeEventListener: Function },
  docRef: MinimalDocument,
  winRef: MinimalWindow,
  decoyUrl: string = DEFAULT_DECOY_URL
): () => void {
  const keyBuffer: number[] = [];
  let sequenceIndex = 0;

  const handler = (event: KeyboardEvent) => {
    if (event.key !== EXIT_SEQUENCE[sequenceIndex]) {
      sequenceIndex = 0;
      keyBuffer.length = 0;
      return;
    }

    keyBuffer.push(Date.now());
    sequenceIndex++;

    if (keyBuffer.length > 1) {
      const elapsed = keyBuffer[keyBuffer.length - 1] - keyBuffer[0];
      if (elapsed > SEQUENCE_TIMEOUT_MS) {
        sequenceIndex = 1;
        keyBuffer.length = 0;
        keyBuffer.push(Date.now());
        return;
      }
    }

    if (sequenceIndex >= EXIT_SEQUENCE.length) {
      event.stopPropagation();
      event.preventDefault();
      executeExit(docRef, winRef, decoyUrl);
      sequenceIndex = 0;
      keyBuffer.length = 0;
    }
  };

  const options = { capture: true };
  doc.addEventListener('keydown', handler, options);

  return () => {
    doc.removeEventListener('keydown', handler, options);
  };
}
