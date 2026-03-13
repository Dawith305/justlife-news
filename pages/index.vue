<template>
  <div class="news-list">
    <div class="news-list__header">
      <h1 class="news-list__title">Justlife News</h1>
      <p v-if="data?.totalResults != null && !pending" class="news-list__count">
        {{ data.totalResults.toLocaleString() }} results
      </p>
    </div>

    <NewsListSkeleton v-if="pending" />
    <div v-else-if="error" class="news-list__error">{{ error.message }}</div>

    <ul v-else-if="data?.results?.length" class="news-list__items">
      <NewsListItem
        v-for="article in data.results"
        :key="article.article_id"
        :article="article"
      />
    </ul>
    <p v-else class="news-list__empty">No articles found.</p>

    <nav v-if="data && !pending" class="news-list__pagination">
      <UiButton :disabled="!canGoPrev" @click="goPrev">
        <ChevronLeft :size="18" />
        Previous
      </UiButton>
      <UiButton :disabled="!data.nextPage" @click="goNext(data.nextPage ?? null)">
        Next
        <ChevronRight :size="18" />
      </UiButton>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import type { NewsApiResponse } from '~/types/news';
import { useNewsPagination } from '~/composables/useNewsPagination';

const { currentPageToken, canGoPrev, goNext, goPrev } = useNewsPagination();

const { data, pending, error } = useAsyncData(
  () => `news-list-${currentPageToken.value ?? 'first'}`,
  () =>
    $fetch<NewsApiResponse>('/api/news', {
      query: currentPageToken.value ? { page: currentPageToken.value } : {}
    }),
  { watch: [currentPageToken] }
);
</script>

<style lang="scss" scoped>
.news-list {
  max-width: 48rem;
  margin: 0 auto;

  &__header {
    margin-bottom: var(--space-lg);
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 var(--space-xs) 0;
    color: var(--color-text);
  }

  &__count {
    margin: 0;
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }

  &__error,
  &__empty {
    padding: var(--space-lg);
    color: var(--color-text-muted);
  }

  &__error {
    color: var(--color-danger);
  }

  &__items {
    list-style: none;
    padding: 0;
    margin: 0 0 var(--space-xl);
  }

  &__pagination {
    display: flex;
    gap: var(--space-md);
    margin-top: var(--space-lg);
  }
}
</style>
