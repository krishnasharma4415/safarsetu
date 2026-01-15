import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';
import DestinationSearch from '../components/trip/DestinationSearch';
import TravelStyleSelector from '../components/trip/TravelStyleSelector';
import BudgetSelector from '../components/trip/BudgetSelector';
import Button from '../components/ui/Button';
import useStore from '../store/useStore';
import { generateItinerary } from '../utils/itineraryGenerator';

const TripPlanner = () => {
    const navigate = useNavigate();
    const { setTripDetails, setCurrentItinerary } = useStore();

    const [formData, setFormData] = useState({
        destination: null,
        startDate: '',
        endDate: '',
        travelers: 1,
        travelStyle: 'relaxed',
        budget: 'medium',
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.destination) {
            newErrors.destination = 'Please select a destination';
        }
        if (!formData.startDate) {
            newErrors.startDate = 'Start date is required';
        }
        if (!formData.endDate) {
            newErrors.endDate = 'End date is required';
        }
        if (formData.startDate && formData.endDate) {
            if (new Date(formData.endDate) < new Date(formData.startDate)) {
                newErrors.endDate = 'End date must be after start date';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const itinerary = generateItinerary(formData);
        setTripDetails(formData);
        setCurrentItinerary(itinerary);
        navigate('/itinerary');
    };

    const getTripDuration = () => {
        if (formData.startDate && formData.endDate) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
            return days > 0 ? `${days} day${days > 1 ? 's' : ''}` : '';
        }
        return '';
    };

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="section-title mb-4">Plan Your Perfect Trip</h1>
                    <p className="text-xl text-gray-600">
                        Tell us about your travel preferences and we'll create a personalized itinerary
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="card">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Trip Details</h2>

                        <div className="space-y-6">
                            <DestinationSearch
                                value={formData.destination}
                                onChange={(dest) => setFormData({ ...formData, destination: dest })}
                            />
                            {errors.destination && (
                                <p className="text-red-500 text-sm mt-1">{errors.destination}</p>
                            )}

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="label">Start Date</label>
                                    <input
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="input-field"
                                    />
                                    {errors.startDate && (
                                        <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="label">End Date</label>
                                    <input
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        min={formData.startDate || new Date().toISOString().split('T')[0]}
                                        className="input-field"
                                    />
                                    {errors.endDate && (
                                        <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
                                    )}
                                </div>
                            </div>

                            {getTripDuration() && (
                                <div className="p-4 bg-primary-50 rounded-xl border border-primary-200">
                                    <p className="text-primary-700 font-semibold">
                                        📅 Trip Duration: {getTripDuration()}
                                    </p>
                                </div>
                            )}

                            <div>
                                <label className="label">Number of Travelers</label>
                                <div className="relative">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="number"
                                        min="1"
                                        max="20"
                                        value={formData.travelers}
                                        onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) })}
                                        className="input-field pl-12"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Preferences</h2>

                        <div className="space-y-8">
                            <TravelStyleSelector
                                value={formData.travelStyle}
                                onChange={(style) => setFormData({ ...formData, travelStyle: style })}
                            />

                            <BudgetSelector
                                value={formData.budget}
                                onChange={(budget) => setFormData({ ...formData, budget: budget })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => navigate('/')}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="px-8">
                            Generate Itinerary
                            <ArrowRight className="w-5 h-5 ml-2 inline" />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TripPlanner;
