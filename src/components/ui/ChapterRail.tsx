"use client";

import React, { useEffect, useState } from "react";

const chapters = [
  { id: "about", num: "I", label: "The Spark" },
  { id: "experience", num: "II", label: "The Apprenticeship" },
  { id: "skills", num: "III", label: "The Spellbook" },
  { id: "projects", num: "IV", label: "The Quests" },
  { id: "achievements", num: "V", label: "The Honours" },
];

export const ChapterRail: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    // Show rail once user scrolls past hero
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver to observe chapters
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.find((e) => e.isIntersecting);
        if (intersecting) {
          setActiveChapter(intersecting.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -50% 0px",
        threshold: [0, 0.2, 0.5],
      }
    );

    chapters.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <aside
      aria-label="Chapter Progress"
      className="hidden lg:flex fixed left-5 top-1/2 -translate-y-1/2 z-35 flex-col items-center select-none animate-fadeIn"
    >
      {/* Top subtle golden rune indicator */}
      <div className="text-gold/40 text-[10px] mb-3">✧</div>

      {/* Vertical Track Line */}
      <div className="relative flex flex-col items-center gap-6 py-2">
        <div className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

        {chapters.map((ch) => {
          const isActive = activeChapter === ch.id;
          return (
            <a
              key={ch.id}
              href={`#${ch.id}`}
              className="group relative flex items-center justify-center p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full"
              aria-label={`Jump to Chapter ${ch.num}: ${ch.label}`}
            >
              {/* Node Circle */}
              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-cinzel font-bold transition-all duration-300 ${
                  isActive
                    ? "border-candle bg-midnight text-candle scale-110 shadow-[0_0_12px_rgba(255,179,71,0.85)]"
                    : "border-gold/30 bg-[#070a14] text-parchment/60 group-hover:border-gold group-hover:text-gold"
                }`}
              >
                {ch.num}
              </div>

              {/* Tooltip on Hover */}
              <div className="absolute left-9 px-2.5 py-1 rounded bg-[#0b1028]/95 border border-gold/40 text-[11px] font-cinzel text-parchment whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none shadow-lg">
                <span className="text-candle mr-1.5">{ch.num}.</span>
                {ch.label}
              </div>
            </a>
          );
        })}
      </div>

      {/* Bottom rune */}
      <div className="text-gold/40 text-[10px] mt-3">✧</div>
    </aside>
  );
};

export default ChapterRail;
