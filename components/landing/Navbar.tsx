"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Dashboard", href: "/dashboard", isPage: true },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F5F3]/90 backdrop-blur-sm">
        <div className="max-w-350 mx-auto flex items-center justify-between px-6 md:px-12 h-16 md:h-20">
          <a
            href="#"
            className="text-[#0B0B0B] font-bold text-lg tracking-tight"
          >
            appointly<span className="text-[#BDBDBD]">.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) =>
              link.isPage ? (
                <Link
                  key={link.label}
                  href={"/dashboard"}
                  className="text-[13px] tracking-wide uppercase text-[#0B0B0B]/60 hover:text-[#0B0B0B] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-[13px] tracking-wide uppercase text-[#0B0B0B]/60 hover:text-[#0B0B0B] transition-colors duration-200"
                >
                  {link.label}
                </button>
              ),
            )}
            <button
              onClick={() => scrollTo("#contact")}
              className="text-[13px] tracking-wide bg-[#0B0B0B] text-white px-5 py-2.5 rounded-lg hover:bg-white hover:text-[#0B0B0B] border border-[#0B0B0B] transition-all duration-150"
            >
              Get Started
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#0B0B0B] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 top-16 z-40 bg-[#F5F5F3] flex flex-col px-6 pt-8 gap-6"
          >
            {navLinks.map((link) =>
              link.isPage ? (
                <Link
                  key={link.label}
                  href={"/dashboard"}
                  onClick={() => setMobileOpen(false)}
                  className="text-left text-2xl font-medium text-[#0B0B0B] tracking-tight"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-2xl font-medium text-[#0B0B0B] tracking-tight"
                >
                  {link.label}
                </button>
              ),
            )}
            <button
              onClick={() => scrollTo("#contact")}
              className="mt-4 text-base bg-[#0B0B0B] text-white px-6 py-3.5 rounded-lg w-full hover:bg-white hover:text-[#0B0B0B] border border-[#0B0B0B] transition-all duration-150"
            >
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
