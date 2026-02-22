"use client";

import { motion, type Transition } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "For solo professionals getting started.",
    features: [
      "Up to 30 bookings/month",
      "WhatsApp integration",
      "Basic dashboard",
      "Email reminders",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    description: "For growing businesses that need more.",
    features: [
      "Unlimited bookings",
      "WhatsApp + SMS reminders",
      "Analytics dashboard",
      "Team management",
      "Priority support",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$49",
    period: "/mo",
    description: "For multi-location operations.",
    features: [
      "Everything in Pro",
      "Multi-location support",
      "Custom branding",
      "API access",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

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

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-[#F5F5F3] relative">
      <div className="max-w-350 mx-auto px-6 md:px-12 py-20 md:py-32">
        <motion.div {...fadeUp} className="mb-16 md:mb-24 text-center">
          <p className="text-[12px] tracking-widest uppercase text-[#0B0B0B]/40 mb-4">
            Pricing
          </p>
          <h2
            className="text-[#0B0B0B] font-bold tracking-[-0.03em] leading-[1.05] font-soria"
            style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
          >
            Simple, honest pricing.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className={`border rounded-xl p-8 md:p-10 flex flex-col transition-all duration-200 ${
                plan.highlighted
                  ? "bg-[#0B0B0B] border-[#0B0B0B] text-white"
                  : "bg-white border-[#0B0B0B]/10 text-[#0B0B0B] hover:border-[#0B0B0B]/30"
              }`}
            >
              <p
                className={`text-[11px] tracking-widest uppercase mb-6 ${
                  plan.highlighted ? "text-white/40" : "text-[#0B0B0B]/40"
                }`}
              >
                {plan.name}
              </p>

              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-4xl md:text-5xl font-bold tracking-tight">
                  {plan.price}
                </span>
                {plan.period && (
                  <span
                    className={`text-sm ${
                      plan.highlighted ? "text-white/40" : "text-[#0B0B0B]/40"
                    }`}
                  >
                    {plan.period}
                  </span>
                )}
              </div>

              <p
                className={`text-sm mb-8 ${
                  plan.highlighted ? "text-white/50" : "text-[#0B0B0B]/45"
                }`}
              >
                {plan.description}
              </p>

              <ul className="space-y-3 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check
                      size={15}
                      className={`shrink-0 mt-0.5 ${
                        plan.highlighted ? "text-[#4A7C59]" : "text-[#4A7C59]"
                      }`}
                    />
                    <span
                      className={
                        plan.highlighted ? "text-white/70" : "text-[#0B0B0B]/60"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3.5 rounded-lg text-[13px] tracking-wide font-medium transition-all duration-150 ${
                  plan.highlighted
                    ? "bg-white text-[#0B0B0B] hover:bg-white/90"
                    : "bg-[#0B0B0B] text-white hover:bg-[#1A1A1A] border border-[#0B0B0B]"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
