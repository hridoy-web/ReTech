const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000";

export interface Product {
  _id: string; 
  title: string;
  description: string;
  price: number;
  category: "Laptops" | "Monitors" | "Accessories" | "Mobile" | "Keyboard" | "PS-5" | "Headphone" | "Gaming Gear" | "Speaker" | "TV" | "AC";
  image: string;
  condition: "Like New" | "Excellent" | "Good" | "Fair";
  sellerEmail: string;
  createdAt: string;
}

export interface FetchProductsResponse {
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
  data: Product[];
}

interface FetchFilters {
  search?: string;
  category?: string;
  maxPrice?: number;
  sortBy?: string;
  page?: number;
  limit?: number;
}

// 1. Fetch All Products with filters, sorting & pagination
export const fetchProducts = async (filters: FetchFilters = {}): Promise<FetchProductsResponse> => {
  try {
    const queryParams = new URLSearchParams();

    if (filters.search) queryParams.append("search", filters.search);
    if (filters.category && filters.category !== "all") queryParams.append("category", filters.category);
    if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice.toString());
    if (filters.sortBy) queryParams.append("sortBy", filters.sortBy);
    if (filters.page) queryParams.append("page", filters.page.toString());
    if (filters.limit) queryParams.append("limit", filters.limit.toString());

    const res = await fetch(`${BASE_URL}/products?${queryParams.toString()}`, {
      cache: "no-store", 
    });

    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (error) {
    console.error("fetchProducts error:", error);
    return { meta: { totalItems: 0, totalPages: 1, currentPage: 1, limit: 8 }, data: [] };
  }
};

// 2. Fetch Single Product Details
export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Product not found");
    return await res.json();
  } catch (error) {
    console.error("fetchProductById error:", error);
    return null;
  }
};

// 3. POST - Add a new dynamic gadget
export const addProduct = async (productData: Omit<Product, "_id" | "createdAt">) => {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    return await res.json();
  } catch (error) {
    console.error("addProduct error:", error);
    return { message: "Error mapping item data" };
  }
};

// 4. GET - Fetch user's custom listed products (Manage Items page)
export const fetchMyItems = async (email: string | undefined | null): Promise<Product[]> => {
  try {
    if (!email) {
      console.warn("fetchMyItems: No email provided. Skipping API call.");
      return [];
    }

    const res = await fetch(`${BASE_URL}/products/my-items?email=${encodeURIComponent(email)}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Backend error context:", errorData);
      throw new Error(errorData.message || `HTTP error! Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("fetchMyItems error details:", error);
    return [];
  }
};

// 5. DELETE - Remove an item from the inventory
export const deleteProduct = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (error) {
    console.error("deleteProduct error:", error);
    return { message: "Failed to delete item" };
  }
};