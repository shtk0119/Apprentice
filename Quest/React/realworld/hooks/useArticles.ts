import useSWR from "swr";

interface Article {
  slug: string;
  title: string;
  body: string;
  description: string;
  tagList: Tag[];
  created_at: string;
  updated_at: string;
}

interface Tag {
  name: string
}

interface ArticlesResponse {
  articles: Article[];
  articleCount: number;
}

const fetcher = async (url: string): Promise<Article[]> => {
  const response = await fetch(url);
  const data: ArticlesResponse = await response.json();
  return data.articles;
}

export const useArticles = () => {
  const { data, error } = useSWR('http://localhost/api/articles', fetcher);
  return { articles: data || [], error: error };
}
