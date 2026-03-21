<script setup lang="ts">
import { Github } from 'lucide-vue-next'

const appConfig = useAppConfig()
const route = useRoute()

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-tn-border bg-tn-bg/90 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between gap-4">
      <!-- Logo -->
      <NuxtLink to="/" class="text-tn-blue font-semibold hover:text-tn-cyan transition-colors shrink-0">
        {{ appConfig.site.name }}
      </NuxtLink>

      <!-- Nav -->
      <nav class="hidden sm:flex items-center gap-1 overflow-x-auto">
        <NuxtLink
          v-for="item in appConfig.site.nav"
          :key="item.path"
          :to="item.path"
          class="px-2.5 py-1 rounded text-sm transition-colors whitespace-nowrap"
          :class="isActive(item.path)
            ? 'text-tn-green bg-tn-bg-hl'
            : 'text-tn-fg-dark hover:text-tn-fg hover:bg-tn-bg-hl'"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Right side -->
      <div class="flex items-center gap-2 shrink-0">
        <a
          :href="appConfig.site.github"
          target="_blank"
          rel="noopener noreferrer"
          class="text-tn-fg-muted hover:text-tn-fg transition-colors"
          aria-label="GitHub"
        >
          <Github :size="18" />
        </a>
        <LayoutColorModeToggle />
      </div>
    </div>
  </header>
</template>
