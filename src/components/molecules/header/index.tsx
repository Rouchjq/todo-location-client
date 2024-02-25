// components
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/atoms/popover';
import { Typography } from '@/components/atoms/typography';
import { Skeleton } from '@/components/atoms/skeleton';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { ToggleTheme } from '../toggle-theme';
import { Label } from '@/components/label';

// utils
import { cn } from '@/lib/utils';

// styles
import classes from './styles.module.css';
import {
	Bicycle,
	BusFrontFill,
	CarFrontFill,
	PersonWalking,
} from 'react-bootstrap-icons';

// types
import { DirectionsValueDataType } from '@/types/models/map/direction';
import { FC, FormEvent, MutableRefObject, use, useEffect } from 'react';
import { SetStateType } from '@/types';
import { travelModeEnums } from '@/commons/enums';
import { useLocation } from '@/hooks/use-location';

type HeaderProps = {
	isLoaded: boolean;
	directionsValue: DirectionsValueDataType;
	originRef: MutableRefObject<HTMLInputElement | null>;
	destinationRef: MutableRefObject<HTMLInputElement | null>;
	setDirectionsValue: SetStateType<DirectionsValueDataType>;
};

export const Header: FC<HeaderProps> = ({
	isLoaded,
	originRef,
	destinationRef,
	directionsValue,
	setDirectionsValue,
}) => {
	const { location } = useLocation();
	const handleTravelMode = (mode: string) =>
		setDirectionsValue((prev) => ({ ...prev, travelMode: mode }));

	const handleSubmitDirections = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setDirectionsValue((prev) => ({
			...prev,
			origin: originRef.current?.value || '',
			destination: destinationRef.current?.value || '',
		}));
	};

	const handleMyLocation = () => {
		if (location && originRef && originRef.current) {
			originRef.current.value = `${location.lat}, ${location.lng}`;
		}
	};

	return (
		<div className={cn('bg-background text-foreground', classes.container)}>
			<div>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant='outline' className='text-foreground'>
							Travel settings{' '}
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-80'>
						<div className='grid gap-4'>
							<div className='space-y-2'>
								<p className='text-xs text-muted-foreground'>
									Set the options for your travel
								</p>
							</div>

							<form onSubmit={handleSubmitDirections} className='grid gap-2'>
								<div className='grid grid-cols-3 items-center gap-4'>
									<Label htmlFor='origin'>Origin</Label>
									<Input id='origin' ref={originRef} className='col-span-2 h-8' />
								</div>
								<div className='grid grid-cols-3 items-center gap-4'>
									<Label htmlFor='destiny'>Destiny</Label>
									<Input id='destiny' ref={destinationRef} className='col-span-2 h-8' />
								</div>
								{isLoaded ? (
									<div className='flex justify-evenly '>
										<Button
											size='icon'
											onClick={() => handleTravelMode(google.maps.TravelMode.DRIVING)}
											variant={
												directionsValue.travelMode === travelModeEnums.DRIVING
													? 'default'
													: 'outline'
											}
										>
											<CarFrontFill className='text-foreground' />
										</Button>
										<Button
											size='icon'
											className='text-foreground'
											onClick={() => handleTravelMode(google.maps.TravelMode.BICYCLING)}
											variant={
												directionsValue.travelMode === travelModeEnums.BICYCLING
													? 'default'
													: 'outline'
											}
										>
											<Bicycle />
										</Button>
										<Button
											size='icon'
											className='text-foreground'
											onClick={() => handleTravelMode(google.maps.TravelMode.TRANSIT)}
											variant={
												directionsValue.travelMode === travelModeEnums.TRANSIT
													? 'default'
													: 'outline'
											}
										>
											<BusFrontFill />
										</Button>
										<Button
											size='icon'
											className='text-foreground'
											onClick={() => handleTravelMode(google.maps.TravelMode.WALKING)}
											variant={
												directionsValue.travelMode === travelModeEnums.WALKING
													? 'default'
													: 'outline'
											}
										>
											<PersonWalking />
										</Button>
									</div>
								) : (
									<div className='flex justify-evenly'>
										{[...Array(4)].map((_, i) => (
											<Skeleton key={i} className='h-10 w-10' />
										))}
									</div>
								)}
								<div className='flex justify-between mt-3'>
									<Button
										variant='outline'
										onClick={handleMyLocation}
										className='text-foreground'
									>
										My location
									</Button>
									<Button variant='outline' className='text-foreground '>
										Go
									</Button>
								</div>
							</form>
						</div>
					</PopoverContent>
				</Popover>
			</div>

			<div className='flex gap-5 items-center'>
				<Typography className='text-foreground'>Theme</Typography>
				<ToggleTheme />
			</div>
		</div>
	);
};
