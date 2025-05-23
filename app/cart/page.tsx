"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { CartItem } from "@/components/cart-item"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"
import { ShoppingCart, ArrowRight, LogIn } from "lucide-react"

export default function CartPage() {
  const { cart, total } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return (
      <div className="bg-hw-dark min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-16 card-dark rounded-lg">
            <LogIn className="h-16 w-16 mx-auto text-gray-500 mb-4" />
            <h2 className="text-2xl font-racing mb-4 text-hw-yellow">Login Required</h2>
            <p className="text-gray-300 mb-6">Please login to view your cart</p>
            <Link href="/login">
              <Button className="bg-hw-red hover:bg-hw-orange text-white">Login</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-hw-dark min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-racing mb-2 text-hw-yellow">Your Cart</h1>
        <div className="h-1 w-20 bg-hw-red mb-8"></div>

        {cart.length === 0 ? (
          <div className="text-center py-16 card-dark rounded-lg">
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-500 mb-4" />
            <p className="text-xl mb-6 text-gray-300">Your cart is empty</p>
            <Link href="/shop">
              <Button className="bg-hw-red hover:bg-hw-orange text-white">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="card-dark p-6 rounded-lg">
                <h2 className="text-xl font-racing mb-4 text-hw-yellow">Order Summary</h2>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span>{formatCurrency(150)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2 border-hw-border">
                    <div className="flex justify-between font-bold text-white">
                      <span>Total</span>
                      <span className="text-hw-yellow">{formatCurrency(total + 150)}</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="w-full bg-hw-red hover:bg-hw-orange text-white">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
