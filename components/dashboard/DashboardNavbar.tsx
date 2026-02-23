"use client";

import Link from "next/link";
import { Home, Calendar, Users, Settings, LayoutDashboard } from "lucide-react";

const navItems = [
  { icon: Home, label: "home", page: "/" },
  { icon: LayoutDashboard, label: "Dashboard", page: "/dashboard" },
  { icon: Calendar, label: "Bookings", page: "/dashboard" },
  { icon: Users, label: "Customers", page: "/dashboard" },
  { icon: Settings, label: "Settings", page: "/dashboard" },
];

export default function DashboardNavbar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:block fixed left-4 top-4 bottom-4 w-20 z-50">
        <div className="h-full bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg shadow-black/5 flex flex-col items-center py-6 gap-2">
          {/* Logo */}
          <Link href={"/"} className="mb-6">
            <div className="w-10 h-10 bg-[#0B0B0B] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
          </Link>

          {/* Nav Items */}
          <div className="flex-1 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.page}
                className="w-12 h-12 rounded-xl flex items-center justify-center text-[#0B0B0B]/40 hover:text-[#0B0B0B] hover:bg-[#0B0B0B]/5 transition-all duration-200 group relative"
                title={item.label}
              >
                <item.icon size={20} />
                <span className="absolute left-full ml-4 px-3 py-1.5 bg-[#0B0B0B] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Status Indicator */}
          <div className="w-2 h-2 rounded-full bg-[#4A7C59] animate-pulse" />
        </div>
      </nav>

      {/* Mobile Top Navbar */}
      <nav className="md:hidden sticky top-0 z-50 px-4 pt-4">
        <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg shadow-black/5 px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href={"/"}>
              <div className="w-10 h-10 bg-[#0B0B0B] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.page}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-[#0B0B0B]/40 hover:text-[#0B0B0B] hover:bg-[#0B0B0B]/5 transition-all duration-200"
                >
                  <item.icon size={18} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
