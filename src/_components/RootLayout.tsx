import '@/_styles/main.out.css';
import { Providers } from '@/_components/Providers';
import { ReactNode, StrictMode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<StrictMode>
			<Providers>{children}</Providers>
		</StrictMode>
	);
}
