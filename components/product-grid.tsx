"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/types/product"
import { Flame } from "lucide-react"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory)

  const categories = ["All", "Muscle Cars", "Sports Cars", "Movie Cars"]

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              selectedCategory === category
                ? "bg-hw-red text-white shadow-lg shadow-red-500/30 scale-105"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {category === selectedCategory && <Flame className="h-4 w-4 inline mr-1" />}
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
