"use client";

import { motion } from "framer-motion";
import { FiTrendingUp, FiTrendingDown, FiActivity } from "react-icons/fi";

const insights = [
  { device: "M1/M2 MacBooks", demand: "High Demand", resale: "85% Value Retained", status: "up" },
  { device: "4K IPS Monitors", demand: "Steady", resale: "70% Value Retained", status: "steady" },
  { device: "Mechanical Keyboards", demand: "High Demand", resale: "75% Value Retained", status: "up" },
  { device: "DDR4/DDR5 RAM Sticks", demand: "High Supply", resale: "50% Value Retained", status: "down" },
];

export default function TrendingInsights() {
  return (
    <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
            Market Analytics
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mt-3">
            Trending Hardware Insights
          </h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            Real-time value retention stats to help you price your gear or buy smartly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {insights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">{item.device}</h3>
                  {item.status === "up" && <FiTrendingUp className="text-teal-500 w-5 h-5" />}
                  {item.status === "steady" && <FiActivity className="text-indigo-500 w-5 h-5" />}
                  {item.status === "down" && <FiTrendingDown className="text-rose-500 w-5 h-5" />}
                </div>
                <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded mt-2 ${
                  item.status === "up" ? "bg-teal-50 text-teal-700 border border-teal-100" :
                  item.status === "steady" ? "bg-indigo-50 text-indigo-700 border border-indigo-100" :
                  "bg-rose-50 text-rose-700 border border-rose-100"
                }`}>
                  {item.demand}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 mt-6 pt-3 border-t border-slate-200/60">
                {item.resale}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}