"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/animated-section";
import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getTrendingArticles, type Article } from "@/lib/insight";
import { trackArticleImpression } from "@/lib/analytics";

export default function ArticleInsights() {
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        // Get 6 trending articles instead of 3 since we're removing the featured section
        const trending = await getTrendingArticles(6);
        setTrendingArticles(trending);

        // Track impressions for these articles
        trending.forEach((article) => {
          trackArticleImpression(article.id, article.title);
        });
      } catch (error) {
        console.error("Error fetching insights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="slide">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Latest Insights</h2>
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

        {/* Trending Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingArticles.map((article, index) => (
            <motion.div
              key={article.slug}
              className="relative border border-gray-100 bg-white rounded-xl p-6 hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-40 w-full mb-4 overflow-hidden rounded-lg">
                <Image
                  src={
                    article.image_url || "/placeholder.svg?height=400&width=600"
                  }
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>

              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full mb-3">
                {article.category}
              </span>

              <h3 className="text-xl font-semibold mb-3">{article.title}</h3>

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

              <Link
                href={`/insights/${article.slug}`}
                className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 group"
                onClick={() =>
                  trackArticleImpression(
                    article.id,
                    article.title,
                    "homepage_click"
                  )
                }
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
