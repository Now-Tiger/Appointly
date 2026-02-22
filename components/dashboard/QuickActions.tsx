"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Plus, Calendar, Users, Settings } from "lucide-react";

const actions = [
  { icon: Plus, label: "New Booking", color: "bg-[#0B0B0B]" },
  { icon: Calendar, label: "Set Availability", color: "bg-[#4A7C59]" },
  { icon: Users, label: "Manage Customers", color: "bg-[#1A1A1A]" },
  { icon: Settings, label: "Settings", color: "bg-[#BDBDBD]" },
];

export default function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Card className="border border-[#0B0B0B]/10 p-6">
        <div className="mb-6">
          <p className="text-[11px] tracking-widest uppercase text-[#0B0B0B]/40 mb-2">
            Quick Actions
          </p>
          <h3 className="text-lg font-bold text-[#0B0B0B] tracking-tight">
            What would you like to do?
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${action.color} text-white p-4 rounded-lg flex flex-col items-center justify-center gap-2 hover:opacity-90 transition-all duration-200`}
            >
              <action.icon size={20} />
              <span className="text-xs font-medium text-center">
                {action.label}
              </span>
            </motion.button>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
