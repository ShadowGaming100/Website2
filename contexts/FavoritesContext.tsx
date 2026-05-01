'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useConsent } from './ConsentContext';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FavoritesContextValue {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readFavoritesCookie(): number[] {
  if (typeof document === 'undefined') return [];
  try {
    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith('fh_favorites='));
    if (!match) return [];
    const raw = decodeURIComponent(match.split('=').slice(1).join('='));
    const parsed: unknown = JSON.parse(raw);
    if (
      Array.isArray(parsed) &&
      parsed.every((x) => typeof x === 'number' && Number.isFinite(x))
    ) {
      return parsed as number[];
    }
    return [];
  } catch {
    return [];
  }
}

function writeFavoritesCookie(ids: number[]): void {
  try {
    const maxAge = 90 * 24 * 60 * 60; // 90 days in seconds
    const value = encodeURIComponent(JSON.stringify(ids));
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `fh_favorites=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
  } catch {
    // Cookie write failed (e.g., cookies disabled); state still works in-memory.
  }
}

function applyToggle(ids: number[], id: number): number[] {
  return ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
}

// ─── Context ──────────────────────────────────────────────────────────────────

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { consentState, requestConsent } = useConsent();
  const [favorites, setFavorites] = useState<number[]>([]);

  // Stores a pending host ID when the user tries to favorite before consent is given.
  const pendingIdRef = useRef<number | null>(null);

  // Initialize favorites from cookie on mount (client-side only).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavorites(readFavoritesCookie());
  }, []);

  // When consent transitions to 'accepted', process any pending favorite action.
  useEffect(() => {
    if (consentState === 'accepted' && pendingIdRef.current !== null) {
      const pendingId = pendingIdRef.current;
      pendingIdRef.current = null;
      setFavorites((prev) => {
        const next = applyToggle(prev, pendingId);
        writeFavoritesCookie(next);
        return next;
      });
    }
  }, [consentState]);

  const isFavorite = (id: number): boolean => favorites.includes(id);

  const toggleFavorite = (id: number): void => {
    if (consentState === 'accepted') {
      setFavorites((prev) => {
        const next = applyToggle(prev, id);
        writeFavoritesCookie(next);
        return next;
      });
    } else if (consentState === 'unknown') {
      pendingIdRef.current = id;
      requestConsent();
    }
    // consentState === 'declined': no-op
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (ctx === null) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return ctx;
}
