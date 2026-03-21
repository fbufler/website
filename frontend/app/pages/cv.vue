<script setup lang="ts">
import { MapPin, Mail, Github, Globe, Briefcase, GraduationCap, Code2, Printer } from 'lucide-vue-next'

definePageMeta({ layout: 'cv' })
useHead({ title: 'CV — fbufler' })

const { data: cv } = await useAsyncData('cv', () =>
  queryCollection('cv').first(),
)

function formatPeriod(period: { from: string; to: string }) {
  return `${period.from} → ${period.to === 'present' ? 'present' : period.to}`
}
</script>

<template>
  <div v-if="cv">
    <!-- Print button -->
    <div class="flex justify-end mb-6 print:hidden">
      <button
        @click="window.print()"
        class="flex items-center gap-2 px-3 py-1.5 text-sm border border-tn-border rounded hover:bg-tn-bg-popup transition-colors text-tn-fg-muted"
      >
        <Printer :size="14" /> print / save PDF
      </button>
    </div>

    <!-- Meta -->
    <UiWindowChrome :title="`cv.yml`" class="mb-8">
      <div class="p-6">
        <h1 class="text-2xl font-bold text-tn-blue mb-1">{{ cv.info.name }}</h1>
        <p class="text-tn-fg-dark mb-4">{{ cv.info.title }}</p>
        <div class="flex flex-wrap gap-4 text-sm text-tn-fg-muted">
          <span v-if="cv.info.location" class="flex items-center gap-1.5">
            <MapPin :size="14" /> {{ cv.info.location }}
          </span>
          <a v-if="cv.info.email" :href="`mailto:${cv.info.email}`" class="flex items-center gap-1.5 hover:text-tn-cyan transition-colors">
            <Mail :size="14" /> {{ cv.info.email }}
          </a>
          <a v-if="cv.info.github" :href="`https://github.com/${cv.info.github}`" target="_blank" class="flex items-center gap-1.5 hover:text-tn-cyan transition-colors">
            <Github :size="14" /> {{ cv.info.github }}
          </a>
          <a v-if="cv.info.website" :href="cv.info.website" target="_blank" class="flex items-center gap-1.5 hover:text-tn-cyan transition-colors">
            <Globe :size="14" /> {{ cv.info.website }}
          </a>
        </div>
      </div>
    </UiWindowChrome>

    <!-- Summary -->
    <section v-if="cv.summary" class="mb-8">
      <h2 class="section-title">
        <span class="text-tn-blue">// </span>summary
      </h2>
      <p class="text-tn-fg-dark">{{ cv.summary }}</p>
    </section>

    <!-- Experience -->
    <section v-if="cv.experience?.length" class="mb-8">
      <h2 class="section-title">
        <Briefcase :size="14" class="inline mr-2 text-tn-blue" />experience
      </h2>
      <div class="space-y-6">
        <div v-for="(job, i) in cv.experience" :key="i" class="border-l-2 border-tn-border pl-4">
          <div class="flex flex-wrap items-start justify-between gap-2 mb-1">
            <div>
              <span class="font-semibold text-tn-fg">{{ job.role }}</span>
              <span class="text-tn-fg-muted mx-2">@</span>
              <span class="text-tn-cyan">{{ job.company }}</span>
            </div>
            <span class="text-tn-fg-muted text-xs font-mono">{{ formatPeriod(job.period) }}</span>
          </div>
          <ul class="mt-2 space-y-1 text-sm text-tn-fg-dark">
            <li v-for="(bullet, j) in job.bullets" :key="j" class="flex gap-2">
              <span class="text-tn-blue mt-1 shrink-0">›</span>
              <span>{{ bullet }}</span>
            </li>
          </ul>
          <div v-if="job.tags?.length" class="flex flex-wrap gap-1 mt-2">
            <UiTagBadge v-for="tag in job.tags" :key="tag" :tag="tag" />
          </div>
        </div>
      </div>
    </section>

    <!-- Education -->
    <section v-if="cv.education?.length" class="mb-8">
      <h2 class="section-title">
        <GraduationCap :size="14" class="inline mr-2 text-tn-blue" />education
      </h2>
      <div class="space-y-4">
        <div v-for="(edu, i) in cv.education" :key="i" class="border-l-2 border-tn-border pl-4">
          <div class="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div class="font-semibold text-tn-fg">{{ edu.degree }}</div>
              <div class="text-tn-cyan text-sm">{{ edu.institution }}</div>
            </div>
            <span class="text-tn-fg-muted text-xs font-mono">{{ formatPeriod(edu.period) }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section v-if="cv.skills?.length" class="mb-8">
      <h2 class="section-title">
        <Code2 :size="14" class="inline mr-2 text-tn-blue" />skills
      </h2>
      <div class="space-y-3">
        <div v-for="group in cv.skills" :key="group.category">
          <div class="text-tn-fg-muted text-xs uppercase tracking-wider mb-2">{{ group.category }}</div>
          <div class="flex flex-wrap gap-1.5">
            <UiTagBadge v-for="item in group.items" :key="item" :tag="item" />
          </div>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="text-tn-fg-muted text-sm">CV not found.</div>
</template>

<style scoped>
.section-title {
  @apply text-tn-fg font-semibold mb-4 pb-2 border-b border-tn-border flex items-center;
}
</style>
