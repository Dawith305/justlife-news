<template>
  <div class="list-skeleton">
    <div class="list-skeleton__title skeleton" />
    <ul class="list-skeleton__items">
      <li
        v-for="i in 10"
        :key="i"
        class="list-skeleton__item"
      >
        <div class="skeleton list-skeleton__bar" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.list-skeleton {
  &__title {
    height: 1.75rem;
    width: 12rem;
    margin-bottom: var(--space-lg);
  }

  &__items {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    margin-bottom: var(--space-sm);
  }

  &__bar {
    height: 3rem;
    width: 100%;
  }
}
</style>
