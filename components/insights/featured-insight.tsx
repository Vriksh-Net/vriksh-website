"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/animated-section";
import { formatDate } from "@/lib/utils";

interface FeaturedInsightProps {
  article: {
    slug: string;
    title: string;
    category: string;
    date: string;
    excerpt: string;
    image_url: string;
    read_time: string;
  };
}

const FeaturedInsight = ({ article }: FeaturedInsightProps) => {
  if (!article) {
    return null;
  }

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
              src={
                article.image_url || "/placeholder.svg?height=800&width=1200"
              }
              alt={article.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:bg-gradient-to-r" />

            <div className="absolute bottom-0 left-0 p-6 md:hidden">
              <span className="inline-block px-3 py-1 bg-emerald-600 text-white text-xs font-medium rounded-full mb-3">
                {article.category}
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">
                {article.title}
              </h3>
            </div>
          </div>

          <div className="md:col-span-2 p-6 md:p-10 flex flex-col justify-center">
            <div className="hidden md:block">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full mb-4">
                {article.category}
              </span>
            </div>

            <h3 className="hidden md:block text-3xl font-bold mb-4">
              {article.title}
            </h3>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{formatDate(article.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{article.read_time}</span>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{article.excerpt}</p>

            <div className="mt-auto">
              <Button
                asChild
                className="bg-emerald-600 hover:bg-emerald-700 group"
              >
                <Link
                  href={`/insights/${article.slug}`}
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
