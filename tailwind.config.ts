// tailwind.config.ts
export default {
    content: [
      './src/**/*.{js,ts,jsx,tsx}',
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: 'rgb(0 109 119)',
          'primary-light': 'rgb(131 197 190)',
          secondary: 'rgb(69 123 157)',
          accent: 'rgb(42 157 143)',
          page: 'rgb(248 249 250)',
          'page-light': 'rgb(255 255 255)',
          gray: {
            200: 'rgb(229 231 235)',
            800: 'rgb(31 41 55)',
          },
        },
        textColor: {
          primary: 'rgb(0 109 119)',
          'primary-light': 'rgb(131 197 190)',
          secondary: 'rgb(69 123 157)',
          accent: 'rgb(42 157 143)',
        },
        backgroundColor: {
          primary: 'rgb(0 109 119)',
          'primary-light': 'rgb(131 197 190)',
          secondary: 'rgb(69 123 157)',
          accent: 'rgb(42 157 143)',
          page: 'rgb(248 249 250)',
          'page-light': 'rgb(255 255 255)',
        },
        fontFamily: {
          sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
          // Add other font families if needed
        },
        borderRadius: {
          'xs': '0.125rem',
          'sm': '0.25rem',
          DEFAULT: '0.375rem',
          'md': '0.5rem',
          'lg': '0.75rem',
          'xl': '1rem',
        },
        boxShadow: {
          'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
      },
    },
    plugins: [],
  }