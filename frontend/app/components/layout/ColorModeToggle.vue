<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'

const colorMode = useColorMode()

function toggle() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    @click="toggle"
    class="p-1.5 rounded text-tn-fg-muted hover:text-tn-fg hover:bg-tn-bg-hl transition-colors"
    :aria-label="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <Sun v-if="colorMode.value === 'dark'" :size="16" />
    <Moon v-else :size="16" />
  </button>
</template>
