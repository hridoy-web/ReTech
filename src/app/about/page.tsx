"use client";

import Link from "next/link";
import { FiCheckCircle, FiShield, FiTrendingUp, FiUsers, FiArrowRight } from "react-icons/fi";

export default function AboutPage() {
  // Statistics data 
  const stats = [
    { label: "Gadgets Circulated", value: "500+" },
    { label: "Happy Geeks", value: "1,200+" },
    { label: "Carbon Saved (kg)", value: "2,500+" },
    { label: "Safe Transactions", value: "100%" },
  ];

  // section data
  const coreValues = [
    {
      icon: <FiShield className="w-6 h-6 text-brand-primary" />,
      title: "Absolute Trust & Security",
      desc: "Every listing goes through standardized criteria fields to ensure transparent specifications before it reaches buyers.",
    },
    {
      icon: <FiTrendingUp className="w-6 h-6 text-emerald-500" />,
      title: "Sustainable Tech Lifecycle",
      desc: "We minimize e-waste by keeping pre-owned laptops, monitors, components, and audio gear in smart circulation.",
    },
    {
      icon: <FiUsers className="w-6 h-6 text-indigo-500" />,
      title: "Built for Technologists",
      desc: "Made by geeks, for geeks. We provide a tailored marketplace experience specifically optimized for buying and selling hardware.",
    },
  ];

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Hero Headline Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wider">
            Our Mission
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-brand-dark mt-4 leading-tight">
            Empowering the Community with <span className="text-brand-primary">Sustainable Tech</span>
          </h1>
          <p className="text-base font-medium text-slate-500 mt-4 leading-relaxed">
            ReTech is a dedicated peer-to-peer marketplace built to extend the lifecycle of premium tech gadgets. We bridge the gap between hardware enthusiasts looking to upgrade and buyers looking for high-quality, verified hardware at affordable prices.
          </p>
        </div>

        {/* Dynamic Statistics Grid Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-200/80 rounded-2xl p-6 text-center shadow-xs hover:border-brand-primary/30 transition-colors"
            >
              <div className="text-3xl font-black text-brand-dark">{stat.value}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Core Vision Breakdown Story Block */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs grid md:grid-cols-2 gap-8 items-center mb-20">
          <div>
            <h2 className="text-2xl font-black text-brand-dark tracking-tight">
              Why We Created ReTech?
            </h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed mt-4">
              As developers and tech enthusiasts, we realized how quickly perfectly functional hardware sits unused in closets after upgrades. Buying second-hand gear online often comes with high friction, uncertain item conditions, and unorganized listings.
            </p>
            <p className="text-sm text-slate-500 font-medium leading-relaxed mt-3">
              ReTech solves this by providing an organized layout structure, clear device validation metrics (Like New, Excellent, Good, Fair), and direct verification, making hardware circulation frictionless.
            </p>
            
            <div className="mt-6 space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                <FiCheckCircle className="text-emerald-500 w-4 h-4 flex-shrink-0" />
                <span>Structured item specification tables</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                <FiCheckCircle className="text-emerald-500 w-4 h-4 flex-shrink-0" />
                <span>Verified seller control panels</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                <FiCheckCircle className="text-emerald-500 w-4 h-4 flex-shrink-0" />
                <span>Zero bloated filler advertisements</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-2xl space-y-6">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-200 pb-2">
              Platform Standards
            </h3>
            {coreValues.map((value, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-xs flex-shrink-0">
                  {value.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{value.title}</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Call to Action Section */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-brand-dark text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-md">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_45%)]"></div>
          
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight relative z-10">
            Ready to upgrade your custom setup sustainably?
          </h2>
          <p className="text-sm text-slate-300 font-medium max-w-md mx-auto mt-2 relative z-10">
            Join thousands of happy geeks listing components daily. Browse premium pre-owned hardware today.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center relative z-10">
            <Link
              href="/explore"
              className="btn bg-brand-primary hover:opacity-90 text-white border-none rounded-xl px-6 h-11 min-h-0 text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              Explore Gadgets
              <FiArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/items/add"
              className="btn btn-outline border-slate-700 hover:bg-white/10 text-white rounded-xl px-6 h-11 min-h-0 text-xs font-bold uppercase tracking-wider transition-all"
            >
              Sell Your Gear
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}