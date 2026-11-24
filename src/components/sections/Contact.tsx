import React from "react";
import { Button } from "@/components/ui/Button";

export const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="py-24 px-6 max-w-4xl mx-auto border-t border-gold/15 text-center"
    >
      <div className="space-y-6 max-w-2xl mx-auto">
        <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold">
          Chapter IV
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl text-parchment font-bold">
          Send a Missive
        </h2>
        <p className="font-inter text-parchment/80 text-base leading-relaxed">
          Whether you seek collaboration on an ambitious digital expedition,
          wish to consult on high-performance 3D interfaces, or simply exchange scholarly thoughts,
          my chamber is open.
        </p>
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="primary"
            href="mailto:scholar@example.com"
          >
            Dispatch Pigeon (Email)
          </Button>
          <Button
            variant="secondary"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Repository (GitHub)
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
