"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface FloatingElementProps {
  children: ReactNode
  x?: number
  y?: number
  duration?: number
  delay?: number
  className?: string
}

const FloatingElement = ({
  children,
  x = 10,
  y = 10,
  duration = 4,
  delay = 0,
  className = "",
}: FloatingElementProps) => {
  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={{
        y: [y, -y, y],
        x: [x, -x, x],
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

export default FloatingElement
