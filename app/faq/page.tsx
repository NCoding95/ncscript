"use client"

import { useState } from "react"
import { HelpCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("general")

  const categories = [
    { id: "general", name: "General" },
    { id: "orders", name: "Orders & Payment" },
    { id: "shipping", name: "Shipping & Delivery" },
    { id: "returns", name: "Returns & Refunds" },
    { id: "products", name: "Products" },
  ]

  const faqs = {
    general: [
      {
        question: "What is Hot Wheels PH?",
        answer:
          "Hot Wheels PH is the premier online destination for collectible Hot Wheels cars in the Philippines. We offer a wide range of authentic Hot Wheels products, from regular releases to limited editions and exclusives.",
      },
      {
        question: "Are all your products authentic Hot Wheels?",
        answer:
          "Yes, all our products are 100% authentic Hot Wheels merchandise sourced directly from authorized distributors. We guarantee the authenticity of every item we sell.",
      },
      {
        question: "Do you have a physical store?",
        answer:
          "Currently, we operate exclusively online. However, we occasionally participate in toy conventions and collector events across the Philippines. Follow our social media for announcements.",
      },
      {
        question: "How can I contact customer service?",
        answer:
          "You can reach our customer service team via email at info@hotwheelsph.com, by phone at +63 (2) 8123 4567, or through the Contact form on our website. Our service hours are Monday to Friday, 9:00 AM to 6:00 PM.",
      },
    ],
    orders: [
      {
        question: "How do I place an order?",
        answer:
          "Browse our products, add items to your cart, proceed to checkout, fill in your shipping and payment details, and confirm your order. You'll receive an order confirmation email once your purchase is complete.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept various payment methods including credit/debit cards (Visa, Mastercard), GCash, Maya, bank transfers (BDO, BPI, Metrobank), and Cash on Delivery (COD) for eligible areas.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "You can modify or cancel your order within 2 hours of placing it, provided it hasn't been processed yet. Please contact our customer service immediately if you need to make changes.",
      },
      {
        question: "Is it safe to use my credit card on your website?",
        answer:
          "Yes, our website uses industry-standard SSL encryption to protect your payment information. We do not store your full credit card details on our servers.",
      },
    ],
    shipping: [
      {
        question: "How long will it take to receive my order?",
        answer:
          "Delivery times vary by location: Metro Manila (1-3 business days), Luzon (3-5 business days), Visayas (5-7 business days), and Mindanao (7-10 business days). Remote areas may require additional time.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Currently, we only ship within the Philippines. We're working on expanding our shipping options to include international destinations in the future.",
      },
      {
        question: "How much is the shipping fee?",
        answer:
          "Shipping fees vary based on your location and order weight. Metro Manila starts at ₱100, Luzon at ₱150, Visayas at ₱200, and Mindanao at ₱250. Orders above ₱5,000 qualify for free shipping within Metro Manila.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once your order is shipped, you'll receive a tracking number via email. You can also check your order status in the 'My Orders' section of your account.",
      },
    ],
    returns: [
      {
        question: "What is your return policy?",
        answer:
          "We accept returns within 7 days of delivery for items in their original condition and packaging. Please refer to our Return Policy page for complete details.",
      },
      {
        question: "How do I return an item?",
        answer:
          "Contact our customer service to initiate a return. You'll receive a Return Authorization (RA) number and instructions. Package the item securely with the RA number clearly marked and ship it to our return address.",
      },
      {
        question: "When will I receive my refund?",
        answer:
          "Once we receive and inspect your return, we'll process your refund within 5-7 business days. The refund will be issued to your original payment method.",
      },
      {
        question: "Do you offer exchanges?",
        answer:
          "Yes, we offer exchanges for items of equal value within 7 days of delivery. For items of different value, we'll process a refund for the returned item and you can place a new order for the desired item.",
      },
    ],
    products: [
      {
        question: "How often do you restock popular items?",
        answer:
          "We restock popular items regularly, typically every 2-4 weeks depending on availability from our suppliers. You can sign up for stock notifications on product pages.",
      },
      {
        question: "Do you sell limited edition or exclusive Hot Wheels?",
        answer:
          "Yes, we offer limited edition and exclusive Hot Wheels cars. These items are available in limited quantities and often sell out quickly. We recommend signing up for our newsletter to be notified of new arrivals.",
      },
      {
        question: "Are the product images exact representations of what I'll receive?",
        answer:
          "Our product images are as accurate as possible, but slight variations in color may occur due to different screen settings. For collector's items, we make every effort to show the actual condition of the packaging.",
      },
      {
        question: "Can I request specific Hot Wheels cars that aren't listed on your website?",
        answer:
          "Yes, we accept special requests for specific Hot Wheels cars. Please contact our customer service with details of the item you're looking for, and we'll do our best to source it for you.",
      },
    ],
  }

  return (
    <div className="bg-hw-dark min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center mb-8">
          <HelpCircle className="h-8 w-8 text-hw-red mr-3" />
          <h1 className="text-3xl font-racing text-hw-yellow">Frequently Asked Questions</h1>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-hw-red text-white shadow-lg shadow-red-500/30 scale-105"
                  : "bg-black border border-hw-border text-gray-300 hover:bg-hw-card-hover"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-black p-6 rounded-lg border border-hw-border">
            <Accordion type="single" collapsible className="w-full">
              {faqs[activeCategory as keyof typeof faqs].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-hw-border">
                  <AccordionTrigger className="text-white hover:text-hw-yellow">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-300">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400">
              Can't find what you're looking for? Contact our customer service at{" "}
              <a href="mailto:info@hotwheelsph.com" className="text-hw-yellow hover:text-hw-orange">
                info@hotwheelsph.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
