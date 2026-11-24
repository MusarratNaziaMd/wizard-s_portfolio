"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { IntroCanvasProps } from "./IntroCanvas";

const DynamicIntroCanvas = dynamic<IntroCanvasProps>(
  () => import("./IntroCanvas").then((mod) => mod.IntroCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 w-screen h-screen bg-[#070a14] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-gold/40 blur-md animate-pulse" />
      </div>
    ),
  }
);

export interface IntroSceneProps {
  isWandHovered: boolean;
  isBookOpen: boolean;
  isPageTurned: boolean;
  onWandHoverChange: (hovered: boolean) => void;
  onWandTap: () => void;
  monogram?: string;
}

export const IntroScene: React.FC<IntroSceneProps> = ({
  isWandHovered,
  isBookOpen,
  isPageTurned,
  onWandHoverChange,
  onWandTap,
  monogram,
}) => {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#070a14] z-0">
      <DynamicIntroCanvas
        isWandHovered={isWandHovered}
        isBookOpen={isBookOpen}
        isPageTurned={isPageTurned}
        onWandHoverChange={onWandHoverChange}
        onWandTap={onWandTap}
        monogram={monogram}
      />
    </div>
  );
};

export default IntroScene;
