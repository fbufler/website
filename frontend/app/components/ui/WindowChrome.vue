<script setup lang="ts">
interface Props {
  title?: string
}

defineProps<Props>()
</script>

<template>
  <div class="border border-tn-border rounded-lg overflow-hidden bg-tn-bg-dark">
    <!-- Title bar -->
    <div class="flex items-center gap-2 px-3 py-2 border-b border-tn-border bg-tn-bg-popup">
      <!-- Traffic lights -->
      <div class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-tn-red opacity-80" />
        <span class="w-3 h-3 rounded-full bg-tn-yellow opacity-80" />
        <span class="w-3 h-3 rounded-full bg-tn-green opacity-80" />
      </div>
      <!-- Title -->
      <span v-if="title" class="text-xs text-tn-fg-muted ml-1 font-mono">{{ title }}</span>
    </div>
    <!-- Content -->
    <div>
      <slot />
    </div>
  </div>
</template>
