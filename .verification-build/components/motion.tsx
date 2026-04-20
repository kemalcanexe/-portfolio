"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import type React from "react";

export const fadeBlur: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(18px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
};

export const staggerChildren: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04
    }
  }
};

export function Reveal({
  children,
  className,
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px 0px" }}
      variants={fadeBlur}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px 0px" }}
      variants={staggerChildren}
    >
      {children}
    </motion.div>
  );
}

export const MotionDiv = Reveal;
