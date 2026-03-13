<template>
  <div class="detail-skeleton">
    <div class="skeleton detail-skeleton__back" />
    <div class="skeleton detail-skeleton__title" />
    <div class="skeleton detail-skeleton__image" />
    <div class="detail-skeleton__lines">
      <div class="skeleton detail-skeleton__line" />
      <div class="skeleton detail-skeleton__line" />
      <div class="skeleton detail-skeleton__line detail-skeleton__line--short" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail-skeleton {
  &__back {
    height: 1.5rem;
    width: 8rem;
    margin-bottom: var(--space-lg);
  }

  &__title {
    height: 2rem;
    width: 100%;
    max-width: 28rem;
    margin-bottom: var(--space-md);
  }

  &__image {
    width: 100%;
    height: 20rem;
    margin-bottom: var(--space-lg);
  }

  &__lines {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  &__line {
    height: 1rem;
    width: 100%;

    &--short {
      width: 60%;
    }
  }
}
</style>
