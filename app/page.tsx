import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70 z-10"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-4 h-screen flex flex-col justify-center items-center text-center">
        <div className="max-w-3xl">
          <h1 className="text-7xl md:text-8xl font-racing mb-6 text-hw-yellow drop-shadow-[0_2px_8px_rgba(255,204,0,0.5)]">
            Hot Wheels PH
          </h1>

          <div className="bg-black/70 p-6 rounded-lg backdrop-blur-sm mb-8 border border-hw-border">
            <p className="text-xl md:text-2xl text-white mb-6">
              Your premier destination for collectible Hot Wheels cars in the Philippines. Discover rare models, limited
              editions, and classic favorites.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button className="hot-wheels-button text-lg px-8 py-4 w-full sm:w-auto">Start Shopping</Button>
              </Link>

              <Link href="/contact">
                <Button
                  variant="outline"
                  className="bg-transparent backdrop-blur-sm border-hw-yellow text-hw-yellow hover:bg-white/10 text-lg px-8 py-4 w-full sm:w-auto"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          <div className="animate-bounce mt-12">
            <svg
              className="w-8 h-8 mx-auto text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="relative z-20 bg-hw-darker text-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-racing mb-12 text-center text-hw-yellow">Featured Collections</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-hw-red to-black p-6 rounded-lg text-center border border-hw-border">
              <h3 className="text-2xl font-racing mb-4">Muscle Cars</h3>
              <p className="mb-6 text-gray-300">
                Classic American muscle with iconic styling and powerful performance.
              </p>
              <Link href="/shop?category=Muscle%20Cars">
                <Button className="bg-black text-hw-red hover:bg-hw-yellow hover:text-black border border-hw-red">
                  View Collection
                </Button>
              </Link>
            </div>

            <div className="bg-gradient-to-b from-hw-blue to-black p-6 rounded-lg text-center border border-hw-border">
              <h3 className="text-2xl font-racing mb-4">Sports Cars</h3>
              <p className="mb-6 text-gray-300">Exotic supercars and sports models with sleek designs and speed.</p>
              <Link href="/shop?category=Sports%20Cars">
                <Button className="bg-black text-hw-blue hover:bg-hw-yellow hover:text-black border border-hw-blue">
                  View Collection
                </Button>
              </Link>
            </div>

            <div className="bg-gradient-to-b from-hw-yellow to-black p-6 rounded-lg text-center border border-hw-border">
              <h3 className="text-2xl font-racing mb-4">Movie Cars</h3>
              <p className="mb-6 text-gray-300">Iconic vehicles from your favorite movies and TV shows.</p>
              <Link href="/shop?category=Movie%20Cars">
                <Button className="bg-black text-hw-yellow hover:bg-hw-red hover:text-white border border-hw-yellow">
                  View Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
