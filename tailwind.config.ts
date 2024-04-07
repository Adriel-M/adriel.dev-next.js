import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

type Theme = (color: string) => string

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './layouts/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      colors: {
        primary: colors.pink,
        gray: colors.gray,
      },
      fontFamily: {
        mono: 'var(--font-jetbrains-mono)',
      },
      typography: ({ theme }: { theme: Theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: theme('colors.primary.600'),
              },
            },
            'h1,h2': {
              fontWeight: '700',
            },
            h3: {
              fontWeight: '600',
            },
            'h1,h2,h3,h4,h5,h6': {
              letterSpacing: theme('letterSpacing.tight'),
            },
            '--tw-prose-pre-bg': theme('colors.slate.100 / 75%'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
} satisfies Config
