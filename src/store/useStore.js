import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
    persist(
        (set, get) => ({
            tripDetails: null,
            currentItinerary: null,
            savedItineraries: [],

            setTripDetails: (details) => set({ tripDetails: details }),

            setCurrentItinerary: (itinerary) => set({ currentItinerary: itinerary }),

            saveItinerary: (itinerary) => {
                const id = Date.now().toString();
                const savedItinerary = {
                    ...itinerary,
                    id,
                    savedAt: new Date().toISOString(),
                };
                set((state) => ({
                    savedItineraries: [...state.savedItineraries, savedItinerary],
                }));
                return id;
            },

            deleteItinerary: (id) => {
                set((state) => ({
                    savedItineraries: state.savedItineraries.filter((it) => it.id !== id),
                }));
            },

            loadItinerary: (id) => {
                const itinerary = get().savedItineraries.find((it) => it.id === id);
                if (itinerary) {
                    set({
                        tripDetails: itinerary.tripDetails,
                        currentItinerary: itinerary,
                    });
                }
            },

            updateItinerary: (updatedItinerary) => {
                set({ currentItinerary: updatedItinerary });
            },

            clearCurrentTrip: () => {
                set({
                    tripDetails: null,
                    currentItinerary: null,
                });
            },
        }),
        {
            name: 'safarsetu-storage',
        }
    )
);

export default useStore;
