/** @type {import('tailwindcss').Config} */
export default {
	mode: 'jit',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/forms"),
        require("tailwindcss-animate")
	],
}
