"use client"

import { motion } from "framer-motion"
import { fadeIn } from "@/lib/animation-utils"

export default function GalleryHero() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our <span className="text-emerald-600">Gallery</span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our visual journey through awards, training sessions, events, and memorable moments that define
            Vriksh Consulting's culture and achievements.
          </motion.p>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div
        className="absolute -bottom-6 left-0 right-0 h-12 bg-white"
        style={{ clipPath: "polygon(0 0, 100% 100%, 100% 100%, 0% 100%)" }}
      ></div>

      {/* Animated dots */}
      <motion.div
        className="absolute top-20 left-10 w-24 h-24 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-emerald-500"></div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <div className="grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-emerald-500"></div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
