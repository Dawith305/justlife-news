export interface NewsArticle {
  article_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
}

export interface NewsApiResponse {
  results: NewsArticle[];
  nextPage: string | null;
  totalResults?: number;
}
