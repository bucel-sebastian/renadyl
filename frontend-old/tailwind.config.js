/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        backgroundPrimary: "var(--background-primary)",
        backgroundSecondary: "var(--background-secondary)",
        foregroundPrimary: "var(--foreground-primary)",
        foregroundSecondary: "var(--foreground-secondary)",
        accentPrimary: "var(--accent-primary)",
        accentSecondary: "var(--accent-secondary)",
        accentThird: "var(--accent-third)",
        accentFourth: "var(--accent-fourth)",
        optionaltPrimary: "var(--optional-primary)",
      },
    },
  },
  plugins: [],
}
