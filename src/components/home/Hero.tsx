"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiShoppingBag, FiShield, FiCheckCircle, FiCpu, FiStar } from "react-icons/fi";

const sliderImages = [
  "/images/holding-iphone-smile-face.jpg", 
  "/images/boy-holding-laptop-iphone.jpg", 
  "/images/buy-sell.jpg", 
  "/images/sell-gadget.jpg",
  "/images/boys-holding-iphone.jpg"
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-white font-sans overflow-hidden py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      {/* Ambient background blur elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Headline and CTAs */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100"
          >
            <FiShoppingBag className="text-indigo-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Sustainable Tech Marketplace
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]"
          >
            Upgrade Your Tech <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
              Sustainably & Affordably.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
          >
            Buy and sell certified pre-owned gadgets with absolute trust. 
            Turn your unused tech into cash or discover verified deals on premium 
            laptops, monitors, and gear from tech enthusiasts.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
          >
            <Link 
              href="/explore" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-teal-500 hover:brightness-110 active:scale-[0.98] rounded-xl transition-all shadow-md cursor-pointer"
            >
              <span>Explore Gadgets</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/items/add" 
              className="w-full sm:w-auto flex items-center justify-center py-3.5 px-6 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Sell Your Gear
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 max-w-md sm:max-w-xl mx-auto lg:mx-0"
          >
            <div className="flex items-center gap-2 text-slate-600">
              <FiCheckCircle className="text-indigo-600 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">Verified Gadgets</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <FiShield className="text-teal-500 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">Secure Transaction</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Middle Image Slider + Top & Bottom Floating Brand Cards */}
        <div className="lg:col-span-5 relative flex items-center justify-center w-full min-h-[400px] sm:min-h-[480px]">
          
          {/* 1. TOP FLOATING CARD (Brand Value Indicator) */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-0 left-2 sm:-left-6 z-20 bg-slate-900 text-white rounded-2xl shadow-xl p-3.5 max-w-[220px] sm:max-w-[240px] border border-slate-800 flex items-start gap-3"
          >
            <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400 shrink-0 mt-0.5">
              <FiCpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-100">Smart Circulation</h4>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                Easily pass forward or discover verified pre-owned tech.
              </p>
            </div>
          </motion.div>

          {/* 2. MIDDLE IMAGE SLIDER (Smooth AnimatePresence) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[4/5] bg-slate-50 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 p-2 z-10"
          >
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image 
                    src={sliderImages[currentSlide]} 
                    alt="ReTech Showcase Slider" 
                    fill
                    sizes="(max-w-768px) 100vw, 400px"
                    className="object-cover brightness-95"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gradient overlay to make images look extra premium */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
              
              {/* Slider Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                {sliderImages.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* 3. BOTTOM FLOATING CARD (Brand Trust Indicator) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute bottom-0 right-2 sm:-right-6 z-20 bg-white text-slate-900 rounded-2xl shadow-xl p-3.5 max-w-[220px] sm:max-w-[240px] border border-slate-100 flex items-start gap-3"
          >
            <div className="p-2 bg-teal-50 rounded-xl text-teal-600 shrink-0 mt-0.5">
              <FiStar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Absolute Trust</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                100% secure peer-to-peer authentic gadget trading.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}