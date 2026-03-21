<template>
  <div class="min-h-screen flex flex-col bg-tn-bg text-tn-fg">
    <LayoutAppHeader />
    <div class="flex flex-1 w-full max-w-7xl mx-auto pb-16">
      <!-- Sidebar: file tree -->
      <aside class="hidden lg:block w-64 shrink-0 border-r border-tn-border pt-8 px-3 sticky top-0 h-screen overflow-y-auto">
        <div class="text-tn-fg-muted text-xs mb-3 px-2 uppercase tracking-wider">Explorer</div>
        <UiFileTree collection="blog" />
      </aside>
      <!-- Content -->
      <main class="flex-1 min-w-0 px-4 lg:px-10 py-10">
        <slot />
      </main>
    </div>
    <LayoutAppFooter />
    <UiStatusBar />
  </div>
</template>
