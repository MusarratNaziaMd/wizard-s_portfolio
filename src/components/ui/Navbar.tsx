"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { content } from "@/lib/content";

const navLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Achievements", href: "#achievements", id: "achievements" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Monitor scroll for solid background + gold border once scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to highlight section most in view
  useEffect(() => {
    const sectionIds = navLinks.map((item) => item.id);
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Pick the entry currently intersecting with the viewport
      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length > 0) {
        // Sort by intersection ratio descending
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActiveSection(visibleEntries[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-15% 0px -55% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll handler with Lenis, hash pushState, heading focus, and mobile menu close
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string, href: string) => {
      e.preventDefault();
      setMobileMenuOpen(false);

      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      // Update URL hash without a sudden browser jump
      window.history.pushState(null, "", href);

      // Perform smooth scroll via Lenis if available
      if (window.__lenis) {
        window.__lenis.scrollTo(targetEl, {
          offset: -64,
          duration: 1.2,
        });
      } else {
        const top = targetEl.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top, behavior: "smooth" });
      }

      // Move accessible focus to section heading (tabindex -1)
      const heading = targetEl.querySelector("h1, h2, h3") as HTMLElement | null;
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
    },
    []
  );

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#0a0e1a] border-b border-gold/40 shadow-[0_4px_24px_rgba(0,0,0,0.8)] backdrop-blur-none"
          : "bg-navy/80 border-b border-gold/15 backdrop-blur-md"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand / Name */}
        <Link
          href="#hero"
          onClick={(e) => handleNavClick(e, "hero", "#hero")}
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
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id, item.href)}
                    className={`font-inter text-sm font-medium tracking-wide transition-colors py-1 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded ${
                      isActive
                        ? "text-gold font-semibold"
                        : "text-parchment/75 hover:text-parchment"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold rounded-full shadow-[0_0_8px_rgba(201,162,75,0.8)]"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden bg-[#070a14] border-b border-gold/30 px-6 py-6 transition-all shadow-2xl"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id, item.href)}
                    className={`block font-inter text-base font-medium py-2 transition-colors border-l-2 pl-3 ${
                      isActive
                        ? "text-gold border-gold font-semibold bg-gold/5"
                        : "text-parchment/80 border-transparent hover:text-parchment"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
