"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [expanded,   setExpanded]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <Sidebar
        expanded={expanded}
        mobileOpen={mobileOpen}
        onToggle={() => setExpanded(v => !v)}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main area shifts right based on sidebar width */}
      <div
        className={cn(
          "flex min-h-screen flex-col transition-[margin] duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          expanded ? "lg:ml-[220px]" : "lg:ml-[64px]",
        )}
      >
        <Header onMobileMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
