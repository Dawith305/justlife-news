import type { NewsArticle } from '~/types/news';
import { NEWSDATA_LATEST_URL } from '~/server/utils/newsdata';
import mockArticles from '../../mocks/news-articles.json';

const articlesMock = mockArticles as NewsArticle[];

export default defineEventHandler(async (event): Promise<NewsArticle | null> => {
  const id = getRouterParam(event, 'id');
  if (!id) return null;

  const config = useRuntimeConfig(event);
  if (config.useMockNews) {
    const found = articlesMock.find((a) => a.article_id === id);
    return found ?? null;
  }

  const apiKey = config.newsApiKey;
  if (!apiKey) {
    throw createError({ statusCode: 500, message: 'News API key not configured' });
  }

  const params = new URLSearchParams({
    apikey: apiKey,
    id
  });
  const url = `${NEWSDATA_LATEST_URL}?${params.toString()}`;
  const data = await $fetch<{
    results?: Array<{
      article_id?: string;
      title?: string;
      description?: string | null;
      image_url?: string | null;
    }>;
  }>(url);

  const results = data.results ?? [];
  const found = results[0];
  if (!found) return null;

  return {
    article_id: found.article_id ?? id,
    title: found.title ?? '',
    description: found.description ?? null,
    image_url: found.image_url ?? null
  };
});
