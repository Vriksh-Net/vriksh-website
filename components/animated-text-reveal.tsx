"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface AnimatedTextRevealProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  duration?: number
  staggerChildren?: number
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
  animationType?: "characters" | "words" | "lines"
}

const AnimatedTextReveal = ({
  text,
  className = "",
  once = true,
  delay = 0,
  duration = 0.05,
  staggerChildren = 0.03,
  tag = "p",
  animationType = "words",
}: AnimatedTextRevealProps) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const getAnimationVariants = () => {
    const baseVariants = {
      hidden: {
        opacity: 0,
        y: 20,
        transition: {
          type: "spring",
          damping: 12,
        },
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 12,
          staggerChildren,
          delayChildren: delay,
        },
      },
    }

    const childVariants = {
      hidden: {
        opacity: 0,
        y: 20,
        transition: {
          type: "spring",
          damping: 12,
        },
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 12,
          duration,
        },
      },
    }

    return { baseVariants, childVariants }
  }

  const { baseVariants, childVariants } = getAnimationVariants()

  const renderContent = () => {
    if (animationType === "characters") {
      return (
        <motion.span
          ref={ref}
          className="inline-block"
          initial="hidden"
          animate={controls}
          variants={baseVariants}
          aria-label={text}
        >
          {Array.from(text).map((char, index) => (
            <motion.span key={index} className="inline-block" variants={childVariants}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.span>
      )
    } else if (animationType === "words") {
      return (
        <motion.span
          ref={ref}
          className="inline-block"
          initial="hidden"
          animate={controls}
          variants={baseVariants}
          aria-label={text}
        >
          {text.split(" ").map((word, index) => (
            <motion.span key={index} className="inline-block" variants={childVariants}>
              {word}
              {index !== text.split(" ").length - 1 && "\u00A0"}
            </motion.span>
          ))}
        </motion.span>
      )
    } else {
      // Lines
      return (
        <motion.span
          ref={ref}
          className="block"
          initial="hidden"
          animate={controls}
          variants={baseVariants}
          aria-label={text}
        >
          {text.split("\n").map((line, index) => (
            <motion.span key={index} className="block" variants={childVariants}>
              {line}
            </motion.span>
          ))}
        </motion.span>
      )
    }
  }

  const Tag = tag
  return <Tag className={className}>{renderContent()}</Tag>
}

export default AnimatedTextReveal
