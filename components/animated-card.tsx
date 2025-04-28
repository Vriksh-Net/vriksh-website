"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { getReducedMotion } from "@/lib/animation-utils"

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  hoverEffect?: "lift" | "glow" | "border" | "scale" | "tilt" | "shine" | "none"
  delay?: number
  hoverScale?: number
}

const AnimatedCard = ({
  children,
  className,
  hoverEffect = "lift",
  delay = 0,
  hoverScale = 1.03,
  ...props
}: AnimatedCardProps) => {
  const prefersReducedMotion = getReducedMotion()

  // If user prefers reduced motion, return regular card
  if (prefersReducedMotion || hoverEffect === "none") {
    return (
      <Card className={className} {...props}>
        {children}
      </Card>
    )
  }

  // Base animation for appearing
  const baseVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay,
      },
    },
  }

  // Get hover effect styles
  const getHoverStyles = () => {
    switch (hoverEffect) {
      case "glow":
        return "transition-all duration-300"
      case "border":
        return "hover:border-emerald-400 transition-colors duration-300"
      case "shine":
        return "overflow-hidden relative"
      case "tilt":
      case "scale":
      case "lift":
      default:
        return "transition-all duration-300"
    }
  }

  // Get hover animation variants
  const getHoverVariants = () => {
    switch (hoverEffect) {
      case "glow":
        return {
          hover: {
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.2), 0 8px 10px -6px rgba(16, 185, 129, 0.1)",
            transition: { duration: 0.3 },
          },
        }
      case "border":
        return {
          hover: { y: -5, transition: { duration: 0.2 } },
        }
      case "scale":
        return {
          hover: { scale: hoverScale, transition: { duration: 0.2 } },
        }
      case "tilt":
        return {
          hover: {
            rotateX: 5,
            rotateY: 5,
            y: -5,
            transition: { duration: 0.2 },
          },
        }
      case "shine":
        return {
          hover: { y: -8, transition: { duration: 0.2 } },
        }
      case "lift":
      default:
        return {
          hover: { y: -8, transition: { duration: 0.2 } },
        }
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        ...baseVariants,
        ...getHoverVariants(),
      }}
      className={hoverEffect === "tilt" ? "perspective-1000" : ""}
    >
      <Card className={cn(getHoverStyles(), className)} {...props}>
        {children}

        {hoverEffect === "shine" && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-lg"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.div
              className="absolute top-0 -left-3/4 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-12 pointer-events-none"
              initial={{ left: "-75%" }}
              whileHover={{ left: "125%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </Card>
    </motion.div>
  )
}

export default AnimatedCard
