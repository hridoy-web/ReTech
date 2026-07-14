"use client";

import { FiStar } from "react-icons/fi";

export default function TrustSection() {
  return (
    <section className="py-16 bg-white px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Grid: Platform Statistics */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-6 bg-slate-900 rounded-3xl p-8 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          <div>
            <p className="text-3xl sm:text-4xl font-black text-teal-400">500+</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Gadgets Exchanged</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-indigo-400">1,200+</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Happy Geeks</p>
          </div>
          <div className="pt-4 border-t border-slate-800 col-span-2">
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              We track transactions across key university areas to help build the most efficient environment for zero-waste electronics distribution.
            </p>
          </div>
        </div>

        {/* Right Grid: Core Testimonials */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl relative">
            <div className="flex gap-1 text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => <FiStar key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-slate-600 text-sm font-medium italic leading-relaxed">
              Managed to purchase an authentic mechanical keyboard from a senior developer through ReTech. The internal direct query check worked flawlessly, saving me both budget and shipping overheads!
            </p>
            <p className="text-xs font-bold text-slate-900 mt-3">— Tanvir Rahman, Student</p>
          </div>

          <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl relative">
            <div className="flex gap-1 text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => <FiStar key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-slate-600 text-sm font-medium italic leading-relaxed">
              Listing my old monitor was a breeze. I uploaded the images, specified my condition details, and found a clean verified buyer within 48 hours without deal spammers.
            </p>
            <p className="text-xs font-bold text-slate-900 mt-3">— Adnan Sami, Web Developer</p>
          </div>
        </div>

      </div>
    </section>
  );
}