"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/animated-section";

interface RelatedArticlesProps {
  articles: Array<{
    slug: string;
    title: string;
    category: string;
    excerpt: string;
    image_url: string;
    read_time: string;
  }>;
  category: string;
}

const RelatedArticles = ({ articles, category }: RelatedArticlesProps) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="slide">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">More from {category}</h2>
            <p className="text-gray-600">
              Explore more insights related to this topic
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {articles.map((article, index) => (
            <motion.div
              key={article.slug}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={
                    article.image_url || "/placeholder.svg?height=400&width=600"
                  }
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 line-clamp-2 hover:text-emerald-600 transition-colors">
                  {article.title}
                </h3>

                <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                  <Clock size={14} />
                  <span>{article.read_time}</span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                <Button
                  asChild
                  variant="ghost"
                  className="p-0 h-auto text-emerald-600 hover:text-emerald-700 hover:bg-transparent group"
                >
                  <Link
                    href={`/insights/${article.slug}`}
                    className="flex items-center gap-2"
                  >
                    Read article
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
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
          >
            <Link href="/insights">View all insights</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
