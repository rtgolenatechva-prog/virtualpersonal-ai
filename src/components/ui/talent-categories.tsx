"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  ClipboardList,
  TrendingUp,
  MessageCircle,
  DollarSign,
  Code2,
  PenLine,
  BarChart3,
  ArrowRight,
  X,
} from "lucide-react";
import { FadeUp } from "@/components/ui/animate";
import { InquiryModal } from "@/components/ui/inquiry-modal";

interface Category {
  icon: React.ElementType;
  label: string;
  description: string;
  colorIcon: string;
  colorBg: string;
  hoverRing: string;
}

const talentCategories: Category[] = [
  {
    icon: Calendar,
    label: "Executive Assistant",
    description: "Calendar, inbox & travel management",
    colorIcon: "text-teal-600",
    colorBg: "bg-teal-50",
    hoverRing: "hover:ring-teal-200/80",
  },
  {
    icon: ClipboardList,
    label: "Administrative VA",
    description: "Data entry, scheduling & ops support",
    colorIcon: "text-blue-600",
    colorBg: "bg-blue-50",
    hoverRing: "hover:ring-blue-200/80",
  },
  {
    icon: TrendingUp,
    label: "Social Media Manager",
    description: "Content creation & channel growth",
    colorIcon: "text-purple-600",
    colorBg: "bg-purple-50",
    hoverRing: "hover:ring-purple-200/80",
  },
  {
    icon: MessageCircle,
    label: "Customer Support",
    description: "Helpdesk, live chat & ticket handling",
    colorIcon: "text-orange-600",
    colorBg: "bg-orange-50",
    hoverRing: "hover:ring-orange-200/80",
  },
  {
    icon: DollarSign,
    label: "Bookkeeper & Finance",
    description: "Invoicing, reconciliation & reporting",
    colorIcon: "text-green-600",
    colorBg: "bg-green-50",
    hoverRing: "hover:ring-green-200/80",
  },
  {
    icon: Code2,
    label: "Tech & Development",
    description: "Web dev, automation & integrations",
    colorIcon: "text-indigo-600",
    colorBg: "bg-indigo-50",
    hoverRing: "hover:ring-indigo-200/80",
  },
  {
    icon: PenLine,
    label: "Content & Marketing",
    description: "Blogs, email & campaign strategy",
    colorIcon: "text-pink-600",
    colorBg: "bg-pink-50",
    hoverRing: "hover:ring-pink-200/80",
  },
  {
    icon: BarChart3,
    label: "Research & Data",
    description: "Market research, reports & analysis",
    colorIcon: "text-amber-600",
    colorBg: "bg-amber-50",
    hoverRing: "hover:ring-amber-200/80",
  },
];

function GoldLine() {
  return <div className="h-px w-10 bg-gold" />;
}

/* ── Individual card ──────────────────────────────────────────────────── */
function CategoryCard({
  cat,
  index,
  onClick,
}: {
  cat: Category;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: index * 0.055, ease: "easeOut" }}
      whileHover={{
        y: -6,
        boxShadow: "0 20px 48px -8px rgba(0,0,0,0.12), 0 0 0 1.5px rgba(20,184,166,0.25)",
      }}
      className={[
        // Fixed height + full-width fill ensures every card is identical
        "group relative flex h-full w-full flex-col items-start gap-0 rounded-2xl bg-white p-6 text-left",
        "border border-neutral-100 shadow-sm ring-1 ring-transparent",
        "transition-[box-shadow,border-color] duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        cat.hoverRing,
      ].join(" ")}
    >
      {/* Teal reveal strip at bottom on hover */}
      <motion.span
        aria-hidden
        className="absolute bottom-0 left-0 h-0.5 origin-left rounded-full bg-primary"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
      />

      {/* Icon */}
      <div
        className={`mb-5 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${cat.colorBg}
                    transition-transform duration-300 group-hover:scale-110`}
      >
        <cat.icon className={`h-6 w-6 ${cat.colorIcon}`} />
      </div>

      {/* Text — flex-1 pushes Inquire to the bottom */}
      <div className="flex flex-1 flex-col">
        <p className="text-[15px] font-semibold leading-snug text-neutral-900">
          {cat.label}
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">
          {cat.description}
        </p>
      </div>

      {/* Inquire CTA */}
      <span className="mt-5 flex items-center gap-1 text-xs font-semibold text-primary/50
                       transition-all duration-200 group-hover:gap-1.5 group-hover:text-primary">
        Inquire
        <ArrowRight className="h-3 w-3" />
      </span>
    </motion.button>
  );
}

/* ── "View All" modal ─────────────────────────────────────────────────── */
function ViewAllModal({
  open,
  onClose,
  onInquire,
}: {
  open: boolean;
  onClose: () => void;
  onInquire: (label: string) => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="view-all-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 modal-backdrop" onClick={onClose} />

          <motion.div
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto
                       rounded-2xl bg-white shadow-2xl ring-1 ring-black/8"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-5">
              <div>
                <div className="mb-1 h-px w-6 bg-gold" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                  All Categories
                </p>
                <h2 className="mt-1 font-display text-xl font-bold text-neutral-900">
                  Choose your specialist
                </h2>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400
                           transition-colors hover:bg-neutral-100 hover:text-neutral-700"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-6 sm:grid-cols-4 [grid-auto-rows:1fr]">
              {talentCategories.map((cat) => (
                <motion.button
                  key={cat.label}
                  type="button"
                  onClick={() => { onInquire(cat.label); onClose(); }}
                  whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(20,184,166,0.15)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group flex h-full flex-col items-start justify-between rounded-xl
                             border border-neutral-100 bg-neutral-50 p-5 text-left
                             transition-colors duration-200 hover:border-primary/30 hover:bg-white"
                >
                  <div>
                    <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${cat.colorBg}
                                    transition-transform duration-200 group-hover:scale-110`}>
                      <cat.icon className={`h-5 w-5 ${cat.colorIcon}`} />
                    </div>
                    <p className="text-sm font-semibold leading-snug text-neutral-900">{cat.label}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">{cat.description}</p>
                  </div>
                  <span className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary/50
                                   transition-all duration-200 group-hover:gap-1.5 group-hover:text-primary">
                    Inquire <ArrowRight className="h-3 w-3" />
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Main section ─────────────────────────────────────────────────────── */
export function TalentCategories() {
  const [modalOpen,     setModalOpen]     = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [viewAllOpen,   setViewAllOpen]   = useState(false);

  function openInquiry(label: string) {
    setActiveCategory(label);
    setModalOpen(true);
  }

  return (
    <section id="talent" className="bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">

        {/* Header */}
        <FadeUp className="mb-16 text-center">
          <div className="flex justify-center mb-4">
            <GoldLine />
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Talent Categories
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Find the right expert
            <br className="hidden sm:block" /> for every role
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-neutral-500">
            Browse specialists across every business function — all vetted, all
            ready to hit the ground running.
          </p>
        </FadeUp>

        {/*
          [grid-auto-rows:1fr] forces every row to share the same height,
          making all 8 cards pixel-perfect uniform regardless of content length.
        */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 [grid-auto-rows:1fr]">
          {talentCategories.map((cat, i) => (
            <CategoryCard
              key={cat.label}
              cat={cat}
              index={i}
              onClick={() => openInquiry(cat.label)}
            />
          ))}
        </div>

        {/* View All */}
        <FadeUp delay={300} className="mt-14 text-center">
          <motion.button
            onClick={() => setViewAllOpen(true)}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 24 }}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white
                       px-8 py-3 text-sm font-medium text-neutral-700 shadow-sm
                       transition-all duration-200
                       hover:border-primary/40 hover:text-primary hover:shadow-md hover:shadow-primary/8"
          >
            View All Categories <ArrowRight className="h-4 w-4" />
          </motion.button>
        </FadeUp>
      </div>

      <ViewAllModal
        open={viewAllOpen}
        onClose={() => setViewAllOpen(false)}
        onInquire={openInquiry}
      />
      <InquiryModal
        open={modalOpen}
        categoryName={activeCategory}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
