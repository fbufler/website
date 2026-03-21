<script setup lang="ts">
import { Github, Search } from 'lucide-vue-next'

const appConfig = useAppConfig()
const route = useRoute()
const searchOpen = ref(false)

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      searchOpen.value = true
    }
  })
})
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
        <button
          class="text-tn-fg-muted hover:text-tn-fg transition-colors"
          aria-label="Search"
          @click="searchOpen = true"
        >
          <Search :size="18" />
        </button>
        <a
          v-if="appConfig.site.linkedin"
          :href="appConfig.site.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="text-tn-fg-muted hover:text-tn-fg transition-colors"
          aria-label="LinkedIn"
        >
          <svg :width="18" :height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
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

  <Teleport to="body">
    <UiSearchModal v-if="searchOpen" @close="searchOpen = false" />
  </Teleport>
</template>
