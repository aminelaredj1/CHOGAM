"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Truck, Shield } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { GoldButton } from "@/components/ui/GoldButton";

const WA_NUMBER = "213554976933";
const PHONE_NUMBER = "0554976933";

export function QuickOrderBanner() {
  const { t, dir } = useI18n();

  const waMessage = encodeURIComponent(
    "مرحباً، أريد طلب براڤنتو من شوجام 🌟\nاسمي: \nالهاتف: \nالولاية: "
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  const features = [
    { icon: Truck, label: t("quickOrder.freeDelivery") },
    { icon: Phone, label: t("quickOrder.codPayment") },
    { icon: Shield, label: t("quickOrder.originalProduct") },
  ];

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden bg-chogam-charcoal"
      dir={dir}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/products/bravento/bravento-hero-marble.png"
          alt="Chogam Bravento background"
          fill
          className="object-cover object-center opacity-15"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-chogam-charcoal via-chogam-midnight/80 to-chogam-charcoal" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          className="flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow-text">{t("quickOrder.eyebrow")}</p>

          <h2 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-chogam-white">
            {t("quickOrder.title")}
          </h2>

          <p className="font-sans text-base text-chogam-goldSoft/60 max-w-xl leading-relaxed">
            {t("quickOrder.subtitle")}
          </p>

          {/* Feature icons */}
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {features.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 border border-chogam-gold/20 flex items-center justify-center">
                  <Icon size={20} className="text-chogam-gold" />
                </div>
                <span className="font-sans text-xs text-chogam-goldSoft/60 tracking-wider">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <GoldButton variant="solid" size="lg" href={waLink}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t("quickOrder.cta")}
            </GoldButton>
            <GoldButton variant="outline" size="lg" href={`tel:${PHONE_NUMBER}`}>
              <Phone size={16} />
              {t("quickOrder.call")}
            </GoldButton>
          </div>

          {/* Phone number display */}
          <motion.a
            href={`tel:${PHONE_NUMBER}`}
            className="font-serif text-2xl text-chogam-gold hover:text-chogam-goldMuted transition-colors duration-300 tracking-widest"
            whileHover={{ scale: 1.03 }}
          >
            {PHONE_NUMBER}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
