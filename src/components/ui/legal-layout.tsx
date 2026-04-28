import type { ReactNode } from "react";
import { Navbar } from "@/components/ui/navbar";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-28 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          {/* Eyebrow */}
          <div className="mb-6 h-px w-10 bg-gold" />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3">
            Legal
          </p>
          <h1 className="font-display text-3xl font-bold text-neutral-900 sm:text-4xl mb-2">
            {title}
          </h1>
          <p className="text-sm text-neutral-400 mb-12 border-b border-neutral-100 pb-8">
            Last updated: {lastUpdated}
          </p>

          {/* Content */}
          <div>{children}</div>

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-neutral-100 flex items-center gap-6">
            <a
              href="/"
              className="text-sm font-medium text-primary hover:underline transition-colors"
            >
              ← Back to virtualpersonal.ai
            </a>
            <span className="text-neutral-200">|</span>
            <a href="/privacy" className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors">Privacy Policy</a>
            <a href="/terms"   className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors">Terms of Service</a>
            <a href="/cookies" className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </main>
    </>
  );
}

// ─── Typography helpers for legal content ─────────────────────────────────────

export function LegalH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-xl font-semibold text-neutral-900 mt-10 mb-4">
      {children}
    </h2>
  );
}

export function LegalP({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm leading-relaxed text-neutral-600 mb-4">
      {children}
    </p>
  );
}

export function LegalUl({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600 mb-6 ml-2">
      {children}
    </ul>
  );
}
