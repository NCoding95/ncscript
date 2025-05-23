import { getSupabaseServerClient } from "@/lib/supabase"

export async function seedProducts() {
  const supabase = getSupabaseServerClient()

  const products = [
    {
      name: "2020 Dodge Charger Hellcat",
      category: "Muscle Cars",
      description: "Fast & Furious edition Dodge Charger Hellcat with detailed gray finish and black wheels.",
      price: 1500,
      image: "/images/products/dodge-charger-hellcat-gray.png",
      stock: 15,
      is_limited_edition: false,
      rarity: "Common",
    },
    {
      name: "2020 Dodge Charger Hellcat Purple",
      category: "Muscle Cars",
      description: "Stunning purple Dodge Charger Hellcat with racing stripes and gold wheels.",
      price: 1200,
      image: "/images/products/dodge-charger-hellcat-purple.png",
      stock: 20,
      is_limited_edition: false,
      rarity: "Common",
    },
    {
      name: "Speed Bump Art Car",
      category: "Sports Cars",
      description: "Colorful Speed Bump Hot Wheels art car with unique multi-color design.",
      price: 1800,
      image: "/images/products/speed-bump.png",
      stock: 10,
      is_limited_edition: false,
      rarity: "Uncommon",
    },
    {
      name: "2018 Dodge Challenger SRT Demon",
      category: "Muscle Cars",
      description: "Black Dodge Challenger SRT Demon with racing stripes and performance wheels.",
      price: 1700,
      image: "/images/products/dodge-challenger-srt.png",
      stock: 12,
      is_limited_edition: false,
      rarity: "Common",
    },
    {
      name: "2015 Dodge Charger SRT",
      category: "Muscle Cars",
      description: "Silver Mopar edition Dodge Charger SRT with black racing stripes.",
      price: 1600,
      image: "/images/products/dodge-charger-srt.png",
      stock: 18,
      is_limited_edition: false,
      rarity: "Common",
    },
    {
      name: "Classic TV Series Batmobile",
      category: "Movie Cars",
      description: "Iconic Batman Classic TV Series Batmobile with detailed features.",
      price: 2000,
      image: "/images/products/batmobile.png",
      stock: 8,
      is_limited_edition: true,
      rarity: "Rare",
    },
    {
      name: "Vintage Custom Muscle Car",
      category: "Muscle Cars",
      description: "Vintage Hot Wheels red muscle car with collector's button.",
      price: 2500,
      image: "/images/products/vintage-muscle-car.png",
      stock: 5,
      is_limited_edition: true,
      rarity: "Very Rare",
    },
    {
      name: "Hot Wheels 3-Window '34",
      category: "Muscle Cars",
      description: "Classic Hot Wheels 3-Window '34 with gold finish and flame detailing.",
      price: 1900,
      image: "/images/products/hot-wheels-34.png",
      stock: 14,
      is_limited_edition: false,
      rarity: "Uncommon",
    },
    {
      name: "Porsche 935 Boulevard",
      category: "Sports Cars",
      description: "Premium Hot Wheels Boulevard Porsche 935 in black and white racing livery.",
      price: 2200,
      image: "/images/products/porsche-935.png",
      stock: 7,
      is_limited_edition: true,
      rarity: "Rare",
    },
    {
      name: "Ford GT-40 - Ford Series",
      category: "Sports Cars",
      description: "Limited Edition 1/15,000 - Highly detailed with special wheels & tires and die-cast metal body.",
      price: 3500,
      image: "/images/products/ford-gt40-limited.jpeg",
      stock: 3,
      is_limited_edition: true,
      rarity: "Ultra Rare",
    },
    {
      name: "Rodger Dodger - Gold Edition",
      category: "Muscle Cars",
      description: "Classic muscle car with exposed engine and gold finish with racing number 22.",
      price: 2800,
      image: "/images/products/rodger-dodger-gold.jpeg",
      stock: 4,
      is_limited_edition: true,
      rarity: "Very Rare",
    },
    {
      name: "Limited Grip - Rod Squad",
      category: "Trucks",
      description: "Custom pickup truck with exposed engine and yellow wheels. Part of the Rod Squad series.",
      price: 2400,
      image: "/images/products/limited-grip-truck.jpeg",
      stock: 6,
      is_limited_edition: true,
      rarity: "Rare",
    },
  ]

  // Insert products
  const { data, error } = await supabase.from("products").insert(products)

  if (error) {
    console.error("Error seeding products:", error)
    return { success: false, error: error.message }
  }

  return { success: true, count: products.length }
}
