"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, ArrowRight, Clock } from "lucide-react";
import AnimatedSection from "@/components/animated-section";
import { staggerContainerVariants } from "@/lib/animation-utils";

interface TrendingInsightsProps {
  articles: Array<{
    slug: string;
    title: string;
    category: string;
    read_time: string;
  }>;
}

const TrendingInsights = ({ articles }: TrendingInsightsProps) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="slide">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold">Trending Insights</h2>
          </div>
        </AnimatedSection>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {articles.map((article, index) => (
            <motion.div
              key={article.slug}
              className="relative border border-gray-100 rounded-xl p-6 hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full mb-4">
                {article.category}
              </span>

              <h3 className="text-xl font-semibold mb-3">{article.title}</h3>

              <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                <Clock size={14} />
                <span>{article.read_time}</span>
              </div>

              <Link
                href={`/insights/${article.slug}`}
                className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 group"
              >
                Read article
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </motion.span>
              </Link>

              {/* Decorative number */}
              <div className="absolute top-4 right-4 text-5xl font-bold text-gray-100">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingInsights;
