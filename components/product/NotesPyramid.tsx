"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import type { Note } from "@/data/products";

interface NotesPyramidProps {
  topNotes: Note[];
  heartNotes: Note[];
  baseNotes: Note[];
}

const tiers = [
  {
    key: "top" as const,
    labelKey: "product.topNotes",
    bgClass: "bg-gradient-to-b from-chogam-gold/20 to-chogam-gold/10",
    borderClass: "border-chogam-gold/40",
    width: "55%",
    icon: "🌬",
  },
  {
    key: "heart" as const,
    labelKey: "product.heartNotes",
    bgClass: "bg-gradient-to-b from-chogam-goldMuted/15 to-chogam-goldMuted/8",
    borderClass: "border-chogam-goldMuted/30",
    width: "77%",
    icon: "💗",
  },
  {
    key: "base" as const,
    labelKey: "product.baseNotes",
    bgClass: "bg-gradient-to-b from-chogam-charcoal to-chogam-midnight",
    borderClass: "border-chogam-gold/20",
    width: "100%",
    icon: "🌍",
  },
];

export function NotesPyramid({ topNotes, heartNotes, baseNotes }: NotesPyramidProps) {
  const { t } = useI18n();

  const notesByTier = { top: topNotes, heart: heartNotes, base: baseNotes };

  return (
    <div className="flex flex-col items-center gap-0 w-full max-w-sm mx-auto">
      {tiers.map(({ key, labelKey, bgClass, borderClass, width, icon }, i) => (
        <motion.div
          key={key}
          className="w-full flex flex-col items-center"
          initial={{ opacity: 0, scaleX: 0.7 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.8,
            delay: i * 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            className={`${bgClass} border ${borderClass} border-b-0 px-4 py-5 flex flex-col items-center gap-3 transition-all duration-600 ease-luxury hover:brightness-110`}
            style={{ width }}
          >
            {/* Tier header */}
            <div className="flex items-center gap-2">
              <span className="text-lg">{icon}</span>
              <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-chogam-gold">
                {t(labelKey)}
              </h3>
            </div>

            {/* Note chips */}
            <div className="flex flex-wrap justify-center gap-2">
              {notesByTier[key].map((note) => (
                <span
                  key={note.name}
                  className="font-sans text-xs text-chogam-goldSoft/70 border border-chogam-gold/15 px-2.5 py-1 bg-black/20"
                >
                  {note.icon} {note.name}
                </span>
              ))}
            </div>
          </div>

          {/* Separator line */}
          {i < tiers.length - 1 && (
            <div
              className="h-px bg-chogam-gold/20"
              style={{ width }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
