<script setup lang="ts">
import { Github, Circle } from 'lucide-vue-next'

useHead({ title: 'Projects — fbufler' })

const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('projects').order('date', 'DESC').all(),
)

const statusColor: Record<string, string> = {
  active: 'var(--tn-green)',
  wip: 'var(--tn-yellow)',
  archived: 'var(--tn-fg-muted)',
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <UiFilePath path="~/projects" class="text-sm mb-2 block" />
      <h1 class="text-2xl font-bold text-tn-blue mb-1">Projects</h1>
      <p class="text-tn-fg-muted text-sm">{{ projects?.length ?? 0 }} repositories</p>
    </div>

    <!-- Grid -->
    <div v-if="projects?.length" class="grid sm:grid-cols-2 gap-4">
      <UiGlowCard
        v-for="project in projects"
        :key="project.path"
        :glow-color="statusColor[project.status ?? 'active']"
      >
        <NuxtLink :to="project.path" class="block p-5 h-full">
          <!-- Name + status -->
          <div class="flex items-start justify-between gap-2 mb-2">
            <h2 class="text-tn-fg font-semibold text-base group-hover:text-tn-blue transition-colors">{{ project.title }}</h2>
            <span
              class="flex items-center gap-1 text-xs font-mono shrink-0"
              :style="{ color: statusColor[project.status ?? 'active'] }"
            >
              <Circle :size="6" :fill="statusColor[project.status ?? 'active']" />
              {{ project.status ?? 'active' }}
            </span>
          </div>

          <!-- Description -->
          <p v-if="project.description" class="text-tn-fg-dark text-sm mb-4 line-clamp-2">
            {{ project.description }}
          </p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5 mb-4">
            <UiTagBadge v-for="tag in project.tags" :key="tag" :tag="tag" />
          </div>

          <!-- Links -->
          <div class="flex items-center gap-3 text-tn-fg-muted text-sm">
            <span v-if="project.github" class="flex items-center gap-1">
              <Github :size="14" /> source
            </span>
            <span class="text-tn-cyan text-xs ml-auto">read more →</span>
          </div>
        </NuxtLink>
      </UiGlowCard>
    </div>

    <div v-else class="text-tn-fg-muted text-sm">No projects yet.</div>
  </div>
</template>
