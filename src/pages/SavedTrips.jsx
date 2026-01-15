import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Trash2, Eye, Inbox } from 'lucide-react';
import useStore from '../store/useStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Toast from '../components/ui/Toast';
import Modal from '../components/ui/Modal';

const SavedTrips = () => {
    const navigate = useNavigate();
    const { savedItineraries, deleteItinerary, loadItinerary } = useStore();
    const [toast, setToast] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

    const handleView = (id) => {
        loadItinerary(id);
        navigate('/itinerary');
    };

    const handleDelete = () => {
        if (deleteModal.id) {
            deleteItinerary(deleteModal.id);
            setToast({ message: 'Itinerary deleted', type: 'success' });
            setDeleteModal({ isOpen: false, id: null });
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const getDuration = (itinerary) => {
        return itinerary.days?.length || 0;
    };

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="section-title mb-4">My Saved Trips</h1>
                    <p className="text-xl text-gray-600">
                        Access and manage your saved itineraries
                    </p>
                </div>

                {savedItineraries.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="inline-flex p-6 bg-gray-100 rounded-full mb-6">
                            <Inbox className="w-16 h-16 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            No Saved Itineraries Yet
                        </h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Start planning your first trip and save it to access later
                        </p>
                        <Button onClick={() => navigate('/plan')}>
                            Plan Your First Trip
                        </Button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedItineraries.map((itinerary) => (
                            <Card key={itinerary.id} hover className="flex flex-col">
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 flex-1">
                                            {itinerary.name || `Trip to ${itinerary.tripDetails.destination.name}`}
                                        </h3>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <MapPin className="w-5 h-5 text-primary-500" />
                                            <span className="font-medium">
                                                {itinerary.tripDetails.destination.name}, {itinerary.tripDetails.destination.country}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar className="w-5 h-5 text-primary-500" />
                                            <span>
                                                {formatDate(itinerary.tripDetails.startDate)} - {formatDate(itinerary.tripDetails.endDate)}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mt-4">
                                            <span className="badge from-primary-500 to-primary-600 text-white">
                                                {getDuration(itinerary)} Days
                                            </span>
                                            <span className="badge from-secondary-500 to-secondary-600 text-white">
                                                {itinerary.tripDetails.travelers} {itinerary.tripDetails.travelers > 1 ? 'Travelers' : 'Traveler'}
                                            </span>
                                        </div>
                                    </div>

                                    {itinerary.savedAt && (
                                        <p className="text-xs text-gray-500 mb-4">
                                            Saved on {formatDate(itinerary.savedAt)}
                                        </p>
                                    )}
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => handleView(itinerary.id)}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View
                                    </button>
                                    <button
                                        onClick={() => setDeleteModal({ isOpen: true, id: itinerary.id })}
                                        className="px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <Modal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, id: null })}
                title="Delete Itinerary"
                size="sm"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Are you sure you want to delete this itinerary? This action cannot be undone.
                    </p>

                    <div className="flex justify-end gap-3 mt-6">
                        <Button
                            variant="secondary"
                            onClick={() => setDeleteModal({ isOpen: false, id: null })}
                        >
                            Cancel
                        </Button>
                        <button
                            onClick={handleDelete}
                            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors"
                        >
                            Delete
                        </button>
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

export default SavedTrips;
