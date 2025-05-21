"\"use client"

// Animation utility functions and constants for reuse across components
import type { Variants } from "framer-motion"

// Check if user prefers reduced motion
export const getReducedMotion = () => {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

// Fade in animation (subtle)
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// Slide up animation
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// Staggered children animation
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Scale animation for hover effects
export const scaleVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
  tap: { scale: 0.98 },
}

// Slide in from left
export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// Slide in from right
export const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// Animation for stats counter
export const counterVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
}

// Rotate animation for icons
export const rotateVariants: Variants = {
  initial: { rotate: 0 },
  hover: { rotate: 5, transition: { duration: 0.2 } },
}

// Bounce animation
export const bounceVariants: Variants = {
  initial: { y: 0 },
  hover: {
    y: -5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
    },
  },
}

// Glow animation for hover effects
export const glowVariants: Variants = {
  initial: { boxShadow: "0 0 0 rgba(16, 185, 129, 0)" },
  hover: {
    boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)",
    transition: { duration: 0.3 },
  },
}

// Pulse animation
export const pulseVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: [1, 1.02, 1],
    transition: {
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      duration: 1.2,
    },
  },
}

// Shine effect animation
export const shineVariants: Variants = {
  initial: { x: "-100%" },
  hover: { x: "100%", transition: { duration: 0.8 } },
}

// Underline animation
export const underlineVariants: Variants = {
  initial: { width: "0%" },
  hover: {
    width: "100%",
    transition: { duration: 0.3 },
  },
}

// Tilt animation
export const tiltVariants: Variants = {
  initial: { rotateX: 0, rotateY: 0 },
  hover: {
    rotateX: 5,
    rotateY: 5,
    transition: { duration: 0.2 },
  },
}

// Slide animation for buttons
export const slideButtonVariants: Variants = {
  initial: { x: 0 },
  hover: {
    x: 5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
}
