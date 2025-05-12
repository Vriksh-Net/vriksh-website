"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { getReducedMotion } from "@/lib/animation-utils"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { CarouselDots } from "./carousel-dots"

interface BannerImage {
  url: string
  alt: string
}

interface BannerCarouselProps {
  images: BannerImage[]
  autoPlay?: boolean
  interval?: number
  showControls?: boolean
}

export default function BannerCarousel({
  images,
  autoPlay = true,
  interval = 5000,
  showControls = true,
}: BannerCarouselProps) {
  const prefersReducedMotion = getReducedMotion()
  const [api, setApi] = useState<any>(null)

  // Auto-play functionality
  useEffect(() => {
    if (!api || !autoPlay || prefersReducedMotion) return

    const intervalId = setInterval(() => {
      api.scrollNext()
    }, interval)

    return () => clearInterval(intervalId)
  }, [api, autoPlay, interval, prefersReducedMotion])

  return (
    <div className="relative w-full h-full">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
        }}
        className="w-full h-full"
      >
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <motion.div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('${image.url}')`,
                }}
                initial={{ scale: prefersReducedMotion ? 1 : 1.1, filter: "brightness(0.4)" }}
                animate={{
                  scale: 1,
                  filter: "brightness(0.4)",
                  transition: { duration: 1.5, ease: "easeOut" },
                }}
                aria-label={image.alt}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {showControls && (
          <>
            <CarouselPrevious className="left-4 z-10 bg-white/10 hover:bg-white/20 border-white/20" />
            <CarouselNext className="right-4 z-10 bg-white/10 hover:bg-white/20 border-white/20" />
          </>
        )}
      </Carousel>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <CarouselDots api={api} count={images.length} />
      </div>
    </div>
  )
}
