import { generateImages } from 'pwa-asset-generator';

await generateImages('src/base_icon.svg', 'dist', {
	background: '#434343',
	darkMode: true,
	favicon: true,
	maskable: true,
	iconOnly: true,
	index: 'dist/index.html',
	manifest: 'dist/manifest.webmanifest',
	mstile: true,
	padding: '20%',
	scrape: true,
	type: 'png'
});
