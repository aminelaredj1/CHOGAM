"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const WA_NUMBER = "213554976933";
const PHONE_NUMBER = "0554976933";

export function Footer() {
  const { t, dir } = useI18n();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("مرحباً شوجام، أود الاستفسار عن منتجاتكم")}`;

  return (
    <footer
      className="relative bg-chogam-charcoal border-t border-chogam-gold/15 overflow-hidden"
      dir={dir}
      id="contact"
    >
      {/* Radial spotlight */}
      <div className="absolute inset-0 radial-spotlight pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image src="/brand/logo-chogam-gold.svg" alt="Chogam" fill className="object-contain" />
              </div>
              <span className="font-serif text-xl font-semibold tracking-widest text-chogam-white">
                CHOGAM
              </span>
            </div>
            <p className="font-serif italic text-chogam-goldSoft/60 text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 border border-chogam-gold/20 flex items-center justify-center text-chogam-goldSoft/60 hover:text-chogam-gold hover:border-chogam-gold/50 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 border border-chogam-gold/20 flex items-center justify-center text-chogam-goldSoft/60 hover:text-chogam-gold hover:border-chogam-gold/50 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* Twitter / X */}
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 border border-chogam-gold/20 flex items-center justify-center text-chogam-goldSoft/60 hover:text-chogam-gold hover:border-chogam-gold/50 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-chogam-gold mb-6">
              {t("footer.links")}
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: t("nav.home") },
                { href: "/collection", label: t("nav.collection") },
                { href: "#about", label: t("nav.about") },
                { href: "#contact", label: t("nav.contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-chogam-goldSoft/60 hover:text-chogam-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div id="contact">
            <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-chogam-gold mb-6">
              {t("footer.contact")}
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-sans text-xs text-chogam-goldSoft/40 tracking-wider uppercase mb-1">
                  {t("footer.phone")}
                </p>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="font-serif text-lg text-chogam-gold hover:text-chogam-goldMuted transition-colors duration-300 flex items-center gap-2"
                >
                  <Phone size={14} />
                  {PHONE_NUMBER}
                </a>
              </div>
              <div>
                <p className="font-sans text-xs text-chogam-goldSoft/40 tracking-wider uppercase mb-1">
                  {t("footer.whatsapp")}
                </p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-green-400 hover:text-green-300 transition-colors duration-300"
                >
                  wa.me/{WA_NUMBER}
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-chogam-gold mb-3">
              {t("footer.newsletter")}
            </h3>
            <p className="font-sans text-xs text-chogam-goldSoft/50 mb-5 leading-relaxed">
              {t("footer.newsletterDesc")}
            </p>
            {subscribed ? (
              <p className="text-chogam-gold font-sans text-sm">✓ تم الاشتراك بنجاح</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.emailPlaceholder")}
                  required
                  className="bg-chogam-midnight border border-chogam-gold/20 text-chogam-white placeholder-chogam-goldSoft/30 px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-chogam-gold/60 transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="bg-chogam-gold text-chogam-midnight font-sans text-xs font-semibold tracking-widest uppercase py-2.5 px-4 hover:bg-chogam-goldMuted transition-colors duration-300"
                >
                  {t("footer.subscribe")}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-chogam-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-chogam-goldSoft/30 tracking-wider">
            © {new Date().getFullYear()} CHOGAM (شوجام). {t("footer.rights")}.
          </p>
          <div className="flex items-center gap-1">
            {/* Trust badges */}
            {["توصيل مجاني", "الدفع عند الاستلام", "منتج أصلي 100%"].map((badge) => (
              <span
                key={badge}
                className="font-sans text-xs text-chogam-goldSoft/40 border border-chogam-gold/10 px-2.5 py-1"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
