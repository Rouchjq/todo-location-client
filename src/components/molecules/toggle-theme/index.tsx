'use client';

// main tools
import { useTheme } from 'next-themes';

// components
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu';
import { Button } from '@/components/atoms/button';

// icons
import { MoonIcon, SunIcon, ListBulletIcon } from '@radix-ui/react-icons';

// type
import { FC } from 'react';

export const ToggleTheme: FC = () => {
	const { setTheme } = useTheme();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='icon'>
					<SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground' />
					<MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
