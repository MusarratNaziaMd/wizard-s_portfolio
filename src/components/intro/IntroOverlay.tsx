"use client";

import React from "react";

export interface IntroOverlayProps {
  isVisible?: boolean;
  children?: React.ReactNode;
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({
  isVisible = true,
  children,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-navy/40 backdrop-blur-[2px]">
      {children}
    </div>
  );
};

export default IntroOverlay;
