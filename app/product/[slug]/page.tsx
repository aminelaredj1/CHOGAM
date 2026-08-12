"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useUserProductStore } from "@/lib/store/userProducts";
import { NotesPyramid } from "@/components/product/NotesPyramid";
import { QuickOrderForm } from "@/components/product/QuickOrderForm";
import { ProductGrid } from "@/components/product/ProductGrid";
import { GoldButton } from "@/components/ui/GoldButton";
import { PriceTag, RatingStars, Badge } from "@/components/ui/index";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCartStore } from "@/lib/store/cart";

const WA_NUMBER = "213554976933";

type TabKey = "description" | "ingredients" | "delivery";

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { t, dir } = useI18n();
  const { products, fetchProducts } = useUserProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const product = products.find((p) => p.slug === params.slug);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>("description");
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    // If not loaded yet, show loading instead of 404 immediately
    return (
      <div className="min-h-screen bg-chogam-midnight flex items-center justify-center text-chogam-goldSoft">
        <p className="font-serif tracking-widest uppercase">Chargement...</p>
      </div>
    );
  }

  const waMessage = encodeURIComponent(
    `Bonjour, je souhaite commander :\n🧴 ${product.name} (${product.size})\n🔢 Quantité : ${quantity}\n💰 Total : ${product.price * quantity} DZD\n\nNom : \nTéléphone : \nWilaya : `
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        slug: product.slug,
        name: product.name,
        nameAr: product.nameAr,
        price: product.price,
        size: product.size,
        image: product.heroImage,
      });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
    openCart();
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: "description", label: t("product.description") },
    { key: "ingredients", label: t("product.ingredients") },
    { key: "delivery", label: t("product.delivery") },
  ];

  const tabContent: Record<TabKey, React.ReactNode> = {
    description: (
      <p className="font-sans text-sm text-chogam-goldSoft/70 leading-relaxed">
        {product.description}
      </p>
    ),
    ingredients: (
      <p className="font-sans text-xs text-chogam-goldSoft/70 leading-relaxed font-mono">
        {product.ingredients}
      </p>
    ),
    delivery: (
      <div className="space-y-3 font-sans text-sm text-chogam-goldSoft/70">
        <p>✅ Livraison dans toutes les wilayas d&apos;Algérie (48h)</p>
        <p>💳 Paiement à la livraison (COD)</p>
        <p>🔄 Retour gratuit sous 7 jours (produit non utilisé)</p>
        <p>📦 Emballage luxe offert avec chaque commande</p>
      </div>
    ),
  };

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-chogam-midnight pt-20" dir={dir}>
      {/* ─── Main Product Section ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ─── Image Gallery ──────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            <motion.div
              className="relative h-96 sm:h-[28rem] lg:h-[36rem] bg-chogam-charcoal border border-chogam-gold/10 overflow-hidden"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={product.images[selectedImage] ?? product.heroImage}
                    alt={`${product.name} — image ${selectedImage + 1}`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-chogam-midnight/30 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {product.badge && (
                <div className="absolute top-4 start-4 z-10">
                  <Badge type={product.badge} />
                </div>
              )}
            </motion.div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative flex-shrink-0 w-20 h-20 overflow-hidden transition-all duration-300 ${
                      selectedImage === i
                        ? "border-2 border-chogam-gold"
                        : "border border-chogam-gold/15 hover:border-chogam-gold/40"
                    }`}
                    aria-label={`Image ${i + 1}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─── Product Info ────────────────────────────────────── */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div>
              <p className="eyebrow-text mb-2">Chogam</p>
              <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-chogam-white mb-2">
                {product.name}
              </h1>
              <p className="font-sans text-sm text-chogam-goldSoft/50 tracking-wider">
                {product.tagline}
              </p>
            </div>

            <RatingStars value={product.rating} count={product.reviewCount} size={16} />

            <div className="flex items-end gap-3">
              <PriceTag amount={product.price * quantity} size="lg" />
              <span className="font-sans text-xs text-chogam-goldSoft/40 mb-1">
                {quantity > 1 ? `(${product.price} × ${quantity})` : ""}
              </span>
            </div>

            <div className="gold-divider" />

            <p className="font-sans text-sm text-chogam-goldSoft/70 leading-relaxed">
              {product.description.slice(0, 200)}...
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="font-sans text-xs text-chogam-goldSoft/60 tracking-wider uppercase">
                {t("product.quantity")}
              </span>
              <div className="flex items-center gap-3 border border-chogam-gold/25 px-3 py-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-chogam-goldSoft/60 hover:text-chogam-gold transition-colors"
                  aria-label="Réduire la quantité"
                >
                  <Minus size={14} />
                </button>
                <span className="font-sans text-sm text-chogam-white w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                  className="text-chogam-goldSoft/60 hover:text-chogam-gold transition-colors"
                  aria-label="Augmenter la quantité"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <GoldButton
                variant="solid"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
              >
                {addedToCart ? "✓ " + t("cart.itemAdded") : t("product.addToCart")}
              </GoldButton>
              <GoldButton
                variant="outline"
                size="lg"
                className="flex-1"
                href={waLink}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t("product.orderViaWhatsapp")}
              </GoldButton>
            </div>

            {/* Quick order form toggle */}
            <button
              onClick={() => setShowOrderForm((v) => !v)}
              className="flex items-center gap-2 font-sans text-xs text-chogam-goldSoft/50 hover:text-chogam-gold transition-colors duration-300 tracking-wider"
            >
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${showOrderForm ? "rotate-180" : ""}`}
              />
              Commande directe (formulaire)
            </button>

            <AnimatePresence>
              {showOrderForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <QuickOrderForm
                    productName={product.name}
                    productNameAr={product.nameAr}
                    onClose={() => setShowOrderForm(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-chogam-gold/10">
              {[
                { icon: "🚚", label: "Livraison 48h" },
                { icon: "💳", label: "Paiement à la livraison" },
                { icon: "✅", label: "100% Authentique" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                  <span className="text-xl">{icon}</span>
                  <span className="font-sans text-xs text-chogam-goldSoft/50">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Notes Pyramid ─────────────────────────────────────── */}
      <section className="bg-chogam-charcoal py-16 lg:py-24" dir={dir}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SectionHeading
              eyebrow="Composition Olfactive"
              title="La Pyramide des Notes"
              subtitle="Chaque note se révèle au fil du temps pour raconter un poème olfactif complet"
              align="start"
            />
            <NotesPyramid
              topNotes={product.topNotes}
              heartNotes={product.heartNotes}
              baseNotes={product.baseNotes}
            />
          </div>
        </div>
      </section>

      {/* ─── Description Tabs ──────────────────────────────────── */}
      <section className="py-16 bg-chogam-midnight" dir={dir}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex border-b border-chogam-gold/15 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
                  font-sans text-xs tracking-widest uppercase px-6 py-3 border-b-2 transition-all duration-300
                  ${activeTab === tab.key
                    ? "border-chogam-gold text-chogam-gold"
                    : "border-transparent text-chogam-goldSoft/50 hover:text-chogam-goldSoft/80"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── Related Products ──────────────────────────────────── */}
      <section className="py-16 bg-chogam-charcoal" dir={dir}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow=""
            title={t("product.relatedProducts")}
            align="start"
            className="mb-10"
          />
          <ProductGrid products={related} columns={3} />
        </div>
      </section>
    </div>
  );
}
