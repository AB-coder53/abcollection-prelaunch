import oversized from "@/assets/tee-oversized.jpg";
import regular from "@/assets/tee-regular.jpg";
import terry from "@/assets/tee-terry.jpg";
import acid from "@/assets/tee-acid.jpg";

export type Product = {
  id: string;
  name: string;
  fabric: string;
  image: string;
  tagline: string;
  description: string;
  details: string[];
  colors: string[];
  sizes: string[];
  price: string;
};

export const SIZES = ["S", "M", "L", "XL", "XXL"];

export const PRODUCTS: Product[] = [
  {
    id: "oversized-240",
    name: "The Oversized Tee",
    fabric: "240 GSM Premium Cotton",
    image: oversized,
    tagline: "Structured drape that holds its shape",
    description:
      "Heavyweight combed cotton with a boxy, intentional fall. Substantial enough to stand on its own, soft enough to live in all day.",
    details: ["Bio-washed combed cotton", "Ribbed collar, shoulder taped", "Pre-shrunk, colour-locked"],
    colors: ["Black", "Off White", "Warm Beige", "Charcoal", "Olive"],
    sizes: SIZES,
    price: "₹999 – ₹1,199",
  },
  {
    id: "regular-240",
    name: "The Regular Fit Tee",
    fabric: "240 GSM Premium Cotton",
    image: regular,
    tagline: "The everyday standard, refined",
    description:
      "A clean, true-to-size cut for work, travel and everything between. Tailored through the body without ever feeling tight.",
    details: ["240 GSM single jersey", "Straight hem, no roll", "Holds shape past 40 washes"],
    colors: ["Black", "White", "Warm Beige", "Charcoal"],
    sizes: SIZES,
    price: "₹899 – ₹1,099",
  },
  {
    id: "terry-260",
    name: "The French Terry Oversized",
    fabric: "260 GSM French Terry",
    image: terry,
    tagline: "Weight you can feel, softness you notice",
    description:
      "Loopback French terry with a quiet texture and a heavier hand. Our most comfortable piece, built for cooler evenings.",
    details: ["260 GSM loopback terry", "Dropped shoulder, relaxed body", "Brushed interior"],
    colors: ["Olive", "Charcoal", "Warm Beige", "Black"],
    sizes: SIZES,
    price: "₹1,299 – ₹1,499",
  },
  {
    id: "acid-wash",
    name: "The Acid Wash Oversized",
    fabric: "Premium Garment-Dyed Cotton",
    image: acid,
    tagline: "Character in every wash, no two alike",
    description:
      "A hand-finished acid wash on heavyweight cotton. Broken in from day one, with depth that keeps improving.",
    details: ["Garment-dyed and hand washed", "Unique tonal variation", "Softened, worn-in feel"],
    colors: ["Washed Black", "Washed Charcoal", "Washed Olive"],
    sizes: SIZES,
    price: "₹1,199 – ₹1,399",
  },
];
