"use client";

import React, { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend, FiMessageSquare } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent successfully! Our team will contact you soon.", {
        style: {
          borderRadius: "12px",
          background: "#1e293b",
          color: "#fff",
          fontSize: "14px",
        },
      });
      // Reset form
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark py-16 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="max-w-5xl mx-auto">
        {/* Header Title Grid */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wider">
            Get In Touch
          </span>
          <h1 className="text-4xl font-black tracking-tight text-brand-dark mt-4">
            Connect With <span className="text-brand-primary">ReTech Support</span>
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-3 leading-relaxed">
            Have questions about buying a pre-owned laptop, updating your listing details, or managing account permissions? Reach out to us anytime!
          </p>
        </div>

        {/* Main Interface Split Layout */}
        <div className="grid md:grid-cols-5 gap-8 items-stretch">
          
          {/* Left Column: Direct Office Contact Details */}
          <div className="md:col-span-2 bg-gradient-to-br from-slate-900 via-slate-800 to-brand-dark text-white rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-md">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.1),transparent_40%)]"></div>
            
            <div className="relative z-10">
              <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
                <FiMessageSquare className="text-brand-primary text-xl" />
                Contact Info
              </h2>
              <p className="text-xs text-slate-300 font-medium mt-2 leading-relaxed">
                Feel free to ping us. Our support crew usually responds within 2-4 business hours to verify tech disputes.
              </p>

              {/* Contact Icons Stack */}
              <div className="mt-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-xl border border-white/5 shadow-xs">
                    <FiMail className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Email Us</div>
                    <a href="mailto:support@retech.com" className="text-sm font-semibold text-slate-100 hover:text-brand-primary transition-colors">
                      support@retech.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-xl border border-white/5 shadow-xs">
                    <FiPhone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Call Support</div>
                    <span className="text-sm font-semibold text-slate-100">+880 1712-345678</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-xl border border-white/5 shadow-xs">
                    <FiMapPin className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">HQ Location</div>
                    <span className="text-sm font-semibold text-slate-100">Agrabad C/A, Chittagong, BD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Tagline Bottom */}
            <div className="mt-12 border-t border-slate-700/60 pt-4 relative z-10 text-[11px] font-medium text-slate-400">
              © {new Date().getFullYear()} ReTech.  All rights reserved!
            </div>
          </div>

          {/* Right Column: Interactive Support Form Block */}
          <div className="md:col-span-3 bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs">
            <h3 className="text-lg font-black text-brand-dark tracking-tight mb-6">
              Send an Instant Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name Input */}
                <div className="form-control w-full">
                  <label className="label py-1 text-xs font-bold text-slate-500 uppercase tracking-wide">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hridoy Rahman"
                    className="input input-bordered w-full rounded-xl bg-slate-50 border-slate-200 focus:outline-none focus:border-brand-primary text-sm font-medium h-11"
                  />
                </div>
                
                {/* Email Address Input */}
                <div className="form-control w-full">
                  <label className="label py-1 text-xs font-bold text-slate-500 uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="input input-bordered w-full rounded-xl bg-slate-50 border-slate-200 focus:outline-none focus:border-brand-primary text-sm font-medium h-11"
                  />
                </div>
              </div>

              {/* Query Subject Dropdown Selector */}
              <div className="form-control w-full">
                <label className="label py-1 text-xs font-bold text-slate-500 uppercase tracking-wide">Inquiry Topic</label>
                <select className="select select-bordered w-full rounded-xl bg-slate-50 border-slate-200 focus:outline-none focus:border-brand-primary text-sm font-medium h-11 min-h-0">
                  <option defaultValue="listing">Issues creating a custom listing</option>
                  <option value="auth">Authentication & security errors</option>
                  <option value="report">Reporting a fake/fraudulent gadget listing</option>
                  <option value="other">General general feedback</option>
                </select>
              </div>

              {/* Message Details Field */}
              <div className="form-control w-full">
                <label className="label py-1 text-xs font-bold text-slate-500 uppercase tracking-wide">Detailed Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your query in full details..."
                  className="textarea textarea-bordered w-full rounded-xl bg-slate-50 border-slate-200 focus:outline-none focus:border-brand-primary text-sm font-medium p-3"
                ></textarea>
              </div>

              {/* Interactive Submit Layout Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn bg-brand-primary hover:opacity-90 disabled:bg-slate-300 text-white border-none rounded-xl px-6 h-11 min-h-0 text-xs font-bold uppercase tracking-wider transition-all w-full sm:w-auto flex items-center gap-2 shadow-xs"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FiSend className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}