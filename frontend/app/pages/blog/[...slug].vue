<script setup lang="ts">
definePageMeta({ layout: 'blog' })

const route = useRoute()
const path = computed(() => route.path)

const { data: post } = await useAsyncData(path.value, () =>
  queryCollection('blog').path(path.value).first(),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

useHead({
  title: post.value?.title,
  meta: [{ name: 'description', content: post.value?.description ?? '' }],
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <article v-if="post">
    <!-- Post header -->
    <header class="mb-8 pb-6 border-b border-tn-border">
      <UiFilePath :path="`~${post.path}.md`" class="text-xs mb-3 block" />
      <h1 class="text-2xl sm:text-3xl font-bold text-tn-blue mb-3">{{ post.title }}</h1>
      <p v-if="post.description" class="text-tn-fg-dark mb-4">{{ post.description }}</p>
      <div class="flex flex-wrap items-center gap-3 text-sm text-tn-fg-muted">
        <time>{{ formatDate(post.date) }}</time>
        <div class="flex flex-wrap gap-1.5">
          <UiTagBadge v-for="tag in post.tags" :key="tag" :tag="tag" />
        </div>
      </div>
    </header>

    <!-- Content -->
    <div class="prose max-w-none">
      <ContentRenderer :value="post" />
    </div>

    <!-- Nav -->
    <div class="mt-12 pt-6 border-t border-tn-border">
      <NuxtLink to="/blog" class="text-tn-cyan hover:text-tn-blue transition-colors text-sm">
        ← back to blog
      </NuxtLink>
    </div>
  </article>
</template>
