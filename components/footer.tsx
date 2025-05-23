import Link from "next/link"
import { Facebook, Instagram, Twitter, Flame } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white flame-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-racing text-hw-yellow flex items-center mb-4">
              <Flame className="h-5 w-5 mr-2 text-hw-red" />
              Hot Wheels PH
            </h3>
            <p className="text-gray-400">
              Your premier destination for collectible Hot Wheels cars in the Philippines.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-racing text-hw-yellow mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-hw-yellow transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-hw-yellow transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-hw-yellow transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-400 hover:text-hw-yellow transition-colors">
                  My Orders
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-hw-yellow transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-racing text-hw-yellow mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping-policy" className="text-gray-400 hover:text-hw-yellow transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="text-gray-400 hover:text-hw-yellow transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-hw-yellow transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-hw-yellow transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-racing text-hw-yellow mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-hw-yellow transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-hw-yellow transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-hw-yellow transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
            <div className="mt-4">
              <p className="text-gray-400">Email: info@hotwheelsph.com</p>
              <p className="text-gray-400">Phone: +63 (2) 8123 4567</p>
            </div>
          </div>
        </div>

        <div className="border-t border-hw-border mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Hot Wheels PH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
