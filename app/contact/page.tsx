"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send the form data to your backend
    setIsSubmitted(true)
  }

  return (
    <div className="bg-hw-dark min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-racing mb-2 text-hw-yellow text-center">Contact Us</h1>
        <div className="h-1 w-20 bg-hw-red mx-auto mb-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            {isSubmitted ? (
              <div className="bg-green-900/30 p-6 rounded-lg text-center border border-green-700">
                <h2 className="text-xl font-racing mb-2 text-green-400">Message Sent!</h2>
                <p className="text-green-300">
                  Thank you for contacting us. We'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 card-dark p-6 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-dark"
                  />
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
                    className="input-dark"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-white">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input-dark"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="input-dark resize-none"
                  />
                </div>

                <Button type="submit" className="w-full bg-hw-red hover:bg-hw-orange text-white">
                  Send Message
                </Button>
              </form>
            )}
          </div>

          <div className="card-dark p-6 rounded-lg">
            <h2 className="text-xl font-racing mb-6 text-hw-yellow">Get In Touch</h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-hw-red mt-1" />
                <div>
                  <h3 className="font-medium text-white">Address</h3>
                  <p className="text-gray-400">123 Collector's Street, Makati City, Metro Manila, Philippines</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 mr-3 text-hw-red mt-1" />
                <div>
                  <h3 className="font-medium text-white">Phone</h3>
                  <p className="text-gray-400">+63 (2) 8123 4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-5 h-5 mr-3 text-hw-red mt-1" />
                <div>
                  <h3 className="font-medium text-white">Email</h3>
                  <p className="text-gray-400">info@hotwheelsph.com</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2 text-white">Business Hours</h3>
                <p className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-400">Saturday: 9:00 AM - 4:00 PM</p>
                <p className="text-gray-400">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
