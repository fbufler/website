import { queryCollectionSearchSections } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const q = (getQuery(event).q as string ?? '').trim().toLowerCase()
  if (q.length < 2) return []

  const [blogSections, projectSections] = await Promise.all([
    queryCollectionSearchSections(event, 'blog'),
    queryCollectionSearchSections(event, 'projects'),
  ])

  const seen = new Map<string, { id: string; title: string; excerpt: string }>()

  for (const section of [...blogSections, ...projectSections]) {
    const titleMatch = section.title?.toLowerCase().includes(q)
    const contentMatch = section.content?.toLowerCase().includes(q)
    if (!titleMatch && !contentMatch) continue
    if (seen.has(section.id)) continue

    let excerpt = ''
    if (contentMatch && section.content) {
      const idx = section.content.toLowerCase().indexOf(q)
      excerpt = section.content.slice(Math.max(0, idx - 40), idx + 80).trim()
    }

    seen.set(section.id, { id: section.id, title: section.title ?? section.id, excerpt })
  }

  return Array.from(seen.values()).slice(0, 8)
})
