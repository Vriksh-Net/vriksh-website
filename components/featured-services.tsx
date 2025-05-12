"use client";

import { ArrowRight, Coins, Globe, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import AnimatedSection from "./animated-section";
import {
  staggerContainerVariants,
  getReducedMotion,
} from "@/lib/animation-utils";
import Animatedcard from "./animated-card";
import { Button } from "./ui/button";
import Link from "next/link";

const services = [
  {
    id: "money",
    title: "Vriksh.Money",
    description:
      "We provide all types of loans, including business loans and MSME funding, tailored for startups.",
    icon: Coins,
    href: "/services#money",
  },
  {
    id: "grow",
    title: "Vriksh.Grow",
    description:
      "We specialise in sales enablement and assist companies in creating effective sales plans to expand their sales.",
    icon: TrendingUp,
    href: "/services#grow",
  },
  {
    id: "net",
    title: "Vriksh.Net",
    description:
      "We offer digital solutions, including website development, mobile app development, and digital marketing.",
    icon: Globe,
    href: "/services#net",
  },
];

const FeaturedServices = () => {
  const prefersReducedMotion = getReducedMotion();

  return (
    <section className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="slide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">
              Our Services
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Comprehensive solutions tailored to help your business thrive in
              today's competitive landscape.
            </p>
          </div>
        </AnimatedSection>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-100px",
          }}
        >
          {services.map((service, index) => (
            <Animatedcard
              key={service.id}
              className="border-gray-400 hover:shadow-lg transition-all duration-300"
              hoverEffect="glow"
              delay={prefersReducedMotion ? 0 : index * 0.1}
            >
              <div className="p-6 group">
                <motion.div
                  className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors duration-300"
                  whileHover={{
                    rotate: 5,
                    scale: 1.05,
                  }}
                  transition={{
                    type: "string",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <service.icon className="h-6 w-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Button
                  asChild
                  variant="ghost"
                  className="p-0 h-auto text-emerald-600 hover:text-emerald-700 hover:bg-transparent group"
                >
                  <Link
                    href={service.href}
                    className="flex items-center gap-3 relative overflow-hidden"
                  >
                    <span className="relative z-10">Learn More</span>
                    <motion.span
                      className="relative z-10"
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
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 bg-emerald-600 w-0 group-hover:w-full transition-all duration-300"
                      initial={{ width: "0%" }}
                      whileHover={{ width: "100%" }}
                    />
                  </Link>
                </Button>
              </div>
            </Animatedcard>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
          >
            <Link href="/services" className="flex items-center gap-2">
              View All Services
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </Link>
          </Button>
        </div>
      </div>
      {/* Animated Bottom Wave */}
      {!prefersReducedMotion && (
        <motion.div
          className="relative top-20 left-0 right-0 h-16 md:h-24"
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
    </section>
  );
};

export default FeaturedServices;
