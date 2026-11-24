"use client";

import { useState, useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "sanctum_intro_completed";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  return false;
}

export interface UseIntroSkipReturn {
  hasSkipped: boolean;
  skipIntro: () => void;
  markCompleted: () => void;
  resetIntro: () => void;
  isReady: boolean;
}

/**
 * Hook to manage intro state.
 * Uses useSyncExternalStore with sessionStorage (wrapped in try/catch)
 * so that page refreshes within the same browser session skip straight to the portfolio.
 */
export function useIntroSkip(): UseIntroSkipReturn {
  const storeSkipped = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [localSkipped, setLocalSkipped] = useState<boolean>(false);

  const hasSkipped = storeSkipped || localSkipped;

  const skipIntro = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
      window.dispatchEvent(new Event("storage"));
    } catch {
      // ignore storage error
    }
    setLocalSkipped(true);
  }, []);

  const markCompleted = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
      window.dispatchEvent(new Event("storage"));
    } catch {
      // ignore storage error
    }
    setLocalSkipped(true);
  }, []);

  const resetIntro = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event("storage"));
    } catch {
      // ignore storage error
    }
    setLocalSkipped(false);
  }, []);

  return {
    hasSkipped,
    skipIntro,
    markCompleted,
    resetIntro,
    isReady: true,
  };
}

export default useIntroSkip;
