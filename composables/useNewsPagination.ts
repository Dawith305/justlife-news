import type { Ref } from 'vue';

export function useNewsPagination() {
  const currentPageToken = ref<string | null>(null);
  const previousToken = ref<string | null>(null);

  const canGoPrev = computed(() => currentPageToken.value !== null);

  function goNext(nextPage: string | null) {
    if (!nextPage) return;
    previousToken.value = currentPageToken.value;
    currentPageToken.value = nextPage;
  }

  function goPrev() {
    if (currentPageToken.value === null) return;
    if (previousToken.value !== null) {
      currentPageToken.value = previousToken.value;
      previousToken.value = null;
    } else {
      currentPageToken.value = null;
    }
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
