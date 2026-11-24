"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { content } from "@/lib/content";

const navLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const sectionIds = navLinks.map((item) => item.id);
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the entry with highest intersection ratio or intersecting
      const intersectingEntries = entries.filter((e) => e.isIntersecting);
      if (intersectingEntries.length > 0) {
        // pick the first intersecting entry from top
        setActiveSection(intersectingEntries[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-navy/85 border-b border-gold/15 transition-all">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand / Name */}
        <Link
          href="#hero"
          className="font-cinzel text-base sm:text-lg tracking-widest text-gold font-bold hover:text-[#e0b85a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1"
        >
          {content.profile.name.toUpperCase()}
        </Link>

        {/* Desktop Navigation - Plain labels for recruiter clarity */}
        <nav aria-label="Main Navigation" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`font-inter text-sm font-medium tracking-wide transition-colors py-1 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded ${
                      isActive
                        ? "text-gold font-semibold"
                        : "text-parchment/75 hover:text-parchment"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold rounded-full"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-parchment hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded cursor-pointer"
          aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
          aria-expanded={mobileMenuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy/95 border-b border-gold/20 px-6 py-4 space-y-3">
          <ul className="space-y-3">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 text-base font-inter tracking-wide transition-colors ${
                      isActive
                        ? "text-gold font-semibold"
                        : "text-parchment/80 hover:text-parchment"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
