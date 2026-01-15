import { Clock, Trash2, Edit2 } from 'lucide-react';

const ActivityCard = ({ activity, onRemove, onEdit, readOnly }) => {
    const timeEmojis = {
        morning: '🌅',
        afternoon: '☀️',
        evening: '🌆',
    };

    const costColors = {
        low: 'bg-green-100 text-green-700',
        medium: 'bg-blue-100 text-blue-700',
        luxury: 'bg-purple-100 text-purple-700',
    };

    return (
        <div className="card group">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{timeEmojis[activity.time]}</span>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            {activity.time}
                        </span>
                    </div>

                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                        {activity.name}
                    </h4>

                    <div className="flex flex-wrap gap-2 mb-3">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{activity.duration}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${costColors[activity.cost]}`}>
                            {activity.cost}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {activity.tags?.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {activity.notes && (
                        <p className="mt-3 text-sm text-gray-600 italic border-l-2 border-primary-300 pl-3">
                            {activity.notes}
                        </p>
                    )}
                </div>

                {!readOnly && (
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => onEdit(activity)}
                            className="p-2 hover:bg-primary-100 text-primary-600 rounded-lg transition-colors"
                            title="Edit activity"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onRemove(activity.id)}
                            className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                            title="Remove activity"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityCard;
