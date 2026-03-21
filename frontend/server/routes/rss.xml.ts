import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const siteUrl = useRuntimeConfig().public.siteUrl
  const posts = await queryCollection(event, 'blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all()

  const items = posts
    .map((post) => {
      const url = `${siteUrl}${post.path}`
      const pubDate = new Date(post.date).toUTCString()
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${pubDate}</pubDate>
      ${post.description ? `<description><![CDATA[${post.description}]]></description>` : ''}
    </item>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>fbufler</title>
    <link>${siteUrl}</link>
    <description>fbufler — developer, writer, builder</description>
    <language>en</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`

  setHeader(event, 'Content-Type', 'application/xml')
  return xml
})
