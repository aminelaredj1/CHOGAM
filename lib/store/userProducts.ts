import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { type Product, products as initialProducts } from "@/data/products";

interface UserProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

// Convert DB columns to local state keys
function mapDbProductToLocal(dbProduct: any): Product {
  return {
    id: dbProduct.id,
    slug: dbProduct.slug,
    name: dbProduct.name,
    nameAr: dbProduct.name_ar || "",
    tagline: dbProduct.tagline || "",
    taglineAr: dbProduct.tagline_ar || "",
    description: dbProduct.description || "",
    descriptionAr: dbProduct.description_ar || "",
    price: Number(dbProduct.price),
    currency: dbProduct.currency || "DZD",
    size: dbProduct.size || "",
    category: dbProduct.category,
    badge: dbProduct.badge || undefined,
    images: dbProduct.images || [],
    heroImage: dbProduct.hero_image || "",
    topNotes: dbProduct.top_notes || [],
    heartNotes: dbProduct.heart_notes || [],
    baseNotes: dbProduct.base_notes || [],
    ingredients: dbProduct.ingredients || "",
    inStock: dbProduct.in_stock,
    rating: Number(dbProduct.rating),
    reviewCount: dbProduct.review_count || 0,
  };
}

export const useUserProductStore = create<UserProductStore>((set) => ({
  products: initialProducts, // fallback to static data
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        const localProducts = data.map(mapDbProductToLocal);
        set({ products: localProducts, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (err: any) {
      console.error("Error fetching products for client:", err);
      set({ error: err.message, isLoading: false });
    }
  },
}));
