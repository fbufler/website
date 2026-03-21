<script setup lang="ts">
import { FileText, Folder, FolderOpen } from 'lucide-vue-next'

interface NavItem {
  title: string
  path: string
  children?: NavItem[]
}

interface Props {
  item: NavItem
  depth: number
}

const props = defineProps<Props>()
const route = useRoute()
const NuxtLink = resolveComponent('NuxtLink')

const isOpen = ref(true)
const isDir = computed(() => !!props.item.children?.length)
const isActive = computed(() => route.path === props.item.path)

function toggle() {
  if (isDir.value) isOpen.value = !isOpen.value
}
</script>

<template>
  <div>
    <!-- Row -->
    <component
      :is="isDir ? 'button' : NuxtLink"
      :to="!isDir ? item.path : undefined"
      class="flex items-center gap-1.5 w-full text-left px-2 py-0.5 rounded transition-colors"
      :style="{ paddingLeft: `${depth * 12 + 8}px` }"
      :class="isActive
        ? 'bg-tn-bg-hl text-tn-green'
        : 'text-tn-fg-dark hover:text-tn-fg hover:bg-tn-bg-hl'"
      @click="toggle"
    >
      <span class="shrink-0 text-tn-fg-muted">
        <FolderOpen v-if="isDir && isOpen" :size="14" />
        <Folder v-else-if="isDir" :size="14" />
        <FileText v-else :size="14" />
      </span>
      <span class="truncate">{{ item.title }}</span>
    </component>

    <!-- Children -->
    <div v-if="isDir && isOpen">
      <UiFileTreeItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :depth="depth + 1"
      />
    </div>
  </div>
</template>
