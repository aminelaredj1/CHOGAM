"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import { useUserProductStore } from "@/lib/store/userProducts";

type Category = "all" | "pour homme" | "pour femme" | "unisex";
type SortKey = "default" | "price-asc" | "price-desc" | "rating";

const categoryLabels: Record<Category, string> = {
  all: "Tous",
  "pour homme": "Pour Homme",
  "pour femme": "Pour Femme",
  unisex: "Mixte",
};

const sortLabels: Record<SortKey, string> = {
  default: "Par défaut",
  "price-asc": "Prix croissant",
  "price-desc": "Prix décroissant",
  rating: "Mieux notés",
};

export default function CollectionPage() {
  const { dir } = useI18n();
  const [category, setCategory] = useState<Category>("all");
  const [sort, setSort] = useState<SortKey>("default");
  
  const { products, fetchProducts } = useUserProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }
    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [products, category, sort]);

  return (
    <div className="min-h-screen bg-chogam-midnight pt-24" dir={dir}>
      {/* Page Header */}
      <div className="bg-chogam-charcoal border-b border-chogam-gold/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Boutique Chogam"
            title="Notre Collection Complète"
            subtitle="Découvrez toute notre gamme de parfums de luxe"
            align="center"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter/Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-10">
          {/* Category Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {(Object.keys(categoryLabels) as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`
                  font-sans text-xs tracking-widest uppercase px-4 py-2 transition-all duration-300
                  ${category === cat
                    ? "bg-chogam-gold text-chogam-midnight font-semibold"
                    : "border border-chogam-gold/20 text-chogam-goldSoft/60 hover:border-chogam-gold/50 hover:text-chogam-gold"
                  }
                `}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-chogam-gold/60" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-chogam-charcoal border border-chogam-gold/20 text-chogam-goldSoft/70 font-sans text-xs tracking-wider px-3 py-2 focus:outline-none focus:border-chogam-gold/50 cursor-pointer"
              aria-label="Trier les produits"
            >
              {(Object.keys(sortLabels) as SortKey[]).map((k) => (
                <option key={k} value={k}>
                  {sortLabels[k]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <motion.p
          className="font-sans text-xs text-chogam-goldSoft/40 mb-8 tracking-wider"
          key={filtered.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {filtered.length} produit{filtered.length > 1 ? "s" : ""}
        </motion.p>

        {/* Grid */}
        <ProductGrid products={filtered} columns={4} />
      </div>
    </div>
  );
}
