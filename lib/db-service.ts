import { getSupabaseBrowserClient } from "./supabase"
import type { Product } from "@/types/product"
import type { CartItemType } from "@/types/cart"

// Product Services
export async function getProductsFromDB() {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase.from("products").select("*")

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data as Product[]
}

export async function getProductByIdFromDB(id: string) {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching product:", error)
    return null
  }

  return data as Product
}

export async function getLimitedEditionsFromDB() {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_limited_edition", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching limited editions:", error)
    return []
  }

  return data as Product[]
}

// Order Services
export async function createOrder(
  userId: string,
  cartItems: CartItemType[],
  total: number,
  shippingInfo: {
    address: string
    city: string
    postalCode: string
    phone: string
  },
  paymentMethod: string,
) {
  const supabase = getSupabaseBrowserClient()

  // Create the order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        user_id: userId,
        total: total,
        shipping_address: shippingInfo.address,
        shipping_city: shippingInfo.city,
        shipping_postal_code: shippingInfo.postalCode,
        shipping_phone: shippingInfo.phone,
        payment_method: paymentMethod,
        payment_status: paymentMethod === "cod" ? "pending" : "paid",
        status: "processing",
      },
    ])
    .select()
    .single()

  if (orderError) {
    console.error("Error creating order:", orderError)
    return { success: false, error: orderError.message }
  }

  // Add order items
  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    price: item.price,
  }))

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

  if (itemsError) {
    console.error("Error adding order items:", itemsError)
    return { success: false, error: itemsError.message }
  }

  return { success: true, orderId: order.id }
}

export async function getUserOrders(userId: string) {
  const supabase = getSupabaseBrowserClient()

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (ordersError) {
    console.error("Error fetching orders:", ordersError)
    return []
  }

  // For each order, get the order items
  const ordersWithItems = await Promise.all(
    orders.map(async (order) => {
      const { data: items, error: itemsError } = await supabase
        .from("order_items")
        .select(`
          quantity,
          price,
          products (*)
        `)
        .eq("order_id", order.id)

      if (itemsError) {
        console.error("Error fetching order items:", itemsError)
        return { ...order, items: [] }
      }

      return { ...order, items }
    }),
  )

  return ordersWithItems
}

// Wishlist Services
export async function addToWishlist(userId: string, productId: string) {
  const supabase = getSupabaseBrowserClient()

  const { data, error } = await supabase.from("wishlists").insert([
    {
      user_id: userId,
      product_id: productId,
    },
  ])

  if (error) {
    console.error("Error adding to wishlist:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function removeFromWishlist(userId: string, productId: string) {
  const supabase = getSupabaseBrowserClient()

  const { error } = await supabase.from("wishlists").delete().eq("user_id", userId).eq("product_id", productId)

  if (error) {
    console.error("Error removing from wishlist:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function getUserWishlist(userId: string) {
  const supabase = getSupabaseBrowserClient()

  const { data, error } = await supabase
    .from("wishlists")
    .select(`
      product_id,
      products (*)
    `)
    .eq("user_id", userId)

  if (error) {
    console.error("Error fetching wishlist:", error)
    return []
  }

  return data.map((item) => item.products)
}

// Reviews Services
export async function addReview(userId: string, productId: string, rating: number, comment: string) {
  const supabase = getSupabaseBrowserClient()

  const { data, error } = await supabase.from("reviews").insert([
    {
      user_id: userId,
      product_id: productId,
      rating,
      comment,
    },
  ])

  if (error) {
    console.error("Error adding review:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function getProductReviews(productId: string) {
  const supabase = getSupabaseBrowserClient()

  const { data, error } = await supabase
    .from("reviews")
    .select(`
      *,
      profiles (full_name, avatar_url)
    `)
    .eq("product_id", productId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching reviews:", error)
    return []
  }

  return data
}

// Profile Services
export async function updateUserProfile(
  userId: string,
  profileData: {
    full_name?: string
    email?: string
    phone?: string
    avatar_url?: string
    address?: string
    city?: string
    postal_code?: string
  },
) {
  const supabase = getSupabaseBrowserClient()

  const { data, error } = await supabase.from("profiles").update(profileData).eq("id", userId).select().single()

  if (error) {
    console.error("Error updating profile:", error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

export async function getUserProfile(userId: string) {
  const supabase = getSupabaseBrowserClient()

  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error fetching profile:", error)
    return null
  }

  return data
}
