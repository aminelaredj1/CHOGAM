import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContactButton } from "@/components/layout/FloatingContactButton";
import { CartDrawer } from "@/components/layout/CartDrawer";

export const metadata: Metadata = {
  title: "CHOGAM (شوجام) — Maison de Parfum Algérienne de Luxe",
  description:
    "Chogam est une maison de parfum algérienne de luxe. Découvrez Bravento — Eau de Parfum Pour Homme, 100ml. Livraison partout en Algérie. الدفع عند الاستلام.",
  keywords: [
    "chogam",
    "شوجام",
    "parfum algérien",
    "عطر جزائري",
    "bravento",
    "براڤنتو",
    "eau de parfum",
    "luxe algérie",
    "عطور فاخرة",
  ],
  openGraph: {
    title: "CHOGAM — Maison de Parfum Algérienne",
    description: "Bravento — Eau de Parfum Pour Homme. الفخامة الجزائرية في كل رشة.",
    type: "website",
    locale: "ar_DZ",
  },
  icons: {
    icon: "/brand/logo-chogam-gold.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Manrope:wght@300;400;500;600;700&family=Cairo:wght@300;400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-chogam-midnight text-chogam-goldSoft antialiased">
        <I18nProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingContactButton />
          <CartDrawer />
        </I18nProvider>
      </body>
    </html>
  );
}
