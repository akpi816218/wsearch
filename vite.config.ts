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
			/**
				manifest: {
					name: 'Material Calculator',
					short_name: 'Material Calculator',
					start_url: '/',
					display: 'standalone',
					background_color: '#262626',
					lang: 'en',
					scope: '/',
					description: 'A simple calculator based on Material Design',
					icons: [
						{
							src: '/apple-touch-icon-180x180.png',
							sizes: '180x180',
							type: 'image/png'
						},
						{ src: '/favicon.ico', sizes: '48x48', type: 'image/png' },
						{
							src: '/maskable-icon-512x512.png',
							sizes: '512x512',
							type: 'image/png',
							purpose: 'maskable'
						},
						{ src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
						{ src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
						{ src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' }
					],
					screenshots: [
						{
							src: '/screenshot-narrow.png',
							sizes: '412x915',
							form_factor: 'narrow',
							type: 'image/png'
						},
						{
							src: '/screenshot-wide.png',
							sizes: '1024x768',
							form_factor: 'wide',
							type: 'image/png'
						}
					],
					theme_color: '#a78bfa',
					orientation: 'portrait',
					categories: ['finance', 'productivity', 'utilities']
				}
			*/
		})
	],
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
