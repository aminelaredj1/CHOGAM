import { z } from "zod";

/**
 * Algerian phone validation:
 * Accepts: 0[5-7]XXXXXXXX (10 digits) or +213[5-7]XXXXXXXX
 * Normalizes to local format for display.
 */
export const algerianPhone = z
  .string()
  .regex(
    /^(\+?213|0)[5-7]\d{8}$/,
    "phoneInvalid"
  )
  .transform((val) => {
    // Normalize +213XXXXXXXXX → 0XXXXXXXXX
    if (val.startsWith("+213")) return "0" + val.slice(4);
    if (val.startsWith("213")) return "0" + val.slice(3);
    return val;
  });

export const WILAYAS = [
  "01 - Adrar",
  "02 - Chlef",
  "03 - Laghouat",
  "04 - Oum El Bouaghi",
  "05 - Batna",
  "06 - Béjaïa",
  "07 - Biskra",
  "08 - Béchar",
  "09 - Blida",
  "10 - Bouira",
  "11 - Tamanrasset",
  "12 - Tébessa",
  "13 - Tlemcen",
  "14 - Tiaret",
  "15 - Tizi Ouzou",
  "16 - Alger",
  "17 - Djelfa",
  "18 - Jijel",
  "19 - Sétif",
  "20 - Saïda",
  "21 - Skikda",
  "22 - Sidi Bel Abbès",
  "23 - Annaba",
  "24 - Guelma",
  "25 - Constantine",
  "26 - Médéa",
  "27 - Mostaganem",
  "28 - M'Sila",
  "29 - Mascara",
  "30 - Ouargla",
  "31 - Oran",
  "32 - El Bayadh",
  "33 - Illizi",
  "34 - Bordj Bou Arréridj",
  "35 - Boumerdès",
  "36 - El Tarf",
  "37 - Tindouf",
  "38 - Tissemsilt",
  "39 - El Oued",
  "40 - Khenchela",
  "41 - Souk Ahras",
  "42 - Tipaza",
  "43 - Mila",
  "44 - Aïn Defla",
  "45 - Naâma",
  "46 - Aïn Témouchent",
  "47 - Ghardaïa",
  "48 - Relizane",
  "49 - Timimoun",
  "50 - Bordj Badji Mokhtar",
  "51 - Ouled Djellal",
  "52 - Béni Abbès",
  "53 - In Salah",
  "54 - In Guezzam",
  "55 - Touggourt",
  "56 - Djanet",
  "57 - El M'Ghair",
  "58 - El Meniaa",
];

export const quickOrderSchema = z.object({
  fullName: z.string().min(2, "nameRequired"),
  phone: algerianPhone,
  wilaya: z.string().min(1, "wilayaRequired"),
  address: z.string().min(5, "addressRequired"),
  product: z.string().min(1),
  quantity: z.number().min(1, "quantityMin").max(20),
  note: z.string().optional(),
});

export type QuickOrderFormValues = z.infer<typeof quickOrderSchema>;
