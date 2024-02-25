'use client';
// main tools
import { useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';

// components
import { TodoContextProvider } from '@/context/todo/provider';
import { Skeleton } from '@/components/atoms/skeleton';
import { Header } from '@/components/molecules/header';
import { Navbar } from '@/components/molecules/navbar';
import { Map } from '@/components/organisms/Map';

// types
import { DirectionsValueDataType } from '@/types/models/map/direction';

export default function HomePage() {
	const originRef = useRef<HTMLInputElement | null>(null);
	const destinationRef = useRef<HTMLInputElement | null>(null);

	const [directionsValue, setDirectionsValue] =
		useState<DirectionsValueDataType>({
			origin: '',
			destination: '',
			travelMode: '',
		});

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
	});

	useEffect(() => {
		if (isLoaded)
			setDirectionsValue((prev) => ({
				...prev,
				travelMode: google.maps.TravelMode.DRIVING,
			}));
	}, [isLoaded]);

	return (
		<TodoContextProvider>
			<Header
				isLoaded={isLoaded}
				originRef={originRef}
				destinationRef={destinationRef}
				directionsValue={directionsValue}
				setDirectionsValue={setDirectionsValue}
			/>
			<main className='h-[80vh]'>
				{isLoaded ? (
					<Map directionsValue={directionsValue} />
				) : (
					<Skeleton className='w-full h-[80vh]' />
				)}
			</main>
			<Navbar />
		</TodoContextProvider>
	);
}
