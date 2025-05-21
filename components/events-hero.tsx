"use client"

import { motion } from "framer-motion"
import { Calendar, Users, MapPin, Clock } from "lucide-react"

const EventsHero = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-emerald-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0 md:pr-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.span
              className="inline-block px-4 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Coming Soon
            </motion.span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Transformative Events for Industry Leaders
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Join our exclusive waitlist for early access to webinars, workshops, and networking events designed to
              elevate your business strategy and industry knowledge.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Calendar className="text-emerald-600" />, text: "Expert-led Webinars" },
                { icon: <Users className="text-emerald-600" />, text: "Networking Opportunities" },
                { icon: <MapPin className="text-emerald-600" />, text: "In-person Workshops" },
                { icon: <Clock className="text-emerald-600" />, text: "On-demand Content" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl transform rotate-3 opacity-20"></div>
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span className="font-medium text-emerald-600">Events Platform</span>
                    </div>
                    <div className="text-sm text-gray-500">Coming Q3 2023</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    {[1, 2, 3].map((item) => (
                      <motion.div
                        key={item}
                        className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-3 w-24 bg-gray-100 rounded mt-2 animate-pulse"></div>
                        </div>
                        <div className="ml-auto">
                          <div className="h-8 w-20 bg-emerald-100 rounded animate-pulse"></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="h-10 w-full bg-emerald-500 rounded-md animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-200 rounded-full opacity-70"></div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-emerald-200 rounded-full opacity-70"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default EventsHero
