export const activities = {
    culture: [
        { name: 'Visit Historic Museum', duration: '2-3 hours', cost: 'low', tags: ['culture', 'indoor', 'educational'] },
        { name: 'Explore Old Town', duration: '3-4 hours', cost: 'low', tags: ['culture', 'walking', 'architecture'] },
        { name: 'Art Gallery Tour', duration: '2 hours', cost: 'medium', tags: ['culture', 'art', 'indoor'] },
        { name: 'Historical Palace Visit', duration: '3 hours', cost: 'medium', tags: ['culture', 'history', 'architecture'] },
        { name: 'Traditional Performance Show', duration: '2 hours', cost: 'medium', tags: ['culture', 'entertainment', 'evening'] },
        { name: 'Heritage Walk', duration: '2-3 hours', cost: 'low', tags: ['culture', 'walking', 'history'] },
        { name: 'Local Market Tour', duration: '2 hours', cost: 'low', tags: ['culture', 'shopping', 'local'] },
        { name: 'Temple/Church Visit', duration: '1-2 hours', cost: 'low', tags: ['culture', 'spiritual', 'architecture'] },
    ],
    food: [
        { name: 'Street Food Tour', duration: '2-3 hours', cost: 'low', tags: ['food', 'walking', 'local'] },
        { name: 'Cooking Class', duration: '3-4 hours', cost: 'medium', tags: ['food', 'activity', 'learning'] },
        { name: 'Fine Dining Experience', duration: '2-3 hours', cost: 'luxury', tags: ['food', 'evening', 'premium'] },
        { name: 'Local Restaurant Lunch', duration: '1-2 hours', cost: 'low', tags: ['food', 'casual', 'local'] },
        { name: 'Food Market Visit', duration: '2 hours', cost: 'low', tags: ['food', 'market', 'tasting'] },
        { name: 'Wine/Beer Tasting', duration: '2 hours', cost: 'medium', tags: ['food', 'beverage', 'tasting'] },
        { name: 'Rooftop Dining', duration: '2 hours', cost: 'medium', tags: ['food', 'view', 'evening'] },
    ],
    adventure: [
        { name: 'City Bike Tour', duration: '3-4 hours', cost: 'low', tags: ['adventure', 'outdoor', 'active'] },
        { name: 'Kayaking/Boat Ride', duration: '2-3 hours', cost: 'medium', tags: ['adventure', 'water', 'outdoor'] },
        { name: 'Hiking Trail', duration: '4-5 hours', cost: 'low', tags: ['adventure', 'nature', 'active'] },
        { name: 'Zip Lining', duration: '2 hours', cost: 'medium', tags: ['adventure', 'thrill', 'outdoor'] },
        { name: 'Scuba Diving/Snorkeling', duration: '3-4 hours', cost: 'medium', tags: ['adventure', 'water', 'marine'] },
        { name: 'Rock Climbing', duration: '3 hours', cost: 'medium', tags: ['adventure', 'thrill', 'active'] },
        { name: 'Paragliding', duration: '2-3 hours', cost: 'luxury', tags: ['adventure', 'thrill', 'sky'] },
    ],
    nature: [
        { name: 'Botanical Garden Visit', duration: '2 hours', cost: 'low', tags: ['nature', 'relaxing', 'outdoor'] },
        { name: 'Sunset Viewpoint', duration: '1-2 hours', cost: 'low', tags: ['nature', 'scenic', 'evening'] },
        { name: 'Beach Day', duration: '4-5 hours', cost: 'low', tags: ['nature', 'water', 'relaxing'] },
        { name: 'National Park Visit', duration: '4-6 hours', cost: 'low', tags: ['nature', 'wildlife', 'outdoor'] },
        { name: 'Scenic Lake Visit', duration: '2-3 hours', cost: 'low', tags: ['nature', 'water', 'scenic'] },
        { name: 'Waterfall Trek', duration: '3-4 hours', cost: 'low', tags: ['nature', 'hiking', 'adventure'] },
    ],
    relaxation: [
        { name: 'Spa & Wellness', duration: '2-3 hours', cost: 'medium', tags: ['relaxation', 'wellness', 'indoor'] },
        { name: 'Beach Relaxation', duration: '3-4 hours', cost: 'low', tags: ['relaxation', 'beach', 'outdoor'] },
        { name: 'Park Picnic', duration: '2 hours', cost: 'low', tags: ['relaxation', 'nature', 'casual'] },
        { name: 'Café Hopping', duration: '2-3 hours', cost: 'low', tags: ['relaxation', 'food', 'casual'] },
        { name: 'Sunset Cruise', duration: '2 hours', cost: 'medium', tags: ['relaxation', 'water', 'evening'] },
    ],
    shopping: [
        { name: 'Shopping District Visit', duration: '3-4 hours', cost: 'medium', tags: ['shopping', 'urban', 'casual'] },
        { name: 'Souvenir Shopping', duration: '1-2 hours', cost: 'low', tags: ['shopping', 'local', 'casual'] },
        { name: 'Artisan Market', duration: '2 hours', cost: 'low', tags: ['shopping', 'local', 'handmade'] },
        { name: 'Luxury Mall Visit', duration: '2-3 hours', cost: 'luxury', tags: ['shopping', 'premium', 'indoor'] },
    ],
};

export const getActivitiesByTags = (preferences) => {
    const { travelStyle, budget } = preferences;

    let selectedActivities = [];

    if (travelStyle === 'cultural') {
        selectedActivities = [...activities.culture, ...activities.food.slice(0, 3)];
    } else if (travelStyle === 'adventure') {
        selectedActivities = [...activities.adventure, ...activities.nature];
    } else if (travelStyle === 'food') {
        selectedActivities = [...activities.food, ...activities.culture.slice(0, 3)];
    } else {
        selectedActivities = [
            ...activities.culture.slice(0, 2),
            ...activities.food.slice(0, 2),
            ...activities.nature.slice(0, 2),
            ...activities.relaxation,
        ];
    }

    if (budget === 'low') {
        selectedActivities = selectedActivities.filter((a) => a.cost === 'low');
    } else if (budget === 'medium') {
        selectedActivities = selectedActivities.filter((a) => a.cost !== 'luxury');
    }

    return selectedActivities;
};
