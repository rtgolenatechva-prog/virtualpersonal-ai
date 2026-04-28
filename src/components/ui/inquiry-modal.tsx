"use client";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface InquiryModalProps {
  open: boolean;
  categoryName: string;
  onClose: () => void;
}

type FormStatus = "idle" | "submitting" | "success";

interface FormState {
  name: string;
  company: string;
  email: string;
  roleDetails: string;
}

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function InquiryModal({ open, categoryName, onClose }: InquiryModalProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    roleDetails: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Pre-fill roleDetails and reset status whenever the selected category changes
  useEffect(() => {
    if (categoryName) {
      setForm((prev) => ({
        ...prev,
        roleDetails: `I'm looking for a ${categoryName} specialist to help with…`,
      }));
      setStatus("idle");
    }
  }, [categoryName]);

  // Focus first field when modal opens
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => firstInputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Escape key to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    // Simulated async submission — replace with real API call when ready
    setTimeout(() => setStatus("success"), 1500);
  }

  return (
    <AnimatePresence>
      {open && (
        /* Flex overlay — centers panel without percentage transforms */
        <motion.div
          key="inquiry-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 modal-backdrop"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="inquiry-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-modal-title"
            className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl ring-1 ring-black/8"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-neutral-100 px-6 py-5">
              <div>
                <div className="mb-1 h-px w-6 bg-gold" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                  Talent Inquiry
                </p>
                <h2
                  id="inquiry-modal-title"
                  className="mt-1 font-display text-xl font-bold text-neutral-900"
                >
                  {categoryName}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6">
              {status === "success" ? (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <CheckCircle2 className="h-12 w-12 text-primary" />
                  <div>
                    <p className="font-display text-lg font-semibold text-neutral-900">
                      We&apos;ve received your inquiry!
                    </p>
                    <p className="mt-1.5 text-sm text-neutral-500">
                      A talent advisor will reach out within 24 hours to discuss your{" "}
                      <span className="font-medium text-neutral-700">{categoryName}</span> needs.
                    </p>
                  </div>
                  <Button
                    onClick={onClose}
                    className="mt-2 rounded-full px-8"
                  >
                    Done
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="name"
                        className="text-xs font-medium text-neutral-700"
                      >
                        Full Name <span className="text-primary">*</span>
                      </label>
                      <input
                        ref={firstInputRef}
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        className="rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="company"
                        className="text-xs font-medium text-neutral-700"
                      >
                        Company <span className="text-primary">*</span>
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Acme Corp"
                        className="rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-medium text-neutral-700"
                    >
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="roleDetails"
                      className="text-xs font-medium text-neutral-700"
                    >
                      Role Details <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="roleDetails"
                      name="roleDetails"
                      required
                      rows={4}
                      value={form.roleDetails}
                      onChange={handleChange}
                      className="resize-none rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full rounded-full py-3 text-sm"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      "Submit Inquiry"
                    )}
                  </Button>

                  <p className="text-center text-[11px] text-neutral-400">
                    We&apos;ll match you with vetted candidates within 48 hours.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
