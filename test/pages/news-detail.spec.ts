import { describe, it, expect, vi } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import NewsDetailPage from '~/pages/news/[id].vue';
import type { NewsArticle } from '~/types/news';

const mockArticle: NewsArticle = {
  article_id: 'test-id',
  title: 'Test Article Title',
  description: 'Test article description.',
  image_url: 'https://example.com/image.jpg'
};

mockNuxtImport('useAsyncData', (original: (key: any, handler: any, opts?: any) => Promise<any>) => {
  return (key: string | (() => string), _handler: () => Promise<NewsArticle | null>) => {
    return original(key, () => Promise.resolve(mockArticle), { watch: [] });
  };
});

describe('News detail page', () => {
  it('renders article title, description and image when article exists', async () => {
    const wrapper = await mountSuspended(NewsDetailPage, {
      route: '/news/test-id'
    });
    expect(wrapper.text()).toContain('Test Article Title');
    expect(wrapper.text()).toContain('Test article description.');
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('https://example.com/image.jpg');
  });

  it('has back to news link', async () => {
    const wrapper = await mountSuspended(NewsDetailPage, {
      route: '/news/test-id'
    });
    expect(wrapper.text()).toContain('Test Article Title');
    const backLink = wrapper.find('a[href="/"]');
    expect(backLink.exists()).toBe(true);
    expect(backLink.text()).toContain('Back');
  });
});
