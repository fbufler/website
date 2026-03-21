<script setup lang="ts">
import { Github, ExternalLink, ArrowLeft, Circle } from 'lucide-vue-next'

const route = useRoute()
const path = computed(() => `/projects/${route.params.slug}`)

const { data: project } = await useAsyncData(path.value, () =>
  queryCollection('projects').path(path.value).first(),
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

useHead({
  title: `${project.value?.title} — fbufler`,
  meta: [{ name: 'description', content: project.value?.description ?? '' }],
})

const statusColor: Record<string, string> = {
  active: 'var(--tn-green)',
  wip: 'var(--tn-yellow)',
  archived: 'var(--tn-fg-muted)',
}
</script>

<template>
  <article v-if="project">
    <!-- Header -->
    <header class="mb-8 pb-6 border-b border-tn-border">
      <UiFilePath :path="`~/projects/${route.params.slug}.md`" class="text-xs mb-3 block" />
      <div class="flex items-start justify-between gap-4 mb-3">
        <h1 class="text-2xl sm:text-3xl font-bold text-tn-blue">{{ project.title }}</h1>
        <span
          class="flex items-center gap-1.5 text-xs font-mono shrink-0 mt-1"
          :style="{ color: statusColor[project.status ?? 'active'] }"
        >
          <Circle :size="6" :fill="statusColor[project.status ?? 'active']" />
          {{ project.status ?? 'active' }}
        </span>
      </div>
      <p v-if="project.description" class="text-tn-fg-dark mb-4">{{ project.description }}</p>
      <div class="flex flex-wrap items-center gap-3">
        <div class="flex flex-wrap gap-1.5">
          <UiTagBadge v-for="tag in project.tags" :key="tag" :tag="tag" />
        </div>
        <div class="flex items-center gap-3 text-sm text-tn-fg-muted ml-auto">
          <a
            v-if="project.github"
            :href="project.github"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1.5 hover:text-tn-fg transition-colors"
          >
            <Github :size="14" /> source
          </a>
          <a
            v-if="project.url"
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1.5 hover:text-tn-cyan transition-colors"
          >
            <ExternalLink :size="14" /> demo
          </a>
        </div>
      </div>
    </header>

    <!-- Content -->
    <div class="prose max-w-none">
      <ContentRenderer :value="project" />
    </div>

    <!-- Nav -->
    <div class="mt-12 pt-6 border-t border-tn-border">
      <NuxtLink to="/projects" class="flex items-center gap-1.5 text-tn-cyan hover:text-tn-blue transition-colors text-sm w-fit">
        <ArrowLeft :size="14" /> back to projects
      </NuxtLink>
    </div>
  </article>
</template>
