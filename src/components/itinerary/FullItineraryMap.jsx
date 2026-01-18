import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

const createColoredIcon = (color, dayNumber) => {
    return window.L.divIcon({
        className: 'custom-marker',
        html: `
            <div style="
                background: ${color};
                width: 32px;
                height: 32px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                border: 3px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <span style="
                    transform: rotate(45deg);
                    color: white;
                    font-weight: bold;
                    font-size: 12px;
                ">${dayNumber}</span>
            </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });
};

const dayColors = [
    '#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b',
    '#10b981', '#ef4444', '#06b6d4', '#f97316',
];

const FullItineraryMap = ({ itinerary, destination }) => {
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        if (!destination || !window.L) return;

        const mapElement = document.getElementById('full-itinerary-map');
        if (!mapElement) return;

        if (map) {
            map.remove();
        }

        const newMap = window.L.map('full-itinerary-map').setView(
            [destination.lat || destination.latitude || 51.505, destination.lon || destination.longitude || -0.09],
            13
        );

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
        }).addTo(newMap);

        if (itinerary?.days) {
            const allMarkers = [];
            const bounds = [];

            itinerary.days.forEach((day, dayIndex) => {
                const color = dayColors[dayIndex % dayColors.length];

                day.activities.forEach((activity, actIndex) => {
                    const baseLat = destination.lat || destination.latitude || 51.505;
                    const baseLon = destination.lon || destination.longitude || -0.09;
                    const lat = baseLat + (Math.random() - 0.5) * 0.05;
                    const lng = baseLon + (Math.random() - 0.5) * 0.05;

                    const marker = window.L.marker([lat, lng], {
                        icon: createColoredIcon(color, day.day),
                    }).addTo(newMap);

                    marker.bindPopup(`
                        <div style="min-width: 200px; padding: 8px;">
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                <span style="width: 12px; height: 12px; border-radius: 50%; background: ${color};"></span>
                                <span style="font-weight: bold; font-size: 14px;">Day ${day.day}</span>
                            </div>
                            <h4 style="margin: 0 0 4px 0; font-weight: bold; color: #111;">${activity.name}</h4>
                            <p style="margin: 0 0 8px 0; font-size: 13px; color: #666;">${activity.description}</p>
                            <div style="display: flex; gap: 8px; font-size: 12px;">
                                <span style="padding: 4px 8px; background: #e0f2fe; color: #0369a1; border-radius: 12px; font-weight: 500;">
                                    ${activity.time}
                                </span>
                                ${activity.duration ? `<span style="color: #666;">${activity.duration}</span>` : ''}
                            </div>
                        </div>
                    `);

                    allMarkers.push({ marker, position: [lat, lng] });
                    bounds.push([lat, lng]);
                });
            });

            if (bounds.length > 1) {
                const polylinePoints = bounds;
                window.L.polyline(polylinePoints, {
                    color: '#94a3b8',
                    weight: 2,
                    opacity: 0.6,
                    dashArray: '5, 10',
                }).addTo(newMap);

                newMap.fitBounds(bounds, { padding: [50, 50] });
            }

            setMarkers(allMarkers);
        }

        setMap(newMap);

        return () => {
            if (newMap) {
                newMap.remove();
            }
        };
    }, [itinerary, destination]);

    if (!destination) {
        return (
            <div className="card flex flex-col items-center justify-center p-12 text-gray-500">
                <MapPin className="w-12 h-12 mb-4" />
                <p>No destination selected</p>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white">
                    <MapPin className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Trip Map</h2>
                    <p className="text-sm text-gray-600">All activities on your itinerary</p>
                </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
                {itinerary?.days.map((day, index) => (
                    <div key={day.day} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                        <div
                            className="w-4 h-4 rounded-full border-2 border-white shadow"
                            style={{ backgroundColor: dayColors[index % dayColors.length] }}
                        />
                        <span className="text-sm font-medium text-gray-700">Day {day.day}</span>
                    </div>
                ))}
            </div>

            <div
                id="full-itinerary-map"
                className="rounded-xl overflow-hidden border-2 border-gray-200"
                style={{ height: '500px', width: '100%' }}
            />

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-800">
                    <strong>💡 Tip:</strong> Click on markers to see activity details. The dotted line shows a suggested route through your activities.
                </p>
            </div>
        </div>
    );
};

export default FullItineraryMap;
