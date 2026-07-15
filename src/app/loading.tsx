import React from "react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/10 backdrop-blur-md">
      {/* Premium Glassmorphic Card Container */}
      <div className="relative flex flex-col items-center gap-6 p-10 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-2xl max-w-xs text-center">
        
        {/* Sleek Dual-Ring Tech Spinner */}
        <div className="relative h-14 w-14">
          {/* Static Track Ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-slate-100"></div>
          
          {/* Active Gradient Spinner */}
          <div className="absolute inset-0 rounded-full border-[3px] border-indigo-600 border-t-transparent animate-spin"></div>
          
          {/* Glow Effect Background */}
          <div className="absolute inset-0 rounded-full bg-indigo-500/5 blur-md animate-pulse"></div>
          
          {/* Inner Core Dot */}
          <div className="absolute inset-4 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-ping"></span>
          </div>
        </div>
        
        {/* Professional Microcopy Area */}
        <div className="space-y-1.5">
          <h3 className="text-sm font-black text-slate-800 tracking-tight">
            Connecting to ReTech
          </h3>
          <p className="text-[10px] font-extrabold text-indigo-600/90 uppercase tracking-widest animate-pulse">
            Synchronizing Experience
          </p>
        </div>

        {/* Minimal Safe-Indicator Check */}
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Securing Connection</span>
        </div>
      </div>
    </div>
  );
}   