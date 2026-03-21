<script setup lang="ts">
const appConfig = useAppConfig()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-tn-border bg-tn-bg-dark py-6 px-4 mb-6">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-tn-fg-muted text-sm">
      <span>
        <span class="text-tn-fg-muted">// </span>
        <span class="text-tn-green">{{ appConfig.site.name }}</span>
        <span class="text-tn-fg-muted"> · {{ year }}</span>
      </span>
      <div class="flex items-center gap-4">
        <a
          href="/rss.xml"
          class="flex items-center gap-1.5 hover:text-tn-orange transition-colors"
          title="RSS Feed"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
          </svg>
          rss
        </a>
        <a
          :href="appConfig.site.github"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-tn-cyan transition-colors"
        >
          github.com/fbufler
        </a>
      </div>
    </div>
  </footer>
</template>
