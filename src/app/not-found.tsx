"use client";

import Link from "next/link";
import { FiHome, FiAlertCircle, FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center mt-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        
        {/* Error Icon Wrap */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-rose-50 border border-rose-100 text-rose-500 animate-bounce">
          <FiAlertCircle className="h-10 w-10" />
        </div>

        {/* Text Area */}
        <div className="space-y-2">
          <span className="text-sm font-extrabold text-indigo-600 uppercase tracking-widest block">
            Error Code: 404
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Oops! The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <hr className="border-slate-100" />

        {/* Actions Button Stack */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <button 
            onClick={() => window.history.back()}
            className="btn btn-outline border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl px-5 h-11 min-h-0 text-xs font-bold uppercase tracking-wider transition-all w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <FiArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          
          <Link
            href="/"
            className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-xl px-5 h-11 min-h-0 text-xs font-bold uppercase tracking-wider shadow-xs transition-all w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <FiHome className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}