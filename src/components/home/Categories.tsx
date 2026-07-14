"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {FiMonitor, FiCpu } from "react-icons/fi";
import { BsFillLaptopFill } from "react-icons/bs";
import { BiMobile } from "react-icons/bi";

const categories = [
  { name: "Laptops", count: "142 Items", icon: BsFillLaptopFill, href: "/explore?category=Laptops", color: "from-indigo-500 to-indigo-600" },
  { name: "Monitors", count: "89 Items", icon: FiMonitor, href: "/explore?category=Monitors", color: "from-teal-500 to-teal-600" },
  { name: "Accessories", count: "214 Items", icon: FiCpu, href: "/explore?category=Accessories", color: "from-slate-800 to-slate-900" },
  { name: "Mobile", count: "65 Items", icon: BiMobile, href: "/explore?category=Audio", color: "from-blue-500 to-blue-600" },
];

export default function Categories() {
  return (
    <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Browse by Hardware Category
            </h2>
            <p className="mt-2 text-base text-slate-500 font-medium">
              Find exactly what your setup needs from our carefully sorted catalog.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-slate-50 rounded-2xl p-5 border border-slate-200/60 relative overflow-hidden group"
            >
              <div className="flex flex-col h-full justify-between relative z-10">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 w-fit text-slate-800 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <cat.icon className="w-6 h-6" />
                </div>
                <div className="mt-8">
                  <h3 className="font-bold text-slate-900 text-lg">{cat.name}</h3>
                  <p className="text-xs text-slate-400 font-bold mt-0.5">{cat.count}</p>
                </div>
              </div>
              <Link href={cat.href} className="absolute inset-0 z-20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}