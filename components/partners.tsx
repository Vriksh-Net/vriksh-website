"use client"

import Image from "next/image"
import { motion, useAnimation, useInView } from "framer-motion"
import AnimatedSection from "@/components/animated-section"
import { staggerContainerVariants } from "@/lib/animation-utils"
import { useEffect, useRef } from "react"

const partners = [
  { id: 1, name: "Partner 1", logo: "/Birla.jpg" },
  { id: 2, name: "Partner 2", logo: "/GHCL.jpeg" },
  { id: 3, name: "Partner 3", logo: "/BPCL.png" },
  { id: 4, name: "Partner 4", logo: "/Walmart.png" },
  { id: 5, name: "Partner 5", logo: "/Soprema.png" },
  { id: 6, name: "Partner 6", logo: "/TOI.jpg" },
  { id: 7, name: "Partner 4", logo: "/Walmart.png" },
  { id: 8, name: "Partner 5", logo: "/Soprema.png" },
  { id: 9, name: "Partner 6", logo: "/TOI.jpg" },
];

// Duplicate the partners array to create a seamless infinite scroll effect
const allPartners = [...partners, ...partners]

const Partners = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <section ref={containerRef} className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Background pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      <div className="container mx-auto px-4 relative">
        <AnimatedSection animation="slide">
          <div className="text-center mb-12">
            <motion.div
              className="inline-block px-4 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Trusted By
            </motion.div>
            <h2 className="text-3xl font-bold mb-4">Our Partners</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We collaborate with leading organizations to deliver exceptional value to our clients.
            </p>
          </div>
        </AnimatedSection>

        {/* Scrolling partners container */}
        <div className="relative overflow-hidden w-full py-4" ref={scrollContainerRef}>
          <div className="flex flex-nowrap gap-8 logos-slide">
            {allPartners.map((partner, index) => (
              <div key={`${partner.id}-${index}`} className="flex-shrink-0 group relative">
                <div className="relative h-16 w-32 md:h-20 md:w-40 overflow-hidden rounded-md p-2 bg-white shadow-sm">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full relative"
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 rounded-md"
                    transition={{ duration: 0.3 }}
                  />

                  {/* Shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicators
        <div className="flex justify-center mt-8 gap-2">
          <div className="h-1 w-12 bg-emerald-500 rounded-full"></div>
          <div className="h-1 w-6 bg-gray-300 rounded-full"></div>
          <div className="h-1 w-6 bg-gray-300 rounded-full"></div>
        </div> */}
      </div>

      {/* CSS for the scrolling animation */}
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 2));
          }
        }
        
        .logos-slide {
          animation: scroll 30s linear infinite;
          width: calc(160px * ${allPartners.length});
        }
        
        .logos-slide:hover {
          animation-play-state: paused;
        }
        
        @media (min-width: 768px) {
          .logos-slide {
            width: calc(200px * ${allPartners.length});
          }
        }
      `}</style>
    </section>
  )
}

export default Partners
