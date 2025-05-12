"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedText from "@/components/animated-text";
import { getReducedMotion } from "@/lib/animation-utils";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const prefersReducedMotion = getReducedMotion();

  return (
    <div className="relative w-full h-[80vh] min-h-[600px] bg-gray-900 overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/banner-second.jpg')",
        }}
        initial={{
          scale: prefersReducedMotion ? 1 : 1.1,
          filter: "brightness(0.4)",
        }}
        animate={{
          scale: 1,
          filter: "brightness(0.4)",
          transition: {
            duration: 1.5,
            ease: "easeOut",
          },
        }}
      />

      {/* Animated Overlay Pattern */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 to-transparent"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 1.2,
            },
          }}
        />
      )}

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-start mt-30">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="mb-6"
        >
          <AnimatedText
            text="Helping businesses grow"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-200 max-w-3xl text-shadow-custom"
            type="words"
            delay={0.1}
          />
        </motion.div>

        <motion.p
          className="text-md md:text-lg text-gray-400 mb-8 max-w-2xl"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.4,
          }}
        >
          Comprehensive consulting solutions to elevate your business strategy,
          optimize operations, and drive sustainable growth.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            size="lg"
            className="bg-emerald-200 hover:bg-emerald-700 text-gray-500 hover:text-white"
          >
            <Link href="/services">Our Services</Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-emerald-200 hover:bg-emerald-700 text-gray-500 hover:text-white"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>

      {/* Animated Bottom Wave */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-16 md:h-18"
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 0.7,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.6,
          }}
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0L48 8.875C96 17.75 192 35.5 288 44.375C384 53.25 480 53.25 576 44.375C672 35.5 768 17.75 864 26.625C960 35.5 1056 71 1152 80.125C1248 89 1344 71 1392 62.125L1440 53.25V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z"
              fill="#6ef073"
            />
          </svg>
        </motion.div>
      )}
    </div>
  );
};

export default Hero;
