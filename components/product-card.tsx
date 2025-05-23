"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import type { Product } from "@/types/product"
import { formatCurrency } from "@/lib/utils"
import { ShoppingCart, Star, Check } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [isAdding, setIsAdding] = useState(false)

  const getCategoryClass = (category: string) => {
    switch (category) {
      case "Muscle Cars":
        return "muscle"
      case "Sports Cars":
        return "sports"
      case "Movie Cars":
        return "movie"
      default:
        return ""
    }
  }

  const handleAddToCart = () => {
    if (!user) {
      router.push("/login")
      return
    }

    setIsAdding(true)
    addToCart(product)

    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  return (
    <div className="product-card group">
      <div className="relative h-64 overflow-hidden bg-black">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-contain p-2 transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2">
          <span className={`category-badge ${getCategoryClass(product.category)}`}>{product.category}</span>
        </div>
      </div>

      <div className="p-4 bg-hw-card">
        <h3 className="font-racing text-lg mb-1 text-white">{product.name}</h3>

        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 text-hw-yellow fill-hw-yellow" />
            ))}
          </div>
          <span className="text-xs text-gray-400 ml-2">(24 reviews)</span>
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-hw-yellow">{formatCurrency(product.price)}</span>
          <Button
            onClick={handleAddToCart}
            size="sm"
            className={`transition-all duration-300 ${
              isAdding ? "bg-green-600 hover:bg-green-700" : "bg-hw-red hover:bg-hw-orange"
            } text-white`}
            disabled={isAdding}
          >
            {isAdding ? (
              <>
                <Check className="h-4 w-4 mr-1 animate-bounce" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
