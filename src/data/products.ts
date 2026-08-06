import oversized from "@/assets/tee-oversized.jpg";
import regular from "@/assets/tee-regular.jpg";
import terryBeigeAsset from "@/assets/terry-beige.png.asset.json";
import terryBlackAsset from "@/assets/terry-black.png.asset.json";
import terryWhiteAsset from "@/assets/terry-white.png.asset.json";
import sunGreenAsset from "@/assets/Sun_faded_green.png.asset.json";
import sunGreen2Asset from "@/assets/Sun_faded_green_2.png.asset.json";
import sunGrey3Asset from "@/assets/Sun_faded_grey_3.png.asset.json";
import sunGrey2Asset from "@/assets/Sun_faded_grey_2.png.asset.json";

const terryBeige = terryBeigeAsset.url;
const terryBlack = terryBlackAsset.url;
const terryWhite = terryWhiteAsset.url;
const sunGreen = sunGreenAsset.url;
const sunGreen2 = sunGreen2Asset.url;
const sunGrey3 = sunGrey3Asset.url;
const sunGrey2 = sunGrey2Asset.url;
import lavaBlackAsset from "@/assets/lava-black.png.asset.json";
import lavaBlack2Asset from "@/assets/lava-black-2.png.asset.json";
import lavaGreyAsset from "@/assets/lava-grey.png.asset.json";

const lavaBlack = lavaBlackAsset.url;
const lavaBlack2 = lavaBlack2Asset.url;
const lavaGrey = lavaGreyAsset.url;
import regularWhiteAsset from "@/assets/regular-white.webp.asset.json";
import regularBlackAsset from "@/assets/regular-black.webp.asset.json";
import regularBrownAsset from "@/assets/regular-brown.webp.asset.json";

const regularWhite = regularWhiteAsset.url;
const regularBlack = regularBlackAsset.url;
const regularBrown = regularBrownAsset.url;
import terry300 from "@/assets/tee-terry300.jpg";
import terry300White from "@/assets/tee-terry300-white.jpg";

export type Product = {
  id: string;
  name: string;
  fabric: string;
  image: string;
  images?: string[];
  tagline: string;
  description: string;
  details: string[];
  colors: string[];
  sizes: string[];
  price: string;
};

export const SIZES = ["S", "M", "L", "XL", "XXL"];
export const SIZES_S_XL = ["S", "M", "L", "XL"];

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
    colors: ["Lavender", "Coffee-brown", "Maroon"],
    sizes: SIZES,
    price: "₹799/-",
  },
  {
    id: "regular-240",
    name: "The Regular Fit Tee",
    fabric: "240 GSM Premium Cotton",
    image: regularWhite,
    images: [regularWhite, regularBlack, regularBrown],
    tagline: "The everyday standard, refined",
    description:
      "A clean, true-to-size cut for work, travel and everything between. Tailored through the body without ever feeling tight.",
    details: ["240 GSM single jersey", "Straight hem, no roll", "Holds shape past 40 washes"],
    colors: ["Black", "White", "Coffee-brown"],
    sizes: SIZES,
    price: "₹699",
  },
  {
    id: "terry-260",
    name: "The French Terry Oversized",
    fabric: "260 GSM French Terry",
    image: terryBeige,
    images: [terryBeige, terryBlack, terryWhite],
    tagline: "Weight you can feel, softness you notice",
    description:
      "Loopback French terry with a quiet texture and a heavier hand. Our most comfortable piece, built for the whole day.",
    details: ["260 GSM loopback terry", "Dropped shoulder, relaxed body", "Brushed interior"],
    colors: ["Black", "White", "Biege"],
    sizes: SIZES_S_XL,
    price: "₹949/-",
  },
  {
    id: "terry-300",
    name: "The French Terry Oversized 300",
    fabric: "300 GSM French Terry",
    image: terry300,
    images: [terry300, terry300White],
    tagline: "Our heaviest hand, built to last",
    description:
      "A denser 300 GSM loopback terry with a sculpted, premium fall. The most substantial piece in the collection, and the one you'll reach for first.",
    details: ["300 GSM loopback terry", "Structured oversized silhouette", "Reinforced neck and shoulders"],
    colors: ["Black", "White"],
    sizes: SIZES_S_XL,
    price: "₹999/-",
  },
  {
    id: "sun-faded-240",
    name: "The Sun-Faded Tee",
    fabric: "240 GSM Special Wash Cotton",
    image: sunGreen,
    images: [sunGreen, sunGreen2, sunGrey3, sunGrey2],
    tagline: "Faded like a favourite, from day one",
    description:
      "A special sun-fade wash on 240 GSM cotton that gives every piece a softened, lived-in tone. Broken in before it reaches you.",
    details: ["240 GSM special wash cotton", "Tonal sun-faded finish", "Soft, worn-in hand feel"],
    colors: ["Green", "Grey"],
    sizes: SIZES_S_XL,
    price: "₹1,099/-",
  },
  {
    id: "acid-wash",
    name: "The Lava-sprayed Acid Wash Oversized",
    fabric: "Premium Garment-Dyed Cotton",
    image: lavaBlack,
    images: [lavaBlack, lavaBlack2, lavaGrey],
    tagline: "Character in every wash, no two alike",
    description:
      "A hand-finished acid wash on heavyweight cotton. Broken in from day one, with depth that keeps improving.",
    details: ["Garment-dyed and hand washed", "Unique tonal variation", "Softened, worn-in feel"],
    colors: ["Black", "Light Grey"],
    sizes: SIZES_S_XL,
    price: "₹1,199/-",
  },
];
