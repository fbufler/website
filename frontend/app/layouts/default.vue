<template>
  <div class="min-h-screen flex flex-col bg-tn-bg text-tn-fg">
    <LayoutAppHeader />
    <main class="flex-1 w-full max-w-5xl mx-auto px-4 py-10 pb-16">
      <slot />
    </main>
    <LayoutAppFooter />
    <UiStatusBar />
  </div>
</template>
