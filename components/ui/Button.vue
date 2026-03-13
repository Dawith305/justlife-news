<template>
  <button
    type="button"
    class="ui-button"
    :disabled="props.disabled"
    @click="emits('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
  const props = defineProps<{
    disabled?: boolean;
  }>();

  const emits = defineEmits<{
    click: [];
  }>();
</script>

<style lang="scss" scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  font-size: 1rem;
  color: var(--color-primary);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  cursor: pointer;

  &:hover:not(:disabled) {
    background: var(--color-bg-subtle);
    border-color: var(--color-primary);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
