"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  /** Percentage change — positive=up, negative=down, 0=flat */
  trend: number;
  trendLabel: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  decimal?: boolean;
  /** Stagger delay in ms */
  delay?: number;
}

export function StatCard({
  label,
  value,
  prefix = "",
  suffix = "",
  trend,
  trendLabel,
  icon: Icon,
  iconColor,
  iconBg,
  decimal = false,
  delay = 0,
}: StatCardProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1100;
    const startAt  = Date.now() + delay;

    const tick = () => {
      const now      = Date.now();
      if (now < startAt) { requestAnimationFrame(tick); return; }
      const elapsed  = now - startAt;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const cur      = decimal
        ? Math.round(value * eased * 10) / 10
        : Math.round(value * eased);
      setDisplay(cur);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value, delay, decimal]);

  const TrendIcon  = trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus;
  const trendCls   = trend > 0
    ? "text-emerald-700 bg-emerald-50"
    : trend < 0
    ? "text-red-600 bg-red-50"
    : "text-slate-500 bg-slate-100";

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-slate-200 hover:shadow-md"
    >
      {/* Subtle hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top_right,rgba(20,184,166,0.04),transparent_65%)]" />

      <div className="flex items-start justify-between">
        <p className="text-[11.5px] font-medium uppercase tracking-wider text-slate-400">{label}</p>
        <div className={cn("flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl", iconBg)}>
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
      </div>

      <div className="mt-3 flex items-end gap-1">
        {prefix && <span className="mb-0.5 text-base font-semibold text-slate-400">{prefix}</span>}
        <span className="text-[28px] font-bold leading-none tracking-tight text-slate-900 tabular-nums">
          {decimal ? display.toFixed(1) : display.toLocaleString()}
        </span>
        {suffix && <span className="mb-0.5 text-base font-semibold text-slate-400">{suffix}</span>}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className={cn(
          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
          trendCls,
        )}>
          <TrendIcon className="h-2.5 w-2.5" />
          {trend > 0 ? "+" : ""}{trend}%
        </span>
        <span className="text-[11.5px] text-slate-400">{trendLabel}</span>
      </div>
    </div>
  );
}
