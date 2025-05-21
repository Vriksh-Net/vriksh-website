"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import GalleryCategories from "./gallery-categories"
import GalleryGrid from "./gallery-grid"
import { galleryData } from "@/lib/gallery-data"

export default function GalleryContent() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredImages, setFilteredImages] = useState(galleryData.flatMap((category) => category.images))

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredImages(galleryData.flatMap((category) => category.images))
    } else {
      const category = galleryData.find((cat) => cat.id === selectedCategory)
      setFilteredImages(category ? category.images : [])
    }
  }, [selectedCategory])

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <GalleryCategories
          categories={galleryData}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <GalleryGrid images={filteredImages} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
