'use client';

// main tools
import {
	Marker,
	GoogleMap,
	DirectionsService,
	DirectionsRenderer,
} from '@react-google-maps/api';
import { useCallback, useEffect, useMemo, useState } from 'react';

// utils
import { centerMap, getLatLng } from './utils';

// hooks
import { useWindowSize } from '@/hooks/use-window-size';
import { useTodo } from '@/hooks/use-todo';

// types
import { DirectionsValueDataType } from '@/types/models/map/direction';
import { FC } from 'react';

type MapProps = {
	directionsValue: DirectionsValueDataType;
};

export const Map: FC<MapProps> = ({ directionsValue }) => {
	const { todoState } = useTodo();
	const { screenWidth } = useWindowSize();
	const [marks, setMarks] = useState<
		{ id: string; coords: google.maps.LatLngLiteral | null }[]
	>([]);
	const [response, setResponse] = useState<google.maps.DirectionsResult | null>(
		null,
	);
	const directionsServiceOptions = useMemo<google.maps.DirectionsRequest>(
		() => ({
			origin: directionsValue.origin,
			destination: directionsValue.destination,
			travelMode: directionsValue.travelMode as google.maps.TravelMode,
		}),
		[
			directionsValue.origin,
			directionsValue.destination,
			directionsValue.travelMode,
		],
	);

	const directionsResult = useMemo(() => ({ directions: response }), [response]);

	const directionsCallback = useCallback(
		(
			result: google.maps.DirectionsResult | null,
			status: google.maps.DirectionsStatus,
		) => {
			console.log(result);
			console.log(status);
			if (result !== null) {
				if (status === 'OK') {
					setResponse(result);
				} else {
					console.log('response: ', result);
					// TODO: handle error with a toast
				}
			}
		},
		[],
	);

	const setInfoWindow = (marker: google.maps.Marker) => {
		const infoWinfow = new google.maps.InfoWindow({
			content: `
			<div onClick={console.log('jjjj')}>
			<h4>${'ola como vas'}</h4>
			<p>${'hace tiempo no c de ti'}</p>
			</div>
		  `,
		});
		marker.addListener('click', () =>
			infoWinfow.open({ map: marker.getMap(), anchor: marker }),
		);
	};

	useEffect(() => {
		if (todoState) {
			const promises = todoState.map(async (task) => {
				const id = task.id;
				try {
					const coords = await getLatLng(task.address);
					return { id, coords };
				} catch (error) {
					console.error(error); // Manejar el error específico de la tarea
					return { id, coords: null }; // Opcional: mantener la estructura del objeto
				}
			});

			Promise.all(promises)
				.then((mk) => setMarks(mk))
				.catch((error) => console.error(error)); // Manejar errores generales
		}
	}, [todoState]);

	return (
		<div>
			<GoogleMap
				zoom={11}
				id='todo-map'
				center={centerMap.mi}
				options={{
					controlSize: 24,
					zoomControl: true,
					disableDefaultUI: true,
				}}
				// clickableIcons={false}
				mapContainerStyle={{
					width: '100vw',
					height: screenWidth < 768 ? '69vh' : '80vh',
				}}
			>
				{directionsValue.destination !== '' && directionsValue.origin !== '' && (
					<DirectionsService
						callback={directionsCallback}
						options={directionsServiceOptions}
					/>
				)}

				{directionsResult.directions && (
					<DirectionsRenderer options={directionsResult} />
				)}

				{marks.map((mark) => {
					if (mark.coords === null) return null;
					return (
						<Marker
							key={mark.id}
							position={mark.coords}
							onLoad={setInfoWindow}
							icon={{
								url: '/assets/job.png',
								origin: new google.maps.Point(0, 0),
								anchor: new google.maps.Point(20, 20),
								scaledSize: new google.maps.Size(40, 40),
							}}
						/>
					);
				})}
			</GoogleMap>
		</div>
	);
};
