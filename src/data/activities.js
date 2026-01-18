export const activities = {
    culture: [
        { name: 'Visit Historic Museum', description: 'Explore fascinating exhibits showcasing local history and culture', duration: '2-3 hours', cost: 'low', tags: ['culture', 'indoor', 'educational'] },
        { name: 'Explore Old Town', description: 'Wander through charming cobblestone streets and historic architecture', duration: '3-4 hours', cost: 'low', tags: ['culture', 'walking', 'architecture'] },
        { name: 'Art Gallery Tour', description: 'Discover masterpieces and contemporary art in renowned galleries', duration: '2 hours', cost: 'medium', tags: ['culture', 'art', 'indoor'] },
        { name: 'Historical Palace Visit', description: 'Step back in time exploring grand palaces and royal heritage', duration: '3 hours', cost: 'medium', tags: ['culture', 'history', 'architecture'] },
        { name: 'Traditional Performance Show', description: 'Experience authentic local music, dance, and cultural performances', duration: '2 hours', cost: 'medium', tags: ['culture', 'entertainment', 'evening'] },
        { name: 'Heritage Walk', description: 'Guided walking tour through historically significant neighborhoods', duration: '2-3 hours', cost: 'low', tags: ['culture', 'walking', 'history'] },
        { name: 'Local Market Tour', description: 'Immerse yourself in vibrant markets filled with local crafts and goods', duration: '2 hours', cost: 'low', tags: ['culture', 'shopping', 'local'] },
        { name: 'Temple/Church Visit', description: 'Visit sacred sites and admire stunning religious architecture', duration: '1-2 hours', cost: 'low', tags: ['culture', 'spiritual', 'architecture'] },
    ],
    food: [
        { name: 'Street Food Tour', description: 'Taste authentic local flavors from the best street food vendors', duration: '2-3 hours', cost: 'low', tags: ['food', 'walking', 'local'] },
        { name: 'Cooking Class', description: 'Learn to prepare traditional dishes with expert local chefs', duration: '3-4 hours', cost: 'medium', tags: ['food', 'activity', 'learning'] },
        { name: 'Fine Dining Experience', description: 'Indulge in exquisite cuisine at a top-rated restaurant', duration: '2-3 hours', cost: 'high', tags: ['food', 'evening', 'premium'] },
        { name: 'Local Restaurant Lunch', description: 'Enjoy authentic regional cuisine at a popular local eatery', duration: '1-2 hours', cost: 'low', tags: ['food', 'casual', 'local'] },
        { name: 'Food Market Visit', description: 'Sample fresh produce and local delicacies at bustling food markets', duration: '2 hours', cost: 'low', tags: ['food', 'market', 'tasting'] },
        { name: 'Wine/Beer Tasting', description: 'Discover local wines or craft beers with expert-guided tastings', duration: '2 hours', cost: 'medium', tags: ['food', 'beverage', 'tasting'] },
        { name: 'Rooftop Dining', description: 'Dine with spectacular city views from a stylish rooftop venue', duration: '2 hours', cost: 'medium', tags: ['food', 'view', 'evening'] },
    ],
    adventure: [
        { name: 'City Bike Tour', description: 'Explore the city on two wheels with a guided cycling adventure', duration: '3-4 hours', cost: 'low', tags: ['adventure', 'outdoor', 'active'] },
        { name: 'Kayaking/Boat Ride', description: 'Paddle through scenic waterways or enjoy a relaxing boat tour', duration: '2-3 hours', cost: 'medium', tags: ['adventure', 'water', 'outdoor'] },
        { name: 'Hiking Trail', description: 'Trek through beautiful landscapes with stunning natural views', duration: '4-5 hours', cost: 'low', tags: ['adventure', 'nature', 'active'] },
        { name: 'Zip Lining', description: 'Soar through the air on an exhilarating zip line adventure', duration: '2 hours', cost: 'medium', tags: ['adventure', 'thrill', 'outdoor'] },
        { name: 'Scuba Diving/Snorkeling', description: 'Discover underwater wonders and vibrant marine life', duration: '3-4 hours', cost: 'medium', tags: ['adventure', 'water', 'marine'] },
        { name: 'Rock Climbing', description: 'Challenge yourself with guided rock climbing experiences', duration: '3 hours', cost: 'medium', tags: ['adventure', 'thrill', 'active'] },
        { name: 'Paragliding', description: 'Experience breathtaking aerial views while paragliding', duration: '2-3 hours', cost: 'high', tags: ['adventure', 'thrill', 'sky'] },
    ],
    nature: [
        { name: 'Botanical Garden Visit', description: 'Stroll through lush gardens featuring exotic plants and flowers', duration: '2 hours', cost: 'low', tags: ['nature', 'relaxing', 'outdoor'] },
        { name: 'Sunset Viewpoint', description: 'Watch a spectacular sunset from the best vantage point', duration: '1-2 hours', cost: 'low', tags: ['nature', 'scenic', 'evening'] },
        { name: 'Beach Day', description: 'Relax on pristine beaches with crystal-clear waters', duration: '4-5 hours', cost: 'low', tags: ['nature', 'water', 'relaxing'] },
        { name: 'National Park Visit', description: 'Explore diverse ecosystems and spot local wildlife', duration: '4-6 hours', cost: 'low', tags: ['nature', 'wildlife', 'outdoor'] },
        { name: 'Scenic Lake Visit', description: 'Enjoy peaceful moments by a beautiful lake surrounded by nature', duration: '2-3 hours', cost: 'low', tags: ['nature', 'water', 'scenic'] },
        { name: 'Waterfall Trek', description: 'Hike to magnificent waterfalls through scenic trails', duration: '3-4 hours', cost: 'low', tags: ['nature', 'hiking', 'adventure'] },
    ],
    relaxation: [
        { name: 'Spa & Wellness', description: 'Rejuvenate with massages and wellness treatments', duration: '2-3 hours', cost: 'medium', tags: ['relaxation', 'wellness', 'indoor'] },
        { name: 'Beach Relaxation', description: 'Unwind on the beach with sun, sand, and sea', duration: '3-4 hours', cost: 'low', tags: ['relaxation', 'beach', 'outdoor'] },
        { name: 'Park Picnic', description: 'Enjoy a leisurely picnic in a beautiful park setting', duration: '2 hours', cost: 'low', tags: ['relaxation', 'nature', 'casual'] },
        { name: 'Café Hopping', description: 'Discover charming cafés and enjoy local coffee culture', duration: '2-3 hours', cost: 'low', tags: ['relaxation', 'food', 'casual'] },
        { name: 'Sunset Cruise', description: 'Sail into the sunset on a relaxing evening cruise', duration: '2 hours', cost: 'medium', tags: ['relaxation', 'water', 'evening'] },
    ],
    shopping: [
        { name: 'Shopping District Visit', description: 'Browse trendy boutiques and popular retail stores', duration: '3-4 hours', cost: 'medium', tags: ['shopping', 'urban', 'casual'] },
        { name: 'Souvenir Shopping', description: 'Find unique mementos and gifts to remember your trip', duration: '1-2 hours', cost: 'low', tags: ['shopping', 'local', 'casual'] },
        { name: 'Artisan Market', description: 'Shop for handcrafted items and support local artisans', duration: '2 hours', cost: 'low', tags: ['shopping', 'local', 'handmade'] },
        { name: 'Luxury Mall Visit', description: 'Explore high-end brands in upscale shopping centers', duration: '2-3 hours', cost: 'high', tags: ['shopping', 'premium', 'indoor'] },
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
