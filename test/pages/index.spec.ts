import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import IndexPage from '~/pages/index.vue';
import type { NewsApiResponse } from '~/types/news';

const mockListResponse: NewsApiResponse = {
  results: [
    {
      article_id: 'id-1',
      title: 'First Article',
      description: 'Desc 1',
      image_url: null
    },
    {
      article_id: 'id-2',
      title: 'Second Article',
      description: 'Desc 2',
      image_url: null
    }
  ],
  nextPage: 'next-token'
};

const mockFetch = vi.fn(() => Promise.resolve(mockListResponse));

beforeEach(() => {
  vi.stubGlobal('$fetch', mockFetch);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('News list page', () => {
  it('renders article titles and links to detail', async () => {
    const wrapper = await mountSuspended(IndexPage);
    await vi.waitFor(() => {
      expect(wrapper.text()).toContain('First Article');
      expect(wrapper.text()).toContain('Second Article');
    });
    const link1 = wrapper.find('a[href="/news/id-1"]');
    const link2 = wrapper.find('a[href="/news/id-2"]');
    expect(link1.exists()).toBe(true);
    expect(link2.exists()).toBe(true);
  });

  it('shows pagination buttons with Previous disabled and Next enabled', async () => {
    const wrapper = await mountSuspended(IndexPage);
    await vi.waitFor(() => {
      expect(wrapper.text()).toContain('Previous');
      expect(wrapper.text()).toContain('Next');
    });
    const buttons = wrapper.findAll('button');
    const prevBtn = buttons.find((b) => b.text().trim().includes('Previous'));
    const nextBtn = buttons.find((b) => b.text().trim().includes('Next'));
    expect(prevBtn?.attributes('disabled')).toBeDefined();
    expect(nextBtn?.attributes('disabled')).toBeUndefined();
  });
});
