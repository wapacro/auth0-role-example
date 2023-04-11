import FormsPlugin from '@tailwindcss/forms'

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
		FormsPlugin
	],
};

