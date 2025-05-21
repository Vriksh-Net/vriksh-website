"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxElementProps {
  children: ReactNode
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
  offset?: number
}

const ParallaxElement = ({
  children,
  speed = 0.5,
  direction = "up",
  className = "",
  offset = 300,
}: ParallaxElementProps) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Calculate transform values based on direction
  let transformValue
  const distance = offset * speed

  if (direction === "up") {
    transformValue = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  } else if (direction === "down") {
    transformValue = useTransform(scrollYProgress, [0, 1], [-distance, distance])
  } else if (direction === "left") {
    transformValue = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  } else if (direction === "right") {
    transformValue = useTransform(scrollYProgress, [0, 1], [-distance, distance])
  } else {
    transformValue = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        [direction === "left" || direction === "right" ? "x" : "y"]: transformValue,
      }}
    >
      {children}
    </motion.div>
  )
}

export default ParallaxElement
