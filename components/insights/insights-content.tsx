"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Calendar, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/animated-section";
import AnimatedCard from "@/components/animated-card";

const categories = [
  { id: "all", name: "All Categories" },
  { id: "ai-tech", name: "AI & Technology" },
  { id: "startups", name: "New Startups and Ideas" },
  { id: "marketing", name: "Business Marketing" },
  { id: "leadership", name: "Leadership" },
  { id: "finance", name: "Finance" },
];

const articles = [
  {
    id: "ai-tech-1",
    title: "The Future of AI in Business Operations",
    category: "AI & Technology",
    date: "April 15, 2025",
    readTime: "8 min read",
    excerpt:
      "Explore how artificial intelligence is transforming business operations and creating new opportunities for growth.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "ai-tech-2",
    title: "Implementing Machine Learning in Small Businesses",
    category: "AI & Technology",
    date: "April 12, 2025",
    readTime: "6 min read",
    excerpt:
      "Learn how small businesses can leverage machine learning to improve efficiency and decision-making.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "startups-1",
    title: "Emerging Startup Trends in 2025",
    category: "New Startups and Ideas",
    date: "April 10, 2025",
    readTime: "5 min read",
    excerpt:
      "Discover the most promising startup trends and innovative business ideas that are shaping the market this year.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "startups-2",
    title: "Funding Strategies for Early-Stage Startups",
    category: "New Startups and Ideas",
    date: "April 8, 2025",
    readTime: "7 min read",
    excerpt:
      "A comprehensive guide to securing funding for your early-stage startup in today's competitive landscape.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "marketing-1",
    title: "Effective Digital Marketing Strategies",
    category: "Business Marketing",
    date: "April 5, 2025",
    readTime: "7 min read",
    excerpt:
      "Learn about the latest digital marketing strategies that can help your business reach and engage with your target audience.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "marketing-2",
    title: "Social Media Marketing for B2B Companies",
    category: "Business Marketing",
    date: "April 2, 2025",
    readTime: "6 min read",
    excerpt:
      "Discover how B2B companies can effectively leverage social media platforms to generate leads and build brand awareness.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "leadership-1",
    title: "Building High-Performance Teams",
    category: "Leadership",
    date: "March 28, 2025",
    readTime: "9 min read",
    excerpt:
      "Strategies for developing and nurturing high-performing teams that drive innovation and business growth.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "finance-1",
    title: "Financial Planning for Business Expansion",
    category: "Finance",
    date: "March 25, 2025",
    readTime: "8 min read",
    excerpt:
      "Essential financial planning strategies to consider when preparing your business for expansion and growth.",
    image: "/placeholder.svg?height=400&width=600",
  },
];

const InsightsContent = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredArticles =
    activeCategory === "all"
      ? articles
      : articles.filter(
          (article) =>
            article.category.toLowerCase().replace(/[^a-z0-9]/g, "-") ===
            activeCategory
        );

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
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredArticles.slice(0, visibleCount).map((article, index) => (
              <AnimatedCard
                key={article.id}
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
                      src={article.image || "/placeholder.svg"}
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
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{article.readTime}</span>
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
                      href={`/insights/${article.id}`}
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
        </AnimatePresence>

        {filteredArticles.length > visibleCount && (
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
      </div>
    </section>
  );
};

export default InsightsContent;
