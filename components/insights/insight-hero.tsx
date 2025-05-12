"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AnimatedText from "@/components/animated-text";
import { fadeInVariants } from "@/lib/animation-utils";

const InsightsHero = () => {
  return (
    <section className="relative bg-emerald-800 py-24 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
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
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-emerald-600 opacity-20 blur-3xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-emerald-700 opacity-20 blur-3xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            className="mb-6 inline-block px-4 py-1 bg-emerald-700/50 rounded-full text-emerald-100 text-sm font-medium backdrop-blur-sm"
          >
            Thought Leadership & Industry Expertise
          </motion.div>

          <AnimatedText
            text="Insights & Resources"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            type="words"
          />

          <motion.p
            className="text-lg text-emerald-100 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Explore our latest thoughts on industry trends, business strategies,
            and innovative solutions to help your business thrive.
          </motion.p>

          <motion.div
            className="relative max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Input
              type="text"
              placeholder="Search insights..."
              className="pl-12 py-6 bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm rounded-full focus:ring-emerald-400 focus:border-emerald-400"
            />
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70"
              size={20}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InsightsHero;
