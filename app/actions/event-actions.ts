"use server"

import { z } from "zod"

// Define validation schema
const eventRegistrationSchema = z.object({
  eventId: z.number(),
  eventTitle: z.string(),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
})

export type EventRegistrationData = z.infer<typeof eventRegistrationSchema>

export async function registerForEvent(data: EventRegistrationData) {
  try {
    // Validate the form data
    const validatedData = eventRegistrationSchema.parse(data)

    // In a real application, you would save this to your database
    // For now, we'll simulate a successful registration with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Log the registration (would be saved to DB in production)
    console.log("Event registration:", validatedData)

    // Return success response
    return {
      success: true,
      message: `You've successfully registered for "${validatedData.eventTitle}"!`,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors
      return {
        success: false,
        message: "Please check your information and try again.",
        errors: error.errors,
      }
    }

    // Return generic error
    return {
      success: false,
      message: "Registration failed. Please try again later.",
    }
  }
}
