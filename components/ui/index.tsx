"use client";

import React from "react";
import { Star } from "lucide-react";


interface PriceTagProps {
  amount: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PriceTag({
  amount,
  currency = "DZD",
  size = "md",
  className = "",
}: PriceTagProps) {
  const formatted = new Intl.NumberFormat(
    "fr-DZ",
    { style: "decimal", minimumFractionDigits: 0 }
  ).format(amount);

  const sizeClass = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-3xl md:text-4xl",
  }[size];

  return (
    <span
      className={`font-serif font-semibold text-chogam-gold ${sizeClass} ${className}`}
      dir="ltr"
    >
      {formatted}
      <span className="text-chogam-goldMuted text-xs ms-1 font-sans font-medium tracking-wider">
        {currency}
      </span>
    </span>
  );
}

interface RatingStarsProps {
  value: number;
  max?: number;
  count?: number;
  size?: number;
  className?: string;
}

export function RatingStars({
  value,
  max = 5,
  count,
  size = 14,
  className = "",
}: RatingStarsProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`} aria-label={`Rating: ${value} out of ${max}`}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(value);
        const half = !filled && i < value;
        return (
          <Star
            key={i}
            size={size}
            className={
              filled
                ? "text-chogam-gold fill-chogam-gold"
                : half
                ? "text-chogam-gold fill-chogam-gold/50"
                : "text-chogam-gold/30"
            }
          />
        );
      })}
      {count !== undefined && (
        <span className="text-chogam-goldSoft/60 text-xs ms-1 font-sans">
          ({count})
        </span>
      )}
    </div>
  );
}

interface BadgeProps {
  type: "bestSeller" | "newArrival" | "limited";
  className?: string;
}

const badgeConfig = {
  bestSeller: {
    label: "Best Seller",
    className: "bg-chogam-gold text-chogam-midnight",
  },
  newArrival: {
    label: "Nouveauté",
    className: "bg-chogam-charcoal border border-chogam-gold text-chogam-gold",
  },
  limited: {
    label: "Édition Limitée",
    className: "bg-chogam-midnight border border-chogam-goldMuted text-chogam-goldMuted",
  },
};

export function Badge({ type, className = "" }: BadgeProps) {
  const config = badgeConfig[type];

  return (
    <span
      className={`
        inline-block font-sans text-xs font-semibold tracking-widest uppercase
        px-2.5 py-1 ${config.className} ${className}
      `}
    >
      {config.label}
    </span>
  );
}
