"use client"

import type React from "react"

import { useState, type ReactNode } from "react"
import { motion } from "framer-motion"

interface PerspectiveCardProps {
  children: ReactNode
  className?: string
  depth?: number
  glare?: boolean
}

const PerspectiveCard = ({ children, className = "", depth = 30, glare = true }: PerspectiveCardProps) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    // Calculate mouse position relative to card center (in percentage, -50% to 50%)
    const mouseXPercentage = ((e.clientX - rect.left) / width - 0.5) * 2
    const mouseYPercentage = ((e.clientY - rect.top) / height - 0.5) * 2

    // Set rotation values (negative to make card follow mouse)
    setRotateX(-mouseYPercentage * depth)
    setRotateY(mouseXPercentage * depth)

    // Store mouse position for glare effect
    setMouseX(mouseXPercentage)
    setMouseY(mouseYPercentage)
  }

  const handleMouseLeave = () => {
    // Reset to flat position
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className={`relative perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.5,
      }}
    >
      {children}

      {glare && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-inherit overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${50 + mouseX * 50}% ${50 + mouseY * 50}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 60%)`,
            mixBlendMode: "overlay",
          }}
          animate={{
            opacity: Math.sqrt(mouseX ** 2 + mouseY ** 2) * 1.5,
          }}
        />
      )}
    </motion.div>
  )
}

export default PerspectiveCard
