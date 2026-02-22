"use client";

import { motion, type Transition } from "framer-motion";
import DotGrid from "./DotGrid";

const easeCurve: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const baseTransition: Transition = {
  duration: 0.45,
  ease: easeCurve,
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: baseTransition,
};

export default function DarkManifesto() {
  return (
    <section className="relative bg-[#0B0B0B] overflow-hidden">
      <DotGrid dark />

      <div className="relative z-10 max-w-350 mx-auto px-6 md:px-12 py-24 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Left statement */}
          <motion.div {...fadeUp} className="md:col-span-6">
            <h2
              className="text-white font-bold tracking-[-0.03em] leading-[1.05] font-soria"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
            >
              We believe in the power of reduction.
            </h2>
            <div className="w-12 h-px bg-white/20 mt-8 mb-4" />
            <p className="text-[11px] tracking-widest uppercase text-white/30">
              Manifesto 01
            </p>
          </motion.div>

          {/* Right description */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="md:col-span-5 md:col-start-8"
          >
            <p className="text-white/50 text-sm md:text-[15px] leading-relaxed mb-12">
              Stripping away the non-essential to reveal the core of your
              business workflow. Appointly is rooted in clarity, precision, and
              respect for your time. No clutter. No noise. Just what works.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-[11px] tracking-widest uppercase text-white/30 mb-4">
                  Built for
                </p>
                <ul className="space-y-2.5">
                  {["Clinics", "Salons", "Gyms", "Consultants"].map((item) => (
                    <li
                      key={item}
                      className="text-white/70 text-sm flex items-center gap-2"
                    >
                      <span className="text-white/20">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] tracking-widest uppercase text-white/30 mb-4">
                  Trusted by
                </p>
                <ul className="space-y-2.5">
                  {[
                    "500+ businesses",
                    "12 countries",
                    "50K bookings",
                    "99.9% uptime",
                  ].map((item) => (
                    <li
                      key={item}
                      className="text-white/70 text-sm flex items-center gap-2"
                    >
                      <span className="text-white/20">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Thin top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
    </section>
  );
}
