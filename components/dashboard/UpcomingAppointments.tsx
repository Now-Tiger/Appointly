"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Calendar } from "lucide-react";
import { format } from "date-fns";

const appointments = [
  {
    id: 1,
    customer: "Rahul Sharma",
    service: "Hair Cut",
    time: "10:00 AM",
    date: new Date(2026, 1, 22),
    status: "confirmed",
  },
  {
    id: 2,
    customer: "Priya Patel",
    service: "Massage Therapy",
    time: "11:30 AM",
    date: new Date(2026, 1, 22),
    status: "pending",
  },
  {
    id: 3,
    customer: "Amit Kumar",
    service: "Consultation",
    time: "02:00 PM",
    date: new Date(2026, 1, 22),
    status: "confirmed",
  },
  {
    id: 4,
    customer: "Sneha Gupta",
    service: "Facial Treatment",
    time: "03:30 PM",
    date: new Date(2026, 1, 23),
    status: "confirmed",
  },
  {
    id: 5,
    customer: "Vikram Singh",
    service: "Personal Training",
    time: "05:00 PM",
    date: new Date(2026, 1, 23),
    status: "pending",
  },
];

const statusColors = {
  confirmed: "bg-[#4A7C59] text-white",
  pending: "bg-[#F5F5F3] text-[#0B0B0B] border border-[#0B0B0B]/20",
  cancelled: "bg-red-100 text-red-800",
};

export default function UpcomingAppointments() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Card className="border border-[#0B0B0B]/10 p-6">
        <div className="mb-6">
          <p className="text-[11px] tracking-widest uppercase text-[#0B0B0B]/40 mb-2">
            Today&apos;s Schedule
          </p>
          <h3 className="text-2xl font-bold text-[#0B0B0B] tracking-tight">
            Upcoming Appointments
          </h3>
        </div>
        <div className="space-y-3">
          {appointments.map((apt, index) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
              className="border border-[#0B0B0B]/10 rounded-lg p-4 hover:bg-[#F5F5F3]/50 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0B0B0B]/5 flex items-center justify-center group-hover:bg-[#0B0B0B] transition-all duration-200">
                    <User className="w-5 h-5 text-[#0B0B0B]/60 group-hover:text-white transition-colors duration-200" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0B0B0B] text-sm">{apt.customer}</p>
                    <p className="text-xs text-[#0B0B0B]/50">{apt.service}</p>
                  </div>
                </div>
                <Badge className={`${statusColors[apt.status]} text-xs px-2 py-1`}>
                  {apt.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-[#0B0B0B]/50">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} />
                  <span>{apt.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  <span>{format(apt.date, "MMM d, yyyy")}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
