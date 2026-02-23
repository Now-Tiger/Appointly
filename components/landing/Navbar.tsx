"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Features", href: "/#features" },
  { label: "About", href: "/about" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F5F3]/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 h-16 md:h-20">
          <Link
            href="/"
            className="text-[#0B0B0B] font-bold text-lg tracking-tight"
          >
            appointly<span className="mx-auto text-[#BDBDBD]">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href.startsWith("/#") && pathname === "/");

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[13px] tracking-wide uppercase transition-colors duration-200 ${
                    isActive
                      ? "text-[#0B0B0B]"
                      : "text-[#0B0B0B]/60 hover:text-[#0B0B0B]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/#contact"
              className="text-[13px] tracking-wide bg-[#0B0B0B] text-white px-5 py-2.5 rounded-lg hover:bg-white hover:text-[#0B0B0B] border border-[#0B0B0B] transition-all duration-150"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-[#0B0B0B] p-2"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 top-16 z-40 bg-[#F5F5F3] flex flex-col px-6 pt-8 gap-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMobile}
                className="text-left text-2xl font-medium text-[#0B0B0B] tracking-tight"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/#contact"
              onClick={closeMobile}
              className="mt-4 text-base bg-[#0B0B0B] text-white px-6 py-3.5 rounded-lg w-full hover:bg-white hover:text-[#0B0B0B] border border-[#0B0B0B] transition-all duration-150"
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
