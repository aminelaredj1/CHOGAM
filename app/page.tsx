"use client";

import React, { useEffect } from "react";
import { Hero } from "@/components/sections/Hero";
import { BrandStory } from "@/components/sections/BrandStory";
import { FeaturedCollection } from "@/components/sections/FeaturedCollection";
import { NotesPhilosophy } from "@/components/sections/NotesPhilosophy";
import { TestimonialCarousel } from "@/components/sections/Testimonials";
import { QuickOrderBanner } from "@/components/sections/QuickOrderBanner";
import { useUserProductStore } from "@/lib/store/userProducts";

export default function HomePage() {
  const fetchProducts = useUserProductStore((s) => s.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <Hero />
      <BrandStory />
      <FeaturedCollection />
      <NotesPhilosophy />
      <TestimonialCarousel />
      <QuickOrderBanner />
    </>
  );
}
