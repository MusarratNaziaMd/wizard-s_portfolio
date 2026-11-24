import React from "react";

export const SectionDivider: React.FC<{ className?: string }> = ({
  className = "my-16",
}) => {
  return (
    <div
      className={`w-full max-w-4xl mx-auto flex items-center justify-center px-6 ${className}`}
      aria-hidden="true"
    >
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/25 to-gold/60" />
      <div className="mx-4 flex items-center justify-center w-7 h-7 rounded-full border border-gold/50 bg-midnight/90 text-gold text-xs shadow-[0_0_12px_rgba(201,162,75,0.3)]">
        ✦
      </div>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold/25 to-gold/60" />
    </div>
  );
};

export default SectionDivider;
