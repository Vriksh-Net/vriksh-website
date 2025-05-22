import { getArticleBySlug, type Article } from "@/lib/insight";
import InsightClientPage from "./InsightClientPage";

export default async function InsightPage(props: any) {
  const article: Article | null = await getArticleBySlug(props.params.slug);

  return <InsightClientPage article={article} />;
}
