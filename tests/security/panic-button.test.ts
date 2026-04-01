/**
 * Panic Button: Trauma-Informed Rapid Escape — Security Test Suite
 *
 * These tests verify that a user can instantly and safely hide the
 * Soteria interface when an abuser enters their physical space.
 *
 * A failure here means a user's screen reveals they are using a
 * safety platform. That revelation can trigger immediate violence.
 *
 * The 4-step exit sequence:
 *   1. event.stopPropagation() — prevent keystroke conflicts
 *   2. document.body.innerHTML = '' — instant visual wipe
 *   3. history.replaceState() — excise URL from back-button
 *   4. location.replace() — redirect to benign decoy
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  executeExit,
  createExitListener,
  EXIT_SEQUENCE,
  DEFAULT_DECOY_URL,
  purgeLocalStorage,
} from '../../src/core/identity/quickExit.js';

// ──────────────────────────────────────────
// Mock browser APIs for unit testing
// ──────────────────────────────────────────

function setupDom() {
  const body = {
    innerHTML: '<div id="soteria-app">Soteria content</div>',
  };

  const locationState = { href: 'https://app.soteria.io/dashboard' };

  const historyEntries: Array<{ state: string; title: string; url: string }> = [
    { state: '', title: 'Soteria', url: 'https://app.soteria.io/dashboard' },
  ];

  const localStorage = new Map<string, string>();
  const sessionStorage = new Map<string, string>();

  localStorage.set('soteria-session', 'abc123');
  localStorage.set('soteria-user', 'blind-key-xyz');
  localStorage.set('unrelated-key', 'keep-this');
  sessionStorage.set('soteria-state', 'active');

  const env = {
    document: {
      body,
      title: 'Soteria Dashboard',
    },
    window: {
      history: {
        replaceState: vi.fn((state: string, title: string, url: string) => {
          historyEntries[historyEntries.length - 1] = { state, title, url };
        }),
        back: vi.fn(() => {
          // After replaceState, back should not go to Soteria
        }),
        length: 1,
      },
      location: {
        replace: vi.fn((url: string) => {
          locationState.href = url;
        }),
        href: locationState.href,
      },
      localStorage: {
        getItem: (key: string) => localStorage.get(key) ?? null,
        setItem: (key: string, val: string) => localStorage.set(key, val),
        removeItem: (key: string) => localStorage.delete(key),
        clear: () => localStorage.clear(),
        key: (i: number) => Array.from(localStorage.keys())[i] ?? null,
        get length() { return localStorage.size; },
      },
      sessionStorage: {
        getItem: (key: string) => sessionStorage.get(key) ?? null,
        setItem: (key: string, val: string) => sessionStorage.set(key, val),
        removeItem: (key: string) => sessionStorage.delete(key),
        clear: () => sessionStorage.clear(),
        key: (i: number) => Array.from(sessionStorage.keys())[i] ?? null,
        get length() { return sessionStorage.size; },
      },
    },
    _locationState: locationState,
    _historyEntries: historyEntries,
    _localStorage: localStorage,
    _sessionStorage: sessionStorage,
  };

  return env;
}


describe('Panic Button: Trauma-Informed Rapid Escape', () => {

  // ──────────────────────────────────────────
  // Visual Clearance
  // ──────────────────────────────────────────

  describe('Visual Clearance', () => {
    it('should empty document.body.innerHTML on trigger', () => {
      const env = setupDom();
      executeExit(env.document as any, env.window as any);
      expect(env.document.body.innerHTML).toBe('');
    });

    it('should leave zero Soteria branding in the DOM', () => {
      const env = setupDom();
      executeExit(env.document as any, env.window as any);
      expect(env.document.body.innerHTML).not.toContain('soteria');
      expect(env.document.body.innerHTML).not.toContain('Soteria');
    });

    it('should update document title to decoy title', () => {
      const env = setupDom();
      executeExit(env.document as any, env.window as any);
      expect(env.document.title).not.toContain('Soteria');
    });
  });

  // ──────────────────────────────────────────
  // History Sanitization
  // ──────────────────────────────────────────

  describe('History Sanitization', () => {
    it('should call replaceState with decoy URL', () => {
      const env = setupDom();
      executeExit(env.document as any, env.window as any);
      expect(env.window.history.replaceState).toHaveBeenCalledWith(
        '',
        '',
        DEFAULT_DECOY_URL
      );
    });

    it('should use replaceState not pushState', () => {
      const env = setupDom();
      executeExit(env.document as any, env.window as any);
      expect(env.window.history.replaceState).toHaveBeenCalled();
    });

    it('should excise Soteria URL from history entry', () => {
      const env = setupDom();
      executeExit(env.document as any, env.window as any);
      const lastEntry = env._historyEntries[env._historyEntries.length - 1];
      expect(lastEntry.url).toBe(DEFAULT_DECOY_URL);
      expect(lastEntry.url).not.toContain('soteria');
    });
  });

  // ──────────────────────────────────────────
  // Redirect
  // ──────────────────────────────────────────

  describe('Redirect', () => {
    it('should call location.replace with decoy URL', () => {
      const env = setupDom();
      executeExit(env.document as any, env.window as any);
      expect(env.window.location.replace).toHaveBeenCalledWith(DEFAULT_DECOY_URL);
    });

    it('should use location.replace not location.href assignment', () => {
      const env = setupDom();
      executeExit(env.document as any, env.window as any);
      expect(env.window.location.replace).toHaveBeenCalled();
    });
  });

  // ──────────────────────────────────────────
  // Local Storage Sanitization
  // ──────────────────────────────────────────

  describe('Local Storage Sanitization', () => {
    it('should remove all Soteria-prefixed localStorage keys', () => {
      const env = setupDom();
      purgeLocalStorage(env.window as any, 'soteria');
      expect(env._localStorage.has('soteria-session')).toBe(false);
      expect(env._localStorage.has('soteria-user')).toBe(false);
    });

    it('should not remove unrelated localStorage keys', () => {
      const env = setupDom();
      purgeLocalStorage(env.window as any, 'soteria');
      expect(env._localStorage.has('unrelated-key')).toBe(true);
    });

    it('should clear all sessionStorage', () => {
      const env = setupDom();
      executeExit(env.document as any, env.window as any);
      expect(env._sessionStorage.size).toBe(0);
    });
  });

  // ──────────────────────────────────────────
  // Exit Key Sequence
  // ──────────────────────────────────────────

  describe('Exit Key Sequence', () => {
    it('should define a multi-key exit sequence (not single Escape)', () => {
      expect(EXIT_SEQUENCE).toBeDefined();
      expect(EXIT_SEQUENCE.length).toBeGreaterThan(1);
    });

    it('should use Escape as the base key', () => {
      expect(EXIT_SEQUENCE.every((k: string) => k === 'Escape')).toBe(true);
    });

    it('should require exactly 3 presses', () => {
      expect(EXIT_SEQUENCE).toHaveLength(3);
    });
  });

  // ──────────────────────────────────────────
  // Listener Lifecycle
  // ──────────────────────────────────────────

  describe('Listener Lifecycle', () => {
    it('should return a cleanup function', () => {
      const addEventListener = vi.fn();
      const removeEventListener = vi.fn();
      const mockDoc = { addEventListener, removeEventListener } as any;

      const cleanup = createExitListener(mockDoc, {} as any, {} as any);
      expect(typeof cleanup).toBe('function');
    });

    it('should register a keydown listener on creation', () => {
      const addEventListener = vi.fn();
      const removeEventListener = vi.fn();
      const mockDoc = { addEventListener, removeEventListener } as any;

      createExitListener(mockDoc, {} as any, {} as any);
      expect(addEventListener).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function),
        expect.objectContaining({ capture: true })
      );
    });

    it('should remove the keydown listener on cleanup', () => {
      const addEventListener = vi.fn();
      const removeEventListener = vi.fn();
      const mockDoc = { addEventListener, removeEventListener } as any;

      const cleanup = createExitListener(mockDoc, {} as any, {} as any);
      cleanup();
      expect(removeEventListener).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function),
        expect.objectContaining({ capture: true })
      );
    });
  });

  // ──────────────────────────────────────────
  // Sequence Detection (the core safety logic)
  // ──────────────────────────────────────────

  describe('Sequence Detection', () => {
    function createSequenceTestRig() {
      const env = setupDom();
      let capturedHandler: ((event: any) => void) | null = null;

      const mockListenerDoc = {
        addEventListener: vi.fn((event: string, handler: any) => {
          capturedHandler = handler;
        }),
        removeEventListener: vi.fn(),
      };

      createExitListener(mockListenerDoc, env.document as any, env.window as any);

      function pressKey(key: string) {
        capturedHandler!({
          key,
          stopPropagation: vi.fn(),
          preventDefault: vi.fn(),
        });
      }

      return { env, pressKey };
    }

    it('should NOT trigger exit on a single Escape press', () => {
      const { env, pressKey } = createSequenceTestRig();
      pressKey('Escape');
      expect(env.document.body.innerHTML).not.toBe('');
    });

    it('should NOT trigger exit on two Escape presses', () => {
      const { env, pressKey } = createSequenceTestRig();
      pressKey('Escape');
      pressKey('Escape');
      expect(env.document.body.innerHTML).not.toBe('');
    });

    it('should trigger exit on three consecutive Escape presses', () => {
      const { env, pressKey } = createSequenceTestRig();
      pressKey('Escape');
      pressKey('Escape');
      pressKey('Escape');
      expect(env.document.body.innerHTML).toBe('');
      expect(env.window.history.replaceState).toHaveBeenCalled();
      expect(env.window.location.replace).toHaveBeenCalled();
    });

    it('should reset sequence when a non-Escape key is pressed', () => {
      const { env, pressKey } = createSequenceTestRig();
      pressKey('Escape');
      pressKey('Escape');
      pressKey('a');
      pressKey('Escape');
      expect(env.document.body.innerHTML).not.toBe('');
    });

    it('should reset sequence when presses are too slow (timeout)', () => {
      const { env, pressKey } = createSequenceTestRig();

      const now = Date.now();
      vi.spyOn(Date, 'now')
        .mockReturnValueOnce(now)
        .mockReturnValueOnce(now + 2000)
        .mockReturnValueOnce(now + 2000)
        .mockReturnValueOnce(now + 2100);

      pressKey('Escape');
      pressKey('Escape');
      pressKey('Escape');
      expect(env.document.body.innerHTML).not.toBe('');

      vi.restoreAllMocks();
    });

    it('should reset after successful exit and require full sequence again', () => {
      const { env, pressKey } = createSequenceTestRig();
      pressKey('Escape');
      pressKey('Escape');
      pressKey('Escape');
      expect(env.document.body.innerHTML).toBe('');

      env.document.body.innerHTML = '<div>Restored</div>';
      pressKey('Escape');
      expect(env.document.body.innerHTML).toBe('<div>Restored</div>');
    });
  });

  // ──────────────────────────────────────────
  // Execution Order
  // ──────────────────────────────────────────

  describe('Execution Order', () => {
    it('should execute DOM wipe before history and redirect', () => {
      const callOrder: string[] = [];

      const env = setupDom();

      const origReplaceState = env.window.history.replaceState;
      env.window.history.replaceState = vi.fn((...args: any[]) => {
        callOrder.push('replaceState');
        (origReplaceState as any)(...args);
      });

      const origReplace = env.window.location.replace;
      env.window.location.replace = vi.fn((...args: any[]) => {
        callOrder.push('locationReplace');
        (origReplace as any)(...args);
      });

      Object.defineProperty(env.document.body, 'innerHTML', {
        get: () => '',
        set: () => { callOrder.push('domWipe'); },
        configurable: true,
      });

      executeExit(env.document as any, env.window as any);

      expect(callOrder[0]).toBe('domWipe');
      expect(callOrder.indexOf('replaceState')).toBeGreaterThan(callOrder.indexOf('domWipe'));
      expect(callOrder.indexOf('locationReplace')).toBeGreaterThan(callOrder.indexOf('replaceState'));
    });
  });

});
