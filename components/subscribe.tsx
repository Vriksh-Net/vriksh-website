"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import AnimatedSection from "@/components/animated-section"
import { Button } from "@/components/ui/button"

const Subscribe = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter.",
      })
      setEmail("")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <section className="py-16 bg-emerald-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-emerald-200 opacity-50"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      />
      <motion.div
        className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-emerald-300 opacity-40"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      />

      <div className="container mx-auto px-4 relative">
        <AnimatedSection animation="slide" className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter to receive the latest insights, industry trends, and exclusive content.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <motion.div
              className="flex-grow"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 transition-all duration-300 hover:border-emerald-300"
                required
              />
            </motion.div>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          <p className="text-xs text-gray-500 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </AnimatedSection>
      </div>
      <Toaster />
    </section>
  )
}

export default Subscribe
