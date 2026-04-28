"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { FadeUp } from "@/components/ui/animate";

type Status = "idle" | "submitting" | "success";

interface FormState {
  name: string;
  company: string;
  email: string;
  roleDetails: string;
}

function GoldLine() {
  return <div className="h-px w-10 bg-gold" />;
}

export function FinalCTA() {
  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    roleDetails: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1500);
  }

  return (
    <section className="bg-white py-24 lg:py-32">

      <div className="relative mx-auto max-w-2xl px-4 sm:px-8">

        {/* Heading */}
        <FadeUp className="mb-10 text-center">
          <div className="flex justify-center mb-5">
            <GoldLine />
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Get Started Today
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Tell us what you need —
            <br />
            <span className="italic text-primary">we&apos;ll find your perfect match.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-neutral-500">
            Fill in the short form below and a talent advisor will reach out
            within 24 hours with pre-vetted candidates.
          </p>
        </FadeUp>

        {/* Success state */}
        {status === "success" ? (
          <FadeUp>
            <div className="flex flex-col items-center gap-5 rounded-2xl bg-neutral-50 py-16 text-center ring-1 ring-neutral-200">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-display text-xl font-semibold text-neutral-900">
                  Inquiry received!
                </p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  A talent advisor will reach out within 24 hours
                  <br />
                  with your curated shortlist.
                </p>
              </div>
              <a
                href="#"
                className="mt-1 flex items-center gap-1.5 text-sm font-medium text-primary/70 transition-colors hover:text-primary"
              >
                Prefer to talk? Book a call instead
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </FadeUp>
        ) : (
          <FadeUp delay={80}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-neutral-50 p-8 ring-1 ring-neutral-200 shadow-sm"
            >
              {/* Name + Company */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="cta-name"
                    className="text-xs font-medium text-neutral-600"
                  >
                    Your Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="cta-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className="rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900
                               outline-none placeholder:text-neutral-400
                               focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="cta-company"
                    className="text-xs font-medium text-neutral-600"
                  >
                    Company Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="cta-company"
                    name="company"
                    type="text"
                    required
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Acme Corp"
                    className="rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900
                               outline-none placeholder:text-neutral-400
                               focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mt-5 flex flex-col gap-1.5">
                <label
                  htmlFor="cta-email"
                  className="text-xs font-medium text-neutral-600"
                >
                  Email Address <span className="text-primary">*</span>
                </label>
                <input
                  id="cta-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@company.com"
                  className="rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900
                             outline-none placeholder:text-neutral-400
                             focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all"
                />
              </div>

              {/* Role Details */}
              <div className="mt-5 flex flex-col gap-1.5">
                <label
                  htmlFor="cta-roleDetails"
                  className="text-xs font-medium text-neutral-600"
                >
                  Role Details <span className="text-primary">*</span>
                </label>
                <textarea
                  id="cta-roleDetails"
                  name="roleDetails"
                  required
                  rows={4}
                  value={form.roleDetails}
                  onChange={handleChange}
                  placeholder="I'm looking for a…"
                  className="resize-none rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900
                             outline-none placeholder:text-neutral-400
                             focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all"
                />
              </div>

              {/* Submit */}
              <div className="mt-6">
                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.975 }}
                  className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white
                             shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40
                             transition-shadow disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Submit Inquiry
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </motion.button>
              </div>

              {/* Footnote */}
              <div className="mt-5 flex flex-col items-center gap-2 text-center">
                <p className="text-[11px] text-neutral-400">
                  We&apos;ll match you with vetted candidates within 48 hours · No credit card required
                </p>
                <a
                  href="#"
                  className="flex items-center gap-1 text-xs text-neutral-400 transition-colors hover:text-neutral-700"
                >
                  Prefer to talk?{" "}
                  <span className="text-primary/80 hover:text-primary underline-offset-2 hover:underline">
                    Book a call instead
                  </span>
                  <ArrowRight className="h-3 w-3 text-primary/80" />
                </a>
              </div>
            </form>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
