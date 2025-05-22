import { getArticleBySlug, type Article } from "@/lib/insight"
import type { Metadata } from "next"
import InsightClientPage from "./InsightClientPage"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: "Article Not Found - Vriksh Consulting",
      description: "The requested article could not be found.",
    }
  }

  return {
    title: `${article.title} - Vriksh Consulting Insights`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `/insights/${article.slug}`,
      images: [
        {
          url: article.image_url || "/images/default-insight.jpg",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image_url || "/images/default-insight.jpg"],
    },
  }
}

export default async function InsightPage({ params }: { params: { slug: string } }) {
  const slug = params.slug as string
  const article: Article | null = await getArticleBySlug(slug)

  return <InsightClientPage article={article} />
}
