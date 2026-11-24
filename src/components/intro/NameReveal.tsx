"use client";

import React from "react";

export interface NameRevealProps {
  name?: string;
  title?: string;
}

export const NameReveal: React.FC<NameRevealProps> = ({
  name = "Alchemist Architect",
  title = "Full-Stack Engineer & Creative Technologist",
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 text-center">
      <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-gold drop-shadow-[0_2px_12px_rgba(201,162,75,0.3)]">
        {name}
      </h1>
      <p className="font-cormorant text-xl sm:text-2xl text-parchment tracking-wide font-medium italic">
        {title}
      </p>
    </div>
  );
};

export default NameReveal;
