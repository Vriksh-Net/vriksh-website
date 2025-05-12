"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Filter, ChevronDown } from "lucide-react";

interface InsightsFilterProps {
  categories: { id: string; name: string }[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const InsightsFilter = ({
  categories,
  activeCategory,
  onCategoryChange,
}: InsightsFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (categoryId: string) => {
    onCategoryChange(categoryId);
    setIsOpen(false);
  };

  return (
    <div className="relative mb-8">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="md:hidden">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={toggleFilter}
          >
            <Filter size={16} />
            <span>Filter</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </Button>
        </div>

        <div className="hidden md:flex flex-wrap gap-3">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={
                activeCategory === category.id
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "border-gray-200 text-gray-700 hover:border-emerald-600 hover:text-emerald-600"
              }
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Mobile filter dropdown */}
      {isOpen && (
        <motion.div
          className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-100 py-2 md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`w-full text-left px-4 py-2 text-sm ${
                activeCategory === category.id
                  ? "bg-emerald-50 text-emerald-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => handleCategoryClick(category.id)}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default InsightsFilter;
