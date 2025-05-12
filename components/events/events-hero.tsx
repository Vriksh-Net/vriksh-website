"use client";

import { motion } from "framer-motion";
import { Calendar, Users, MapPin } from "lucide-react";
import AnimatedText from "@/components/animated-text";

export interface AnimatedTextProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClass?: string;
}

const EventsHero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-40 right-0 w-72 h-72 bg-emerald-300 rounded-full opacity-20 blur-3xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-64 h-64 bg-emerald-400 rounded-full opacity-10 blur-3xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Calendar size={16} className="animate-pulse" />
            <span className="text-sm font-medium">Connect & Grow with Us</span>
          </motion.div>

          <AnimatedText
            text="Discover Our Events"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            
            highlightWords={["Events"]}
          />

          <motion.p
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Join us for insightful workshops, engaging webinars, and networking
            opportunities designed to help your business thrive in today's
            competitive landscape.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-8 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md">
              <div className="bg-emerald-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">This Year</p>
                <p className="font-semibold">25+ Events</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md">
              <div className="bg-emerald-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">Community</p>
                <p className="font-semibold">5,000+ Attendees</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md">
              <div className="bg-emerald-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">Locations</p>
                <p className="font-semibold">Global Presence</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EventsHero;
