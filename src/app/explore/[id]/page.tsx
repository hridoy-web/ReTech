"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { fetchProductById, Product } from "@/lib/apiActions";
import { FiTag, FiClock, FiActivity, FiArrowLeft, FiInbox } from "react-icons/fi";
import toast from "react-hot-toast";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  // React state mapped specifically to your Product interface
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const getProductDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to resolve product data stream:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    getProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="w-full h-96 bg-slate-200 rounded-2xl" />
          <div className="space-y-6">
            <div className="h-4 bg-slate-200 rounded w-1/4" />
            <div className="h-8 bg-slate-200 rounded w-3/4" />
            <div className="h-6 bg-slate-200 rounded w-1/3" />
            <div className="h-24 bg-slate-200 rounded w-full" />
            <div className="h-12 bg-slate-200 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Safe UI fallback if the backend returns null or database entry is empty
  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4 mt-16">
        <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl shadow-sm max-w-md w-full p-6">
          <FiInbox className="mx-auto w-12 h-12 text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-slate-800">Gadget Specs Unavailable</h3>
          <p className="text-sm text-slate-500 mt-1 mb-6">The requested listing does not exist or has been archived.</p>
          <button
            onClick={() => router.push("/explore")}
            className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-xl text-xs font-bold uppercase tracking-wider px-6 h-10 min-h-0"
          >
            Back to Explore
          </button>
        </div>
      </div>
    );
  }

  const handleSuccess = () => {
    toast.success('Inquiry sent! The seller will reach out soon.');
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Navigation Context Link */}
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-6 group"
        >
          <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Return to Explore
        </Link>

        {/* Master Details Frame */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">

          <div className="relative w-full h-80 md:h-[450px] bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-inner">
            <Image
              src={product.image || "https://images.unsplash.com/photo-1531297484001-80022131f5a1"}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={true}
            />
          </div>

          {/* Metadata Visual Blocks */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Feature Badges Grid */}
              <div className="flex flex-wrap gap-2 items-center mb-4">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider bg-indigo-50 border border-indigo-100 text-indigo-600 px-2.5 py-1 rounded-md">
                  <FiTag className="w-3 h-3" />
                  {product.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider bg-emerald-50 border border-emerald-100 text-emerald-600 px-2.5 py-1 rounded-md">
                  <FiActivity className="w-3 h-3" />
                  {product.condition}
                </span>
              </div>

              {/* Title Section */}
              <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl leading-tight">
                {product.title}
              </h1>

              {/* Timestamp Tracking */}
              <div className="flex items-center gap-1 text-xs text-slate-400 font-medium mt-2 mb-6">
                <FiClock className="w-3.5 h-3.5" />
                <span>Listed on {new Date(product.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              </div>

              {/* Currency Display Frame (Aligned to Dollar Format) */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Evaluation Price</p>
                <p className="text-3xl font-black text-slate-900 mt-0.5">${product.price.toLocaleString()}</p>
              </div>

              {/* Description Log Segment */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Description Log</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Seller Actions Interface */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
              <a
                href={`mailto:${product.sellerEmail}?subject=Inquiry about ${encodeURIComponent(product.title)}`}
                onClick={handleSuccess}
                className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-xl flex-1 h-12 min-h-0 text-sm font-bold uppercase tracking-wider shadow-sm transition-all text-center flex items-center justify-center"
              >
                Contact Seller
              </a>
              <Link
                href="/explore"
                className="btn bg-slate-100 hover:bg-slate-200 text-slate-700 border-none rounded-xl px-6 h-12 min-h-0 text-sm font-bold uppercase tracking-wider text-center flex items-center justify-center transition-all"
              >
                Go Back
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}