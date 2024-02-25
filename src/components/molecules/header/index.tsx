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

// commons
import { travelModeEnums } from '@/commons/enums';

// utils
import { cn } from '@/lib/utils';

// hooks
import { useLocation } from '@/hooks/use-location';
import { useMap } from '@/hooks/use-map';

// icons
import {
	Bicycle,
	BusFrontFill,
	CarFrontFill,
	PersonWalking,
} from 'react-bootstrap-icons';

// styles
import classes from './styles.module.css';

// types
import { FC, FormEvent, ChangeEvent } from 'react';

type HeaderProps = {};

export const Header: FC<HeaderProps> = ({}) => {
	const { location } = useLocation();
	const {
		isLoaded,
		fromToAddress,
		directionsValue,
		setFromToAddress,
		setDirectionsValue,
	} = useMap();

	const handleTravelMode = (mode: string) =>
		setDirectionsValue((prev) => ({ ...prev, travelMode: mode }));

	const handleSubmitDirections = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setDirectionsValue((prev) => ({
			...prev,
			origin: fromToAddress.origin,
			destination: fromToAddress.destination,
		}));
	};

	const handleChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFromToAddress((prev) => ({ ...prev, [name]: value }));
	};

	const handleMyLocation = () => {
		if (location) {
			setFromToAddress((prev) => ({
				...prev,
				origin: `${location.lat}, ${location.lng}`,
			}));
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
									<Input
										id='origin'
										name='origin'
										className='col-span-2 h-8'
										value={fromToAddress.origin}
										onChange={handleChangeAddress}
									/>
								</div>
								<div className='grid grid-cols-3 items-center gap-4'>
									<Label htmlFor='destination'>Destiny</Label>
									<Input
										id='destination'
										name='destination'
										className='col-span-2 h-8'
										onChange={handleChangeAddress}
										value={fromToAddress.destination}
									/>
								</div>
								{isLoaded ? (
									<div className='flex justify-evenly '>
										<Button
											size='icon'
											onClick={() => handleTravelMode(google.maps.TravelMode.DRIVING)}
											variant={
												directionsValue.travelMode === travelModeEnums.DRIVING
													? 'ghost'
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
													? 'ghost'
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
													? 'ghost'
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
													? 'ghost'
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
