"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import type { CartItemType } from "@/types/cart"
import { formatCurrency } from "@/lib/utils"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="flex items-center border border-hw-border rounded-lg p-4 bg-hw-card shadow-sm hover:shadow-md transition-shadow">
      <div className="relative w-24 h-24 mr-4 bg-black rounded p-2">
        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain" />
      </div>

      <div className="flex-grow">
        <h3 className="font-racing text-white">{item.name}</h3>
        <p className="text-sm text-gray-400">{item.category}</p>
        <p className="font-medium mt-1 text-hw-yellow">{formatCurrency(item.price)}</p>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 border-hw-border text-hw-yellow hover:bg-hw-card-hover"
          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
          disabled={item.quantity <= 1}
        >
          <Minus className="h-4 w-4" />
          <span className="sr-only">Decrease quantity</span>
        </Button>

        <span className="w-8 text-center font-medium text-white">{item.quantity}</span>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 border-hw-border text-hw-yellow hover:bg-hw-card-hover"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Increase quantity</span>
        </Button>
      </div>

      <div className="ml-4 text-right">
        <p className="font-bold text-white">{formatCurrency(item.price * item.quantity)}</p>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-400 hover:bg-hw-card-hover mt-1 h-auto p-0"
          onClick={() => removeFromCart(item.id)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          <span className="text-xs">Remove</span>
        </Button>
      </div>
    </div>
  )
}
