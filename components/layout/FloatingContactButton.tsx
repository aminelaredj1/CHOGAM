"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const WA_NUMBER = "213554976933";
const PHONE_NUMBER = "0554976933";

export function FloatingContactButton() {
  const { t, dir } = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);

  const waMessage = encodeURIComponent(
    "مرحباً، أود الاستفسار عن عطر شوجام براڤنتو 🌟"
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  return (
    <div
      className="fixed bottom-6 end-6 z-50 flex flex-col items-end gap-3"
      dir={dir}
    >
      {/* Action Buttons (expanded state) */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* WhatsApp */}
            <motion.a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="flex items-center gap-2.5 glass border border-green-500/30 text-green-400 hover:text-green-300 hover:border-green-400/50 px-4 py-2.5 rounded-full text-xs font-sans font-medium tracking-wider transition-colors duration-300 shadow-dark-lg"
              aria-label={t("contact.whatsapp")}
            >
              <span>{t("contact.whatsapp")}</span>
              {/* WhatsApp SVG Icon */}
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </motion.a>

            {/* Phone Call */}
            <motion.a
              href={`tel:${PHONE_NUMBER}`}
              initial={{ opacity: 0, y: 16, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2.5 glass border border-chogam-gold/30 text-chogam-gold hover:text-chogam-goldMuted hover:border-chogam-gold/50 px-4 py-2.5 rounded-full text-xs font-sans font-medium tracking-wider transition-colors duration-300 shadow-dark-lg"
              aria-label={`${t("contact.call")} ${PHONE_NUMBER}`}
            >
              <span>{t("contact.call")}</span>
              <Phone size={16} />
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded((v) => !v)}
        className={`
          relative w-14 h-14 rounded-full flex items-center justify-center
          shadow-dark-xl transition-all duration-400 ease-luxury
          ${isExpanded
            ? "bg-chogam-charcoal border border-chogam-gold/40 text-chogam-gold"
            : "bg-chogam-gold text-chogam-midnight animate-pulse-gold"
          }
        `}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isExpanded ? "Close contact options" : "Open contact options"}
        aria-expanded={isExpanded}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
