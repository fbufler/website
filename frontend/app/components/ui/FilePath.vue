<script setup lang="ts">
interface Props {
  path: string
}

const props = defineProps<Props>()

interface Segment {
  text: string
  type: 'tilde' | 'sep' | 'dir' | 'file' | 'ext'
}

const segments = computed<Segment[]>(() => {
  const parts = props.path.split('/')
  const result: Segment[] = []

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (!part) continue

    if (part === '~') {
      result.push({ text: '~', type: 'tilde' })
    } else if (i < parts.length - 1) {
      if (i > 0) result.push({ text: '/', type: 'sep' })
      result.push({ text: part, type: 'dir' })
    } else {
      if (i > 0) result.push({ text: '/', type: 'sep' })
      const dotIdx = part.lastIndexOf('.')
      if (dotIdx > 0) {
        result.push({ text: part.slice(0, dotIdx), type: 'file' })
        result.push({ text: part.slice(dotIdx), type: 'ext' })
      } else {
        result.push({ text: part, type: 'file' })
      }
    }
  }

  return result
})
</script>

<template>
  <span class="inline-flex items-center font-mono text-sm">
    <span
      v-for="(seg, i) in segments"
      :key="i"
      :class="{
        'text-tn-fg-muted': seg.type === 'tilde' || seg.type === 'sep' || seg.type === 'ext',
        'text-tn-cyan': seg.type === 'dir',
        'text-tn-green': seg.type === 'file',
      }"
    >{{ seg.text }}</span>
  </span>
</template>
