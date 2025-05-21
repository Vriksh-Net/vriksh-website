import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AnimatedSection from "@/components/animated-section";
import { getArticleBySlug, getTrendingArticles } from "@/lib/insight";
import { formatDate } from "@/lib/utils";
import ShareButtonGroup from "@/components/insights/share-button-group";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Article Not Found - Vriksh Consulting",
      description: "The requested article could not be found.",
    };
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
  };
}

export default async function InsightPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  // Get related articles (using trending as a simple substitute)
  const relatedArticles = await getTrendingArticles(3);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-emerald-50 to-white">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade">
            <Button
              asChild
              variant="ghost"
              className="mb-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
            >
              <Link href="/insights" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Back to all insights
              </Link>
            </Button>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="md:w-2/3">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                    {article.category}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{formatDate(article.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{article.read_time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>By {article.author}</span>
                  </div>
                </div>
              </div>

              <div className="md:w-1/3 flex justify-end">
                <ShareButtonGroup
                  title={article.title}
                  slug={article.slug}
                  excerpt={article.excerpt}
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <AnimatedSection animation="slide">
                <div className="relative h-[400px] w-full mb-8 rounded-2xl overflow-hidden">
                  <Image
                    src={
                      article.image_url ||
                      "/placeholder.svg?height=800&width=1200"
                    }
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="prose prose-lg max-w-none">
                  {/* For demo purposes, we'll split the content into paragraphs */}
                  {article.content.split("...").map((paragraph, index) => (
                    <p
                      key={index}
                      className="mb-6 text-gray-700 leading-relaxed"
                    >
                      {paragraph}
                      {index === 0 && (
                        <>
                          {" "}
                          In today's rapidly evolving business landscape,
                          organizations must adapt to new technologies and
                          methodologies to remain competitive. This article
                          explores how businesses can effectively implement
                          digital transformation strategies to enhance
                          operational efficiency, improve customer experiences,
                          and drive innovation.
                        </>
                      )}
                      {index === 1 && (
                        <>
                          {" "}
                          Digital transformation involves more than just
                          implementing new technologies; it requires a
                          fundamental shift in organizational culture and
                          mindset. Companies must be willing to embrace change,
                          experiment with new approaches, and continuously learn
                          and adapt.
                        </>
                      )}
                    </p>
                  ))}

                  <h2 className="text-2xl font-bold mt-8 mb-4">
                    Key Considerations for Successful Implementation
                  </h2>

                  <ul className="list-disc pl-6 mb-6">
                    <li className="mb-2">
                      Develop a clear digital transformation strategy aligned
                      with business goals
                    </li>
                    <li className="mb-2">
                      Foster a culture of innovation and continuous learning
                    </li>
                    <li className="mb-2">
                      Invest in the right technologies and tools
                    </li>
                    <li className="mb-2">
                      Build cross-functional teams to drive transformation
                      initiatives
                    </li>
                    <li className="mb-2">
                      Measure and track progress using relevant KPIs
                    </li>
                  </ul>

                  <p className="mb-6 text-gray-700 leading-relaxed">
                    By taking a strategic approach to digital transformation,
                    businesses can position themselves for long-term success in
                    an increasingly digital world. The key is to start with a
                    clear vision, involve stakeholders from across the
                    organization, and be willing to iterate and adapt as needed.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>

                  <p className="mb-6 text-gray-700 leading-relaxed">
                    Digital transformation is not a one-time project but an
                    ongoing journey. Organizations that embrace this mindset and
                    commit to continuous improvement will be better positioned
                    to thrive in today's dynamic business environment. By
                    focusing on people, processes, and technology, businesses
                    can drive meaningful change and create sustainable
                    competitive advantages.
                  </p>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-8">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">Tags:</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        Digital Transformation
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        Business Strategy
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        Innovation
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-1">
              <AnimatedSection animation="slide" delay={0.2}>
                <div className="sticky top-24">
                  <h3 className="text-xl font-bold mb-6">Related Articles</h3>

                  <div className="space-y-6">
                    {relatedArticles.map((relatedArticle) => (
                      <Card
                        key={relatedArticle.slug}
                        className="overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="relative h-40 w-full">
                          <Image
                            src={
                              relatedArticle.image_url ||
                              "/placeholder.svg?height=400&width=600"
                            }
                            alt={relatedArticle.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full mb-2">
                            {relatedArticle.category}
                          </span>
                          <h4 className="font-medium mb-2 line-clamp-2 hover:text-emerald-600 transition-colors">
                            <Link href={`/insights/${relatedArticle.slug}`}>
                              {relatedArticle.title}
                            </Link>
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar size={12} />
                            <span>{formatDate(relatedArticle.date)}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-emerald-50 rounded-xl">
                    <h3 className="text-lg font-bold mb-4">
                      Subscribe to Our Newsletter
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Stay updated with our latest insights and industry trends.
                    </p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                Need Expert Consulting Services?
              </h2>
              <p className="text-gray-600 mb-8">
                Our team of experienced consultants can help your business
                navigate challenges and achieve sustainable growth.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                >
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
