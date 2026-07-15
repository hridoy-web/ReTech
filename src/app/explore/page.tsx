"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchProducts, Product } from "@/lib/apiActions";
import { FiSearch, FiSliders, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CATEGORIES = ["all", "Laptops", "Monitors", "Accessories", "Mobile", "Keyboard", "PS-5", "Headphone", "Gaming Gear", "Speaker", "TV", "AC"];

type FilterType = "category" | "maxPrice" | "sortBy";

export default function ExplorePage() {
  // API & Data handling states
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Pagination control states
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(2500); 
  const [sortBy, setSortBy] = useState<string>("priceLowHigh");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetchProducts({
          search,
          category,
          maxPrice,
          sortBy,
          page,
          limit: 8 
        });
        
        setProducts(res?.data || []);
        setTotalPages(res?.meta?.totalPages || 1);
      } catch (error) {
        console.error("Failed to load products efficiently:", error);
        setProducts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      loadData();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, category, maxPrice, sortBy, page]);

  const handleFilterChange = (type: FilterType, value: string | number) => {
    setPage(1);
    if (type === "category") setCategory(String(value));
    if (type === "maxPrice") setMaxPrice(Number(value));
    if (type === "sortBy") setSortBy(String(value));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header Layout */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Explore Pre-owned Tech
          </h1>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            Search, filter, and discover verified dynamic hardware listings.
          </p>
        </div>

        {/* Dynamic Filtering Panel */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          
          {/* Query String Input */}
          <div className="w-full">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Search Gadget</label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Type title..."
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPage(1); setSearch(e.target.value); }}
                className="input input-bordered w-full pl-9 bg-slate-50 border-slate-200 text-slate-900 text-sm focus:outline-indigo-500 h-10 rounded-xl"
              />
            </div>
          </div>

          {/* Category Dropdown Control */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Category</label>
            <select
              value={category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFilterChange("category", e.target.value)}
              className="select select-bordered w-full bg-slate-50 border-slate-200 text-slate-900 text-sm focus:outline-indigo-500 h-10 rounded-xl min-h-0"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sequence Sorting Control */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFilterChange("sortBy", e.target.value)}
              className="select select-bordered w-full bg-slate-50 border-slate-200 text-slate-900 text-sm focus:outline-indigo-500 h-10 rounded-xl min-h-0"
            >
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
              <option value="latest">Latest Additions</option>
            </select>
          </div>

          {/* Range Pricing Control Converted to Dollar Scales */}
          <div>
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              <span>Max Price</span>
              <span className="text-indigo-600 font-black">${maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10"
              max="5000"
              step="50"
              value={maxPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilterChange("maxPrice", e.target.value)}
              className="range range-xs range-primary w-full accent-indigo-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Core Layout Status Conditional Switch */}
        {loading ? (
          /* Professional Processing Skeleton State */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 h-[380px] flex flex-col justify-between animate-pulse">
                <div className="w-full h-44 bg-slate-200 rounded-xl mb-4" />
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-slate-200 rounded w-1/2 mb-4" />
                <div className="h-5 bg-slate-200 rounded w-1/3 mb-4" />
                <div className="h-9 bg-slate-200 rounded-xl w-full" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          /* Restored Minimal Clean Empty State */
          <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <FiSliders className="mx-auto w-12 h-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-800">No Gadgets Found</h3>
            <p className="text-sm text-slate-500 mt-1">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          /* Functional Product View Render */
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((item) => (
                <div
                  key={item._id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-indigo-500/30 transition-all flex flex-col justify-between h-[400px]"
                >
                  {/* Optimized Next.js NextImage Component Layout */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-100 mb-3 border border-slate-100">
                    <Image
                      src={item.image || "https://images.unsplash.com/photo-1531297484001-80022131f5a1"}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                      priority={false}
                    />
                    <span className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider bg-white/90 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md shadow-xs z-10">
                      {item.condition}
                    </span>
                  </div>

                  {/* Context Info Section */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">
                        {item.category}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-0.5 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Meta Values Converted to Dollar Standard */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Price</p>
                        <p className="text-base font-black text-slate-900">${item.price.toLocaleString()}</p>
                      </div>
                      <span className="text-[10px] font-medium text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  </div>

                  {/* Navigation Action Trigger */}
                  <Link
                    href={`/explore/${item._id}`}
                    className="btn btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-xl h-10 min-h-0 text-xs font-bold shadow-xs transition-colors uppercase tracking-wider text-center flex items-center justify-center"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination Segment */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="btn bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl px-3 h-10 min-h-0 border-none shadow-xs disabled:opacity-50"
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold text-slate-600">
                  Page <span className="text-slate-900 font-black">{page}</span> of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="btn bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl px-3 h-10 min-h-0 border-none shadow-xs disabled:opacity-50"
                >
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}