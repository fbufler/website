<template>
  <div class="min-h-screen bg-tn-bg text-tn-fg">
    <LayoutAppHeader class="print:hidden" />
    <main class="max-w-4xl mx-auto px-4 py-10 pb-20">
      <slot />
    </main>
    <UiStatusBar class="print:hidden" />
  </div>
</template>
