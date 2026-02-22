"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import DotGrid from "./DotGrid";

export default function HeroSection() {
  const scrollToFeatures = () => {
    const el = document.querySelector("#features");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen bg-[#F5F5F3] flex flex-col justify-center overflow-hidden">
      <DotGrid interactive fadeBottom />

      <div className="relative z-10 max-w-350 mx-auto w-full px-6 md:px-12 pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-end">
          {/* Headline */}
          <motion.div
            className="md:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1
              className="text-[#0B0B0B] font-bold leading-[0.92] tracking-[-0.04em] font-soria"
              style={{ fontSize: "clamp(4rem, 12vw, 8rem)" }}
            >
              Appointments.
              <br />
              <span className="text-[#BDBDBD]">Handled.</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            className="md:col-span-4 md:pb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.15,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <p className="text-[#0B0B0B]/50 text-sm md:text-[15px] leading-relaxed max-w-sm">
              Your customers book via WhatsApp. You manage everything from one
              clean dashboard. No apps to download. No friction.
            </p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-16 md:mt-24 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-600/90" />
            <span className="text-[12px] tracking-wide uppercase text-[#0B0B0B]/40">
              Available for businesses
            </span>
          </div>

          <button
            onClick={scrollToFeatures}
            className="hidden md:flex items-center gap-2 text-[12px] tracking-wide uppercase text-[#0B0B0B]/40 hover:text-[#0B0B0B] transition-colors duration-200"
          >
            Scroll to explore
            <ArrowDown size={14} />
          </button>
        </motion.div>
      </div>

      {/* Thin bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#0B0B0B]/10" />
    </section>
  );
}
