import React from "react";

export interface WaxSealProps {
  label?: string;
  className?: string;
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  label = "✦",
  className = "",
}) => {
  return (
    <div
      className={`wax-seal w-9 h-9 rounded-full flex items-center justify-center font-cinzel text-xs text-gold/90 font-bold select-none shrink-0 cursor-default ${className}`}
      aria-hidden="true"
      title="Verified Quest Seal"
    >
      <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{label}</span>
    </div>
  );
};

export default WaxSeal;
