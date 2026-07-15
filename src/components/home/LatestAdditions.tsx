"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiEye } from "react-icons/fi";
import { fetchLatestAdditions } from "@/lib/apiActions"; // তোমার ফোল্ডার অনুযায়ী পাথ ঠিক রেখো

interface Product {
  _id: string;
  title: string;
  category: string;
  condition: string;
  price: number;
  image: string; // অথবা image_url যা তোমার মডেলে ডিফাইন করা
}

export default function LatestAdditions() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadLatest() {
      try {
        const data = await fetchLatestAdditions();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load latest gadgets:", err);
      } finally {
        setLoading(false);
      }
    }
    loadLatest();
  }, []);

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Latest Additions
            </h2>
            <p className="mt-2 text-base text-slate-500 font-medium">
              Freshly listed gadgets by fellow geeks. Grab them before they sell out!
            </p>
          </div>
          <Link href="/explore" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hidden sm:inline-flex items-center gap-1">
            <span>View All Catalog</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Loading State Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-4 space-y-4 animate-pulse">
                <div className="aspect-[4/3] w-full bg-slate-200 rounded-xl"></div>
                <div className="h-4 bg-slate-200 rounded-md w-1/3"></div>
                <div className="h-5 bg-slate-200 rounded-md w-3/4"></div>
                <div className="h-10 bg-slate-200 rounded-md w-full mt-4"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-sm font-semibold text-slate-400">No gadgets listed yet.</p>
          </div>
        ) : (
          /* Dynamic Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between group">
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                  <Image 
                    src={product.image || "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=400&auto=format&fit=crop"} 
                    alt={product.title} 
                    fill 
                    sizes="(max-w-768px) 100vw, 300px" 
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md border border-slate-200/50 text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm uppercase">
                    {product.condition}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 block mb-1">
                      {product.category}
                    </span>
                    <h3 className="font-bold text-slate-800 text-sm line-clamp-2 min-h-[40px] leading-snug">
                      {product.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">Asking Price</span>
                      <span className="text-base font-black text-slate-900">${product.price}</span>
                    </div>
                    {/* View Details directly leads to the dynamic dynamic route */}
                    <Link href={`/explore/${product._id}`} className="p-2 bg-slate-50 text-slate-600 hover:bg-indigo-600 hover:text-white rounded-xl transition-all border border-slate-200 group-hover:border-indigo-600">
                      <FiEye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}