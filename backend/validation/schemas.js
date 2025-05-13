import { z } from "zod"

// User validation schemas
export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "editor", "viewer"]).optional(),
})

// Insight validation schema
export const insightSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title cannot exceed 100 characters"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().optional(),
})

// Brochure validation schema
export const brochureSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title cannot exceed 100 characters"),
  fileUrl: z.string().min(1, "File URL is required"),
})

// Team Member validation schema
export const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  designation: z.string().min(1, "Designation is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
})

// Testimonial validation schema
export const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  company: z.string().min(1, "Company is required"),
  quote: z.string().min(1, "Quote is required"),
  rating: z.enum(["1", "2", "3", "4", "5"]),
  service: z.string().min(1, "Service is required"),
  imageUrl: z.string().optional(),
})

// Event validation schema
export const scheduleItemSchema = z.object({
  time: z.string().min(1, "Time is required"),
  title: z.string().min(1, "Title is required"),
})

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  location: z.string().min(1, "Location is required"),
  attendees: z.string().min(1, "Attendees is required"),
  description: z.string().min(1, "Description is required"),
  learningObjectives: z.string().optional(),
  targetAudience: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  scheduleItems: z.array(scheduleItemSchema).optional(),
  type: z.enum(["current", "upcoming"]),
})

// Registered validation schema
export const registeredSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  eventId: z.string().min(1, "Event ID is required"),
})
