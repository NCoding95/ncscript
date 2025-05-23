import Link from "next/link"
import { Truck, Clock, MapPin, Package } from "lucide-react"

export default function ShippingPolicyPage() {
  return (
    <div className="bg-hw-dark min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-racing mb-2 text-hw-yellow">Shipping Policy</h1>
        <div className="h-1 w-20 bg-hw-red mb-8"></div>

        <div className="bg-black p-8 rounded-lg border border-hw-border">
          <div className="space-y-8">
            <section>
              <div className="flex items-center mb-4">
                <Truck className="h-6 w-6 text-hw-red mr-3" />
                <h2 className="text-xl font-racing text-hw-yellow">Delivery Information</h2>
              </div>
              <p className="text-gray-300 mb-4">
                Hot Wheels PH is committed to delivering your collectible cars safely and promptly. We ship to all major
                cities and provinces across the Philippines.
              </p>
              <div className="bg-hw-darker p-4 rounded-lg border border-hw-border">
                <h3 className="font-medium text-white mb-2">Estimated Delivery Times:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Metro Manila: 1-3 business days</li>
                  <li>Luzon: 3-5 business days</li>
                  <li>Visayas: 5-7 business days</li>
                  <li>Mindanao: 7-10 business days</li>
                  <li>Remote areas may require additional time</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-hw-red mr-3" />
                <h2 className="text-xl font-racing text-hw-yellow">Processing Time</h2>
              </div>
              <p className="text-gray-300 mb-4">
                Orders are processed within 24-48 hours after payment confirmation. You will receive a confirmation
                email with tracking information once your order has been shipped.
              </p>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-hw-red mr-3" />
                <h2 className="text-xl font-racing text-hw-yellow">Shipping Coverage</h2>
              </div>
              <p className="text-gray-300 mb-4">
                We deliver to all major cities and provinces in the Philippines. For remote areas, additional shipping
                fees and longer delivery times may apply.
              </p>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Package className="h-6 w-6 text-hw-red mr-3" />
                <h2 className="text-xl font-racing text-hw-yellow">Shipping Rates</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-gray-300">
                  <thead>
                    <tr className="border-b border-hw-border">
                      <th className="py-2 px-4 text-left text-hw-yellow">Location</th>
                      <th className="py-2 px-4 text-left text-hw-yellow">Standard Shipping</th>
                      <th className="py-2 px-4 text-left text-hw-yellow">Express Shipping</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-hw-border">
                      <td className="py-2 px-4">Metro Manila</td>
                      <td className="py-2 px-4">₱100</td>
                      <td className="py-2 px-4">₱150</td>
                    </tr>
                    <tr className="border-b border-hw-border">
                      <td className="py-2 px-4">Luzon</td>
                      <td className="py-2 px-4">₱150</td>
                      <td className="py-2 px-4">₱200</td>
                    </tr>
                    <tr className="border-b border-hw-border">
                      <td className="py-2 px-4">Visayas</td>
                      <td className="py-2 px-4">₱200</td>
                      <td className="py-2 px-4">₱250</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">Mindanao</td>
                      <td className="py-2 px-4">₱250</td>
                      <td className="py-2 px-4">₱300</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-400 mt-2 text-sm">* Free shipping for orders above ₱5,000 within Metro Manila</p>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Truck className="h-6 w-6 text-hw-red mr-3" />
                <h2 className="text-xl font-racing text-hw-yellow">Courier Partners</h2>
              </div>
              <p className="text-gray-300 mb-4">
                We partner with the following trusted courier services to ensure your Hot Wheels collectibles arrive
                safely:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>J&T Express</li>
                <li>LBC</li>
                <li>Ninja Van</li>
                <li>Grab Express (Metro Manila only)</li>
              </ul>
            </section>

            <div className="border-t border-hw-border pt-6 mt-8">
              <p className="text-gray-400">
                For any shipping-related inquiries, please contact our customer service team at{" "}
                <Link href="mailto:shipping@hotwheelsph.com" className="text-hw-yellow hover:text-hw-orange">
                  shipping@hotwheelsph.com
                </Link>{" "}
                or call us at +63 (2) 8123 4567.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
