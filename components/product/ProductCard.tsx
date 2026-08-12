"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import { useCartStore } from "@/lib/store/cart";
import { PriceTag, RatingStars, Badge } from "@/components/ui/index";
import { GoldButton } from "@/components/ui/GoldButton";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { t, dir } = useI18n();
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      nameAr: product.nameAr,
      price: product.price,
      size: product.size,
      image: product.heroImage,
    });
    openCart();
  };

  const waMessage = encodeURIComponent(
    `Bonjour, je souhaite commander: ${product.name} - ${product.size} - Prix: ${product.price} DZD`
  );
  const waLink = `https://wa.me/213554976933?text=${waMessage}`;

  return (
    <motion.article
      className="product-card group relative flex flex-col bg-chogam-charcoal border border-chogam-gold/10 hover:border-chogam-gold/30 overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      dir={dir}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 start-3 z-10">
          <Badge type={product.badge} />
        </div>
      )}

      {/* Image */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block h-72 sm:h-80 overflow-hidden bg-chogam-midnight"
        aria-label={`Voir ${product.name}`}
      >
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={product.heroImage}
            alt={`${product.name} — Chogam`}
            fill
            priority={priority}
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-chogam-midnight/80 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-chogam-gold/0 group-hover:bg-chogam-gold/5 transition-colors duration-600 ease-luxury" />
        </motion.div>

        {/* Quick View overlay */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <span className="glass border border-chogam-gold/30 text-chogam-gold font-sans text-xs tracking-widest uppercase px-4 py-2">
            {t("product.quickView")}
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="flex-1 flex flex-col p-5 gap-3">
        {/* Name + tagline */}
        <div>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif text-lg font-semibold text-chogam-white hover:text-chogam-gold transition-colors duration-300">
              {product.name}
            </h3>
          </Link>
          <p className="font-sans text-xs text-chogam-goldSoft/50 mt-0.5 tracking-wide">
            {product.tagline}
          </p>
        </div>

        {/* Notes teaser */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {product.topNotes.slice(0, 3).map((note) => (
            <span
              key={note.name}
              className="font-sans text-xs text-chogam-goldSoft/40 border border-chogam-gold/10 px-2 py-0.5"
            >
              {note.icon} {note.name}
            </span>
          ))}
        </div>

        <RatingStars value={product.rating} count={product.reviewCount} />

        {/* Price + actions */}
        <div className="mt-auto pt-3 border-t border-chogam-gold/10 flex items-center justify-between gap-2">
          <PriceTag amount={product.price} size="md" />
          <div className="flex items-center gap-2">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-chogam-gold/30 text-chogam-gold hover:bg-chogam-gold hover:text-chogam-midnight transition-all duration-300 p-2.5"
              aria-label={`Commander ${product.name} via WhatsApp`}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <button
              onClick={handleAddToCart}
              className="border border-chogam-gold/30 text-chogam-gold hover:bg-chogam-gold hover:text-chogam-midnight transition-all duration-300 p-2.5"
              aria-label={`Ajouter ${product.name} au panier`}
            >
              <ShoppingBag size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
