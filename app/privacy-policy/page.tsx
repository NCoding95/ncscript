import Link from "next/link"
import { Shield, Lock, Database, Eye } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-hw-dark min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-racing mb-2 text-hw-yellow">Privacy Policy</h1>
        <div className="h-1 w-20 bg-hw-red mb-8"></div>

        <div className="bg-black p-8 rounded-lg border border-hw-border">
          <div className="space-y-8">
            <section>
              <p className="text-gray-300 mb-4">
                <span className="font-medium text-white">Last Updated:</span> May 15, 2023
              </p>
              <p className="text-gray-300">
                This Privacy Policy describes how Hot Wheels PH ("we," "us," or "our") collects, uses, and shares your
                personal information when you visit our website, make a purchase, or interact with us in any way.
              </p>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Database className="h-6 w-6 text-hw-red mr-3" />
                <h2 className="text-xl font-racing text-hw-yellow">Information We Collect</h2>
              </div>
              <p className="text-gray-300 mb-4">
                When you visit our site, we collect certain information about you, including:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-white mb-1">Personal Information:</h3>
                  <ul className="list-disc list-inside text-gray-300 ml-4">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Billing and shipping address</li>
                    <li>Payment information</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Usage Information:</h3>
                  <ul className="list-disc list-inside text-gray-300 ml-4">
                    <li>IP address</li>
                    <li>Browser type</li>
                    <li>Device information</li>
                    <li>Pages visited</li>
                    <li>Time spent on site</li>
                    <li>Referring website</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Eye className="h-6 w-6 text-hw-red mr-3" />
                <h2 className="text-xl font-racing text-hw-yellow">How We Use Your Information</h2>
              </div>
              <p className="text-gray-300 mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your order or account</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our website and customer experience</li>
                <li>Detect and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-hw-red mr-3" />
                <h2 className="text-xl font-racing text-hw-yellow">Information Sharing</h2>
              </div>
              <p className="text-gray-300 mb-4">We may share your personal information with:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Service providers (payment processors, shipping companies)</li>
                <li>Marketing partners (with your consent)</li>
                <li>Legal authorities when required by law</li>
              </ul>
              <p className="text-gray-300 mt-4">We do not sell your personal information to third parties.</p>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Lock className="h-6 w-6 text-hw-red mr-3" />
                <h2 className="text-xl font-racing text-hw-yellow">Data Security</h2>
              </div>
              <p className="text-gray-300 mb-4">
                We implement appropriate security measures to protect your personal information from unauthorized
                access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Encryption of sensitive data</li>
                <li>Secure payment processing</li>
                <li>Regular security assessments</li>
                <li>Limited staff access to personal information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-racing text-hw-yellow mb-4">Your Rights</h2>
              <p className="text-gray-300 mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your information</li>
                <li>Restriction of processing</li>
                <li>Data portability</li>
                <li>Objection to processing</li>
              </ul>
              <p className="text-gray-300 mt-4">
                To exercise these rights, please contact us at{" "}
                <Link href="mailto:privacy@hotwheelsph.com" className="text-hw-yellow hover:text-hw-orange">
                  privacy@hotwheelsph.com
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-racing text-hw-yellow mb-4">Cookies</h2>
              <p className="text-gray-300 mb-4">
                We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and
                personalize content. You can manage your cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-racing text-hw-yellow mb-4">Changes to This Policy</h2>
              <p className="text-gray-300">
                We may update this Privacy Policy from time to time. The updated version will be indicated by an updated
                "Last Updated" date and will be effective immediately upon posting.
              </p>
            </section>

            <div className="border-t border-hw-border pt-6 mt-8">
              <p className="text-gray-400">
                If you have any questions about our Privacy Policy, please contact us at{" "}
                <Link href="mailto:privacy@hotwheelsph.com" className="text-hw-yellow hover:text-hw-orange">
                  privacy@hotwheelsph.com
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
