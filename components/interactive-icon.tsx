"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface InteractiveIconProps {
  icon: LucideIcon
  size?: number
  color?: string
  hoverColor?: string
  pulseColor?: string
  label?: string
  onClick?: () => void
}

const InteractiveIcon = ({
  icon: Icon,
  size = 24,
  color = "currentColor",
  hoverColor = "#10b981",
  pulseColor = "rgba(16, 185, 129, 0.2)",
  label,
  onClick,
}: InteractiveIconProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative inline-flex items-center justify-center cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {isHovered && (
        <motion.div
          className="absolute rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1.5,
            backgroundColor: pulseColor,
          }}
          exit={{ opacity: 0, scale: 2 }}
          style={{
            width: size * 2,
            height: size * 2,
          }}
        />
      )}
      <motion.div
        animate={{
          color: isHovered ? hoverColor : color,
          rotate: isHovered ? [0, -10, 10, -5, 5, 0] : 0,
        }}
        transition={{
          duration: 0.5,
          rotate: {
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
      >
        <Icon size={size} />
      </motion.div>
      {label && isHovered && (
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
        >
          {label}
        </motion.div>
      )}
    </motion.div>
  )
}

export default InteractiveIcon
