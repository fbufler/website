<script setup lang="ts">
definePageMeta({ layout: 'blog' })

const { data: posts } = await useAsyncData('blog-posts', () =>
  queryCollection('blog')
    .where('draft', '!=', true)
    .order('date', 'DESC')
    .all(),
)

const allTags = computed(() => {
  const tags = new Set<string>()
  posts.value?.forEach(p => p.tags?.forEach(t => tags.add(t)))
  return [...tags].sort()
})

const activeTag = ref<string | null>(null)

const filtered = computed(() => {
  if (!activeTag.value) return posts.value
  return posts.value?.filter(p => p.tags?.includes(activeTag.value!))
})
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <UiFilePath path="~/blog" class="text-sm mb-2 block" />
      <h1 class="text-2xl font-bold text-tn-blue mb-1">Blog</h1>
      <p class="text-tn-fg-muted text-sm">{{ posts?.length ?? 0 }} posts</p>
    </div>

    <!-- Tag filter -->
    <div v-if="allTags.length" class="flex flex-wrap gap-2 mb-6">
      <button
        class="text-xs px-2 py-0.5 rounded border transition-colors font-mono"
        :class="!activeTag
          ? 'border-tn-blue text-tn-blue bg-tn-blue/10'
          : 'border-tn-border text-tn-fg-muted hover:border-tn-border-accent'"
        @click="activeTag = null"
      >
        all
      </button>
      <button
        v-for="tag in allTags"
        :key="tag"
        class="text-xs px-2 py-0.5 rounded border transition-colors font-mono"
        :class="activeTag === tag
          ? 'border-tn-blue text-tn-blue bg-tn-blue/10'
          : 'border-tn-border text-tn-fg-muted hover:border-tn-border-accent'"
        @click="activeTag = activeTag === tag ? null : tag"
      >
        {{ tag }}
      </button>
    </div>

    <!-- Posts -->
    <div v-if="filtered?.length" class="space-y-3">
      <BlogPostCard v-for="post in filtered" :key="post.path" :post="post" />
    </div>
    <div v-else class="text-tn-fg-muted text-sm">
      No posts found.
    </div>
  </div>
</template>
