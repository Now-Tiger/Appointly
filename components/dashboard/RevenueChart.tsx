"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", revenue: 2400, bookings: 24 },
  { day: "Tue", revenue: 1398, bookings: 18 },
  { day: "Wed", revenue: 9800, bookings: 42 },
  { day: "Thu", revenue: 3908, bookings: 35 },
  { day: "Fri", revenue: 4800, bookings: 48 },
  { day: "Sat", revenue: 3800, bookings: 38 },
  { day: "Sun", revenue: 4300, bookings: 43 },
];

export default function RevenueChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Card className="border border-[#0B0B0B]/10 p-6">
        <div className="mb-6">
          <p className="text-[11px] tracking-widest uppercase text-[#0B0B0B]/40 mb-2">
            Weekly Revenue
          </p>
          <h3 className="text-2xl font-bold text-[#0B0B0B] tracking-tight">₹30,408</h3>
          <p className="text-sm text-[#4A7C59] mt-1">+12.5% from last week</p>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0B0B0B" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#0B0B0B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#0B0B0B" strokeOpacity={0.05} />
            <XAxis
              dataKey="day"
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
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#0B0B0B"
              strokeWidth={2}
              fill="url(#colorRevenue)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </motion.div>
  );
}
