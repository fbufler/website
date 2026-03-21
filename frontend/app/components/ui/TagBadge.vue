<script setup lang="ts">
interface Props {
  tag: string
}

defineProps<Props>()

// Languages → cyan
const languages = ['go', 'golang', 'typescript', 'javascript', 'python', 'rust', 'css', 'html', 'sql', 'bash', 'c', 'cpp']

// Frameworks & Libraries → blue
const frameworks = ['vue', 'nuxt', 'nestjs', 'grpc', 'gin', 'react', 'svelte']

// Tools & Infrastructure → orange
const tools = [
  'docker', 'kubernetes', 'argocd', 'cli', 'terraform', 'buf',
  'gcp', 'aws', 'azure', 'stackit',
  's3', 'azure blob storage',
  'github actions', 'github-actions', 'gitlab workflows', 'azure devops', 'gitlab',
]

// Data & Messaging → yellow
const data = [
  'postgresql', 'sqlite', 'redis', 'mongodb', 'pubsub', 'kafka',
  'influxdb', 'mysql', 'emulator',
  'rabbitmq', 'eventhub', 'servicebus', 'eventbus',
]

// Concepts & Skills → magenta
const concepts = [
  'monitoring', 'governance-as-code', 'platform-engineering', 'cloud-native',
  'devops', 'event-driven', 'tdd', 'agile', 'safe', 'iac', 'rest',
]

// General / Meta / Fun → green
const general = ['meta', '7tv', 'emotes']

function getColor(tag: string): string {
  const t = tag.toLowerCase()
  if (languages.includes(t)) return 'var(--tn-cyan)'
  if (frameworks.includes(t)) return 'var(--tn-blue)'
  if (tools.includes(t)) return 'var(--tn-orange)'
  if (data.includes(t)) return 'var(--tn-yellow)'
  if (concepts.includes(t)) return 'var(--tn-magenta)'
  if (general.includes(t)) return 'var(--tn-green)'
  return 'var(--tn-fg-muted)'
}

</script>

<template>
  <span
    class="inline-block px-1.5 py-0.5 text-xs rounded font-mono border"
    :style="{
      color: getColor(tag),
      borderColor: getColor(tag) + '44',
      background: getColor(tag) + '11',
    }"
  >
    {{ tag }}
  </span>
</template>
