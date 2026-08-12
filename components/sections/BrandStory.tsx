"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BrandStory() {
  const { t, dir } = useI18n();

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
    },
  };

  return (
    <section
      className="relative py-24 lg:py-32 bg-chogam-charcoal overflow-hidden"
      dir={dir}
      id="about"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 radial-spotlight opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow={t("brand.eyebrow")}
              title={t("brand.title")}
              align="start"
            />

            <motion.p
              className="font-sans text-base text-chogam-goldSoft/70 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              {t("brand.description")}
            </motion.p>

            {/* Quote block */}
            <motion.blockquote
              className="relative border-s-2 border-chogam-gold ps-6 py-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            >
              {/* Giant decorative quote mark */}
              <span
                className="absolute -top-4 -start-2 font-serif text-7xl text-chogam-gold/15 leading-none select-none pointer-events-none"
                aria-hidden="true"
              >
                ❝
              </span>
              <p className="font-serif italic text-lg text-chogam-goldSoft/80 leading-relaxed">
                {t("brand.quote")}
              </p>
              <footer className="mt-3">
                <cite className="font-sans text-xs text-chogam-gold/70 tracking-widest uppercase not-italic">
                  — {t("brand.quoteAuthor")}
                </cite>
              </footer>
            </motion.blockquote>

            {/* Stats row */}
            <motion.div
              className="grid grid-cols-3 gap-4 pt-4 border-t border-chogam-gold/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            >
              {[
                { value: "+2000", label: "عميل سعيد" },
                { value: "100%", label: "أصل مضمون" },
                { value: "48h", label: "توصيل سريع" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="font-serif text-2xl font-semibold text-chogam-gold">
                    {value}
                  </p>
                  <p className="font-sans text-xs text-chogam-goldSoft/50 mt-1 tracking-wide">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Images grid */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              className="relative h-72 col-span-2 overflow-hidden"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <Image
                src="/products/bravento/bravento-box-bottle-duo.png"
                alt="Chogam Bravento box and bottle duo"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chogam-charcoal/40 to-transparent" />
            </motion.div>

            <motion.div
              className="relative h-48 overflow-hidden"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.2 }}
            >
              <Image
                src="/products/bravento/bravento-cap-macro.png"
                alt="Bravento cap detail"
                fill
                className="object-cover"
                sizes="25vw"
              />
            </motion.div>

            <motion.div
              className="relative h-48 overflow-hidden"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.35 }}
            >
              <Image
                src="/products/bravento/bravento-ingredients.png"
                alt="Bravento ingredients"
                fill
                className="object-cover"
                sizes="25vw"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
