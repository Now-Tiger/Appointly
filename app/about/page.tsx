"use client";

import { motion, type Transition } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Check } from "lucide-react";
import Image from "next/image";
import DotGrid from "@/components/landing/DotGrid";

const SUPABASE_STORAGE = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;

const office = `${SUPABASE_STORAGE}/officephoto.png`;
const salon = `${SUPABASE_STORAGE}/salonphoto.png`;
const domestic = `${SUPABASE_STORAGE}/domesticLife.jpg`;

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

export default function About() {
  const benefits = [
    "No more missed appointments",
    "Reduce no-shows by 80%",
    "Save 10+ hours per week",
    "Increase revenue by 25%",
    "24/7 automated booking",
    "WhatsApp-native experience",
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-10 px-6 overflow-hidden md:pt-50 lg:pb-40">
        {/* Background DotGrid */}
        <div className="absolute inset-0 pointer-events-none">
          <DotGrid interactive fadeBottom />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <div className="inline-block mb-6"></div>
            <h1
              className="text-[#0B0B0B] font-bold leading-[0.92] tracking-[-0.04em] font-soria pb-1"
              style={{ fontSize: "clamp(4rem, 8vw, 6rem)" }}
            >
              Why Appointly?
            </h1>
            <p className="text-lg md:text-xl text-[#0B0B0B]/50 max-w-xl mx-auto leading-relaxed">
              Your customers already use WhatsApp. Meet them where they are.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          >
            {[
              { number: "10k+", label: "Active Businesses" },
              { number: "80%", label: "Fewer No-Shows" },
              { number: "10hrs", label: "Saved Per Week" },
              { number: "24/7", label: "Availability" },
            ].map((stat, i) => (
              <div key={i} className="border border-[#0B0B0B]/10 p-6 bg-white">
                <div className="text-3xl md:text-4xl font-bold text-[#0B0B0B] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-[#0B0B0B]/50 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white pb-10">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[11px] tracking-widest uppercase text-[#0B0B0B]/40 mb-4">
              Simple. Powerful. Effective.
            </p>
            <h2
              className="text-[#0B0B0B] font-bold leading-[0.92] tracking-[-0.04em] font-soria"
              style={{ fontSize: "clamp(4rem, 8vw, 5rem)" }}
            >
              How It Works
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
              <div className="space-y-8">
                <div className="border-l-2 border-[#0B0B0B] pl-6">
                  <div className="text-[11px] tracking-widest uppercase text-[#0B0B0B]/40 mb-2">
                    Step 01
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B0B0B] mb-3">
                    Connect Your WhatsApp
                  </h3>
                  <p className="text-[#0B0B0B]/60 leading-relaxed">
                    Link your business WhatsApp number to Appointly in under 2
                    minutes. No technical knowledge required.
                  </p>
                </div>

                <div className="border-l-2 border-[#0B0B0B] pl-6">
                  <div className="text-[11px] tracking-widest uppercase text-[#0B0B0B]/40 mb-2">
                    Step 02
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B0B0B] mb-3">
                    Set Your Availability
                  </h3>
                  <p className="text-[#0B0B0B]/60 leading-relaxed">
                    Define your working hours, services, and booking rules.
                    Appointly handles the rest automatically.
                  </p>
                </div>

                <div className="border-l-2 border-[#0B0B0B] pl-6">
                  <div className="text-[11px] tracking-widest uppercase text-[#0B0B0B]/40 mb-2">
                    Step 03
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B0B0B] mb-3">
                    Customers Book Instantly
                  </h3>
                  <p className="text-[#0B0B0B]/60 leading-relaxed">
                    Your customers chat with you on WhatsApp as usual, and can
                    book, reschedule, or cancel appointments instantly.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ delay: 0.2 }}
              className="relative w-full h-75 md:h-125 lg:h-162"
            >
              <Image
                src={office}
                alt="How it works"
                fill
                unoptimized
                className="object-cover rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 bg-[#F5F5F0] md:pt-40 lg:pb-40">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2
              className="text-[#0B0B0B] font-bold leading-[0.92] tracking-[-0.04em] font-soria"
              style={{ fontSize: "clamp(4rem, 8vw, 5rem)" }}
            >
              Perfect For Every Business
            </h2>
            <p className="text-[#0B0B0B]/60 max-w-2xl mx-auto">
              From salons to clinics, Appointly adapts to your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="bg-white border border-[#0B0B0B]/10 overflow-hidden group hover:shadow-xl transition-shadow duration-300 rounded-lg"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={salon}
                  alt="Salons & Spas"
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0B0B0B] mb-2">
                  Salons & Spas
                </h3>
                <p className="text-[#0B0B0B]/60 text-sm">
                  Manage haircuts, treatments, and wellness appointments with
                  ease. Reduce no-shows and keep your chairs filled.
                </p>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ delay: 0.2 }}
              className="bg-white border border-[#0B0B0B]/10 overflow-hidden group hover:shadow-xl transition-shadow duration-300 rounded-lg"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={office}
                  alt="Clinics & Healthcare"
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0B0B0B] mb-2">
                  Clinics & Healthcare
                </h3>
                <p className="text-[#0B0B0B]/60 text-sm">
                  Schedule patient appointments, send reminders, and reduce wait
                  times. HIPAA-compliant and secure.
                </p>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ delay: 0.3 }}
              className="bg-white border border-[#0B0B0B]/10 overflow-hidden group hover:shadow-xl transition-shadow duration-300 rounded-lg"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={domestic}
                  alt="Services & Consultations"
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0B0B0B] mb-2">
                  Services & Consultations
                </h3>
                <p className="text-[#0B0B0B]/60 text-sm">
                  Perfect for coaches, consultants, and service providers.
                  Automate scheduling and focus on what matters.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-[#0B0B0B] text-white md:pt-30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <p className="text-[11px] tracking-widest uppercase text-white/40 mb-4">
                Why Choose Us
              </p>
              <h2
                className="text-white font-bold leading-[0.92] tracking-[-0.04em] font-soria"
                style={{ fontSize: "clamp(4rem, 8vw, 5rem)" }}
              >
                Built for businesses that value their time
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                Appointly isn&apos;t just another booking tool. It&apos;s a
                complete appointment management system that lives where your
                customers already are.
              </p>

              <div className="grid grid-cols-1 gap-3">
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 border border-white/20 flex items-center justify-center shrink-0">
                      <Check size={14} className="text-[#4A7C59]" />
                    </div>
                    <span className="text-white/80">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="border border-white/10 p-8 hover:border-white/20 transition-colors">
                <div className="text-5xl font-bold mb-2">2min</div>
                <div className="text-sm text-white/60">Average setup time</div>
              </div>
              <div className="border border-white/10 p-8 hover:border-white/20 transition-colors">
                <div className="text-5xl font-bold mb-2">99.9%</div>
                <div className="text-sm text-white/60">Uptime guarantee</div>
              </div>
              <div className="border border-white/10 p-8 hover:border-white/20 transition-colors">
                <div className="text-5xl font-bold mb-2">4.9★</div>
                <div className="text-sm text-white/60">
                  Average customer rating
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
