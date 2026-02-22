"use client";

import React from "react";
import { motion, Transition } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Connect your WhatsApp",
    description:
      "Link your business WhatsApp number in under 2 minutes. No technical setup required.",
  },
  {
    number: "02",
    title: "Set your availability",
    description:
      "Define working hours, slot durations, and buffer times. The system handles the rest.",
  },
  {
    number: "03",
    title: "Customers book via chat",
    description:
      "Customers message your WhatsApp and book instantly through a guided conversation flow.",
  },
  {
    number: "04",
    title: "Manage from dashboard",
    description:
      "View, confirm, reschedule, or cancel — all from one clean, structured interface.",
  },
];

const easeCurve: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const baseTransition: Transition = { duration: 0.45, ease: easeCurve };

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: baseTransition,
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#F5F5F3] relative">
      <div className="max-w-350 mx-auto px-6 md:px-12 py-20 md:py-32">
        <motion.div {...fadeUp} className="mb-16 md:mb-24">
          <p className="text-[12px] tracking-widest uppercase text-[#0B0B0B]/40 mb-4">
            How it works
          </p>
          <h2
            className="text-[#0B0B0B] font-bold tracking-[-0.03em] leading-[1.05] max-w-xl font-soria"
            style={{ fontSize: "clamp(2rem, 6vw, 5rem" }}
          >
            Four steps.
            <br />
            <span className="text-[#BDBDBD]">Zero complexity.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className="border-t border-[#0B0B0B]/10 pt-8 pb-10 md:pr-8"
            >
              <span
                className="block font-bold text-[#0B0B0B]/6 tracking-[-0.04em] mb-4"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
              >
                {step.number}
              </span>
              <h3 className="text-[#0B0B0B] font-semibold text-base md:text-lg tracking-tight mb-3">
                {step.title}
              </h3>
              <p className="text-[#0B0B0B]/45 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#0B0B0B]/10" />
    </section>
  );
}
