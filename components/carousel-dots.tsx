"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface CarouselDotsProps {
  api: any
  count: number
  className?: string
}

export function CarouselDots({ api, count, className }: CarouselDotsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap())
    }

    api.on("select", onSelect)

    // Set initial state
    setActiveIndex(api.selectedScrollSnap())

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  const goToSlide = (index: number) => {
    api?.scrollTo(index)
  }

  return (
    <div className={cn("flex gap-2 items-center justify-center", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          className={cn(
            "w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
            activeIndex === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70",
          )}
          onClick={() => goToSlide(index)}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={activeIndex === index ? "true" : "false"}
        />
      ))}
    </div>
  )
}
