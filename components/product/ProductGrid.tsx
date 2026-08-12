"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/data/products";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  columns?: 2 | 3 | 4;
}

function SkeletonCard() {
  return (
    <div className="bg-chogam-charcoal border border-chogam-gold/10 overflow-hidden">
      <div className="skeleton h-72 sm:h-80 w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="flex justify-between items-center pt-3">
          <div className="skeleton h-6 w-24 rounded" />
          <div className="skeleton h-9 w-20 rounded" />
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({
  products,
  loading = false,
  columns = 3,
}: ProductGridProps) {
  const { dir } = useI18n();

  const colClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }[columns];

  if (loading) {
    return (
      <div className={`grid ${colClass} gap-6`} dir={dir}>
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-24 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-16 h-16 border border-chogam-gold/20 rounded-full flex items-center justify-center">
          <span className="text-2xl">🌿</span>
        </div>
        <p className="font-serif text-lg text-chogam-goldSoft/50">
          لا توجد منتجات
        </p>
      </motion.div>
    );
  }

  return (
    <div className={`grid ${colClass} gap-6`} dir={dir}>
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < 2} />
      ))}
    </div>
  );
}
