const WEATHER_CODE_MAP = {
    0: { condition: 'Clear Sky', icon: '☀️', hint: 'Perfect for a walking tour!' },
    1: { condition: 'Mainly Clear', icon: '🌤️', hint: 'Great day for outdoor activities!' },
    2: { condition: 'Partly Cloudy', icon: '⛅', hint: 'Good for outdoor photos.' },
    3: { condition: 'Overcast', icon: '☁️', hint: 'Comfortable for sightseeing.' },
    45: { condition: 'Foggy', icon: '🌫️', hint: 'Limited visibility - indoor activities recommended.' },
    48: { condition: 'Foggy', icon: '🌫️', hint: 'Limited visibility - indoor activities recommended.' },
    51: { condition: 'Light Drizzle', icon: '🌦️', hint: 'Bring an umbrella for outdoor stops.' },
    53: { condition: 'Moderate Drizzle', icon: '🌦️', hint: 'Bring an umbrella for outdoor stops.' },
    55: { condition: 'Dense Drizzle', icon: '🌧️', hint: 'Consider indoor activities.' },
    61: { condition: 'Slight Rain', icon: '🌧️', hint: 'Pack a raincoat!' },
    63: { condition: 'Moderate Rain', icon: '🌧️', hint: 'Indoor activities recommended.' },
    65: { condition: 'Heavy Rain', icon: '⛈️', hint: 'Stay indoors - museums and cafes!' },
    71: { condition: 'Slight Snow', icon: '🌨️', hint: 'Bundle up! Check for road closures.' },
    73: { condition: 'Moderate Snow', icon: '❄️', hint: 'Winter activities or stay warm indoors.' },
    75: { condition: 'Heavy Snow', icon: '❄️', hint: 'Travel may be difficult - stay safe!' },
    77: { condition: 'Snow Grains', icon: '🌨️', hint: 'Cold weather - dress warmly!' },
    80: { condition: 'Slight Rain Showers', icon: '🌦️', hint: 'Intermittent rain - bring umbrella.' },
    81: { condition: 'Moderate Rain Showers', icon: '🌧️', hint: 'Plan for indoor breaks.' },
    82: { condition: 'Violent Rain Showers', icon: '⛈️', hint: 'Heavy rain - indoor activities best.' },
    85: { condition: 'Slight Snow Showers', icon: '🌨️', hint: 'Light snow - dress warmly!' },
    86: { condition: 'Heavy Snow Showers', icon: '❄️', hint: 'Significant snow - check conditions.' },
    95: { condition: 'Thunderstorm', icon: '⛈️', hint: 'Move indoor activities to today!' },
    96: { condition: 'Thunderstorm with Hail', icon: '⛈️', hint: 'Severe weather - stay indoors!' },
    99: { condition: 'Thunderstorm with Hail', icon: '⛈️', hint: 'Severe weather - stay indoors!' },
};

export const getWeatherForecast = async (lat, lon, startDate, endDate) => {
    try {
        const start = new Date(startDate).toISOString().split('T')[0];
        const end = new Date(endDate).toISOString().split('T')[0];

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max&timezone=auto&start_date=${start}&end_date=${end}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather fetch failed');

        const data = await response.json();

        return data.daily.time.map((date, index) => ({
            date,
            weatherCode: data.daily.weather_code[index],
            tempMax: Math.round(data.daily.temperature_2m_max[index]),
            tempMin: Math.round(data.daily.temperature_2m_min[index]),
            precipitationProb: data.daily.precipitation_probability_max[index],
            precipitation: data.daily.precipitation_sum[index],
            windSpeed: data.daily.wind_speed_10m_max[index],
            ...WEATHER_CODE_MAP[data.daily.weather_code[index]] || WEATHER_CODE_MAP[0],
        }));
    } catch (error) {
        return null;
    }
};

export const findBestWeatherDay = (weatherData) => {
    if (!weatherData || weatherData.length === 0) return null;

    let bestDayIndex = 0;
    let bestScore = -1;

    weatherData.forEach((day, index) => {
        const tempScore = day.tempMax >= 18 && day.tempMax <= 25 ? 30 : 0;
        const rainScore = 20 - (day.precipitationProb || 0) / 5;
        const windScore = day.windSpeed < 20 ? 10 : 0;
        const clearScore = day.weatherCode === 0 || day.weatherCode === 1 ? 20 : 0;

        const totalScore = tempScore + rainScore + windScore + clearScore;

        if (totalScore > bestScore) {
            bestScore = totalScore;
            bestDayIndex = index;
        }
    });

    return {
        index: bestDayIndex,
        date: weatherData[bestDayIndex].date,
        hint: "This is your best day for outdoor activities!",
        ...weatherData[bestDayIndex],
    };
};

export const getWeatherIcon = (weatherCode) => {
    return WEATHER_CODE_MAP[weatherCode]?.icon || '🌤️';
};

export const getWeatherHint = (weatherCode) => {
    return WEATHER_CODE_MAP[weatherCode]?.hint || 'Check local weather conditions.';
};
