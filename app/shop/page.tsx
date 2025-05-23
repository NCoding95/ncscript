import { ProductGrid } from "@/components/product-grid"
import { getProducts } from "@/lib/products"

export default function ShopPage() {
  const products = getProducts()

  return (
    <div className="bg-hw-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-racing mb-4 text-hw-yellow">Shop Hot Wheels Collection</h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-300">
            Browse our exclusive collection of Hot Wheels cars. From muscle cars to movie replicas, find your next
            treasure.
          </p>
        </div>
      </div>

      <div className="bg-hw-darker py-12">
        <div className="container mx-auto px-4">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  )
}
