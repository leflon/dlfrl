import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		fontFamily: {
			'title': ['"Jua"', 'sans-serif'],
			'body': ['"Noto Sans KR"', 'sans-serif'],
			'input': ['"Nanum JungHagSaeng"', 'sans-serif'],
		},
		extend: {
			colors: {
				background: 'var(--background)',
				background50: 'var(--background50)',
				foreground: 'var(--foreground)',
			},
		},
	},
	plugins: [],
};
export default config;
