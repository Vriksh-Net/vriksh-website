"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Calendar, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/animated-section";
import AnimatedCard from "@/components/animated-card";
import { formatDate } from "@/lib/utils";
import { getArticles, type ArticlesResponse } from "@/lib/insight";

interface InsightsContentProps {
  initialCategories: string[];
}

const InsightsContent = ({ initialCategories }: InsightsContentProps) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalArticles, setTotalArticles] = useState(0);

  const categories = [
    { id: "all", name: "All Categories" },
    ...initialCategories.map((category) => ({
      id: category.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      name: category,
    })),
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const category =
          activeCategory === "all"
            ? ""
            : categories.find((c) => c.id === activeCategory)?.name;
        const data: ArticlesResponse = await getArticles({
          category: category || "",
          limit: visibleCount,
          page: 1,
        });

        if (data.articles) {
          setArticles(data.articles);
          setTotalArticles(data.pagination.total);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [activeCategory, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="slide">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8">Browse Our Insights</h2>

            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    activeCategory === category.id ? "default" : "outline"
                  }
                  className={
                    activeCategory === category.id
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "border-gray-200 text-gray-700 hover:border-emerald-600 hover:text-emerald-600"
                  }
                  onClick={() => {
                    setActiveCategory(category.id);
                    setVisibleCount(6);
                  }}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-12"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {articles.map((article, index) => (
                <AnimatedCard
                  key={article.slug}
                  className="border-gray-100 overflow-hidden group"
                  hoverEffect="lift"
                  delay={index * 0.1}
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      className="h-full w-full"
                    >
                      <Image
                        src={
                          article.image_url ||
                          "/placeholder.svg?height=400&width=600"
                        }
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500"
                      />
                    </motion.div>

                    {/* Share button overlay */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 bg-white/80 hover:bg-white backdrop-blur-sm"
                      >
                        <Share2 size={14} />
                      </Button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                        {article.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold mb-3 group-hover:text-emerald-600 transition-colors duration-300">
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
                        Read more
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
                </AnimatedCard>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {articles.length > 0 && articles.length < totalArticles && (
          <div className="mt-12 text-center">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            >
              Load More
            </Button>
          </div>
        )}

        {articles.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No articles found for this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default InsightsContent;
