"use client";

import {Calendar, DollarSign, Users, TrendingUp } from "lucide-react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import MetricCard from "@/components/dashboard/MetricCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import BookingsTrendChart from "@/components/dashboard/BookingsTrendChart";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import QuickActions from "@/components/dashboard/QuickActions";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F5F5F3]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <DashboardNavbar />
      {/* Main Content */}
      <div className="pl-28 pr-6 md:pr-12 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0B0B0B] tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-[#0B0B0B]/50 mt-1">
            Welcome back, Admin
          </p>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Bookings"
            value="248"
            change={12.5}
            icon={Calendar}
            delay={0}
          />
          <MetricCard
            title="Revenue (MTD)"
            value="₹1,24,500"
            change={8.2}
            icon={DollarSign}
            delay={0.05}
          />
          <MetricCard
            title="Active Customers"
            value="186"
            change={15.3}
            icon={Users}
            delay={0.1}
          />
          <MetricCard
            title="Completion Rate"
            value="94.2%"
            change={2.1}
            icon={TrendingUp}
            delay={0.15}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RevenueChart />
          <BookingsTrendChart />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <UpcomingAppointments />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}
