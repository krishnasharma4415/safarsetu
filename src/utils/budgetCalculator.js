const costLevels = {
    low: { min: 5, max: 20, symbol: '$' },
    medium: { min: 20, max: 50, symbol: '$$' },
    high: { min: 50, max: 150, symbol: '$$$' },
};

const budgetMultipliers = {
    budget: 0.7,
    medium: 1.0,
    luxury: 1.5,
};

export const estimateActivityCost = (activity, budget = 'medium', travelers = 1) => {
    const costLevel = activity.cost || 'medium';
    const range = costLevels[costLevel];
    const multiplier = budgetMultipliers[budget] || 1.0;

    const baseCost = (range.min + range.max) / 2;
    const estimatedCost = baseCost * multiplier * travelers;

    return {
        perPerson: Math.round(baseCost * multiplier),
        total: Math.round(estimatedCost),
        range: {
            min: Math.round(range.min * multiplier * travelers),
            max: Math.round(range.max * multiplier * travelers),
        },
        symbol: range.symbol,
    };
};

export const calculateDayBudget = (day, budget = 'medium', travelers = 1) => {
    let totalMin = 0;
    let totalMax = 0;
    let totalEstimated = 0;

    day.activities.forEach((activity) => {
        const cost = estimateActivityCost(activity, budget, travelers);
        totalMin += cost.range.min;
        totalMax += cost.range.max;
        totalEstimated += cost.total;
    });

    const meals = 3;
    const mealCostPerPerson = budget === 'budget' ? 15 : budget === 'medium' ? 30 : 60;
    const mealCost = meals * mealCostPerPerson * travelers;

    totalMin += mealCost * 0.7;
    totalMax += mealCost * 1.3;
    totalEstimated += mealCost;

    return {
        activities: totalEstimated - mealCost,
        meals: mealCost,
        total: Math.round(totalEstimated),
        range: {
            min: Math.round(totalMin),
            max: Math.round(totalMax),
        },
    };
};

export const calculateTripBudget = (itinerary, budget = 'medium', travelers = 1) => {
    let totalActivities = 0;
    let totalMeals = 0;
    let totalMin = 0;
    let totalMax = 0;

    const dailyBreakdown = itinerary.days.map((day) => {
        const dayBudget = calculateDayBudget(day, budget, travelers);
        totalActivities += dayBudget.activities;
        totalMeals += dayBudget.meals;
        totalMin += dayBudget.range.min;
        totalMax += dayBudget.range.max;

        return {
            day: day.day,
            date: day.date,
            ...dayBudget,
        };
    });

    const numDays = itinerary.days.length;
    const accommodationPerNight = budget === 'budget' ? 50 : budget === 'medium' ? 120 : 250;
    const totalAccommodation = accommodationPerNight * (numDays - 1) * (Math.ceil(travelers / 2));

    const transportationBase = budget === 'budget' ? 100 : budget === 'medium' ? 200 : 400;
    const totalTransportation = transportationBase * travelers;

    const miscellaneous = (totalActivities + totalMeals) * 0.15;

    const grandTotal = totalActivities + totalMeals + totalAccommodation + totalTransportation + miscellaneous;

    return {
        breakdown: {
            activities: Math.round(totalActivities),
            meals: Math.round(totalMeals),
            accommodation: Math.round(totalAccommodation),
            transportation: Math.round(totalTransportation),
            miscellaneous: Math.round(miscellaneous),
        },
        total: Math.round(grandTotal),
        perPerson: Math.round(grandTotal / travelers),
        range: {
            min: Math.round(totalMin + totalAccommodation + totalTransportation),
            max: Math.round(totalMax + totalAccommodation + totalTransportation + miscellaneous * 2),
        },
        dailyBreakdown,
        currency: 'USD',
    };
};

export const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export const getBudgetInsights = (tripBudget) => {
    const { breakdown, total } = tripBudget;

    const insights = [];

    const activitiesPercent = (breakdown.activities / total) * 100;
    const mealsPercent = (breakdown.meals / total) * 100;
    const accommodationPercent = (breakdown.accommodation / total) * 100;

    if (activitiesPercent > 40) {
        insights.push({
            type: 'warning',
            message: 'Activities make up a large portion of your budget. Consider free or low-cost alternatives.',
        });
    }

    if (mealsPercent < 20) {
        insights.push({
            type: 'info',
            message: 'You have a modest food budget. Look for local eateries and street food for authentic experiences.',
        });
    }

    if (accommodationPercent > 35) {
        insights.push({
            type: 'tip',
            message: 'Accommodation is a significant expense. Consider hostels, Airbnb, or budget hotels to save money.',
        });
    }

    insights.push({
        type: 'success',
        message: `Your estimated daily budget is ${formatCurrency(total / tripBudget.dailyBreakdown.length)} per day.`,
    });

    return insights;
};
