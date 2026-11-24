"use client";

import React from "react";

export interface IntroSceneProps {
  onComplete?: () => void;
}

export const IntroScene: React.FC<IntroSceneProps> = ({ onComplete }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-navy flex items-center justify-center">
      <div className="text-center z-10 px-4">
        <h2 className="font-cinzel text-gold text-2xl md:text-4xl tracking-widest uppercase mb-4">
          Archivist &amp; Sorcerer of Code
        </h2>
        <p className="font-cormorant text-parchment/80 italic text-lg md:text-xl max-w-xl mx-auto mb-6">
          Entering the grand sanctum of digital craft.
        </p>
        {onComplete && (
          <button
            onClick={onComplete}
            className="font-cinzel text-xs text-gold border border-gold/40 px-4 py-2 rounded uppercase tracking-widest hover:bg-gold/10 transition-colors"
          >
            Enter Chamber
          </button>
        )}
      </div>
    </div>
  );
};

export default IntroScene;
