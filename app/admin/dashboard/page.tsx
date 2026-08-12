"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, Plus, Pencil, Trash2, X, Save, RotateCcw,
  Package, Star, TrendingUp, ShoppingBag, ChevronDown, ChevronUp, Check
} from "lucide-react";
import { useAdminProductStore } from "@/lib/store/adminProducts";
import type { Product } from "@/data/products";
import { supabase } from "@/lib/supabase";

/* ─── Helpers ──────────────────────────────────────────────── */
function generateId() {
  return `product-${Date.now()}`;
}

const BADGE_OPTIONS = [
  { value: "", label: "Aucun" },
  { value: "bestSeller", label: "Best Seller" },
  { value: "newArrival", label: "Nouveauté" },
  { value: "limited", label: "Édition Limitée" },
] as const;

const CATEGORY_OPTIONS = [
  { value: "pour homme", label: "Pour Homme" },
  { value: "pour femme", label: "Pour Femme" },
  { value: "unisex", label: "Mixte" },
] as const;

/* ─── Empty product template ──────────────────────────────── */
const emptyProduct = (): Omit<Product, "id"> => ({
  slug: "",
  name: "",
  nameAr: "",
  tagline: "Eau de Parfum — 100ml",
  taglineAr: "",
  description: "",
  descriptionAr: "",
  price: 3000,
  currency: "DZD",
  size: "100ml / 3.4 FL.OZ.",
  category: "pour homme",
  badge: undefined,
  images: ["/products/bravento/bravento-hero-marble.png"],
  heroImage: "/products/bravento/bravento-hero-marble.png",
  topNotes: [],
  heartNotes: [],
  baseNotes: [],
  ingredients: "",
  inStock: true,
  rating: 4.5,
  reviewCount: 0,
});

/* ─── Stat Card ───────────────────────────────────────────── */
function StatCard({ icon: Icon, label, value, color }: {
  icon: React.ElementType; label: string; value: string | number; color: string;
}) {
  return (
    <div className="bg-[#111827] border border-[#D4AF37]/15 rounded-xl p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${color}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[#94A3B8] text-xs font-medium tracking-wider uppercase">{label}</p>
        <p className="text-white text-xl font-bold font-serif">{value}</p>
      </div>
    </div>
  );
}

/* ─── Product Row ─────────────────────────────────────────── */
function ProductRow({ product, onEdit, onDelete }: {
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}) {
  const badgeColors: Record<string, string> = {
    bestSeller: "bg-amber-500/20 text-amber-400",
    newArrival: "bg-emerald-500/20 text-emerald-400",
    limited: "bg-purple-500/20 text-purple-400",
  };

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="border-b border-[#D4AF37]/8 hover:bg-[#D4AF37]/3 transition-colors"
    >
      <td className="p-4">
        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#D4AF37]/20 flex-shrink-0">
          <Image src={product.heroImage} alt={product.name} fill className="object-cover" sizes="48px" />
        </div>
      </td>
      <td className="p-4">
        <p className="text-white font-serif font-semibold text-sm">{product.name}</p>
        <p className="text-[#94A3B8] text-xs mt-0.5">{product.tagline}</p>
      </td>
      <td className="p-4">
        <span className="text-xs text-[#94A3B8] bg-[#1E293B] px-2 py-1 rounded capitalize">
          {product.category}
        </span>
      </td>
      <td className="p-4">
        <span className="text-[#D4AF37] font-bold font-serif text-sm">
          {product.price.toLocaleString("fr-DZ")} DZD
        </span>
      </td>
      <td className="p-4">
        {product.badge ? (
          <span className={`text-xs px-2 py-1 rounded-full ${badgeColors[product.badge] ?? ""}`}>
            {BADGE_OPTIONS.find(b => b.value === product.badge)?.label}
          </span>
        ) : (
          <span className="text-[#475569] text-xs">—</span>
        )}
      </td>
      <td className="p-4">
        <div className="flex items-center gap-1">
          <Star size={12} className="text-[#D4AF37] fill-[#D4AF37]" />
          <span className="text-white text-sm">{product.rating}</span>
          <span className="text-[#475569] text-xs">({product.reviewCount})</span>
        </div>
      </td>
      <td className="p-4">
        <div className={`w-2 h-2 rounded-full inline-block mr-1.5 ${product.inStock ? "bg-emerald-400" : "bg-red-400"}`} />
        <span className={`text-xs ${product.inStock ? "text-emerald-400" : "text-red-400"}`}>
          {product.inStock ? "En stock" : "Épuisé"}
        </span>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(product)}
            className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center transition-colors"
            title="Modifier"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-colors"
            title="Supprimer"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </td>
    </motion.tr>
  );
}

/* ─── Product Modal ───────────────────────────────────────── */
function ProductModal({
  product,
  onSave,
  onClose,
}: {
  product: Product | null;
  onSave: (p: Product) => void;
  onClose: () => void;
}) {
  const isNew = !product?.id || product.id.startsWith("new-");
  const [form, setForm] = useState<Product>(
    product ?? { id: "new-" + Date.now(), ...emptyProduct() }
  );
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `product_images/${fileName}`;

      const { data, error } = await supabase.storage
        .from("products")
        .upload(filePath, file, { cacheControl: "3600", upsert: true });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("products")
        .getPublicUrl(filePath);

      set("heroImage", publicUrl);
      // Also update first image in images array
      set("images", [publicUrl]);
    } catch (err: any) {
      alert("Erreur lors du chargement de l'image: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const set = (field: keyof Product, value: unknown) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSave = () => {
    if (!form.name || !form.price) return;
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    onSave({ ...form, slug, id: isNew ? generateId() : form.id });
    setSaved(true);
    setTimeout(onClose, 700);
  };

  const inputCls = "w-full bg-[#0B1325] border border-[#D4AF37]/20 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all placeholder:text-[#475569]";
  const labelCls = "block text-xs font-medium text-[#94A3B8] tracking-wider uppercase mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-[#111827] border border-[#D4AF37]/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#111827] border-b border-[#D4AF37]/10 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="font-serif text-lg font-semibold text-white">
              {isNew ? "Nouveau Produit" : "Modifier le Produit"}
            </h2>
            <p className="text-[#94A3B8] text-xs mt-0.5">
              {isNew ? "Remplissez les informations ci-dessous" : `ID : ${form.id}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] flex items-center justify-center transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Name & Slug */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Nom du produit *</label>
              <input className={inputCls} value={form.name} onChange={e => set("name", e.target.value)} placeholder="ex: Chogam Noir" />
            </div>
            <div>
              <label className={labelCls}>Slug URL</label>
              <input className={inputCls} value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="auto-généré" />
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className={labelCls}>Tagline</label>
            <input className={inputCls} value={form.tagline} onChange={e => set("tagline", e.target.value)} placeholder="Eau de Parfum Pour Homme — 100ml" />
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Description</label>
            <textarea
              className={inputCls + " resize-none"}
              rows={3}
              value={form.description}
              onChange={e => set("description", e.target.value)}
              placeholder="Description du parfum..."
            />
          </div>

          {/* Price, Category, Badge */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Prix (DZD) *</label>
              <input
                type="number"
                className={inputCls}
                value={form.price}
                onChange={e => set("price", Number(e.target.value))}
                min={0}
              />
            </div>
            <div>
              <label className={labelCls}>Catégorie</label>
              <select
                className={inputCls + " cursor-pointer"}
                value={form.category}
                onChange={e => set("category", e.target.value as Product["category"])}
              >
                {CATEGORY_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Badge</label>
              <select
                className={inputCls + " cursor-pointer"}
                value={form.badge ?? ""}
                onChange={e => set("badge", e.target.value as Product["badge"] || undefined)}
              >
                {BADGE_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Rating, Reviews, Stock */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Note (0–5)</label>
              <input
                type="number"
                className={inputCls}
                value={form.rating}
                onChange={e => set("rating", Number(e.target.value))}
                min={0} max={5} step={0.1}
              />
            </div>
            <div>
              <label className={labelCls}>Nb. avis</label>
              <input
                type="number"
                className={inputCls}
                value={form.reviewCount}
                onChange={e => set("reviewCount", Number(e.target.value))}
                min={0}
              />
            </div>
            <div>
              <label className={labelCls}>Disponibilité</label>
              <div className="flex items-center gap-3 h-[42px]">
                <button
                  type="button"
                  onClick={() => set("inStock", !form.inStock)}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${form.inStock ? "bg-emerald-500" : "bg-[#334155]"}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${form.inStock ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
                <span className={`text-sm ${form.inStock ? "text-emerald-400" : "text-[#94A3B8]"}`}>
                  {form.inStock ? "En stock" : "Épuisé"}
                </span>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className={labelCls}>Image du produit (PNG/JPEG)</label>
            <div className="flex gap-4 items-center">
              {form.heroImage && (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#D4AF37]/20 flex-shrink-0 bg-[#0B1325]">
                  <Image src={form.heroImage} alt="Preview" fill className="object-cover" />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="w-full text-xs text-[#94A3B8] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#D4AF37]/20 file:text-[#D4AF37] hover:file:bg-[#D4AF37]/35 file:cursor-pointer disabled:opacity-50"
                />
                <p className="text-[10px] text-[#475569] mt-1.5">
                  {uploading ? "Téléchargement en cours..." : "Sélectionnez un fichier image de votre ordinateur."}
                </p>
              </div>
            </div>
            <input
              type="hidden"
              value={form.heroImage}
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className={labelCls}>Ingrédients INCI</label>
            <textarea
              className={inputCls + " resize-none"}
              rows={2}
              value={form.ingredients}
              onChange={e => set("ingredients", e.target.value)}
              placeholder="Alcohol Denat., Fragrance (Parfum), ..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#111827] border-t border-[#D4AF37]/10 px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-[#D4AF37]/20 text-[#94A3B8] hover:text-white hover:border-[#D4AF37]/40 transition-all text-sm font-medium"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0B1325] font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            {saved ? <Check size={15} /> : <Save size={15} />}
            {saved ? "Enregistré !" : "Enregistrer"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Confirm Delete Dialog ───────────────────────────────── */
function ConfirmDialog({ name, onConfirm, onCancel }: {
  name: string; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-[#111827] border border-red-500/30 rounded-2xl p-6 w-full max-w-sm shadow-2xl"
      >
        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={22} className="text-red-400" />
        </div>
        <h3 className="font-serif text-lg font-semibold text-white text-center mb-2">Supprimer le produit</h3>
        <p className="text-[#94A3B8] text-sm text-center mb-6">
          Êtes-vous sûr de vouloir supprimer <span className="text-white font-semibold">{name}</span> ?
          Cette action est irréversible.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-lg border border-[#D4AF37]/20 text-[#94A3B8] hover:text-white transition-colors text-sm font-medium">
            Annuler
          </button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-colors">
            Supprimer
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Dashboard ───────────────────────────────────────────── */
export default function AdminDashboard() {
  const router = useRouter();
  const { products, addProduct, updateProduct, deleteProduct, fetchProducts, isLoading, error } = useAdminProductStore();
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [search, setSearch] = useState("");

  // Load products from Supabase on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Auth guard
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("chogam-admin-auth");
      if (!auth) router.push("/admin");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("chogam-admin-auth");
    router.push("/admin");
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = products.reduce((s, p) => s + p.price * p.reviewCount, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Montserrat:wght@300;400;600&display=swap');
        body { background: #0B1325; margin: 0; font-family: 'Montserrat', sans-serif; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0B1325; }
        ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.3); border-radius: 3px; }
        option { background: #111827; color: #fff; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#0B1325", color: "#fff" }}>

        {/* ─── Top Bar ─────────────────────────────────────── */}
        <header style={{
          background: "linear-gradient(180deg, rgba(17,24,39,0.98) 0%, rgba(17,24,39,0.95) 100%)",
          borderBottom: "1px solid rgba(212,175,55,0.15)",
          position: "sticky", top: 0, zIndex: 40,
        }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Brand */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Image src="/brand/logo-chogam-gold.svg" alt="Chogam" width={32} height={32} style={{ objectFit: "contain" }} />
              <div>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 16, fontWeight: 700, color: "#D4AF37", letterSpacing: 2 }}>CHOGAM</p>
                <p style={{ fontSize: 10, color: "#94A3B8", letterSpacing: 1.5, textTransform: "uppercase" }}>Espace Admin</p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <a href="/" target="_blank" style={{ fontSize: 12, color: "#94A3B8", textDecoration: "none", padding: "6px 12px", borderRadius: 8, border: "1px solid rgba(212,175,55,0.2)", transition: "all 0.2s" }}>
                Voir le site ↗
              </a>
              <button
                onClick={handleLogout}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#FCA5A5", fontSize: 12, cursor: "pointer", transition: "all 0.2s" }}
              >
                <LogOut size={13} /> Déconnexion
              </button>
            </div>
          </div>
        </header>

        <main style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>

          {/* ─── Stats ─────────────────────────────────────── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
            <StatCard icon={Package} label="Produits" value={products.length} color="bg-[#D4AF37]/15 text-[#D4AF37]" />
            <StatCard icon={ShoppingBag} label="En stock" value={products.filter(p => p.inStock).length} color="bg-emerald-500/15 text-emerald-400" />
            <StatCard icon={Star} label="Note moyenne" value={`${(products.reduce((s,p) => s + p.rating, 0) / products.length).toFixed(1)} ★`} color="bg-purple-500/15 text-purple-400" />
            <StatCard icon={TrendingUp} label="Avis totaux" value={products.reduce((s,p) => s + p.reviewCount, 0)} color="bg-blue-500/15 text-blue-400" />
          </div>

          {/* ─── Table Header ──────────────────────────────── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
            <div>
              <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 700, color: "#D4AF37" }}>Gestion des Produits</h1>
              <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>{filtered.length} produit{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""}</p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {/* Search */}
              <input
                placeholder="Rechercher..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.2)",
                  borderRadius: 10, padding: "8px 14px", color: "#fff", fontSize: 13,
                  outline: "none", width: 180, fontFamily: "Montserrat, sans-serif"
                }}
              />
              {/* Add */}
              <button
                onClick={() => setShowAddModal(true)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 18px", borderRadius: 10,
                  background: "linear-gradient(135deg, #D4AF37, #AA7C11)",
                  color: "#0B1325", fontWeight: 700, fontSize: 13, cursor: "pointer", border: "none"
                }}
              >
                <Plus size={15} /> Ajouter
              </button>
            </div>
          </div>

          {/* ─── Products Table ─────────────────────────────── */}
          <div style={{ background: "#111827", border: "1px solid rgba(212,175,55,0.12)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(212,175,55,0.12)" }}>
                    {["Image", "Produit", "Catégorie", "Prix", "Badge", "Évaluation", "Stock", "Actions"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "#94A3B8", fontFamily: "Montserrat, sans-serif" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={8} style={{ textAlign: "center", padding: 48, color: "#475569" }}>
                          <Package size={36} style={{ margin: "0 auto 12px", opacity: 0.4 }} />
                          <p style={{ fontSize: 14 }}>Aucun produit trouvé</p>
                        </td>
                      </tr>
                    ) : filtered.map(p => (
                      <ProductRow
                        key={p.id}
                        product={p}
                        onEdit={setEditProduct}
                        onDelete={(id) => setDeleteTarget(products.find(pr => pr.id === id) ?? null)}
                      />
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>

          {/* ─── Footer note ────────────────────────────────── */}
          <p style={{ textAlign: "center", fontSize: 11, color: "#334155", marginTop: 24 }}>
            Chogam Admin · Les modifications sont sauvegardées localement
          </p>
        </main>
      </div>

      {/* ─── Modals ──────────────────────────────────────────── */}
      <AnimatePresence>
        {(showAddModal || editProduct) && (
          <ProductModal
            key="modal"
            product={editProduct}
            onSave={(p) => {
              if (editProduct) updateProduct(p.id, p);
              else addProduct(p);
              setEditProduct(null);
              setShowAddModal(false);
            }}
            onClose={() => { setEditProduct(null); setShowAddModal(false); }}
          />
        )}
        {deleteTarget && (
          <ConfirmDialog
            key="confirm"
            name={deleteTarget.name}
            onConfirm={() => { deleteProduct(deleteTarget.id); setDeleteTarget(null); }}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
