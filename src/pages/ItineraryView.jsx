import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, MapPin, Calendar, Users, DollarSign, Map } from 'lucide-react';
import useStore from '../store/useStore';
import DayCard from '../components/itinerary/DayCard';
import ItineraryMap from '../components/itinerary/ItineraryMap';
import WeatherCard from '../components/itinerary/WeatherCard';
import Button from '../components/ui/Button';
import Toast from '../components/ui/Toast';
import Modal from '../components/ui/Modal';
import {
    updateDayActivity,
    removeActivity,
    updateDayNotes,
} from '../utils/itineraryGenerator';
import { getWeatherForecast, findBestWeatherDay } from '../utils/weather';

const ItineraryView = () => {
    const navigate = useNavigate();
    const { currentItinerary, updateItinerary, saveItinerary } = useStore();
    const [toast, setToast] = useState(null);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [itineraryName, setItineraryName] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [bestWeatherDay, setBestWeatherDay] = useState(null);
    const [showMap, setShowMap] = useState(false);

    if (!currentItinerary) {
        navigate('/plan');
        return null;
    }

    const { tripDetails, days } = currentItinerary;

    useEffect(() => {
        const fetchWeather = async () => {
            if (tripDetails?.destination?.lat && tripDetails?.destination?.lon) {
                const weather = await getWeatherForecast(
                    tripDetails.destination.lat,
                    tripDetails.destination.lon,
                    tripDetails.startDate,
                    tripDetails.endDate
                );
                if (weather) {
                    setWeatherData(weather);
                    const best = findBestWeatherDay(weather);
                    setBestWeatherDay(best);
                }
            }
        };
        fetchWeather();
    }, [tripDetails]);

    const handleUpdateActivity = (dayIndex, activityId, updates) => {
        const updated = updateDayActivity(currentItinerary, dayIndex, activityId, updates);
        updateItinerary(updated);
    };

    const handleRemoveActivity = (dayIndex, activityId) => {
        const updated = removeActivity(currentItinerary, dayIndex, activityId);
        updateItinerary(updated);
        setToast({ message: 'Activity removed', type: 'success' });
    };

    const handleUpdateNotes = (dayIndex, notes) => {
        const updated = updateDayNotes(currentItinerary, dayIndex, notes);
        updateItinerary(updated);
        setToast({ message: 'Notes updated', type: 'success' });
    };

    const handleSave = () => {
        if (!itineraryName.trim()) {
            setToast({ message: 'Please enter a name for your itinerary', type: 'error' });
            return;
        }

        const savedItinerary = {
            ...currentItinerary,
            name: itineraryName,
        };

        saveItinerary(savedItinerary);
        setToast({ message: 'Itinerary saved successfully!', type: 'success' });
        setIsSaveModalOpen(false);
        setItineraryName('');
    };

    const formatDateRange = () => {
        const start = new Date(tripDetails.startDate);
        const end = new Date(tripDetails.endDate);
        return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    };

    const travelStyleLabels = {
        relaxed: 'Relaxed',
        adventure: 'Adventure',
        cultural: 'Cultural',
        food: 'Food Focused',
    };

    const budgetLabels = {
        low: 'Budget',
        medium: 'Moderate',
        luxury: 'Luxury',
    };

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/plan')}
                        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Planning
                    </button>

                    <div className="glass-card p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                                    Your {tripDetails.destination.name} Adventure
                                </h1>

                                <div className="flex flex-wrap gap-4 text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-primary-500" />
                                        <span className="font-medium">{tripDetails.destination.name}, {tripDetails.destination.country}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-primary-500" />
                                        <span className="font-medium">{formatDateRange()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-primary-500" />
                                        <span className="font-medium">{tripDetails.travelers} {tripDetails.travelers > 1 ? 'Travelers' : 'Traveler'}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-4">
                                    <span className="badge from-blue-500 to-blue-600 text-white">
                                        {travelStyleLabels[tripDetails.travelStyle]}
                                    </span>
                                    <span className="badge from-green-500 to-green-600 text-white">
                                        <DollarSign className="w-4 h-4" />
                                        {budgetLabels[tripDetails.budget]}
                                    </span>
                                    <span className="badge from-purple-500 to-purple-600 text-white">
                                        {days.length} Day{days.length > 1 ? 's' : ''}
                                    </span>
                                </div>
                            </div>

                            <Button onClick={() => setIsSaveModalOpen(true)} className="whitespace-nowrap">
                                <Save className="w-5 h-5 mr-2 inline" />
                                Save Itinerary
                            </Button>
                        </div>
                    </div>
                </div>

                {weatherData && weatherData.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            🌤️ Weather Forecast
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {weatherData.map((weather, index) => (
                                <div key={weather.date}>
                                    <div className="text-sm font-semibold text-gray-600 mb-2">
                                        Day {index + 1} - {new Date(weather.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </div>
                                    <WeatherCard
                                        weather={weather}
                                        isbestDay={bestWeatherDay?.index === index}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Map className="w-6 h-6 text-primary-500" />
                            Itinerary Overview
                        </h2>
                        <button
                            onClick={() => setShowMap(!showMap)}
                            className="px-4 py-2 bg-primary-100 text-primary-700 font-semibold rounded-xl hover:bg-primary-200 transition-colors"
                        >
                            {showMap ? 'Hide Map' : 'Show Map'}
                        </button>
                    </div>
                    {showMap && (
                        <div className="mb-6">
                            <ItineraryMap destination={tripDetails.destination} />
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    {days.map((day, index) => (
                        <DayCard
                            key={day.day}
                            day={day}
                            dayIndex={index}
                            onUpdateActivity={handleUpdateActivity}
                            onRemoveActivity={handleRemoveActivity}
                            onUpdateNotes={handleUpdateNotes}
                            readOnly={false}
                        />
                    ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-200">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">✨ Pro Tips</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li>• Click on activities to add personal notes</li>
                        <li>• Remove activities that don't interest you</li>
                        <li>• Add day notes for bookings and reminders</li>
                        <li>• Save your itinerary to access it later</li>
                    </ul>
                </div>
            </div>

            <Modal
                isOpen={isSaveModalOpen}
                onClose={() => setIsSaveModalOpen(false)}
                title="Save Itinerary"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Give your itinerary a name to save it for later access.
                    </p>

                    <div>
                        <label className="label">Itinerary Name</label>
                        <input
                            type="text"
                            value={itineraryName}
                            onChange={(e) => setItineraryName(e.target.value)}
                            placeholder="e.g., Summer Paris Trip 2024"
                            className="input-field"
                            autoFocus
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <Button
                            variant="secondary"
                            onClick={() => setIsSaveModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>
                            Save Itinerary
                        </Button>
                    </div>
                </div>
            </Modal>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default ItineraryView;
