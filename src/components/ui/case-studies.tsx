"use client";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { FadeUp, StaggerChildren } from "@/components/ui/animate";

interface CaseStudy {
  company: string;
  industry: string;
  metric: string;
  metricLabel: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
  avatarBg: string;
  featured: boolean;
  result: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    company: "NovaTech SaaS",
    industry: "B2B Software",
    metric: "40 hrs/wk",
    metricLabel: "saved per founder",
    quote:
      "VirtualPersonal.ai understood exactly what we needed. Our EA took over the entire ops layer — inbox, scheduling, investor prep — within a week. I finally have bandwidth to build.",
    name: "Ryan B.",
    role: "CEO",
    initials: "RB",
    avatarBg: "bg-teal-500",
    featured: false,
    result: "EA placement in 48 hours",
  },
  {
    company: "Meridian Capital",
    industry: "Financial Services",
    metric: "$47K",
    metricLabel: "recovered in month one",
    quote:
      "The bookkeeper uncovered $47K in billing errors within her first month. Our ROI on this single hire was over 6× — and she's become indispensable to the entire finance team.",
    name: "Clara P.",
    role: "Managing Director",
    initials: "CP",
    avatarBg: "bg-indigo-500",
    featured: false,
    result: "6× ROI, first month",
  },
  {
    company: "ScaleCraft Agency",
    industry: "Digital Marketing",
    metric: "15 VAs",
    metricLabel: "placed in 8 months",
    quote:
      "We grew from a 3-person founding team to an 18-strong virtual workforce — all through VirtualPersonal.ai. Every single placement has been exceptional. This is how you scale intelligently.",
    name: "Tom N.",
    role: "Founder & CEO",
    initials: "TN",
    avatarBg: "bg-amber-500",
    featured: true,
    result: "3× team capacity in 8 months",
  },
];

export function CaseStudies() {
  return (
    <section className="bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">

        <FadeUp className="mb-16 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-px w-10 bg-gold" />
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Case Studies
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Real clients. Measurable results.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-neutral-500">
            These aren&apos;t testimonials — they&apos;re documented outcomes from businesses
            that trusted us to find their next critical hire.
          </p>
        </FadeUp>

        <StaggerChildren
          staggerMs={90}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch"
        >
          {CASE_STUDIES.map((cs) => (
            <motion.div
              key={cs.company}
              whileHover={
                cs.featured
                  ? { y: -6, boxShadow: "0 32px 72px -16px rgba(20,184,166,0.32)" }
                  : { y: -4, boxShadow: "0 24px 56px -14px rgba(0,0,0,0.10)" }
              }
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className={[
                "relative flex flex-col h-full rounded-2xl p-8",
                cs.featured
                  ? "bg-navy-900 ring-2 ring-primary shadow-2xl shadow-primary/25"
                  : "bg-white border border-neutral-100 shadow-md",
              ].join(" ")}
            >
              {/* Pulsing outer glow ring on featured card */}
              {cs.featured && (
                <div className="absolute -inset-px rounded-2xl ring-2 ring-primary/30 animate-pulse pointer-events-none" />
              )}

              {/* Industry tag + Featured badge */}
              <div className="mb-6 flex items-center justify-between">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                    cs.featured
                      ? "bg-primary/15 text-primary"
                      : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {cs.industry}
                </span>
                {cs.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gold">
                    <TrendingUp className="h-3 w-3" /> Featured
                  </span>
                )}
              </div>

              {/* Metric */}
              <div className="mb-6">
                <span
                  className={`font-display text-5xl font-bold tracking-tight ${
                    cs.featured ? "text-white" : "text-neutral-900"
                  }`}
                >
                  {cs.metric}
                </span>
                <p
                  className={`mt-1 text-sm ${
                    cs.featured ? "text-white/50" : "text-neutral-500"
                  }`}
                >
                  {cs.metricLabel}
                </p>
              </div>

              {/* Divider */}
              <div
                className={`mb-6 h-px w-full ${
                  cs.featured ? "bg-white/10" : "bg-neutral-100"
                }`}
              />

              {/* Quote */}
              <p
                className={`flex-1 text-sm leading-relaxed ${
                  cs.featured ? "text-white/70" : "text-neutral-600"
                }`}
              >
                &ldquo;{cs.quote}&rdquo;
              </p>

              {/* Person */}
              <div className="mt-8 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${cs.avatarBg} text-xs font-bold text-white`}
                >
                  {cs.initials}
                </div>
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      cs.featured ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    {cs.name}
                  </p>
                  <p
                    className={`text-xs ${
                      cs.featured ? "text-white/40" : "text-neutral-500"
                    }`}
                  >
                    {cs.role} · {cs.company}
                  </p>
                </div>
              </div>

              {/* Result tag */}
              <div
                className={`mt-5 pt-4 border-t ${
                  cs.featured ? "border-white/8" : "border-neutral-100"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span
                    className={`text-xs font-medium ${
                      cs.featured ? "text-primary" : "text-primary/80"
                    }`}
                  >
                    {cs.result}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>

        <FadeUp delay={300} className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-primary"
          >
            Read all case studies <ArrowRight className="h-4 w-4" />
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
