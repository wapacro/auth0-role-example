import FormsPlugin from '@tailwindcss/forms'
import AspectRatioPlugin from '@tailwindcss/aspect-ratio'

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,tsx,vue}',
	],
	theme: {
		extend: {},
	},
	plugins: [
		FormsPlugin,
		AspectRatioPlugin
	],
};

