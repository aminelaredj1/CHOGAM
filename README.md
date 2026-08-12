# CHOGAM (شوجام) — Luxury Perfume E-Commerce

A premium Next.js 14 e-commerce frontend for Chogam, an Algerian luxury fragrance house. Features cinematic dark/gold aesthetics, full RTL Arabic support, and a WhatsApp/COD-based Quick Order flow.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS with custom Chogam design tokens
- **Animation:** Framer Motion (parallax, scroll reveals, micro-interactions)
- **State:** Zustand (cart, persisted to localStorage)
- **Forms:** React Hook Form + Zod (Algerian phone validation)
- **Icons:** Lucide React
- **Fonts:** Playfair Display / Manrope / Cairo / Noto Naskh Arabic

## Project Structure

```
app/                    Next.js App Router pages
components/
  layout/               Navbar, Footer, FloatingContactButton, CartDrawer
  ui/                   GoldButton, SectionHeading, PriceTag, RatingStars, Badge
  product/              ProductCard, ProductGrid, NotesPyramid, QuickOrderForm
  sections/             Hero, BrandStory, FeaturedCollection, NotesPhilosophy,
                        Testimonials, QuickOrderBanner
lib/
  i18n/                 AR / FR / EN dictionaries + context hook
  store/                Zustand cart store
  validation/           Zod schemas (phone, order form)
data/
  products.ts           Mock product catalog (Bravento + 3 others)
public/
  brand/                Logo SVG
  products/bravento/    Product images (5 AI-generated scenes)
```

## Swapping in Real Assets

### Product Photography
Replace any file in `/public/products/bravento/` with real photography:
- `bravento-hero-marble.png` → Hero shot (used in Hero section, QuickOrderBanner bg)
- `bravento-box-bottle-duo.png` → Box/bottle duo (BrandStory grid)
- `bravento-cap-macro.png` → Cap macro detail (BrandStory grid)
- `bravento-lifestyle-smoke.png` → Lifestyle shot (NotesPhilosophy)
- `bravento-ingredients.png` → Ingredients flat-lay (BrandStory grid)

Images are referenced in `data/products.ts` — update paths there to add new products.

### Adding Products
Edit `data/products.ts`. Each product needs:
```typescript
{
  id, slug, name, nameAr, tagline, taglineAr,
  description, descriptionAr,
  price,           // DZD
  size,            // e.g. "100ml / 3.4 FL.OZ."
  category,        // "pour homme" | "pour femme" | "unisex"
  badge?,          // "bestSeller" | "newArrival" | "limited"
  images,          // array of paths
  heroImage,       // primary image path
  topNotes, heartNotes, baseNotes,   // Note[] with name, nameAr, icon
  ingredients,     // INCI string
  inStock, rating, reviewCount
}
```

### Wilaya List
All 58 Algerian wilayas are in `lib/validation/schemas.ts → WILAYAS`. Update as needed.

### Connecting to a Real Backend
The Quick Order form (`components/product/QuickOrderForm.tsx`) currently builds a WhatsApp URL on submit. To wire it to a real CRM/backend:

1. Replace the `onSubmit` handler body with an API call:
```typescript
const res = await fetch('/api/orders', {
  method: 'POST',
  body: JSON.stringify(data),
});
```
2. Create `app/api/orders/route.ts` with your business logic (email, Airtable, WhatsApp Business API, etc.)

### i18n Expansion
Add keys to `lib/i18n/ar.json`, `fr.json`, `en.json`. Access via the `t()` hook from `useI18n()`.

### Environment Variables (for future backend)
Create `.env.local`:
```
NEXT_PUBLIC_WA_NUMBER=213554976933
NEXT_PUBLIC_PHONE=0554976933
```

## Deployment (Vercel)

```bash
npm run build   # verify clean build
```

Push to GitHub → import in Vercel → auto-deploys on every push.

## WhatsApp / Order Contact

All customer-facing contact uses:
- **WhatsApp:** `https://wa.me/213554976933`
- **Phone:** `tel:0554976933`

These are defined as constants in:
- `components/layout/FloatingContactButton.tsx`
- `components/layout/CartDrawer.tsx`
- `components/sections/QuickOrderBanner.tsx`
- `components/product/QuickOrderForm.tsx`
