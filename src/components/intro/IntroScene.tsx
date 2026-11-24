"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { IntroCanvasProps } from "./IntroCanvas";

const DynamicIntroCanvas = dynamic<IntroCanvasProps>(
  () => import("./IntroCanvas").then((mod) => mod.IntroCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 w-screen h-screen bg-navy flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-gold/50 blur-sm animate-pulse" />
      </div>
    ),
  }
);

export interface IntroSceneProps {
  isHovered: boolean;
  isBloomed: boolean;
}

export const IntroScene: React.FC<IntroSceneProps> = ({
  isHovered,
  isBloomed,
}) => {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-navy z-0 pointer-events-none">
      <DynamicIntroCanvas isHovered={isHovered} isBloomed={isBloomed} />
    </div>
  );
};

export default IntroScene;
