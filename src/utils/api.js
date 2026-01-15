const GEODB_API_KEY = import.meta.env.VITE_GEODB_API_KEY || '';
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || '';

const getFromCache = (key) => {
    try {
        const cached = localStorage.getItem(`api_cache_${key}`);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            const age = Date.now() - timestamp;
            if (age < 24 * 60 * 60 * 1000) {
                return data;
            }
        }
    } catch (error) {
    }
    return null;
};

const setToCache = (key, data) => {
    try {
        localStorage.setItem(
            `api_cache_${key}`,
            JSON.stringify({
                data,
                timestamp: Date.now(),
            })
        );
    } catch (error) {
    }
};

export const searchCities = async (query) => {
    if (!query || query.length < 2) return [];

    const cacheKey = `cities_${query}`;
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    try {
        const response = await fetch(
            `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=10`,
            {
                headers: {
                    'X-RapidAPI-Key': GEODB_API_KEY,
                    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
                },
            }
        );

        if (!response.ok) throw new Error('API request failed');

        const result = await response.json();
        const cities = result.data.map((city) => ({
            id: city.id,
            name: city.name,
            country: city.country,
            lat: city.latitude,
            lon: city.longitude,
        }));

        setToCache(cacheKey, cities);
        return cities;
    } catch (error) {
        return [];
    }
};

export const getDestinationImage = async (destination) => {
    const cacheKey = `image_${destination}`;
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    try {
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${destination}&per_page=1&orientation=landscape`,
            {
                headers: {
                    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
                },
            }
        );

        if (!response.ok) throw new Error('Image fetch failed');

        const result = await response.json();
        const imageUrl = result.results[0]?.urls?.regular || getFallbackImage(destination);

        setToCache(cacheKey, imageUrl);
        return imageUrl;
    } catch (error) {
        return getFallbackImage(destination);
    }
};

const getFallbackImage = (destination) => {
    const hash = destination.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = ['3b82f6', '8b5cf6', 'ec4899', 'f59e0b', '10b981', '06b6d4'];
    const color = colors[hash % colors.length];
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(destination)}&size=800&background=${color}&color=fff&bold=true&font-size=0.4`;
};

export const getAttractions = async (destination) => {
    const cacheKey = `attractions_${destination}`;
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    const mockAttractions = [
        { name: 'City Center', category: 'culture', rating: 4.5 },
        { name: 'Historic District', category: 'culture', rating: 4.7 },
        { name: 'Local Museum', category: 'culture', rating: 4.3 },
        { name: 'Main Square', category: 'landmark', rating: 4.6 },
        { name: 'Popular Restaurant Area', category: 'food', rating: 4.4 },
    ];

    setToCache(cacheKey, mockAttractions);
    return mockAttractions;
};
