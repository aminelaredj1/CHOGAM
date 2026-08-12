export interface Note {
  name: string;    // French name used everywhere
  nameFr: string;  // alias (same value)
  nameAr: string;  // kept for data compat, NOT displayed
  icon: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;       // French display name
  nameAr: string;     // kept for compat, NOT displayed
  tagline: string;    // French tagline
  taglineAr: string;  // kept for compat, NOT displayed
  description: string;    // French description
  descriptionAr: string;  // kept for compat, NOT displayed
  price: number;
  currency: "DZD";
  size: string;
  category: "pour homme" | "pour femme" | "unisex";
  badge?: "bestSeller" | "newArrival" | "limited";
  images: string[];
  heroImage: string;
  topNotes: Note[];
  heartNotes: Note[];
  baseNotes: Note[];
  ingredients: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export const products: Product[] = [
  {
    id: "chogam-100ml",
    slug: "chogam",
    name: "Chogam",
    nameAr: "شوجام",
    tagline: "Eau de Parfum Pour Homme — 100ml",
    taglineAr: "او دو بارفان بور أوم — 100 مل",
    description:
      "Chogam est la fragrance signature audacieuse — conçue pour l'homme qui s'impose dans chaque pièce. Une ouverture électrisante de bergamote et poivre noir laisse place à un cœur puissant de oud fumé et de cuir, avant de se poser sur une base riche et durable d'ambre, de musc et de bois de santal.",
    descriptionAr:
      "شوجام هو التوقيع الجريء — عطر للرجل الذي يُسيطر على كل غرفة يدخلها.",
    price: 3500,
    currency: "DZD",
    size: "100ml / 3.4 FL.OZ.",
    category: "pour homme",
    badge: "bestSeller",
    images: [
      "/products/bravento/bravento-hero-marble.png",
      "/products/bravento/bravento-box-bottle-duo.png",
      "/products/bravento/bravento-cap-macro.png",
      "/products/bravento/bravento-lifestyle-smoke.png",
    ],
    heroImage: "/products/bravento/bravento-hero-marble.png",
    topNotes: [
      { name: "Bergamote", nameFr: "Bergamote", nameAr: "برغموت", icon: "🍋" },
      { name: "Poivre Noir", nameFr: "Poivre Noir", nameAr: "فلفل أسود", icon: "🌶" },
      { name: "Cardamome", nameFr: "Cardamome", nameAr: "هيل", icon: "🌿" },
    ],
    heartNotes: [
      { name: "Oud", nameFr: "Oud", nameAr: "عود", icon: "🪵" },
      { name: "Cuir", nameFr: "Cuir", nameAr: "جلد", icon: "🔶" },
      { name: "Vétiver", nameFr: "Vétiver", nameAr: "فيتيفر", icon: "🌾" },
    ],
    baseNotes: [
      { name: "Ambre", nameFr: "Ambre", nameAr: "عنبر", icon: "✨" },
      { name: "Musc", nameFr: "Musc", nameAr: "مسك", icon: "🌙" },
      { name: "Bois de Santal", nameFr: "Bois de Santal", nameAr: "خشب الصندل", icon: "🪵" },
    ],
    ingredients:
      "Alcohol Denat., Fragrance (Parfum), Aqua (Water), Benzyl Benzoate, Linalool, Limonene, Coumarin, Benzyl Salicylate, Citronellol, Alpha-Isomethyl Ionone.",
    inStock: true,
    rating: 4.9,
    reviewCount: 247,
  },
  {
    id: "nuit-orientale-100ml",
    slug: "nuit-orientale",
    name: "Nuit Orientale",
    nameAr: "نوي أورونتال",
    tagline: "Eau de Parfum — 100ml",
    taglineAr: "او دو بارفان — 100 مل",
    description:
      "Un voyage oriental sensuel à travers la rose sombre, le safran et la vanille chaude. Un parfum du soir d'un mystère rare.",
    descriptionAr:
      "رحلة شرقية حسية عبر الوردة الداكنة والزعفران والفانيليا الدافئة.",
    price: 3200,
    currency: "DZD",
    size: "100ml / 3.4 FL.OZ.",
    category: "unisex",
    badge: "newArrival",
    images: ["/products/bravento/bravento-ingredients.png"],
    heroImage: "/products/bravento/bravento-ingredients.png",
    topNotes: [
      { name: "Safran", nameFr: "Safran", nameAr: "زعفران", icon: "🌸" },
      { name: "Rose", nameFr: "Rose", nameAr: "ورد", icon: "🌹" },
      { name: "Poivre Rose", nameFr: "Poivre Rose", nameAr: "فلفل وردي", icon: "🌺" },
    ],
    heartNotes: [
      { name: "Oud", nameFr: "Oud", nameAr: "عود", icon: "🪵" },
      { name: "Jasmin", nameFr: "Jasmin", nameAr: "ياسمين", icon: "🌼" },
      { name: "Patchouli", nameFr: "Patchouli", nameAr: "باتشولي", icon: "🌿" },
    ],
    baseNotes: [
      { name: "Vanille", nameFr: "Vanille", nameAr: "فانيليا", icon: "🍦" },
      { name: "Ambre", nameFr: "Ambre", nameAr: "عنبر", icon: "✨" },
      { name: "Musc", nameFr: "Musc", nameAr: "مسك", icon: "🌙" },
    ],
    ingredients:
      "Alcohol Denat., Fragrance (Parfum), Aqua (Water), Linalool, Limonene, Geraniol, Citronellol, Eugenol.",
    inStock: true,
    rating: 4.7,
    reviewCount: 89,
  },
  {
    id: "azur-blanc-100ml",
    slug: "azur-blanc",
    name: "Azur Blanc",
    nameAr: "أزور بلان",
    tagline: "Eau de Parfum Pour Femme — 100ml",
    taglineAr: "او دو بارفان بور فام — 100 مل",
    description:
      "Une fragrance florale aquatique lumineuse inspirée de la côte méditerranéenne — néroli frais, pivoine blanche et bois de cèdre.",
    descriptionAr:
      "عطر مائي زهري مشرق مستوحى من الساحل المتوسطي.",
    price: 2900,
    currency: "DZD",
    size: "100ml / 3.4 FL.OZ.",
    category: "pour femme",
    images: ["/products/bravento/bravento-lifestyle-smoke.png"],
    heroImage: "/products/bravento/bravento-lifestyle-smoke.png",
    topNotes: [
      { name: "Néroli", nameFr: "Néroli", nameAr: "نيرولي", icon: "🌸" },
      { name: "Citron", nameFr: "Citron", nameAr: "ليمون", icon: "🍋" },
      { name: "Sel Marin", nameFr: "Sel Marin", nameAr: "ملح بحر", icon: "💧" },
    ],
    heartNotes: [
      { name: "Pivoine Blanche", nameFr: "Pivoine Blanche", nameAr: "فاوانيا بيضاء", icon: "🌼" },
      { name: "Iris", nameFr: "Iris", nameAr: "إيريس", icon: "🌷" },
      { name: "Jasmin", nameFr: "Jasmin", nameAr: "ياسمين", icon: "🌺" },
    ],
    baseNotes: [
      { name: "Cèdre", nameFr: "Cèdre", nameAr: "خشب الأرز", icon: "🌲" },
      { name: "Musc Blanc", nameFr: "Musc Blanc", nameAr: "مسك أبيض", icon: "🌙" },
      { name: "Ambrette", nameFr: "Ambrette", nameAr: "أمبريت", icon: "✨" },
    ],
    ingredients:
      "Alcohol Denat., Fragrance (Parfum), Aqua (Water), Linalool, Citronellol, Geraniol, Benzyl Alcohol.",
    inStock: true,
    rating: 4.6,
    reviewCount: 134,
  },
  {
    id: "roi-desert-100ml",
    slug: "roi-desert",
    name: "Roi du Désert",
    nameAr: "روا دو ديزير",
    tagline: "Eau de Parfum Pour Homme — 100ml",
    taglineAr: "او دو بارفان بور أوم — 100 مل",
    description:
      "Inspiré du Sahara algérien — les dunes infinies, le vent chaud, la liberté sauvage. Encens fumé, bois secs et résines précieuses.",
    descriptionAr:
      "مستوحى من الصحراء الجزائرية — الكثبان اللانهائية، الريح الدافئة.",
    price: 3800,
    currency: "DZD",
    size: "100ml / 3.4 FL.OZ.",
    category: "pour homme",
    badge: "limited",
    images: ["/products/bravento/bravento-box-bottle-duo.png"],
    heroImage: "/products/bravento/bravento-box-bottle-duo.png",
    topNotes: [
      { name: "Encens", nameFr: "Encens", nameAr: "بخور", icon: "🕯" },
      { name: "Cardamome", nameFr: "Cardamome", nameAr: "هيل", icon: "🌿" },
      { name: "Pamplemousse", nameFr: "Pamplemousse", nameAr: "كريب فروت", icon: "🍊" },
    ],
    heartNotes: [
      { name: "Oud", nameFr: "Oud", nameAr: "عود", icon: "🪵" },
      { name: "Myrrhe", nameFr: "Myrrhe", nameAr: "مر", icon: "🌑" },
      { name: "Cuir", nameFr: "Cuir", nameAr: "جلد", icon: "🔶" },
    ],
    baseNotes: [
      { name: "Benjoin", nameFr: "Benjoin", nameAr: "بنزوين", icon: "💫" },
      { name: "Labdanum", nameFr: "Labdanum", nameAr: "لبدانوم", icon: "🌿" },
      { name: "Ambre", nameFr: "Ambre", nameAr: "عنبر", icon: "✨" },
    ],
    ingredients:
      "Alcohol Denat., Fragrance (Parfum), Aqua (Water), Benzyl Benzoate, Eugenol, Linalool, Limonene, Coumarin.",
    inStock: true,
    rating: 4.8,
    reviewCount: 56,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const featuredProducts = products.slice(0, 3);
