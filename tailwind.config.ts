import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'

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
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ addUtilities, theme }) {
      const sizes = ['2xl', '4xl'] // Specific sizes to handle
      const maxWidths = theme('maxWidth')!
      const paddings = theme('padding')!
      const padding2 = paddings['2']!
      const tocStyles: Record<string, Record<string, string>> = {}
      sizes.forEach((size) => {
        const sizeValue = maxWidths[size]
        /*
         * The width is 50% of viewport width - (the size of the article content / 2)
         */
        if (sizeValue) {
          tocStyles[`.w-toc-${size}`] = {
            width: `calc(50vw - (${sizeValue} / 2))`,
            transform: `translateX(calc(100% + ${padding2})) translateY(1rem)`,
          }
        }
      })
      addUtilities(tocStyles)
    }),
  ],
} satisfies Config
