"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LogoMark } from "@/components/ui/logo";

const navLinks = [
  { href: "/#why-us",       label: "Why Us"          },
  { href: "/#how-it-works", label: "How It Works"    },
  { href: "/#pricing",      label: "Pricing"         },
  { href: "/#testimonials", label: "Success Stories" },
  { href: "/#talent",       label: "Find Talent"     },
];

// Section IDs that have a dark background — navbar text must be white over these
const DARK_SECTION_IDS = ["how-it-works", "testimonials", "pricing"];

export function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [overDark,  setOverDark]  = useState(true);  // hero is dark on load
  const [open,      setOpen]      = useState(false);

  // ── Scroll threshold: past 80 % of the hero height ─────────────────
  useEffect(() => {
    const threshold = window.innerHeight * 0.80;
    const onScroll  = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── IntersectionObserver: track which section is under the navbar ───
  // rootMargin "-65px 0px -85% 0px" creates a thin horizontal band
  // just below the 65px navbar height. When a dark section enters this
  // band the navbar switches to white text; leaving restores dark text.
  useEffect(() => {
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        });
        setOverDark(visible.size > 0);
      },
      { rootMargin: "-65px 0px -85% 0px", threshold: 0 },
    );

    DARK_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // White text when: at the top (over hero) OR scrolled over a dark section
  const useLightText = !scrolled || overDark;

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 w-full transition-all duration-400",
          scrolled
            ? "bg-white/40 backdrop-blur-lg border-b border-black/5 shadow-[0_1px_12px_-4px_rgba(0,0,0,0.06)]"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex h-[65px] max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12">

          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-75 transition-opacity duration-200">
            <LogoMark
              inverted={useLightText}
              className="h-12 w-auto transition-all duration-300"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  useLightText
                    ? "text-white/85 hover:text-white"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Post a Job */}
          <div className="hidden lg:flex">
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              onClick={() => { window.location.href = "/#pricing"; }}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white
                         shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/40
                         transition-shadow"
            >
              Post a Job
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors lg:hidden ${
              useLightText ? "text-white/80 hover:text-white" : "text-neutral-700 hover:bg-black/6"
            }`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.20, ease: "easeOut" }}
            className="fixed inset-x-0 top-[65px] z-40 border-t border-black/6
                       px-4 pb-6 pt-2 backdrop-blur-lg lg:hidden"
            style={{ backgroundColor: "rgba(255,255,255,0.88)" }}
          >
            <nav className="flex flex-col divide-y divide-black/6">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="py-4 text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-900"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-5">
              <button
                className="w-full rounded-full bg-primary py-3 text-sm font-semibold
                           text-white shadow-md shadow-primary/20"
                onClick={() => { setOpen(false); window.location.href = "/#pricing"; }}
              >
                Post a Job
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
