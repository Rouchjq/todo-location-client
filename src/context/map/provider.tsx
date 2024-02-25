'use client';

// main tools
import { useEffect, useMemo, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

// components
import { MapContext } from './context';

// types
import { DirectionsValueDataType } from '@/types/models/map/direction';
import { FC, ReactNode } from 'react';

type MapContextProviderProps = {
	children: ReactNode;
};

export const MapContextProvider: FC<MapContextProviderProps> = ({
	children,
}) => {
	const [fromToAddress, setFromToAddress] = useState({
		origin: '',
		destination: '',
	});
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

	const context = useMemo(
		() => ({
			isLoaded,
			fromToAddress,
			directionsValue,
			setFromToAddress,
			setDirectionsValue,
		}),
		[
			isLoaded,
			directionsValue,
			setDirectionsValue,
			fromToAddress,
			setFromToAddress,
		],
	);

	return <MapContext.Provider value={context}>{children}</MapContext.Provider>;
};
