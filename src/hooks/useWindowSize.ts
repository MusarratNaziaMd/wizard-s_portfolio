"use client";

import { useSyncExternalStore } from "react";

export interface WindowDimensions {
  width: number;
  height: number;
  isMobile: boolean;
}

const SERVER_SNAPSHOT: WindowDimensions = Object.freeze({
  width: 1200,
  height: 800,
  isMobile: false,
});

let cachedSnapshot: WindowDimensions = SERVER_SNAPSHOT;

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getSnapshot(): WindowDimensions {
  if (typeof window === "undefined") return SERVER_SNAPSHOT;
  if (
    cachedSnapshot.width !== window.innerWidth ||
    cachedSnapshot.height !== window.innerHeight
  ) {
    cachedSnapshot = {
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth < 768,
    };
  }
  return cachedSnapshot;
}

function getServerSnapshot(): WindowDimensions {
  return SERVER_SNAPSHOT;
}

export function useWindowSize(): WindowDimensions {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default useWindowSize;
