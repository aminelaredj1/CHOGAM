import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { type Product } from "@/data/products";

interface AdminProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (p: Product) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
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

// Convert local state keys to DB columns
function mapLocalProductToDb(p: Partial<Product>) {
  const db: any = {};
  if (p.id !== undefined) db.id = p.id;
  if (p.slug !== undefined) db.slug = p.slug;
  if (p.name !== undefined) db.name = p.name;
  if (p.nameAr !== undefined) db.name_ar = p.nameAr;
  if (p.tagline !== undefined) db.tagline = p.tagline;
  if (p.taglineAr !== undefined) db.tagline_ar = p.taglineAr;
  if (p.description !== undefined) db.description = p.description;
  if (p.descriptionAr !== undefined) db.description_ar = p.descriptionAr;
  if (p.price !== undefined) db.price = p.price;
  if (p.currency !== undefined) db.currency = p.currency;
  if (p.size !== undefined) db.size = p.size;
  if (p.category !== undefined) db.category = p.category;
  if (p.badge !== undefined) db.badge = p.badge;
  if (p.images !== undefined) db.images = p.images;
  if (p.heroImage !== undefined) db.hero_image = p.heroImage;
  if (p.topNotes !== undefined) db.top_notes = p.topNotes;
  if (p.heartNotes !== undefined) db.heart_notes = p.heartNotes;
  if (p.baseNotes !== undefined) db.base_notes = p.baseNotes;
  if (p.ingredients !== undefined) db.ingredients = p.ingredients;
  if (p.inStock !== undefined) db.in_stock = p.inStock;
  if (p.rating !== undefined) db.rating = p.rating;
  if (p.reviewCount !== undefined) db.review_count = p.reviewCount;
  return db;
}

export const useAdminProductStore = create<AdminProductStore>((set, get) => ({
  products: [],
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

      const localProducts = (data || []).map(mapDbProductToLocal);
      set({ products: localProducts, isLoading: false });
    } catch (err: any) {
      console.error("Error fetching products from Supabase:", err);
      set({ error: err.message, isLoading: false });
    }
  },

  addProduct: async (p) => {
    set({ isLoading: true, error: null });
    try {
      const dbProduct = mapLocalProductToDb(p);
      const { error } = await supabase.from("products").insert([dbProduct]);
      if (error) throw error;
      
      // Update local state
      set((s) => ({ products: [...s.products, p], isLoading: false }));
    } catch (err: any) {
      console.error("Error adding product to Supabase:", err);
      set({ error: err.message, isLoading: false });
    }
  },

  updateProduct: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      const dbUpdates = mapLocalProductToDb(updates);
      const { error } = await supabase.from("products").update(dbUpdates).eq("id", id);
      if (error) throw error;

      // Update local state
      set((s) => ({
        products: s.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        isLoading: false,
      }));
    } catch (err: any) {
      console.error("Error updating product in Supabase:", err);
      set({ error: err.message, isLoading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;

      // Update local state
      set((s) => ({
        products: s.products.filter((p) => p.id !== id),
        isLoading: false,
      }));
    } catch (err: any) {
      console.error("Error deleting product from Supabase:", err);
      set({ error: err.message, isLoading: false });
    }
  },
}));
