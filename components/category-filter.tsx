"use client"

import { useState } from "react"

interface CategoryFilterProps {
  categories: string[]
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h2 className="font-semibold text-lg mb-4">Categories</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category} className="flex items-center">
            <input
              type="radio"
              id={category}
              name="category"
              checked={selectedCategory === category}
              onChange={() => setSelectedCategory(category)}
              className="mr-2"
            />
            <label htmlFor={category} className="text-gray-700 cursor-pointer">
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
