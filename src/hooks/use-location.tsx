import { useEffect, useState } from 'react';

export const useLocation = () => {
	const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
		null,
	);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const handleGeolocation = () => {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setLocation({ lat: latitude, lng: longitude });
				},
				(error) => setError(error.message),
			);
		};

		handleGeolocation();
	}, []);

	return { location, error };
};
