"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Download, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AnimatedSection from "@/components/animated-section";
import { getTrendingArticles, type Article } from "@/lib/insight";
import { formatDate } from "@/lib/utils";
import ShareInsight from "@/components/insights/share-insight";
import { trackArticleView, trackArticleComplete } from "@/lib/analytics";
import { toast } from "@/hooks/use-toast";

interface InsightClientPageProps {
  article: Article | null;
}

export default function InsightClientPage({
  article: initialArticle,
}: InsightClientPageProps) {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<Article | null>(initialArticle);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (!slug) return;
        setLoading(true);
        // const articleData = await getArticleBySlug(slug)
        // setArticle(articleData)

        // Track article view
        if (initialArticle) {
          trackArticleView(initialArticle.id, initialArticle.title);
          setStartTime(Date.now());
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();

    // Track article completion when user leaves the page
    return () => {
      if (initialArticle && startTime > 0) {
        const timeSpent = Date.now() - startTime;
        trackArticleComplete(
          initialArticle.id,
          initialArticle.title,
          timeSpent
        );
      }
    };
  }, [slug, initialArticle]);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        const articles = await getTrendingArticles(3);
        setRelatedArticles(articles);
      } catch (error) {
        console.error("Error fetching related articles:", error);
        setRelatedArticles([]);
      }
    };

    fetchRelatedArticles();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  if (!initialArticle) {
    return (
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-4">Article not found</h1>
        <p>
          The article you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  // Special rendering for the UPA economy article
  if (initialArticle.slug === "indian-economy-under-upa-rule") {
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
                      {initialArticle.category}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                    {initialArticle.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      <span>{initialArticle.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{formatDate(initialArticle.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{initialArticle.read_time}</span>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/3 flex justify-end">
                  <ShareInsight
                    title={initialArticle.title}
                    slug={""}
                    excerpt={""}
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
                      src={initialArticle.image_url || "/placeholder.svg"}
                      alt={initialArticle.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="prose prose-lg max-w-none">
                    <h2 className="text-2xl font-bold mt-8 mb-4">
                      The Ten Years of UPA Rule
                    </h2>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      During the ten years of UPA rule from 2004 to 2014,
                      India's economy underwent significant transformations. The
                      UPA government, led by Prime Minister Manmohan Singh,
                      presided over a period that saw dramatic changes in
                      India's economic indicators, particularly in the area of
                      trade balance and manufacturing.
                    </p>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      One of the most striking developments during this period
                      was the shift in India's Current Account Deficit (CAD).
                      From a surplus of US $22 Billion in 2004, the country
                      moved to a deficit of US $339 Billion by the end of the
                      UPA's tenure - a dramatic reversal in economic fortunes
                      that had significant implications for the value of the
                      Indian Rupee and the broader economy.
                    </p>

                    <div className="my-8">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/001_Indian%20economy%20under%20UPA%201%20%26%202-5.jpg-ontrRWkk2LVIeamYtPx4AGnKdkpqgI.jpeg"
                        alt="Current Account Deficit chart during UPA rule"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Chart showing USD/INR exchange rate from 2004-2013
                      </p>
                    </div>

                    <h2 className="text-2xl font-bold mt-8 mb-4">
                      Capital Goods Imports and Currency Devaluation
                    </h2>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      A key factor in this economic shift was the dramatic
                      increase in Capital Goods imports. During the UPA's decade
                      in power, Capital Goods imports totaled an astonishing US
                      $587 Billion, compared to approximately US $10 Billion per
                      year during the previous NDA government.
                    </p>

                    <div className="my-8">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/001_Indian%20economy%20under%20UPA%201%20%26%202-6.jpg-UnJ4vmENK0KoOZdueLkv3xT3gKYBw4.jpeg"
                        alt="Capital goods imports during UPA rule"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Comparison of capital goods imports between UPA and NDA
                        governments
                      </p>
                    </div>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      This surge in imports coincided with policy changes that
                      had profound effects on domestic manufacturing. In 2008,
                      the UPA government signed the India-China Free Trade
                      Agreement, which dramatically reduced customs duties on
                      Capital Goods imports. Simultaneously, the government
                      increased excise duties on domestically manufactured
                      Capital Goods from 10% to 20%.
                    </p>

                    <div className="my-8">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/001_Indian%20economy%20under%20UPA%201%20%26%202-7.jpg-GbslmRI1VJeZcZIrp1NUrsPkAJOtPM.jpeg"
                        alt="Capital Goods Import figures during UPA regime"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Year-by-year capital goods import figures during the UPA
                        regime
                      </p>
                    </div>

                    <h2 className="text-2xl font-bold mt-8 mb-4">
                      Impact on Domestic Manufacturing
                    </h2>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      The combined effect of these policies was devastating for
                      India's domestic Capital Goods manufacturing sector.
                      Indian manufacturers like L&T and BHEL became increasingly
                      non-competitive against Chinese imports. Production of
                      Capital Goods in India reportedly fell to approximately
                      1/10th of what it was in 2004.
                    </p>

                    <div className="my-8">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/001_Indian%20economy%20under%20UPA%201%20%26%202-8.jpg-Pm5XfXXz3kHY95CHXXwX68S3iLw9Ui.jpeg"
                        alt="Impact of UPA policies on domestic manufacturing"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Analysis of how policy changes affected domestic
                        manufacturing
                      </p>
                    </div>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      The consequences extended beyond the manufacturing sector.
                      As large Capital Goods producing factories struggled and
                      many eventually closed, unemployment rose. With rising
                      unemployment came reduced purchasing power, contributing
                      to economic slowdown. The manufacturing contraction,
                      combined with increased imports, led to a steep rise in
                      the Current Account Deficit.
                    </p>

                    <div className="my-8">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/001_Indian%20economy%20under%20UPA%201%20%26%202-9.jpg-88HBMIzdibIN7EWVISQXMS7clSPuYy.jpeg"
                        alt="Economic impact of capital goods imports"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Impact of capital goods imports on the Indian economy
                      </p>
                    </div>

                    <h2 className="text-2xl font-bold mt-8 mb-4">
                      Tax Policy Contradictions
                    </h2>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      Another aspect of economic policy during this period
                      involved tax waivers and exemptions. In 2005, Finance
                      Minister P. Chidambaram announced plans to eliminate tax
                      waiver schemes and duty drawbacks, ostensibly to protect
                      the interests of the poor. However, by 2008, tax waivers
                      had increased dramatically from Rs 2.5 lakh crores to Rs
                      22.5 lakh crores.
                    </p>

                    <div className="my-8">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/001_Indian%20economy%20under%20UPA%201%20%26%202-10.jpg-k3pu9kvDYsrp7kkA0s7pIWUS4R6QPn.jpeg"
                        alt="Tax policy contradictions during UPA rule"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Analysis of tax policy contradictions during the UPA
                        government
                      </p>
                    </div>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      The economic policies implemented during the UPA
                      government's decade in power had far-reaching consequences
                      for India's manufacturing sector, trade balance, and
                      currency valuation. The dramatic increase in Capital Goods
                      imports, coupled with policy changes that disadvantaged
                      domestic manufacturers, contributed to a significant shift
                      in India's economic indicators.
                    </p>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      This case study provides valuable insights into how trade
                      and fiscal policies can impact a nation's economic
                      trajectory, offering important lessons for current and
                      future economic planning.
                    </p>
                  </div>

                  <Separator className="my-8" />

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-8">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">Tags:</span>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          Indian Economy
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          Economic Policy
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          Manufacturing
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          Trade Balance
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
                        Stay updated with our latest insights and industry
                        trends.
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
                  Need Expert Economic Analysis?
                </h2>
                <p className="text-gray-600 mb-8">
                  Our team of experienced consultants can help your business
                  navigate complex economic landscapes and make informed
                  decisions.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    asChild
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
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

  // Default rendering for other articles
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
                    {initialArticle.category}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  {initialArticle.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{initialArticle.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{formatDate(initialArticle.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{initialArticle.read_time}</span>
                  </div>
                </div>
              </div>

              <div className="md:w-1/3 flex justify-end">
                <ShareInsight
                  title={initialArticle.title}
                  slug={""}
                  excerpt={""}
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
                      initialArticle.image_url ||
                      "/placeholder.svg?height=800&width=1200"
                    }
                    alt={initialArticle.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="prose prose-lg max-w-none">
                  {/* For demo purposes, we'll split the content into paragraphs */}
                  {initialArticle.content
                    .split("...")
                    .map((paragraph, index) => (
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
                            operational efficiency, improve customer
                            experiences, and drive innovation.
                          </>
                        )}
                        {index === 1 && (
                          <>
                            {" "}
                            Digital transformation involves more than just
                            implementing new technologies; it requires a
                            fundamental shift in organizational culture and
                            mindset. Companies must be willing to embrace
                            change, experiment with new approaches, and
                            continuously learn and adapt.
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

                  <div className="hidden sm:block">
                    <ShareInsight
                      title={initialArticle.title}
                      slug={""}
                      excerpt={""}
                    />
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
