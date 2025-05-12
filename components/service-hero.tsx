"use client";

import React from "react";
import { motion } from "framer-motion";
import AnimatedText from "./animated-text";
import { getReducedMotion } from "@/lib/animation-utils";

interface ServiceHeroProps {
  title: string;
  description: string;
}

const ServiceHero = ({ title, description }: ServiceHeroProps) => {
  const prefersReducedMotion = getReducedMotion();

  return (
    <div className="bg-gray-400 py-20 text-white relative overflow-hidden">
      {/* Background pattern */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="hero-grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </motion.div>
      )}

      {/* Decorative elements */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 rounded-full bg-emerald-500 opacity-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-emerald-700 opacity-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </>
      )}

      <div className="container mx-auto px-4 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatedText
            text={title}
            className="text-4xl md:text-5xl font-bold mb-6"
            type="words"
          />
          <motion.p
            className="text-lg text-emerald-100 max-w-2xl mx-auto text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceHero;
