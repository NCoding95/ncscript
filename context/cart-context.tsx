"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CartItemType } from "@/types/cart"
import type { Product } from "@/types/product"
import { useToast } from "@/components/ui/use-toast"

interface CartContextType {
  cart: CartItemType[]
  total: number
  addToCart: (product: Product) => void
  updateQuantity: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItemType[]>([])
  const [total, setTotal] = useState(0)
  const { toast } = useToast()

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))

    // Calculate total
    const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setTotal(newTotal)
  }, [cart])

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)

      if (existingItem) {
        // If item already exists, increase quantity
        const updatedCart = prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )

        toast({
          title: "Item quantity updated",
          description: `${product.name} quantity increased to ${existingItem.quantity + 1}`,
          variant: "default",
        })

        return updatedCart
      } else {
        // Otherwise add new item
        toast({
          title: "Item added to cart",
          description: `${product.name} has been added to your cart`,
          variant: "success",
        })

        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === id)
      const updatedCart = prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))

      if (item) {
        toast({
          title: "Quantity updated",
          description: `${item.name} quantity updated to ${quantity}`,
          variant: "default",
        })
      }

      return updatedCart
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === id)
      const updatedCart = prevCart.filter((item) => item.id !== id)

      if (item) {
        toast({
          title: "Item removed",
          description: `${item.name} has been removed from your cart`,
          variant: "destructive",
        })
      }

      return updatedCart
    })
  }

  const clearCart = () => {
    setCart([])
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
      variant: "default",
    })
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
