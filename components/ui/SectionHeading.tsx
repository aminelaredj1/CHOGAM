"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "start" | "center" | "end";
  className?: string;
  titleClassName?: string;
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
  titleClassName = "",
  light = false,
}: SectionHeadingProps) {
  const { dir } = useI18n();

  const alignClass = {
    start: "items-start text-start",
    center: "items-center text-center",
    end: "items-end text-end",
  }[align];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
    },
  };

  return (
    <motion.div
      className={`flex flex-col gap-3 ${alignClass} ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      dir={dir}
    >
      {eyebrow && (
        <motion.p className="eyebrow-text" variants={itemVariants}>
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        className={`heading-display text-3xl md:text-4xl lg:text-5xl ${
          light ? "text-chogam-white" : "text-chogam-white"
        } ${titleClassName}`}
        variants={itemVariants}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="text-chogam-goldSoft/70 text-base md:text-lg max-w-xl leading-relaxed"
          variants={itemVariants}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Gold hairline under heading */}
      <motion.div
        className="mt-2 h-px w-16 bg-gradient-to-r from-chogam-gold to-transparent"
        variants={itemVariants}
      />
    </motion.div>
  );
}
