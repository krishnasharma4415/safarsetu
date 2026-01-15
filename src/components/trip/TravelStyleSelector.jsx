const TravelStyleSelector = ({ value, onChange }) => {
    const styles = [
        {
            id: 'relaxed',
            label: 'Relaxed',
            icon: '🏖️',
            description: 'Take it slow and enjoy',
        },
        {
            id: 'adventure',
            label: 'Adventure',
            icon: '⛰️',
            description: 'Thrills and excitement',
        },
        {
            id: 'cultural',
            label: 'Cultural',
            icon: '🏛️',
            description: 'History and heritage',
        },
        {
            id: 'food',
            label: 'Food Focused',
            icon: '🍽️',
            description: 'Culinary experiences',
        },
    ];

    return (
        <div>
            <label className="label">Travel Style</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {styles.map((style) => (
                    <button
                        key={style.id}
                        type="button"
                        onClick={() => onChange(style.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${value === style.id
                                ? 'border-primary-500 bg-primary-50 shadow-lg scale-105'
                                : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md'
                            }`}
                    >
                        <div className="text-4xl mb-2">{style.icon}</div>
                        <div className="font-semibold text-gray-900">{style.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{style.description}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TravelStyleSelector;
