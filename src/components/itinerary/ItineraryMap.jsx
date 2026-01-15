import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

const ItineraryMap = ({ destination, activities = [] }) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current || !destination) return;

        if (!window.L) {
            console.error('Leaflet not loaded');
            return;
        }

        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
        }

        const map = window.L.map(mapRef.current).setView(
            [destination.lat, destination.lon],
            13
        );

        window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        const bounds = [];

        const destinationMarker = window.L.marker([destination.lat, destination.lon], {
            icon: window.L.divIcon({
                className: 'custom-marker',
                html: `<div style="background: #0ea5e9; color: white; padding: 8px 12px; border-radius: 20px; font-weight: bold; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
          📍 ${destination.name}
        </div>`,
                iconSize: [120, 40],
                iconAnchor: [60, 40],
            }),
        }).addTo(map);

        destinationMarker.bindPopup(`
      <div style="text-align: center;">
        <h3 style="margin: 0 0 8px 0; color: #0ea5e9;">${destination.name}</h3>
        <p style="margin: 0; color: #666;">${destination.country}</p>
      </div>
    `);

        bounds.push([destination.lat, destination.lon]);

        if (activities && activities.length > 0) {
            activities.forEach((activity, index) => {
                if (activity.lat && activity.lon) {
                    const activityMarker = window.L.marker([activity.lat, activity.lon], {
                        icon: window.L.divIcon({
                            className: 'activity-marker',
                            html: `<div style="background: #d946ef; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
                ${index + 1}
              </div>`,
                            iconSize: [30, 30],
                            iconAnchor: [15, 15],
                        }),
                    }).addTo(map);

                    activityMarker.bindPopup(`
            <div>
              <h4 style="margin: 0 0 8px 0; color: #d946ef;">Stop ${index + 1}</h4>
              <p style="margin: 0 0 4px 0; font-weight: bold;">${activity.name}</p>
              <p style="margin: 0; color: #666; font-size: 12px;">${activity.duration}</p>
            </div>
          `);

                    bounds.push([activity.lat, activity.lon]);
                }
            });

            if (bounds.length > 1) {
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        }

        mapInstanceRef.current = map;

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [destination, activities]);

    if (!destination) {
        return (
            <div className="card flex items-center justify-center p-12 text-gray-500">
                <MapPin className="w-12 h-12 mb-4" />
                <p>No destination selected</p>
            </div>
        );
    }

    return (
        <div className="card p-0 overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
                <h3 className="text-xl font-bold">📍 Map View</h3>
                <p className="text-sm text-white/90">
                    {destination.name}, {destination.country}
                </p>
            </div>
            <div
                ref={mapRef}
                className="w-full"
                style={{ height: '500px' }}
            />
        </div>
    );
};

export default ItineraryMap;
