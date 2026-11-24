"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface InkHeadingProps {
  as?: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
}

export const InkHeading: React.FC<InkHeadingProps> = ({
  as: Tag = "h2",
  children,
  className = "",
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.2 }}
      whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.05, ease: [0.19, 1, 0.22, 1] }}
      className="inline-block"
    >
      <Tag className={className}>{children}</Tag>
    </motion.div>
  );
};

export default InkHeading;
