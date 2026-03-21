<script setup lang="ts">
interface Post {
  title: string
  path: string
  date: string
  description?: string
  tags?: string[]
}

defineProps<{ post: Post }>()

function formatDate(date: string) {
  return new Date(date).toISOString().slice(0, 10)
}

function toFilePath(path: string) {
  return '~' + path + '.md'
}
</script>

<template>
  <NuxtLink
    :to="post.path"
    class="block group border border-tn-border rounded-lg p-4 hover:border-tn-border-accent hover:bg-tn-bg-popup transition-all duration-200"
  >
    <!-- File path -->
    <UiFilePath :path="toFilePath(post.path)" class="text-xs mb-2 opacity-75" />

    <!-- Title -->
    <h2 class="text-tn-fg font-semibold text-base group-hover:text-tn-blue transition-colors mb-1">
      {{ post.title }}
    </h2>

    <!-- Description -->
    <p v-if="post.description" class="text-tn-fg-dark text-sm mb-3 line-clamp-2">
      {{ post.description }}
    </p>

    <!-- Meta -->
    <div class="flex flex-wrap items-center gap-2 text-xs text-tn-fg-muted">
      <span>{{ formatDate(post.date) }}</span>
      <span>·</span>
      <div class="flex flex-wrap gap-1">
        <UiTagBadge v-for="tag in post.tags" :key="tag" :tag="tag" />
      </div>
    </div>
  </NuxtLink>
</template>
