import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        gray: {
          'silver-sand': '#C5C5C5',
          light: '#e7e6e6',
          cultured: '#F7F8F9',
          b9: '#B9B9B9',
          aa: '#aaa',
          '88': '#888',
        },
        red: {
          primary: '#D2445A',
          secondary: '#D44C61',
        },
      },
    },
  },
  plugins: [],
}
export default config
