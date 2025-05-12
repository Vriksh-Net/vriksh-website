"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, CalendarCheck, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import AnimatedSection from "@/components/animated-section"

const EventsNewsletter = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !name) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      toast({
        title: "Success!",
        description: "You've been subscribed to our events newsletter.",
      })
    }, 1500)
  }

  return (
    <section
      id="newsletter"
      className="py-20 bg-gradient-to-br from-emerald-900 to-emerald-800 text-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-emerald-700 opacity-20 blur-3xl"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-emerald-600 opacity-20 blur-3xl"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade" className="text-center mb-12">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1 bg-emerald-700/50 rounded-full text-emerald-100 text-sm font-medium backdrop-blur-sm mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Bell size={14} className="animate-pulse" />
              <span>Never Miss an Event</span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated on Our Events</h2>
            <p className="text-lg text-emerald-100 mb-8">
              Subscribe to our events newsletter to receive notifications about upcoming events, early bird
              registrations, and exclusive content.
            </p>
          </AnimatedSection>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-emerald-100">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white focus:ring-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-emerald-100">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white focus:ring-white"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex items-start gap-3 flex-1">
                    <CalendarCheck size={24} className="text-emerald-300 mt-1 flex-shrink-0" />
                    <p className="text-sm text-emerald-100">
                      Receive notifications about new events, registration openings, early bird discounts, and event
                      recaps.
                    </p>
                  </div>
                  <Button
                    type="submit"
                    className="w-full md:w-auto bg-white text-emerald-800 hover:bg-emerald-100 min-w-[150px]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Subscribing..." : "Subscribe"}
                  </Button>
                </div>
              </form>
            ) : (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Thank You for Subscribing!</h3>
                <p className="text-emerald-100 mb-6">
                  You're now on our events list. We'll keep you updated on all our upcoming events.
                </p>
                <Button
                  onClick={() => {
                    setIsSubmitted(false)
                    setEmail("")
                    setName("")
                  }}
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Subscribe Another Email
                </Button>
              </motion.div>
            )}
          </div>

          <p className="text-xs text-emerald-200/70 mt-6 text-center">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from Vriksh Consulting.
          </p>
        </div>
      </div>
      <Toaster />
    </section>
  )
}

export default EventsNewsletter
