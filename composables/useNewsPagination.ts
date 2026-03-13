import type { Ref } from 'vue';

export function useNewsPagination() {
  const currentPageToken = ref<string | null>(null);
  const previousTokens = ref<Array<string | null>>([]);

  const canGoPrev = computed(() => previousTokens.value.length > 0);

  function goNext(nextPage: string | null) {
    if (!nextPage) return;
    previousTokens.value = [...previousTokens.value, currentPageToken.value];
    currentPageToken.value = nextPage;
  }

  function goPrev() {
    const tokens = previousTokens.value;
    if (tokens.length === 0) return;
    const token = tokens[tokens.length - 1];
    previousTokens.value = tokens.slice(0, -1);
    currentPageToken.value = token;
  }

  function reset() {
    currentPageToken.value = null;
    previousTokens.value = [];
  }

  return {
    currentPageToken: currentPageToken as Ref<string | null>,
    canGoPrev,
    goNext,
    goPrev,
    reset
  };
}
