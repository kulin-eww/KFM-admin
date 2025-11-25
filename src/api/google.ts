export const fetchGooglePlacesSuggestions = async (input) => {
  const url = `https://places.googleapis.com/v1/places:autocomplete?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input }),
  });
  if (!response.ok) {
    console.error("Autocomplete error:", await response.text());
    return;
  }
  const data = await response.json();
  return data?.suggestions || [];
};

export const fetchGooglePlacesDetails = async (placeId) => {
  const url = `https://places.googleapis.com/v1/places/${placeId}?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&fields=location,formattedAddress`;

  const response = await fetch(url);
  if (!response.ok) {
    console.error("Place Details error:", await response.text());
    return null;
  }

  const data = await response.json();
  return {
    address: data.formattedAddress,
    lat: data.location?.latitude,
    lng: data.location?.longitude,
  };
};

export const fetchGoogleETA = async (payload: {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
}) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${payload.origin.lat},${payload.origin.lng}&destinations=${payload.destination.lat},${payload.destination.lng}&mode=driving&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();

    if (data.status === "OK") {
      const element = data?.rows[0]?.elements[0];
      if (element?.status === "OK") {
        return element?.duration?.text;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
};
