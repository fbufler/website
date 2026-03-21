import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        date: z.string(),
        description: z.string().optional(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
      }),
    }),

    projects: defineCollection({
      type: 'page',
      source: 'projects/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        github: z.string().optional(),
        url: z.string().optional(),
        tags: z.array(z.string()).default([]),
        primaryLanguage: z.string().optional(),
        status: z.enum(['active', 'archived', 'wip']).default('active'),
        date: z.string().optional(),
      }),
    }),

    cv: defineCollection({
      type: 'data',
      source: 'cv/cv.yml',
      schema: z.object({
        info: z.object({
          name: z.string(),
          title: z.string(),
          email: z.string().optional(),
          github: z.string().optional(),
          linkedin: z.string().optional(),
          location: z.string().optional(),
          website: z.string().optional(),
        }),
        summary: z.string().optional(),
        experience: z
          .array(
            z.object({
              company: z.string(),
              role: z.string(),
              period: z.object({ from: z.string(), to: z.string() }),
              location: z.string().optional(),
              bullets: z.array(z.string()).default([]),
              tags: z.array(z.string()).default([]),
            })
          )
          .default([]),
        education: z
          .array(
            z.object({
              institution: z.string(),
              degree: z.string(),
              period: z.object({ from: z.string(), to: z.string() }),
            })
          )
          .default([]),
        skills: z
          .array(
            z.object({
              category: z.string(),
              items: z.array(z.string()),
            })
          )
          .default([]),
      }),
    }),
  },
})
