"use client";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/animated-section";
import AnimatedCard from "@/components/animated-card";
import AnimatedButton from "@/components/animated-button";
import { staggerContainerVariants } from "@/lib/animation-utils";


const articles = [
  {
    id: "ai-tech",
    title: "The Future of AI in Business Operations",
    category: "AI & Technology",
    date: "April 15, 2025",
    excerpt:
      "Explore how artificial intelligence is transforming business operations and creating new opportunities for growth.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "startups",
    title: "Emerging Startup Trends in 2025",
    category: "New Startups and Ideas",
    date: "April 10, 2025",
    excerpt:
      "Discover the most promising startup trends and innovative business ideas that are shaping the market this year.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "marketing",
    title: "Effective Digital Marketing Strategies",
    category: "Business Marketing",
    date: "April 5, 2025",
    excerpt:
      "Learn about the latest digital marketing strategies that can help your business reach and engage with your target audience.",
    image: "/placeholder.svg?height=400&width=600",
  },
];

const ArticleInsights = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="slide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest Insights</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with our latest thoughts on industry trends, business
              strategies, and innovative solutions.
            </p>
          </div>
        </AnimatedSection>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {articles.map((article, index) => (
            <AnimatedCard
              key={article.id}
              className="border-gray-200 overflow-hidden group"
              hoverEffect="shine"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                >
                  <Button
                    asChild
                    variant="default"
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Link href={`/insights/${article.id}`}>Read Now</Link>
                  </Button>
                </motion.div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <motion.span
                    className="text-sm text-emerald-600 font-medium"
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {article.category}
                  </motion.span>
                  <span className="text-xs text-gray-500">{article.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <Button
                  asChild
                  variant="ghost"
                  className="p-0 h-auto text-emerald-600 hover:text-emerald-700 hover:bg-transparent group"
                >
                  <Link
                    href={`/insights/${article.id}`}
                    className="flex items-center gap-2 relative overflow-hidden"
                  >
                    <span className="relative z-10">Read more</span>
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
            </AnimatedCard>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <AnimatedButton
            asChild
            variant="outline"
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            animationType="shine"
          >
            <Link href="/insights" className="flex items-center gap-2">
              View All Insights
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </Link>
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
};

export default ArticleInsights;
