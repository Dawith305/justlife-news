<template>
  <li class="list-item">
    <NuxtLink
      :to="`/news/${props.article.article_id}`"
      class="list-item__link"
    >
      <span class="list-item__title">{{ props.article.title }}</span>
      <ChevronRight :size="18" class="list-item__icon" />
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next';
import type { NewsArticle } from '~/types/news';

const props = defineProps<{
  article: NewsArticle;
}>();
</script>

<style lang="scss" scoped>
.list-item {
  border-bottom: 1px solid var(--color-border);

  &:first-child {
    border-top: 1px solid var(--color-border);
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    padding: var(--space-md) 0;
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;

    &:hover {
      color: var(--color-primary-hover);
    }
  }

  &__title {
    flex: 1;
    min-width: 0;
  }

  &__icon {
    flex-shrink: 0;
    opacity: 0.8;
  }
}
</style>
