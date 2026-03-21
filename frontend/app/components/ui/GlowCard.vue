<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'

interface Props {
  glowColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  glowColor: 'var(--tn-blue)',
})

const cardRef = ref<HTMLElement | null>(null)
const { elementX, elementY, isOutside } = useMouseInElement(cardRef)

const glowStyle = computed(() => {
  if (isOutside.value) return {}
  return {
    background: `radial-gradient(300px circle at ${elementX.value}px ${elementY.value}px, ${props.glowColor}18, transparent 60%)`,
  }
})
</script>

<template>
  <div
    ref="cardRef"
    class="relative border border-tn-border rounded-lg bg-tn-bg-popup overflow-hidden transition-colors duration-200 hover:border-tn-border-accent"
  >
    <!-- Glow layer -->
    <div
      class="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
      :style="glowStyle"
    />
    <!-- Content -->
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>
