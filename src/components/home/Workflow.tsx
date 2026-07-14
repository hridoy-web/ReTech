"use client";

import { motion } from "framer-motion";
import { FiUpload, FiMessageCircle, FiCheckSquare } from "react-icons/fi";

const steps = [
  {
    icon: FiUpload,
    step: "01",
    title: "List Your Hardware",
    desc: "Take clean photos of your gadget, define its exact working condition, specify a fair price, and publish it securely.",
  },
  {
    icon: FiMessageCircle,
    step: "02",
    title: "Connect with Buyers",
    desc: "Receive authentic, authenticated context queries from verified tech enthusiasts inside your campus or tech community.",
  },
  {
    icon: FiCheckSquare,
    step: "03",
    title: "Complete the Deal",
    desc: "Coordinate a mutually convenient, safe pickup location, verify the hardware specs live, and finalize your trade with absolute peace of mind.",
  },
];

export default function Workflow() {
  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200/50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-100">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mt-3">
            How ReTech Works For You
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500 font-medium">
            We cut out the middlemen and retail inflation to deliver a straightforward trading cycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line for desktop layouts */}
          <div className="hidden md:block absolute top-1/4 left-[15%] right-[15%] h-[1px] bg-slate-200 -z-0" />

          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative bg-white border border-slate-200/80 rounded-2xl p-6 text-center shadow-sm z-10 group hover:border-indigo-500/30 transition-colors"
            >
              {/* Step Badge */}
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-teal-400 text-[10px] font-black tracking-widest px-2.5 py-0.5 rounded-full border border-slate-800">
                STEP {item.step}
              </span>

              {/* Icon Container */}
              <div className="mx-auto p-4 bg-slate-50 text-slate-700 rounded-2xl w-fit group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 mt-2">
                <item.icon className="w-6 h-6" />
              </div>

              <h3 className="text-base font-extrabold text-slate-900 mt-5">{item.title}</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}