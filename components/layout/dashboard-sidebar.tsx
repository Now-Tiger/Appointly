"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Briefcase,
  UserCheck,
  Clock,
  BarChart2,
  CreditCard,
  Plug,
  Key,
  Settings,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Appointments", href: "/appointments", icon: CalendarDays },
      { label: "Customers", href: "/customers", icon: Users },
    ],
  },
  {
    label: "Management",
    items: [
      { label: "Services", href: "/services", icon: Briefcase },
      { label: "Staff", href: "/staff", icon: UserCheck },
      { label: "Availability", href: "/availability", icon: Clock },
    ],
  },
  {
    label: "Business",
    items: [
      { label: "Analytics", href: "/analytics", icon: BarChart2, phase: 2 },
      { label: "Billing", href: "/billing", icon: CreditCard, phase: 2 },
      { label: "Integrations", href: "/integrations", icon: Plug, phase: 4 },
      { label: "API Keys", href: "/api-keys", icon: Key, phase: 4 },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "Settings", href: "/settings", icon: Settings },
      { label: "Audit Log", href: "/audit-log", icon: FileText, phase: 3 },
    ],
  },
] as const;

const CURRENT_PHASE = 0;

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex h-full w-60 shrink-0 flex-col border-r border-border bg-background">
      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <div className="space-y-6">
          {NAV_GROUPS.map((group) => {
            const visibleItems = group.items.filter(
              (item) => !("phase" in item) || item.phase <= CURRENT_PHASE
            );
            if (visibleItems.length === 0) return null;

            return (
              <div key={group.label}>
                <p className="mb-1 px-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {visibleItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                          isActive
                            ? "bg-muted text-foreground font-medium"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-4 w-4",
                            isActive
                              ? "text-foreground"
                              : "text-muted-foreground"
                          )}
                        />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-border px-6 py-4">
        <p className="text-xs text-muted-foreground">Free Trial</p>
        <Link
          href="/billing/plans"
          className="text-xs text-muted-foreground underline"
        >
          Upgrade plan
        </Link>
      </div>
    </aside>
  );
}
