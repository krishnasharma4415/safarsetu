const OPENTRIPMAP_API_KEY = import.meta.env.VITE_OPENTRIPMAP_API_KEY || '';

export const getAttractionsByLocation = async (lat, lon, radius = 5000) => {
    if (!OPENTRIPMAP_API_KEY) return [];

    try {
        const url = `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${lon}&lat=${lat}&kinds=interesting_places,tourist_facilities,cultural,museums,theatres,architecture&limit=20&apikey=${OPENTRIPMAP_API_KEY}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('OpenTripMap request failed');

        const data = await response.json();

        return data.features.map(feature => ({
            id: feature.properties.xid,
            name: feature.properties.name || 'Unnamed Attraction',
            kinds: feature.properties.kinds,
            lat: feature.geometry.coordinates[1],
            lon: feature.geometry.coordinates[0],
        })).filter(attraction => attraction.name !== 'Unnamed Attraction');
    } catch (error) {
        return [];
    }
};

export const getAttractionDetails = async (xid) => {
    if (!OPENTRIPMAP_API_KEY) return null;

    try {
        const url = `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${OPENTRIPMAP_API_KEY}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Attraction details fetch failed');

        const data = await response.json();

        return {
            name: data.name,
            description: data.wikipedia_extracts?.text || data.info?.descr || 'No description available',
            image: data.preview?.source || data.image || null,
            address: data.address?.road || data.address?.city || '',
            lat: data.point?.lat,
            lon: data.point?.lon,
            kinds: data.kinds,
            wikipedia: data.wikipedia,
        };
    } catch (error) {
        return null;
    }
};
