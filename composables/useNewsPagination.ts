import type { Ref } from 'vue';

export function useNewsPagination() {
  const currentPageToken = ref<string | null>(null);
  const previousToken = ref<string | null>(null);

  const canGoPrev = computed(() => previousToken.value !== null);

  function goNext(nextPage: string | null) {
    if (!nextPage) return;
    previousToken.value = currentPageToken.value;
    currentPageToken.value = nextPage;
  }

  function goPrev() {
    if (previousToken.value === null) return;
    currentPageToken.value = previousToken.value;
    previousToken.value = null;
  }

  function reset() {
    currentPageToken.value = null;
    previousToken.value = null;
  }

  return {
    currentPageToken: currentPageToken as Ref<string | null>,
    canGoPrev,
    goNext,
    goPrev,
    reset
  };
}
