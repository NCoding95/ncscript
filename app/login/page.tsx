"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Flame, Loader2, Facebook, Mail } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading, user } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields")
      setIsSubmitting(false)
      return
    }

    try {
      const success = await login(formData.email, formData.password)
      if (success) {
        router.push("/")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-hw-dark flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Flame className="h-12 w-12 text-hw-red" />
            </div>
            <h2 className="mt-6 text-3xl font-racing text-hw-yellow">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-400">
              Or{" "}
              <Link href="/signup" className="font-medium text-hw-red hover:text-hw-orange">
                create a new account
              </Link>
            </p>
          </div>

          <div className="bg-black rounded-lg p-8 border border-hw-border shadow-lg">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-900/30 border border-red-800 text-red-400 px-4 py-3 rounded-md text-sm text-center">
                  {error}
                </div>
              )}

              <div>
                <Label htmlFor="email" className="text-white">
                  Email address
                </Label>
                <div className="mt-1 relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="gradient-input bg-black border-0 text-white placeholder:text-gray-500 w-full"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hotwheels@example.com"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Link href="#" className="text-sm text-hw-yellow hover:text-hw-orange">
                    Forgot your password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="gradient-input bg-black border-0 text-white placeholder:text-gray-500 w-full pr-10"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-hw-red focus:ring-hw-yellow bg-black border-hw-border rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-hw-red via-hw-orange to-hw-red hover:from-hw-orange hover:via-hw-red hover:to-hw-orange text-white font-bold py-3"
                  disabled={isLoading || isSubmitting}
                >
                  {isLoading || isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  Sign in
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-hw-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-hw-border bg-black text-white hover:bg-hw-card-hover flex items-center justify-center"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="border-hw-border bg-black text-white hover:bg-hw-card-hover flex items-center justify-center"
                >
                  <Facebook className="h-5 w-5 mr-2 text-blue-600" />
                  Facebook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/2 bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-hw-darker to-black opacity-80"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
          <div className="w-full max-w-md text-center">
            <Image
              src="/images/hot-wheels-logo.png"
              alt="Hot Wheels Logo"
              width={200}
              height={100}
              className="mx-auto mb-8"
            />
            <h3 className="text-2xl font-racing text-hw-yellow mb-4">Collector's Advantage</h3>
            <p className="text-gray-300 mb-6">
              Sign in to access exclusive collector's items, track your orders, and join our rewards program for
              discounts on rare finds.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-hw-darker p-4 rounded-lg border border-hw-border">
                <h4 className="text-hw-red font-racing mb-2">Early Access</h4>
                <p className="text-gray-400 text-sm">Be the first to know about new releases and limited editions</p>
              </div>
              <div className="bg-hw-darker p-4 rounded-lg border border-hw-border">
                <h4 className="text-hw-yellow font-racing mb-2">Collector Points</h4>
                <p className="text-gray-400 text-sm">Earn points with every purchase to redeem for exclusive items</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
