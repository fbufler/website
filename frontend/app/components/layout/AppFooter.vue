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
      <a
        :href="appConfig.site.github"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-tn-cyan transition-colors"
      >
        github.com/fbufler
      </a>
    </div>
  </footer>
</template>
