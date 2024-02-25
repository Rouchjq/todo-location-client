export const centerMap = {
	ny: {
		lat: 40.7128,
		lng: -74.006,
	},
	mi: {
		lat: 25.7739964,
		lng: -80.2412858,
	},
};

export const getLatLng = async (address: string) => {
	const geocoder = new google.maps.Geocoder();
	const response = await geocoder.geocode({ address });

	if (response.results.length > 0)
		return {
			lat: response.results[0].geometry.location.lat(),
			lng: response.results[0].geometry.location.lng(),
		};

	throw new Error('Dirección no válida');
	//TODO: handle error with a toast
};

// const center: google.maps.LatLngLiteral = {
// 	lat: 40.7128,
// 	lng: -74.006,
// };

// const [directionsFormValue, setDirectionsFormValue] = useState({
//     origin: '1670-1702 Springfield Ave, Maplewood, NJ 07040, EE. UU.',
//     destination: '53 County Rd 653, Secaucus, NJ 07094, EE. UU.',
//     travelMode: google.maps.TravelMode.DRIVING,
// });
