"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { counterVariants, getReducedMotion } from "@/lib/animation-utils"

interface AnimatedCounterProps {
  end: number | string
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

const AnimatedCounter = ({ end, duration = 2, prefix = "", suffix = "", className = "" }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 } as any)
  const prefersReducedMotion = getReducedMotion()

  // Convert string like "10+" to number
  const targetNumber = typeof end === "string" ? Number.parseInt(end.replace(/\D/g, "")) : end
  const extraSuffix = typeof end === "string" ? end.replace(/[0-9]/g, "") : suffix

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      setCount(targetNumber)
      return
    }

    let startTime: number
    let animationFrame: number

    const countUp = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      setCount(Math.floor(progress * targetNumber))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(countUp)
      }
    }

    animationFrame = requestAnimationFrame(countUp)

    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, targetNumber, duration, prefersReducedMotion])

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        {prefix}
        {targetNumber}
        {extraSuffix || suffix}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={counterVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {prefix}
      {count}
      {extraSuffix || suffix}
    </motion.div>
  )
}

export default AnimatedCounter
