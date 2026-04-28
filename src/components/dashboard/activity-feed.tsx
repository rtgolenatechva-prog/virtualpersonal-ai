"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  MessageCircle,
  Calendar,
  UserCheck,
  DollarSign,
  Star,
} from "lucide-react";
import { MOCK_ACTIVITIES, type ActivityType } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const TYPE_CFG: Record<ActivityType, {
  icon: React.ElementType;
  bg: string;
  color: string;
  dot: string;
}> = {
  match:     { icon: Sparkles,      bg: "bg-teal-50",    color: "text-teal-600",   dot: "bg-teal-400"   },
  message:   { icon: MessageCircle, bg: "bg-blue-50",    color: "text-blue-600",   dot: "bg-blue-400"   },
  interview: { icon: Calendar,      bg: "bg-purple-50",  color: "text-purple-600", dot: "bg-purple-400" },
  hired:     { icon: UserCheck,     bg: "bg-emerald-50", color: "text-emerald-600",dot: "bg-emerald-400"},
  invoice:   { icon: DollarSign,    bg: "bg-amber-50",   color: "text-amber-600",  dot: "bg-amber-400"  },
  review:    { icon: Star,          bg: "bg-orange-50",  color: "text-orange-600", dot: "bg-orange-400" },
};

export function ActivityFeed() {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <h3 className="text-[13.5px] font-semibold text-slate-900">Recent Activity</h3>
        <button className="text-[12px] font-medium text-teal-600 hover:underline">View all</button>
      </div>

      {/* Items */}
      <div className="flex flex-col divide-y divide-slate-50 overflow-y-auto">
        {MOCK_ACTIVITIES.map((activity, i) => {
          const cfg = TYPE_CFG[activity.type];
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.2 }}
              className="flex cursor-pointer items-start gap-3 px-5 py-3.5 transition-colors hover:bg-slate-50"
            >
              {/* Icon */}
              <div className={cn("mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg", cfg.bg)}>
                <cfg.icon className={cn("h-3.5 w-3.5", cfg.color)} />
              </div>

              {/* Text */}
              <div className="flex flex-1 min-w-0 flex-col">
                <p className="text-[12.5px] leading-snug text-slate-700">{activity.content}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">{activity.time}</p>
              </div>

              {/* Dot */}
              <span className={cn("mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full", cfg.dot)} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
