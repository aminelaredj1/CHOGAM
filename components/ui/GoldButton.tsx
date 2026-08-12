"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";

interface GoldButtonProps {
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
}

const variantStyles = {
  solid:
    "bg-chogam-gold text-chogam-midnight font-semibold hover:bg-chogam-goldMuted shadow-gold-glow-sm hover:shadow-gold-glow",
  outline:
    "border border-chogam-gold text-chogam-gold hover:bg-chogam-gold hover:text-chogam-midnight bg-transparent",
  ghost:
    "text-chogam-gold hover:text-chogam-goldMuted bg-transparent underline-offset-4 hover:underline",
};

const sizeStyles = {
  sm: "px-4 py-2 text-xs tracking-widest",
  md: "px-6 py-3 text-sm tracking-widest",
  lg: "px-8 py-4 text-sm tracking-widest",
};

export function GoldButton({
  variant = "solid",
  size = "md",
  href,
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
  "aria-label": ariaLabel,
}: GoldButtonProps) {
  const { dir } = useI18n();

  const baseClass = `
    inline-flex items-center justify-center gap-2
    font-sans uppercase tracking-widest
    transition-all duration-400 ease-luxury
    rounded-none focus-visible:ring-2 focus-visible:ring-chogam-gold
    focus-visible:ring-offset-2 focus-visible:ring-offset-chogam-midnight
    disabled:opacity-40 disabled:cursor-not-allowed
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `.replace(/\s+/g, " ").trim();

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  };

  if (href) {
    return (
      <motion.div {...motionProps} dir={dir}>
        <Link href={href} className={baseClass} aria-label={ariaLabel}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClass}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}
