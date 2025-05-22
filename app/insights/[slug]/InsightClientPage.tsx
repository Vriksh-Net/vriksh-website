"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AnimatedSection from "@/components/animated-section";
import { getTrendingArticles, type Article } from "@/lib/insight";
import { formatDate } from "@/lib/utils";
import ShareInsight from "@/components/insights/share-insight";
import { trackArticleView, trackArticleComplete } from "@/lib/analytics";

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

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (!slug) return;
        setLoading(true);
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
                        src="/insight/ie.jpeg"
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
                        src="/insight/ie1.jpeg"
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
                        src="/insight/ie2.jpeg"
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
                        src="/insight/ie3.jpeg"
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
                        src="/insight/ie4.jpeg"
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
                        src="/insight/ie5.jpeg"
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

  // After the condition for UPA economy article (around line 502), add this new condition:
  if (initialArticle.slug === "challanges-faced-by-indian-msmes") {
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
                    slug={initialArticle.slug}
                    excerpt={initialArticle.excerpt}
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
                    <h2 className="text-2xl font-bold mt-8 mb-4">
                      Digital Transformation in the Modern Business Landscape
                    </h2>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      In today's rapidly evolving business landscape,
                      organizations must adapt to new technologies and
                      methodologies to remain competitive. Digital
                      transformation is revolutionizing how businesses operate,
                      enhancing operational efficiency, improving customer
                      experiences, and driving innovation across all sectors.
                    </p>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      Digital transformation involves more than just
                      implementing new technologies; it requires a fundamental
                      shift in organizational culture and mindset. Companies
                      must be willing to embrace change, experiment with new
                      approaches, and continuously learn and adapt to stay
                      relevant in an increasingly digital world.
                    </p>

                    <div className="my-8">
                      <Image
                        src="/insight/msme.jpeg"
                        alt="MSME Sector Challenges"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        MSMEs face unique challenges in digital transformation
                      </p>
                    </div>

                    <h2 className="text-2xl font-bold mt-8 mb-4">
                      The Impact on MSMEs and Economic Growth
                    </h2>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      For Micro, Small, and Medium Enterprises (MSMEs), digital
                      transformation presents both significant opportunities and
                      challenges. As the backbone of many economies, including
                      India's, MSMEs must embrace digital technologies to remain
                      competitive in the global marketplace.
                    </p>

                    <div className="my-8">
                      <Image
                        src="/insight/msme1.jpeg"
                        alt="MSME Sector Importance"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        MSME sector is the backbone of Indian Economic Structure
                      </p>
                    </div>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      With approximately 63.4 million MSME units spread
                      throughout India, employing around 120 million people, the
                      sector contributes significantly to the country's GDP.
                      MSMEs contribute 6.11% of the manufacturing GDP, 24.63% of
                      the GDP from service activities, and 45% of overall
                      exports from India.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">
                      Key Measures of Economic Strength and Digital
                      Transformation
                    </h2>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      Digital transformation strategies must be aligned with
                      broader economic goals. Understanding the key measures of
                      a strong economy helps businesses contextualize their
                      digital initiatives.
                    </p>

                    <div className="my-8">
                      <Image
                        src="/insight/msme2.jpeg"
                        alt="Key Measures of a Strong Economy"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Key economic indicators that digital transformation can
                        impact
                      </p>
                    </div>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      Digital transformation can positively impact these
                      economic indicators by increasing productivity, creating
                      new job opportunities, and enabling businesses to compete
                      more effectively in global markets.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">
                      Sectoral Focus for Digital Transformation
                    </h2>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      Different sectors require tailored digital transformation
                      strategies. In India, the focus on manufacturing as part
                      of the Atmanirbhar Bharat (Self-Reliant India) initiative
                      presents unique opportunities for digital innovation.
                    </p>

                    <div className="my-8">
                      <Image
                        src="/insight/msme3.jpeg"
                        alt="Manufacturing Sector Focus"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Manufacturing sector requires specific digital
                        transformation approaches
                      </p>
                    </div>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      For the manufacturing sector to thrive through digital
                      transformation, businesses need to focus on creating a
                      robust ecosystem that includes ease of doing business,
                      skilled labor, infrastructure, and strong vendor networks.
                    </p>

                    <div className="my-8">
                      <Image
                        src="/insight/msme4.jpeg"
                        alt="Services Sector Focus"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Services sector digital transformation challenges
                      </p>
                    </div>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      The services sector, which employs 32% of India's
                      workforce, faces different challenges in digital
                      transformation. As salaries increase, businesses must
                      leverage technology to maintain competitiveness rather
                      than relying solely on cost advantages.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">
                      Post-COVID Digital Transformation Imperatives
                    </h2>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      The COVID-19 pandemic accelerated digital transformation
                      across all sectors. In the post-pandemic world, businesses
                      must continue to innovate and adapt to new realities.
                    </p>

                    <div className="my-8">
                      <Image
                        src="/insight/msme5.jpeg"
                        alt="Post-COVID Economic Revival"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Atmanirbhar Bharat's five pillars for post-COVID
                        economic revival
                      </p>
                    </div>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      The five pillars of Atmanirbhar Bharat—Economy,
                      Infrastructure, System, Vibrant Demography, and
                      Demand—provide a framework for businesses to align their
                      digital transformation strategies with national economic
                      goals.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">
                      MSMEs and Digital Transformation: The Path Forward
                    </h2>

                    <div className="my-8">
                      <Image
                        src="/insight/msme6.jpeg"
                        alt="MSMEs Must Grow"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        MSMEs growth is essential for economic self-reliance
                      </p>
                    </div>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      For MSMEs to thrive in the digital age, they must focus
                      on:
                    </p>

                    <ul className="list-disc pl-6 mb-6">
                      <li className="mb-2">
                        Adopting cloud-based solutions to reduce infrastructure
                        costs
                      </li>
                      <li className="mb-2">
                        Implementing data analytics to gain customer insights
                      </li>
                      <li className="mb-2">
                        Leveraging e-commerce platforms to reach wider markets
                      </li>
                      <li className="mb-2">
                        Utilizing digital marketing to build brand presence
                      </li>
                      <li className="mb-2">
                        Automating routine processes to improve efficiency
                      </li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">
                      Key Considerations for Successful Digital Transformation
                    </h2>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      Regardless of sector or size, businesses should consider
                      these key factors when implementing digital transformation
                      strategies:
                    </p>

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
                      <li className="mb-2">
                        Ensure cybersecurity and data privacy compliance
                      </li>
                      <li className="mb-2">
                        Focus on customer experience throughout the
                        transformation journey
                      </li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      Digital transformation is not a one-time project but an
                      ongoing journey. Organizations that embrace this mindset
                      and commit to continuous improvement will be better
                      positioned to thrive in today's dynamic business
                      environment. By focusing on people, processes, and
                      technology, businesses can drive meaningful change and
                      create sustainable competitive advantages.
                    </p>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      For Indian businesses, particularly MSMEs, digital
                      transformation aligned with national economic goals can
                      contribute significantly to the vision of a self-reliant,
                      economically robust India. The path may be challenging,
                      but the rewards—increased efficiency, expanded market
                      reach, and enhanced competitiveness—make it a journey
                      worth undertaking.
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
                          MSMEs
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
                        slug={initialArticle.slug}
                        excerpt={initialArticle.excerpt}
                      />
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              <div className="lg:col-span-1">
                <AnimatedSection animation="slide" delay={0.2}>
                  <div className="sticky top-24">
                    <h3 className="text-xl font-bold mb-6">Related Articles</h3>

                    {/* Loading state for related articles */}
                    {relatedArticles.length === 0 ? (
                      <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-40 bg-gray-200 rounded-lg mb-3"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        ))}
                      </div>
                    ) : (
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
                    )}

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

                    {/* Article Navigation */}
                    <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                      <h3 className="text-lg font-bold mb-4">
                        Article Navigation
                      </h3>
                      <nav className="space-y-3">
                        <a
                          href="#"
                          className="block text-emerald-600 hover:text-emerald-700"
                        >
                          ← Previous Article: AI in Business Operations
                        </a>
                        <a
                          href="#"
                          className="block text-emerald-600 hover:text-emerald-700"
                        >
                          Next Article: Sustainable Business Practices →
                        </a>
                      </nav>
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
                  Need Expert Digital Transformation Consulting?
                </h2>
                <p className="text-gray-600 mb-8">
                  Our team of experienced consultants can help your business
                  navigate the digital landscape and implement effective
                  transformation strategies.
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

  // Add this condition after the digital-transformation-strategies condition (around line 502)
  if (initialArticle.slug === "post-covid-economic-recovery") {
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
                      src="/insight/post-covid-recovery-title.jpg"
                      alt="Post COVID Economic Recovery"
                      fill
                      className="object-contain bg-gray-100"
                    />
                  </div>

                  <div className="prose prose-lg max-w-none">
                    <h2 className="text-2xl font-bold mt-8 mb-4">
                      Introduction
                    </h2>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      The COVID-19 pandemic caused unprecedented disruption to
                      economies worldwide. As countries implemented lockdowns
                      and restrictions to control the spread of the virus,
                      economic activities came to a standstill, resulting in
                      significant GDP contractions across the globe. As we
                      emerge from the pandemic, understanding the various
                      recovery patterns becomes crucial for policymakers,
                      businesses, and investors to make informed decisions.
                    </p>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      This analysis explores the different economic recovery
                      patterns that have emerged post-COVID and examines the
                      strategies implemented by the Indian government to ensure
                      sustainable growth, with a particular focus on the
                      Atmanirbhar Bharat (Self-Reliant India) initiative.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">
                      Economic Recovery Patterns
                    </h2>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      Economists have identified several potential recovery
                      patterns, each characterized by different trajectories of
                      GDP growth following the initial economic shock. These
                      patterns are typically represented by letters that
                      visually resemble the recovery curve.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-3">
                      Option 1: Z-Shape Recovery
                    </h3>

                    <div className="my-8">
                      <Image
                        src="/insight/z-shape-recovery.jpg"
                        alt="Z-Shape Recovery Pattern"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Z-Shape Recovery Pattern showing rapid return and
                        overshoot
                      </p>
                    </div>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      A Z-shaped recovery occurs when economic disruption
                      happens for a short time. In this scenario, the economy
                      dips not because people's income has decreased, but
                      because their spending is restricted. Once restrictions
                      are lifted, pent-up demand leads to a surge in spending,
                      causing GDP to overshoot the trend path. This pattern is
                      characterized by deferred consumption of goods and
                      services like parties, salon visits, new cars, and
                      housing.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-3">
                      Option 2: V-Shape Recovery
                    </h3>

                    <div className="my-8">
                      <Image
                        src="/insight/v-shape-recovery.jpg"
                        alt="V-Shape Recovery Pattern"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        V-Shape Recovery Pattern showing sharp decline and rapid
                        recovery
                      </p>
                    </div>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      V-shaped recovery occurs when economic disruption lasts
                      longer, resulting in several activities being forgone
                      rather than just deferred. This pattern requires an
                      inherently strong economy with high reserves and a
                      positive, bullish outlook among the population. When
                      lockdowns are lifted, the economy recovers sharply, with
                      GDP quickly returning to and exceeding pre-COVID levels.
                    </p>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      This pattern was observed in the US in early June 2020,
                      when data showed that 2.5 million jobs were added in
                      May—the highest number of jobs added in any month in US
                      history. For a V-shaped recovery to occur, a strong
                      economy with substantial reserves and very positive
                      consumer and business sentiment is essential.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-3">
                      Option 3: U-Shape Recovery
                    </h3>

                    <div className="my-8">
                      <Image
                        src="/insight/u-shape-recovery.jpg"
                        alt="U-Shape Recovery Pattern"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        U-Shape Recovery Pattern showing prolonged bottom before
                        recovery
                      </p>
                    </div>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      When disruption is longer and results in job losses, MSME
                      closures, and income reduction, recovery tends to be
                      slower and follows a U-shaped path. After the initial
                      fall, recovery is gradual before regaining momentum. If
                      this process becomes more prolonged, it can result in an
                      "elongated U" shape, indicating a more extended period of
                      economic hardship before sustained growth resumes.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-3">
                      Option 4: W-Shape Recovery
                    </h3>

                    <div className="my-8">
                      <Image
                        src="/insight/w-shape-recovery.jpg"
                        alt="W-Shape Recovery Pattern"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        W-Shape Recovery Pattern showing double-dip recession
                      </p>
                    </div>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      The W-shaped recovery becomes relevant when considering
                      the possibility of subsequent waves of infection. In this
                      scenario, an initial V-shaped recovery is interrupted by a
                      second wave of infections, causing another economic
                      downturn before a second recovery phase begins. This
                      pattern represents a "double-dip" recession and recovery
                      cycle.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-3">
                      Option 5: L-Shape Recovery
                    </h3>

                    <div className="my-8">
                      <Image
                        src="/insight/l-shape-recovery.jpg"
                        alt="L-Shape Recovery Pattern"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        L-Shape Recovery Pattern showing permanent economic
                        damage
                      </p>
                    </div>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      The L-shaped recovery represents the worst-case scenario.
                      In this pattern, the economy fails to regain its
                      pre-crisis GDP level even after years have passed. The
                      L-shape indicates a permanent loss to the economy's
                      productive capacity, suggesting structural damage that
                      prevents a return to the previous growth trajectory.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">
                      Guiding the Economic Recovery
                    </h2>

                    <div className="my-8">
                      <Image
                        src="/insight/guiding-recovery.jpg"
                        alt="Guiding the Economic Recovery"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Policy initiatives focused on guiding economic recovery
                      </p>
                    </div>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      Effective policy initiatives are crucial for guiding
                      economic recovery. Governments and industry must work
                      together to implement strategies that address both
                      immediate challenges and long-term growth objectives.
                      These initiatives should focus on supporting vulnerable
                      sectors, promoting investment, and enhancing economic
                      resilience.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">
                      The Atmanirbhar Bharat Strategy
                    </h2>

                    <div className="my-8">
                      <Image
                        src="/insight/recovery-process.jpg"
                        alt="Recovery Process and Atmanirbhar Bharat Strategy"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        The six pillars of Atmanirbhar Bharat for economic
                        recovery
                      </p>
                    </div>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      India's response to the economic challenges posed by
                      COVID-19 has been centered around the Atmanirbhar Bharat
                      (Self-Reliant India) initiative. This comprehensive
                      strategy consists of six key pillars:
                    </p>

                    <ol className="list-decimal pl-6 mb-6 space-y-2">
                      <li className="text-gray-700">
                        <strong>Ensure Soft Landing</strong> of the economy to
                        minimize permanent damage
                      </li>
                      <li className="text-gray-700">
                        <strong>Economy</strong> - Facilitating a quantum jump
                        in GDP growth
                      </li>
                      <li className="text-gray-700">
                        <strong>Infrastructure</strong> - Focused development
                        aligned with desired GDP growth
                      </li>
                      <li className="text-gray-700">
                        <strong>System</strong> - Increasing compliances while
                        ensuring ease of doing business (minimum government,
                        maximum governance)
                      </li>
                      <li className="text-gray-700">
                        <strong>Vibrant Demography</strong> - Leveraging India's
                        young population by boosting confidence and capability
                      </li>
                      <li className="text-gray-700">
                        <strong>Demand</strong> - Promoting consumption of Made
                        in India products
                      </li>
                    </ol>

                    <h3 className="text-xl font-bold mt-6 mb-3">
                      1. Ensuring Soft Landing of the Economy
                    </h3>

                    <div className="my-8">
                      <Image
                        src="/insight/soft-landing.jpg"
                        alt="Ensuring Soft Landing of the Economy"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Government initiatives to ensure business continuity
                      </p>
                    </div>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      The first pillar focuses on ensuring that businesses,
                      particularly MSMEs, can continue operations despite the
                      economic shock. Key initiatives include:
                    </p>

                    <ul className="list-disc pl-6 mb-6 space-y-2">
                      <li className="text-gray-700">
                        Redefinition of MSMEs to provide broader coverage of
                        Indian industry
                      </li>
                      <li className="text-gray-700">
                        Collateral-free automatic business continuity loans
                      </li>
                      <li className="text-gray-700">
                        Equity support for stressed MSMEs through Rs 20,000
                        crore subordinate debt
                      </li>
                      <li className="text-gray-700">
                        Fund of Funds for startup funding
                      </li>
                      <li className="text-gray-700">
                        Restricting global tenders for government procurement up
                        to Rs 200 crores
                      </li>
                      <li className="text-gray-700">
                        Faster payment recovery cycle with mandatory 45-day
                        payment terms for MSMEs
                      </li>
                    </ul>

                    <h3 className="text-xl font-bold mt-6 mb-3">
                      2. Economy - A Quantum Jump in the GDP
                    </h3>

                    <div className="my-8">
                      <Image
                        src="/insight/quantum-jump.jpg"
                        alt="Economy - A Quantum Jump in the GDP"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Strategies for achieving a quantum jump in GDP
                      </p>
                    </div>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      The second pillar aims to catalyze significant GDP growth
                      by leveraging India's strengths:
                    </p>

                    <ul className="list-disc pl-6 mb-6 space-y-2">
                      <li className="text-gray-700">
                        Capitalizing on bumper crops from two consecutive years
                        of good agricultural production
                      </li>
                      <li className="text-gray-700">
                        Ensuring farmers receive fair prices for their produce
                        despite abundance
                      </li>
                      <li className="text-gray-700">
                        Boosting rural economy to increase disposable income
                        among rural populations
                      </li>
                      <li className="text-gray-700">
                        Channeling rural spending into urban retail, which in
                        turn stimulates MSME manufacturing and services
                      </li>
                    </ul>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      The strategy emphasizes the importance of implementing
                      Minimum Support Price (MSP) strictly to prevent price
                      crashes due to abundant produce. Additionally, investments
                      in storage facilities, irrigation infrastructure,
                      productivity improvements, and crop insurance are
                      recommended to protect farmers from uncertainties.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      The path to post-COVID economic recovery will vary across
                      countries depending on their economic structure, policy
                      responses, and the effectiveness of pandemic containment
                      measures. For India, the Atmanirbhar Bharat initiative
                      provides a comprehensive framework for navigating the
                      challenges and opportunities presented by the pandemic.
                    </p>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      By focusing on supporting MSMEs, boosting rural income,
                      investing in infrastructure, improving governance systems,
                      leveraging demographic advantages, and stimulating
                      domestic demand, India aims to achieve not just recovery
                      but transformation toward a more resilient and
                      self-reliant economy.
                    </p>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                      The success of these efforts will depend on effective
                      implementation, continued policy support, and the ability
                      to adapt strategies as the economic situation evolves.
                      With the right approach, India can potentially emerge from
                      the COVID-19 crisis with a stronger, more inclusive, and
                      more sustainable economy.
                    </p>
                  </div>

                  <Separator className="my-8" />

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-8">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">Tags:</span>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          COVID-19
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          Economic Recovery
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          GDP Growth
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          Atmanirbhar Bharat
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
                  navigate post-pandemic economic challenges and identify growth
                  opportunities.
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
