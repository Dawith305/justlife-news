<template>
  <article class="news-detail">
    <NuxtLink to="/" class="news-detail__back">
      <ArrowLeft :size="18" class="news-detail__back-icon" />
      Back to news
    </NuxtLink>

    <NewsDetailSkeleton v-if="pending && !data" />
    <div v-else-if="error" class="news-detail__error">{{ error.message }}</div>
    <div v-else-if="!article" class="news-detail__error">Article not found.</div>

    <template v-else-if="article">
      <h1 class="news-detail__title">{{ article.title }}</h1>
      <img
        v-if="article.image_url"
        :src="article.image_url"
        :alt="article.title"
        class="news-detail__image"
      />
      <p v-if="article.description" class="news-detail__description">{{ article.description }}</p>
    </template>
  </article>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next';
import type { NewsArticle } from '~/types/news';

const route = useRoute();
const id = computed(() => route.params.id as string);

const { data, pending, error } = useAsyncData(
  () => `news-article-${id.value}`,
  () => $fetch<NewsArticle | null>(`/api/news/${id.value}`),
  { watch: [id] }
);

const article = computed(() => data.value ?? null);
</script>

<style lang="scss" scoped>
.news-detail {
  max-width: 48rem;
  margin: 0 auto;

  &__back {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-md);
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;

    &:hover {
      color: var(--color-primary-hover);
    }
  }

  &__back-icon {
    flex-shrink: 0;
  }

  &__title {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: var(--space-md);
    color: var(--color-text);
    line-height: 1.3;
    text-decoration: underline;
  }

  &__image {
    width: 100%;
    max-height: 20rem;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: var(--space-lg);
  }

  &__description {
    color: var(--color-text);
    line-height: 1.6;
    margin: 0;
  }

  &__error {
    padding: var(--space-lg);
    color: var(--color-danger);
  }
}
</style>
