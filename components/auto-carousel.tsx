"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Carousel, type CarouselApi } from "@/components/ui/carousel"

interface AutoCarouselProps {
  setApi: (api: CarouselApi) => void
  interval?: number
  children: React.ReactNode
  className?: string
  opts?: any
}

export function AutoCarousel({ setApi, interval = 5000, children, className, opts }: AutoCarouselProps) {
  const [internalApi, setInternalApi] = useState<CarouselApi>()

  // Set up the external API reference
  useEffect(() => {
    if (!internalApi) return
    setApi(internalApi)
  }, [internalApi, setApi])

  // Set up auto-rotation
  useEffect(() => {
    if (!internalApi) return

    const autoplayInterval = setInterval(() => {
      if (document.visibilityState === "visible") {
        internalApi.scrollNext()
      }
    }, interval)

    return () => clearInterval(autoplayInterval)
  }, [internalApi, interval])

  return (
    <Carousel
      setApi={setInternalApi}
      opts={{
        loop: true,
        ...opts,
      }}
      className={className}
    >
      {children}
    </Carousel>
  )
}
