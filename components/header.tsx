"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { ShoppingCart, Menu, X, Flame, User, LogOut, Package, HelpCircle, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { cart } = useCart()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Collector's Corner", href: "/collectors-corner" },
    { name: "Contact", href: "/contact" },
  ]

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 bg-black shadow-lg flame-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <Flame className="h-6 w-6 mr-2 text-hw-red" />
              <span className="text-2xl font-racing text-hw-yellow whitespace-nowrap">Hot Wheels PH</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors font-racing tracking-wide",
                  pathname === item.href ? "text-hw-yellow" : "text-white hover:text-hw-yellow",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-hw-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full bg-hw-card border border-hw-border">
                    <User className="h-5 w-5 text-hw-yellow" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-hw-card border-hw-border text-white">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-hw-border" />
                  <DropdownMenuItem className="text-white hover:bg-hw-card-hover">
                    <span>{user.name}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-hw-card-hover">
                    <Link href="/orders" className="flex items-center w-full">
                      <Package className="h-4 w-4 mr-2" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-hw-card-hover">
                    <Link href="/faq" className="flex items-center w-full">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      FAQ
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-hw-card-hover">
                    <Link href="/collectors-corner" className="flex items-center w-full">
                      <Award className="h-4 w-4 mr-2" />
                      Collector's Corner
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-hw-border" />
                  <DropdownMenuItem
                    className="text-hw-red hover:bg-hw-card-hover cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-white hover:text-hw-yellow hover:bg-transparent">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-hw-red hover:bg-hw-orange text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 md:hidden backdrop-blur-sm">
          <div className="bg-hw-dark h-full w-64 p-4 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-racing text-hw-yellow">Hot Wheels PH</span>
              <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-racing tracking-wide transition-colors p-2 rounded",
                    pathname === item.href
                      ? "text-hw-yellow bg-black/50"
                      : "text-white hover:text-hw-yellow hover:bg-black/30",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-hw-border">
                {user ? (
                  <>
                    <div className="px-2 py-1 text-hw-yellow font-medium">{user.name}</div>
                    <Link
                      href="/orders"
                      className="block p-2 text-white hover:text-hw-yellow hover:bg-black/30 rounded"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Package className="h-4 w-4 inline mr-2" />
                      My Orders
                    </Link>
                    <Link
                      href="/faq"
                      className="block p-2 text-white hover:text-hw-yellow hover:bg-black/30 rounded"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <HelpCircle className="h-4 w-4 inline mr-2" />
                      FAQ
                    </Link>
                    <Link
                      href="/collectors-corner"
                      className="block p-2 text-white hover:text-hw-yellow hover:bg-black/30 rounded"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Award className="h-4 w-4 inline mr-2" />
                      Collector's Corner
                    </Link>
                    <button
                      className="w-full text-left p-2 text-hw-red hover:text-red-400 hover:bg-black/30 rounded flex items-center"
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link
                      href="/login"
                      className="block p-2 text-white hover:text-hw-yellow hover:bg-black/30 rounded"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="block p-2 bg-hw-red text-white rounded text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
