import type { NewsApiResponse } from '~/types/news';
import { NEWSDATA_LATEST_URL } from '~/server/utils/newsdata';
import mockListData from '../../mocks/news-list.json';

const MOCK_PAGE_SIZE = 10;
const MOCK_PAGE_2_TOKEN = 'mock-page-2';

const listMock = mockListData as NewsApiResponse;

export default defineEventHandler(async (event): Promise<NewsApiResponse> => {
  const config = useRuntimeConfig(event);
  if (config.useMockNews) {
    const allResults = listMock.results ?? [];
    const totalResults = allResults.length;
    const page = getQuery(event).page as string | undefined;

    if (page === MOCK_PAGE_2_TOKEN) {
      return {
        results: allResults.slice(MOCK_PAGE_SIZE, MOCK_PAGE_SIZE * 2),
        nextPage: null,
        totalResults
      };
    }
    return {
      results: allResults.slice(0, MOCK_PAGE_SIZE),
      nextPage: totalResults > MOCK_PAGE_SIZE ? MOCK_PAGE_2_TOKEN : null,
      totalResults
    };
  }

  const apiKey = config.newsApiKey;
  if (!apiKey) {
    throw createError({ statusCode: 500, message: 'News API key not configured' });
  }

  const query = getQuery(event);
  const page = query.page as string | undefined;

  const params = new URLSearchParams({
    apikey: apiKey,
    size: '10'
  });
  if (page) params.set('page', page);

  const url = `${NEWSDATA_LATEST_URL}?${params.toString()}`;
  const data = await $fetch<{
    results?: Array<{
      article_id?: string;
      title?: string;
      description?: string | null;
      image_url?: string | null;
    }>;
    nextPage?: string | null;
    totalResults?: number;
  }>(url);

  const results = (data.results ?? []).map((item) => ({
    article_id: item.article_id ?? '',
    title: item.title ?? '',
    description: item.description ?? null,
    image_url: item.image_url ?? null
  }));

  return {
    results,
    nextPage: data.nextPage ?? null,
    totalResults: data.totalResults ?? undefined
  };
});
