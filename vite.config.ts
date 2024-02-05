import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { VitePWA } from 'vite-plugin-pwa';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			manifest: {
				id: 'app.vercel.ws-s',
				name: 'Wordsearch Solver',
				short_name: 'Wordsearch Solver',
				start_url: '/',
				display: 'standalone',
				display_override: ['window-controls-overlay'],
				background_color: '#000',
				lang: 'en',
				scope: '/',
				description: 'A brute-force wordsearch solver',
				screenshots: [
					{
						src: '/screenshot-narrow-light.png',
						sizes: '412x915',
						form_factor: 'narrow',
						type: 'image/png'
					},
					{
						src: '/screenshot-narrow-dark.png',
						sizes: '412x915',
						form_factor: 'narrow',
						type: 'image/png'
					},
					{
						src: '/screenshot-wide-dark.png',
						sizes: '1024x768',
						form_factor: 'wide',
						type: 'image/png'
					},
					{
						src: '/screenshot-wide-light.png',
						sizes: '1024x768',
						form_factor: 'wide',
						type: 'image/png'
					}
				],
				theme_color: '#272727',
				orientation: 'natural',
				categories: ['utilities']
			}
		})
	],
	base: '/wsearch/',
	root: 'src',
	appType: 'spa',
	build: {
		outDir: '../dist',
		emptyOutDir: true
	},
	resolve: {
		alias: {
			'@': resolve(join(__dirname, 'src'))
		}
	},
	publicDir: 'public'
});
