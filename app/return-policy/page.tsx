import Link from "next/link"
import { RefreshCw, AlertCircle, CheckCircle, Clock } from "lucide-react"

export default function ReturnPolicyPage() {
  return (
    <div className="bg-hw-dark min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-racing mb-2 text-hw-yellow">Return Policy</h1>
        <div className="h-1 w-20 bg-hw-red mb-8"></div>

        <div className="bg-black p-8 rounded-lg border border-hw-border">
          <div className="space-y-8">
            <section>
              <div className="flex items-center mb-4">
                <RefreshCw className="h-6 w-6 text-hw-red mr-3" />
                <h2 className="text-xl font-racing text-hw-yellow">Return & Exchange Policy</h2>
              </div>
              <p className="text-gray-300 mb-4">
                At Hot Wheels PH, we want you to be completely satisfied with your purchase. If you're not entirely
                happy, we're here to help.
              </p>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-hw-red mr-3" />
                <h2 className="text-xl font-racing text-hw-yellow">Return Eligibility & Timeframe</h2>
              </div>
              <div className="bg-hw-darker p-4 rounded-lg border border-hw-border mb-4">
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Returns must be initiated within 7 days of receiving your order</li>
                  <li>Items must be in their original packaging and unused condition</li>
                  <li>Proof of purchase (order number or receipt) is required</li>
                  <li>Limited edition or sale items may not be eligible for return unless defective</li>
                </ul>
              </div>
              <p className="text-gray-300">
                Please note that collector's items with packaging damage that occurred during shipping may be eligible
                for return or exchange, as we understand the importance of packaging condition for collectors.
              </p>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <AlertCircle className="h-6 w-6 text-hw-red mr-3" />
                <h2 className="text-xl font-racing text-hw-yellow">Damaged or Incorrect Items</h2>
              </div>
              <p className="text-gray-300 mb-4">
                If you receive a damaged or incorrect item, please contact us within 48 hours of delivery with photos of
                the damaged item or packaging. We will arrange for a replacement or refund at our discretion.
              </p>
              <div className="bg-hw-darker p-4 rounded-lg border border-hw-border">
                <h3 className="font-medium text-white mb-2">Required Information for Damaged Items:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Order number</li>
                  <li>Product name/SKU</li>
                  <li>Clear photos showing the damage</li>
                  <li>Brief description of the issue</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-hw-red mr-3" />
                <h2 className="text-xl font-racing text-hw-yellow">Return Process</h2>
              </div>
              <ol className="list-decimal list-inside space-y-4 text-gray-300">
                <li>
                  <span className="font-medium text-white">Contact Customer Service:</span> Email us at
                  returns@hotwheelsph.com or call +63 (2) 8123 4567 to initiate your return
                </li>
                <li>
                  <span className="font-medium text-white">Return Authorization:</span> You will receive a Return
                  Authorization (RA) number and return instructions
                </li>
                <li>
                  <span className="font-medium text-white">Package Your Return:</span> Securely pack the item(s) in
                  their original packaging with the RA number clearly marked
                </li>
                <li>
                  <span className="font-medium text-white">Ship Your Return:</span> Send the package to our return
                  address using a trackable shipping method
                </li>
                <li>
                  <span className="font-medium text-white">Refund Processing:</span> Once we receive and inspect your
                  return, we'll process your refund or exchange within 5-7 business days
                </li>
              </ol>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <RefreshCw className="h-6 w-6 text-hw-red mr-3" />
                <h2 className="text-xl font-racing text-hw-yellow">Refunds</h2>
              </div>
              <p className="text-gray-300 mb-4">
                Refunds will be issued to the original payment method. Please allow 5-7 business days for the refund to
                appear in your account after we've processed your return.
              </p>
              <p className="text-gray-300">
                Shipping costs are non-refundable unless the return is due to our error (damaged or incorrect item).
              </p>
            </section>

            <div className="border-t border-hw-border pt-6 mt-8">
              <p className="text-gray-400">
                For any return-related inquiries, please contact our customer service team at{" "}
                <Link href="mailto:returns@hotwheelsph.com" className="text-hw-yellow hover:text-hw-orange">
                  returns@hotwheelsph.com
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
