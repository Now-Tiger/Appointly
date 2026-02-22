"use client";

import { motion, type Variants, type Transition } from "framer-motion";
import {
  MessageSquare,
  Calendar,
  Bell,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { JSX } from "react";

type Feature = {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: MessageSquare,
    label: "01",
    title: "WhatsApp Booking",
    description:
      "Customers book appointments through WhatsApp — the channel they already use daily. No app downloads, no friction.",
  },
  {
    icon: Calendar,
    label: "02",
    title: "Smart Scheduling",
    description:
      "Set your availability, define time slots, and let the system handle conflicts. Your calendar stays clean and accurate.",
  },
  {
    icon: Bell,
    label: "03",
    title: "Automated Reminders",
    description:
      "Reduce no-shows by 60%. Automatic WhatsApp reminders sent at the right time, every time.",
  },
  {
    icon: BarChart3,
    label: "04",
    title: "Business Insights",
    description:
      "Track bookings, peak hours, and customer patterns. Make data-driven decisions with clean, minimal analytics.",
  },
];

const easeCurve: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const baseTransition: Transition = {
  duration: 0.45,
  ease: easeCurve,
};

const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
};

export default function FeaturesSection(): JSX.Element {
  return (
    <section id="features" className="bg-[#F5F5F3] relative">
      <div className="max-w-350 mx-auto px-6 md:px-12 py-20 md:py-32">
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-60px" }}
          transition={baseTransition}
          className="mb-16 md:mb-24"
        >
          <p className="text-[12px] tracking-widest uppercase text-[#0B0B0B]/40 mb-4">
            Features
          </p>

          <h2
            className="text-[#0B0B0B] font-bold tracking-[-0.03em] leading-[1.05] max-w-2xl font-soria"
            style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
          >
            Everything you need.
            <br />
            <span className="text-[#BDBDBD]">Nothing you don&apos;t.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {features.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.label}
                variants={fadeUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  ...baseTransition,
                  delay: i * 0.08,
                }}
                className="border-t border-[#0B0B0B]/10 py-10 md:py-14 md:pr-16 group"
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-10 h-10 rounded-lg border border-[#0B0B0B]/10 flex items-center justify-center group-hover:bg-[#0B0B0B] group-hover:border-[#0B0B0B] transition-all duration-200">
                    <Icon
                      size={18}
                      className="text-[#0B0B0B]/40 group-hover:text-white transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] tracking-widest uppercase text-[#BDBDBD] block mb-2">
                      {feature.label}
                    </span>

                    <h3 className="text-[#0B0B0B] font-semibold text-lg md:text-xl tracking-tight mb-3">
                      {feature.title}
                    </h3>

                    <p className="text-[#0B0B0B]/45 text-sm leading-relaxed max-w-md">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
