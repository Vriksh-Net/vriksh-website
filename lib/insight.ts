// Static data for insights
export interface Article {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image_url: string;
  date: string;
  read_time: string;
  author: string;
  featured: boolean;
  trending: boolean;
}

// Mock articles data
const articlesData: Article[] = [
  {
    id: "0",
    slug: "indian-economy-under-upa-rule",
    title: "Indian Economy under previous government.",
    content:
      "During the ten years of UPA rule from 2004 to 2014, India's economy underwent significant transformations that continue to influence economic policy discussions today. This analysis examines the fiscal policies implemented during this period and their long-term impact on domestic manufacturing and trade balance...",
    excerpt:
      "An in-depth analysis of how policy decisions during the UPA government's tenure affected India's Current Account Deficit, manufacturing sector, and currency valuation.",
    category: "Economic Analysis",
    image_url: "/images/insight.gif",
    date: "2025-05-15",
    read_time: "12 min read",
    author: "Mr. Shubhashish Bhattacharya",
    featured: true,
    trending: true,
  },
  {
    id: "1",
    slug: "digital-transformation-strategies",
    title: "Challanges faced by Indian MSMEs",
    content:
      "Digital transformation is revolutionizing how businesses operate...",
    excerpt:
      "Explore effective digital transformation strategies that can help your business thrive in the modern digital landscape.",
    category: "Digital Transformation",
    image_url: "/images/insight2.png",
    date: "2025-04-15",
    read_time: "5 min read",
    author: "Mr. Shubhashish Bhattacharya",
    featured: false,
    trending: true,
  },
  {
    id: "2",
    slug: "ai-in-business-operations",
    title: "Indian economic recovery a brief study",
    content: "Artificial Intelligence is no longer just a buzzword...",
    excerpt:
      "Discover how AI technologies are transforming business operations and creating new opportunities for growth and efficiency.",
    category: "AI & Technology",
    image_url: "/placeholder.svg?height=800&width=1200",
    date: "2025-04-10",
    read_time: "7 min read",
    author: "Mr. Shubhashish Bhattacharya",
    featured: false,
    trending: true,
  },
];

// Get all unique categories from articles
export const getArticleCategories = async (): Promise<string[]> => {
  const categories = articlesData.map((article) => article.category);
  return [...new Set(categories)];
};

// Get featured article
export const getFeaturedArticle = async (): Promise<Article | null> => {
  return articlesData.find((article) => article.featured) || articlesData[0];
};

// Get trending articles
export const getTrendingArticles = async (
  limit: number
): Promise<Article[]> => {
  return articlesData.filter((article) => article.trending).slice(0, limit);
};

// Get articles with filtering options
export interface ArticlesQueryParams {
  category?: string;
  limit?: number;
  page?: number;
}

export interface ArticlesResponse {
  articles: Article[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const getArticles = async (
  params: ArticlesQueryParams
): Promise<ArticlesResponse> => {
  const { category = "", limit = 10, page = 1 } = params;

  // Filter articles by category if provided
  const filteredArticles = category
    ? articlesData.filter((article) => article.category === category)
    : articlesData;

  // Calculate pagination
  const total = filteredArticles.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // Get articles for current page
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  return {
    articles: paginatedArticles,
    pagination: {
      total,
      page,
      limit,
      totalPages,
    },
  };
};

// Get article by slug
export const getArticleBySlug = async (
  slug: string
): Promise<Article | null> => {
  return articlesData.find((article) => article.slug === slug) || null;
};

// Static data for insights
