import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  href,
  target,
  rel,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-cinzel text-xs uppercase tracking-widest px-6 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gold text-navy font-semibold hover:bg-[#d8b35c] active:scale-[0.98] shadow-[0_0_15px_rgba(201,162,75,0.25)]",
    secondary:
      "border border-gold text-gold hover:bg-gold/10 active:scale-[0.98]",
    ghost:
      "text-parchment/80 hover:text-gold hover:bg-gold/5",
  };

  const combinedClasses = cn(baseStyles, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={combinedClasses} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
