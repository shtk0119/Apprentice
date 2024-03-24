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

interface ArticleResponse {
  article: Article;
}

class FetchError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const fetcher = async (url: string): Promise<Article> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new FetchError("An error occurred while fetching the data.", response.status);
  }

  const data: ArticleResponse = await response.json();
  return data.article;
}

export const useArticle = (slug: string) => {
  const { data, error, isLoading } = useSWR<Article, FetchError>(`http://localhost/api/articles/${slug}`, fetcher);

  return { article: data, error, isLoading };
}