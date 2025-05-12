"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { registerForEvent, type EventRegistrationData } from "@/app/actions/event-actions"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

interface EventRegistrationDialogProps {
  isOpen: boolean
  onClose: () => void
  event: {
    id: number
    title: string
  }
}

export default function EventRegistrationDialog({ isOpen, onClose, event }: EventRegistrationDialogProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (formData.phone.trim().length < 10) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const registrationData: EventRegistrationData = {
        eventId: event.id,
        eventTitle: event.title,
        ...formData,
      }

      const result = await registerForEvent(registrationData)

      if (result.success) {
        // Show success toast
        toast({
          title: "Registration Successful! 🎉",
          description: (
            <div className="flex flex-col gap-2">
              <p>{result.message}</p>
              <p className="text-sm text-muted-foreground">We've sent the event details to your email.</p>
            </div>
          ),
          className: "bg-emerald-50 border-emerald-200",
        })

        // Close the dialog and reset form
        onClose()
        setFormData({ name: "", email: "", phone: "" })
      } else {
        // Show error toast
        toast({
          title: "Registration Failed",
          description: result.message,
          variant: "destructive",
        })

        // Set form errors if any
        if (result.errors) {
          const formErrors: Record<string, string> = {}
          result.errors.forEach((err) => {
            if (err.path[0]) {
              formErrors[err.path[0] as string] = err.message
            }
          })
          setErrors(formErrors)
        }
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Register for Event</DialogTitle>
          <DialogDescription>
            Complete the form below to register for <span className="font-medium text-emerald-600">{event.title}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "border-red-300 focus-visible:ring-red-300" : ""}
              disabled={isSubmitting}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 mt-1"
              >
                {errors.name}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-300 focus-visible:ring-red-300" : ""}
              disabled={isSubmitting}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 mt-1"
              >
                {errors.email}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Contact Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your contact number"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "border-red-300 focus-visible:ring-red-300" : ""}
              disabled={isSubmitting}
            />
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 mt-1"
              >
                {errors.phone}
              </motion.p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                "Register Now"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
