"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, AlertCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { quickOrderSchema, WILAYAS, type QuickOrderFormValues } from "@/lib/validation/schemas";
import { GoldButton } from "@/components/ui/GoldButton";

interface QuickOrderFormProps {
  productName?: string;
  productNameAr?: string;
  onClose?: () => void;
}

const WA_NUMBER = "213554976933";

function buildWhatsAppMessage(data: QuickOrderFormValues): string {
  return encodeURIComponent(
    `🌟 *طلب جديد — شوجام*\n\n` +
    `👤 الاسم: ${data.fullName}\n` +
    `📱 الهاتف: ${data.phone}\n` +
    `📍 الولاية: ${data.wilaya}\n` +
    `🏠 العنوان: ${data.address}\n` +
    `🧴 المنتج: ${data.product}\n` +
    `🔢 الكمية: ${data.quantity}\n` +
    (data.note ? `📝 ملاحظة: ${data.note}\n` : "") +
    `\nشكراً لطلبكم! ✨`
  );
}

export function QuickOrderForm({
  productName = "Chogam",
  productNameAr = "Chogam",
  onClose,
}: QuickOrderFormProps) {
  const { t, dir } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<QuickOrderFormValues | null>(null);

  const displayProductName = productName;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuickOrderFormValues>({
    resolver: zodResolver(quickOrderSchema),
    defaultValues: {
      product: displayProductName,
      quantity: 1,
    },
  });

  const onSubmit = (data: QuickOrderFormValues) => {
    setFormData(data);
    setSubmitted(true);
  };

  const getErrorMessage = (error: string | undefined) => {
    if (!error) return null;
    const key = `form.errors.${error}`;
    const msg = t(key);
    return msg !== key ? msg : error;
  };

  const inputClass = `
    w-full bg-chogam-midnight border border-chogam-gold/20 text-chogam-white
    placeholder-chogam-goldSoft/30 px-4 py-3 font-sans text-sm
    focus:outline-none focus:border-chogam-gold/60 transition-colors duration-300
  `;
  const labelClass = "font-sans text-xs font-medium text-chogam-goldSoft/70 tracking-wider uppercase mb-1.5 block";
  const errorClass = "font-sans text-xs text-red-400 mt-1 flex items-center gap-1";

  return (
    <div className="bg-chogam-charcoal border border-chogam-gold/20 w-full max-w-lg" dir={dir}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-chogam-gold/15">
        <h2 className="font-serif text-lg font-semibold text-chogam-white">
          {t("form.orderSummary")}
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-chogam-goldSoft/50 hover:text-chogam-gold transition-colors duration-300"
            aria-label="Close form"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="px-6 py-6">
        <AnimatePresence mode="wait">
          {submitted && formData ? (
            // ─── Confirmation State ───────────────────────────────
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-14 h-14 rounded-full border border-chogam-gold/40 flex items-center justify-center">
                  <Check size={24} className="text-chogam-gold" />
                </div>
                <h3 className="font-serif text-xl text-chogam-white">{t("form.thankYou")}</h3>
                <p className="font-sans text-sm text-chogam-goldSoft/60 text-center">
                  {t("form.orderReceived")}
                </p>
              </div>

              {/* Order summary */}
              <div className="bg-chogam-midnight border border-chogam-gold/10 p-4 space-y-2">
                {[
                  { label: t("form.fullName"), value: formData.fullName },
                  { label: t("form.phone"), value: formData.phone },
                  { label: t("form.wilaya"), value: formData.wilaya },
                  { label: t("form.product"), value: formData.product },
                  { label: t("form.quantity"), value: String(formData.quantity) },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start gap-2 justify-between">
                    <span className="font-sans text-xs text-chogam-goldSoft/50 tracking-wide flex-shrink-0">
                      {label}
                    </span>
                    <span className="font-sans text-xs text-chogam-white text-end">{value}</span>
                  </div>
                ))}
              </div>

              {/* Confirm via WhatsApp */}
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${buildWhatsAppMessage(formData)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-500 text-white font-sans text-xs font-semibold tracking-widest uppercase py-3.5 px-6 flex items-center justify-center gap-2 transition-colors duration-300"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t("form.confirm")}
              </a>
            </motion.div>
          ) : (
            // ─── Form State ───────────────────────────────────────
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              noValidate
            >
              {/* Full Name */}
              <div>
                <label className={labelClass} htmlFor="fullName">
                  {t("form.fullName")} *
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="محمد بن علي"
                  className={inputClass}
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className={errorClass}>
                    <AlertCircle size={12} />
                    {getErrorMessage(errors.fullName.message)}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass} htmlFor="phone">
                  {t("form.phone")} *
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="0554976933"
                  dir="ltr"
                  className={`${inputClass} text-start`}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className={errorClass}>
                    <AlertCircle size={12} />
                    {getErrorMessage(errors.phone.message)}
                  </p>
                )}
              </div>

              {/* Wilaya */}
              <div>
                <label className={labelClass} htmlFor="wilaya">
                  {t("form.wilaya")} *
                </label>
                <select
                  id="wilaya"
                  className={`${inputClass} cursor-pointer`}
                  {...register("wilaya")}
                >
                  <option value="">اختر الولاية</option>
                  {WILAYAS.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
                {errors.wilaya && (
                  <p className={errorClass}>
                    <AlertCircle size={12} />
                    {getErrorMessage(errors.wilaya.message)}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className={labelClass} htmlFor="address">
                  {t("form.address")} *
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="البلدية والعنوان التفصيلي"
                  className={inputClass}
                  {...register("address")}
                />
                {errors.address && (
                  <p className={errorClass}>
                    <AlertCircle size={12} />
                    {getErrorMessage(errors.address.message)}
                  </p>
                )}
              </div>

              {/* Product + Quantity in a row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} htmlFor="product">
                    {t("form.product")}
                  </label>
                  <input
                    id="product"
                    type="text"
                    readOnly
                    className={`${inputClass} opacity-70 cursor-default`}
                    {...register("product")}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="quantity">
                    {t("form.quantity")}
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    min={1}
                    max={20}
                    dir="ltr"
                    className={inputClass}
                    {...register("quantity", { valueAsNumber: true })}
                  />
                  {errors.quantity && (
                    <p className={errorClass}>
                      <AlertCircle size={12} />
                      {getErrorMessage(errors.quantity.message)}
                    </p>
                  )}
                </div>
              </div>

              {/* Note */}
              <div>
                <label className={labelClass} htmlFor="note">
                  {t("form.note")}
                </label>
                <textarea
                  id="note"
                  rows={3}
                  placeholder="أي ملاحظات إضافية..."
                  className={`${inputClass} resize-none`}
                  {...register("note")}
                />
              </div>

              <GoldButton
                type="submit"
                variant="solid"
                size="lg"
                className="w-full mt-2"
                disabled={isSubmitting}
              >
                {t("form.submit")}
              </GoldButton>

              <p className="text-center font-sans text-xs text-chogam-goldSoft/30">
                سيتم التواصل معك للتأكيد • الدفع عند الاستلام
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
