import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function ThankYouPage() {
  return (
    <div className="bg-hw-dark min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center card-dark p-8 rounded-lg">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-racing mb-4 text-hw-yellow">Thank You for Your Order!</h1>
          <p className="text-lg mb-8 text-gray-300">
            Your order has been received and is being processed. You will receive a confirmation email shortly.
          </p>
          <div className="space-y-4">
            <Link href="/shop">
              <Button className="w-full bg-hw-red hover:bg-hw-orange text-white">Continue Shopping</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="w-full border-hw-border text-white hover:bg-hw-card-hover">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
