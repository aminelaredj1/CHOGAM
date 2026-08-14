"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Minus, Plus, ShoppingBag, ChevronDown, Star,
  Truck, Shield, RotateCcw, Check, Heart, Share2,
  Package, Clock, BadgeCheck
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useUserProductStore } from "@/lib/store/userProducts";
import { NotesPyramid } from "@/components/product/NotesPyramid";
import { QuickOrderForm } from "@/components/product/QuickOrderForm";
import { ProductGrid } from "@/components/product/ProductGrid";
import { useCartStore } from "@/lib/store/cart";

const WA_NUMBER = "213554976933";
type TabKey = "description" | "ingredients" | "delivery";

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { t, dir } = useI18n();
  const { products, fetchProducts, isLoading, hasFetched } = useUserProductStore();
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>("description");
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // Sticky bar visibility
  useEffect(() => {
    const handleScroll = () => setStickyVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const product = products.find((p) => p.slug === params.slug);

  // Show skeleton while fetching for the first time
  if (isLoading || !hasFetched) {
    return (
      <div className="min-h-screen bg-[#0B1320] pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="h-[36rem] bg-[#111827] animate-pulse rounded-2xl" />
            <div className="flex flex-col gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-6 bg-[#111827] animate-pulse rounded-lg" style={{ width: `${80 - i * 10}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Only show not found AFTER fetch has completed
  if (!product) {
    return (
      <div className="min-h-screen bg-[#0B1320] flex items-center justify-center flex-col gap-4">
        <p className="font-serif text-3xl text-[#D4AF37]">Produit introuvable</p>
        <a href="/collection" className="text-sm text-[#94A3B8] hover:text-[#D4AF37] underline">← Retour à la collection</a>
      </div>
    );
  }

  const waMessage = encodeURIComponent(
    `Bonjour, je souhaite commander :\n🧴 ${product.name} (${product.size})\n🔢 Quantité : ${quantity}\n💰 Total : ${(product.price * quantity).toLocaleString("fr-DZ")} DZD\n\nNom : \nTéléphone : \nWilaya : `
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({ id: product.id, slug: product.slug, name: product.name, nameAr: product.nameAr, price: product.price, size: product.size, image: product.heroImage });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
    openCart();
  };

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  const tabContent: Record<TabKey, React.ReactNode> = {
    description: (
      <p className="text-sm text-[#94A3B8] leading-relaxed">{product.description}</p>
    ),
    ingredients: (
      <p className="text-xs text-[#94A3B8] leading-relaxed font-mono">{product.ingredients}</p>
    ),
    delivery: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { icon: <Truck size={18} />, title: "Livraison 48h", desc: "Partout en Algérie" },
          { icon: <Package size={18} />, title: "Paiement à la livraison", desc: "COD — Aucun prépaiement" },
          { icon: <RotateCcw size={18} />, title: "Retour gratuit", desc: "Sous 7 jours si non utilisé" },
          { icon: <Shield size={18} />, title: "Emballage luxe", desc: "Offert avec chaque commande" },
        ].map((item) => (
          <div key={item.title} className="flex items-start gap-3 bg-[#0B1320] border border-[#D4AF37]/10 rounded-xl p-4">
            <span className="text-[#D4AF37] mt-0.5 flex-shrink-0">{item.icon}</span>
            <div>
              <p className="text-white text-sm font-semibold">{item.title}</p>
              <p className="text-[#94A3B8] text-xs mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  };

  return (
    <div className="min-h-screen" style={{ background: "#0B1320" }} dir={dir}>

      {/* ─── Sticky Add to Cart Bar ──────────────────────────── */}
      <AnimatePresence>
        {stickyVisible && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            className="fixed top-0 inset-x-0 z-40 bg-[#0B1320]/95 backdrop-blur-xl border-b border-[#D4AF37]/15 px-4 py-3 flex items-center justify-between max-w-7xl mx-auto"
            style={{ top: "72px" }}
          >
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-[#D4AF37]/20 flex-shrink-0">
                <Image src={product.heroImage} alt={product.name} fill className="object-cover" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{product.name}</p>
                <p className="text-[#D4AF37] text-xs font-bold">{(product.price * quantity).toLocaleString("fr-DZ")} DZD</p>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0B1320] font-bold text-xs px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              <ShoppingBag size={14} />
              {addedToCart ? "Ajouté ✓" : "Ajouter au panier"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── HERO — Image + Info ──────────────────────────────── */}
      <section ref={heroRef} className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* ── Image Gallery ── */}
            <div className="flex flex-col gap-4 lg:sticky lg:top-28">
              {/* Main image */}
              <motion.div
                className="relative overflow-hidden rounded-2xl bg-[#111827] border border-[#D4AF37]/10"
                style={{ height: "28rem" }}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 start-4 z-10">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                      product.badge === "bestSeller" ? "bg-amber-500 text-black" :
                      product.badge === "newArrival" ? "bg-emerald-500 text-white" :
                      "bg-purple-500 text-white"
                    }`}>
                      {product.badge === "bestSeller" ? "⭐ Best Seller" : product.badge === "newArrival" ? "✨ Nouveauté" : "💎 Édition Limitée"}
                    </span>
                  </div>
                )}

                {/* Wishlist */}
                <button
                  onClick={() => setWishlisted(v => !v)}
                  className="absolute top-4 end-4 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/10 transition-colors hover:border-[#D4AF37]/40"
                >
                  <Heart size={15} className={wishlisted ? "text-red-400 fill-red-400" : "text-white/60"} />
                </button>

                {/* Share */}
                <button
                  onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
                  className="absolute top-16 end-4 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/10 transition-colors hover:border-[#D4AF37]/40"
                >
                  <Share2 size={14} className="text-white/60" />
                </button>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ scale: imageScale }}
                  >
                    <Image
                      src={product.images[selectedImage] ?? product.heroImage}
                      alt={product.name}
                      fill
                      className="object-contain mix-blend-lighten"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Gold glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320]/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-radial-gradient opacity-30 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.08), transparent)" }} />
              </motion.div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                        selectedImage === i
                          ? "ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-[#0B1320]"
                          : "opacity-50 hover:opacity-80"
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Product Info ── */}
            <motion.div
              className="flex flex-col gap-5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              {/* Brand + Name */}
              <div>
                <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[#D4AF37] mb-2">CHOGAM — Maison de Parfum</p>
                <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white leading-tight mb-2">{product.name}</h1>
                <p className="text-sm text-[#94A3B8] tracking-wider">{product.tagline}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.round(product.rating) ? "text-[#D4AF37] fill-[#D4AF37]" : "text-[#334155]"} />
                  ))}
                </div>
                <span className="text-white text-sm font-semibold">{product.rating}</span>
                <span className="text-[#94A3B8] text-xs">({product.reviewCount} avis)</span>
                <span className="text-emerald-400 text-xs flex items-center gap-1">
                  <BadgeCheck size={12} /> Avis vérifiés
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-serif font-bold" style={{ background: "linear-gradient(135deg, #BF953F, #FCF6BA, #B38728)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {(product.price * quantity).toLocaleString("fr-DZ")} DZD
                </span>
                {quantity > 1 && (
                  <span className="text-xs text-[#94A3B8]">{product.price.toLocaleString("fr-DZ")} × {quantity}</span>
                )}
              </div>

              <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)" }} />

              {/* Short description */}
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {product.description.slice(0, 180)}...
              </p>

              {/* Size badge */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#94A3B8] tracking-wider uppercase">Contenance :</span>
                <span className="text-xs font-bold text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 rounded-full">{product.size}</span>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-xs text-[#94A3B8] tracking-wider uppercase">{t("product.quantity")} :</span>
                <div className="flex items-center gap-0 border border-[#D4AF37]/25 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-[#94A3B8] hover:text-[#D4AF37] transition-colors"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="text-white text-sm font-bold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => Math.min(20, q + 1))}
                    className="w-10 h-10 flex items-center justify-center text-[#94A3B8] hover:text-[#D4AF37] transition-colors"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full h-14 rounded-2xl font-bold text-[#0B1320] text-sm tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
                  style={{ background: "linear-gradient(135deg, #D4AF37 0%, #F0CE6E 50%, #AA7C11 100%)" }}
                >
                  {addedToCart ? (
                    <><Check size={16} /> Ajouté au panier !</>
                  ) : (
                    <><ShoppingBag size={16} /> Ajouter au panier</>
                  )}
                </button>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-14 rounded-2xl font-bold text-white text-sm tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 active:scale-[0.98] border border-[#25D366]/30"
                  style={{ background: "linear-gradient(135deg, #128C7E, #25D366)" }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Commander via WhatsApp
                </a>

                {/* Quick order form */}
                <button
                  onClick={() => setShowOrderForm(v => !v)}
                  className="flex items-center justify-center gap-2 text-xs text-[#94A3B8] hover:text-[#D4AF37] transition-colors py-2 border border-[#D4AF37]/10 rounded-xl hover:border-[#D4AF37]/30"
                >
                  <ChevronDown size={13} className={`transition-transform ${showOrderForm ? "rotate-180" : ""}`} />
                  Commande directe (formulaire)
                </button>

                <AnimatePresence>
                  {showOrderForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <QuickOrderForm productName={product.name} productNameAr={product.nameAr} onClose={() => setShowOrderForm(false)} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Trust signals */}
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[#D4AF37]/10">
                {[
                  { icon: <Truck size={18} />, label: "Livraison 48h" },
                  { icon: <Package size={18} />, label: "Paiement livraison" },
                  { icon: <Shield size={18} />, label: "100% Authentique" },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5 text-center py-2">
                    <span className="text-[#D4AF37]">{icon}</span>
                    <span className="text-[10px] text-[#94A3B8]">{label}</span>
                  </div>
                ))}
              </div>

              {/* In stock indicator */}
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${product.inStock ? "bg-emerald-400" : "bg-red-400"}`} />
                <span className={`text-xs ${product.inStock ? "text-emerald-400" : "text-red-400"}`}>
                  {product.inStock ? "En stock — Expédié sous 24h" : "Rupture de stock"}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Notes Pyramid ────────────────────────────────────── */}
      {(product.topNotes?.length > 0 || product.heartNotes?.length > 0 || product.baseNotes?.length > 0) && (
        <section className="py-20" style={{ background: "#0F172A" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mb-3">Composition Olfactive</p>
              <h2 className="text-3xl font-serif font-bold text-white">La Pyramide des Notes</h2>
              <p className="text-sm text-[#94A3B8] mt-3 max-w-md mx-auto">Chaque note se révèle au fil du temps pour raconter un poème olfactif complet</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <NotesPyramid topNotes={product.topNotes} heartNotes={product.heartNotes} baseNotes={product.baseNotes} />
            </div>
          </div>
        </section>
      )}

      {/* ─── Tabs: Description / Ingrédients / Livraison ──────── */}
      <section className="py-16" style={{ background: "#0B1320" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex border-b border-[#D4AF37]/15 mb-8 overflow-x-auto">
            {(["description", "ingredients", "delivery"] as TabKey[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-sans text-xs tracking-widest uppercase px-6 py-4 border-b-2 transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab ? "border-[#D4AF37] text-[#D4AF37]" : "border-transparent text-[#94A3B8] hover:text-white"
                }`}
              >
                {tab === "description" ? "Description" : tab === "ingredients" ? "Ingrédients" : "Livraison & Retour"}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── Social Proof / Reviews ───────────────────────────── */}
      <section className="py-16" style={{ background: "#0F172A" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mb-3">Avis Clients</p>
          <h2 className="text-2xl font-serif font-bold text-white mb-8">Ce que disent nos clients</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: "Yacine M.", rating: 5, text: "Un parfum exceptionnel, tient toute la journée. Emballage luxueux.", wilaya: "Alger" },
              { name: "Samira B.", rating: 5, text: "Commande reçue en 24h, très satisfaite. Le parfum est magnifique.", wilaya: "Oran" },
              { name: "Karim D.", rating: 5, text: "Qualité premium, livraison rapide. Je recommande à 100%.", wilaya: "Constantine" },
            ].map((review) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#0B1320] border border-[#D4AF37]/10 rounded-2xl p-5 text-start"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} className="text-[#D4AF37] fill-[#D4AF37]" />)}
                </div>
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">"{review.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold text-xs">{review.name[0]}</div>
                  <div>
                    <p className="text-white text-xs font-semibold">{review.name}</p>
                    <p className="text-[#94A3B8] text-[10px]">{review.wilaya}</p>
                  </div>
                  <BadgeCheck size={14} className="text-emerald-400 ms-auto" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Related Products ─────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16" style={{ background: "#0B1320" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mb-3">Vous aimerez aussi</p>
              <h2 className="text-2xl font-serif font-bold text-white">{t("product.relatedProducts")}</h2>
            </div>
            <ProductGrid products={related} columns={3} />
          </div>
        </section>
      )}

      {/* ─── Final CTA Banner ─────────────────────────────────── */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #1a1200, #0B1320, #0a1a0a)" }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Clock size={28} className="text-[#D4AF37] mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-white mb-3">Commandez maintenant</h2>
          <p className="text-sm text-[#94A3B8] mb-6">Livraison gratuite • Paiement à la livraison • Retour facile</p>
          <button
            onClick={handleAddToCart}
            className="h-14 px-10 rounded-2xl font-bold text-[#0B1320] text-sm tracking-wider inline-flex items-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"
            style={{ background: "linear-gradient(135deg, #D4AF37, #F0CE6E, #AA7C11)" }}
          >
            <ShoppingBag size={16} />
            {product.name} — {product.price.toLocaleString("fr-DZ")} DZD
          </button>
        </div>
      </section>
    </div>
  );
}
