"use client";

import { motion } from "framer-motion";
import { FiUserCheck, FiTag, FiMessageSquare } from "react-icons/fi";

const features = [
  {
    icon: FiUserCheck,
    title: "Verified Users Only",
    desc: "Every account is securely authenticated. Trade directly with genuine tech enthusiasts from your community without worrying about spammers.",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: FiTag,
    title: "Best Value Prices",
    desc: "Get access to high-end configurations, custom mechanical keyboards, and color-accurate monitors at a fraction of their retail price.",
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: FiMessageSquare,
    title: "Fast P2P Communication",
    desc: "Connect directly with sellers instantly. Clear your queries regarding device conditions, usage history, or pick-up coordinates smoothly.",
    color: "bg-slate-100 text-slate-800",
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-slate-50 border-y border-slate-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Why Choose ReTech
          </h2>
          <p className="mt-3 text-lg text-slate-500 font-medium">
            A specialized secondary marketplace engineered specifically for computer hardware, peripherals, and clean gadgets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`p-3.5 rounded-xl w-fit ${item.color} mb-4`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-500 font-medium leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}