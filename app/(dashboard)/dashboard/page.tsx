"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { PageHeader } from "@/components/layout/page-header";
import { Skeleton } from "@/components/ui/skeleton";

function StatCardSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <Skeleton className="h-3 w-20 mb-3" />
      <Skeleton className="h-8 w-16 mb-2" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
}

export default function DashboardPage() {
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning." : hour < 18 ? "Good afternoon." : "Good evening.";

  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="space-y-8">
      <PageHeader title={greeting} subtitle={dateStr} />

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {["Today", "This Week", "Completion", "No-show"].map((label) => (
          <motion.div key={label} variants={staggerItem}>
            <StatCardSkeleton />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Today&apos;s Appointments
          </h2>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="font-soria text-lg text-foreground">No appointments yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Appointments will appear here once your backend is connected.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Quick Actions
          </h2>
          <div className="space-y-2">
            {[
              { label: "New Appointment", href: "/appointments" },
              { label: "Manage Availability", href: "/availability" },
              { label: "View All Appointments", href: "/appointments" },
              { label: "Add Service", href: "/services" },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                &rarr; {action.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
