"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import { GoldButton } from "@/components/ui/GoldButton";
import { useUserProductStore } from "@/lib/store/userProducts";

export function FeaturedCollection() {
  const { t, dir } = useI18n();
  const products = useUserProductStore((s) => s.products);
  const featuredProducts = products.slice(0, 3);

  return (
    <section className="py-24 lg:py-32 bg-chogam-midnight" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow={t("featured.eyebrow")}
            title={t("featured.title")}
            subtitle={t("featured.subtitle")}
            align="start"
          />
          <GoldButton variant="outline" size="sm" href="/collection">
            {t("featured.viewAll")}
          </GoldButton>
        </div>

        <ProductGrid products={featuredProducts} columns={3} />
      </div>
    </section>
  );
}
