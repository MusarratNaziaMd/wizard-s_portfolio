"use client";

import { useState, useCallback } from "react";

export interface UseIntroSkipReturn {
  hasSkipped: boolean;
  skipIntro: () => void;
  resetIntro: () => void;
}

/**
 * Hook to manage intro skip state.
 * Function-only stub ready for when the 3D intro overlay and animations are mounted.
 */
export function useIntroSkip(initialSkipped: boolean = false): UseIntroSkipReturn {
  const [hasSkipped, setHasSkipped] = useState<boolean>(initialSkipped);

  const skipIntro = useCallback(() => {
    setHasSkipped(true);
  }, []);

  const resetIntro = useCallback(() => {
    setHasSkipped(false);
  }, []);

  return {
    hasSkipped,
    skipIntro,
    resetIntro,
  };
}

export default useIntroSkip;
