"use client";
import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

// ─── FadeUp ──────────────────────────────────────────────────────────────────

interface FadeUpProps {
  children: ReactNode;
  /** Delay in milliseconds (converted to seconds internally) */
  delay?: number;
  /** Duration in milliseconds (converted to seconds internally) */
  duration?: number;
  className?: string;
  /** IntersectionObserver threshold 0–1 */
  threshold?: number;
}

export function FadeUp({
  children,
  delay = 0,
  duration = 600,
  className = "",
  threshold = 0.15,
}: FadeUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration: duration / 1000,
        delay: delay / 1000,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerChildren ─────────────────────────────────────────────────────────

interface StaggerChildrenProps {
  children: ReactNode;
  /** Delay between each child in milliseconds */
  staggerMs?: number;
  /** Initial delay before stagger begins, in milliseconds */
  initialDelayMs?: number;
  className?: string;
  threshold?: number;
}

export function StaggerChildren({
  children,
  staggerMs = 100,
  initialDelayMs = 0,
  className = "",
  threshold = 0.1,
}: StaggerChildrenProps) {
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerMs / 1000,
        delayChildren: initialDelayMs / 1000,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: EASE },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: threshold }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item} className="h-full">
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
