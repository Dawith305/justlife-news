<template>
  <div class="layout">
    <header class="header">
      <NuxtLink to="/" class="logo">
        <img src="/logo.svg" alt="Justlife" class="logo__img" />
      </NuxtLink>
    </header>
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
  font-family: var(--font-sans);
  color: var(--color-text);
}

.header {
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg);
}

.logo {
  display: inline-block;
  text-decoration: none;

  &:hover {
    opacity: 0.9;
  }

  &__img {
    display: block;
    height: 2rem;
    width: auto;
  }
}

.main {
  flex: 1;
  padding: var(--space-lg);
  max-width: 48rem;
  margin: 0 auto;
  width: 100%;
}
</style>
