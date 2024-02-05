import { writeFile } from 'fs/promises';
import puppeteer from 'puppeteer';
import { createServer } from 'vite';

// Start the server
const vite = await (await createServer()).listen();

const browser = await puppeteer.launch({
	headless: 'new',
	defaultViewport: {
		width: 412,
		height: 915,
		deviceScaleFactor: 1
	}
});

// Create a new page
const page = await browser.newPage();

// Navigate to the app
await page.goto('http://localhost:5173/');

// Scroll the page
await page.evaluate(() => {
	window.scroll({
		top: window.innerHeight,
		behavior: 'instant'
	});
});

// Set light mode
await page.emulateMediaFeatures([
	{ name: 'prefers-color-scheme', value: 'light' }
]);

// Take a screenshot
await writeFile(
	'dist/screenshot-narrow-light.png',
	await page.screenshot({ type: 'png' })
);

// Set dark mode
await page.emulateMediaFeatures([
	{ name: 'prefers-color-scheme', value: 'dark' }
]);

// Take a screenshot
await writeFile(
	'dist/screenshot-narrow-dark.png',
	await page.screenshot({ type: 'png' })
);

// Resize the viewport
await page.setViewport({
	width: 1024,
	height: 768,
	deviceScaleFactor: 1
});

// Navigate to the app
await page.goto('http://localhost:5173/');

// Set light mode
await page.emulateMediaFeatures([
	{ name: 'prefers-color-scheme', value: 'light' }
]);

// Take a screenshot
await writeFile(
	'dist/screenshot-wide-light.png',
	await page.screenshot({ type: 'png' })
);

// Set dark mode
await page.emulateMediaFeatures([
	{ name: 'prefers-color-scheme', value: 'dark' }
]);

// Take a screenshot
await writeFile(
	'dist/screenshot-wide-dark.png',
	await page.screenshot({ type: 'png' })
);

// Close the page
await page.close();

// Close the browser
await browser.close();

// Kill the server
await vite.close();
