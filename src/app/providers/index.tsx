// providers
import { AppContextProviders } from '@/context/app/provider';
import { ThemeProvider } from './theme';

// types
import { FC, ReactNode } from 'react';

type ProvidersProps = {
	children: ReactNode;
};

export const Providers: FC<ProvidersProps> = ({ children }) => {
	return (
		<ThemeProvider
			enableSystem
			attribute='class'
			defaultTheme='system'
			disableTransitionOnChange
		>
			<AppContextProviders>{children}</AppContextProviders>
		</ThemeProvider>
	);
};
