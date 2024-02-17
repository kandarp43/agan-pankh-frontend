// tailwind.config.js
const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	safelist: [
		'bg-danger-500',
		'bg-success-500',
		'bg-yellow-500',
		'border-danger-500',
		'border-success-500',
		'border-yellow-500',
		'text-white',
		'text-black',
	],
	theme: {
		extend: {},
	},
	darkMode: 'class',
	plugins: [nextui({})],
}
