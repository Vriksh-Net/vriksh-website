"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import type { GalleryImage } from "@/lib/gallery-data"
import ImageModal from "./image-modal"

interface GalleryGridProps {
  images: GalleryImage[]
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  // Create columns for masonry layout
  const getColumns = () => {
    const columns: GalleryImage[][] = [[], [], [], []]

    images.forEach((image, index) => {
      columns[index % 4].push(image)
    })

    return columns
  }

  const columns = getColumns()

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4">
            {column.map((image, imgIndex) => (
              <motion.div
                key={image.id}
                className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: colIndex * 0.1 + imgIndex * 0.05 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm p-2 rounded-md w-full">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{image.title}</h3>
                      <p className="text-xs text-gray-600">{image.category}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
        images={images}
        setSelectedImage={setSelectedImage}
      />
    </>
  )
}
