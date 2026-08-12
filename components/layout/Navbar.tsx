"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useCartStore } from "@/lib/store/cart";
import Image from "next/image";

export function Navbar() {
  const { t, dir } = useI18n();
  const totalItems = useCartStore((s) => s.totalItems);
  const openCart = useCartStore((s) => s.openCart);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  const navBg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(11,19,32,0)", "rgba(11,19,32,0.85)"]
  );
  const navBlur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(16px)"]);
  const navBorder = useTransform(
    scrollY,
    [0, 80],
    ["rgba(212,175,55,0)", "rgba(212,175,55,0.12)"]
  );

  useEffect(() => {
    const unsub = scrollY.on("change", () => setMobileOpen(false));
    return unsub;
  }, [scrollY]);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/collection", label: t("nav.collection") },
    { href: "/#about", label: t("nav.about") },
    { href: "/#contact", label: t("nav.contact") },
  ];

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        backgroundColor: navBg,
        backdropFilter: navBlur,
        WebkitBackdropFilter: navBlur,
        borderBottomColor: navBorder,
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
      }}
      dir={dir}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Chogam — Accueil">
          <div className="relative w-9 h-9 transition-transform duration-600 ease-luxury group-hover:scale-110">
            <Image
              src="/brand/logo-chogam-gold.svg"
              alt="Logo Chogam"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-serif text-xl font-semibold tracking-widest text-chogam-white group-hover:text-chogam-gold transition-colors duration-300">
            CHOGAM
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-sans text-xs font-medium tracking-widest uppercase text-chogam-goldSoft/70 hover:text-chogam-gold transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 start-0 w-0 h-px bg-chogam-gold transition-all duration-400 ease-luxury group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Cart Button */}
          <button
            onClick={openCart}
            className="relative p-2 text-chogam-goldSoft/70 hover:text-chogam-gold transition-colors duration-300"
            aria-label={`${t("nav.cart")} (${totalItems()} article${totalItems() > 1 ? "s" : ""})`}
          >
            <ShoppingBag size={20} />
            <AnimatePresence>
              {totalItems() > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -end-0.5 w-4 h-4 rounded-full bg-chogam-gold text-chogam-midnight text-[10px] font-bold flex items-center justify-center"
                >
                  {totalItems()}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 text-chogam-goldSoft/70 hover:text-chogam-gold transition-colors duration-300"
            aria-label="Menu de navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass lg:hidden border-t border-chogam-gold/10 overflow-hidden"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-sans text-sm font-medium tracking-widest uppercase text-chogam-goldSoft/80 hover:text-chogam-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
