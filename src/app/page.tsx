'use client';
// main tools
import { useState } from 'react';

// components
import { TodoContextProvider } from '@/context/todo/provider';
import { Header } from '@/components/molecules/header';

// hooks
import { Todo } from '@/components/organisms/todo';

export default function HomePage() {
	return (
		<TodoContextProvider>
			<Header />
			<main className='h-full px-5 md:h-[90vh]'>
				<Todo />
			</main>
		</TodoContextProvider>
	);
}
