import { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

export const config: Config = {
	content: [
		'src/**/*.{html,tsx}',
		'node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
	],
	darkMode: 'class',
	theme: {
		extend: {
			animation: {
				'bounce-fast': 'bounce 0.5s infinite'
			},
			borderRadius: {
				huge: '2rem',
				giga: '3rem'
			},
			colors: {
				1: '#fff',
				2: '#c0c0c0',
				3: '#312e81',
				4: '#1b579c',
				5: '#000',
				blurple: '#5865f2',
				'dark-blurple': '#454fbf'
			},
			width: {
				'25c': '25em',
				'50c': '50em'
			}
		},
		fontFamily: {
			sans: ['Poppins', 'Ubuntu', 'Inter', 'Roboto', 'sans-serif'],
			mono: ['Ubuntu Mono', 'Roboto Mono', 'monospace'],
			'press-start': ['"Press Start 2P"', 'monospace']
		},
		scale: {
			175: '1.75',
			200: '2',
			250: '2.5'
		}
	},
	plugins: [
		nextui({
			defaultTheme: 'light'
		})
	]
};

export default config;
