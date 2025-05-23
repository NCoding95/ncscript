"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCurrency } from "@/lib/utils"
import { LogIn, CreditCard, Wallet, DollarSign, Phone, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/components/ui/use-toast"
import { createOrder } from "@/lib/db-service"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, total, clearCart } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    paymentMethod: "cod",
    gcashNumber: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    bankName: "",
    accountNumber: "",
  })
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSendVerification = () => {
    if (!formData.gcashNumber || formData.gcashNumber.length !== 11) {
      toast({
        title: "Invalid GCash Number",
        description: "Please enter a valid 11-digit GCash number",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)
    // Simulate sending verification code
    setTimeout(() => {
      setIsVerifying(false)
      toast({
        title: "Verification Code Sent",
        description: `A verification code has been sent to ${formData.gcashNumber}`,
        variant: "default",
      })
    }, 1500)
  }

  const handleVerifyCode = () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit verification code",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)
      toast({
        title: "Verification Successful",
        description: "Your GCash number has been verified",
        variant: "success",
      })
    }, 1500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate payment method specific fields
    if (formData.paymentMethod === "gcash" && !isVerified) {
      toast({
        title: "GCash Verification Required",
        description: "Please verify your GCash number before proceeding",
        variant: "destructive",
      })
      return
    }

    if (formData.paymentMethod === "card" && (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvc)) {
      toast({
        title: "Card Information Required",
        description: "Please fill in all card details",
        variant: "destructive",
      })
      return
    }

    if (formData.paymentMethod === "bank" && (!formData.bankName || !formData.accountNumber)) {
      toast({
        title: "Bank Information Required",
        description: "Please fill in all bank transfer details",
        variant: "destructive",
      })
      return
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to complete your order",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      // Create order in database
      const result = await createOrder(
        user.id,
        cart,
        total + 150, // Add shipping cost
        {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          phone: formData.phone,
        },
        formData.paymentMethod,
      )

      if (result.success) {
        clearCart()
        router.push("/thank-you")
      } else {
        toast({
          title: "Order Failed",
          description: result.error || "There was an error processing your order. Please try again.",
          variant: "destructive",
        })
        setIsProcessing(false)
      }
    } catch (error) {
      console.error("Error creating order:", error)
      toast({
        title: "Order Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      })
      setIsProcessing(false)
    }
  }

  if (!user) {
    return (
      <div className="bg-hw-dark min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-16 card-dark rounded-lg">
            <LogIn className="h-16 w-16 mx-auto text-gray-500 mb-4" />
            <h2 className="text-2xl font-racing mb-4 text-hw-yellow">Login Required</h2>
            <p className="text-gray-300 mb-6">Please login to proceed to checkout</p>
            <Link href="/login">
              <Button className="bg-hw-red hover:bg-hw-orange text-white">Login</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="bg-hw-dark min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-racing mb-2 text-hw-yellow">Checkout</h1>
        <div className="h-1 w-20 bg-hw-red mb-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-racing mb-4 text-hw-yellow">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4 bg-black p-6 rounded-lg border border-hw-border">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="gradient-input bg-black border-0 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="gradient-input bg-black border-0 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="gradient-input bg-black border-0 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-white">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="gradient-input bg-black border-0 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-white">
                    City
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="gradient-input bg-black border-0 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode" className="text-white">
                    Postal Code
                  </Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="gradient-input bg-black border-0 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="gradient-input bg-black border-0 text-white placeholder:text-gray-500"
                />
              </div>

              <h2 className="text-xl font-racing mt-8 mb-4 text-hw-yellow">Payment Method</h2>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="payment-methods" className="border-hw-border">
                  <AccordionTrigger className="text-white hover:text-hw-yellow">
                    Available Payment Methods
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 text-sm">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <DollarSign className="h-5 w-5 text-hw-yellow mt-1" />
                        <div>
                          <p className="font-medium text-white">Cash on Delivery (COD)</p>
                          <p>Most common payment method, especially in rural areas and small businesses.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Wallet className="h-5 w-5 text-hw-yellow mt-1" />
                        <div>
                          <p className="font-medium text-white">Digital Wallets</p>
                          <p>GCash, Maya, and Coins.ph for convenient payments, fund transfers, and bill payments.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <CreditCard className="h-5 w-5 text-hw-yellow mt-1" />
                        <div>
                          <p className="font-medium text-white">Credit/Debit Cards</p>
                          <p>Visa and Mastercard for in-store and online purchases.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <CreditCard className="h-5 w-5 text-hw-yellow mt-1" />
                        <div>
                          <p className="font-medium text-white">Bank Transfers</p>
                          <p>
                            Through institutions like BDO, BPI, and Metrobank for personal and business transactions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-4 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div
                    className={`relative p-4 rounded-lg border cursor-pointer transition-all ${
                      formData.paymentMethod === "cod"
                        ? "border-hw-red bg-hw-darker"
                        : "border-hw-border bg-black hover:border-hw-border/50"
                    }`}
                    onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: "cod" }))}
                  >
                    <div className="flex flex-col items-center text-center">
                      <DollarSign className="h-6 w-6 text-hw-yellow mb-2" />
                      <span className="text-white text-sm">Cash on Delivery</span>
                    </div>
                    {formData.paymentMethod === "cod" && (
                      <div className="absolute -top-2 -right-2 h-5 w-5 bg-hw-red rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div
                    className={`relative p-4 rounded-lg border cursor-pointer transition-all ${
                      formData.paymentMethod === "gcash"
                        ? "border-hw-red bg-hw-darker"
                        : "border-hw-border bg-black hover:border-hw-border/50"
                    }`}
                    onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: "gcash" }))}
                  >
                    <div className="flex flex-col items-center text-center">
                      <Wallet className="h-6 w-6 text-hw-yellow mb-2" />
                      <span className="text-white text-sm">GCash</span>
                    </div>
                    {formData.paymentMethod === "gcash" && (
                      <div className="absolute -top-2 -right-2 h-5 w-5 bg-hw-red rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div
                    className={`relative p-4 rounded-lg border cursor-pointer transition-all ${
                      formData.paymentMethod === "card"
                        ? "border-hw-red bg-hw-darker"
                        : "border-hw-border bg-black hover:border-hw-border/50"
                    }`}
                    onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: "card" }))}
                  >
                    <div className="flex flex-col items-center text-center">
                      <CreditCard className="h-6 w-6 text-hw-yellow mb-2" />
                      <span className="text-white text-sm">Credit Card</span>
                    </div>
                    {formData.paymentMethod === "card" && (
                      <div className="absolute -top-2 -right-2 h-5 w-5 bg-hw-red rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div
                    className={`relative p-4 rounded-lg border cursor-pointer transition-all ${
                      formData.paymentMethod === "bank"
                        ? "border-hw-red bg-hw-darker"
                        : "border-hw-border bg-black hover:border-hw-border/50"
                    }`}
                    onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: "bank" }))}
                  >
                    <div className="flex flex-col items-center text-center">
                      <CreditCard className="h-6 w-6 text-hw-yellow mb-2" />
                      <span className="text-white text-sm">Bank Transfer</span>
                    </div>
                    {formData.paymentMethod === "bank" && (
                      <div className="absolute -top-2 -right-2 h-5 w-5 bg-hw-red rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment method specific fields */}
                {formData.paymentMethod === "gcash" && (
                  <div className="bg-hw-darker p-4 rounded-lg border border-hw-border">
                    <div className="flex items-center mb-4">
                      <Image src="/images/gcash-logo.png" alt="GCash" width={80} height={30} className="mr-2" />
                      <h3 className="text-white font-medium">GCash Payment</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="gcashNumber" className="text-white">
                          GCash Number
                        </Label>
                        <div className="flex gap-2">
                          <div className="relative flex-grow">
                            <Input
                              id="gcashNumber"
                              name="gcashNumber"
                              value={formData.gcashNumber}
                              onChange={handleChange}
                              placeholder="09XXXXXXXXX"
                              disabled={isVerified}
                              className="gradient-input bg-black border-0 text-white placeholder:text-gray-500 pl-10"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                              <Phone className="h-4 w-4 text-gray-500" />
                            </div>
                          </div>
                          <Button
                            type="button"
                            onClick={handleSendVerification}
                            disabled={isVerifying || isVerified}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            {isVerifying ? (
                              <span className="flex items-center">
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Sending...
                              </span>
                            ) : isVerified ? (
                              <span className="flex items-center">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Verified
                              </span>
                            ) : (
                              "Verify"
                            )}
                          </Button>
                        </div>
                      </div>

                      {!isVerified && (
                        <div className="space-y-2">
                          <Label htmlFor="verificationCode" className="text-white">
                            Verification Code
                          </Label>
                          <div className="flex gap-2">
                            <Input
                              id="verificationCode"
                              value={verificationCode}
                              onChange={(e) => setVerificationCode(e.target.value)}
                              placeholder="Enter 6-digit code"
                              className="gradient-input bg-black border-0 text-white placeholder:text-gray-500"
                            />
                            <Button
                              type="button"
                              onClick={handleVerifyCode}
                              disabled={isVerifying || isVerified}
                              className="bg-hw-red hover:bg-hw-orange text-white"
                            >
                              {isVerifying ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit"}
                            </Button>
                          </div>
                        </div>
                      )}

                      {isVerified && (
                        <div className="bg-green-900/30 border border-green-800 rounded-md p-3 flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <p className="text-green-400 text-sm">Your GCash number has been verified</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {formData.paymentMethod === "card" && (
                  <div className="bg-hw-darker p-4 rounded-lg border border-hw-border">
                    <h3 className="text-white font-medium mb-4 flex items-center">
                      <CreditCard className="h-5 w-5 text-hw-yellow mr-2" />
                      Credit Card Payment
                    </h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber" className="text-white">
                          Card Number
                        </Label>
                        <div className="relative">
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            className="gradient-input bg-black border-0 text-white placeholder:text-gray-500 pl-10"
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            <CreditCard className="h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardExpiry" className="text-white">
                            Expiry Date
                          </Label>
                          <Input
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            className="gradient-input bg-black border-0 text-white placeholder:text-gray-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardCvc" className="text-white">
                            CVC
                          </Label>
                          <Input
                            id="cardCvc"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleChange}
                            placeholder="123"
                            className="gradient-input bg-black border-0 text-white placeholder:text-gray-500"
                          />
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="flex gap-2 mr-4">
                          <Image src="/images/visa-logo.png" alt="Visa" width={40} height={25} />
                          <Image src="/images/mastercard-logo.png" alt="Mastercard" width={40} height={25} />
                        </div>
                        <p className="text-gray-400 text-xs">Your card information is secure and encrypted</p>
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === "bank" && (
                  <div className="bg-hw-darker p-4 rounded-lg border border-hw-border">
                    <h3 className="text-white font-medium mb-4 flex items-center">
                      <CreditCard className="h-5 w-5 text-hw-yellow mr-2" />
                      Bank Transfer
                    </h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bankName" className="text-white">
                          Select Bank
                        </Label>
                        <select
                          id="bankName"
                          name="bankName"
                          value={formData.bankName}
                          onChange={handleChange}
                          className="gradient-input bg-black border-0 text-white placeholder:text-gray-500 w-full h-10 rounded-md px-3"
                        >
                          <option value="">Select a bank</option>
                          <option value="BDO">BDO</option>
                          <option value="BPI">BPI</option>
                          <option value="Metrobank">Metrobank</option>
                          <option value="UnionBank">UnionBank</option>
                          <option value="PNB">PNB</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accountNumber" className="text-white">
                          Account Number
                        </Label>
                        <Input
                          id="accountNumber"
                          name="accountNumber"
                          value={formData.accountNumber}
                          onChange={handleChange}
                          placeholder="Enter your account number"
                          className="gradient-input bg-black border-0 text-white placeholder:text-gray-500"
                        />
                      </div>

                      <div className="bg-yellow-900/30 border border-yellow-800 rounded-md p-3 flex items-start">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                        <div>
                          <p className="text-yellow-400 text-sm font-medium">Bank Transfer Instructions</p>
                          <p className="text-yellow-400/80 text-xs mt-1">
                            After placing your order, please transfer the total amount to the bank account that will be
                            provided in your order confirmation email. Your order will be processed once payment is
                            confirmed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-hw-red via-hw-orange to-hw-red hover:from-hw-orange hover:via-hw-red hover:to-hw-orange text-white font-bold py-3 mt-6"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Complete Order"
                )}
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-xl font-racing mb-4 text-hw-yellow">Order Summary</h2>
            <div className="bg-black p-6 rounded-lg border border-hw-border">
              <div className="space-y-4 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="relative h-12 w-12 bg-hw-darker rounded overflow-hidden mr-3">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div>
                        <p className="text-white text-sm">{item.name}</p>
                        <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-hw-yellow">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mt-4 border-hw-border space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>{formatCurrency(150)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-white">Total</span>
                  <span className="text-hw-yellow">{formatCurrency(total + 150)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-hw-darker rounded-lg border border-hw-border">
                <h3 className="text-white font-medium mb-2">Estimated Delivery</h3>
                <p className="text-gray-300 text-sm">
                  {formData.city?.toLowerCase().includes("manila") ? "1-3 business days" : "5-7 business days"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
