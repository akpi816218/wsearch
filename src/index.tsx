import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(<App />);

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const systemThemeDark = mediaQuery.matches;

if (systemThemeDark) document.documentElement.classList.add('dark');
else document.documentElement.classList.remove('dark');

mediaQuery.addEventListener('change', event => {
	if (event.matches) document.documentElement.classList.add('dark');
	else document.documentElement.classList.remove('dark');
});
