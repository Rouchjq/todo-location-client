'use client';
// main tools

// components
import { TodoContextProvider } from '@/context/todo/provider';
import { Skeleton } from '@/components/atoms/skeleton';
import { Header } from '@/components/molecules/header';
import { Navbar } from '@/components/molecules/navbar';
import { Map } from '@/components/organisms/Map';

// hooks
import { useMap } from '@/hooks/use-map';

export default function HomePage() {
	const { isLoaded } = useMap();

	return (
		<TodoContextProvider>
			<Header />
			<main className='h-max flex justify-center'>
				{isLoaded ? <Map /> : <Skeleton className='w-full h-[70vh]' />}
			</main>
			<Navbar />
		</TodoContextProvider>
	);
}
