"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/animated-section";

const FeaturedInsight = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="slide">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Insight</h2>
            <Button
              asChild
              variant="ghost"
              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 group"
            >
              <Link href="/insights" className="flex items-center gap-2">
                View all insights
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
        </AnimatedSection>

        <motion.div
          className="grid md:grid-cols-5 gap-8 bg-white rounded-2xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="md:col-span-3 relative h-[300px] md:h-auto">
            <Image
              src="/placeholder.svg?height=800&width=1200"
              alt="The Future of AI in Business Operations"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:bg-gradient-to-r" />

            <div className="absolute bottom-0 left-0 p-6 md:hidden">
              <span className="inline-block px-3 py-1 bg-emerald-600 text-white text-xs font-medium rounded-full mb-3">
                AI & Technology
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">
                The Future of AI in Business Operations
              </h3>
            </div>
          </div>

          <div className="md:col-span-2 p-6 md:p-10 flex flex-col justify-center">
            <div className="hidden md:block">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full mb-4">
                AI & Technology
              </span>
            </div>

            <h3 className="hidden md:block text-3xl font-bold mb-4">
              The Future of AI in Business Operations
            </h3>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>April 15, 2025</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>8 min read</span>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              Artificial intelligence is revolutionizing how businesses operate,
              from automating routine tasks to providing deep insights from
              complex data. Explore how leading companies are implementing AI
              solutions to drive efficiency, reduce costs, and create new
              opportunities for growth in today's competitive landscape.
            </p>

            <div className="mt-auto">
              <Button
                asChild
                className="bg-emerald-600 hover:bg-emerald-700 group"
              >
                <Link
                  href="/insights/ai-tech"
                  className="flex items-center gap-2"
                >
                  Read full article
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
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedInsight;
