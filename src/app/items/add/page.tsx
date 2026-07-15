"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { addProduct } from "@/lib/apiActions";
import { authClient } from "@/lib/auth-client"; 
import { toast } from "react-hot-toast";
import { FiArrowLeft, FiPlusCircle, FiDollarSign, FiLayers, FiUploadCloud, FiTrash2 } from "react-icons/fi";

const CATEGORIES = ["Laptops", "Monitors", "Accessories", "Mobile", "Keyboard", "PS-5", "Headphone", "Gaming Gear", "Speaker", "TV", "AC"] as const;
const CONDITIONS = ["Like New", "Excellent", "Good", "Fair"] as const;

export default function AddItemPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // BetterAuth session 
  const { data: session, isPending: isSessionLoading } = authClient.useSession();

  // State management for loading/blocker states
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Form input baseline state
  const initialFormState = {
    title: "",
    description: "",
    price: "",
    category: "Laptops" as typeof CATEGORIES[number],
    image: "",
    condition: "Excellent" as typeof CONDITIONS[number],
    sellerEmail: "", 
  };

  const [formData, setFormData] = useState(initialFormState);

  // Dynamic injection of active user email
  useEffect(() => {
    if (session?.user?.email) {
      setFormData((prev) => ({ 
        ...prev, 
        sellerEmail: session.user.email as string 
      }));
    }
  }, [session]);

  // Update form values
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Secure image upload and URL 
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    setUploadingImage(true);
    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);

    const uploadToast = toast.loading("Processing image...");

    try {
      const imgbbFormData = new FormData();
      imgbbFormData.append("image", file);

      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!apiKey) {
        throw new Error("Missing client API key configuration.");
      }

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: imgbbFormData,
      });

      if (!res.ok) throw new Error("Server responded with an error status.");

      const result = await res.json();
      
      if (result.success && result.data?.url) {
        setFormData((prev) => ({ ...prev, image: result.data.url }));
        toast.success("Image added successfully!", { id: uploadToast });
      } else {
        throw new Error("Invalid payload format received.");
      }
    } catch (error) {
      console.error("Upload process failed:", error);
      toast.error("Failed to upload image. Please try again.", { id: uploadToast });
      setImagePreview(null);
      setFormData((prev) => ({ ...prev, image: "" }));
    } finally {
      setUploadingImage(false);
    }
  };

  // Reset file selector and image states
  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("Image removed.");
  };

  // Process form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // prevent duplicate submit attempts if already loading
    if (submitting) return;

    // Security check to ensure email exists before pushing to DB
    if (!formData.sellerEmail) {
      toast.error("Authentication required. Please log in again.");
      return;
    }
    
    if (!formData.title || !formData.description || !formData.price || !formData.image) {
      toast.error("Please fill in all fields and upload a product image.");
      return;
    }

    // Lock submission state immediately
    setSubmitting(true);
    const apiToast = toast.loading("Publishing listing...");

    try {
      const parsedData = {
        ...formData,
        price: Number(formData.price),
      };

      const res = await addProduct(parsedData);
      
      if (res && res.error) {
        throw new Error(res.error || res.message || "Failed to save product on database");
      }

      // Success flow runs here:
      toast.success("Product listed successfully!", { id: apiToast });
      
      // 1. Immediately reset form state to prevent duplicate triggers
      setFormData({ 
        ...initialFormState, 
        sellerEmail: session?.user?.email || "" 
      });
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      // 2. Redirect to explore page safely
      router.push("/explore");
      router.refresh(); 

    } catch (error: any) {
      console.error("Submission failed:", error);
      toast.error(error.message || "Network error. Please try again later.", { id: apiToast });
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark py-12 px-4 sm:px-6 lg:px-8 relative">
      
      {/* Fullscreen loading overlay */}
      {(submitting || isSessionLoading) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-[9999] transition-all">
          <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 max-w-xs border border-slate-100">
            <span className="loading loading-spinner loading-lg text-brand-primary"></span>
            <p className="text-sm font-bold text-brand-dark text-center">
              {isSessionLoading ? "Verifying user session..." : "Publishing your gadget..."}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <Link 
          href="/explore" 
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-primary transition-colors mb-6 group"
        >
          <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Explore
        </Link>

        {/* Form Container Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xs">
          
          <div className="border-b border-slate-100 pb-5 mb-6">
            <h1 className="text-2xl font-black text-brand-dark tracking-tight sm:text-3xl flex items-center gap-2">
              <FiPlusCircle className="text-brand-primary" />
              List Pre-owned Hardware
            </h1>
            <p className="mt-1 text-sm text-slate-500 font-medium">
              Provide hardware configuration metrics and host your asset images.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Gadget Title *</label>
              <input
                type="text"
                name="title"
                required
                disabled={submitting}
                placeholder="e.g., Acer Aspire Lite AL15 AMD Ryzen 5 (16GB RAM)"
                value={formData.title}
                onChange={handleChange}
                className="input input-bordered w-full bg-slate-50 border-slate-200 text-brand-dark text-sm focus:outline-brand-primary h-11 rounded-xl disabled:bg-slate-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Category and Condition Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Hardware Category *</label>
                <div className="relative">
                  <FiLayers className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />
                  <select
                    name="category"
                    disabled={submitting}
                    value={formData.category}
                    onChange={handleChange}
                    className="select select-bordered w-full pl-10 bg-slate-50 border-slate-200 text-brand-dark text-sm focus:outline-brand-primary h-11 rounded-xl min-h-0 disabled:bg-slate-100 disabled:cursor-not-allowed"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Physical Condition *</label>
                <select
                  name="condition"
                  disabled={submitting}
                  value={formData.condition}
                  onChange={handleChange}
                  className="select select-bordered w-full bg-slate-50 border-slate-200 text-brand-dark text-sm focus:outline-brand-primary h-11 rounded-xl min-h-0 disabled:bg-slate-100 disabled:cursor-not-allowed"
                >
                  {CONDITIONS.map((cond) => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Target Price */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Target Price (USD) *</label>
              <div className="relative">
                <FiDollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="number"
                  name="price"
                  required
                  min="1"
                  disabled={submitting}
                  placeholder="450"
                  value={formData.price}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-9 bg-slate-50 border-slate-200 text-brand-dark text-sm focus:outline-brand-primary h-11 rounded-xl disabled:bg-slate-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Image Upload Area */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Gadget Graphic Preview *</label>
              
              {!imagePreview ? (
                <div 
                  onClick={() => !submitting && fileInputRef.current?.click()}
                  className={`border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center transition-all ${
                    submitting 
                    ? "bg-slate-100 cursor-not-allowed opacity-50" 
                    : "bg-slate-50 hover:bg-slate-50/80 hover:border-brand-primary cursor-pointer group"
                  }`}
                >
                  <FiUploadCloud className={`w-10 h-10 text-slate-400 transition-colors mb-3 ${!submitting && "group-hover:text-brand-primary"}`} />
                  <p className="text-sm font-bold text-slate-700">Click to upload hardware image</p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG, or WEBP (Max 10MB)</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    disabled={submitting}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner group">
                  <Image
                    src={imagePreview}
                    alt="Uploaded preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {uploadingImage ? (
                    <div className="absolute inset-0 bg-brand-dark/60 flex flex-col items-center justify-center text-white gap-2">
                      <span className="loading loading-spinner loading-md text-brand-secondary"></span>
                      <p className="text-xs font-bold uppercase tracking-wider">Processing file upload...</p>
                    </div>
                  ) : (
                    !submitting && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-3 right-3 btn btn-circle bg-rose-600 hover:bg-rose-700 border-none text-white w-9 h-9 min-h-0 shadow z-10"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Technical Description Area */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Technical Description Log *</label>
              <textarea
                name="description"
                required
                disabled={submitting}
                rows={5}
                placeholder="Detail core specifications (Processor, RAM, Storage, Usage history, Active Warranty etc.)..."
                value={formData.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full bg-slate-50 border-slate-200 text-brand-dark text-sm focus:outline-brand-primary rounded-xl leading-relaxed p-4 disabled:bg-slate-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Actions Panel */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <Link
                href="/explore"
                className="btn bg-slate-100 hover:bg-slate-200 text-slate-700 border-none rounded-xl px-5 h-11 min-h-0 text-xs font-bold uppercase tracking-wider transition-all"
              >
                Back
              </Link>
              <button
                type="submit"
                disabled={submitting || uploadingImage || !formData.image || !formData.sellerEmail}
                className="btn bg-brand-primary hover:opacity-90 text-white border-none rounded-xl px-6 h-11 min-h-0 text-xs font-bold uppercase tracking-wider shadow-md transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {submitting && <span className="loading loading-spinner loading-xs"></span>}
                {submitting ? "Processing..." : "Deploy Listing"}
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}