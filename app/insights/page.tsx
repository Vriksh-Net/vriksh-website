import type { Metadata } from "next";
import InsightsHero from "@/components/insights/insight-hero";
import InsightsContent from "@/components/insights/insights-content";
import FeaturedInsight from "@/components/insights/featured-insight";
import TrendingInsights from "@/components/insights/trending-insights";
import InsightsNewsletter from "@/components/insights/insights-newsletter";
import {
  getFeaturedArticle,
  getTrendingArticles,
  getArticleCategories,
} from "@/lib/insight";

export const metadata: Metadata = {
  title: "Insights & Resources - Vriksh Consulting",
  description:
    "Explore our latest insights, articles, and resources on AI & Technology, New Startups, Business Marketing, and more.",
};

export default async function InsightsPage() {
  // Fetch data using the static data functions
  const featuredArticle = await getFeaturedArticle();
  const trendingArticles = await getTrendingArticles(3);
  const categories = await getArticleCategories();

  return (
    <div className="flex flex-col w-full">
      <InsightsHero />
      {featuredArticle && <FeaturedInsight article={featuredArticle} />}
      <TrendingInsights articles={trendingArticles} />
      <InsightsContent initialCategories={categories} />
      <InsightsNewsletter />
    </div>
  );
}
