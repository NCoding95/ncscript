import type { Product } from "@/types/product"

export function getProducts(): Product[] {
  return [
    {
      id: "1",
      name: "2020 Dodge Charger Hellcat",
      category: "Muscle Cars",
      description: "Fast & Furious edition Dodge Charger Hellcat with detailed gray finish and black wheels.",
      price: 1500,
      image: "/images/products/dodge-charger-hellcat-gray.png",
    },
    {
      id: "2",
      name: "2020 Dodge Charger Hellcat Purple",
      category: "Muscle Cars",
      description: "Stunning purple Dodge Charger Hellcat with racing stripes and gold wheels.",
      price: 1200,
      image: "/images/products/dodge-charger-hellcat-purple.png",
    },
    {
      id: "3",
      name: "Speed Bump Art Car",
      category: "Sports Cars",
      description: "Colorful Speed Bump Hot Wheels art car with unique multi-color design.",
      price: 1800,
      image: "/images/products/speed-bump.png",
    },
    {
      id: "4",
      name: "2018 Dodge Challenger SRT Demon",
      category: "Muscle Cars",
      description: "Black Dodge Challenger SRT Demon with racing stripes and performance wheels.",
      price: 1700,
      image: "/images/products/dodge-challenger-srt.png",
    },
    {
      id: "5",
      name: "2015 Dodge Charger SRT",
      category: "Muscle Cars",
      description: "Silver Mopar edition Dodge Charger SRT with black racing stripes.",
      price: 1600,
      image: "/images/products/dodge-charger-srt.png",
    },
    {
      id: "6",
      name: "Classic TV Series Batmobile",
      category: "Movie Cars",
      description: "Iconic Batman Classic TV Series Batmobile with detailed features.",
      price: 2000,
      image: "/images/products/batmobile.png",
    },
    {
      id: "7",
      name: "Vintage Custom Muscle Car",
      category: "Muscle Cars",
      description: "Vintage Hot Wheels red muscle car with collector's button.",
      price: 2500,
      image: "/images/products/vintage-muscle-car.png",
    },
    {
      id: "8",
      name: "Hot Wheels 3-Window '34",
      category: "Muscle Cars",
      description: "Classic Hot Wheels 3-Window '34 with gold finish and flame detailing.",
      price: 1900,
      image: "/images/products/hot-wheels-34.png",
    },
    {
      id: "9",
      name: "Porsche 935 Boulevard",
      category: "Sports Cars",
      description: "Premium Hot Wheels Boulevard Porsche 935 in black and white racing livery.",
      price: 2200,
      image: "/images/products/porsche-935.png",
    },
  ]
}
