"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Sparkles,
  Calendar,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard",            href: "/dashboard",            icon: LayoutDashboard },
  { label: "My Jobs",              href: "/dashboard/jobs",        icon: Briefcase,       badge: 2 },
  { label: "Active VAs",           href: "/dashboard/vas",         icon: Users },
  { label: "Matches",              href: "/dashboard/matches",     icon: Sparkles,        badge: 3, pulse: true },
  { label: "Interviews",           href: "/dashboard/interviews",  icon: Calendar },
  { label: "Billing",              href: "/dashboard/billing",     icon: CreditCard },
  { label: "Settings",             href: "/dashboard/settings",    icon: Settings },
];

interface SidebarProps {
  expanded: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function Sidebar({ expanded, mobileOpen, onToggle, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        animate={{ width: expanded ? 220 : 64 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          // Layout
          "fixed left-0 top-0 z-50 flex h-screen flex-col bg-white border-r border-slate-100 overflow-hidden select-none",
          // Mobile: slide in/out, always full-width sidebar
          "max-lg:transition-transform max-lg:duration-300",
          mobileOpen ? "max-lg:translate-x-0 max-lg:!w-[220px]" : "max-lg:-translate-x-full max-lg:!w-[220px]",
        )}
      >
        {/* ── Logo ────────────────────────────────────────────────── */}
        <div className={cn(
          "flex h-[60px] flex-shrink-0 items-center border-b border-slate-100",
          expanded ? "justify-between px-4" : "justify-center px-0",
        )}>
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Logo mark */}
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-teal-500">
              <span className="text-[13px] font-bold leading-none text-white tracking-tight">vp</span>
            </div>
            {/* Wordmark — only when expanded */}
            {expanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-[13.5px] font-semibold text-slate-800 tracking-tight whitespace-nowrap"
              >
                virtualpersonal<span className="text-teal-500">.ai</span>
              </motion.span>
            )}
          </div>

          {/* Mobile close */}
          {expanded && (
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors lg:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* ── Nav ─────────────────────────────────────────────────── */}
        <nav className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden px-2.5 py-3 gap-0.5">
          {NAV.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                title={!expanded ? item.label : undefined}
                className={cn(
                  "group relative flex h-9 items-center rounded-xl transition-all duration-150",
                  expanded ? "gap-3 px-3" : "justify-center px-0",
                  active
                    ? "bg-teal-50 text-teal-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800",
                )}
              >
                {/* Active left pip */}
                {active && (
                  <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-r-full bg-teal-500" />
                )}

                {/* Icon */}
                <div className="relative flex-shrink-0">
                  <item.icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      active ? "text-teal-600" : "text-slate-400 group-hover:text-slate-600",
                    )}
                  />
                  {/* Collapsed badge dot */}
                  {!expanded && item.badge && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
                      {item.pulse && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-70" />
                      )}
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
                    </span>
                  )}
                </div>

                {/* Label + badge (expanded) */}
                {expanded && (
                  <>
                    <span className={cn(
                      "flex-1 text-[13px] font-medium whitespace-nowrap",
                      active ? "text-teal-700" : "",
                    )}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className={cn(
                        "flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10.5px] font-bold",
                        item.pulse
                          ? "bg-teal-500 text-white"
                          : "bg-slate-100 text-slate-600",
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── Collapse toggle (desktop) ────────────────────────────── */}
        <div className="hidden lg:block border-t border-slate-100 p-2.5">
          <button
            onClick={onToggle}
            className={cn(
              "flex h-8 w-full items-center rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors text-[12.5px] font-medium",
              expanded ? "gap-2 px-3" : "justify-center",
            )}
          >
            {expanded ? (
              <>
                <ChevronLeft className="h-4 w-4 flex-shrink-0" />
                <span>Collapse</span>
              </>
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* ── User ─────────────────────────────────────────────────── */}
        <div className={cn(
          "border-t border-slate-100",
          expanded ? "flex items-center gap-3 px-3.5 py-3.5" : "flex flex-col items-center gap-2 px-2 py-3",
        )}>
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-400">
              <span className="text-[11px] font-bold text-white">AW</span>
            </div>
            <span className="absolute -bottom-px -right-px flex h-2.5 w-2.5 items-center justify-center rounded-full bg-white">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
          </div>

          {expanded && (
            <div className="flex flex-1 min-w-0 flex-col">
              <span className="text-[12.5px] font-semibold text-slate-800 truncate leading-none">Alex Wilson</span>
              <span className="mt-0.5 text-[11px] text-slate-400 truncate leading-none">Founder & CEO</span>
            </div>
          )}

          <button
            title="Sign out"
            className={cn(
              "flex items-center justify-center rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors",
              expanded ? "h-8 w-8 flex-shrink-0" : "h-8 w-8",
            )}
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </motion.aside>
    </>
  );
}
