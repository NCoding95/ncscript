"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { Package, Truck, CheckCircle, Clock, LogIn, Search, FileText } from "lucide-react"
import { getUserOrders } from "@/lib/db-service"

type OrderItem = {
  quantity: number
  price: number
  products: {
    id: string
    name: string
    image: string
    category: string
  }
}

type Order = {
  id: string
  created_at: string
  total: number
  status: string
  payment_method: string
  payment_status: string
  tracking_number: string | null
  tracking_courier: string | null
  items: OrderItem[]
}

export default function OrdersPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const fetchOrders = async () => {
      setIsLoading(true)
      try {
        const ordersData = await getUserOrders(user.id)
        setOrders(ordersData)
        if (ordersData.length > 0) {
          setSelectedOrder(ordersData[0])
        }
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [user, router])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-500"
      case "in_transit":
        return "text-blue-500"
      case "processing":
        return "text-yellow-500"
      case "cancelled":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in_transit":
        return <Truck className="h-5 w-5 text-blue-500" />
      case "processing":
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const formatOrderDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (!user) {
    return (
      <div className="bg-hw-dark min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-16 card-dark rounded-lg">
            <LogIn className="h-16 w-16 mx-auto text-gray-500 mb-4" />
            <h2 className="text-2xl font-racing mb-4 text-hw-yellow">Login Required</h2>
            <p className="text-gray-300 mb-6">Please login to view your orders</p>
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
        <h1 className="text-3xl font-racing mb-2 text-hw-yellow">My Orders</h1>
        <div className="h-1 w-20 bg-hw-red mb-8"></div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hw-red"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-black rounded-lg border border-hw-border">
            <Package className="h-16 w-16 mx-auto text-gray-500 mb-4" />
            <p className="text-xl mb-6 text-gray-300">You haven't placed any orders yet</p>
            <Link href="/shop">
              <Button className="bg-hw-red hover:bg-hw-orange text-white">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-black rounded-lg border border-hw-border overflow-hidden">
                <div className="p-4 border-b border-hw-border">
                  <h2 className="text-lg font-racing text-hw-yellow">Order History</h2>
                </div>
                <div className="divide-y divide-hw-border max-h-[600px] overflow-y-auto">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedOrder?.id === order.id ? "bg-hw-card" : "hover:bg-hw-darker"
                      }`}
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-white">Order #{order.id.substring(0, 8)}</p>
                          <p className="text-sm text-gray-400">{formatOrderDate(order.created_at)}</p>
                          <div className="flex items-center mt-2">
                            {getStatusIcon(order.status)}
                            <span className={`ml-1 text-sm ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace("_", " ")}
                            </span>
                          </div>
                        </div>
                        <p className="font-bold text-hw-yellow">{formatCurrency(order.total)}</p>
                      </div>
                      <div className="mt-2 flex -space-x-2 overflow-hidden">
                        {order.items.slice(0, 3).map((item, index) => (
                          <div
                            key={index}
                            className="inline-block h-8 w-8 rounded-full border border-hw-border bg-black overflow-hidden"
                          >
                            <Image
                              src={item.products.image || "/placeholder.svg"}
                              alt={item.products.name}
                              width={32}
                              height={32}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <span className="flex items-center justify-center h-8 w-8 rounded-full bg-hw-card text-xs text-white">
                            +{order.items.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              {selectedOrder ? (
                <div className="bg-black rounded-lg border border-hw-border">
                  <div className="p-4 border-b border-hw-border flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-racing text-hw-yellow">Order Details</h2>
                      <p className="text-sm text-gray-400">{formatOrderDate(selectedOrder.created_at)}</p>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(selectedOrder.status)}
                      <span className={`ml-1 ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1).replace("_", " ")}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 border-b border-hw-border">
                    <h3 className="font-medium text-white mb-3">Items</h3>
                    <div className="space-y-4">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="relative h-16 w-16 bg-black rounded p-1 mr-4 border border-hw-border">
                            <Image
                              src={item.products.image || "/placeholder.svg"}
                              alt={item.products.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-grow">
                            <p className="text-white">{item.products.name}</p>
                            <p className="text-sm text-gray-400">
                              {formatCurrency(item.price)} × {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium text-hw-yellow">{formatCurrency(item.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border-b border-hw-border">
                    <h3 className="font-medium text-white mb-3">Order Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-300">
                        <span>Subtotal</span>
                        <span>{formatCurrency(selectedOrder.total - 150)}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Shipping</span>
                        <span>{formatCurrency(150)}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Payment Method</span>
                        <span className="capitalize">{selectedOrder.payment_method.replace("_", " ")}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Payment Status</span>
                        <span className="capitalize">{selectedOrder.payment_status.replace("_", " ")}</span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t border-hw-border">
                        <span className="text-white">Total</span>
                        <span className="text-hw-yellow">{formatCurrency(selectedOrder.total)}</span>
                      </div>
                    </div>
                  </div>

                  {selectedOrder.tracking_number && (
                    <div className="p-4">
                      <h3 className="font-medium text-white mb-3">Tracking Information</h3>
                      <div className="bg-hw-darker p-3 rounded-lg border border-hw-border mb-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-400">Tracking Number</p>
                            <p className="text-white">{selectedOrder.tracking_number}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Courier</p>
                            <p className="text-white">{selectedOrder.tracking_courier}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-hw-border text-hw-yellow hover:bg-hw-card-hover"
                            onClick={() =>
                              window.open(
                                `https://www.jtexpress.ph/index/query/query.html?billcode=${selectedOrder.tracking_number}`,
                                "_blank",
                              )
                            }
                          >
                            <Search className="h-4 w-4 mr-1" />
                            Track
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-4 border-t border-hw-border flex justify-between">
                    <Button variant="outline" className="border-hw-border text-white hover:bg-hw-card-hover">
                      <FileText className="h-4 w-4 mr-1" />
                      Invoice
                    </Button>
                    <Button
                      className="bg-hw-red hover:bg-hw-orange text-white"
                      onClick={() => (window.location.href = "/contact")}
                    >
                      Need Help?
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-black rounded-lg border border-hw-border h-full flex items-center justify-center p-8">
                  <div className="text-center">
                    <Package className="h-16 w-16 mx-auto text-gray-500 mb-4" />
                    <p className="text-xl mb-2 text-white">Select an order to view details</p>
                    <p className="text-gray-400">Click on any order from the list to view its details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
