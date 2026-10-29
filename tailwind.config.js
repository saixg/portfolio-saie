/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // Framer's breakpoints: phone < 810 ≤ tablet < 1200 ≤ desktop
    screens: {
      sm: '520px',
      md: '810px',
      lg: '1100px',
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Roboto', 'sans-serif'],
        script: ['"Gochi Hand"', 'cursive'],
      },
      colors: {
        bg: '#111112',
        surface: '#1F1F1F',
        raised: '#2B2B2B',
        accent: '#EA0044',
        ink: {
          DEFAULT: '#FAFAFA',
          50: '#F7F7F7',
          100: '#F0F0F0',
          200: '#DEDEDE',
          400: '#B8B8B8',
          500: '#828282',
          600: '#545454',
        },
      },
      maxWidth: { shell: '1080px' },
    },
  },
  plugins: [],
};
