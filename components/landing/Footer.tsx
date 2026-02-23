"use client";

import Link from "next/link";

const footerLinks = {
  Product: ["Features", "Pricing", "About", "Changelog"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Legal: ["Privacy", "Terms", "Security"],
};

// const footerItemsWithLinks = [
//   { category: "Product", label: "Features", page: "/#features" },
//   { category: "Product", label: "Pricing", page: "/#pricing" },
//   { category: "Product", label: "Integrations", page: "/" },
// 
//   { category: "Company", label: "About", page: "/about" },
//   { category: "Company", label: "Blog", page: "/" },
//   { category: "Company", label: "Careers", page: "/" },
//   { category: "Company", label: "Contact", page: "/" },
// 
//   { category: "Legal", label: "Privacy", page: "/" },
//   { category: "Legal", label: "Terms", page: "/" },
//   { category: "Legal", label: "Security", page: "/" },
// ];

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0B] border-t border-white/10">
      <div className="max-w-350 mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-4 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <a href="#" className="text-white font-bold text-lg tracking-tight">
              appointly<span className="text-white/20">.</span>
            </a>
            <p className="text-white/50 text-sm leading-relaxed mt-4 max-w-xs">
              Appointment scheduling for modern businesses. Powered by WhatsApp.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="md:col-span-2 md:col-start-auto">
              <p className="text-[11px] tracking-widest uppercase text-white/30 mb-4">
                {category}
              </p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href={link.toLowerCase()}
                      className="text-white/50 text-sm hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-[12px] tracking-wide">
            © 2026 Appointly. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-white/50 text-[12px] tracking-wide">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
