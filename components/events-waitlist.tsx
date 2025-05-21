"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { CheckCircle2, Calendar, Mail, User, Briefcase, ArrowRight, Building } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

const EventsWaitlist = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    interests: {
      webinars: false,
      workshops: false,
      networking: false,
      industry: false,
    },
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [waitlistCount, setWaitlistCount] = useState(189)
  const formRef = useRef(null)
  const isInView = useInView(formRef, { once: false, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (interest: keyof typeof formData.interests) => {
    setFormData((prev) => ({
      ...prev,
      interests: {
        ...prev.interests,
        [interest]: !prev.interests[interest],
      },
    }))
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!formData.email || !formData.name) {
      toast({
        title: "Error",
        description: "Please enter your name and email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setWaitlistCount(waitlistCount + 1)

      toast({
        title: "Success!",
        description: "You've been added to our events waitlist. We'll notify you about upcoming events!",
      })
    }, 1500)
  }

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            ref={formRef}
            variants={formVariants}
            initial="hidden"
            animate={controls}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            {!isSubmitted ? (
              <div className="p-8 md:p-10">
                <motion.div variants={itemVariants} className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-6">
                    <Calendar size={28} />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Join Our Events Waitlist</h2>
                  <p className="text-gray-600">
                    Be the first to know about our exclusive events, webinars, and workshops designed to help you grow
                    your business.
                  </p>
                </motion.div>

                <motion.form onSubmit={handleSubmit} className="space-y-5" variants={itemVariants}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          className="pl-10 w-full"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-10 w-full"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={handleChange}
                        className="pl-10 w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      I'm interested in (select all that apply)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { id: "webinars", label: "Online Webinars" },
                        { id: "workshops", label: "In-person Workshops" },
                        { id: "networking", label: "Networking Events" },
                        { id: "industry", label: "Industry Conferences" },
                      ].map((interest) => (
                        <div key={interest.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={interest.id}
                            checked={formData.interests[interest.id as keyof typeof formData.interests]}
                            onCheckedChange={() => handleCheckboxChange(interest.id as keyof typeof formData.interests)}
                          />
                          <label
                            htmlFor={interest.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {interest.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      What topics are you most interested in? (Optional)
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about the topics you'd like to see covered in our events..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full"
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Join Events Waitlist <ArrowRight size={18} />
                      </span>
                    )}
                  </Button>
                </motion.form>

                <motion.div
                  className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-gray-500 text-sm"
                  variants={itemVariants}
                >
                  <Briefcase size={16} />
                  <span>
                    <strong>{waitlistCount}</strong> professionals have already joined
                  </span>
                </motion.div>
              </div>
            ) : (
              <motion.div className="p-10 text-center" variants={successVariants} initial="hidden" animate="visible">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-bold mb-4">You're on the Events List!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for joining our events waitlist. We'll notify you as soon as we have upcoming events that
                  match your interests.
                </p>
                <div className="inline-block bg-emerald-50 rounded-full px-4 py-2 text-emerald-700 text-sm font-medium">
                  You're subscriber #{waitlistCount}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <Toaster />
    </section>
  )
}

export default EventsWaitlist
