"use client"

import type React from "react"
import { Button } from "@/components/ui/button"

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
  animationType?: "none" | "shine"
  hoverScale?: number
}

const AnimatedButton = ({
  children,
  className,
  animationType = "none",
  hoverScale = 1,
  ...props
}: AnimatedButtonProps) => {
  // Return regular button without animations
  return (
    <Button className={className} {...props}>
      {children}
    </Button>
  )
}

export default AnimatedButton
