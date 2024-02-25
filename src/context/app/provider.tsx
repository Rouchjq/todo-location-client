'use client';

// main tools
import { useMemo } from 'react';

// components
import { AppContext } from './context';

// types
import { FC, ReactNode } from 'react';

type AppContextProviderProps = {
	children: ReactNode;
};

export const AppContextProviders: FC<AppContextProviderProps> = ({
	children,
}) => {
	const context = useMemo(() => ({}), []);

	return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
