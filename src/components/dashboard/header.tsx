"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  Menu,
  Plus,
  ChevronDown,
  Sparkles,
  MessageCircle,
  Calendar,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard":            "Dashboard",
  "/dashboard/jobs":       "My Jobs",
  "/dashboard/vas":        "Active VAs",
  "/dashboard/matches":    "Matches & Shortlists",
  "/dashboard/interviews": "Interviews",
  "/dashboard/billing":    "Billing & Invoices",
  "/dashboard/settings":   "Settings",
};

const NOTIFS = [
  { id: 1, type: "match",     text: "3 new matches for Senior EA role",    time: "2m ago",  unread: true  },
  { id: 2, type: "message",   text: "Sarah Chen sent a weekly report",      time: "1h ago",  unread: true  },
  { id: 3, type: "interview", text: "Interview confirmed with Ana Reyes",   time: "3h ago",  unread: true  },
  { id: 4, type: "invoice",   text: "Invoice #VP-2025-041 paid — $3,900",  time: "2d ago",  unread: false },
] as const;

const NOTIF_ICONS = {
  match:     { icon: Sparkles,       bg: "bg-teal-50",   color: "text-teal-600"   },
  message:   { icon: MessageCircle,  bg: "bg-blue-50",   color: "text-blue-600"   },
  interview: { icon: Calendar,       bg: "bg-purple-50", color: "text-purple-600" },
  invoice:   { icon: DollarSign,     bg: "bg-green-50",  color: "text-green-600"  },
} as const;

const DROPDOWN_ITEMS = [
  { label: "Profile",  sub: "Manage your account"  },
  { label: "Settings", sub: "App preferences"       },
  { label: "Billing",  sub: "Invoices & plans"      },
];

interface HeaderProps {
  onMobileMenuClick: () => void;
}

export function Header({ onMobileMenuClick }: HeaderProps) {
  const pathname  = usePathname();
  const title     = PAGE_TITLES[pathname] ?? "Dashboard";
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen,  setUserOpen]  = useState(false);
  const unread = NOTIFS.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-30 flex h-[60px] flex-shrink-0 items-center gap-4 border-b border-slate-100 bg-white px-4 sm:px-6">
      {/* Mobile hamburger */}
      <button
        onClick={onMobileMenuClick}
        className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Page title */}
      <h1 className="hidden text-[15px] font-semibold text-slate-900 lg:block">{title}</h1>

      {/* Search */}
      <div className="flex-1 max-w-xs lg:max-w-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search VAs, jobs, invoices…"
            className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-teal-300 focus:bg-white focus:ring-2 focus:ring-teal-100"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        {/* ── Notification bell ─────────────────────────────────── */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(v => !v); setUserOpen(false); }}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          >
            <Bell className="h-4 w-4" />
            {unread > 0 && (
              <span className="absolute right-2 top-2 flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-500" />
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }}
                  transition={{ duration: 0.14 }}
                  className="absolute right-0 top-11 z-50 w-[320px] rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                    <span className="text-[13px] font-semibold text-slate-900">Notifications</span>
                    <button className="text-[11.5px] font-medium text-teal-600 hover:underline">Mark all read</button>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {NOTIFS.map(n => {
                      const cfg = NOTIF_ICONS[n.type];
                      return (
                        <div
                          key={n.id}
                          className={cn(
                            "flex cursor-pointer items-start gap-3 px-4 py-3 transition-colors hover:bg-slate-50",
                            n.unread && "bg-teal-50/40",
                          )}
                        >
                          <div className={cn("mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg", cfg.bg)}>
                            <cfg.icon className={cn("h-3.5 w-3.5", cfg.color)} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[12.5px] leading-snug text-slate-700">{n.text}</p>
                            <p className="mt-0.5 text-[11px] text-slate-400">{n.time}</p>
                          </div>
                          {n.unread && <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal-500" />}
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t border-slate-100 p-2">
                    <button className="w-full rounded-xl py-2 text-[12px] font-medium text-teal-600 hover:bg-teal-50 transition-colors">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="mx-1 h-5 w-px bg-slate-200 hidden sm:block" />

        {/* ── User dropdown ──────────────────────────────────────── */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => { setUserOpen(v => !v); setNotifOpen(false); }}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100 transition-colors"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-cyan-400">
              <span className="text-[11px] font-bold text-white">AW</span>
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-[12.5px] font-semibold text-slate-900">Alex Wilson</span>
              <span className="mt-0.5 text-[10.5px] text-slate-400">Founder & CEO</span>
            </div>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          <AnimatePresence>
            {userOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setUserOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }}
                  transition={{ duration: 0.14 }}
                  className="absolute right-0 top-11 z-50 w-48 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-xl shadow-slate-200/50"
                >
                  {DROPDOWN_ITEMS.map(item => (
                    <button
                      key={item.label}
                      className="flex w-full flex-col rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-slate-50"
                    >
                      <span className="text-[13px] font-medium text-slate-800">{item.label}</span>
                      <span className="text-[11px] text-slate-400">{item.sub}</span>
                    </button>
                  ))}
                  <div className="my-1 h-px bg-slate-100" />
                  <button className="flex w-full rounded-xl px-3 py-2.5 text-[13px] font-medium text-red-500 transition-colors hover:bg-red-50">
                    Sign out
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* ── Post New Job CTA ───────────────────────────────────── */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1.5 rounded-xl bg-teal-500 px-4 py-2 text-[12.5px] font-semibold text-white shadow-sm shadow-teal-500/20 transition-colors hover:bg-teal-600"
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Post New Job</span>
          <span className="sm:hidden">New</span>
        </motion.button>
      </div>
    </header>
  );
}
