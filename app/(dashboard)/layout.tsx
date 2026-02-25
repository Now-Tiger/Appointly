"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { MobileSidebarSheet } from "@/components/layout/mobile-sidebar-sheet";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-svh flex-col bg-background">
      <DashboardTopbar
        onMobileMenuToggle={() => setMobileMenuOpen(true)}
      />

      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <MobileSidebarSheet
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
