<script setup lang="ts">
import { ArrowRight, FileText, FolderGit2, User } from 'lucide-vue-next'

const appConfig = useAppConfig()

// Animated typing effect
const typed = ref('')
const fullText = appConfig.site.tagline
let idx = 0

onMounted(() => {
  const timer = setInterval(() => {
    if (idx < fullText.length) {
      typed.value += fullText[idx++]
    } else {
      clearInterval(timer)
    }
  }, 50)
})

const recentPosts = await useAsyncData('recent-posts', () =>
  queryCollection('blog')
    .where('draft', '!=', true)
    .order('date', 'DESC')
    .limit(3)
    .all(),
)
</script>

<template>
  <div class="space-y-16">
    <!-- Hero -->
    <section class="pt-8">
      <UiWindowChrome title="~ zsh">
        <div class="p-6 space-y-2 font-mono text-sm">
          <p>
            <span class="text-tn-green">fbufler</span>
            <span class="text-tn-fg-muted">@dev</span>
            <span class="text-tn-fg-muted">:</span>
            <span class="text-tn-cyan">~</span>
            <span class="text-tn-fg-muted">$ </span>
            <span class="text-tn-fg">whoami</span>
          </p>
          <p class="text-tn-blue text-lg font-semibold">
            {{ appConfig.site.name }}
          </p>
          <p>
            <span class="text-tn-green">fbufler</span>
            <span class="text-tn-fg-muted">@dev</span>
            <span class="text-tn-fg-muted">:</span>
            <span class="text-tn-cyan">~</span>
            <span class="text-tn-fg-muted">$ </span>
            <span class="text-tn-fg">cat tagline.txt</span>
          </p>
          <p class="text-tn-fg-dark">
            {{ typed }}<span class="animate-pulse text-tn-blue">▋</span>
          </p>
          <p class="text-tn-fg-muted text-xs pt-2">
            <span class="text-tn-fg-muted">$ </span>
            <span class="animate-pulse">_</span>
          </p>
        </div>
      </UiWindowChrome>
    </section>

    <!-- Quick links -->
    <section>
      <h2 class="text-tn-fg-muted text-xs uppercase tracking-wider mb-4">
        <span class="text-tn-blue">// </span>navigate
      </h2>
      <div class="grid sm:grid-cols-3 gap-3">
        <NuxtLink
          v-for="link in [
            { to: '/blog', label: '~/blog', icon: FileText, desc: 'thoughts & writeups' },
            { to: '/projects', label: '~/projects', icon: FolderGit2, desc: 'things i built' },
            { to: '/about', label: '~/about', icon: User, desc: 'who is this person' },
          ]"
          :key="link.to"
          :to="link.to"
          class="group flex items-center gap-3 border border-tn-border rounded-lg p-4 hover:border-tn-border-accent hover:bg-tn-bg-popup transition-all"
        >
          <component :is="link.icon" :size="18" class="text-tn-blue shrink-0" />
          <div class="min-w-0">
            <div class="text-tn-green text-sm font-mono">{{ link.label }}</div>
            <div class="text-tn-fg-muted text-xs truncate">{{ link.desc }}</div>
          </div>
          <ArrowRight :size="14" class="text-tn-fg-muted ml-auto shrink-0 group-hover:text-tn-blue transition-colors" />
        </NuxtLink>
      </div>
    </section>

    <!-- Recent posts -->
    <section v-if="recentPosts.data.value?.length">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-tn-fg-muted text-xs uppercase tracking-wider">
          <span class="text-tn-blue">// </span>recent posts
        </h2>
        <NuxtLink to="/blog" class="text-xs text-tn-cyan hover:text-tn-blue transition-colors">
          view all →
        </NuxtLink>
      </div>
      <div class="space-y-3">
        <BlogPostCard
          v-for="post in recentPosts.data.value"
          :key="post.path"
          :post="post"
        />
      </div>
    </section>
  </div>
</template>
