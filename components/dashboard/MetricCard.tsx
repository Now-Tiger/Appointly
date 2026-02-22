"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react";

type MetricCardProps = { title: string, value: string, change: number, icon: LucideIcon, delay: number }

export default function MetricCard({ title, value, change, icon: Icon, delay = 0 }: MetricCardProps) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Card className="border border-[#0B0B0B]/10 p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#0B0B0B]/5 flex items-center justify-center group-hover:bg-[#0B0B0B] transition-all duration-300">
            <Icon className="w-5 h-5 text-[#0B0B0B]/60 group-hover:text-white transition-colors duration-300" />
          </div>
          <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-[#4A7C59]" : "text-red-500"}`}>
            {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            <span className="font-medium">{Math.abs(change)}%</span>
          </div>
        </div>
        <p className="text-[11px] tracking-widest uppercase text-[#0B0B0B]/40 mb-2">
          {title}
        </p>
        <motion.p
          className="text-3xl font-bold text-[#0B0B0B] tracking-tight"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.2 }}
        >
          {value}
        </motion.p>
      </Card>
    </motion.div>
  );
}
