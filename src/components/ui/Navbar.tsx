import React from "react";
import Link from "next/link";

const navItems = [
  { label: "Hero", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-navy/80 border-b border-gold/15">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="#hero"
          className="font-cinzel text-lg tracking-widest text-gold font-bold hover:text-[#d8b35c] transition-colors"
        >
          ACADEMIA
        </Link>
        <nav aria-label="Main Navigation">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="font-cinzel text-xs uppercase tracking-wider text-parchment/80 hover:text-gold transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
