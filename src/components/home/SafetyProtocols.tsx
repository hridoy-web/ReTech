"use client";

import { motion } from "framer-motion";
import { FiLock, FiEye, FiAlertTriangle } from "react-icons/fi";

const protocols = [
  {
    icon: FiLock,
    title: "Secure Authentication",
    desc: "We utilize robust login states ensuring every developer or student managing inventory is tied to a verified profile.",
    iconColor: "text-indigo-650 bg-indigo-50",
  },
  {
    icon: FiEye,
    title: "Live Hardware Testing",
    desc: "We strongly recommend meeting at safe public tech hubs or campus zones to benchtest components before completing trades.",
    iconColor: "text-teal-650 bg-teal-50",
  },
  {
    icon: FiAlertTriangle,
    title: "No Advance Payments",
    desc: "ReTech never asks for upfront dynamic processing fees. Always complete transactions directly face-to-face.",
    iconColor: "text-amber-600 bg-amber-50",
  },
];

export default function SafetyProtocols() {
  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200/50 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Light soft ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-md">
            Standards
          </span>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl mt-3 text-slate-900">
            Our Peer Safety Protocols
          </h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            Engineered to sustain a scam-free open hardware marketplace for all tech enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {protocols.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors"
            >
              <div className="p-3 bg-slate-800 rounded-xl text-teal-400 w-fit mb-4">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-100 text-base sm:text-lg">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed font-medium">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}