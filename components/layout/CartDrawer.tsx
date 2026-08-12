"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useCartStore } from "@/lib/store/cart";
import { GoldButton } from "@/components/ui/GoldButton";
import { PriceTag } from "@/components/ui/index";

export function CartDrawer() {
  const { t, dir } = useI18n();
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } =
    useCartStore();

  const waMessage = (summary: string) =>
    encodeURIComponent(`مرحباً، أريد تأكيد طلبي:\n${summary}`);

  const buildOrderSummary = () => {
    return items
      .map((item) => `• ${item.name} × ${item.quantity} = ${item.price * item.quantity} DZD`)
      .join("\n");
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="drawer"
            dir={dir}
            className="fixed top-0 end-0 h-full w-full max-w-sm z-50 flex flex-col glass border-s border-chogam-gold/15"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-chogam-gold/15">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-chogam-gold" />
                <h2 className="font-serif text-lg font-semibold text-chogam-white">
                  {t("cart.title")}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="text-chogam-goldSoft/60 hover:text-chogam-gold transition-colors duration-300 p-1"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-48 gap-3"
                  >
                    <ShoppingBag size={40} className="text-chogam-gold/30" />
                    <p className="text-chogam-goldSoft/50 text-sm font-sans text-center">
                      {t("cart.empty")}
                    </p>
                    <p className="text-chogam-goldSoft/30 text-xs font-sans text-center">
                      {t("cart.emptyDesc")}
                    </p>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="flex gap-4 py-4 border-b border-chogam-gold/10"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-18 h-22 flex-shrink-0 overflow-hidden bg-chogam-charcoal">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="72px"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p className="font-serif text-sm font-medium text-chogam-white">
                            {item.name}
                          </p>
                          <p className="text-chogam-goldSoft/50 text-xs font-sans mt-0.5">
                            {item.size}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity stepper */}
                          <div className="flex items-center gap-2 border border-chogam-gold/20 rounded-none p-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-chogam-goldSoft/60 hover:text-chogam-gold transition-colors p-0.5"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-chogam-white text-xs font-sans w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-chogam-goldSoft/60 hover:text-chogam-gold transition-colors p-0.5"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <PriceTag amount={item.price * item.quantity} size="sm" />
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="self-start text-chogam-goldSoft/30 hover:text-red-400 transition-colors duration-300 p-1"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-chogam-gold/15 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm font-medium text-chogam-goldSoft/70 tracking-wider uppercase">
                    {t("cart.subtotal")}
                  </span>
                  <PriceTag amount={totalPrice()} size="md" />
                </div>
                <GoldButton
                  variant="solid"
                  size="lg"
                  className="w-full"
                  href={`https://wa.me/213554976933?text=${waMessage(buildOrderSummary())}`}
                >
                  {t("cart.proceedToOrder")}
                </GoldButton>
                <button
                  onClick={closeCart}
                  className="w-full font-sans text-xs text-chogam-goldSoft/50 hover:text-chogam-gold transition-colors duration-300 tracking-wider uppercase text-center"
                >
                  {t("cart.continueShopping")}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
