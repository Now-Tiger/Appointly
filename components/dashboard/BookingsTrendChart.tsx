"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", bookings: 65, completed: 58, cancelled: 7 },
  { month: "Feb", bookings: 78, completed: 72, cancelled: 6 },
  { month: "Mar", bookings: 92, completed: 85, cancelled: 7 },
  { month: "Apr", bookings: 105, completed: 98, cancelled: 7 },
  { month: "May", bookings: 118, completed: 110, cancelled: 8 },
  { month: "Jun", bookings: 134, completed: 125, cancelled: 9 },
];

export default function BookingsTrendChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Card className="border border-[#0B0B0B]/10 p-6">
        <div className="mb-6">
          <p className="text-[11px] tracking-widest uppercase text-[#0B0B0B]/40 mb-2">
            Bookings Trend
          </p>
          <h3 className="text-2xl font-bold text-[#0B0B0B] tracking-tight">6 Months Overview</h3>
          <p className="text-sm text-[#0B0B0B]/50 mt-1">Total bookings: 592</p>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#0B0B0B" strokeOpacity={0.05} />
            <XAxis
              dataKey="month"
              tick={{ fill: "#0B0B0B", opacity: 0.4, fontSize: 12 }}
              axisLine={{ stroke: "#0B0B0B", strokeOpacity: 0.1 }}
            />
            <YAxis
              tick={{ fill: "#0B0B0B", opacity: 0.4, fontSize: 12 }}
              axisLine={{ stroke: "#0B0B0B", strokeOpacity: 0.1 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0B0B0B",
                border: "none",
                borderRadius: "8px",
                color: "white",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="completed" fill="#4A7C59" radius={[4, 4, 0, 0]} animationDuration={1000} />
            <Bar dataKey="cancelled" fill="#BDBDBD" radius={[4, 4, 0, 0]} animationDuration={1000} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#4A7C59]" />
            <span className="text-xs text-[#0B0B0B]/50">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#BDBDBD]" />
            <span className="text-xs text-[#0B0B0B]/50">Cancelled</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
