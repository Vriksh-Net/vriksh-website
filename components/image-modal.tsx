"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { GalleryImage } from "@/lib/gallery-data"

interface ImageModalProps {
  image: GalleryImage | null
  onClose: () => void
  images: GalleryImage[]
  setSelectedImage: (image: GalleryImage) => void
}

export default function ImageModal({ image, onClose, images, setSelectedImage }: ImageModalProps) {
  const [isLoading, setIsLoading] = useState(true)

  // Handle keyboard navigation
  useEffect(() => {
    if (!image) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowRight") {
        navigateToImage("next")
      } else if (e.key === "ArrowLeft") {
        navigateToImage("prev")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [image, onClose])

  // Reset loading state when image changes
  useEffect(() => {
    setIsLoading(true)
  }, [image])

  if (!image) return null

  const currentIndex = images.findIndex((img) => img.id === image.id)

  const navigateToImage = (direction: "prev" | "next") => {
    const newIndex =
      direction === "next" ? (currentIndex + 1) % images.length : (currentIndex - 1 + images.length) % images.length

    setSelectedImage(images[newIndex])
  }

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-2 right-2 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
              onClick={onClose}
            >
              <X size={20} />
            </button>

            {/* Navigation buttons */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                navigateToImage("prev")
              }}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                navigateToImage("next")
              }}
            >
              <ChevronRight size={24} />
            </button>

            {/* Image */}
            <div className="relative w-full aspect-[16/9] md:aspect-auto md:h-[70vh]">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.title}
                fill
                className="object-contain"
                onLoadingComplete={() => setIsLoading(false)}
              />
            </div>

            {/* Image details */}
            <div className="p-4 bg-white">
              <h3 className="text-xl font-semibold text-gray-900">{image.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{image.description}</p>
              <p className="text-xs text-emerald-600 mt-2">
                {image.category} • {image.date}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
