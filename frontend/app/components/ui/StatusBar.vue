<script setup lang="ts">
import { GitBranch, Sun, Moon } from 'lucide-vue-next'

const route = useRoute()
const colorMode = useColorMode()
const appConfig = useAppConfig()
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 z-50 h-6 bg-tn-blue text-tn-bg flex items-center justify-between px-3 text-xs font-mono select-none print:hidden">
    <!-- Left: branch + current path -->
    <div class="flex items-center gap-3">
      <span class="flex items-center gap-1 font-semibold">
        <GitBranch :size="12" />
        main
      </span>
      <span class="hidden sm:block opacity-75">{{ route.path }}</span>
    </div>

    <!-- Right: site name + color mode -->
    <div class="flex items-center gap-3">
      <span class="hidden sm:block opacity-75">{{ appConfig.site.name }}</span>
      <span class="flex items-center gap-1">
        <Sun v-if="colorMode.value === 'dark'" :size="11" />
        <Moon v-else :size="11" />
        {{ colorMode.value }}
      </span>
    </div>
  </div>
</template>
