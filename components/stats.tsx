"use client";

import { Building, Clock, Globe, Users } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainerVariants } from '@/lib/animation-utils';
import AnimatedCounter from './animated-counter';

const stats = [
  {
    id: "years",
    value: "32+",
    label: "Years of Experience",
    icon: Clock
  },
  {
    id: "experts",
    value: "50+",
    label: "Qualified Experts",
    icon: Users,
  },
  {
    id: "clients",
    value: "250+",
    label: "Satisfied Clients",
    icon: Building,
  },
  {
    id: "partners",
    value: "10+",
    label: "International Partners",
    icon: Globe,
  }
]

const Stats = () => {
  return (
    <section className="py-16 bg-emerald-600 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="flex justify-center mb-4"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <stat.icon size={32} />
              </motion.div>
              <AnimatedCounter end={stat.value} className="text-4xl font-bold mb-2" duration={1.5} />
              <div className="text-emerald-100">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Stats