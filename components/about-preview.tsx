"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/animated-section";
import {
  slideInLeftVariants,
  slideInRightVariants,
} from "@/lib/animation-utils";
import { Button } from "@/components/ui/button";

const AboutPreview = () => {
  return (
    <section className="py-20 overflow-hidden bg-gradient-to-b from-green-100 to-gray-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <AnimatedSection animation="slide" className="relative">
            <motion.div
              className="relative h-64 xs:h-80 sm:h-96 md:h-[400px] w-full rounded-lg overflow-hidden"
              variants={slideInLeftVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                margin: "-100px",
              }}
            >
              <Image
                src="/images/about.gif"
                alt="About Vriksh Consulting"
                fill
                className="object-contain transition-transform duration-500 ease-in-out hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                unoptimized
              />

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-16 h-16 bg-emerald-400 rounded-full opacity-60"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5,
                }}
              />
            </motion.div>
          </AnimatedSection>

          <AnimatedSection animation="slide">
            <motion.div
              variants={slideInRightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                margin: "-100px",
              }}
            >
              <h2 className="text-3xl font-semibold mb-6 text-gray-600">
                About Us
              </h2>
              <p className="text-gray-600 mb-6 text-regular">
                At Vriksh Consulting, we are dedicated to helping businesses and
                startups reach their full potential. With our comprehensive
                range of services, we provide tailored solutions that address
                the unique challenges and opportunities of each client.
              </p>
              <p className="text-gray-600 mb-8 text-regular">
                Our team of experienced professionals brings expertise across
                multiple domains, from financial services and sales enablement
                to digital solutions and market research. We partner with our
                clients to drive sustainable growth and achieve measurable
                results.
              </p>
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/about" className="flex items-center gap-2">
                  Learn More About Us
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
