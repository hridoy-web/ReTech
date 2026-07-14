"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiEye } from "react-icons/fi";

const dummyProducts = [
  {
    id: "p1",
    title: "MacBook Pro M1 (16GB/512GB)",
    category: "Laptops",
    condition: "Like New",
    price: 849,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "p2",
    title: "LG UltraGear 27\" IPS 144Hz Monitor",
    category: "Monitors",
    condition: "Good",
    price: 189,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "p3",
    title: "Keychron K2 Wireless Mechanical Keyboard",
    category: "Accessories",
    condition: "Excellent",
    price: 65,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "p4",
    title: "Sony WH-1000XM4 ANC Headphones",
    category: "Audio",
    condition: "Like New",
    price: 199,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop",
  },
];

export default function LatestAdditions() {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dummyProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between group">
              <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                <Image 
                  src={product.image} 
                  alt={product.title} 
                  fill 
                  sizes="(max-w-768px) 100vw, 300px" 
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md border border-slate-200/50 text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm">
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
                  <Link href={`/explore/${product.id}`} className="p-2 bg-slate-50 text-slate-600 hover:bg-indigo-600 hover:text-white rounded-xl transition-all border border-slate-200 group-hover:border-indigo-600">
                    <FiEye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}