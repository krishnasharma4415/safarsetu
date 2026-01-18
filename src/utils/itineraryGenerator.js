import { getActivitiesByTags } from '../data/activities';

const timeSlots = ['morning', 'afternoon', 'evening'];

const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const getActivityForSlot = (slot, availableActivities, usedActivities) => {
    const suitable = availableActivities.filter((activity) => {
        if (usedActivities.has(activity.name)) return false;

        if (slot === 'morning') {
            return !activity.tags.includes('evening');
        } else if (slot === 'evening') {
            return activity.tags.includes('evening') || activity.tags.includes('relaxing');
        }
        return true;
    });

    if (suitable.length === 0) {
        const fallback = availableActivities.find((a) => !usedActivities.has(a.name));
        return fallback || availableActivities[0];
    }

    return suitable[Math.floor(Math.random() * suitable.length)];
};

export const generateItinerary = (tripDetails) => {
    const { destination, startDate, endDate, travelers, travelStyle, budget } = tripDetails;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const availableActivities = shuffleArray(getActivitiesByTags({ travelStyle, budget }));
    const usedActivities = new Set();

    const itinerary = [];

    for (let i = 0; i < days; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);

        const dayActivities = [];

        const activitiesPerDay = i === 0 || i === days - 1 ? 2 : 3;
        const slots = timeSlots.slice(0, activitiesPerDay);

        for (const slot of slots) {
            const activity = getActivityForSlot(slot, availableActivities, usedActivities);
            usedActivities.add(activity.name);

            dayActivities.push({
                id: `${i}-${slot}`,
                time: slot,
                ...activity,
                notes: '',
            });
        }

        itinerary.push({
            day: i + 1,
            date: currentDate.toISOString().split('T')[0],
            activities: dayActivities,
            notes: '',
        });
    }

    return {
        tripDetails,
        days: itinerary,
        generatedAt: new Date().toISOString(),
    };
};

export const updateDayActivity = (itinerary, dayIndex, activityId, updates) => {
    const newItinerary = { ...itinerary };
    const day = newItinerary.days[dayIndex];
    const activityIndex = day.activities.findIndex((a) => a.id === activityId);

    if (activityIndex !== -1) {
        day.activities[activityIndex] = {
            ...day.activities[activityIndex],
            ...updates,
        };
    }

    return newItinerary;
};

export const removeActivity = (itinerary, dayIndex, activityId) => {
    const newItinerary = { ...itinerary };
    const day = newItinerary.days[dayIndex];
    day.activities = day.activities.filter((a) => a.id !== activityId);
    return newItinerary;
};

export const addActivity = (itinerary, dayIndex, activity) => {
    const newItinerary = { ...itinerary };
    const day = newItinerary.days[dayIndex];
    const newActivity = {
        id: `${dayIndex}-${Date.now()}`,
        ...activity,
    };
    day.activities.push(newActivity);
    return newItinerary;
};

export const updateDayNotes = (itinerary, dayIndex, notes) => {
    const newItinerary = { ...itinerary };
    newItinerary.days[dayIndex].notes = notes;
    return newItinerary;
};

export const reorderActivities = (itinerary, dayIndex, newActivities) => {
    const newItinerary = { ...itinerary };
    newItinerary.days[dayIndex].activities = newActivities;
    return newItinerary;
};

