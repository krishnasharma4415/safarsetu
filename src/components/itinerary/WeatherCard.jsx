import { Cloud, Droplets, Wind, ThermometerSun } from 'lucide-react';

const WeatherCard = ({ weather, isbestDay = false }) => {
    if (!weather) return null;

    return (
        <div className={`p-4 rounded-xl border-2 ${isbestDay
                ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-400'
                : 'bg-white border-gray-200'
            }`}>
            {isbestDay && (
                <div className="mb-2 flex items-center gap-2 text-yellow-700 font-semibold text-sm">
                    ⭐ Best Weather Day
                </div>
            )}

            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <span className="text-4xl">{weather.icon}</span>
                    <div>
                        <div className="font-bold text-gray-900">{weather.condition}</div>
                        <div className="text-sm text-gray-600">
                            {weather.tempMin}°C - {weather.tempMax}°C
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div className="flex items-center gap-2 text-gray-600">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span>{weather.precipitationProb}% rain</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <Wind className="w-4 h-4 text-gray-500" />
                    <span>{Math.round(weather.windSpeed)} km/h</span>
                </div>
            </div>

            <div className={`text-sm p-2 rounded-lg ${isbestDay ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-50 text-blue-700'
                }`}>
                💡 {weather.hint}
            </div>
        </div>
    );
};

export default WeatherCard;
