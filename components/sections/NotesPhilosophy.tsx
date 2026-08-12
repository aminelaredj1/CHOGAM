"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoldButton } from "@/components/ui/GoldButton";
import { products } from "@/data/products";

const chogam = products[0];


const tierConfig = [
  {
    key: "top" as const,
    icon: "💫",
    width: "60%",
    delay: 0,
    color: "from-chogam-gold/30 to-chogam-gold/10",
  },
  {
    key: "heart" as const,
    icon: "🌹",
    width: "80%",
    delay: 0.15,
    color: "from-chogam-goldMuted/25 to-chogam-goldMuted/10",
  },
  {
    key: "base" as const,
    icon: "🪵",
    width: "100%",
    delay: 0.3,
    color: "from-chogam-charcoal to-chogam-midnight",
  },
];

export function NotesPhilosophy() {
  const { t, dir } = useI18n();

  return (
    <section
      className="py-24 lg:py-32 bg-chogam-charcoal relative overflow-hidden"
      dir={dir}
    >
      <div className="absolute inset-0 radial-spotlight opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Side */}
          <div className="flex flex-col gap-8 order-2 lg:order-1">
            <SectionHeading
              eyebrow={t("notes.eyebrow")}
              title={t("notes.title")}
              subtitle={t("notes.subtitle")}
              align="start"
            />

            {/* Three tiers */}
            <div className="space-y-6">
              {[
                { label: t("notes.top"), desc: t("notes.topDesc"), notes: chogam.topNotes, icon: "🌬" },
                { label: t("notes.heart"), desc: t("notes.heartDesc"), notes: chogam.heartNotes, icon: "💗" },
                { label: t("notes.base"), desc: t("notes.baseDesc"), notes: chogam.baseNotes, icon: "🌍" },
              ].map(({ label, desc, notes, icon }, i) => (
                <motion.div
                  key={label}
                  className="flex gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.12,
                  }}
                >
                  <div className="flex-shrink-0 w-10 h-10 border border-chogam-gold/20 group-hover:border-chogam-gold/50 flex items-center justify-center text-lg transition-colors duration-400 ease-luxury">
                    {icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-serif text-sm font-semibold text-chogam-gold">
                        {label}
                      </h3>
                    </div>
                    <p className="font-sans text-xs text-chogam-goldSoft/50 mb-2">
                      {desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {notes.map((note) => (
                        <span
                          key={note.name}
                          className="font-sans text-xs text-chogam-goldSoft/60 border border-chogam-gold/15 px-2 py-1"
                        >
                          {note.icon} {note.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <GoldButton variant="outline" size="md" href="/product/chogam">
              {t("notes.discover")}
            </GoldButton>
          </div>

          {/* Visual Pyramid */}
          <div className="flex flex-col items-center gap-2 order-1 lg:order-2">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/products/bravento/bravento-lifestyle-smoke.png"
                alt="شوجام — منتج العطر"
                width={440}
                height={440}
                className="object-contain drop-shadow-[0_30px_60px_rgba(212,175,55,0.15)]"
              />

              {/* Floating note pills around the image */}
              {[
                { note: chogam.topNotes[0], pos: "top-8 -start-12", delay: 0.4 },
                { note: chogam.heartNotes[0], pos: "top-1/2 -end-14", delay: 0.6 },
                { note: chogam.baseNotes[0], pos: "bottom-8 -start-14", delay: 0.8 },
              ].map(({ note, pos, delay }) => (
                <motion.div
                  key={note.name}
                  className={`absolute ${pos} glass border border-chogam-gold/25 px-3 py-1.5 hidden lg:flex items-center gap-1.5`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
                  animate={{ y: [0, -5, 0] }}
                >
                  <span className="text-sm">{note.icon}</span>
                  <span className="font-sans text-xs text-chogam-goldSoft/80">
                    {note.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
