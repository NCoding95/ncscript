"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { seedDatabaseAction } from "@/app/actions/seed-database"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Database, ShieldAlert, CheckCircle, XCircle } from "lucide-react"

export default function AdminPage() {
  const [isSeeding, setIsSeeding] = useState(false)
  const [seedResults, setSeedResults] = useState<any>(null)
  const { toast } = useToast()

  const handleSeedDatabase = async () => {
    setIsSeeding(true)
    setSeedResults(null)

    try {
      const result = await seedDatabaseAction()
      setSeedResults(result)

      if (result.success) {
        toast({
          title: "Database Seeded Successfully",
          description: `Added ${result.results.products} products, ${result.results.orders} orders, and ${result.results.orderItems} order items.`,
          variant: "success",
        })
      } else {
        toast({
          title: "Seeding Failed",
          description: result.error || "An unknown error occurred",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error seeding database:", error)
      toast({
        title: "Seeding Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSeeding(false)
    }
  }

  return (
    <div className="bg-hw-dark min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <ShieldAlert className="h-8 w-8 text-hw-red mr-3" />
          <h1 className="text-3xl font-racing text-hw-yellow">Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black p-6 rounded-lg border border-hw-border">
            <h2 className="text-xl font-racing mb-4 text-hw-yellow flex items-center">
              <Database className="h-5 w-5 mr-2 text-hw-red" />
              Database Management
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-hw-darker rounded-lg border border-hw-border">
                <h3 className="font-medium text-white mb-2">Seed Database</h3>
                <p className="text-gray-400 text-sm mb-4">
                  This will populate the database with initial product data, sample profiles, and orders. Use this only
                  if the database is empty.
                </p>
                <Button
                  onClick={handleSeedDatabase}
                  disabled={isSeeding}
                  className="bg-hw-red hover:bg-hw-orange text-white"
                >
                  {isSeeding ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Seeding...
                    </>
                  ) : (
                    "Seed Database"
                  )}
                </Button>

                {seedResults && (
                  <div
                    className={`mt-4 p-3 rounded-lg ${seedResults.success ? "bg-green-900/30 border-green-800" : "bg-red-900/30 border-red-800"} border`}
                  >
                    <div className="flex items-start">
                      {seedResults.success ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                      )}
                      <div>
                        <p className={`text-sm font-medium ${seedResults.success ? "text-green-400" : "text-red-400"}`}>
                          {seedResults.success ? "Seeding Successful" : "Seeding Failed"}
                        </p>
                        {seedResults.success ? (
                          <div className="text-green-400/80 text-xs mt-1">
                            <p>Products: {seedResults.results.products}</p>
                            <p>Profiles: {seedResults.results.profiles}</p>
                            <p>Orders: {seedResults.results.orders}</p>
                            <p>Order Items: {seedResults.results.orderItems}</p>
                          </div>
                        ) : (
                          <p className="text-red-400/80 text-xs mt-1">{seedResults.error}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-hw-darker rounded-lg border border-hw-border">
                <h3 className="font-medium text-white mb-2">Manage Products</h3>
                <p className="text-gray-400 text-sm mb-4">View, edit, and delete products in the database.</p>
                <Button
                  onClick={() => (window.location.href = "/admin/products")}
                  className="bg-hw-red hover:bg-hw-orange text-white"
                >
                  Manage Products
                </Button>
              </div>

              <div className="p-4 bg-hw-darker rounded-lg border border-hw-border">
                <h3 className="font-medium text-white mb-2">Manage Orders</h3>
                <p className="text-gray-400 text-sm mb-4">View and update order status, add tracking information.</p>
                <Button
                  onClick={() => (window.location.href = "/admin/orders")}
                  className="bg-hw-red hover:bg-hw-orange text-white"
                >
                  Manage Orders
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-black p-6 rounded-lg border border-hw-border">
            <h2 className="text-xl font-racing mb-4 text-hw-yellow">System Status</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-hw-darker rounded-lg border border-hw-border">
                <span className="text-white">Database Connection</span>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-900 text-green-400">
                  Connected
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-hw-darker rounded-lg border border-hw-border">
                <span className="text-white">Supabase Authentication</span>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-900 text-green-400">Active</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-hw-darker rounded-lg border border-hw-border">
                <span className="text-white">Storage Service</span>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-900 text-green-400">Online</span>
              </div>

              <div className="mt-6">
                <h3 className="font-medium text-white mb-2">Database Tables</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-hw-darker rounded-lg border border-hw-border text-center">
                    <p className="text-gray-400 text-sm">Products</p>
                    <p className="text-2xl font-bold text-hw-yellow">✓</p>
                  </div>
                  <div className="p-3 bg-hw-darker rounded-lg border border-hw-border text-center">
                    <p className="text-gray-400 text-sm">Profiles</p>
                    <p className="text-2xl font-bold text-hw-yellow">✓</p>
                  </div>
                  <div className="p-3 bg-hw-darker rounded-lg border border-hw-border text-center">
                    <p className="text-gray-400 text-sm">Orders</p>
                    <p className="text-2xl font-bold text-hw-yellow">✓</p>
                  </div>
                  <div className="p-3 bg-hw-darker rounded-lg border border-hw-border text-center">
                    <p className="text-gray-400 text-sm">Order Items</p>
                    <p className="text-2xl font-bold text-hw-yellow">✓</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
