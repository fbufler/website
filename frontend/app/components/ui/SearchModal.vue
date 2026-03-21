<script setup lang="ts">
import { Search, X, FileText, FolderOpen } from 'lucide-vue-next'

const emit = defineEmits<{ close: [] }>()

const query = ref('')
const input = ref<HTMLInputElement>()

const results = ref<Array<{ id: string; title: string; excerpt: string }>>([])

watch(query, async (q) => {
  if (q.trim().length < 2) {
    results.value = []
    return
  }
  results.value = await $fetch('/api/search', { query: { q } })
})

onMounted(() => nextTick(() => input.value?.focus()))

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

function navigate() {
  emit('close')
  query.value = ''
}

function icon(id: string) {
  return id.startsWith('/blog') ? FileText : FolderOpen
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
    @keydown="onKeydown"
    @click.self="emit('close')"
  >
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="emit('close')" />

    <!-- Modal -->
    <div class="relative w-full max-w-xl bg-tn-bg-dark border border-tn-border rounded-lg shadow-2xl overflow-hidden">
      <!-- Input -->
      <div class="flex items-center gap-3 px-4 py-3 border-b border-tn-border">
        <Search :size="16" class="text-tn-fg-muted shrink-0" />
        <input
          ref="input"
          v-model="query"
          type="text"
          placeholder="Search posts and projects..."
          class="flex-1 bg-transparent text-tn-fg placeholder-tn-fg-muted outline-none text-sm"
        />
        <button @click="emit('close')" class="text-tn-fg-muted hover:text-tn-fg transition-colors">
          <X :size="16" />
        </button>
      </div>

      <!-- Results -->
      <div v-if="query" class="max-h-80 overflow-y-auto">
        <template v-if="results?.length">
          <NuxtLink
            v-for="result in results"
            :key="result.id"
            :to="result.id"
            class="flex items-center gap-3 px-4 py-3 hover:bg-tn-bg-hl transition-colors border-b border-tn-border/50 last:border-0"
            @click="navigate"
          >
            <component :is="icon(result.id)" :size="14" class="text-tn-fg-muted shrink-0" />
            <div class="min-w-0">
              <div class="text-sm text-tn-fg truncate">{{ result.title }}</div>
              <div v-if="result.excerpt" class="text-xs text-tn-fg-muted truncate">{{ result.excerpt }}</div>
              <div v-else class="text-xs text-tn-fg-muted truncate">{{ result.id }}</div>
            </div>
          </NuxtLink>
        </template>
        <div v-else class="px-4 py-6 text-center text-sm text-tn-fg-muted">
          No results for "{{ query }}"
        </div>
      </div>

      <!-- Hint -->
      <div v-else class="px-4 py-3 text-xs text-tn-fg-muted">
        Type to search blog posts and projects
      </div>
    </div>
  </div>
</template>
