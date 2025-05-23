import type React from "react"
import type { Metadata } from "next"
import { Racing_Sans_One, Montserrat } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CartProvider } from "@/context/cart-context"
import { AuthProvider } from "@/context/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { AuthDebug } from "@/components/auth-debug"

const racing = Racing_Sans_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-racing",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Hot Wheels PH - Collectible Cars",
  description: "Premium collectible Hot Wheels cars in the Philippines",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${racing.variable} ${montserrat.variable} font-sans bg-hw-dark text-gray-200`}>
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <Toaster />
            <AuthDebug />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
