import { SetStateType } from '@/types';
import { DirectionsValueDataType } from '@/types/models/map/direction';
import { createContext } from 'react';

type MapContextType = {
	isLoaded: boolean;
	directionsValue: DirectionsValueDataType;
	setDirectionsValue: SetStateType<DirectionsValueDataType>;
	fromToAddress: {
		origin: string;
		destination: string;
	};
	setFromToAddress: SetStateType<{
		origin: string;
		destination: string;
	}>;
};

export const MapContext = createContext<MapContextType>({
	isLoaded: false,
	setFromToAddress: () => {},
	setDirectionsValue: () => {},
	directionsValue: {
		origin: '',
		travelMode: '',
		destination: '',
	},
	fromToAddress: {
		origin: '',
		destination: '',
	},
});
