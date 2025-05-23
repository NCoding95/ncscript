import { getSupabaseServerClient } from "@/lib/supabase"
import { v4 as uuidv4 } from "uuid"

export async function seedDatabase() {
  const supabase = getSupabaseServerClient()
  const results = {
    products: 0,
    profiles: 0,
    orders: 0,
    orderItems: 0,
  }

  // Step 1: Seed Products
  const products = [
    {
      id: uuidv4(),
      name: "2020 Dodge Charger Hellcat",
      category: "Muscle Cars",
      description: "Fast & Furious edition Dodge Charger Hellcat with detailed gray finish and black wheels.",
      price: 1500,
      image: "/images/products/dodge-charger-hellcat-gray.png",
      stock: 15,
      is_limited_edition: false,
      rarity: "Common",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      name: "2020 Dodge Charger Hellcat Purple",
      category: "Muscle Cars",
      description: "Stunning purple Dodge Charger Hellcat with racing stripes and gold wheels.",
      price: 1200,
      image: "/images/products/dodge-charger-hellcat-purple.png",
      stock: 20,
      is_limited_edition: false,
      rarity: "Common",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      name: "Speed Bump Art Car",
      category: "Sports Cars",
      description: "Colorful Speed Bump Hot Wheels art car with unique multi-color design.",
      price: 1800,
      image: "/images/products/speed-bump.png",
      stock: 10,
      is_limited_edition: false,
      rarity: "Uncommon",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      name: "2018 Dodge Challenger SRT Demon",
      category: "Muscle Cars",
      description: "Black Dodge Challenger SRT Demon with racing stripes and performance wheels.",
      price: 1700,
      image: "/images/products/dodge-challenger-srt.png",
      stock: 12,
      is_limited_edition: false,
      rarity: "Common",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      name: "2015 Dodge Charger SRT",
      category: "Muscle Cars",
      description: "Silver Mopar edition Dodge Charger SRT with black racing stripes.",
      price: 1600,
      image: "/images/products/dodge-charger-srt.png",
      stock: 18,
      is_limited_edition: false,
      rarity: "Common",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      name: "Classic TV Series Batmobile",
      category: "Movie Cars",
      description: "Iconic Batman Classic TV Series Batmobile with detailed features.",
      price: 2000,
      image: "/images/products/batmobile.png",
      stock: 8,
      is_limited_edition: true,
      rarity: "Rare",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      name: "Vintage Custom Muscle Car",
      category: "Muscle Cars",
      description: "Vintage Hot Wheels red muscle car with collector's button.",
      price: 2500,
      image: "/images/products/vintage-muscle-car.png",
      stock: 5,
      is_limited_edition: true,
      rarity: "Very Rare",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      name: "Hot Wheels 3-Window '34",
      category: "Muscle Cars",
      description: "Classic Hot Wheels 3-Window '34 with gold finish and flame detailing.",
      price: 1900,
      image: "/images/products/hot-wheels-34.png",
      stock: 14,
      is_limited_edition: false,
      rarity: "Uncommon",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      name: "Porsche 935 Boulevard",
      category: "Sports Cars",
      description: "Premium Hot Wheels Boulevard Porsche 935 in black and white racing livery.",
      price: 2200,
      image: "/images/products/porsche-935.png",
      stock: 7,
      is_limited_edition: true,
      rarity: "Rare",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      name: "Ford GT-40 - Ford Series",
      category: "Sports Cars",
      description: "Limited Edition 1/15,000 - Highly detailed with special wheels & tires and die-cast metal body.",
      price: 3500,
      image: "/images/products/ford-gt40-limited.jpeg",
      stock: 3,
      is_limited_edition: true,
      rarity: "Ultra Rare",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      name: "Rodger Dodger - Gold Edition",
      category: "Muscle Cars",
      description: "Classic muscle car with exposed engine and gold finish with racing number 22.",
      price: 2800,
      image: "/images/products/rodger-dodger-gold.jpeg",
      stock: 4,
      is_limited_edition: true,
      rarity: "Very Rare",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      name: "Limited Grip - Rod Squad",
      category: "Trucks",
      description: "Custom pickup truck with exposed engine and yellow wheels. Part of the Rod Squad series.",
      price: 2400,
      image: "/images/products/limited-grip-truck.jpeg",
      stock: 6,
      is_limited_edition: true,
      rarity: "Rare",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]

  // Insert products
  const { data: productsData, error: productsError } = await supabase.from("products").insert(products).select("id")

  if (productsError) {
    console.error("Error seeding products:", productsError)
    return { success: false, error: productsError.message, results }
  }

  results.products = products.length

  // Step 2: Seed Sample Profiles (if needed for testing)
  const profiles = [
    {
      id: uuidv4(),
      full_name: "John Collector",
      email: "john@example.com",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      full_name: "Maria Enthusiast",
      email: "maria@example.com",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      full_name: "Admin User",
      email: "admin@hotwheelsph.com",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]

  // Insert profiles
  const { data: profilesData, error: profilesError } = await supabase.from("profiles").insert(profiles).select("id")

  if (profilesError) {
    console.error("Error seeding profiles:", profilesError)
    // Continue even if profiles fail, as they might already exist
  } else {
    results.profiles = profiles.length
  }

  // Step 3: Seed Sample Orders
  if (productsData && productsData.length > 0 && (!profilesError || profilesData)) {
    const sampleProfiles = profilesError ? profiles : profilesData
    const sampleProducts = productsData

    // Create sample orders
    const orders = [
      {
        id: uuidv4(),
        user_id: sampleProfiles[0].id,
        total: 4700, // Will be calculated from items
        status: "delivered",
        payment_method: "card",
        payment_status: "paid",
        shipping_address: "123 Collector St",
        shipping_city: "Manila",
        shipping_postal_code: "1000",
        shipping_phone: "+63 912 345 6789",
        tracking_number: "JT123456789PH",
        tracking_courier: "J&T Express",
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
        updated_at: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(), // 28 days ago
      },
      {
        id: uuidv4(),
        user_id: sampleProfiles[0].id,
        total: 2000,
        status: "in_transit",
        payment_method: "gcash",
        payment_status: "paid",
        shipping_address: "123 Collector St",
        shipping_city: "Manila",
        shipping_postal_code: "1000",
        shipping_phone: "+63 912 345 6789",
        tracking_number: "JT987654321PH",
        tracking_courier: "J&T Express",
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      },
      {
        id: uuidv4(),
        user_id: sampleProfiles[1].id,
        total: 3700,
        status: "processing",
        payment_method: "cod",
        payment_status: "pending",
        shipping_address: "456 Enthusiast Ave",
        shipping_city: "Quezon City",
        shipping_postal_code: "1100",
        shipping_phone: "+63 923 456 7890",
        tracking_number: null,
        tracking_courier: null,
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      },
    ]

    // Insert orders
    const { data: ordersData, error: ordersError } = await supabase.from("orders").insert(orders).select("id")

    if (ordersError) {
      console.error("Error seeding orders:", ordersError)
      return { success: false, error: ordersError.message, results }
    }

    results.orders = orders.length

    // Step 4: Seed Order Items
    const orderItems = [
      // Items for first order
      {
        id: uuidv4(),
        order_id: orders[0].id,
        product_id: sampleProducts[0].id,
        quantity: 2,
        price: 1500,
        created_at: orders[0].created_at,
      },
      {
        id: uuidv4(),
        order_id: orders[0].id,
        product_id: sampleProducts[5].id,
        quantity: 1,
        price: 2000,
        created_at: orders[0].created_at,
      },
      // Items for second order
      {
        id: uuidv4(),
        order_id: orders[1].id,
        product_id: sampleProducts[5].id,
        quantity: 1,
        price: 2000,
        created_at: orders[1].created_at,
      },
      // Items for third order
      {
        id: uuidv4(),
        order_id: orders[2].id,
        product_id: sampleProducts[2].id,
        quantity: 1,
        price: 1800,
        created_at: orders[2].created_at,
      },
      {
        id: uuidv4(),
        order_id: orders[2].id,
        product_id: sampleProducts[3].id,
        quantity: 1,
        price: 1700,
        created_at: orders[2].created_at,
      },
    ]

    // Insert order items
    const { error: orderItemsError } = await supabase.from("order_items").insert(orderItems)

    if (orderItemsError) {
      console.error("Error seeding order items:", orderItemsError)
      return { success: false, error: orderItemsError.message, results }
    }

    results.orderItems = orderItems.length
  }

  return { success: true, results }
}
