"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { FadeUp, StaggerChildren } from "@/components/ui/animate";

interface PricingTier {
  name: string;
  priceMonthly: string;
  priceAnnual: string;
  priceSuffix: string;
  badge: string;
  featured: boolean;
  ctaLabel: string;
  note: (annual: boolean) => string;
  features: string[];
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    priceMonthly: "$249",
    priceAnnual: "$199",
    priceSuffix: "/month",
    badge: "Get Started",
    featured: false,
    ctaLabel: "Start Free Trial",
    note: (annual) =>
      annual
        ? "Billed annually ($2,388/yr). Cancel anytime."
        : "Billed monthly. Cancel anytime.",
    features: [
      "1 active VA placement",
      "48-hr candidate delivery",
      "8-step skills vetting",
      "Email support",
      "1 free replacement guarantee",
      "Access to 5 talent categories",
    ],
  },
  {
    name: "Growth",
    priceMonthly: "$469",
    priceAnnual: "$375",
    priceSuffix: "/month",
    badge: "Most Popular ✦",
    featured: true,
    ctaLabel: "Start Growing Now",
    note: (annual) =>
      annual
        ? "Billed annually ($4,500/yr). Cancel anytime."
        : "Billed monthly. Cancel anytime.",
    features: [
      "Up to 3 concurrent placements",
      "24-hr priority matching",
      "Full 12-step vetting process",
      "Dedicated success manager",
      "Unlimited replacement guarantee",
      "All 8 talent categories",
      "Monthly performance check-ins",
    ],
  },
  {
    name: "Enterprise",
    priceMonthly: "Custom",
    priceAnnual: "Custom",
    priceSuffix: "tailored quote",
    badge: "White-Glove",
    featured: false,
    ctaLabel: "Talk to Our Team",
    note: () => "Get a personalised quote within 24 hours.",
    features: [
      "Unlimited VA placements",
      "Same-day emergency matching",
      "Enterprise background checks",
      "Dedicated account director",
      "SLA guarantees",
      "Custom onboarding workflows",
      "Quarterly business reviews",
      "ATS API integration",
    ],
  },
];

function AnimatedPrice({ price, suffix }: { price: string; suffix: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={price}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="flex items-end gap-1"
      >
        <span className="font-display text-5xl font-bold tracking-tight">{price}</span>
        <span className="mb-1.5 text-sm opacity-50">{suffix}</span>
      </motion.div>
    </AnimatePresence>
  );
}

function FeaturedCard({ tier, annual }: { tier: PricingTier; annual: boolean }) {
  const price = annual ? tier.priceAnnual : tier.priceMonthly;
  return (
    <motion.div
      whileHover={{ boxShadow: "0 32px 80px -16px rgba(20, 184, 166, 0.45)" }}
      transition={{ duration: 0.3 }}
      className="relative flex flex-col rounded-2xl bg-white p-8 ring-2 ring-gold shadow-2xl md:-translate-y-4 animate-glow-pulse"
    >
      {/* Pulsing badge */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="relative flex items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-gold/50 animate-ping" />
          <span className="relative inline-flex items-center rounded-full bg-gold px-4 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-navy-900 whitespace-nowrap">
            {tier.badge}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {tier.name}
        </p>
        <div className="mt-3 text-navy-900">
          <AnimatedPrice price={price} suffix={tier.priceSuffix} />
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={price + "-note"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 text-xs text-neutral-400"
          >
            {tier.note(annual)}
          </motion.p>
        </AnimatePresence>
        {annual && (
          <span className="mt-2 inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
            Save 20% annually
          </span>
        )}
      </div>

      <div className="h-px w-full bg-neutral-100" />

      <ul className="my-6 flex flex-col gap-3">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
            <span className="text-sm text-neutral-700">{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-white
                     shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/40 transition-shadow"
        >
          {tier.ctaLabel}
        </motion.button>
      </div>
    </motion.div>
  );
}

function DarkCard({ tier, annual }: { tier: PricingTier; annual: boolean }) {
  const price = annual ? tier.priceAnnual : tier.priceMonthly;
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 24px 60px -12px rgba(20, 184, 166, 0.18)" }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="flex flex-col rounded-2xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur-sm"
    >
      {/* Badge */}
      <div className="mb-6">
        <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-0.5
                         text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
          {tier.badge}
        </span>
      </div>

      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {tier.name}
        </p>
        <div className="mt-3 text-white">
          <AnimatedPrice price={price} suffix={tier.priceSuffix} />
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={price + "-note"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 text-xs text-white/30"
          >
            {tier.note(annual)}
          </motion.p>
        </AnimatePresence>
        {annual && price !== "Custom" && (
          <span className="mt-2 inline-block rounded-full bg-emerald-900/40 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400 ring-1 ring-emerald-800/50">
            Save 20% annually
          </span>
        )}
      </div>

      <div className="h-px w-full bg-white/10" />

      <ul className="my-6 flex flex-col gap-3">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
            <span className="text-sm text-white/70">{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-full border border-primary/50 bg-primary/10 py-3 text-sm font-semibold
                     text-primary hover:bg-primary hover:text-white hover:border-primary
                     hover:shadow-lg hover:shadow-primary/30 transition-all duration-200"
        >
          {tier.ctaLabel}
        </motion.button>
      </div>
    </motion.div>
  );
}

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative overflow-hidden bg-navy-900 py-28 lg:py-36">
      {/* Subtle dot-grid atmosphere */}
      <div aria-hidden className="absolute inset-0 bg-dots opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">

        {/* Header */}
        <FadeUp className="mb-16 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-px w-10 bg-gold" />
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Simple, Transparent Pricing
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Invest in elite talent.
            <br />
            <span className="italic text-primary">Stop paying for mediocre.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/50">
            Every plan includes our rigorous vetting process. No hidden fees, no
            long-term contracts — just exceptional virtual professionals.
          </p>

          {/* Billing toggle */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <span className={`text-sm font-medium transition-colors ${!annual ? "text-white" : "text-white/40"}`}>
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setAnnual((a) => !a)}
              aria-pressed={annual}
              aria-label="Toggle annual billing"
              className="relative h-7 w-14 rounded-full bg-white/10 ring-1 ring-white/20 transition-colors
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                className={`absolute top-1 h-5 w-5 rounded-full bg-primary shadow-md ${annual ? "left-8" : "left-1"}`}
              />
            </button>
            <span className={`flex items-center gap-2 text-sm font-medium transition-colors ${annual ? "text-white" : "text-white/40"}`}>
              Annual
              <span className="rounded-full bg-emerald-900/60 px-2 py-0.5 text-[10px] font-bold text-emerald-400 ring-1 ring-emerald-800/50">
                SAVE 20%
              </span>
            </span>
          </div>
        </FadeUp>

        {/* Cards */}
        <StaggerChildren
          staggerMs={100}
          className="grid gap-6 md:grid-cols-3 md:items-center"
        >
          {pricingTiers.map((tier) =>
            tier.featured
              ? <FeaturedCard key={tier.name} tier={tier} annual={annual} />
              : <DarkCard key={tier.name} tier={tier} annual={annual} />
          )}
        </StaggerChildren>

        {/* Trust note */}
        <FadeUp delay={300} className="mt-16 text-center">
          <p className="text-sm text-white/30">
            All plans include a 30-day satisfaction guarantee · No credit card required to start
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
