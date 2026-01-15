const BudgetSelector = ({ value, onChange }) => {
    const budgets = [
        {
            id: 'low',
            label: 'Budget',
            icon: '💰',
            range: '$0-$50/day',
            color: 'from-green-400 to-green-600',
        },
        {
            id: 'medium',
            label: 'Moderate',
            icon: '💵',
            range: '$50-$150/day',
            color: 'from-blue-400 to-blue-600',
        },
        {
            id: 'luxury',
            label: 'Luxury',
            icon: '💎',
            range: '$150+/day',
            color: 'from-purple-400 to-purple-600',
        },
    ];

    return (
        <div>
            <label className="label">Budget Range</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {budgets.map((budget) => (
                    <button
                        key={budget.id}
                        type="button"
                        onClick={() => onChange(budget.id)}
                        className={`p-6 rounded-xl border-2 transition-all ${value === budget.id
                                ? 'border-primary-500 bg-primary-50 shadow-xl scale-105'
                                : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-lg'
                            }`}
                    >
                        <div className="text-5xl mb-3">{budget.icon}</div>
                        <div className="font-bold text-xl text-gray-900 mb-1">{budget.label}</div>
                        <div className={`text-sm font-semibold bg-gradient-to-r ${budget.color} bg-clip-text text-transparent`}>
                            {budget.range}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BudgetSelector;
