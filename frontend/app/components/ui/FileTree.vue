<script setup lang="ts">
interface Props {
  collection: string
}

const props = defineProps<Props>()

const { data: navigation } = await useAsyncData(
  `nav-${props.collection}`,
  () => queryCollectionNavigation(props.collection as 'blog'),
)
</script>

<template>
  <nav class="text-sm">
    <UiFileTreeItem
      v-for="item in navigation"
      :key="item.path"
      :item="item"
      :depth="0"
    />
  </nav>
</template>
