"use client";

import { useEffect } from "react";
import { FiRefreshCw, FiAlertTriangle, FiHome } from "react-icons/fi";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime client-side crash occurred:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center mt-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        
        {/* Warning Icon Wrap */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-amber-50 border border-amber-100 text-amber-500">
          <FiAlertTriangle className="h-10 w-10 animate-pulse" />
        </div>

        {/* Text Area */}
        <div className="space-y-2">
          <span className="text-sm font-extrabold text-amber-600 uppercase tracking-widest block">
            Application Error
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Something Went Wrong
          </h1>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Our server encountered an unexpected glitch while fetching this page. Try recovering the context or refresh.
          </p>
        </div>

        {/* Optional Error Log (For Dev inspection) */}
        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl max-h-[100px] overflow-y-auto text-left">
          <code className="text-[10px] text-slate-400 font-mono break-all leading-normal">
            {error.message || "Unknown Runtime Failure context."}
          </code>
        </div>

        <hr className="border-slate-100" />

        {/* Actions Button Stack */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <button
            onClick={() => reset()} 
            className="btn bg-amber-500 hover:bg-amber-600 text-white border-none rounded-xl px-5 h-11 min-h-0 text-xs font-bold uppercase tracking-wider shadow-xs transition-all w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <FiRefreshCw className="w-3.5 h-3.5" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="btn bg-slate-900 hover:bg-slate-800 text-white border-none rounded-xl px-5 h-11 min-h-0 text-xs font-bold uppercase tracking-wider transition-all w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <FiHome className="w-3.5 h-3.5" />
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}