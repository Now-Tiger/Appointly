"use client";

import { JSX } from "react";
import { motion, type Variants, type Transition } from "framer-motion";
import DotGrid from "./DotGrid";

const easeCurve: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const baseTransition: Transition = {
  duration: 0.45,
  ease: easeCurve,
};

const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
};

export default function CTASection(): JSX.Element {
  return (
    <section id="contact" className="relative bg-[#0B0B0B] overflow-hidden">
      <DotGrid dark fadeBottom />

      <div className="relative z-10 max-w-350 mx-auto px-6 md:px-12 py-24 md:py-40 text-center">
        <motion.h2
          variants={fadeUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-60px" }}
          transition={baseTransition}
          className="text-white font-bold tracking-[-0.04em] leading-[0.95] mb-6 font-soria"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        >
          Ready to simplify
          <br />
          your bookings?
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ ...baseTransition, delay: 0.1 }}
          className="text-white/40 text-sm md:text-[15px] leading-relaxed max-w-md mx-auto mb-10"
        >
          Join 500+ businesses already managing appointments through WhatsApp
          with Appointly.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ ...baseTransition, delay: 0.2 }}
        >
          <button className="bg-white text-[#0B0B0B] px-8 py-4 rounded-lg text-[14px] font-medium tracking-wide hover:bg-[#0B0B0B] hover:text-white border border-white transition-all duration-150">
            Get Started — It&apos;s Free
          </button>
        </motion.div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
    </section>
  );
}
