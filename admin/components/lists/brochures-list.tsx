"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useItems } from "@/context/items-context"
import { Trash2, Edit, Search, FileText, Download } from "lucide-react"

export default function BrochuresList() {
  const { brochures, deleteBrochure } = useItems()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBrochures = brochures.filter((brochure) =>
    brochure.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold">Brochures</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search brochures..."
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

      {filteredBrochures.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center py-10"
        >
          <p className="text-gray-500">No brochures found</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredBrochures.map((brochure, index) => (
              <motion.div
                key={brochure.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <FileText className="h-10 w-10 text-blue-500 mr-3" />
                      <h3 className="font-semibold text-lg">{brochure.title}</h3>
                    </div>
                    <div className="flex space-x-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 text-gray-400 hover:text-blue-500"
                      >
                        <Edit size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 text-gray-400 hover:text-red-500"
                        onClick={() => deleteBrochure(brochure.id)}
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-xs text-gray-400">{new Date(brochure.createdAt).toLocaleDateString()}</div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center text-sm text-blue-500 hover:text-blue-700"
                    >
                      <Download size={14} className="mr-1" /> Download
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
