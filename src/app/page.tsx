"use client";
import { useState, useEffect, useRef } from "react";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "VirtualPersonal.ai",
  "url": "https://virtualpersonal.ai",
  "description":
    "Elite virtual assistant recruiting agency connecting businesses with the top 1% of vetted remote professionals. AI-powered matching, 12-step vetting, white-glove onboarding.",
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Virtual Assistant Talent Categories",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Executive Assistant",
          "description": "Calendar, inbox and travel management by a dedicated virtual executive assistant."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Administrative Virtual Assistant",
          "description": "Data entry, scheduling and operations support for growing businesses."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Social Media Manager",
          "description": "Content creation and channel growth managed by a dedicated remote social media specialist."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Customer Support VA",
          "description": "Helpdesk, live chat and ticket handling for businesses that demand fast, professional responses."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Bookkeeper & Finance VA",
          "description": "Invoicing, reconciliation and financial reporting handled by a vetted remote bookkeeper."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Tech & Development VA",
          "description": "Web development, automation and integrations delivered by a skilled remote tech professional."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Content & Marketing VA",
          "description": "Blog writing, email campaigns and marketing strategy executed by a dedicated content specialist."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Research & Data VA",
          "description": "Market research, reports and data analysis delivered by a vetted remote research professional."
        }
      }
    ]
  }
};

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "VirtualPersonal.ai Pricing Plans",
  "url": "https://virtualpersonal.ai/#pricing",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Offer",
        "name": "Starter Plan",
        "description": "1 active VA placement, 48-hr candidate delivery, 8-step skills vetting, 1 free replacement guarantee, access to 5 talent categories.",
        "price": "249",
        "priceCurrency": "USD",
        "priceSpecification": { "@type": "UnitPriceSpecification", "price": "249", "priceCurrency": "USD", "unitText": "MONTH" },
        "seller": { "@type": "Organization", "name": "VirtualPersonal.ai", "url": "https://virtualpersonal.ai" }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Offer",
        "name": "Growth Plan",
        "description": "Up to 3 concurrent VA placements, 24-hr priority matching, full 12-step vetting, dedicated success manager, unlimited replacement guarantee, all 8 talent categories.",
        "price": "469",
        "priceCurrency": "USD",
        "priceSpecification": { "@type": "UnitPriceSpecification", "price": "469", "priceCurrency": "USD", "unitText": "MONTH" },
        "seller": { "@type": "Organization", "name": "VirtualPersonal.ai", "url": "https://virtualpersonal.ai" }
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Offer",
        "name": "Enterprise Plan",
        "description": "Unlimited VA placements, same-day emergency matching, enterprise background checks, dedicated account director, SLA guarantees, custom onboarding workflows.",
        "seller": { "@type": "Organization", "name": "VirtualPersonal.ai", "url": "https://virtualpersonal.ai" }
      }
    }
  ]
};
import {
  Shield,
  Cpu,
  Users,
  Heart,
  Headphones,
  Layers,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import Hero from "@/components/ui/hero";
import { FadeUp, StaggerChildren } from "@/components/ui/animate";
import { Chatbot } from "@/components/ui/chatbot";
import { TalentCategories } from "@/components/ui/talent-categories";
import { TestimonialsScroll } from "@/components/ui/testimonials-scroll";
import { CaseStudies } from "@/components/ui/case-studies";
import { BlogSection } from "@/components/ui/blog-section";
import { Pricing } from "@/components/ui/pricing";
import { FinalCTA } from "@/components/ui/final-cta";
import { Footer } from "@/components/ui/footer";

// ─── Data ────────────────────────────────────────────────────────────────────

const premiumFeatures = [
  {
    icon: Shield,
    title: "Top 1% Vetted Talent",
    body: "Every VA completes a rigorous 12-step screening — skills tests, background checks, and live interviews. You only meet the best.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Matching",
    body: "Our system learns your workflow, culture, and timezone to recommend candidates that truly fit — not just résumés that match keywords.",
  },
  {
    icon: Users,
    title: "Dedicated Long-Term Partners",
    body: "No gig workers cycling in and out. Real professionals committed to your business who grow with you over time.",
  },
  {
    icon: Heart,
    title: "Cultural Fit Guarantee",
    body: "We match beyond skills — personality, communication style, and values. If it isn't right, we replace at no extra cost.",
  },
  {
    icon: Headphones,
    title: "White-Glove Onboarding",
    body: "A dedicated success manager guides you from the first hire through scaling. We stay involved so you never feel alone.",
  },
  {
    icon: Layers,
    title: "Scalable Team Growth",
    body: "Start with one VA and scale to an entire remote team seamlessly. Our system grows with your business — no rehiring headaches.",
  },
];

const steps = [
  {
    number: "01",
    title: "Post Your Role",
    body: "Describe the skills, schedule, timezone, and culture fit you need. Takes under 5 minutes.",
  },
  {
    number: "02",
    title: "Get Curated Matches",
    body: "Within 48 hours we shortlist 3–5 pre-vetted candidates tailored to your exact requirements.",
  },
  {
    number: "03",
    title: "Interview & Select",
    body: "Video calls, trial tasks, and reference checks — all arranged for you. Decide with confidence.",
  },
  {
    number: "04",
    title: "Onboard & Grow",
    body: "We stay involved post-hire. Your success manager checks in monthly to make sure everything is excellent.",
  },
];

const trustStats = [
  { value: 200,  suffix: "+",  label: "Businesses Served"  },
  { value: 98,   suffix: "%",  label: "Client Satisfaction" },
  { value: 500,  prefix: "$", suffix: "K+", label: "Ops Costs Saved" },
  { value: 4.9,  suffix: "★",  label: "Average Rating"     },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function GoldLine() {
  return <div className="h-px w-10 bg-gold" />;
}

// ─── Animated counter ─────────────────────────────────────────────────────────

function AnimatedStat({ value, prefix = "", suffix = "", label }: {
  value: number; prefix?: string; suffix?: string; label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const isDecimal = value % 1 !== 0;
    const duration = 1400;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = isDecimal
        ? Math.round(value * eased * 10) / 10
        : Math.round(value * eased);
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl font-bold tracking-tight text-navy-900 lg:text-5xl">
        {prefix}{display}{suffix}
      </p>
      <div className="mx-auto mt-3 mb-2 h-px w-8 bg-gold/70" />
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">{label}</p>
    </div>
  );
}

// ─── Section components ───────────────────────────────────────────────────────

function PremiumDifference() {
  return (
    <section id="why-us" className="relative bg-white py-28 lg:py-36 overflow-hidden">
      {/* Very subtle radial glow top-right — depth without noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(20,184,166,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">

        <FadeUp className="mb-20 text-center">
          <div className="flex justify-center mb-4">
            <GoldLine />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Why VirtualPersonal.ai
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Not just a marketplace.
            <br />
            <span className="italic text-primary">A dedicated partner.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-500">
            We built everything your hiring platform should have been — without the noise, the gig
            mentality, or the guesswork.
          </p>
        </FadeUp>

        <StaggerChildren
          staggerMs={75}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {premiumFeatures.map((f, idx) => (
            <motion.div
              key={f.title}
              whileHover={{
                y: -8,
                boxShadow:
                  "0 24px 52px -8px rgba(0,0,0,0.10), 0 0 0 1.5px rgba(20,184,166,0.22)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl
                         border border-neutral-100 bg-white p-8 shadow-sm cursor-default"
            >
              {/* Teal bottom-line reveal on hover */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 origin-left rounded-full bg-gradient-to-r from-primary to-primary/30"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
              />

              {/* Card number */}
              <span className="mb-5 block font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-neutral-200 transition-colors duration-300 group-hover:text-primary/40">
                0{idx + 1}
              </span>

              {/* Icon */}
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl
                           bg-gradient-to-br from-primary/12 to-primary/4
                           ring-1 ring-primary/10 shadow-sm
                           transition-all duration-300
                           group-hover:from-primary/20 group-hover:to-primary/8
                           group-hover:ring-primary/20 group-hover:shadow-primary/15 group-hover:shadow-lg"
              >
                <f.icon className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
              </div>

              <h3 className="mb-3 font-display text-[17px] font-semibold leading-snug text-neutral-900">
                {f.title}
              </h3>
              <p className="flex-1 text-sm leading-relaxed text-neutral-500">{f.body}</p>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

// ─── Animated step progress ───────────────────────────────────────────────────

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  // Auto-cycle through steps every 2.8 s
  useEffect(() => {
    const timer = setInterval(
      () => setActiveStep((s) => (s + 1) % steps.length),
      2800
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="how-it-works" className="relative py-28 lg:py-36">
      {/* Background workspace image — natural depth of field, no CSS blur */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf' +
            '?auto=format&fit=crop&w=2560&q=85")',
        }}
      />
      {/* Single flat overlay — no gradients at edges, sharp section boundaries */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(8, 14, 28, 0.74)" }}
      />
      {/* Subtle teal atmospheric glow bottom-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 0% 100%, rgba(20,184,166,0.12) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">

        <FadeUp className="mb-20 text-center">
          <div className="flex justify-center mb-4">
            <GoldLine />
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            The Process
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            From post to placed in days{" "}
            <span className="italic text-primary/90">— not weeks</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base text-white/55">
            A streamlined, white-glove process that saves you time at every step.
          </p>
        </FadeUp>

        {/* Progress connector track */}
        <div className="relative hidden lg:block mb-12">
          <div className="absolute left-[8%] right-[8%] top-8 h-px bg-white/10" />
          {/* Teal progress fill — animates from left to active step */}
          <motion.div
            className="absolute left-[8%] top-8 h-px bg-gradient-to-r from-primary to-primary/50"
            animate={{ width: `${(activeStep / (steps.length - 1)) * 84}%` }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          />
        </div>

        <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const isPast   = i < activeStep;
            const isActive = i === activeStep;

            return (
              <motion.div
                key={step.number}
                onClick={() => setActiveStep(i)}
                animate={isActive ? { y: -6 } : { y: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                className="relative flex flex-col gap-5 cursor-pointer"
              >
                {/* Step circle */}
                <motion.div
                  animate={
                    isActive
                      ? {
                          scale: 1.12,
                          boxShadow: "0 0 0 8px rgba(20,184,166,0.15), 0 0 28px rgba(20,184,166,0.45)",
                          borderColor: "rgba(20,184,166,1)",
                          backgroundColor: "rgba(20,184,166,0.22)",
                        }
                      : isPast
                      ? {
                          scale: 1,
                          boxShadow: "none",
                          borderColor: "rgba(20,184,166,0.55)",
                          backgroundColor: "rgba(20,184,166,0.12)",
                        }
                      : {
                          scale: 1,
                          boxShadow: "none",
                          borderColor: "rgba(255,255,255,0.20)",
                          backgroundColor: "rgba(255,255,255,0.07)",
                        }
                  }
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="flex h-16 w-16 items-center justify-center rounded-full border-2
                             font-display text-xl font-bold text-white"
                >
                  {isPast ? (
                    <CheckCircle className="h-7 w-7 text-primary" />
                  ) : (
                    step.number
                  )}
                </motion.div>

                <div>
                  <motion.h3
                    animate={{ color: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.75)" }}
                    transition={{ duration: 0.3 }}
                    className="font-display mb-2 text-base font-semibold"
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    animate={{ opacity: isActive ? 0.75 : 0.45 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm leading-relaxed text-white"
                  >
                    {step.body}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Step dot indicators (mobile) */}
        <div className="mt-10 flex justify-center gap-2 lg:hidden">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === activeStep ? "24px" : "6px",
                backgroundColor: i === activeStep ? "rgba(20,184,166,1)" : "rgba(255,255,255,0.25)",
              }}
              aria-label={`Step ${i + 1}`}
            />
          ))}
        </div>

        <FadeUp delay={400} className="mt-20 text-center">
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 22 }}
            className="inline-flex items-center gap-2.5 rounded-full bg-primary px-10 py-4 text-sm font-semibold
                       text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/45
                       transition-shadow"
          >
            Post Your First Job Free <ArrowRight className="h-4 w-4" />
          </motion.button>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Trust bar with animated counters ────────────────────────────────────────

function TrustBar() {
  return (
    <section className="relative overflow-hidden border-y border-neutral-100 bg-white py-20">
      {/* Very subtle dot texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #14b8a6 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <FadeUp>
          <p className="mb-14 text-center text-[10px] font-bold uppercase tracking-[0.35em] text-neutral-400">
            Trusted by 200+ businesses worldwide
          </p>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {trustStats.map((s) => (
              <AnimatedStat key={s.label} {...s} />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      <Navbar />
      <main>
        <Hero />
        <PremiumDifference />
        <HowItWorks />
        <TalentCategories />
        <TestimonialsScroll />
        <CaseStudies />
        <TrustBar />
        <BlogSection />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
