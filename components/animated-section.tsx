"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { fadeInVariants, slideUpVariants, getReducedMotion } from "@/lib/animation-utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: "fade" | "slide" | "none"
  delay?: number
  threshold?: number
  once?: boolean
}

const AnimatedSection = ({
  children,
  className = "",
  animation = "fade",
  delay = 0,
  threshold = 0.2,
  once = true,
}: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, threshold })
  const prefersReducedMotion = getReducedMotion()

  // If user prefers reduced motion, don't animate
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  // Choose animation variant based on prop
  const variants = animation === "slide" ? slideUpVariants : fadeInVariants

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedSection
