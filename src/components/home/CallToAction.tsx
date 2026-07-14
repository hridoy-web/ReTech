"use client";

import Link from "next/link";
import { FiPlusCircle, FiArrowRight } from "react-icons/fi";

export default function CallToAction() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white p-8 sm:p-12 md:p-16 shadow-2xl overflow-hidden border border-slate-800">
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-md">
              Clear Your Desk Space
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.15]">
              Have Unused Gadgets Lying Around? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">
                Turn Them Into Cash Today.
              </span>
            </h2>
            
            <p className="text-sm sm:text-base text-slate-400 max-w-xl font-medium leading-relaxed">
              Dont let your old mechanical keyboards, spare monitors, or upgraded laptops gather dust. List them on ReTech in under 24 hours and connect with authentic buyers directly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/items/add" 
                className="inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold text-slate-950 bg-white hover:bg-slate-50 rounded-xl transition-all active:scale-[0.98] shadow-lg cursor-pointer"
              >
                <FiPlusCircle className="w-4 h-4 text-indigo-600" />
                <span>Post Your Item Now</span>
              </Link>
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 rounded-xl transition-all cursor-pointer"
              >
                <span>See How It Works</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}