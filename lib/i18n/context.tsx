"use client";

import React, { createContext, useContext, useCallback } from "react";
import fr from "./fr.json";

export type Locale = "fr";

type DeepRecord = { [key: string]: string | DeepRecord };

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (path: string) => string;
  dir: "ltr";
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getNestedValue(obj: DeepRecord, path: string): string {
  const parts = path.split(".");
  let current: DeepRecord | string = obj;
  for (const part of parts) {
    if (typeof current === "string") return path;
    current = current[part];
    if (current === undefined) return path;
  }
  return typeof current === "string" ? current : path;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const t = useCallback((path: string) => getNestedValue(fr as DeepRecord, path), []);

  return (
    <I18nContext.Provider value={{ locale: "fr", setLocale: () => {}, t, dir: "ltr" }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
