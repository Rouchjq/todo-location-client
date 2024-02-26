'use client';

// main tools
import {
	Marker,
	GoogleMap,
	DirectionsService,
	DirectionsRenderer,
} from '@react-google-maps/api';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

// utils
import { centerMap, getLatLng } from './utils';

// hooks
import { useWindowSize } from '@/hooks/use-window-size';
import { useLocation } from '@/hooks/use-location';
import { useTodo } from '@/hooks/use-todo';
import { useMap } from '@/hooks/use-map';

// types
import { TaskDataType } from '@/types/models/task';
import { FC } from 'react';
import { Typography } from '@/components/atoms/typography';

interface MarkDataType extends TaskDataType {
	coords: google.maps.LatLngLiteral | null;
}

type MapProps = {};

export const Map: FC<MapProps> = ({}) => {
	const { todoState } = useTodo();
	const { directionsValue } = useMap();
	const { screenWidth } = useWindowSize();
	const { location, error } = useLocation();
	const [marks, setMarks] = useState<MarkDataType[]>([]);
	const [center, setcenter] = useState<google.maps.LatLngLiteral>();

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
					toast.error(`Error fetching directions ${status}`);
				}
			}
		},
		[],
	);

	const infoTemplate = (taskInfo: MarkDataType) => {
		return (
			<div>
				<Typography Tag='h4' color='foreground' weight='bold'>
					{taskInfo.title}
				</Typography>
				<p>{taskInfo.description}</p>
			</div>
		);
	};

	const setInfoWindow = (marker: google.maps.Marker, taskInfo: MarkDataType) => {
		const infoWinfow = new google.maps.InfoWindow({
			content: ` 
			<div>
				<h3>
				<b>
				${taskInfo.title}
				
				</b>
				</h3>
				<br/>
				<p>${taskInfo.address}</p>
			</div>

			`,
		});
		marker.addListener('click', () =>
			infoWinfow.open({ map: marker.getMap(), anchor: marker }),
		);
	};

	useEffect(() => {
		if (location) {
			setcenter(location);
		} else {
			setcenter(centerMap.mi);
		}
	}, [location]);

	useEffect(() => {
		if (todoState) {
			const ListAddressUpdated = todoState.map((task) => ({
				...task,
				address: `${task.address}, Miami, FL, USA`,
			}));

			const promises = ListAddressUpdated?.map(async (task) => {
				try {
					const coords = await getLatLng(task.address);
					return { ...task, coords };
				} catch (error) {
					console.error(error); // Manejar el error específico de la tarea
					return { ...task, coords: null }; // Opcional: mantener la estructura del objeto
				}
			});

			Promise.all(promises)
				.then((mk) => {
					console.log('mk', mk);
					setMarks(mk);
				})
				.catch((error) => console.error(error)); // Manejar errores generales
		}
	}, [todoState]);

	return (
		<div>
			<GoogleMap
				zoom={11}
				id='todo-map'
				center={center}
				options={{
					controlSize: 24,
					zoomControl: true,
					disableDefaultUI: true,
				}}
				mapContainerStyle={{
					width: '90vw',
					height: screenWidth < 768 ? '66.5vh' : '80vh',
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
							onLoad={(ev) => setInfoWindow(ev, mark)}
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
