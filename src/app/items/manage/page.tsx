"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { fetchMyItems, deleteProduct, Product } from "@/lib/apiActions";
import { FiTrash2, FiPlus, FiExternalLink, FiPackage, FiShoppingBag, FiInfo, FiAlertTriangle } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function ManageItemsPage() {
    const router = useRouter();

    // Session tracker
    const { data: session, isPending: isSessionLoading } = authClient.useSession();

    // Content state management
    const [items, setItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Custom confirmation modal state
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [itemToDelete, setItemToDelete] = useState<{ id: string; title: string } | null>(null);

    const loadUserInventory = useCallback(async (email: string) => {
        try {
            setLoading(true);
            const data = await fetchMyItems(email);
            setItems(data);
        } catch (error) {
            console.error("Error loading inventory:", error);
            toast.error("Failed to load your listed items.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!isSessionLoading) {
            if (!session?.user?.email) {
                toast.error("Please login to manage your inventory.");
                router.push("/login");
            } else {
                loadUserInventory(session.user.email);
            }
        }
    }, [session, isSessionLoading, router, loadUserInventory]);

    // Open confirmation modal
    const triggerDeleteConfirmation = (id: string, title: string) => {
        setItemToDelete({ id, title });
        setIsModalOpen(true);
    };

    // Execute actual deletion after confirmation
    const handleDeleteConfirm = async () => {
        if (!itemToDelete) return;

        const { id } = itemToDelete;
        setIsModalOpen(false);
        setDeletingId(id);

        const deleteToast = toast.loading("Removing item from inventory...");

        try {
            const res = await deleteProduct(id);

            if (res && (res.error || res.message === "Failed to delete item")) {
                throw new Error(res.error || res.message || "Failed to delete from server");
            }

            toast.success("Item deleted successfully!", { id: deleteToast });
            setItems((prevItems) => prevItems.filter((item) => item._id !== id));

        } catch (error: unknown) {
            console.error("Deletion failed:", error);
            let errorMessage = "Could not complete request. Try again.";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage, { id: deleteToast });
        } finally {
            setDeletingId(null);
            setItemToDelete(null);
        }
    };

    // Rendering loading layout state
    if (isSessionLoading || loading) {
        return (
            <div className="min-h-screen bg-brand-light text-brand-dark py-12 px-4 sm:px-6 lg:px-8 mt-16 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <span className="loading loading-spinner loading-lg text-brand-primary"></span>
                    <p className="text-sm font-bold text-slate-500">Check your inventory ...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-light text-brand-dark py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Header content section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-brand-dark flex items-center gap-2">
                            <FiPackage className="text-brand-primary" />
                            Manage Inventory
                        </h1>
                        <p className="text-sm font-medium text-slate-500 mt-1">
                            Currently managing listed hardware for: <span className="font-semibold text-brand-primary">{session?.user?.email}</span>
                        </p>
                    </div>

                    <Link
                        href="/items/add"
                        className="btn bg-brand-primary hover:opacity-90 text-white border-none rounded-xl px-5 h-11 min-h-0 text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
                    >
                        <FiPlus className="w-4 h-4" />
                        Add New Item
                    </Link>
                </div>

                {/* Dynamic content rendering based on inventory size */}
                {items.length === 0 ? (
                    <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-xs">
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FiShoppingBag className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-brand-dark">No active listings found</h3>
                        <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                            You havent posted any pre-owned hardware up for sale yet. Start listing to reach other buyers!
                        </p>
                        <div className="mt-6">
                            <Link
                                href="/items/add"
                                className="btn bg-brand-primary hover:opacity-90 text-white border-none rounded-xl px-6 h-11 min-h-0 text-xs font-bold uppercase tracking-wider shadow-md"
                            >
                                List Your First Product
                            </Link>
                        </div>
                    </div>
                ) : (

                    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
                        <div className="overflow-x-auto">
                            <table className="table w-full text-left border-collapse">

                                <thead>
                                    <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                        <th className="py-4.5 pl-6">Hardware Info</th>
                                        <th className="py-4.5">Category</th>
                                        <th className="py-4.5">Condition</th>
                                        <th className="py-4.5">Price</th>
                                        <th className="py-4.5 pr-6 text-right">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100 text-sm">
                                    {items.map((item) => (
                                        <tr key={item._id} className="hover:bg-slate-50/40 transition-colors group">

                                            <td className="py-4 pl-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                                                        <Image
                                                            src={item?.image}
                                                            alt={item?.title}
                                                            fill
                                                            className="object-cover"
                                                            unoptimized
                                                        />
                                                    </div>
                                                    <div>
                                                        <span className="font-bold text-brand-dark block line-clamp-1 max-w-xs sm:max-w-md">
                                                            {item?.title}
                                                        </span>
                                                        <span className="text-xs text-slate-400 font-medium block mt-0.5">
                                                            Listed: {new Date(item?.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-4">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                                                    {item?.category}
                                                </span>
                                            </td>

                                            <td className="py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item?.condition === "Like New" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                                                        item?.condition === "Excellent" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                                                            item?.condition === "Good" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                                                                "bg-slate-100 text-slate-600"
                                                    }`}>
                                                    {item?.condition}
                                                </span>
                                            </td>

                                            <td className="py-4 font-black text-brand-dark">
                                                ${item?.price}
                                            </td>

                                            <td className="py-4 pr-6 text-right">
                                                <div className="flex items-center justify-end gap-2">

                                                    <Link
                                                        href={`/explore/${item?._id}`}
                                                        className="btn btn-ghost hover:bg-slate-100 text-slate-500 hover:text-brand-primary p-0 w-9 h-9 min-h-0 rounded-lg flex items-center justify-center"
                                                    >
                                                        <FiExternalLink className="w-4 h-4" />
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() => triggerDeleteConfirmation(item?._id, item?.title)}
                                                        disabled={deletingId === item?._id}
                                                        className="btn btn-ghost hover:bg-rose-50 text-slate-500 hover:text-rose-600 p-0 w-9 h-9 min-h-0 rounded-lg flex items-center justify-center disabled:opacity-50"
                                                    >
                                                        {deletingId === item?._id ? (
                                                            <span className="loading loading-spinner loading-xs"></span>
                                                        ) : (
                                                            <FiTrash2 className="w-4 h-4" />
                                                        )}
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>

                        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex items-center gap-2 text-xs text-slate-500 font-medium">
                            <FiInfo className="text-brand-primary w-4 h-4 flex-shrink-0" />
                            <span>Items deleted here are immediately and permanently wiped from the ReTech core database.</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 transition-opacity">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-slate-100 transform scale-100 transition-transform">
                        <div className="flex items-center gap-3 text-rose-600 mb-4">
                            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center">
                                <FiAlertTriangle className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">Confirm Deletion</h3>
                        </div>

                        <p className="text-sm text-slate-500 leading-relaxed mb-6">
                            Are you sure you want to permanently delete <strong className="text-slate-700">{itemToDelete?.title}</strong>? This action cannot be undone.
                        </p>

                        <div className="flex gap-3 justify-end">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setItemToDelete(null);
                                }}
                                className="btn btn-ghost hover:bg-slate-100 text-slate-600 px-5 rounded-xl text-xs font-bold uppercase tracking-wider h-11 min-h-0"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteConfirm}
                                className="btn bg-rose-600 hover:bg-rose-700 text-white border-none px-5 rounded-xl text-xs font-bold uppercase tracking-wider h-11 min-h-0 shadow-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}