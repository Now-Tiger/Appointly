"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Briefcase,
  UserCheck,
  Clock,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const MOBILE_NAV_ITEMS = [
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
    label: "Settings",
    items: [{ label: "Settings", href: "/settings", icon: Settings }],
  },
] as const;

interface MobileSidebarSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebarSheet({ isOpen, onClose }: MobileSidebarSheetProps) {
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b border-border px-6 py-4">
          <SheetTitle className="font-soria text-lg font-normal text-left">
            appointly
          </SheetTitle>
        </SheetHeader>

        <nav className="px-3 py-4">
          <div className="space-y-6">
            {MOBILE_NAV_ITEMS.map((group) => (
              <div key={group.label}>
                <p className="mb-1 px-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      pathname.startsWith(item.href + "/");
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
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
            ))}
          </div>
        </nav>

        <div className="mt-auto border-t border-border px-6 py-4">
          <p className="text-xs text-muted-foreground">Free Trial</p>
          <Link
            href="/billing/plans"
            onClick={onClose}
            className="text-xs text-muted-foreground underline"
          >
            Upgrade plan
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
