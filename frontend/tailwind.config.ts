import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './app/**/*.{vue,ts,js}',
    './content/**/*.md',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Cascadia Code', 'Fira Code', 'ui-monospace', 'monospace'],
        sans: ['JetBrains Mono', 'Cascadia Code', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      colors: {
        tn: {
          bg: 'var(--tn-bg)',
          'bg-dark': 'var(--tn-bg-dark)',
          'bg-hl': 'var(--tn-bg-highlight)',
          'bg-popup': 'var(--tn-bg-popup)',
          fg: 'var(--tn-fg)',
          'fg-dark': 'var(--tn-fg-dark)',
          'fg-muted': 'var(--tn-fg-muted)',
          blue: 'var(--tn-blue)',
          cyan: 'var(--tn-cyan)',
          green: 'var(--tn-green)',
          yellow: 'var(--tn-yellow)',
          orange: 'var(--tn-orange)',
          red: 'var(--tn-red)',
          magenta: 'var(--tn-magenta)',
          teal: 'var(--tn-teal)',
          border: 'var(--tn-border)',
        },
      },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--tn-fg)',
            '--tw-prose-headings': 'var(--tn-blue)',
            '--tw-prose-links': 'var(--tn-cyan)',
            '--tw-prose-bold': 'var(--tn-orange)',
            '--tw-prose-code': 'var(--tn-green)',
            '--tw-prose-pre-bg': 'var(--tn-bg-dark)',
            '--tw-prose-quotes': 'var(--tn-fg-dark)',
            '--tw-prose-quote-borders': 'var(--tn-blue)',
            '--tw-prose-hr': 'var(--tn-border)',
            '--tw-prose-bullets': 'var(--tn-blue)',
            '--tw-prose-counters': 'var(--tn-fg-muted)',
            fontFamily: 'var(--font-mono)',
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config
