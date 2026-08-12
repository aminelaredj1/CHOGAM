"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RatingStars } from "@/components/ui/index";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ahmed B.",
    location: "Alger",
    rating: 5,
    quote: "Chogam est extraordinaire — la combinaison oud et cuir est incomparable. La projection dure toute la journée. Du vrai luxe.",
  },
  {
    id: 2,
    name: "Fares Z.",
    location: "Oran",
    rating: 5,
    quote: "J'ai reçu tellement de compliments depuis que je porte Chogam. C'est un parfum qui fait tourner les têtes. Je ne changerai jamais.",
  },
  {
    id: 3,
    name: "Karim M.",
    location: "Constantine",
    rating: 5,
    quote: "La livraison était rapide et l'emballage très élégant. Le parfum lui-même dépasse toutes les attentes — force et raffinement réunis.",
  },
  {
    id: 4,
    name: "Youcef B.",
    location: "Annaba",
    rating: 5,
    quote: "Je commande régulièrement pour moi et comme cadeau. La qualité est toujours au rendez-vous. Chogam, c'est sérieux !",
  },
  {
    id: 5,
    name: "Saad B.",
    location: "Tlemcen",
    rating: 5,
    quote: "C'est ce que je cherchais depuis longtemps. Un parfum algérien vraiment luxueux — sans comparaison avec les marques étrangères.",
  },
];

export function TestimonialCarousel() {
  const { t, dir } = useI18n();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setActive((v) => (v + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive((v) => (v - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setTimeout(next, 5000);
    return () => clearTimeout(timer);
  }, [active, next]);

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 80 : -80,
      opacity: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
    },
    exit: (d: number) => ({
      x: d > 0 ? -80 : 80,
      opacity: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
    }),
  };

  const current = testimonials[active];

  return (
    <section
      className="py-24 lg:py-32 bg-chogam-midnight overflow-hidden"
      dir={dir}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("testimonials.eyebrow")}
          title={t("testimonials.title")}
          align="center"
          className="mb-16"
        />

        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-chogam-gold/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-chogam-gold/30 to-transparent" />

          <div className="py-12 px-6 sm:px-12">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col items-center gap-6 text-center"
              >
                <span
                  className="font-serif text-7xl text-chogam-gold/20 leading-none select-none"
                  aria-hidden="true"
                >
                  ❝
                </span>

                <blockquote className="max-w-2xl">
                  <p className="font-serif text-lg sm:text-xl md:text-2xl text-chogam-goldSoft/90 italic leading-relaxed">
                    {current.quote}
                  </p>
                </blockquote>

                <RatingStars value={current.rating} size={18} />

                <div className="flex flex-col items-center gap-1">
                  <cite className="font-serif text-base font-semibold text-chogam-white not-italic">
                    {current.name}
                  </cite>
                  <span className="font-sans text-xs text-chogam-goldSoft/40 tracking-wider">
                    {current.location}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 border border-chogam-gold/25 flex items-center justify-center text-chogam-goldSoft/60 hover:text-chogam-gold hover:border-chogam-gold/60 transition-all duration-300"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                  className={`transition-all duration-400 ease-luxury rounded-full ${
                    i === active
                      ? "w-6 h-1.5 bg-chogam-gold"
                      : "w-1.5 h-1.5 bg-chogam-gold/30 hover:bg-chogam-gold/60"
                  }`}
                  aria-label={`Témoignage ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 border border-chogam-gold/25 flex items-center justify-center text-chogam-goldSoft/60 hover:text-chogam-gold hover:border-chogam-gold/60 transition-all duration-300"
              aria-label="Témoignage suivant"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
