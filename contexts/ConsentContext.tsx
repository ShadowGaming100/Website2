'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type ConsentState = 'unknown' | 'accepted' | 'declined';

interface ConsentContextValue {
  consentState: ConsentState;
  showBanner: boolean;
  acceptConsent: () => void;
  declineConsent: () => void;
  /** Called by FavoritesContext to surface the banner mid-session. */
  requestConsent: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readConsentCookie(): ConsentState {
  if (typeof document === 'undefined') return 'unknown';
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith('fh_consent='));
  if (!match) return 'unknown';
  const value = match.split('=')[1];
  if (value === 'accepted') return 'accepted';
  if (value === 'declined') return 'declined';
  return 'unknown';
}

function writeConsentCookie(value: 'accepted' | 'declined'): void {
  try {
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    if (value === 'accepted') {
      const maxAge = 90 * 24 * 60 * 60; // 90 days in seconds
      document.cookie = `fh_consent=accepted; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
    } else {
      // Session cookie — no Max-Age
      document.cookie = `fh_consent=declined; Path=/; SameSite=Lax${secure}`;
    }
  } catch {
    // Cookie write failed (e.g., cookies disabled); state still works in-memory.
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ConsentContext = createContext<ConsentContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consentState, setConsentState] = useState<ConsentState>('unknown');
  const [showBanner, setShowBanner] = useState<boolean>(false);

  // Initialize from cookie on mount (client-side only).
  useEffect(() => {
    const stored = readConsentCookie();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsentState(stored);
    setShowBanner(stored === 'unknown');
  }, []);

  const acceptConsent = () => {
    writeConsentCookie('accepted');
    setConsentState('accepted');
    setShowBanner(false);
  };

  const declineConsent = () => {
    writeConsentCookie('declined');
    setConsentState('declined');
    setShowBanner(false);
  };

  const requestConsent = () => {
    setShowBanner(true);
  };

  return (
    <ConsentContext.Provider
      value={{ consentState, showBanner, acceptConsent, declineConsent, requestConsent }}
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
