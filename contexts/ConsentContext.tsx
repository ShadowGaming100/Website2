'use client';

import React, { createContext, useContext } from 'react';
import { readCookie, writeCookie } from '../lib/cookies';
import { usePersistentState } from '../hooks/usePersistentState';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ConsentState = 'unknown' | 'accepted' | 'declined';

interface ConsentContextValue {
  consentState: ConsentState;
  acceptConsent: () => void;
  declineConsent: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const COOKIE = 'fh_consent';
const MAX_AGE = 90 * 24 * 60 * 60; // 90 days

function load(): ConsentState {
  const value = readCookie(COOKIE);
  if (value === 'accepted') return 'accepted';
  if (value === 'declined') return 'declined';
  return 'unknown';
}

// ─── Context ──────────────────────────────────────────────────────────────────

export const ConsentContext = createContext<ConsentContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  // We initialize to 'accepted' during SSR so the banner is HIDDEN by default.
  // This prevents the banner from flashing on the server render.
  // Then, on mount, we read the real cookie value and update the state.
  const [consentState, setConsentState] = usePersistentState<ConsentState>('accepted', load);

  const acceptConsent = () => {
    writeCookie(COOKIE, 'accepted', MAX_AGE);
    setConsentState('accepted');
  };

  const declineConsent = () => {
    // Session cookie — no Max-Age
    writeCookie(COOKIE, 'declined');
    setConsentState('declined');
  };

  return (
    <ConsentContext.Provider
      value={{ consentState, acceptConsent, declineConsent }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (ctx === null) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return ctx;
}
