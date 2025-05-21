"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { GalleryCategory } from "@/lib/gallery-data"

interface GalleryCategoriesProps {
  categories: GalleryCategory[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export default function GalleryCategories({
  categories,
  selectedCategory,
  setSelectedCategory,
}: GalleryCategoriesProps) {
  return (
    <div className="mb-12">
      <motion.div
        className="flex flex-wrap justify-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className={`rounded-full ${
              selectedCategory === category.id
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "hover:text-emerald-600 hover:border-emerald-600"
            }`}
          >
            {category.name}
          </Button>
        ))}
      </motion.div>
    </div>
  )
}
